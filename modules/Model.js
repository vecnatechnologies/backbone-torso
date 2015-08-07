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
      var trackingInfo = EventTracker.track({
        type : "fetch",
        state: "start",
      });
      var newOptions = $.extend({}, options);
      var success = options.success;
      newOptions.success = function(model, resp, options){
        if (success) success(resp);
        EventTracker.track({
          UUID:trackingInfo.UUID,
          state: 'end',
        });
      };
      Backbone.Model.prototype.fetch.apply(this, [newOptions]);
    }

  });
  
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));
