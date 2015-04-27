(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './cellPersistenceRemovalMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./cellPersistenceRemovalMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Cell = factory(root._, root.Backbone, root.Torso.Mixins.cellPersistenceRemovalMixin);
  }
}(this, function(_, Backbone, cellPersistenceRemovalMixin) {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @class  Cell
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var Cell = Backbone.Model.extend({});
  _.extend(Cell.prototype, cellPersistenceRemovalMixin);

  return Cell;
}));
