(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './NestedModel', './mixins/cellMixin', './registry'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('./NestedModel'), require('./mixins/cellMixin'), require('./registry'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedCell = factory(root._, root.Torso.NestedModel, root.Torso.Mixins.cell, root.Torso.registry);
  }
}(this, function(_, TorsoNestedModel, cellMixin, registry) {
  'use strict';

  /**
   * Generic Nested Cell
   * @module    Torso
   * @class     NestedCell
   * @constructor
   * @param {Object} attributes the initial attributes to use for this cell.
   * @param {Object} [options={}] the options for setting up this cell.
   *   @param {boolean} [options.register=false] whether to register this cell in the app-level registry.
   *                                             By default this will NOT add it to the registry unless set to true because
   *                                             we have not mechanism that will make sure the models get removed from the registry
   *                                             at the appropriate times.
   * @author kent.willis@vecna.com
   */
  var NestedCell = TorsoNestedModel.extend({
    /**
     * Register this item with the cell registry after initialize.
     * @private
     * @override
     */
    __register: function() {
      registry.cellInitialized(this);
    }
  });
  _.extend(NestedCell.prototype, cellMixin);

  return NestedCell;
}));
