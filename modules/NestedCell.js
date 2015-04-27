(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './cellPersistenceRemovalMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./cellPersistenceRemovalMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedCell = factory(root._, root.Backbone, root.Torso.Mixins.cellPersistenceRemovalMixin);
  }
}(this, function(_, Backbone, cellPersistenceRemovalMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @class     NestedModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedCell = Backbone.NestedModel.extend({});
  _.extend(NestedCell.prototype, cellPersistenceRemovalMixin);

  return NestedCell;
}));
