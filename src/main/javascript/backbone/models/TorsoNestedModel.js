(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['undersocre', 'backbone', '../mixins/torsoPollingMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('../mixins/torsoPollingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Models = root.Torso.Models || {};
    root.Torso.Models.Nested = factory(root._, root.Backbone, root.Torso.Mixins.polling);
  };
}(this, function(_, Backbone, torsoPollingMixin) {
  'use strict;'

  /**
   * Generic Nested Model
   * @module    Torso
   * @namespace Torso.Models
   * @class     Nested
   * @constructor
   * @author kent.willis@vecna.com
   */
  var TorsoNestedModel = Backbone.NestedModel.extend({});
  _.extend(TorsoNestedModel.prototype, torsoPollingMixin);

  return TorsoNestedModel;
}));
