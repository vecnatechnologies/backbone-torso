(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './Logger'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'),require('backbone'), require('./Logger'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Router = factory(root._, root.Backbone, root.Logger);
  }
}(this, function(_, Backbone, Logger) {
  'use strict';
  /**
   * Backbone's router.
   * @module Torso
   * @class  Router
   * @author kent.willis@vecna.com
   */

  var Router = Backbone.Router.extend({

    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {

        var UUID = "uuid-"+(new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
        Logger.track({
          UUID : UUID,
          type : "routeChange",
          state: "start",
          route: name,
          time: Date.now(),
        });

        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
        
        Logger.track({
          UUID: UUID,
          time: Date.now(),
          state: "end",
        });

      });
      return this;
    },
  });

  return Router;
}));
