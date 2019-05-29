/**
 * The backbone Router reference
 * @external Backbone-Router
 * @extends external:Backbone-Events
 * @see {@link http://backbonejs.org/#Router|Backbone.Router}
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Router = factory(root.Backbone);
  }
}(this, function(Backbone) {
  'use strict';
  /**
   * Backbone's router.
   *
   * @class  Router
   * @extends external:Backbone-Router
   *
   * @author kent.willis@vecna.com
   *
   * @see <a href="../annotated/modules/Router.html">Router Annotated Source</a>
   */
  return Backbone.Router.extend(/** @lends Router.prototype */{});
}));
