(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './EventTracker'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'),require('backbone'), require('./EventTracker'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Router = factory(root._, root.Backbone, root.EventTracker);
  }
}(this, function(_, Backbone, EventTracker) {
  'use strict';
  /**
   * Backbone's router.
   * @module Torso
   * @class  Router
   * @author kent.willis@vecna.com
   */

  var Router = Backbone.Router.extend({

    /**
    * overridden the route function to send start and end times to EventTracker
    */
    route: function(route, name, callback) {
      
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var callbackCopy = function(){
        console.log('start route, '+ name + ' ' + Date.now());
        callback.call(this);
        console.log('end route, ' + name + ' ' + Date.now());
      };
      Backbone.Router.prototype.route.apply(this,[route,name,callbackCopy]);
    },
  });

  return Router;
}));
