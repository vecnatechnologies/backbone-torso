(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', '../registry'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('../registry'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.model = factory(root._, root.Torso.registry);
  }
}(this, function(_, registry) {
  'use strict';
  /**
   * The base for a model
   * @module Torso
   * @namespace Torso.Mixins
   * @class  modelMixin
   * @author kent.willis@vecna.com
   */
  return {
    /**
     * Register this item with the model registry after initialize.
     * @method __register
     * @private
     */
    __register: function() {
      registry.modelInitialized(this);
    },

    /**
     * Default dispose for model-like objects (Models, Cells, and ServiceCells).
     * Removes listeners and calls out to _dispose() for child specific dispose logic.
     * Triggers 2 events - "before-dispose" and "after-dispose".
     * @method dispose
     */
    dispose: function() {
      this.trigger('before-dispose');
      this._dispose();
      this.off();
      this.trigger('after-dispose');
    },

    /**
     * Dispose hook meant to be used by prototypes that extend this one that need to provide their own dispose logic.
     * @method _dispose
     */
    _dispose: _.noop
  };
}));