(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin', './mixins/modelMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'), require('./mixins/modelMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedModel = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Mixins.model);
  }
}(this, function(_, Backbone, pollingMixin, modelMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @class     NestedModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedModel = Backbone.NestedModel.extend({
    constructor: function() {
      Backbone.NestedModel.apply(this, arguments);
      this.__postInitialize();
      this.trigger('post-initialize');
    }
  });
  _.extend(NestedModel.prototype, pollingMixin, modelMixin);

  return NestedModel;
}));
