(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', '../Behavior', '../Collection'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var $ = require('jquery');
    var Behavior = require('../Behavior');
    var Collection = require('../Collection');
    module.exports = factory(_, $, Behavior, Collection);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.behaviors = root.Torso.behaviors || {};
    root.Torso.behaviors.DataBehavior = factory(root._, root.$, root.Torso.Behavior, root.Torso.Collection);
  }
}(this, function(_, $, Behavior, Collection) {
  'use strict';

  /**
   * Converts string or number values into an array with a single string or number item.
   * If the input is not a string, number or array then undefined is returned.
   * @param ids {String|Number|String[]|Number[]} the ids to convert.
   * @return {String[]|Number[]} an array of strings or numbers.
   */
  function normalizeIds(ids) {
    if (_.isArray(ids)) {
      // remove any nesting of arrays.
      ids = _.flatten(ids);
      return _.uniq(ids);
    } else if (_.isString(ids) || _.isNumber(ids)) {
      return [ids];
    }
  }

  /**
   * This behavior implements simplified interaction with data sources (i.e. TorsoCollection).
   * This behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.
   * This behavior also manages dependencies between data and other objects to allow intelligent re-fetching when data changes.
   *
   * Example Configuration:
   *   TorsoView.extend({
   *     behaviors: {
   *       demographics: {
   *         behavior: TorsoDataBehavior,
   *         cache: require('./demographicsCacheCollection'),
   *         returnSingleResult: true,
   *         id: { property: '_patientVecnaId' }
   *       }
   *     }
   *   }
   *
   * @module Torso.behaviors
   * @class DataBehavior
   * @method constructor
   * @param cache {Torso.Collection} the torso collection that is acting as a cache used to create the private collections.
   * @param [returnSingleResult=false] {Boolean} true - a single model result is expected, false - a collection result is expected.
   * @param [alwaysFetch=false] {Boolean} true - if it should use fetch() instead of pull() on the private collection.
   *                                      false if it should use pull() instead.
   *                                      True will query the server more often, but will provide more up-to-date data.
   *                                      False will only query the server if the model hasn't already been retrieved.
   * @param [id=ids] {String|Number|String[]|Number[]|Object|Function} - alias for ids.  id or ids is required.
   * @param [ids=id] {String|Number|String[]|Number[]|Object|Function} - duck-typed property that identifies the ids to use. id or ids is required.
   *   - {String|Number} - the id to use directly (equivalent to an array of a single id).
   *   - {String[]|Number[]} - the ids to use directly.
   *   - {Object} - more complex configuration that identifies a model-like object that fires a change event and the
   *                property on that object to use. The object needs to fire the change event for the given property
   *                and have a .get('propertyName') method. Only one property can be identified as supplying the id
   *                for this data model. If the identified object does not fire a change event then the id will never change.
   *     - property {String} - the name of the property that defines the ids. The root object is assumed to be the view unless
   *                           context is defined. The context is the object that fires a change event for the given property name.
   *                           Uses the view or the context as the root to get the identified property (i.e. 'viewState.', 'model.', etc).
   *                           Will get the property before the first '.' from the view and if it is an object will try to use a
   *                           .get('propertyName') on it and set a 'change:' listener on it.
   *                           If it is a string/number or array of string/number, then it will use that as the ids.
   *                           Triggering a 'change:context' event on the behavior will cause it to stop listing to the
   *                           old context and start listening to the new one defined by this property.
   *     - context {Torso.Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change
   *                           events and has a .get('propertyName') function. It isn't required to fire events -
   *                           the change event is only required if it needs to refetch when the id property value changes.
   *     Examples:
   *       - { property: '_patientId' }
   *       - { property: 'viewState.appointmentId' }
   *       - { property: 'model.type' }
   *       - { property: 'behaviors.demographics.appointments' }
   *       - { property: 'id', context: userService }
   *       - { property: 'username', context: function() { application.getCurrentUser() } }
   *   - function(cache) - expected to return the ids (either array, jquery deferred that resolves to the ids or single primitive)
   *                       to track with the private collection. Cache is passed in as the first argument so that the behavior
   *                       can be defined and the cache can be overridden later.
   *                       'this' is the behavior (from which you can get the view if needed).
   *                       What was criteria should use this instead:
   *
   *         function(cache) {
   *           var thisBehaviorInstance = this;
   *           var view = this.view;
   *           var critera = { ... some criteria ... };
   *           return cache.fetchIdsByCriteria(criteria);
   *         }
   *
   * @param [updateEvents] {String|String[]|Object|Object[]} - cause this behavior to re-calculate its ids and refetch them
   *                                                           from the server if the given events are triggered
   *                                                           (space separated if string, single item is equivalent to array of single item).
   *     - 'view:eventName' - arbitrary event triggered on the view (eventName can be a change:propertyName event).
   *     - 'viewState:eventName' - arbitrary event triggered on the viewState (eventName can be a change:propertyName event).
   *     - 'model:eventName' - arbitrary even triggered on the view's model (eventName can be a change:propertyName event).
   *     - 'this:eventName' - arbitrary event triggered by this behavior (eventName can be a change:propertyName event).
   *     - 'behaviorAlias:eventName' - arbitrary event triggered by another behavior on this view (eventName can be a change:propertyName event).
   *     - { '<eventName>': < object (or function returning an object) that the event is triggered on > } - arbitrary ('<eventName>') triggered on the supplied object.
   * @author  jyoung@vecna.com
   */
  var DataBehavior = Behavior.extend({

    /**
     * @method constructor
     * @override
     * @param behaviorOptions {Object}
     *   @param behaviorOptions.cache {Torso.Collection} see class constructor docs.
     *   @param [behaviorOptions.returnSingleResult=false] {Boolean} see class constructor docs.
     *   @param [behaviorOptions.alwaysFetch=false] {Boolean} see class constructor docs.
     *   @param [behaviorOptions.id=behaviorOptions.ids] {String|Number|String[]|Number[]|{property: String, context: Object}|Function} see class constructor docs.
     *   @param [behaviorOptions.ids=behaviorOptions.id] {String|Number|String[]|Number[]|{property: String, context: Object}|Function} see class constructor docs.
     *   @param [behaviorOptions.updateEvents] {String|String[]|Object|Object[]} see class constructor docs.
     * @param [viewOptions] {Object} options passed to View's initialize
     */
    constructor: function(behaviorOptions, viewOptions) {
      _.bindAll(this, '__fetchSuccess', '__fetchFailed');
      behaviorOptions = behaviorOptions || {};
      behaviorOptions = _.defaults(behaviorOptions, {
        returnSingleResult: false,
        alwaysFetch: false
      });

      if (!behaviorOptions.cache) {
        throw new Error('Torso Data Behavior constructed without a cache');
      }
      if (!(behaviorOptions.cache instanceof Collection)) {
        throw new Error('Torso Data Behavior\'s cache is not of type Torso.Collection');
      }
      this.__cache = behaviorOptions.cache;

      if (!_.isUndefined(behaviorOptions.ids) && !_.isUndefined(behaviorOptions.id)) {
        throw new Error('Torso Data Behavior constructed with both id and ids.  Please define only one.');
      }
      if (!_.isUndefined(behaviorOptions.id)) {
        this.__ids = behaviorOptions.id;
      } else if (!_.isUndefined(behaviorOptions.ids)) {
        this.__ids = behaviorOptions.ids;
      } else {
        throw new Error('Torso Data Behavior constructed without a way to identify the ids for this data.  Please define either id or ids.');
      }

      this.__validateIds();

      this.__returnSingleResult = behaviorOptions.returnSingleResult;
      this.__alwaysFetch = behaviorOptions.alwaysFetch;

      if (_.isArray(behaviorOptions.updateEvents)) {
        this.__updateEvents = behaviorOptions.updateEvents;
      } else if (_.isObject(behaviorOptions.updateEvents) || _.isString(behaviorOptions.updateEvents)) {
        this.__updateEvents = [behaviorOptions.updateEvents]
      } else if (!_.isUndefined(behaviorOptions.updateEvents)) {
        throw new Error('Update events are not an array, string or object.  Please see parameters for examples of how to define updateEvents.  Configured UpdateEvents: ', behaviorOptions.updateEvents)
      }
      this.__updateEvents = _.compact(this.__updateEvents);
      _.each(this.__updateEvents, this.__validUpdateEvent);

      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.privateCollection = this.__cache.createPrivateCollection(this.cid);

      Behavior.apply(this, arguments);

      this.on('change:context', this.listenToIdsPropertyChangeEvent);
      this.on('change:context', this.retrieve);
      this.listenTo(this.view, 'initialize:complete', this.listenToIdsPropertyChangeEvent);
      this.listenTo(this.view, 'initialize:complete', this._delegateUpdateEvents);
      this.listenTo(this.view, 'initialize:complete', this.retrieve);
    },

    /**
     * Adds the toJSON of the data represented by this behavior to the context.
     * @method prepare
     * @override
     */
    prepare: function() {
      var behaviorContext = Behavior.prototype.prepare.apply(this);
      _.extend(behaviorContext, this.toJSON());
      return behaviorContext;
    },

    /**
     * Get the full data object contents (either an array of model attributes or a single model attribute based on the
     * value of returnSingleResult) or the value of a specific property if a single result is expected.
     * @method toJSON
     * @param [singleResultProperty] {String} the property to get from the model (only valid if returnSingleResult is true).
     * @return {Object} containing the full contents of either the collection or model.
     */
    toJSON: function(singleResultProperty) {
      if (!this.__returnSingleResult) {
        if (_.isString(singleResultProperty)) {
          return this.privateCollection.pluck(singleResultProperty);
        } else {
          return this.privateCollection.toJSON();
        }
      }

      if (this.privateCollection.length === 0) {
        return undefined;
      } else if (this.privateCollection.length === 1) {
        var singleResultModel = this.privateCollection.at(0);
        if (_.isString(singleResultProperty)) {
          return singleResultModel.get(singleResultProperty);
        }
        return singleResultModel.toJSON();
      } else {
        throw new Error('Multiple results found, but single result expected: ' + JSON.stringify(this.privateCollection.toJSON()));
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
          return thisDataBehavior.privateCollection.trackAndPull(ids);
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
          return thisDataBehavior.privateCollection.trackAndFetch(ids);
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection to track and then does a
     * pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).
     * @method retrieve
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    retrieve: function() {
      if (this.__alwaysFetch) {
        return this.fetch();
      } else {
        return this.pull();
      }
    },

    /**
     * Listens for the change event on the ids property and, if triggered, re-fetches the data based on the new ids.
     * @method listenToIdsPropertyChangeEvent
     */
    listenToIdsPropertyChangeEvent: function() {
      if (!_.isUndefined(this.__ids.property)) {
        this.stopListeningToIdsPropertyChangeEvent();
        var idsPropertyNameAndContext = this.__parseIdsPropertyNameAndContext();
        var idsContext = idsPropertyNameAndContext.idsContext;
        var canListenToEvents = idsContext && _.isFunction(idsContext.on);
        if (canListenToEvents) {
          this.__currentContextWithListener = idsContext;
          this.__currentContextEventName = 'change:' + idsPropertyNameAndContext.idsPropertyName;
          this.__dependsOnBehavior = idsPropertyNameAndContext.isBehavior;
          if (this.__dependsOnBehavior) {
            this.listenTo(this.__currentContextWithListener, 'fetched', this.retrieve);
            this.listenTo(this.__currentContextWithListener.privateCollection, this.__currentContextEventName, this.retrieve);
          } else {
            this.listenTo(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
          }
        }
      }
    },

    /**
     * Removes the listener added by listenToIdsPropertyChangeEvent().
     * @method stopListeningToIdsPropertyChangeEvent
     */
    stopListeningToIdsPropertyChangeEvent: function() {
      if (this.__currentContextWithListener) {
        if (this.__dependsOnBehavior) {
          this.stopListening(this.__currentContextWithListener, 'fetched', this.retrieve);
          this.stopListening(this.__currentContextWithListener.privateCollection, this.__currentContextEventName, this.retrieve);
        } else {
          this.stopListening(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
        }
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
     * Parses this.__updateEvents configuration.
     * @return {[{ eventName: String, context: Object }]} an array of objects with the event name and context included.
     * @private
     */
    __parseUpdateEvents: function() {
      var updateEvents = _.flatten(_.map(this.__updateEvents, this.__parseUpdateEvent, this));
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
      var context;
      if (contextString === 'this') {
        context = this;
      } else if (contextString === 'view') {
        context = this.view;
      } else if (contextString === 'viewState') {
        context = this.view.viewState;
      } else if (contextString === 'model') {
        context = this.view.model;
      } else {
        // assume its a behavior alias.
        context = this.view.getBehavior(contextString);
      }
      if (!_.isUndefined(context)) {
        var eventName = updateEventConfiguration.replace(contextString + ':', '');
        return {
          eventName: eventName,
          context: context
        };
      }
    },

    /**
     * Validates that the __ids property is valid and if not throws an error describing why its not valid.
     * @method __validateIds
     * @private
     */
    __validateIds: function() {
      var idsIsArray = _.isArray(this.__ids);
      var idsIsSingleId = _.isString(this.__ids) || _.isNumber(this.__ids);
      var idsIsFunction = _.isFunction(this.__ids);
      var idsIsObjectWithStringProperty = _.isString(this.__ids.property);
      var idsIsObject = _.isObject(this.__ids);
      var idsIsValid = idsIsArray || idsIsSingleId || idsIsFunction || idsIsObjectWithStringProperty;
      if (!idsIsValid && idsIsObject) {
        throw new Error('Data Behavior ids invalid definition.  It is an object, but the property field is not defined or is not a string: ' + JSON.stringify(this.__ids));
      } else if (!idsIsValid) {
        throw new Error('Data Behavior ids invalid definition.  Not a string, number, object, array or function: ' + JSON.stringify(this.__ids));
      }
    },

    /**
     * Validates that the updateEventConfiguration is valid and if not throws an error describing why its not valid.
     * @method __validateIds
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
      var ids = this.__ids;
      var normalizedIds = normalizeIds(ids);
      if (!_.isUndefined(normalizedIds)) {
        idsDeferred.resolve(normalizedIds);
      } else if (_.isFunction(this.__ids)) {
        ids = this.__ids(this.__cache);
        normalizedIds = normalizeIds(ids);
        if (!_.isUndefined(normalizedIds)) {
          idsDeferred.resolve(normalizedIds);
        } else if (!_.isUndefined(ids) && _.isFunction(ids.then)) {
          idsDeferred = ids.then(normalizeIds);
        } else {
          idsDeferred.resolve([]);
        }
      } else if (!_.isUndefined(this.__ids.property)) {
        var parsedContextDefinition = this.__parseIdsPropertyNameAndContext();
        var propertyName = parsedContextDefinition.idsPropertyName;
        var context = parsedContextDefinition.idsContext;

        ids = context && context[propertyName];
        var propertyOnContextIsUndefined = context && _.isUndefined(ids);
        var contextHasGetMethod = context && _.isFunction(context.get);
        var contextHasToJSONMethod = context && _.isFunction(context.toJSON);

        if (propertyOnContextIsUndefined && parsedContextDefinition.isBehavior && contextHasToJSONMethod) {
          ids = context.toJSON(propertyName);
        } else if (propertyOnContextIsUndefined && contextHasGetMethod) {
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
     * @return {{idsPropertyName: String, context: Object, isBehavior: Boolean}} the name of the ids property and the actual object to use as the context.
     * @private
     */
    __parseIdsPropertyNameAndContext: function() {
      var context = this.__parseIdsContext();

      var propertyName = this.__ids.property;

      var isBehavior = false;
      var propertyParts = propertyName.split('.');
      var isNestedProperty = propertyParts.length > 1;
      if (isNestedProperty) {
        var rootPropertyName = propertyParts[0];
        if (rootPropertyName === 'behaviors' || rootPropertyName === 'behavior') {
          var behaviorName = propertyParts[1];
          context = this.view.getBehavior(behaviorName);
          propertyName = propertyParts.slice(2).join('.');
          isBehavior = true;
        } else if (!_.isUndefined(context[rootPropertyName])) {
          context = context[rootPropertyName];
          propertyName = propertyParts.slice(1).join('.');
        }
      }

      return {
        idsPropertyName: propertyName,
        idsContext: context,
        isBehavior: isBehavior
      };
    },

    /**
     * Parses the context property of __ids.
     * @return {Object} the context object to apply the properties value to (may not be the final context depending on the property definition).
     * @private
     */
    __parseIdsContext: function() {
      var contextDefinition = this.__ids.context;
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
        throw new Error('Invalid context.  Not a string, object or function: ' + JSON.stringify(this.__ids));
      }
      return context;
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'success' } when the fetch completes successfully.
     * @method __fetchSuccess
     * @private
     */
    __fetchSuccess: function() {
      this.trigger('fetched', { status: 'success' })
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'failed' } when the fetch fails.
     * @method __fetchFailed
     * @private
     */
    __fetchFailed: function() {
      this.trigger('fetched', { status: 'failed' })
    },

    /**
     * Adds listeners when the view is activated.
     * @method _activate
     * @private
     */
    _activate: function() {
      this.listenToIdsPropertyChangeEvent();
      this._delegateUpdateEvents();
    },

    /**
     * Stops listening when the view is deactivated.
     * @method _deactivate
     * @private
     */
    _deactivate: function() {
      this.stopListeningToIdsPropertyChangeEvent();
      this._undelegateUpdateEvents();
    }
  });

  return DataBehavior;
}));