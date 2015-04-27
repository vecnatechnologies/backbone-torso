(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['undersocre', 'backbone', './pollingMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedModel = factory(root._, root.Backbone, root.Torso.Mixins.polling);
  }
}(this, function(_, Backbone, pollingMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @namespace Torso.Models
   * @class     Nested
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedModel = Backbone.NestedModel.extend({});
  _.extend(NestedModel.prototype, pollingMixin);

  return NestedModel;
}));
