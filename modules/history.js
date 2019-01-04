/**
 * The backbone History reference
 * @external Backbone-History
 * @extends external:Backbone-Events
 * @see {@link http://backbonejs.org/#History|Backbone.History}
 */
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
   *
   * @class history
   * @extends external:Backbone-History
   *
   * @author kent.willis@vecna.com
   *
   * @see <a href="../annotated/modules/history.html">history Annotated Source</a>
   */
  return Backbone.history;
}));
