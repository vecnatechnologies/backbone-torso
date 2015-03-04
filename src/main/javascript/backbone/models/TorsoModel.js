(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', '../mixins/torsoPollingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('../mixins/torsoPollingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Models = root.Torso.Models || {};
    root.Torso.Models.Model = factory(root._, root.Backbone, root.Torso.Mixins.polling);
  };
}(this, function(_, Backbone, torsoPollingMixin) {
  'use strict;'

  /**
   * Generic Model
   * @module    Torso
   * @namespace Torso.Models
   * @class     Model
   * @constructor
   * @author kent.willis@vecna.com
   */
  var TorsoModel = Backbone.Model.extend({});
  _.extend(TorsoModel.prototype, torsoPollingMixin);

  return TorsoModel;
}));
