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

  /**
   * Generic Model
   * @module    Torso
   * @class     Model
   * @constructor
   * @author kent.willis@vecna.com
   */
  var Model = Backbone.Model.extend({});
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));
