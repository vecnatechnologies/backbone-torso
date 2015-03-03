/**
 * A static object responsible for tracking and creating
 * unique GUIDs when asked.  These GUIDs can be used for anything.
 *
 * @module    Torso
 * @namespace Torso
 * @class     GUIDManager
 * @static
 * @author    ariel.wexler@vecna.com
 */
Torso.GUIDManager = {
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