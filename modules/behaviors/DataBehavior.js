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
   *     - property {String} - the name of the property is the key and the object containing the property is the value.
   *                           The value can either be an object that fires a change event for the given property name
   *                           or a string identifying the object to use. Uses the view as the root to get the identified
   *                           property (i.e. 'viewState.', 'model.', etc). Will get the property before the first '.' from
   *                           the view and if it is an object will try to use a .get('propertyName') on it and set a 'change:'
   *                           listener on it. If it is a string/number or array of string/number, then it will use that as the ids
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

      this.__returnSingleResult = behaviorOptions.returnSingleResult;
      this.__alwaysFetch = behaviorOptions.alwaysFetch;

      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.privateCollection = this.__cache.createPrivateCollection(this.cid);

      Behavior.apply(this, arguments);
    }
  });
}));