(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', '../Behavior', '../Collection', '../Events'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Behavior = require('../Behavior');
    var Collection = require('../Collection');
    var Events = require('../Events');
    module.exports = factory(_, Backbone, Behavior, Collection, Events);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.behaviors = root.Torso.behaviors || {};
    root.Torso.behaviors.DataBehavior = factory(root._, root.Backbone, root.Torso.Behavior, root.Torso.Collection, root.Torso.Events);
  }
}(this, function(_, Backbone, Behavior, Collection, Events) {
  'use strict';

  var $ = Backbone.$;

  var PROPERTY_SEPARATOR = '.';
  var CONTAINER_SEPARATOR = ':';

  var FETCHED_STATUSES = {
    SUCCESS: 'success',
    FAILURE: 'failed'
  };

  /**
   * Converts string or number values into an array with a single string or number item.
   * If the input is not a string, number, array, or info about the ids then undefined is returned.
   * This is a private helper method used internally by this behavior and is not exposed in any way.
   * @param {(string|number|string[]|number[]|Object)} ids the ids to convert.
   *   @param {boolean} [ids.skipObjectRetrieval] set if this is a meta-info object about the ids.
   * @return {(string[]|number[]|Object)} an array of strings or numbers.
   * @private
   */
  function normalizeIds(ids) {
    if (_.isArray(ids)) {
      // remove any nesting of arrays - it is assumed that the resulting ids will be simple string or number values.
      ids = _.flatten(ids);
      // remove any duplicate ids.
      return _.uniq(ids);
    } else if (_.isString(ids) || _.isNumber(ids)) {
      // individual id - convert to array for consistency.
      return [ids];
    } else if (ids && ids.skipObjectRetrieval) {
      return ids;
    }
  }

  /**
   * Converts any undefined or null values to an empty array.  All other values are left unchanged.
   * @param valueToConvert the value to check for null or undefined.
   * @return {Array|*} either the original value or [] if the valueToConvert is null or undefined.
   */
  function undefinedOrNullToEmptyArray(valueToConvert) {
    if (_.isUndefined(valueToConvert) || _.isNull(valueToConvert)) {
      valueToConvert = [];
    }
    return valueToConvert;
  }

  /**
   * Gets a nested property from an object, returning undefined if it doesn't exist on any level.
   * @param {Object} rootObject object containing the property to get.
   * @param {string} propertyString string identifying the nested object to retrieve.
   * @return {*} either undefined or the property referenced from the rootObject.
   */
  function getNestedProperty(rootObject, propertyString) {
    propertyString = propertyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    propertyString = propertyString.replace(/^\./, '');           // strip a leading dot
    var propertyStringParts = propertyString.split(PROPERTY_SEPARATOR);
    return _.reduce(propertyStringParts, function(currentBaseObject, currentPropertyName) {
      return _.isUndefined(currentBaseObject) ? undefined : currentBaseObject[currentPropertyName];
    }, rootObject);
  }

  /**
   * Determines if the stringDefinition contains a container definition (i.e. has a ':' in it).
   * @param stringDefinition to test.
   * @return {boolean} true if the string definition contains a container definition, false otherwise.
   */
  function containsContainerDefinition(stringDefinition) {
    return !!stringDefinition && stringDefinition.indexOf(CONTAINER_SEPARATOR) > -1;
  }

  /**
   * This behavior implements simplified interaction with data sources (i.e. TorsoCollection).
   * This behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.
   * This behavior also manages dependencies between data and other objects to allow intelligent re-fetching when data changes.
   *
   * @class DataBehavior
   * @extends Behavior
   *
   * @author  jyoung@vecna.com
   *
   * @see <a href="../annotated/modules/behaviors/DataBehavior.html">DataBehavior Annotated Source</a>
   * @see <a href="../modules/behaviors/DATA_BEHAVIOR.html">Detailed docs</a> for more in-depth documentation and details.
   */
  var DataBehavior = Behavior.extend(/** @lends DataBehavior */{
    /**
     * The torso collection that is acting as a cache used to create the private collections.
     * This property/option is required.  Instantiation will fail if it is not set.
     * @property {Collection} cache
     */
    cache: undefined,

    /**
     * Adds a listener on the Behavior for the `fetched` event that triggers a render on the view.
     * true - A listener is added to the behavior that re-renders the view when a 'fetched' event is triggered.
     * false (default) - no listeners are added.
     * @property {boolean} renderOnFetch
     * @default false
     */
    renderOnFetch: false,

    /**
     * Skip triggering a load of this data behavior when the view completes initializing.
     * true - no load after the view is initialized.
     * false (default) - trigger a .retrieve() on this data behavior when the view completes initialization.
     * @property {boolean} skipInitialLoad
     * @default false
     */
    skipInitialLoad: false,

    /**
     * Determines the result of `view.getBehavior('thisBehaviorAlias').toJSON()`.
     * true - a single model result is returned.
     * false (default) - an array of model results are returned.
     * @property {boolean} returnSingleResult
     * @default false
     */
    returnSingleResult: false,

    /**
     * Determines whether `pull()` or `fetch()` is called when using `retrieve()`.
     * true - Use fetch() by default on the private collection.
     * false (default) - Use pull() by default on the private collection.
     * True will query the server more often, but will provide more up-to-date data.
     * False will only query the server if the model hasn't already been retrieved.
     * This property will be ignored if `fetch()` or `pull()` is called directly.
     * @property {boolean} alwaysFetch
     * @default false
     */
    alwaysFetch: false,

    /**
     * Duck-typed property that identifies the ids to use. id or ids is required (either by behavior options or as properties).
     *   - {(string|number)} - the id to use directly (equivalent to an array of a single id).
     *   - {(string[]|number[])} - the ids to use directly.
     *   - {Object} - more complex configuration that identifies a model-like object that fires a change event and the
     *                property on that object to use. The object can fire the change event for the given property
     *                and have a .get('propertyName') method, or it can define the property directly on the idContainer.
     *                Only one property can be identified as supplying the id for this data model.
     *                If the identified object does not fire a change event then the id(s) will never be refreshed for this behavior.
     *                The idContainer can also fire a 'fetched:ids' event on itself to signal to this data behavior that the ids
     *                have been fetched for the first time.  Then a 'change:<propertyName>' event can be used to notify this
     *                data behavior that the property has been modified.
     *     - property {string} - the name of the property that defines the ids. The root object is assumed to be the view unless
     *                           idContainer is defined. The idContainer is the object that fires a change event for the given property name.
     *                           Uses the view or the idContainer as the root to get the identified property (i.e. 'viewState.', 'model.', etc).
     *                           Will get the property before the first '.' from the view and if it is an object will try to use a
     *                           .get('<propertyName>') on it and set a 'change:<propertyName>' listener on it.
     *                           If it is a string/number or array of string/number, then it will use that as the ids.
     *                           Triggering a 'id-container-updated' event on the behavior will cause it to stop listing to the
     *                           old idContainer and start listening to the new one defined by this property.
     *     - idContainer {Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change
     *                           events and has a .get('propertyName') function. It isn't required to fire events -
     *                           the change event is only required if it needs to re-fetch when the id property value changes.
     *     Examples:
     *       - { property: '_patientId' }
     *       - { property: 'viewState.appointmentId' }
     *       - { property: 'model.type' }
     *       - { property: 'behaviors.demographics.data.appointments' }
     *       - { property: 'id', idContainer: userService }
     *       - { property: 'username', idContainer: function() { application.getCurrentUser() } }
     *   - {Function(cache)} - expected to return the ids (either array, jquery deferred that resolves to the ids or single primitive)
     *                         to track with the private collection. Cache is passed in as the first argument so that the behavior
     *                         can be defined and the cache can be overridden later.
     *                         'this' is the behavior (from which you can get the view if needed).
     *                         What was criteria should use this instead:
     *
     *         function(cache) {
     *           var thisBehaviorInstance = this;
     *           var view = this.view;
     *           var criteria = { ... some criteria ... };
     *           return cache.fetchIdsByCriteria(criteria);
     *         }
     * @property {(string|number|string[]|number[]|Object|Function)} ids
     */
    ids: undefined,

    /**
     * cause this behavior to re-calculate its ids and refetch them from the server if the given events are triggered
     * (space separated if string, single item is equivalent to array of single item).
     *   - 'view:eventName' - arbitrary event triggered on the view (eventName can be a change:propertyName event).
     *   - 'viewState:eventName' - arbitrary event triggered on the viewState (eventName can be a change:propertyName event).
     *   - 'model:eventName' - arbitrary even triggered on the view's model (eventName can be a change:propertyName event).
     *   - 'this:eventName' - arbitrary event triggered by this behavior (eventName can be a change:propertyName event).
     *   - 'behaviorAlias:eventName' - arbitrary event triggered by another data behavior on this view (eventName can be a change:propertyName event).
     *   - 'behaviorAlias.data:eventName' - arbitrary event triggered by the data of another DataBehavior on this view (eventName can be a change:propertyName event).
     *   - { '<eventName>': < object (or function returning an object) that the event is triggered on > } - arbitrary ('<eventName>') triggered on the supplied object.
     * @property {(string|string[]|Object|Object[])} updateEvents
     */
    updateEvents: undefined,

    /**
     * Object that manages interaction with the data.  Contains the privateCollection, proxies all events from the privateCollection,
     * and has get('...') and .toJSON() methods that access the private collection data.
     * @property {Torso.behaviors.DataBehavior.Data} data
     */
    data: undefined,

    /**
     * The possible fetched statuses.  This is the status value of the fetched event payload.
     * @property {Object} { SUCCESS: 'SUCCESS', FAILURE: 'FAILURE' } FETCHED_STATUSES
     */
    FETCHED_STATUSES: FETCHED_STATUSES,

    /**
     * @override
     * @param {Object} [behaviorState] the initial state of the behavior.
     * @param {Object} behaviorOptions
     *   @param {Collection} behaviorOptions.cache see cache property.
     *   @param {boolean} [behaviorOptions.renderOnFetch=false] see renderOnFetch property.
     *   @param {boolean} [behaviorOptions.skipInitialLoad=false] see skipInitialLoad property.
     *   @param {boolean} [behaviorOptions.returnSingleResult=false] see returnSingleResult property.
     *   @param {boolean} [behaviorOptions.alwaysFetch=false] see alwaysFetch property.
     *   @param {string|number|string[]|number[]|{property: String, idContainer: Object}|Function} [behaviorOptions.id=behaviorOptions.ids] see id property.
     *   @param {string|number|string[]|number[]|{property: String, idContainer: Object}|Function} [behaviorOptions.ids=behaviorOptions.id] see ids property.
     *   @param {(string|string[]|Object|Object[])} [behaviorOptions.updateEvents] see updateEvents property.
     * @param {Object} [viewOptions] options passed to View's initialize
     */
    constructor: function(behaviorState, behaviorOptions, viewOptions) {
      _.bindAll(this, '__skipRetrieveOnEmptyTrackedIdsAndNewIds', '__completeLoadingIds', '__fetchSuccess', '__fetchFailed', '__abortIfDisposed');
      behaviorOptions = behaviorOptions || {};
      behaviorOptions = _.defaults(behaviorOptions, {
        alwaysFetch: false
      });
      _.extend(this, _.pick(behaviorOptions, 'cache', 'id', 'ids', 'renderOnFetch', 'skipInitialLoad', 'returnSingleResult', 'alwaysFetch', 'updateEvents'));

      this.__validateCache();
      this.__normalizeAndValidateIds();
      this.__normalizeAndValidateUpdateEvents();

      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.data = new this.Data({
        parentBehavior: this,
        privateCollection: this.cache.createPrivateCollection(this.cid)
      });

      Behavior.apply(this, arguments);

      this.set('loadingIds', 0);

      this.on('id-container-updated', this.listenToIdsPropertyChangeEvent);
      this.on('id-container-updated', this.retrieve);
      this.listenTo(this.view, 'initialize:complete', this.listenToIdsPropertyChangeEvent);
      this.listenTo(this.view, 'initialize:complete', this._delegateUpdateEvents);
      if (!this.skipInitialLoad) {
        this.listenTo(this.view, 'initialize:complete', this.retrieve);
      }

      // This allows 'renderOnFetch' to be changed at runtime after the constructor is executed.
      this.on('fetched', function() {
        // If a view isn't active then it shouldn't be rendering.
        // When a view is attached it is rendered anyway.
        if (this.renderOnFetch && this.view.isActive() && this.view.isAttached()) {
          this.view.render();
        }
      });
      this.listenTo(this.view, 'before-dispose-callback', this.data.dispose);
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection to track and then does a
     * pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    retrieve: function() {
      if (this.alwaysFetch) {
        return this.fetch();
      } else {
        return this.pull();
      }
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection's trackAndPull() method.
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    pull: function() {
      var thisDataBehavior = this;
      return this.__getIds()
        .then(this.__skipRetrieveOnEmptyTrackedIdsAndNewIds)
        .then(this.__abortIfDisposed)
        .then(function(idsResult) {
          if (idsResult && !idsResult.skipObjectRetrieval) {
            return thisDataBehavior.data.privateCollection.trackAndPull(idsResult);
          }
          return idsResult;
        }, function(errorResponse) {
          errorResponse.failedOnIds = true;
          return errorResponse;
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection's trackAndFetch() method.
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    fetch: function() {
      var thisDataBehavior = this;
      return this.__getIds()
        .then(this.__skipRetrieveOnEmptyTrackedIdsAndNewIds)
        .then(this.__abortIfDisposed)
        .then(function(idsResult) {
          if (idsResult && !idsResult.skipObjectRetrieval) {
            return thisDataBehavior.data.privateCollection.trackAndFetch(idsResult);
          }
          return idsResult;
        }, function(errorResponse) {
          errorResponse.failedOnIds = true;
          return errorResponse;
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Adds the toJSON of the data represented by this behavior to the context.
     * @override
     */
    prepare: function() {
      var behaviorContext = Behavior.prototype.prepare.apply(this) || {};
      behaviorContext.data = this.data.toJSON();
      behaviorContext.loading = this.isLoading();
      behaviorContext.loadingIds = this.isLoadingIds();
      behaviorContext.loadingObjects = this.isLoadingObjects();
      return behaviorContext;
    },

    /**
     * Determine if the behavior is loading objects or ids.
     * @return {boolean} true - the behavior is currently loading objects or ids.
     *                   false - the behavior is not currently loading objects or ids.
     */
    isLoading: function() {
      return this.isLoadingIds() || this.isLoadingObjects();
    },

    /**
     * Determine if the behavior is loading ids.
     * @return {boolean} true - the behavior is currently loading ids.
     *                   false - the behavior is not currently loading ids.
     */
    isLoadingIds: function() {
      return this.get('loadingIds') > 0;
    },

    /**
     * Determine if the behavior is loading objects.
     * @return {boolean} true - the behavior is currently loading objects.
     *                   false - the behavior is not currently loading objects.
     */
    isLoadingObjects: function() {
      return this.data.privateCollection.isLoading();
    },

    /**
     * Listens for the change event on the ids property and, if triggered, re-fetches the data based on the new ids.
     */
    listenToIdsPropertyChangeEvent: function() {
      if (!_.isUndefined(this.ids.property)) {
        this.stopListeningToIdsPropertyChangeEvent();
        var idsPropertyNameAndContext = this.__parseIdsPropertyNameAndIdContainer();
        var idContainer = idsPropertyNameAndContext.idContainer;
        var canListenToEvents = idContainer && _.isFunction(idContainer.on);
        if (canListenToEvents) {
          this.__currentContextWithListener = idContainer;
          this.__currentContextEventName = 'change:' + idsPropertyNameAndContext.idsPropertyName;
          this.listenTo(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
          this.listenTo(this.__currentContextWithListener, 'fetched:ids', this.retrieve);
        }
      }
    },

    /**
     * Removes the listener added by listenToIdsPropertyChangeEvent().
     */
    stopListeningToIdsPropertyChangeEvent: function() {
      if (this.__currentContextWithListener) {
        this.stopListening(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
        this.stopListening(this.__currentContextWithListener, 'fetched:ids', this.retrieve);
        delete this.__currentContextWithListener;
        delete this.__currentContextEventName;
      }
    },

    /**
     * This is a good way to have something be called after at least one retrieve (pull or fetch) has completed.
     * This is especially useful if you don't care if the fetch has already happen you just want to do something once
     * the data is loaded.
     *
     * This can also be done purely by listening for the 'fetched' event, but you might miss the event if it is fired
     * before you start listening.  This gives a structure for handling that case so that your methods are called
     * if the event is fired and if it is not fired.
     *
     * This also gives the ability to distinguish between a successful and failed fetch easily using the promises
     * resolve/reject handlers.
     *
     * Usage:
     *
     * someDataBehavior.retrieveOncePromise()
     *   .then(view.doSomethingWithTheData, view.handleFiledFetch);
     *
     * @return {external:jQuery-Deferred} that resolves when the data is successfully fetched and rejects when the fetch fails.
     */
    retrieveOncePromise: function() {
      var retrieveOnceDeferred = $.Deferred();
      var demographicsFetchSuccess = this.get('fetchSuccess');
      if (demographicsFetchSuccess) {
        retrieveOnceDeferred.resolve();
      } else if (demographicsFetchSuccess === false) {
        retrieveOnceDeferred.reject();
      } else {
        this.once('fetched', function() {
          var demographicsFetchSuccess = this.get('fetchSuccess');
          if (demographicsFetchSuccess) {
            retrieveOnceDeferred.resolve();
          } else {
            retrieveOnceDeferred.reject();
          }
        });
      }
      return retrieveOnceDeferred.promise();
    },

    /**
     * Removes existing listeners and adds new ones for all of the updateEvents configured.
     * @private
     */
    _delegateUpdateEvents: function() {
      this._undelegateUpdateEvents();
      var updateEvents = this.__parseUpdateEvents();
      _.each(updateEvents, function(parsedUpdateEvent) {
        this.listenTo(parsedUpdateEvent.idContainer, parsedUpdateEvent.eventName, this.retrieve);
      }, this);
    },

    /**
     * Removes existing event listeners.
     * @private
     */
    _undelegateUpdateEvents: function() {
      var updateEvents = this.__parseUpdateEvents();
      _.each(updateEvents, function(parsedUpdateEvent) {
        this.stopListening(parsedUpdateEvent.idContainer, parsedUpdateEvent.eventName, this.retrieve);
      }, this);
    },

    /**
     * Parses this.updateEvents configuration.
     * @return {Object[]} {[{ eventName: String, idContainer: Object }]} an array of objects with the event name and idContainer included.
     * @private
     */
    __parseUpdateEvents: function() {
      this.__normalizeAndValidateUpdateEvents();
      var updateEvents = _.flatten(_.map(this.updateEvents, this.__parseUpdateEvent, this));
      return _.compact(updateEvents);
    },

    /**
     * Parses an individual event configuration.
     * Note: events defined using objects can have more than one event defined w/in the object.
     * @param {string | Object} updateEventConfiguration the configuration for an individual event configuration.
     * @return {(Object[]|undefined)} {[{ eventName: String, idContainer: Object }] | undefined} an array of objects with the event name and idContainer included.
     *                                                                If the event could not be parsed, undefined is returned.
     * @private
     */
    __parseUpdateEvent: function(updateEventConfiguration) {
      if (_.isUndefined(updateEventConfiguration)) {
        return undefined;
      }
      var parsedUpdateEvents = [];
      if (_.isString(updateEventConfiguration)) {
        var updateEvent = this.__parseStringUpdateEvent(updateEventConfiguration);
        if (!_.isUndefined(updateEvent)) {
          parsedUpdateEvents.push(updateEvent);
        }
      } else if (_.isObject(updateEventConfiguration)) {
        parsedUpdateEvents = _.map(updateEventConfiguration, function(idContainer, eventName) {
          return {
            idContainer: idContainer,
            eventName: eventName
          };
        });
      }
      return parsedUpdateEvents;
    },

    /**
     * Validates that the cache property is valid and if not throws an error describing why its not valid.
     * @private
     */
    __validateCache: function() {
      if (!this.cache) {
        throw new Error('Torso Data Behavior constructed without a cache');
      }
      if (!(this.cache instanceof Collection)) {
        throw new Error('Torso Data Behavior\'s cache is not of type Torso.Collection');
      }
    },

    /**
     * Validates that the ids property is valid and if not throws an error describing why its not valid.
     * A side effect of this method is copying id into the ids location (if id is set).  Ids is what is used by the rest of the code.
     * This is done as part of validation because we first validate that both are not set.
     * @private
     */
    __normalizeAndValidateIds: function() {
      if (!_.isUndefined(this.ids) && !_.isUndefined(this.id)) {
        throw new Error('Torso Data Behavior constructed with both id and ids.  Please define only one.');
      }
      this.ids = this.id || this.ids;
      this.__validateIds();
    },

    /**
     * Validates that the ids property is valid and if not throws an error describing why its not valid.
     * A side effect of this method is copying id into the ids location (if id is set).  Ids is what is used by the rest of the code.
     * This is done as part of validation because we first validate that both are not set.
     * @private
     */
    __validateIds: function() {
      if (_.isUndefined(this.ids)) {
        throw new Error('Torso Data Behavior constructed without a way to identify the ids for this data.  Please define either id, ids.');
      }

      var idsIsArray = _.isArray(this.ids);
      var idsIsSingleId = _.isString(this.ids) || _.isNumber(this.ids);
      var idsIsFunction = _.isFunction(this.ids);
      var idsIsObjectWithStringProperty = _.isString(this.ids.property);
      var idsIsObject = _.isObject(this.ids);
      var idsIsValid = idsIsArray || idsIsSingleId || idsIsFunction || idsIsObjectWithStringProperty;
      if (!idsIsValid && idsIsObject) {
        throw new Error('Data Behavior ids invalid definition.  It is an object, but the property field is not defined or is not a string: ' + JSON.stringify(this.ids));
      } else if (!idsIsValid) {
        throw new Error('Data Behavior ids invalid definition.  Not a string, number, object, array or function: ' + JSON.stringify(this.ids));
      }

      if (idsIsObjectWithStringProperty) {
        var propertyNameContainsIdContainer = containsContainerDefinition(this.ids.property);
        var hasIdContainerProperty = !_.isUndefined(this.ids.idContainer);

        if (hasIdContainerProperty && propertyNameContainsIdContainer) {
          throw new Error('Data Behavior ids invalid definition.  Id container defined on both ids.property and ids.idContainer: ', JSON.stringify(this.ids));
        }
      }
    },

    /**
     * Validates that the updateEvents property is valid and if not throws an error describing why its not valid.
     * @private
     */
    __normalizeAndValidateUpdateEvents: function() {
      var updateEventsIsArray = _.isArray(this.updateEvents);
      var updateEventsIsSingleValue = !updateEventsIsArray && (_.isObject(this.updateEvents) || _.isString(this.updateEvents));
      var updateEventsIsUndefined = _.isUndefined(this.updateEvents);
      var updateEventsIsValidType = updateEventsIsArray || updateEventsIsSingleValue || updateEventsIsUndefined;

      if (updateEventsIsSingleValue) {
        this.updateEvents = [this.updateEvents];
      }

      if (!updateEventsIsValidType) {
        throw new Error('Update events are not an array, string or object.  Please see parameters for examples of how to define updateEvents.  Configured UpdateEvents: ', this.updateEvents);
      }

      // Remove any random falsey values (mostly to get rid of undefined events).
      this.updateEvents = _.compact(this.updateEvents);
      _.each(this.updateEvents, this.__validUpdateEvent);
    },

    /**
     * Validates that the updateEventConfiguration is valid and if not throws an error describing why its not valid.
     * @private
     */
    __validUpdateEvent: function(updateEventConfiguration) {
      var validStringConfig = _.isString(updateEventConfiguration);
      var validObjectConfig = _.isObject(updateEventConfiguration) && _.keys(updateEventConfiguration).length > 0;
      if (!validStringConfig && !validObjectConfig) {
        throw new Error('Not a valid updateEvent configuration.  Update events need to either be strings or objects with a single property: ' + JSON.stringify(updateEventConfiguration));
      }
    },

    /**
     * @return {$.Deferred.Promise} A jquery deferred promise that resolves to the ids to track in the private collection
     *                              or rejects with the error message.
     *                              It can also return an object that prevents object retrieval ({ skipObjectRetrieval: true }).
     * @private
     */
    __getIds: function() {
      this.set('loadingIds', this.get('loadingIds') + 1);
      this.__validateIds(); // validate ids enforces a fast-fail that guarantees that one of the if statements below will work.

      var idsDeferred = $.Deferred();
      var ids = this.ids;
      var normalizedIds = normalizeIds(ids);
      if (!_.isUndefined(normalizedIds)) {
        idsDeferred.resolve(normalizedIds);
      } else if (_.isFunction(this.ids)) {
        ids = this.ids(this.cache);
        normalizedIds = normalizeIds(ids);
        if (!_.isUndefined(normalizedIds)) {
          idsDeferred.resolve(normalizedIds);
        } else if (ids && _.isFunction(ids.then)) {
          idsDeferred = ids.then(normalizeIds);
        } else {
          idsDeferred.resolve([]);
        }
      } else if (!_.isUndefined(this.ids.property)) {
        var parsedContextDefinition = this.__parseIdsPropertyNameAndIdContainer();
        var propertyName = parsedContextDefinition.idsPropertyName;
        var idContainer = parsedContextDefinition.idContainer;

        ids = getNestedProperty(idContainer, propertyName);
        var propertyOnContextIsUndefined = idContainer && _.isUndefined(ids);
        var idContainerHasGetMethod = idContainer && _.isFunction(idContainer.get);

        if (propertyOnContextIsUndefined && idContainerHasGetMethod) {
          ids = idContainer.get(propertyName);
        }
        normalizedIds = normalizeIds(ids);

        idsDeferred.resolve(normalizedIds);
      }
      return idsDeferred.promise()
        .then(undefinedOrNullToEmptyArray)
        .always(this.__completeLoadingIds);
    },

    /**
     * Sets the loading ids property to false (loading completed).
     * @private
     */
    __completeLoadingIds: function() {
      this.set('loadingIds', this.get('loadingIds') - 1);
    },

    /**
     * Converts the definition into the actual idContainer object and property name to retrieve off of that idContainer.
     * @return {{idsPropertyName: String, idContainer: Object}} the name of the ids property and the actual object to use as the idContainer.
     * @private
     */
    __parseIdsPropertyNameAndIdContainer: function() {
      var propertyName = this.ids.property;
      var propertyNameContainsIdContainer = containsContainerDefinition(propertyName);
      var hasIdContainerProperty = !_.isUndefined(this.ids.idContainer);

      var idContainer;
      if (hasIdContainerProperty) {
        idContainer = this.__parseIdContainer();
      }

      if (propertyNameContainsIdContainer) {
        var containerAndDetail = this.__parseContainerDetailString(propertyName);
        propertyName = containerAndDetail.detail;
        idContainer = containerAndDetail.idContainer;
      }

      if (_.isUndefined(idContainer)) {
        idContainer = this.view;
      }

      return {
        idsPropertyName: propertyName,
        idContainer: idContainer
      };
    },

    /**
     * Parses the idContainer property of ids.
     * @return {Object} the idContainer object to apply the properties value to (may not be the final idContainer depending on the property definition).
     * @private
     */
    __parseIdContainer: function() {
      var idContainerDefinition = this.ids.idContainer;
      var idContainer;
      if (_.isUndefined(idContainerDefinition)) {
        idContainer = undefined;
      } else if (_.isFunction(idContainerDefinition)) {
        var idContainerFxn = _.bind(idContainerDefinition, this);
        idContainer = idContainerFxn();
      } else if (_.isObject(idContainerDefinition)) {
        idContainer = idContainerDefinition;
      } else {
        throw new Error('Invalid idContainer.  Not an object or function: ' + JSON.stringify(this.ids));
      }
      return idContainer;
    },

    /**
     * Parses a string that contains a container and details for that container (event name or property name).
     * Strings are expected to be of the form '<some container path>:<detail>'.
     * @param fullContainerAndDetail
     * @return {{detail: String, idContainer: *}} the idContainer is the actual object containing the ids.
     *         details is the rest of the idContainer string without the idContainer definition.
     * @private
     */
    __parseContainerDetailString: function(fullContainerAndDetail) {
      var containerString = '';
      if (containsContainerDefinition(fullContainerAndDetail)) {
        containerString = fullContainerAndDetail.split(CONTAINER_SEPARATOR, 1)[0];
      }
      var containerStringParts = containerString.split(PROPERTY_SEPARATOR);

      var rootContainerString = containerStringParts[0];
      var rootContainer;
      if (rootContainerString === 'this') {
        rootContainer = this;
      } else if (rootContainerString === 'behaviors' || rootContainerString === 'behavior') {
        var behaviorAlias = containerStringParts[1];
        rootContainerString += PROPERTY_SEPARATOR + behaviorAlias; // property track what part of the string has been consumed.
        rootContainer = this.view.getBehavior(behaviorAlias);
      } else {
        if (rootContainerString !== 'view') {
          rootContainerString = ''; // property track what part of the string has been consumed.
        }
        rootContainer = this.view;
      }

      var container = rootContainer;
      var rootContainerPropertyString = containerString.replace(rootContainerString, '');
      if (rootContainerPropertyString) {
        // remove leading .
        if (rootContainerPropertyString[0] === PROPERTY_SEPARATOR) {
          rootContainerPropertyString = rootContainerPropertyString.slice(1);
        }
        container = getNestedProperty(rootContainer, rootContainerPropertyString);
      }

      var detail = fullContainerAndDetail.replace(containerString + CONTAINER_SEPARATOR, '');
      return {
        detail: detail,
        idContainer: container
      };
    },

    /**
     * Parse a string type update event.
     * Context Key (first part of the string up to the first ':') can be one of the following:
     *   this (maps to the behavior),
     *   view or empty (maps to the behavior's view),
     *   viewState (maps to the behavior's view's viewState),
     *   model (maps to the behavior's view's model),
     *   <*> any others are assumed to be the names of behaviors on this behavior's view.
     * @param {string} updateEventConfiguration a string representation of the event.
     * @return {{eventName: String, idContainer: Backbone.Events}} the parsed configuration with the event name and idContainer object.
     * @private
     */
    __parseStringUpdateEvent: function(updateEventConfiguration) {
      var parsedIdContainerDetails = this.__parseContainerDetailString(updateEventConfiguration);
      if (parsedIdContainerDetails) {
        return {
          idContainer: parsedIdContainerDetails.idContainer,
          eventName: parsedIdContainerDetails.detail
        };
      }
    },

    /**
     * Rejects the promise chain if this behavior is already disposed.
     * @return {external:jQuery-Deferred} that is resolved if the behavior is not disposed and rejects if the behavior is disposed.
     * @private
     */
    __abortIfDisposed: function() {
      var resultDeferred = $.Deferred();
      if (this.isDisposed()) {
        var rejectArguments = Array.prototype.slice.call(arguments);
        rejectArguments.push('Data Behavior disposed, aborting.');
        resultDeferred.reject.apply(resultDeferred, rejectArguments);
      } else {
        resultDeferred.resolve.apply(resultDeferred, arguments);
      }
      return resultDeferred.promise();
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'success' } when the fetch completes successfully.
     * @param {Object} response the response from the server.
     *   @param {boolean} [response.skipObjectRetrieval=false] if we retrieved objects, then trigger fetch event.
     *   @param {boolean} [response.forceFetchedEvent=false] if true then trigger fetch no matter what.
     * @private
     */
    __fetchSuccess: function(response) {
      this.set('fetchSuccess', true);
      this.set('fetchedOnce', true);
      if (this.__shouldTriggerFetchedEvent(response)) {
        this.trigger('fetched', {
          status: FETCHED_STATUSES.SUCCESS,
          response: response
        });
        this.data.trigger('fetched', {
          status: FETCHED_STATUSES.SUCCESS,
          response: response
        });
      }
      this.trigger('fetched:ids');
      this.data.trigger('fetched:ids');
      return response;
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'failed' } when the fetch fails.
     * @param {Object} [response] the response from the server.
     *   @param {boolean} [response.skipObjectRetrieval=false] if we retrieved objects, then trigger fetch event.
     *   @param {boolean} [response.forceFetchedEvent=false] if true then trigger fetch no matter what.
     *   @param {boolean} [response.emptyIds=false] true if were are no ids retrieved.  False otherwise.
     * @private
     */
    __fetchFailed: function(response) {
      this.set('fetchSuccess', false);
      this.set('fetchedOnce', true);
      if (this.__shouldTriggerFetchedEvent(response)) {
        this.trigger('fetched', {
          status: FETCHED_STATUSES.FAILURE,
          response: response
        });
        this.data.trigger('fetched', {
          status: FETCHED_STATUSES.FAILURE,
          response: response
        });
        if (response && response.emptyIds) {
          this.__firstEmptyFetchedTriggered = true;
        }
      }
      this.trigger('fetched:ids');
      this.data.trigger('fetched:ids');
      return response;
    },

    /**
     * Determines if the 'fetched' event should be triggered in the __fetchFailed or __fetchSuccess methods.
     * @param {Object} response to use to determine if the fetched event should be triggered.
     *   @param {boolean} [response.skipObjectRetrieval=false] if we retrieved objects, then trigger fetch event.
     *   @param {boolean} [response.forceFetchedEvent=false] if true then trigger fetch no matter what.
     * @return {boolean} true if the fetched event should be triggered, false otherwise.
     * @private
     */
    __shouldTriggerFetchedEvent: function(response) {
      return !response || !response.skipObjectRetrieval || response.forceFetchedEvent;
    },

    /**
     * Skip retrieving objects if new ids list is empty and existing ids list is empty.
     * @param {(Array|Object)} idsResult
     * @return {(Array|Object)} either the original idsResult
     *                        or { skipObjectRetrieval: true, forceFetchedEvent: true } if both the ids retrieved
     *                        and the current ids are empty.
     * @private
     */
    __skipRetrieveOnEmptyTrackedIdsAndNewIds: function(idsResult) {
      if (_.isEmpty(idsResult) && _.isEmpty(this.data.privateCollection.getTrackedIds())) {
        return { skipObjectRetrieval: true, forceFetchedEvent: true };
      } else {
        return idsResult;
      }
    },

    /**
     * Adds listeners when the view is activated.
     * @private
     */
    _activate: function() {
      this.listenToIdsPropertyChangeEvent();
      this._delegateUpdateEvents();
      this.data.activate();
    },

    /**
     * Stops listening when the view is deactivated.
     * @private
     */
    _deactivate: function() {
      this.stopListeningToIdsPropertyChangeEvent();
      this._undelegateUpdateEvents();
      this.data.deactivate();
    }
  });

  /**
   * @module Torso.behaviors.DataBehavior
   * @namespace Torso.behaviors.DataBehavior
   */

  /**
   * Data object used to create the .data property of the DataBehavior.
   * @class Data
   * @inner
   * @memberof DataBehavior
   */
  var Data = function(options) {
    this.initialize(options);
  };

  _.extend(Data.prototype, Events, /** @lends Data */ {
    /**
     * Instantiates the data objects and binds it to this behavior instance.
     * @param {Object} options to pass to the initialize methods.
     *   @param {DataBehavior} options.parentBehavior the data behavior instance that this Data object should be bound to.
     *   @param {Collection} options.privateCollection the private collection that this data represents.
     */
    initialize: function(options) {
      /**
       * The dataBehavior instance that owns this data object.
       * @property {DataBehavior} parentBehavior
       */
      this.parentBehavior = options.parentBehavior;
      /**
       * The private collection that this data object manages.
       * @property {Collection} privateCollection
       */
      this.privateCollection = options.privateCollection;

      _.bindAll(this, 'dispose');
    },

    /**
     * Determine if behavior is loading ids or objects.
     * @return {boolean} true - the behavior is loading objects or ids.
     *                   false - the behavior is not loading objects or ids.
     */
    isLoading: function() {
      return this.parentBehavior.isLoading();
    },

    /**
     * Determine if the behavior is loading ids.
     * @return {boolean} true - the behavior is currently loading ids.
     *                   false - the behavior is not currently loading ids.
     */
    isLoadingIds: function() {
      return this.parentBehavior.isLoadingIds();
    },

    /**
     * Determine if the behavior is loading objects.
     * @return {boolean} true - the behavior is currently loading objects.
     *                   false - the behavior is not currently loading objects.
     */
    isLoadingObjects: function() {
      return this.parentBehavior.isLoadingObjects();
    },

    /**
     * Get the full data object contents.  Either an array if returnSingleResult is false or a single object if it is true.
     * @return {(Object|Object[])} containing the full contents of either the collection or model.
     */
    toJSON: function() {
      var privateCollection = this.privateCollection;
      if (!this.parentBehavior.returnSingleResult) {
        return privateCollection.toJSON();
      }

      if (privateCollection.length === 0) {
        return undefined;
      } else if (privateCollection.length === 1) {
        var singleResultModel = privateCollection.at(0);
        return singleResultModel.toJSON();
      } else {
        throw new Error('Multiple results found, but single result expected: ' + JSON.stringify(privateCollection.toJSON()));
      }
    },

    /**
     * Get the full data object contents (either an array of model attributes or a single model attribute based on the
     * value of propertyName) or the value of a specific property if a single result is expected.
     *
     * If returnSingleResult is true then this will return the given property from the model (if that model exists).
     * If returnSingleResult is false then this will return an array containing that property from all of the retrieved models.
     * @param {string} [propertyName] the property to get from the model(s).
     * @return {(Object|Object[])} containing the full contents of either the collection or model.
     */
    get: function(propertyName) {
      var privateCollection = this.privateCollection;
      if (!this.parentBehavior.returnSingleResult) {
        if (_.isString(propertyName)) {
          return privateCollection.pluck(propertyName);
        } else {
          return privateCollection.toJSON();
        }
      }

      var singleResultModel = this.getModel();
      if (singleResultModel) {
        if (_.isString(propertyName)) {
          return singleResultModel.get(propertyName);
        }
        return singleResultModel.toJSON();
      }
    },

    /**
     * @param {(number|string)} modelId The id of the model to get from the collection.
     * @return {Backbone.Model} either the model with the given id or the only model on this behavior (if model id is undefined).
     * @throws an error if there are more than 1 result or the configuration of the behavior specifies returnSingleResult === false.
     */
    getModel: function(modelId) {
      var privateCollection = this.privateCollection;
      if (!this.parentBehavior.returnSingleResult && _.isUndefined(modelId)) {
        throw new Error('data.getModel() of a DataBehavior is only valid if the behavior is set to returnSingleResult === true');
      }

      if (!_.isUndefined(modelId)) {
        return privateCollection.get(modelId);
      }

      if (privateCollection.length === 0) {
        return undefined;
      } else if (privateCollection.length === 1) {
        return privateCollection.at(0);
      } else {
        throw new Error('Multiple results found, but single result expected: ' + JSON.stringify(privateCollection.toJSON()));
      }
    },

    /**
     * @return {Backbone.Model[]} new array containing all the models in the data's private collection.
     */
    getModels: function() {
      return this.privateCollection.models.slice(0);
    },

    /**
     * Adds the listeners to the private collection.
     */
    activate: function() {
      this.listenTo(this.privateCollection, 'all', this.trigger);
    },

    /**
     * Removes the listeners on the private collection.
     */
    deactivate: function() {
      this.stopListening(this.privateCollection, 'all', this.trigger);
    },

    /**
     * Dispose of the data events.
     */
    dispose: function() {
      this.off();
      this.stopListening();
      this.privateCollection.dispose();
    }
  });

  DataBehavior.prototype.Data = Data;
  DataBehavior.FETCHED_STATUSES = FETCHED_STATUSES;

  return DataBehavior;
}));
