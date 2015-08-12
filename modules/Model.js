(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './pollingMixin', './Events'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'), require('./Events'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Model = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Events);
  }
}(this, function(_, Backbone, pollingMixin, Events) {
  'use strict';


  var Model = Backbone.Model.extend({

    /**
     * Overrides constructor to apply timing event triggers to Torso.Events
     * @method constructor
     * @override
     */
    constructor: function() {
      Backbone.Model.apply(this,arguments);
      this.__applyTimingEventListeners(['pre-fetch', 'post-fetch']);
    },   

    fetch: function(options) {
      var uuid = _.uniqueId();
      this.trigger('pre-fetch', {
        uuid: uuid,
        time: Date.now(),
      });
      var newOptions = $.extend({}, options);
      var success = options.success;
      newOptions.success = function(model, resp, options){
        if (success) success(resp);
        this.trigger('post-fetch', {
          uuid: uuid,
          time: Date.now(),
        });
      };
      Backbone.Model.prototype.fetch.apply(this, [newOptions]);
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
  
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));
