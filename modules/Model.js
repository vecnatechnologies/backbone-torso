(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './pollingMixin', './Logger'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'), require('./Logger'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Model = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Logger);
  }
}(this, function(_, Backbone, pollingMixin, Logger) {
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

      var UUID = "uuid-"+(new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);

      Logger.track({
        UUID : UUID,
        type : "fetch",
        state: "start",
<<<<<<< HEAD
        time: Date.now(),
=======
        before: Date.now(),
>>>>>>> a1ffbe8a847864200479446e9f56cce5cbc4a27c
      });


      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);

        Logger.track({
          UUID: UUID,
<<<<<<< HEAD
          time: Date.now(),
=======
          after: Date.now(),
>>>>>>> a1ffbe8a847864200479446e9f56cce5cbc4a27c
          state: "end",
        });

      };
      this.wrapError(this, options);
      return this.sync('read', this,options);
    },

  });
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));
