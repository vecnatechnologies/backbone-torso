(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.cellPersistenceRemovalMixin = factory();
  }
}(this, function() {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @namespace Torso.Mixins
   * @class  cellPersistenceRemoval
   * @author kent.willis@vecna.com
   */
  return {
    /**
     * Whether a cell can pass as a model or not.
     * If true, the cell will not fail is persisted functions are invoked
     * If false, the cell will throw exceptions if persisted function are invoked
     * @property {Boolean} isModelCompatible
     * @default false
     */
    isModelCompatible: false,

    save: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have save';
      }
    },

    fetch: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have fetch';
      }
    },

    sync: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have sync';
      }
    },

    url: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have url';
      }
    },
  };
}));
