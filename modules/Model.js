(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin', './mixins/modelMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'), require('./mixins/modelMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Model = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Mixins.model);
  }
}(this, function(_, Backbone, pollingMixin, modelMixin) {
  'use strict';

  /**
   * Generic Model
   * @module    Torso
   * @class     Model
   * @constructor
   * @param {Object} attributes the initial attributes to use for this model.
   * @param {Object} [options={}] the options for setting up this model.
   *   @param {boolean} [options.register=false] whether to register this model in the app-level registry.
   *                                             By default this will NOT add it to the registry unless set to true because
   *                                             we have not mechanism that will make sure the models get removed from the registry
   *                                             at the appropriate times.
   * @author kent.willis@vecna.com
   */
  var Model = Backbone.Model.extend({
    constructor: function(attributes, options) {
      Backbone.Model.apply(this, arguments);
      options = options || {};
      if (options.register) {
        this.__register();
      }
      this.trigger('post-initialize');
    }
  });
  _.extend(Model.prototype, pollingMixin, modelMixin);

  return Model;
}));
