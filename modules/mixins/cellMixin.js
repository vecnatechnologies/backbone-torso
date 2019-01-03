(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.cell = factory();
  }
}(this, function() {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   *
   * @mixin cellMixin
   * @author kent.willis@vecna.com
   */
  return /** @lends cellMixin */ {
    /**
     * Whether a cell can pass as a model or not.
     * If true, the cell will not fail is persisted functions are invoked
     * If false, the cell will throw exceptions if persisted function are invoked
     * @property {boolean} isModelCompatible
     * @default false
     */
    isModelCompatible: false,

    /**
     * Override and disable the save function
     */
    save: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have save';
      }
    },

    /**
     * Override and disable the fetch function
     */
    fetch: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have fetch';
      }
    },

    /**
     * Override and disable the sync function
     */
    sync: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have sync';
      }
    },

    /**
     * Override and disable the url
     */
    url: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have url';
      }
    }
  };
}));
