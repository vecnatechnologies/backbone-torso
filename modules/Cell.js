(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './Model', './mixins/cellMixin', './registry'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('./Model'), require('./mixins/cellMixin'), require('./registry'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Cell = factory(root._, root.Torso.Model, root.Torso.Mixins.cell, root.Torso.registry);
  }
}(this, function(_, Model, cellMixin, registry) {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @class  Cell
   * @constructor
   * @param {Object} attributes the initial attributes to use for this cell.
   * @param {Object} [options={}] the options for setting up this cell.
   *   @param {boolean} [options.register=false] whether to register this cell in the app-level registry.
   *                                             By default this will NOT add it to the registry unless set to true because
   *                                             we have not mechanism that will make sure the cells get removed from the registry
   *                                             at the appropriate times.
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var Cell = Model.extend({
    /**
     * Register this item with the cell registry after initialize.
     * @private
     * @override
     */
    __register: function() {
      registry.cellInitialized(this);
    }
  });
  _.extend(Cell.prototype, cellMixin);

  return Cell;
}));
