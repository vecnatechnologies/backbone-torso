(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './Cell'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var TorsoCell = require('./Cell');
    module.exports = factory(_, TorsoCell);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Behavior = factory(root._, root.Torso.Cell);
  }
}(this, function(_, Cell) {
  'use strict';

  // Map of eventName: lifecycleMethod
  var eventMap = {
    'before-attached-callback': '_attached',
    'before-detached-callback':  '_detached',
    'before-activate-callback': '_activate',
    'before-deactivate-callback': '_deactivate',
    'before-dispose-callback': '_dispose',
    'render:before-attach-tracked-views': 'attachTrackedViews',
    'render:begin': 'prerender',
    'render:complete': 'postrender',
    'initialize:begin':  'preinitialize',
    'initialize:complete': 'postinitialize'
  };

  /**
   * Allows abstraction of common view logic into separate object
   *
   * @module Torso
   * @class  Behavior
   * @method constructor
   * @author  deena.wang@vecna.com
   */
  var Behavior = Cell.extend({
    /**
     * Unique name of the behavior instance w/in a view.  More human readable than the cid.
     * @property alias {String}
     */
    /**
     * @property cidPrefix of Behaviors
     * @type {String}
     */
    cidPrefix: 'b',

    /**
     * Add functions to be added to the view's public API. They will be behavior-scoped.
     * @property mixin
     * @type {Object}
     */
    mixin: {},

    /**
     * The behavior's prepare result will be combined with the view's prepare with the behavior's alias as the namespace.
     * effectively: { <behaviorName>: behavior.prepare() } will be combined with the view's prepare result.
     * @method prepare
     * @return a prepare context suitable to being added to the view's prepare result.
     */
    prepare: _.noop,

    /**
     * @method constructor
     * @override
     * @param behaviorOptions {Object}
     *   @param behaviorOptions.view {Backbone.View} that Behavior is attached to
     *   @param behaviorOptions.alias {Backbone.View} the alias for the behavior in this view.
     * @param [viewOptions] {Object} options passed to View's initialize
     */
    constructor: function(behaviorOptions, viewOptions) {
      behaviorOptions = behaviorOptions || {};
      if (!behaviorOptions.view) {
        throw new Error('Torso Behavior constructed without behaviorOptions.view');
      }
      this.view = behaviorOptions.view;
      if (!behaviorOptions.alias) {
        throw new Error('Torso Behavior constructed without behaviorOptions.alias');
      }
      this.alias = behaviorOptions.alias;
      this.cid = _.uniqueId(this.cidPrefix);
      this.__bindLifecycleMethods();
      Cell.apply(this, arguments);
      this.__bindEventCallbacks();
    },

    /**
     * This is called after the view's initialize method is called and will wrap the view's prepare()
     * such that it returns the combination of the view's prepare result with the behavior's prepare result
     * inside it under the behavior's alias.
     * @method __augmentViewPrepare
     * @private
     */
    __augmentViewPrepare: function() {
      var originalViewPrepareFn = _.bind(this.view.prepare, this.view);
      var wrappedPrepareFn = _.wrap(originalViewPrepareFn, this.__viewPrepareWrapper);
      this.view.prepare = _.bind(wrappedPrepareFn, this);
    },

    /**
     * Wraps the view's prepare such that it returns the combination of the view and behavior's prepare results.
     * @method __viewPrepareWrapper
     * @private
     * @param viewPrepare {Function} the prepare method from the view.
     * @return {Object} the combined view and behavior prepare() results.
     * {
     *   <behavior alias>: behavior.prepare(),
     *   ... // view prepare properties.
     * }
     */
    __viewPrepareWrapper: function(viewPrepare) {
      var viewContext = viewPrepare() || {};
      var behaviorContext = _.omit(this.toJSON(), 'view');
      _.extend(behaviorContext, this.prepare());
      viewContext[this.alias] = behaviorContext;
      return viewContext;
    },

    /**
     * Registers defined lifecycle methods to be called at appropriate time in view's lifecycle
     *
     * @method __bindLifecycleMethods
     * @private
     */
    __bindLifecycleMethods: function() {
      this.listenTo(this.view, 'initialize:complete', this.__augmentViewPrepare);
      _.each(eventMap, function(callback, event) {
        this.listenTo(this.view, event, this[callback]);
      }, this);
    },

    /**
     * Adds behavior's event handlers to view
     * Behavior's event handlers fire on view events but are run in the context of the behavior
     *
     * @method __bindEventCallbacks
     * @private
     */
    __bindEventCallbacks: function() {
      var behaviorEvents = _.result(this, 'events');
      var viewEvents = this.view.events;

      if (!viewEvents) {
        if (!behaviorEvents) {
          return;
        } else {
          viewEvents = {};
        }
      }

      var namespacedEvents = this.__namespaceEvents(behaviorEvents);
      var boundBehaviorEvents = this.__bindEventCallbacksToBehavior(namespacedEvents);

      if (_.isFunction(viewEvents)) {
        this.view.events = _.wrap(_.bind(viewEvents, this.view), function(viewEventFunction) {
          return _.extend(boundBehaviorEvents, viewEventFunction());
        });
      } else if (_.isObject(viewEvents)) {
        this.view.events = _.extend(boundBehaviorEvents, viewEvents);
      }
    },

    /**
     * Namespaces events in event hash
     *
     * @method __namespaceEvents
     * @param eventHash {Object} to namespace
     * @return {Object} with event namespaced with '.behavior' and the cid of the behavior
     * @private
     */
    __namespaceEvents: function(eventHash) {
      // coped from Backbone
      var delegateEventSplitter = /^(\S+)\s*(.*)$/;
      var namespacedEvents = {};
      var behaviorId = this.cid;
      _.each(eventHash, function(value, key) {
        var splitEventKey = key.match(delegateEventSplitter);
        var eventName = splitEventKey[1];
        var selector = splitEventKey[2];
        var namespacedEventName = eventName + '.behavior.' + behaviorId;
        namespacedEvents[[namespacedEventName, selector].join(' ')] = value;
      });
      return namespacedEvents;
    },

    /**
     * @method __bindEventCallbacksToBehavior
     * @param eventHash {Object} keys are event descriptors, values are String method names or functions
     * @return {Object} event hash with values as methods bound to view
     * @private
     */
    __bindEventCallbacksToBehavior: function(eventHash) {
      return _.mapObject(eventHash, function(method) {
        if (!_.isFunction(method)) {
          method = this[method];
        }
        return _.bind(method, this);
      }, this);
    }

  });

  return Behavior;
}));

