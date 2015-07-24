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
  //   fetch: function(options){
  //     var backboneFetch = Backbone.Model.prototype.fetch;
  //     Backbone.Model.prototype.fetch = function(options){
  //       console.log('beginning of fetch', Date.now());
  //       var origSuccess = options.success;
  //       var optionsMod = Object.create(options);
  //       optionsMod.success = function(){
  //         origSuccess.call(resp);
  //         console.log('end of fetch request');
  //       };
  //       backboneFetch.call(optionsMod);
  //     };
  //   },

      // console.log('beginning of fetch');
      // options = _.extend({parse: true}, options);
      // var model = this;
      // var success = options.success;
      // options.success = function(resp) {
      //   var serverAttrs = options.parse ? model.parse(resp, options) : resp;
      //   if (!model.set(serverAttrs, options)) return false;
      //   if (success) success.call(options.context, model, resp, options);
      //   model.trigger('sync', model, resp, options);
      //   console.log('end of fetch function');
      // };
      // wrapError(this, options);
      // return this.sync('read', this, options);
  });
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));
