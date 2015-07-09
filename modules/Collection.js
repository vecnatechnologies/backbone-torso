(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './pollingMixin', './collectionRegistrationMixin', './collectionLoadingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'), require('./collectionRegistrationMixin'), require('./collectionLoadingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Collection = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Mixins.collectionRegistration, root.Torso.Mixins.collectionLoading);
  }
}(this, function(_, Backbone, pollingMixin, collectionRegistrationMixin, collectionLoadingMixin) {
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
  Collection = Collection.extend(collectionLoadingMixin(Collection));
  Collection = Collection.extend(collectionRegistrationMixin(Collection));

  return Collection;
}));
