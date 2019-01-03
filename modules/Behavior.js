(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './NestedCell'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var TorsoNestedCell = require('./NestedCell');
    module.exports = factory(_, TorsoNestedCell);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Behavior = factory(root._, root.Torso.NestedCell);
  }
}(this, function(_, NestedCell) {
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

  var Behavior = NestedCell.extend(/** @lends Behavior.prototype */{
    /**
     * Unique name of the behavior instance w/in a view.  More human readable than the cid.
     * @type {string}
     */
     alias: null,

    /**
     * cidPrefix of Behaviors
     * @type {string}
     */
    cidPrefix: 'b',

    /**
     * Add functions to be added to the view's public API. They will be behavior-scoped.
     * @type {Object}
     */
    mixin: {},

    /**
     * The behavior's prepare result will be combined with the view's prepare with the behavior's alias as the namespace.
     * effectively: { [behaviorName]: behavior.prepare() } will be combined with the view's prepare result.
     *
     * @function
     * @return {Object} a prepare context suitable to being added to the view's prepare result.
     */
    prepare: _.noop,

    /**
     * Allows abstraction of common view logic into separate object
     *
     * @class Behavior
     * @param {Object} behaviorAttributes the initial value of the behavior's attributes.
     * @param {Object} behaviorOptions
     *   @param {Backbone.View} behaviorOptions.view that Behavior is attached to
     *   @param {Backbone.View} behaviorOptions.alias the alias for the behavior in this view.
     * @param {Object} [viewOptions] options passed to View's initialize
     * @author  deena.wang@vecna.com
     *
     * @see <a href="../annotated/modules/Behavior.html">Behavior Annotated Source</a>
     */
    constructor: function(behaviorAttributes, behaviorOptions, viewOptions) {
      behaviorOptions = behaviorOptions || {};
      if (!behaviorOptions.view) {
        throw new Error('Torso Behavior constructed without behaviorOptions.view');
      }
      this.view = behaviorOptions.view;
      if (!behaviorOptions.alias) {
        throw new Error('Torso Behavior constructed without behaviorOptions.alias');
      }
      this.alias = behaviorOptions.alias;
      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.__bindLifecycleMethods();
      NestedCell.apply(this, arguments);
      this.__bindEventCallbacks();
    },

    /**
     * This is called after the view's initialize method is called and will wrap the view's prepare()
     * such that it returns the combination of the view's prepare result with the behavior's prepare result
     * inside it under the behavior's alias.
     * @private
     */
    __augmentViewPrepare: function() {
      var originalViewPrepareFn = _.bind(this.view.prepare, this.view);
      var wrappedPrepareFn = _.wrap(originalViewPrepareFn, this.__viewPrepareWrapper);
      this.view.prepare = _.bind(wrappedPrepareFn, this);
    },

    /**
     * Wraps the view's prepare such that it returns the combination of the view and behavior's prepare results.
     * @private
     * @param {Function} viewPrepare the prepare method from the view.
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
     * @private
     */
    __bindLifecycleMethods: function() {
      this.listenTo(this.view, 'initialize:complete', this.__augmentViewPrepare);
      this.listenTo(this.view, 'before-dispose-callback', this.__dispose);
      _.each(eventMap, function(callback, event) {
        this.listenTo(this.view, event, this[callback]);
      }, this);
    },

    /**
     * Adds behavior's event handlers to view
     * Behavior's event handlers fire on view events but are run in the context of the behavior
     *
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
     * @param {Object} eventHash to namespace
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
     * @param {Object} eventHash keys are event descriptors, values are String method names or functions
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
    },

    /**
     * Removes all listeners, stops listening to events.
     * After dispose is called, the behavior can be safely garbage collected.
     * Called when the owning view is disposed.
     * @private
     */
    __dispose: function() {
      this.trigger('before-dispose-callback');
      this.stopListening();
      this.off();

      this.__isDisposed = true;
    },

    /**
     * Method to be invoked when dispose is called. By default calling dispose will remove the
     * behavior's on's and listenTo's.
     * Override this method to destruct any extra
     * @function
     */
    _dispose: _.noop,

    /**
     * @return {boolean} true if the view was disposed
     */
    isDisposed: function() {
      return this.__isDisposed;
    }
  });

  return Behavior;
}));

