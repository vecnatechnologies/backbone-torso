/**
 * The backbone Collection reference
 * @external Backbone-Collection
 * @extends external:Backbone-Events
 * @see {@link http://backbonejs.org/#Collection|Backbone.Collection}
 */
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
   *
   * @class Collection
   * @extends {external:Backbone-Collection}
   * @mixes pollingMixin
   * @mixes loadingMixin
   * @mixes cacheMixin
   *
   * @author kent.willis@vecna.com
   *
   * @see <a href="../annotated/modules/Collection.html">Collection Annotated Source</a>
   */
  var Collection = Backbone.Collection.extend(/** @lends Collection.prototype */{
      /**
       * The default filter.  Always returns itself.
       * @return {Collection} a new instance of this collection
       */
      filterDefault: function() {
        return this.constructor(this);
      },

      /**
       * Will abolish all listeners and events that are hooked
       * to this collection.
       */
      dispose: function() {
        this.unbind();
        this.off();
        this.stopListening();
        this.stopPolling();
        if (this.isRequester) {
          this.requesterDispose();
        }
      }
  });
  _.extend(Collection.prototype, pollingMixin);
  Collection = Collection.extend(loadingMixin(Collection));
  Collection = Collection.extend(cacheMixin(Collection));

  return Collection;
}));
