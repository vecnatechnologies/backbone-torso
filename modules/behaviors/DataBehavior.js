(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', '../Behavior', '../Collection', '../ViewPropertyReference'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var $ = require('jquery');
    var Behavior = require('../Behavior');
    var Collection = require('../Collection');
    var ViewPropertyReference = require('../ViewPropertyReference');
    module.exports = factory(_, $, Behavior, Collection, ViewPropertyReference);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.behaviors = root.Torso.behaviors || {};
    root.Torso.behaviors.DataBehavior = factory(root._, root.$, root.Torso.Behavior, root.Torso.Collection, root.Torso.ViewPropertyReference);
  }
}(this, function(_, $, Behavior, Collection, ViewPropertyReference) {
  'use strict';

  /**
   * Converts string or number values into an array with a single string or number item.
   * If the input is not a string, number or array then undefined is returned.
   * @param ids {String|Number|String[]|Number[]} the ids to convert.
   * @return {String[]|Number[]} an array of strings or numbers.
   */
  function normalizeIds(ids) {
    if (_.isArray(ids)) {
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
   *                           If it is a string/number or array of string/number, then it will use that as the ids
   *     - cell {Torso.Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change
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
   *     - 'model:eventName' - arbitrary even triggered on the view's model (eventName can be a change:propertyName event).
   *     - 'this:eventName' - arbitrary event triggered by this behavior (eventName can be a change:propertyName event).
   *     - 'behaviorAlias:eventName' - arbitrary event triggered by another behavior on this view (eventName can be a change:propertyName event).
   *     - { 'event': < object (or function returning an object) that the event is triggered on > } - arbitrary 'event' triggered on the supplied object.
   * @author  jyoung@vecna.com
   */
  return Behavior.extend({

    /**
     * @method constructor
     * @override
     * @param behaviorOptions {Object}
     *   @param behaviorOptions.cache {Torso.Collection} see class constructor docs.
     *   @param [behaviorOptions.returnSingleResult=false] {Boolean} see class constructor docs.
     *   @param [behaviorOptions.alwaysFetch=false] {Boolean} see class constructor docs.
     *   @param [behaviorOptions.id=behaviorOptions.ids] {String|Number|String[]|Number[]|Object|Function} see class constructor docs.
     *   @param [behaviorOptions.ids=behaviorOptions.id] {String|Number|String[]|Number[]|Object|Function} see class constructor docs.
     *   @param [behaviorOptions.updateEvents] {String|String[]|Object|Object[]} see class constructor docs.
     * @param [viewOptions] {Object} options passed to View's initialize
     */
    constructor: function(behaviorOptions, viewOptions) {
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

      if (!_.isUndefined(this.__ids.property) && !_.isString(this.__ids.property)) {
        throw new Error('Torso Data Behavior uses an object to define the ids to use, but it does not have a string field name property.  Id object: ' + JSON.stringify(this.__ids));
      }

      this.__returnSingleResult = behaviorOptions.returnSingleResult;
      this.__alwaysFetch = behaviorOptions.alwaysFetch;

      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.privateCollection = this.__cache.createPrivateCollection(this.cid);

      Behavior.apply(this, arguments);
    },

    /**
     * @method postinitialize
     * @override
     */
    postinitialize: function() {
      this.retrieve();
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
        return this.privateCollection.toJSON();
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
     */
    pull: function() {
      var thisDataBehavior = this;
      this.__getIds()
        .then(function(ids) {
          return thisDataBehavior.privateCollection.trackAndPull(ids);
        });
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection's trackAndFetch() method.
     * @method fetch
     */
    fetch: function() {
      var thisDataBehavior = this;
      this.__getIds()
        .then(function(ids) {
          return thisDataBehavior.privateCollection.trackAndFetch(ids);
        });
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection to track and then does a
     * pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).
     * @method retrieve
     */
    retrieve: function() {
      if (this.__alwaysFetch) {
        return this.fetch();
      } else {
        return this.pull();
      }
    },

    /**
     * @method __getIds
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the ids to track in the private collection
     *                              or rejects with the error message.
     * @private
     */
    __getIds: function() {
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
      } else if (ViewPropertyReference.isViewPropertyReference(this.__ids)) {
        var viewPropertyReference = new ViewPropertyReference({
          rootObject: this,
          view: this.view,
          reference: this.__ids
        });
        ids = viewPropertyReference.get();
        normalizedIds = normalizeIds(ids);
        idsDeferred.resolve(normalizedIds || []);
      } else if (_.isObject(this.__ids)) {
        throw new Error('Data Behavior ids invalid definition.  It is an object, but the property field is not defined or is not a string: ' + JSON.stringify(this.__ids));
      } else {
        throw new Error('Data Behavior ids invalid definition.  Not a string, number, object, array or function: ' + JSON.stringify(this.__ids));
      }
      return idsDeferred.promise();
    }
  });
}));