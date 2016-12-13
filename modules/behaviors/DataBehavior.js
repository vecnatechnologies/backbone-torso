(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', '../Behavior', '../Collection', '../Events'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var $ = require('jquery');
    var Behavior = require('../Behavior');
    var Collection = require('../Collection');
    var Events = require('../Events');
    module.exports = factory(_, $, Behavior, Collection, Events);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.behaviors = root.Torso.behaviors || {};
    root.Torso.behaviors.DataBehavior = factory(root._, root.$, root.Torso.Behavior, root.Torso.Collection, root.Torso.Events);
  }
}(this, function(_, $, Behavior, Collection, Events) {
  'use strict';

  /**
   * Converts string or number values into an array with a single string or number item.
   * If the input is not a string, number or array then undefined is returned.
   * This is a private helper method used internally by this behavior and is not exposed in any way.
   * @param ids {String|Number|String[]|Number[]} the ids to convert.
   * @return {String[]|Number[]} an array of strings or numbers.
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
    }
  }

  /**
   * Behaviors defined in Torso.
   * @module Torso.behaviors
   * @namespace Torso.behaviors
   */

  /**
   * This behavior implements simplified interaction with data sources (i.e. TorsoCollection).
   * This behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.
   * This behavior also manages dependencies between data and other objects to allow intelligent re-fetching when data changes.
   *
   * Example Configuration on the view:
   *
   *     TorsoView.extend({
   *       behaviors: {
   *         demographics: {
   *           behavior: TorsoDataBehavior,
   *           cache: require('./demographicsCacheCollection'),
   *           returnSingleResult: true,
   *           id: { property: '_patientVecnaId' }
   *         }
   *       }
   *     }
   *
   * Any options for this behavior can also be configured directly on it using the same extension mechanism as other
   * Backbone or Torso objects.
   *
   * Example configuration by extension:
   *
   *     var AppointmentDataBehavior = DataBehavior.extend({
   *       cache: require('./appointmentCacheCollection'),
   *       id: { property: '_appointmentExternalId' },
   *       returnSingleResult: true,
   *       alwaysFetch: true
   *     });
   *
   * Ways to cause this data behavior to refresh the data.  Ids are retrieved from the idsContainer whenever a refresh of data is requested.
   *  * __view.getBehavior('thisBehaviorAlias').pull()__ - Any ids that are already in the cache are added immediately.
   *                                                       Any that are not already in the cache are fetched as a single batch of ids.
   *  * __view.getBehavior('thisBehaviorAlias').fetch()__ - Regardless of the cache state all ids identified by this behavior are fetched from the server.
   *  * __view.getBehavior('thisBehaviorAlias').retrieve()__ - Will either fetch or pull based on the current value of 'alwaysFetch'.
   *                                                           Defaults to pull (if alwaysFetch is not explicitly set).
   *  * __view.getBehavior('thisBehaviorAlias').trigger('ids-container-updated')__ - this is a way to indicate that the id container changed
   *                                                                                 which means the id listeners should be rebound and data should be refreshed.
   *  * __idsContainer.trigger('change:<idPropertyName>')__ - This is the change event that is already emitted by Cell-like objects when their properties change.
   *  * __idsContainer.trigger('fetched:ids')__ - This indicates that the ids have been fetched for the first time (when a change event may not be fired) and is used
   *                                              mainly to chain data behaviors together (this event is also emitted by this behavior whenever a fetch or pull completes).
   *
   * Ways to get properties from the data in this behavior:
   *  * __view.getBehavior('thisBehaviorAlias').data.toJSON()__ - Either array of data if returnSingleResult is false (default),
   *                                                              Or the object data directly if returnSingleResult is true.
   *  * __view.getBehavior('thisBehaviorAlias').data.toJSON('some.data.property')__ - returns just that property of the result or undefined if it hasn't been fetched or doesn't exist.
   *                                                                                  If returnSingleResult is false then an array of values for that object is returned
   *                                                                                  This is equivalent to _.pluck(view.getBehavior('thisBehaviorAlias').toJSON(), 'some.data.property').
   *
   *   The context generated by `view.prepare()` will contain all of the data associated with this view namespaced by the behavior's alias .data on the view.
   *   This the same data as returned by `view.getBehavior('thisBehaviorAlias').data.toJSON()`.
   *
   *     View.extend({
   *       behaviors: {
   *         thisBehaviorAlias: {
   *           behavior: ThisBehaviorClass
   *         }
   *       }
   *     });
   *
   *   result from prepare:
   *
   *     {
   *       ...,
   *       thisBehaviorAlias: {
   *         ...,
   *         data: <result of view.getBehavior('thisBehaviorAlias').data.toJSON()>
   *       }
   *     }
   *
   * Some Example Configurations:
   *
   * __Static id__ (can be a single String or Number or an array of Strings or Numbers):
   *
   *     View.extend({
   *        behaviors: {
   *          article: {
   *            behavior: require('torso/modules/behaviors/DataBehavior'),
   *            cache: require('app/article/articleCacheCollection'),
   *            returnSingleResult: true,
   *            id: 1234
   *          }
   *        }
   *      });
   *
   *    value used for id: `1234`
   *
   *    context for template:
   *
   *     {
   *       ...,
   *       article: {
   *         ...,
   *         data: {
   *           id: 1234,
   *           title: 'A really cool thing',
   *           text: 'So I was walking down the street one day...'
   *         }
   *       }
   *     }
   *
   * __Static ids__ (can be a single String or Number or an array of Strings or Numbers):
   *
   *     View.extend({
   *       behaviors: {
   *         posts: {
   *           behavior: require('torso/modules/behaviors/DataBehavior'),
   *           cache: require('app/article/postCacheCollection'),
   *           ids: [ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]
   *         }
   *       }
   *     });
   *
   *    value used for ids: `[ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]`
   *
   *    context for template:
   *
   *      {
   *        ...,
   *        posts: {
   *          ...,
   *          data: [{
   *            id: 'yesterday-by-the-river',
   *            title: 'Yesterday by the River',
   *            author: 'John Smith',
   *            content: 'While I was walking by the river...'
   *          },{
   *            id: 'tomorrow-by-the-sea',
   *            title: 'Tomorrow by the Sea',
   *            author: 'Mary Smith',
   *            content: 'I will walk on the beach tomorrow...'
   *          }]
   *        }
   *      }
   *
   * __Static id property on view__ (can be a single String or Number or an array of Strings or Numbers):
   *
   *     View.extend({
   *        behaviors: {
   *          article: {
   *            behavior: require('torso/modules/behaviors/DataBehavior'),
   *            cache: require('app/article/articleCacheCollection'),
   *            returnSingleResult: true,
   *            id: { property: '_articleId' }
   *          }
   *        }
   *      });
   *
   *    value used for id: `view._articleId`
   *
   *    context for template:
   *
   *     {
   *       ...,
   *       article: {
   *         ...,
   *         data: {
   *           id: 12,
   *           title: 'A really cool thing',
   *           text: 'So I was walking down the street one day...'
   *         }
   *       }
   *     }
   *
   * __Static ids property on view__ (can be a single String or Number or an array of Strings or Numbers):
   *
   *     View.extend({
   *       behaviors: {
   *         posts: {
   *           behavior: require('torso/modules/behaviors/DataBehavior'),
   *           cache: require('app/article/postCacheCollection'),
   *           ids: { property: '_postIds' }
   *         }
   *       }
   *     });
   *
   *    value used for ids: `view._postIds`
   *
   *    context for template:
   *
   *      {
   *        ...,
   *        posts: {
   *          ...,
   *          data: [{
   *            id: 'yesterday-by-the-river',
   *            title: 'Yesterday by the River',
   *            author: 'John Smith',
   *            content: 'While I was walking by the river...'
   *          },{
   *            id: 'tomorrow-by-the-sea',
   *            title: 'Tomorrow by the Sea',
   *            author: 'Mary Smith',
   *            content: 'I will walk on the beach tomorrow...'
   *          }]
   *        }
   *      }
   *
   * __
   *
   * @class DataBehavior
   * @method constructor
   * @author  jyoung@vecna.com
   */
  var DataBehavior = Behavior.extend({
    /**
     * The torso collection that is acting as a cache used to create the private collections.
     * This property/option is required.  Instantiation will fail if it is not set.
     * @property cache {Collection}
     */
    cache: undefined,

    /**
     * Determines the result of `view.getBehavior('thisBehaviorAlias').toJSON()`.
     * true - a single model result is returned.
     * false (default) - an array of model results are returned.
     * @property returnSingleResult {Boolean}
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
     * @property alwaysFetch {Boolean}
     * @default false
     */
    alwaysFetch: false,

    /**
     * Duck-typed property that identifies the ids to use. id or ids is required (either by behavior options or as properties).
     *   - {String|Number} - the id to use directly (equivalent to an array of a single id).
     *   - {String[]|Number[]} - the ids to use directly.
     *   - {Object} - more complex configuration that identifies a model-like object that fires a change event and the
     *                property on that object to use. The object can fire the change event for the given property
     *                and have a .get('propertyName') method, or it can define the property directly on the context.
     *                Only one property can be identified as supplying the id for this data model.
     *                If the identified object does not fire a change event then the id(s) will never be refreshed for this behavior.
     *                The context can also fire a 'fetched:ids' event on itself to signal to this data behavior that the ids
     *                have been fetched for the first time.  Then a 'change:<propertyName>' event can be used to notify this
     *                data behavior that the property has been modified.
     *     - property {String} - the name of the property that defines the ids. The root object is assumed to be the view unless
     *                           context is defined. The context is the object that fires a change event for the given property name.
     *                           Uses the view or the context as the root to get the identified property (i.e. 'viewState.', 'model.', etc).
     *                           Will get the property before the first '.' from the view and if it is an object will try to use a
     *                           .get('<propertyName>') on it and set a 'change:<propertyName>' listener on it.
     *                           If it is a string/number or array of string/number, then it will use that as the ids.
     *                           Triggering a 'id-container-updated' event on the behavior will cause it to stop listing to the
     *                           old context and start listening to the new one defined by this property.
     *     - context {Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change
     *                           events and has a .get('propertyName') function. It isn't required to fire events -
     *                           the change event is only required if it needs to re-fetch when the id property value changes.
     *     Examples:
     *       - { property: '_patientId' }
     *       - { property: 'viewState.appointmentId' }
     *       - { property: 'model.type' }
     *       - { property: 'behaviors.demographics.data.appointments' }
     *       - { property: 'id', context: userService }
     *       - { property: 'username', context: function() { application.getCurrentUser() } }
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
     * @property ids {String|Number|String[]|Number[]|Object|Function}
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
     * @property updateEvents {String|String[]|Object|Object[]}
     */
    updateEvents: undefined,

    /**
     * Object that manages interaction with the data.  Contains the privateCollection, proxies all events from the privateCollection,
     * and has get('...') and .toJSON() methods that access the private collection data.
     * @property data {Data}
     */
    data: undefined,

    /**
     * @method constructor
     * @override
     * @param behaviorOptions {Object}
     *   @param behaviorOptions.cache {Collection} see cache property.
     *   @param [behaviorOptions.returnSingleResult=false] {Boolean} see returnSingleResult property.
     *   @param [behaviorOptions.alwaysFetch=false] {Boolean} see alwaysFetch property.
     *   @param [behaviorOptions.id=behaviorOptions.ids] {String|Number|String[]|Number[]|{property: String, context: Object}|Function} see id property.
     *   @param [behaviorOptions.ids=behaviorOptions.id] {String|Number|String[]|Number[]|{property: String, context: Object}|Function} see ids property.
     *   @param [behaviorOptions.updateEvents] {String|String[]|Object|Object[]} see updateEvents property.
     * @param [viewOptions] {Object} options passed to View's initialize
     */
    constructor: function(behaviorOptions, viewOptions) {
      _.bindAll(this, '__fetchSuccess', '__fetchFailed');
      behaviorOptions = behaviorOptions || {};
      behaviorOptions = _.defaults(behaviorOptions, {
        alwaysFetch: false
      });
      _.extend(this, _.pick(behaviorOptions, 'cache', 'id', 'ids', 'returnSingleResult', 'alwaysFetch', 'updateEvents'));

      this.__validateCache();
      this.__normalizeAndValidateIds();
      this.__normalizeAndValidateUpdateEvents();

      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      /**
       * Private collection that maintains this behavior's view of the cache objects.
       * @property data.privateCollection {Collection}
       */
      var privateCollection = this.cache.createPrivateCollection(this.cid);
      this.data = new this.Data({
        parentBehavior: this,
        privateCollection: privateCollection
      });

      Behavior.apply(this, arguments);

      this.on('id-container-updated', this.listenToIdsPropertyChangeEvent);
      this.on('id-container-updated', this.retrieve);
      this.listenTo(this.view, 'initialize:complete', this.listenToIdsPropertyChangeEvent);
      this.listenTo(this.view, 'initialize:complete', this._delegateUpdateEvents);
      this.listenTo(this.view, 'initialize:complete', this.retrieve);
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection to track and then does a
     * pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).
     * @method retrieve
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
     * @method pull
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    pull: function() {
      var thisDataBehavior = this;
      return this.__getIds()
        .then(function(ids) {
          return thisDataBehavior.data.privateCollection.trackAndPull(ids);
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection's trackAndFetch() method.
     * @method fetch
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    fetch: function() {
      var thisDataBehavior = this;
      return this.__getIds()
        .then(function(ids) {
          return thisDataBehavior.data.privateCollection.trackAndFetch(ids);
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Adds the toJSON of the data represented by this behavior to the context.
     * @method prepare
     * @override
     */
    prepare: function() {
      var behaviorContext = Behavior.prototype.prepare.apply(this);
      behaviorContext.data = this.data.toJSON();
      return behaviorContext;
    },

    /**
     * Listens for the change event on the ids property and, if triggered, re-fetches the data based on the new ids.
     * @method listenToIdsPropertyChangeEvent
     */
    listenToIdsPropertyChangeEvent: function() {
      if (!_.isUndefined(this.ids.property)) {
        this.stopListeningToIdsPropertyChangeEvent();
        var idsPropertyNameAndContext = this.__parseIdsPropertyNameAndContext();
        var idsContext = idsPropertyNameAndContext.idsContext;
        var canListenToEvents = idsContext && _.isFunction(idsContext.on);
        if (canListenToEvents) {
          this.__currentContextWithListener = idsContext;
          this.__currentContextEventName = 'change:' + idsPropertyNameAndContext.idsPropertyName;
          this.listenTo(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
          this.listenTo(this.__currentContextWithListener, 'fetched:ids', this.retrieve);
        }
      }
    },

    /**
     * Removes the listener added by listenToIdsPropertyChangeEvent().
     * @method stopListeningToIdsPropertyChangeEvent
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
     * Removes existing listeners and adds new ones for all of the updateEvents configured.
     * @method _delegateUpdateEvents
     * @private
     */
    _delegateUpdateEvents: function() {
      this._undelegateUpdateEvents();
      var updateEvents = this.__parseUpdateEvents();
      _.each(updateEvents, function(parsedUpdateEvent) {
        this.listenTo(parsedUpdateEvent.context, parsedUpdateEvent.eventName, this.retrieve);
      }, this);
    },

    /**
     * Removes existing event listeners.
     * @method _undelegateEvents
     * @private
     */
    _undelegateUpdateEvents: function() {
      var updateEvents = this.__parseUpdateEvents();
      _.each(updateEvents, function(parsedUpdateEvent) {
        this.stopListening(parsedUpdateEvent.context, parsedUpdateEvent.eventName, this.retrieve);
      }, this);
    },

    /**
     * Parses this.updateEvents configuration.
     * @return {[{ eventName: String, context: Object }]} an array of objects with the event name and context included.
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
     * @param updateEventConfiguration {String | Object} the configuration for an individual event configuration.
     * @return {[{ eventName: String, context: Object }] | undefined} an array of objects with the event name and context included.
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
      }
      if (_.isObject(updateEventConfiguration)) {
        parsedUpdateEvents = _.map(updateEventConfiguration, function(context, eventName) {
          return {
            context: context,
            eventName: eventName
          };
        });
      }
      return parsedUpdateEvents;
    },

    /**
     * Parse a string type update event.
     * Context Key (first part of the string up to the first ':') can be one of the following:
     *   this (maps to the behavior),
     *   view (maps to the behavior's view),
     *   viewState (maps to the behavior's view's viewState),
     *   model (maps to the behavior's view's model),
     *   <*> any others are assumed to be the names of behaviors on this behavior's view.
     * @param updateEventConfiguration {String} a string representation of the event.
     * @return {{eventName: String, context: Backbone.Events}} the parsed configuration with the event name and context object.
     * @private
     */
    __parseStringUpdateEvent: function(updateEventConfiguration) {
      var contextString = updateEventConfiguration.split(':', 1)[0];
      var rootContextString = contextString.split('.', 1)[0];
      var rootContext;
      if (rootContextString === 'this') {
        rootContext = this;
      } else if (rootContextString === 'view') {
        rootContext = this.view;
      } else if (rootContextString === 'viewState') {
        rootContext = this.view.viewState;
      } else if (rootContextString === 'model') {
        rootContext = this.view.model;
      } else {
        // assume its a behavior alias.
        rootContext = this.view.getBehavior(rootContextString);
      }
      if (!_.isUndefined(rootContext)) {
        var context = rootContext;
        var contextPropertyString = contextString.replace(rootContextString, '');
        if (contextPropertyString) {
          // remove . in the case that there is a property string.
          contextPropertyString = contextPropertyString.substring(1);
          context = rootContext[contextPropertyString.substring(1)];
        }

        var eventName = updateEventConfiguration.replace(contextString + ':', '');
        return {
          eventName: eventName,
          context: context
        };
      }
    },

    /**
     * Validates that the cache property is valid and if not throws an error describing why its not valid.
     * @method __validateCache
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
     * @method __normalizeAndValidateIds
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
     * @method __normalizeAndValidateIds
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
    },

    /**
     * Validates that the updateEvents property is valid and if not throws an error describing why its not valid.
     * @method __normalizeAndValidateUpdateEvents
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
     * @method __normalizeAndValidateIds
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
     * @method __getIds
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the ids to track in the private collection
     *                              or rejects with the error message.
     * @private
     */
    __getIds: function() {
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
        } else if (!_.isUndefined(ids) && _.isFunction(ids.then)) {
          idsDeferred = ids.then(normalizeIds);
        } else {
          idsDeferred.resolve([]);
        }
      } else if (!_.isUndefined(this.ids.property)) {
        var parsedContextDefinition = this.__parseIdsPropertyNameAndContext();
        var propertyName = parsedContextDefinition.idsPropertyName;
        var context = parsedContextDefinition.idsContext;

        ids = context && context[propertyName];
        var propertyOnContextIsUndefined = context && _.isUndefined(ids);
        var contextHasGetMethod = context && _.isFunction(context.get);

        if (propertyOnContextIsUndefined && contextHasGetMethod) {
          ids = context.get(propertyName);
        }
        normalizedIds = normalizeIds(ids);

        idsDeferred.resolve(normalizedIds || []);
      }
      return idsDeferred.promise();
    },

    /**
     * Converts the definition into the actual context object and property name to retrieve off of that context.
     * @method __parseIdsPropertyNameAndContext
     * @return {{idsPropertyName: String, context: Object}} the name of the ids property and the actual object to use as the context.
     * @private
     */
    __parseIdsPropertyNameAndContext: function() {
      var context = this.__parseIdsContext();

      var propertyName = this.ids.property;

      var propertyParts = propertyName.split('.');
      var isNestedProperty = propertyParts.length > 1;
      if (isNestedProperty) {
        var rootPropertyName = propertyParts[0];
        if (rootPropertyName === 'behaviors' || rootPropertyName === 'behavior') {
          var behaviorName = propertyParts[1];
          context = this.view.getBehavior(behaviorName);
          if (propertyParts[2] === 'data') {
            context = context.data;
            propertyName = propertyParts.slice(3).join('.');
          } else {
            propertyName = propertyParts.slice(2).join('.');
          }
        } else if (!_.isUndefined(context[rootPropertyName])) {
          context = context[rootPropertyName];
          propertyName = propertyParts.slice(1).join('.');
        }
      }

      return {
        idsPropertyName: propertyName,
        idsContext: context
      };
    },

    /**
     * Parses the context property of ids.
     * @return {Object} the context object to apply the properties value to (may not be the final context depending on the property definition).
     * @private
     */
    __parseIdsContext: function() {
      var contextDefinition = this.ids.context;
      var context;
      if (_.isUndefined(contextDefinition)) {
        context = this.view;
      } else if (_.isFunction(contextDefinition)) {
        var contextFxn = _.bind(contextDefinition, this);
        context = contextFxn();
      } else if (_.isString(contextDefinition)) {
        context = _.result(this, contextDefinition);
      } else if (_.isObject(contextDefinition)) {
        context = contextDefinition;
      } else {
        throw new Error('Invalid context.  Not a string, object or function: ' + JSON.stringify(this.ids));
      }
      return context;
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'success' } when the fetch completes successfully.
     * @method __fetchSuccess
     * @private
     */
    __fetchSuccess: function() {
      this.trigger('fetched', { status: 'success' });
      this.data.trigger('fetched', { status: 'success' });
      this.trigger('fetched:ids');
      this.data.trigger('fetched:ids');
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'failed' } when the fetch fails.
     * @method __fetchFailed
     * @private
     */
    __fetchFailed: function() {
      this.trigger('fetched', { status: 'failed' });
      this.data.trigger('fetched', { status: 'failed' });
      this.trigger('fetched:ids');
      this.data.trigger('fetched:ids');
    },

    /**
     * Adds listeners when the view is activated.
     * @method _activate
     * @private
     */
    _activate: function() {
      this.listenToIdsPropertyChangeEvent();
      this._delegateUpdateEvents();
      this.data.activate();
    },

    /**
     * Stops listening when the view is deactivated.
     * @method _deactivate
     * @private
     */
    _deactivate: function() {
      this.stopListeningToIdsPropertyChangeEvent();
      this._undelegateUpdateEvents();
      this.data.deactivate();
    },

    /**
     * Default dispose stuff because its not already on behavior.  See https://github.com/vecnatechnologies/backbone-torso/issues/295
     * @method _dispose
     * @private
     */
    _dispose: function() {
      this.data.dispose();

      this.off();
      this.stopListening();
    }
  });

  /**
   * @module Torso.behaviors.DataBehavior
   * @namespace Torso.behaviors.DataBehavior
   */

  /**
   * Data object used to create the .data property of the DataBehavior.
   * @class Data
   * @constructor
   */
  var Data = function(options) {
    this.initialize(options);
  };

  _.extend(Data.prototype, {
    /**
     * Instantiates the data objects and binds it to this behavior instance.
     * @param options {Object} to pass to the initialize methods.
     *   @param options.parentBehavior {DataBehavior} the data behavior instance that this Data object should be bound to.
     *   @param options.privateCollection {Collection} the private collection that this data represents.
     */
    initialize: function(options) {
      _.extend(this, Events);
      /**
       * The dataBehavior instance that owns this data object.
       * @property parentBehavior {DataBehavior}
       */
      this.parentBehavior = options.parentBehavior;
      /**
       * The private collection that this data object manages.
       * @property privateCollection {Collection}
       */
      this.privateCollection = options.privateCollection;
    },

    /**
     * Get the full data object contents.  Either an array if returnSingleResult is false or a single object if it is true.
     * @method toJSON
     * @return {Object} containing the full contents of either the collection or model.
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
     * @method get
     * @param [propertyName] {String} the property to get from the model(s).
     * @return {Object|Object[]} containing the full contents of either the collection or model.
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

      if (privateCollection.length === 0) {
        return undefined;
      } else if (privateCollection.length === 1) {
        var singleResultModel = privateCollection.at(0);
        if (_.isString(propertyName)) {
          return singleResultModel.get(propertyName);
        }
        return singleResultModel.toJSON();
      } else {
        throw new Error('Multiple results found, but single result expected: ' + JSON.stringify(privateCollection.toJSON()));
      }
    },

    /**
     * Adds the listeners to the private collection.
     * @method activate
     */
    activate: function() {
      this.listenTo(this.privateCollection, 'all', this.trigger);
    },

    /**
     * Removes the listeners on the private collection.
     * @method deactivate
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
    }
  });

  DataBehavior.prototype.Data = Data;

  return DataBehavior;
}));