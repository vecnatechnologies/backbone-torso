(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './pollingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Model = factory(root._, root.Backbone, root.Torso.Mixins.polling);
  }
}(this, function(_, Backbone, pollingMixin) {
  'use strict';


  var Model = Backbone.Model.extend({

    wrapError: function(options){
      var error = options.error;
      options.error = function(resp) {
        if (error) error(model, resp, options);
        model.trigger('error', model, resp, options);
      };
    },

    fetch: function(options){
      var eventInfo = {};
      var UUID = "uuid-"+(new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
      eventInfo.UUID = UUID;
      var before = Date.now();
      
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        var after = Date.now();
        eventInfo.fetchTime = after-before;
        console.log(eventInfo);
        
      };
      this.wrapError(this, options);
      return this.sync('read', this,options);
    },

  });
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));
