(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', '../mixins/torsoPollingMixin', '../mixins/torsoCollectionRegistrationMixin', '../mixins/torsoCollectionLoadingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('../mixins/torsoPollingMixin'), require('../mixins/torsoCollectionRegistrationMixin'), require('../mixins/torsoCollectionLoadingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Collections = root.Torso.Collections || {};
    root.Torso.Collections.Collection = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Mixins.collectionRegistration, root.Torso.Mixins.collectionLoading);
  };
}(this, function(_, Backbone, torsoPollingMixin, torsoCollectionRegistrationMixin, torsoCollectionLoadingMixin) {
  'use strict;'

  /**
   * Generic Collection
   * @module    Torso
   * @namespace Torso.Collections
   * @class     Collection
   * @constructor
   * @author kent.willis@vecna.com
   */
  var TorsoCollection = Backbone.Collection.extend({});
  _.extend(TorsoCollection.prototype, torsoPollingMixin);
  _.extend(TorsoCollection.prototype, torsoCollectionRegistrationMixin(TorsoCollection.prototype));
  _.extend(TorsoCollection.prototype, torsoCollectionLoadingMixin(TorsoCollection.prototype));

  return TorsoCollection;
}));
