/**
 * Loading logic to be mixed into Backbone Collections.
 * Requires collectionRegistrationMixin.js to be imported first
 *
 * @module    Web Core
 * @namespace WebCore.Mixins.Collection
 * @class  LoadingMixin
 * @author kent.willis@vecna.com
 */
_.extend(WebCore.Collection.prototype, (function(base) {

  var loadingMixin,
    baseSuper = base.super || function() {};

  loadingMixin = function(collection, options) {

    var loadedOnceDeferred = options.loadedOnceDeferred,
      loadedOnce = options.loadedOnce,
      loading = options.loading;

    /**
     * @method hasLoadedOnce
     * @return true if this collection has ever loaded from a fetch call
     */
    collection.hasLoadedOnce = function() {
      return loadedOnce;
    };

    /**
     * @method isLoading
     * @return true if this collection is currently loading new values from the server
     */
    collection.isLoading = function() {
      return loading;
    };

    /**
     * @method getLoadedOncePromise
     * @return a promise that will resolve when the collection has loaded for the first time
     */
    collection.getLoadedOncePromise = function() {
      return loadedOnceDeferred.promise();
    };

    /**
     * Wraps the base fetch in a wrapper that manages loaded states
     * @method fetch
     * @param options {Object} - the object to hold the options needed by the base fetch method
     */
    collection.fetch = function(options) {
      this._loadWrapper(base.fetch, options);
    };

    /**
     * Base load function that will trigger a "load-begin" and a "load-complete" as
     * the fetch happens. Use this method to wrap any method that returns a promise in loading events
     * @method _loadWrapper
     * @param fetchMethod {Function} - the method to invoke a fetch
     * @param options {Object} - the object to hold the options needed by the fetchMethod
     * @return a promise when the fetch method has completed and the events have been triggered
     */
    collection._loadWrapper = function(fetchMethod, options) {
      loading = true;
      collection.trigger('load-begin');
      return WebCore.$.when(fetchMethod.call(collection, options)).done(function(data, textStatus, jqXHR) {
        collection.trigger('load-complete', {success: true, data: data, textStatus: textStatus, jqXHR: jqXHR});
      }).fail(function(jqXHR, textStatus, errorThrown) {
        collection.trigger('load-complete', {success: false, jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown});
      }).always(function() {
        if (!loadedOnce) {
          loadedOnce = true;
          loadedOnceDeferred.resolve();
        }
        loading = false;
      });
    };
  };

  return {
    /**
     * Adds the loading mixin to the collection
     * @method super
     * @param args {Object} the arguments to the base super method
     */
    super: function(args) {
      baseSuper.call(this, args);
      loadingMixin(this, {
        loadedOnceDeferred: new WebCore.$.Deferred(),
        loadedOnce: false,
        loading: false
      });
    }
  };
})(WebCore.Collection.prototype));
