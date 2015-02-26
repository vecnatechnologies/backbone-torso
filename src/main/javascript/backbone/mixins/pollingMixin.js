/**
 * Periodic Polling Object to be mixed into Backbone Collections and Models.
 *
 * The polling functionality should only be used for collections and for models that are not
 * part of any collections. It should not be used for a model that is a part of a collection.
 * @module    Torso
 * @namespace Torso.Mixins
 * @class  PollingMixin
 * @author ariel.wexler@vecna.com
 */
(function() {
  var pollingMixin = {
    /**
     * @property pollTimeoutId {Number} The id from when setTimeout was called to start polling.
     */
    pollTimeoutId: undefined,
    _pollStarted: false,
    _pollInterval: 5000,

    /**
     * Returns true if the poll is active
     * @method isPolling
     */
    isPolling: function() {
      return this._pollStarted;
    },

    /**
     * Starts polling Model/Collection by calling fetch every pollInterval.
     * Note: Each Model/Collection will only allow a singleton of polling to occur so
     * as not to have duplicate threads updating Model/Collection.
     * @method startPolling
     * @param  pollInterval {Integer} interval between each poll in ms.
     */
    startPolling: function(pollInterval) {
      if (pollInterval) {
        this._pollInterval = pollInterval;
      }
      // have only 1 poll going at a time
      if (this._pollStarted) {
        return;
      } else {
        this._pollStarted = true;
        this._poll();
        this.pollTimeoutId = window.setInterval(Torso.$.proxy(function() {
          this._poll();
        }, this), this._pollInterval);
      }
    },

    /**
     * Stops polling Model and clears all Timeouts.
     * @method  stopPolling
     */
    stopPolling: function() {
      window.clearInterval(this.pollTimeoutId);
      this._pollStarted = false;
    },

    /**
     * By default, the polled fetching operation is routed directly
     * to backbone's fetch all.
     * @method polledFetch
     */
    polledFetch: function() {
      this.fetch();
    },

    /**
     * Private function to recursively call itself and poll for db updates.
     * @private
     * @method _poll
     */
    _poll: function() {
      this.polledFetch();
    }
  };

  // Add the mixin to both models and collections.
  _.extend(Torso.Collection.prototype, pollingMixin);
  _.extend(Torso.Model.prototype, pollingMixin);
  _.extend(Torso.NestedModel.prototype, pollingMixin);
})();