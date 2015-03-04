(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', '../mixins/torsoViewHierarchyMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('../mixins/torsoViewHierarchyMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Views = root.Torso.Views || {};
    root.Torso.Views.View = factory(root._, root.Backbone, root.Torso.Mixins.viewHierarchy);
  };
}(this, function(_, Backbone, torsoViewHierarchyMixin) {
  'use strict;'

  /**
   * Generic View.
   * @module    Torso
   * @namespace Torso.Views
   * @class     View
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var TorsoView = Backbone.View.extend({});
  _.extend(TorsoView.prototype, torsoViewHierarchyMixin);
  return TorsoView;
}));
