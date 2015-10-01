(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.collectionRegistration = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function(_, $) {
  /**
   * Custom additions to the Backbone Collection object.
   * - safe disposal methods for memory + event management
   * - special functional overrides to support ID registration for different views
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  collectionRegistration
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var collectionRegistrationMixin = function(base) {

    var cacheMixin, createRequesterCollectionClass;

    /**
     * Returns a new class of collection that inherits from the parent but not the cacheMixin
     * and adds a requesterMixin that connects this cache to it's parent
     *
     * @method createRequesterCollectionClass
     * @param parent {Backbone Collection instance} the parent of the private collection
     * @param guid {String} the unique code of the owner of this private collection
     */
    createRequesterCollectionClass = function(parent, guid) {
      return parent.constructor.extend((function(parentClass, parentInstance, ownerKey) {

        /**
         * A mixin that overrides base collection methods meant for cache's and tailors them
         * to a requester.
         * @method requesterMixin
         */
        var requesterMixin = {

          /**
           * @method requesterMixin.getTrackedIds
           * @return {Array} array of ids that this collection is tracking
           */
          getTrackedIds: function() {
            return this.trackedIds;
          },

          /**
           * Will force the cache to fetch just the registered ids of this collection
           * @method requesterMixin.fetch
           * @return {Promise} promise that will resolve when the fetch is complete
           */
          fetch: function() {
            var requsterCollection = this;
            return this.__loadWrapper(function() {
              if (requsterCollection.trackedIds && requsterCollection.trackedIds.length) {
                return parentInstance.fetchByIds({idsToFetch: requsterCollection.trackedIds, setOptions: {remove: false}});
              } else {
                return $.Deferred().resolve().promise();
              }
            });
          },

          /**
           * Override the Id registration system to route via the parent collection
           * @method requesterMixin.trackIds
           * @param ids The list of ids that this collection wants to track
           */
          trackIds: function(ids) {
            this.remove(_.difference(this.trackedIds, ids));
            parentInstance.registerIds(ids, ownerKey);
            this.trackedIds = ids;
          },


          /**
           * Adds a new model to the requester collection and tracks the model.id
           * @method requesterMixin.addModelAndTrack
           * @param model {Backbone Model} the model to be added
           */
          addModelAndTrack: function(model) {
            this.add(model);
            this.trackNewId(model.id);
          },

          /**
           * Tracks a new id
           * @method requesterMixin.trackNewId
           * @param id {String or Number} the id attribute of the model
           */
          trackNewId: function(id) {
            this.trackIds(this.getTrackedIds().concat(id));
          },

          /**
           * Will register the new ids and then ask the cache to fetch them
           * @method requesterMixin.fetchByIds
           * @return the promise of the fetch by ids
           */
          fetchByIds: function(newIds) {
            this.trackIds(newIds);
            return this.fetch();
          },

          /**
           * Handles the disposing of this collection as it relates to a requester collection.
           * @method requesterMixin.requesterDispose
           */
          requesterDispose: function() {
            parentInstance.removeRequster(ownerKey);
          }
        };

        return requesterMixin;
      })(parent.constructor.__super__, parent, guid));
    };

    /**
     * Adds functions to manage state of requesters
     * @method cacheMixin
     * @param collection {Collection} the collection to add this mixin
     */
    cacheMixin = function(collection) {

      //************* PRIVATE METHODS ************//

      /**
       * @private
       * @method cacheMixin.setRequestedIds
       * @param guid {String} the global unique identifier for the requester
       * @param array {Array} the array of ids the requester wants
       */
      var setRequestedIds = function(guid, array) {
        collection.requestMap[guid] = {
          array: array,
          dict: _.object(_.map(array, function(id) { return [id, id]; }))
        };
      };

      //*********** PUBLIC METHODS ************//

      /**
       * @method cacheMixin.getRequesterIds
       * @param {String} the global unique id of the requester
       * @return {Array} an array of the ids the requester with the guid has requested
       */
      collection.getRequesterIds = function(guid) {
        return this.requestMap[guid] && this.requestMap[guid].array;
      };

      /**
       * @method cacheMixin.getRequesterIdsAsDictionary
       * This method is used for quick look up of a certain id within the list of requested ids
       * @param guid {String} the global unique id of the requester
       * @return {Object} an dictionary of id -> id of the requester ids for a given requester.
       */
      collection.getRequesterIdsAsDictionary = function(guid) {
        return this.requestMap[guid] && this.requestMap[guid].dict;
      };

      /**
       * @method cacheMixin.removeRequster
       * Removes a requester from this cache. No longer receives updates
       * @param guid {String} the global unique id of the requester
       */
      collection.removeRequster = function(guid) {
        delete this.requestMap[guid];
        delete this.knownPrivateCollections[guid];
      };

      /**
       * NOTE: this methods returns only the guids for requester collections that are currently tracking ids
       * TODO: should this return just the knownPrivateCollections
       * @method cacheMixin.getRequesters
       * @return {Array} an array of the all requesters in the form of their GUID's
       */
      collection.getRequesters = function()  {
        return _.keys(this.requestMap);
      };

      /**
       * Return the list of Ids requested by this collection
       * @method cacheMixin.getAllRequestedIds
       * @return {Array} the corresponding requested Ids
       */
      collection.getAllRequestedIds = function() {
        return this.collectionTrackedIds;
      };

      /**
       * Used to return a collection of desired models given the requester object.
       * Binds a custom "resized" event to the private collections.
       * Overrides the fetch method to call the parent collection's fetchByIds method.
       * Overrides the registerIds method to redirect to its parent collection.
       * @method cacheMixin.createPrivateCollection
       * @param guid {String} Identifier for the requesting view
       * @return {Collection} an new empty collection of the same type as "this"
       */
      collection.createPrivateCollection = function(guid, args) {
        args = args || {};
        args.isRequester = true;
        args.parentInstance = collection;
        var RequesterClass = createRequesterCollectionClass(collection, guid);
        this.knownPrivateCollections[guid] = new RequesterClass(null, args);
        return this.knownPrivateCollections[guid];
      };

      /**
       * Registers a list of Ids that a particular object cares about.  This method
       * intelligently updates the "_requestedIds" field to contain all unique
       * requests for Ids to be fetched.  Furthermore, the "polledFetch" method
       * is overriden such that it no longer routes through Backbone's fetch all,
       * but rather a custom "fetchByIds" method.
       * @method cacheMixin.registerIds
       * @param newIds {Array}  - New ids to register under the requester
       * @param guid {String}   - The GUID of the object that wants the ids
       */
      collection.registerIds = function(newIds, guid) {
        var i, requesterIdx, storedIds, requesters, requesterLength,
            distinctIds = {},
            result = [];

        // Save the new requests in the map
        setRequestedIds(guid, newIds);
        requesters = collection.getRequesters();
        requesterLength = requesters.length;

        // Create a new request list
        for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
          storedIds = this.getRequesterIds(requesters[requesterIdx]);
          if (!_.isUndefined(storedIds)) {
            for (i = 0; i < storedIds.length; i++) {
              distinctIds[storedIds[i]] = true;
            }
          }
        }

        // Convert the hash table of unique Ids to a list
        for (i in distinctIds) {
          result.push(i);
        }
        this.collectionTrackedIds = result;

        // Overrides the polling mixin's fetch method
        this.polledFetch = function() {
          collection.fetchByIds({
            setOptions: {remove: true}
          });
        };
      };

      /**
       * Calling fetch from the cache will fetch the tracked ids if fetchUsingTrackedIds is set to true, otherwise
       * it will pass through to the default fetch.
       * @override
       * @method fetch
       */
      collection.fetch = function(options) {
        options = options || {};
        if (this.fetchUsingTrackedIds) {
          return this.fetchByIds({
            setOptions: _.extend({remove: true}, options)
          });
        } else {
          return base.fetch(options);
        }
      };

      /**
       * A custom fetch operation to only fetch the requested Ids.
       * @method cacheMixin.fetchByIds
       * @param [options] - argument options
       * @param [options.idsToFetch=collection.collectionTrackedIds] {Array} - A list of request Ids, will default to current tracked ids
       * @param [options.setOptions] {Object} - if a set is made, then the setOptions will be passed into the set method
       * @return {Promise} the promise of the fetch
       */
      collection.fetchByIds = function(options) {
        options = options || {};
        // Fires a method from the loadingMixin that wraps the fetch with events that happen before and after
        return this.__loadWrapper(function(options) {
          var requestedIds, idsToFetch;
          requestedIds = options.idsToFetch || collection.collectionTrackedIds;
          if (collection.lazyFetch) {
            idsToFetch = _.difference(requestedIds, this.models.pluck('id'));
          } else {
            idsToFetch = requestedIds;
          }
          return $.ajax({
              type: collection.fetchHttpAction,
              url: collection.url + collection.getByIdsUrl,
              contentType: 'application/json; charset=utf-8',
              data: JSON.stringify(idsToFetch)
            }).done(
              // Success function
              function(data) {
                var i, requesterIdx, requesterIdsAsDict, models, privateCollection,
                    requesterLength, requesters, model,
                    requestedIdsLength = requestedIds.length,
                    setOptions = options.setOptions;
                collection.set(collection.parse(data), setOptions);
                // Set respective collection's models for requested ids only.
                requesters = collection.getRequesters();
                requesterLength = requesters.length;
                // For each requester...
                for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
                  requesterIdsAsDict = collection.getRequesterIdsAsDictionary(requesters[requesterIdx]);
                  models = [];
                  // ... now let's iterate over the ids that were fetched ...
                  for (i = 0; i < requestedIdsLength; i++) {
                    //if the id that the requester cares about matches that model whose id was just fetched...
                    if (requesterIdsAsDict[requestedIds[i]]) {
                      model = collection.get(requestedIds[i]);
                      // if the model was removed, no worries, the parent won't attempt to update the child on that one.
                      if (model) {
                        models.push(model);
                      }
                    }
                  }
                  privateCollection = collection.knownPrivateCollections[requesters[requesterIdx]];
                  // a fetch by the parent will not remove a model in a requester collection that wasn't fetched with this call
                  privateCollection.set(models, {remove: false});
                }
              });
        }, options);
      };

      /**
       * Sets the lazyFetch mode. When enabled, the collection will assume models don't change, and only fetch each model from the server once.
       * @method setLazyFetch
       * @param lazyFetch {boolean} the lazyFetch mode to set
       */
      collection.setLazyFetch = function(lazyFetch) {
        this.lazyFetch = lazyFetch;
      };

      /**
       * Gets the lazyFetch mode.
       * @method isLazyFetch
       * @return {boolean} true if this collection fetches lazily.
       */
      collection.isLazyFetch = function() {
        return this.lazyFetch;
      };
    };

    return {
      /**
       * The constructor constructor / initialize method for collections.
       * Allocate new memory for the local references if they
       * were null when this method was called.
       * @param [options] {Object} - optional options object
       * @param   [options.fetchHttpAction='POST'] {String} http action used to get objects by ids
       * @param   [options.getByIdsUrl='/ids'] {String} path appended to collection.url to get objects by a list of ids
       * @param   [options.lazyFetch=false] {Boolean} if set to true, the collection will assume that models do not change after first fetch
       * @param   [options.fetchUsingTrackedIds=true] {Boolean} if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids
                                                               but will rather call the default fetch method.
       * @method constructor
       */
      constructor: function(models, options) {
        options = options || {};
        base.call(this, models, options);
        this.isRequester = options.isRequester;
        this.parentInstance = options.parentInstance;
        if (!this.isRequester) {
          this.requestMap = {};
          this.collectionTrackedIds = [];
          this.knownPrivateCollections = {};
          this.getByIdsUrl = options.getByIdsUrl || '/ids';
          this.fetchHttpAction = options.fetchHttpAction || 'POST';
          this.lazyFetch = options.lazyFetch || false;
          this.fetchUsingTrackedIds = options.fetchUsingTrackedIds !== false;
          cacheMixin(this);
        } else {
          this.trackedIds = [];
          this.listenTo(this.parentInstance, 'load-begin', function() {
            this.trigger('cache-load-begin');
          });
          this.listenTo(this.parentInstance, 'load-complete', function() {
            this.trigger('cache-load-complete');
          });
        }
      },

      /**
       * Will abolish all listeners and events that are hooked
       * to this collection.
       * @method dispose
       */
      dispose: function() {
        this.unbind();
        this.off();
        this.stopListening();
        this.stopPolling();
        if (this.isRequester) {
          this.requesterDispose();
        }
      },

      /**
       * The default filter.  Always returns itself.
       * @method filterDefault
       * @return {Collection} a new instance of this collection
       */
      filterDefault: function() {
        return this.constructor(this);
      }
    };
  };

  return collectionRegistrationMixin;
}));