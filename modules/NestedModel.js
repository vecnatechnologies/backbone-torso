/**
 * The Backbone-Nested reference
 * @external Backbone-NestedModel
 * @extends external:Backbone-Model
 * @see {@link https://github.com/afeld/backbone-nested|backbone-nested}
 */
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
   *
   * @class NestedModel
   * @extends external:Backbone-NestedModel
   * @mixes pollingMixin
   * @mixes modelMixin
   *
   * @param {Object} attributes the initial attributes to use for this model.
   * @param {Object} [options={}] the options for setting up this model.
   *   @param {boolean} [options.register=false] whether to register this model in the app-level registry.
   *                                             By default this will NOT add it to the registry unless set to true because
   *                                             we have not mechanism that will make sure the models get removed from the registry
   *                                             at the appropriate times.
   * @author kent.willis@vecna.com
   *
   * @see <a href="../annotated/modules/NestedModel.html">NestedModel Annotated Source</a>
   */
  var NestedModel = Backbone.NestedModel.extend(/** @lends NestedModel.prototype */{
    constructor: function(attributes, options) {
      Backbone.NestedModel.apply(this, arguments);
      options = options || {};
      if (options.register) {
        this.__register();
      }
      this.trigger('post-initialize');
    }
  });
  _.extend(NestedModel.prototype, pollingMixin, modelMixin);

  return NestedModel;
}));
