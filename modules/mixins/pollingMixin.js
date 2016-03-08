(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.polling = factory();
  }
}(this, function() {
  /**
   * Periodic Polling Object to be mixed into Backbone Collections and Models.
   *
   * The polling functionality should only be used for collections and for models that are not
   * part of any collections. It should not be used for a model that is a part of a collection.
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  pollingMixin
   * @author ariel.wexler@vecna.com
   */
  var pollingMixin = {
    /**
     * @property pollTimeoutId {Number} The id from when setTimeout was called to start polling.
     */
    pollTimeoutId: undefined,
    __pollStarted: false,
    __pollInterval: 5000,

    /**
     * Returns true if the poll is active
     * @method isPolling
     */
    isPolling: function() {
      return this.__pollStarted;
    },

    /**
     * Starts polling Model/Collection by calling fetch every pollInterval.
     * Note: Each Model/Collection will only allow a singleton of polling to occur so
     * as not to have duplicate threads updating Model/Collection.
     * @method startPolling
     * @param  pollInterval {Integer} interval between each poll in ms.
     */
    startPolling: function(pollInterval) {
      var self = this;
      if (pollInterval) {
        this.__pollInterval = pollInterval;
      }
      // have only 1 poll going at a time
      if (this.__pollStarted) {
        return;
      } else {
        this.__pollStarted = true;
        this.__poll();
        this.pollTimeoutId = window.setInterval(function() {
          self.__poll();
        }, this.__pollInterval);
      }
    },

    /**
     * Stops polling Model and clears all Timeouts.
     * @method  stopPolling
     */
    stopPolling: function() {
      window.clearInterval(this.pollTimeoutId);
      this.__pollStarted = false;
    },

    /**
     * By default, the polled fetching operation is routed directly
     * to backbone's fetch all.
     * @method polledFetch
     */
    polledFetch: function() {
      this.fetch();
    },

    //************** Private methods **************//

    /**
     * Private function to recursively call itself and poll for db updates.
     * @private
     * @method __poll
     */
    __poll: function() {
      this.polledFetch();
    }
  };

  return pollingMixin;
}));