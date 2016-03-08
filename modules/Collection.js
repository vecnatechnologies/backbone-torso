(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin', './mixins/cacheMixin', './mixins/loadingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'), require('./mixins/cacheMixin'), require('./mixins/loadingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Collection = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Mixins.cache, root.Torso.Mixins.loading);
  }
}(this, function(_, Backbone, pollingMixin, cacheMixin, loadingMixin) {
  'use strict';

  /**
   * Generic Collection
   * @module    Torso
   * @class     Collection
   * @constructor
   * @author kent.willis@vecna.com
   */
  var Collection = Backbone.Collection.extend({});
  _.extend(Collection.prototype, pollingMixin);
  Collection = Collection.extend(loadingMixin(Collection));
  Collection = Collection.extend(cacheMixin(Collection));

  return Collection;
}));
