





  

```
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.loading = factory(root.Backbone);
  }
}(this, function(Backbone) {

  var $ = Backbone.$;

  /**
   * Loading logic.
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  loadingMixin
   * @author kent.willis@vecna.com
   */
  var loadingMixin = function(base) {

    return {
      /**
       * Adds the loading mixin
       * @param {Object} args the arguments to the base constructor method
       */
      constructor: function(args) {
        base.call(this, args);
        this.loadedOnceDeferred = new $.Deferred();
        this.loadedOnce = false;
        this.loadingCount = 0;

```







Loading is a convenience flag that is the equivalent of loadingCount > 0


  

```
        this.loading = false;
      },

      /**
       * @return {boolean} true if this model/collection has ever loaded from a fetch call
       */
      hasLoadedOnce: function() {
        return this.loadedOnce;
      },

      /**
       * @return {boolean} true if this model/collection is currently loading new values from the server
       */
      isLoading: function() {
        return this.loading;
      },

      /**
       * @return {Promise} a promise that will resolve when the model/collection has loaded for the first time
       */
      getLoadedOncePromise: function() {
        return this.loadedOnceDeferred.promise();
      },

      /**
       * Wraps the base fetch in a wrapper that manages loaded states
       * @param {Object} options - the object to hold the options needed by the base fetch method
       * @return {Promise} The loadWrapper promise
       */
      fetch: function(options) {
        return this.__loadWrapper(base.prototype.fetch, options);
      },

      /**
       * Base load function that will trigger a "load-begin" and a "load-complete" as
       * the fetch happens. Use this method to wrap any method that returns a promise in loading events
       * @param {Function} fetchMethod - the method to invoke a fetch
       * @param {Object} options - the object to hold the options needed by the fetchMethod
       * @return {Promise} a promise when the fetch method has completed and the events have been triggered
       */
      __loadWrapper: function(fetchMethod, options) {
        var object = this;
        this.loadingCount++;
        this.loading = true;
        this.trigger('load-begin');
        return $.when(fetchMethod.call(object, options)).always(function() {
          if (!object.loadedOnce) {
            object.loadedOnce = true;
            object.loadedOnceDeferred.resolve();
          }
          object.loadingCount--;
          if (object.loadingCount <= 0) {
            object.loadingCount = 0; // prevent going negative.
            object.loading = false;
          }
        }).done(function(data, textStatus, jqXHR) {
          object.trigger('load-complete', {success: true, data: data, textStatus: textStatus, jqXHR: jqXHR});
        }).fail(function(jqXHR, textStatus, errorThrown) {
          object.trigger('load-complete', {success: false, jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown});
        });
      }
    };
  };

  return loadingMixin;
}));


```




