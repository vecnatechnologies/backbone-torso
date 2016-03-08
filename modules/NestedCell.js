(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/cellMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/cellMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedCell = factory(root._, root.Backbone, root.Torso.Mixins.cell);
  }
}(this, function(_, Backbone, cellMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @class     NestedModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedCell = Backbone.NestedModel.extend({});
  _.extend(NestedCell.prototype, cellMixin);

  return NestedCell;
}));
