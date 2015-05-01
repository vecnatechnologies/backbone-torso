(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.history = factory(root.Backbone);
  }
}(this, function(Backbone) {
  'use strict';

  /**
   * Backbone's history object.
   * @module    Torso
   * @class     history
   * @constructor
   * @author kent.willis@vecna.com
   */
  return Backbone.history;
}));
