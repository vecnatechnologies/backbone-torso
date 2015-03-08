(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './viewHierarchyMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./viewHierarchyMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Views = root.Torso.Views || {};
    root.Torso.Views.View = factory(root._, root.Backbone, root.Torso.Mixins.viewHierarchy);
  }
}(this, function(_, Backbone, viewHierarchyMixin) {
  'use strict';

  /**
   * Generic View.
   * @module    Torso
   * @namespace Torso.Views
   * @class     View
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var View = Backbone.View.extend({});
  _.extend(View.prototype, viewHierarchyMixin);
  return View;
}));
