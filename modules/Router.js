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
        var uuid = (new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
        this.trigger('routeTiming', 
          { uuid: uuid,
            route: routeName, 
            type: 'route',
            state:'start',
            time: Date.now(),
          });
        callback.call(this);
        this.trigger('routetiming',
          { uuid: uuid,
            state:'end',
            time: Date.now(),
          });
      };
      Backbone.Router.prototype.route.apply(this,[route,name,callbackCopy]);
    },
  });

  return Router;
}));
