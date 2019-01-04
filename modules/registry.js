(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.registry = factory(root._, root.Backbone);
  }
}(this, function(_, Backbone) {
  'use strict';

  /**
   * Registry of instantiated Torso objects
   *
   * @class registry
   * @extends external:Backbone-Events
   *
   * @author jyoung@vecna.com
   *
   * @see <a href="../annotated/modules/registry.html">registry Annotated Source</a>
   */
  var Registry = function() {
    /**
     * The registered cells keyed by their unique cid.
     * @name cells
     * @instance
     * @type {Object.<string, Cell>}
     * @memberof registry
     */
    this.cells = {};
    /**
     * The registered models keyed by their unique cid.
     * @name models
     * @instance
     * @type {Object.<string, Model>}
     * @memberof registry
     */
    this.models = {};
    /**
     * The registered services keyed by their unique cid.
     * @name services
     * @instance
     * @type {Object.<string, ServiceCell>}
     * @memberof registry
     */
    this.services = {};
    /**
     * The registered views keyed by their unique cid.
     * @name views
     * @instance
     * @type {Object.<string, View>}
     * @memberof registry
     */
    this.views = {};
  };

  _.extend(Registry.prototype, Backbone.Events, /** @lends registry.prototype */{
    /**
     * The prefix to use for this object's cid.
     * @type {string}
     */
    cidPrefix: 'r',

    /**
     * Add the model to the model cache when it is initialized.
     * @param {Torso.Model} model the model to add to the models cache.
     */
    modelInitialized: function(model) {
      this.__initialize(model, this.models);
    },

    /**
     * Add the cell to the cell cache when it is initialized.
     * @param {Torso.Cell} cell the cell to add to the cells cache.
     */
    cellInitialized: function(cell) {
      this.__initialize(cell, this.cells);
    },

    /**
     * Add the view to the view cache when it is initialized.
     * @param {Torso.View} view the view to add to the views cache.
     */
    viewInitialized: function(view) {
      this.__initialize(view, this.views);
    },

    /**
     * Add the service to the model service when it is initialized.
     * @param {Torso.ServiceCell} service the service to add to the services cache.
     */
    serviceInitialized: function(service) {
      this.__initialize(service, this.services);
    },

    /**
     * Initialize the given object in the given cache.
     * @param {Backbone.Events} obj any object that implements/extends backbone events.
     *   @param {string} obj.cid the unique identifier for the object.
     * @param {Object} cache the cache to add the object to.
     * @private
     */
    __initialize: function(obj, cache) {
      cache[obj.cid] = obj;
      this.listenToOnce(obj, 'before-dispose', function() {
        delete cache[obj.cid];
      });
    },

    /**
     * Dispose of all items in all of the caches (Models, Cells, Services and Views).
     */
    disposeAll: function() {
      this.disposeAllModels();
      this.disposeAllCells();
      this.disposeAllServices();
      this.disposeAllViews();
    },

    /**
     * Dispose of all items in the Models cache.
     */
    disposeAllModels: function() {
      this.__disposeCache(this.models);
    },

    /**
     * Dispose of all items in the Cells cache.
     */
    disposeAllCells: function() {
      this.__disposeCache(this.cells);
    },

    /**
     * Dispose of all items in the Services cache.
     */
    disposeAllServices: function() {
      this.__disposeCache(this.services);
    },

    /**
     * Dispose of all items in the Views cache.
     */
    disposeAllViews: function() {
      this.__disposeCache(this.views);
    },

    /**
     * Invoke dispose on all the items in the given cache.
     * @param {Object} cache to invoke dispose on each member.
     * @private
     */
    __disposeCache: function(cache) {
      var objects = _.values(cache);
      _.invoke(objects, 'dispose');
    }
  });

  var registry = new Registry();

  return registry;
}));
