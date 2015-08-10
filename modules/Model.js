(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './pollingMixin', './EventTracker'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'), require('./EventTracker'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Model = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.EventTracker);
  }
}(this, function(_, Backbone, pollingMixin, EventTracker) {
  'use strict';


  var Model = Backbone.Model.extend({

    fetch: function(options){
      var uuid = (new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
      this.trigger('fetchTiming', {
        uuid: uuid,
        type: 'fetch',
        state: 'start',
        time: Date.now(),
      });
      var newOptions = $.extend({}, options);
      var success = options.success;
      newOptions.success = function(model, resp, options){
        if (success) success(resp);
        this.trigger('fetchTiming', {
          uuid: uuid,
          state: 'end',
          time: Date.now(),
        });
      };
      Backbone.Model.prototype.fetch.apply(this, [newOptions]);
    }

  });
  
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));
