(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './Events'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'),require('backbone'), require('./Events'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Router = factory(root._, root.Backbone, root.Events);
  }
}(this, function(_, Backbone, Events) {
  'use strict';
  /**
   * Backbone's router.
   * @module Torso
   * @class  Router
   * @author kent.willis@vecna.com
   */

  var Router = Backbone.Router.extend({

    constructor: function(){
      Backbone.Router.apply(this, arguments);
      this.__applyTimingEventListeners(['pre-route', 'post-route']);
      // this.on('pre-route', function(args) {Events.trigger('pre-route', args);});
      // this.on('post-route', function(args) {Events.trigger('post-route', args);});
    }, 

    /**
    * overridden the route function to trigger start and end signals
    */
    route: function(route, name, callback) {
      var routeName = route;
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var callbackCopy = function(){
        var uuid = _.uniqueId();
        this.trigger('pre-route', 
          { uuid: uuid,
            route: routeName, 
            time: Date.now(),
          });
        callback.call(this);
        this.trigger('post-route',
          { uuid: uuid,
            time: Date.now(),
          });
      };
      Backbone.Router.prototype.route.apply(this,[route,name,callbackCopy]);
    },

    /************** Private methods **************/

    /**
    * sends event triggers to Torso.Events
    * @param array of timing event names
    * @method applyTimingEventListeners
    */
    __applyTimingEventListeners: function(timingEvents) {
      var sendToEvents = function(evt) { 
        var currentEvent = timingEvents[evt];
        this.on(currentEvent, function(info) {
          Events.trigger(currentEvent, info);
        });
      };
      sendToEvents = _.bind(sendToEvents, this);
      for (var evt in timingEvents) {
        sendToEvents(evt);
      }
    },

  });

  return Router;
}));
