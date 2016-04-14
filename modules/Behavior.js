var _ = require('underscore');
var TorsoCell = require('./Cell');

// Map of eventName: lifecycleMethod
var eventMap = {
  'before-attach': '_attached',
  'before-detach':  '_detached',
  'before-activate': '_activate',
  'before-deactivate': '_deactivate',
  'before-dispose': '_dispose',
  'render:before-attach-tracked-views': 'attachTrackedViews',
  'render:begin': 'prerender',
  'render:complete': 'postrender',
  'initialize:begin':  '_preinitialize',
  'initialize:complete': '_postinitialize'
};

module.exports = TorsoCell.extend({
  constructor: function(options) {
    options = options || {};
    this.view = options.view;
    this._bindLifecycleMethods();
    this._bindEventCallbacks();
    TorsoCell.apply(this, arguments);
  },

  _bindLifecycleMethods: function() {
    _.each(eventMap, function(callback, event) {
      this.listenTo(this.view, event, this[callback]);
    }, this);
  },

  _bindEventCallbacks: function() {
    var behaviorEvents = _.result(this, 'events');
    var viewEvents = this.view && this.view.events;

    if (!viewEvents) {
      if (!behaviorEvents) {
        return;
      } else {
        viewEvents = {};
      }
    }

    var boundBehaviorEvents = this._bindEventCallbacksToBehavior(behaviorEvents);

    if (_.isFunction(viewEvents)) {
      this.view.events = _.wrap(_.bind(viewEvents, this.view), function(viewEventFunction) {
        return _.extend(boundBehaviorEvents, viewEventFunction());
      });
    } else if (_.isObject(viewEvents)) {
      this.view.events = _.extend(boundBehaviorEvents, viewEvents);
    }
  },

  // eventHash of 'string' to methodName/description
  _bindEventCallbacksToBehavior: function(eventHash) {
    return _.mapObject(eventHash, function(method) {
      if (!_.isFunction(method)) {
        method = this[method];
      }
      return _.bind(method, this);
    }, this);
  }

});