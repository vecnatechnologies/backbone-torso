/**
 * The backbone Events reference
 * @external Backbone-Events
 * @see {@link http://backbonejs.org/#Events|Backbone.Events}
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Events = factory(root._, root.Backbone);
  }
}(this, function(_, Backbone) {
  'use strict';

  /**
   * Generic Events.
   *
   * @class     Events
   * @extends {external:Backbone-Events}
   *
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   *
   * @see <a href="../annotated/modules/Events.html">Events Annotated Source</a>
   */
  var Events = _.extend({}, Backbone.Events);

  return Events;
}));
