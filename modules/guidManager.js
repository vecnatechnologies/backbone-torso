(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Utils = root.Torso.Utils || {};
    root.Torso.Utils.guidManager = factory();
  }
}(this, function() {
  'use strict';

  /**
   * A static object responsible for tracking and creating
   * unique GUIDs when asked.  These GUIDs can be used for anything.
   *
   * @module    Torso
   * @namespace Torso.Utils
   * @class     guidManager
   * @static
   * @author    ariel.wexler@vecna.com
   */
  var guidManager = {
    /**
     * The next GUID numeral
     * @property _current
     */
    _current: 0,

    /**
     * Create a GUID and return it
     * @method generate
     * @return {String} A unique hash
     */
    generate: function() {
      var hash = this._generateGUID();
      return hash;
    },

    /**
     * Random GUID generator.  Creates GUIDs in the format: G<number>
     * @private
     * @method _generateGUID
     * @return {String} A sequence of Hex Digits
     */
    _generateGUID: function() {
      var GUID = 'G' + this._current;
      this._current++;
      return GUID;
    }
  };
  return guidManager;
}));
