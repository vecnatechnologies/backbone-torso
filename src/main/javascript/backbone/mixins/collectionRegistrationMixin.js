/**
 * Custom additions to the Backbone Collection object.
 * - safe disposal methods for memory + event management
 * - special functional overrides to support ID registration for different views
 *
 * @module    Torso
 * @namespace Torso.Mixins.Collection
 * @class  RegistrationMixin and CacheMixin
 * @author ariel.wexler@vecna.com, kent.willis@vecna.com
 */
_.extend(Torso.Collection.prototype, (function(base) {

  var cacheMixin, createRequesterCollectionClass,
    baseSuper = base.super || function() {};

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

      var requesterMixin,
        baseParentSuper = parentClass.super;

      /**
       * A mixin that overrides base collection methods meant for cache's and tailors them
       * to a requester.
       * @method requesterMixin
       */
      requesterMixin = function(collection, myTrackedIds) {

        /**
         * @method requesterMixin.getTrackedIds
         * @return {Array} array of ids that this collection is tracking
         */
        collection.getTrackedIds = function() {
          return myTrackedIds;
        };

        /**
         * Will force the cache to fetch just the registered ids of this collection
         * @method requesterMixin.fetch
         * @return {Promise} promise that will resolve when the fetch is complete
         */
        collection.fetch = function() {
          return collection._loadWrapper(function() {
            if (myTrackedIds && myTrackedIds.length) {
              return parentInstance.fetchByIds({idsToFetch: myTrackedIds, setOptions: {remove: false}});
            } else {
              return Torso.$.Deferred().resolve().promise();
            }
          });
        };

        /**
         * Override the Id registration system to route via the parent collection
         * @method requesterMixin.trackIds
         * @param ids The list of ids that this collection wants to track
         */
        collection.trackIds = function(ids) {
          collection.remove(_.difference(myTrackedIds, ids));
          parentInstance.registerIds(ids, ownerKey);
          myTrackedIds = ids;
        };

        /**
         * Will register the new ids and then ask the cache to fetch them
         * @method requesterMixin.fetchByIds
         * @return the promise of the fetch by ids
         */
        collection.fetchByIds = function(newIds) {
          collection.trackIds(newIds);
          return collection.fetch();
        };

        /**
         * Handles the disposing of this collection as it relates to a requester collection.
         * @method requesterMixin.requesterDispose
         */
        collection.requesterDispose = function() {
          parentInstance.removeRequster(ownerKey);
        };
      };

      return {
        /**
         * The super constructor / initialize method for requester collections.
         * @method requesterMixin.super
         */
        super: function(args) {
          args = args || {};
          args.isRequester = true;
          baseParentSuper.call(this, args);
          requesterMixin(this, []);
          this.listenTo(parentInstance, 'load-begin', function() {
            this.trigger('cache-load-begin');
          });
          this.listenTo(parentInstance, 'load-complete', function() {
            this.trigger('cache-load-complete');
          });
        }
      };
    })(parent.constructor.__super__, parent, guid));
  };

  /**
   * Adds functions to manage state of requesters
   * @method cacheMixin
   * @param collection {Collection} the collection to add this mixin
   * @param options.requestMap {Object} the object to hold all request state
   * @param options.collectionTrackedIds {Array} list of all ids this collection is tracking
   * @param options.knownPrivateCollections {Object} map of all private collections that have registered ids [GUID -> collection]
   */
  cacheMixin = function(collection, options) {

    //************* PRIVATE METHODS ************//

    var setRequestedIds,
      requestMap = options.requestMap,
      collectionTrackedIds = options.collectionTrackedIds,
      knownPrivateCollections = options.knownPrivateCollections;

    /**
     * If true, the collection will only fetch an object from the server once.
     * @property lazyFetch
     * @type boolean
     * @default false
     */
    collection.lazyFetch = collection.lazyFetch  || false;

    /**
     * @private
     * @method cacheMixin.setRequestedIds
     * @param guid {String} the global unique identifier for the requester
     * @param array {Array} the array of ids the requester wants
     */
    setRequestedIds = function(guid, array) {
      requestMap[guid] = {
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
      return requestMap[guid] && requestMap[guid].array;
    };

    /**
     * @method cacheMixin.getRequesterIdsAsDictionary
     * This method is used for quick look up of a certain id within the list of requested ids
     * @param guid {String} the global unique id of the requester
     * @return {Object} an dictionary of id -> id of the requester ids for a given requester.
     */
    collection.getRequesterIdsAsDictionary = function(guid) {
      return requestMap[guid] && requestMap[guid].dict;
    };

    /**
     * @method cacheMixin.removeRequster
     * Removes a requester from this cache. No longer receives updates
     * @param guid {String} the global unique id of the requester
     */
    collection.removeRequster = function(guid) {
      delete requestMap[guid];
      delete knownPrivateCollections[guid];
    };

    /**
     * @method cacheMixin.getRequesters
     * @return {Array} an array of the all requesters in the form of their GUID's
     */
    collection.getRequesters = function()  {
      return _.keys(requestMap);
    };

    /**
     * Return the list of Ids requested by this collection
     * @method cacheMixin.getAllRequestedIds
     * @return {Array} the corresponding requested Ids
     */
    collection.getAllRequestedIds = function() {
      return collectionTrackedIds;
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
    collection.createPrivateCollection = function(guid) {
      var RequesterClass = createRequesterCollectionClass(collection, guid);
      knownPrivateCollections[guid] = new RequesterClass();
      return knownPrivateCollections[guid];
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
        storedIds = collection.getRequesterIds(requesters[requesterIdx]);
        for (i = 0; i < storedIds.length; i++) {
          distinctIds[storedIds[i]] = true;
        }
      }

      // Convert the hash table of unique Ids to a list
      for (i in distinctIds) {
        result.push(parseInt(i, 10));
      }
      collectionTrackedIds = result;

      // Overrides the polling mixin's fetch method
      collection.polledFetch = function() {
        collection.fetchByIds({
          idsToFetch: collectionTrackedIds,
          setOptions: {remove: true}
        });
      };
    };

    /**
     * A custom fetch operation to only fetch the requested Ids.
     * @method cacheMixin.fetchByIds
     * @param options.idsToFetch {Array} - A list of request Ids
     * @param options.setOptions {Object} - if a set is made, then the setOptions will be passed into the set method
     * @return {Promise} the promise of the fetch
     */
    collection.fetchByIds = function(options) {
      // Fires a method from the loadingMixin that wraps the fetch with events that happen before and after
      return collection._loadWrapper(function(args) {
        var requestedIds, idsToFetch;
        requestedIds = args.idsToFetch;
        if (collection.lazyFetch) {
          idsToFetch = _.difference(requestedIds, this.models.pluck('id'));
        } else {
          idsToFetch = requestedIds;
        }
        return Torso.$.ajax({
            type:'POST',
            url: collection.url + '/ids',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(idsToFetch)
          }).done(
            // Success function
            function(data) {
              var i, requesterIdx, requesterIdsAsDict, models, privateCollection,
                  requesterLength, requesters, model,
                  requestedIdsLength = requestedIds.length,
                  setOptions = args.setOptions;
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
                privateCollection = knownPrivateCollections[requesters[requesterIdx]];
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
      collection.lazyFetch = lazyFetch;
    };

    /**
     * Gets the lazyFetch mode.
     * @method isLazyFetch
     * @return {boolean} true if this collection fetches lazily.
     */
    collection.isLazyFetch = function() {
      return collection.lazyFetch;
    };
  };

  return {
    /**
     * The super constructor / initialize method for collections.
     * Allocate new memory for the local references if they
     * were null when this method was called.
     * @method super
     */
    super: function(args) {
      baseSuper.call(this, args);
      this.isRequester = args && args.isRequester;
      if (!this.isRequester) {
        cacheMixin(this, {
          requestMap: {},
          collectionTrackedIds: [],
          knownPrivateCollections: {}
        });
      }
    },

    /**
     * The default initialize method should simply call the
     * super constructor.
     * @method initialize
     * @param [args] {Object} Optional argument object
     */
    initialize: function(args) {
      this.super(args);
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
})(Torso.Collection.prototype));
