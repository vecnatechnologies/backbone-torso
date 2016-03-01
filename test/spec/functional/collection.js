// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A Torso Collection', function() {

  var env, _, Collection, Model;

  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      Collection = env.window.Torso.Collection;
      Model = env.window.Torso.Model;
      _ = env.window._;
      done();
    });
  });

  it('can iniatialize a cache correctly', function() {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({model: MyModel, foo: _.noop});
    var collection = new MyCollection();
    expect(collection.getRequesterIds).toBeDefined();
    expect(collection.getRequesterIdsAsDictionary).toBeDefined();
    expect(collection.removeRequester).toBeDefined();
    expect(collection.getRequesters).toBeDefined();
    expect(collection.getAllRequestedIds).toBeDefined();
    expect(collection.createPrivateCollection).toBeDefined();
    expect(collection.registerIds).toBeDefined();
    expect(collection.polledFetch).toBeDefined();
    expect(collection.fetchByIds).toBeDefined();
    expect(collection.setLazyFetch).toBeDefined();
    expect(collection.isLazyFetch).toBeDefined();
    expect(collection.foo).toBeDefined();
    // Expect not to see requester API
    expect(collection.getTrackedIds).not.toBeDefined();
    expect(collection.trackIds).not.toBeDefined();
    expect(collection.addModelAndTrack).not.toBeDefined();
    expect(collection.trackNewId).not.toBeDefined();
    expect(collection.requesterDispose).not.toBeDefined();

    expect(collection.getRequesterIds()).toBe(undefined);
    expect(_.size(collection.getRequesters())).toBe(0);
  });

  it('can iniatialize a requester collection correctly', function() {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({model: MyModel, foo: _.noop});
    var cache = new MyCollection();
    var collection = cache.createPrivateCollection(1);
    expect(collection.getRequesterIds).not.toBeDefined();
    expect(collection.getRequesterIdsAsDictionary).not.toBeDefined();
    expect(collection.removeRequester).not.toBeDefined();
    expect(collection.getRequesters).not.toBeDefined();
    expect(collection.getAllRequestedIds).not.toBeDefined();
    expect(collection.createPrivateCollection).not.toBeDefined();
    expect(collection.registerIds).not.toBeDefined();
    expect(collection.setLazyFetch).not.toBeDefined();
    expect(collection.isLazyFetch).not.toBeDefined();
    // Expect to see requester API
    expect(collection.getTrackedIds).toBeDefined();
    expect(collection.trackIds).toBeDefined();
    expect(collection.addModelAndTrack).toBeDefined();
    expect(collection.trackNewId).toBeDefined();
    expect(collection.requesterDispose).toBeDefined();
    expect(collection.polledFetch).toBeDefined();
    expect(collection.fetchByIds).toBeDefined();
    expect(collection.fetchSubsetOfTrackedIds).toBeDefined();
    expect(collection.pull).toBeDefined();
    expect(collection.pullByIds).toBeDefined();
    expect(collection.foo).toBeDefined();
  });

  it('can have a requester collection track a new id', function() {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({model: MyModel});
    var cache = new MyCollection();
    var collection = cache.createPrivateCollection(1);
    collection.trackNewId('1');
    expect(_.size(cache.getRequesters())).toBe(1);
    var requesterIds = cache.getAllRequestedIds();
    expect(_.size(requesterIds)).toBe(1);
    expect(requesterIds[0]).toBe('1');
    expect(_.size(cache.getRequesterIds(1))).toBe(1);
    expect(cache.getRequesterIds(1)[0]).toBe('1');
  });

  it('can have a requester collection be pushed a model when it is fetched into cache', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var collection = cache.createPrivateCollection(1);
    expect(collection.size()).toBe(0);
    collection.trackNewId('1');
    collection.trackNewId('2');
    expect(collection.size()).toBe(0);
    expect(_.size(cache.getRequesters())).toBe(1);
    var requesterIds = cache.getAllRequestedIds();
    expect(_.size(requesterIds)).toBe(2);
    cache.fetch().done(function() {
      expect(collection.size()).toBe(2);
      expect(collection.findWhere({id: '1'})).toBeDefined();
      expect(collection.findWhere({id: '2'})).toBeDefined();
      expect(collection.findWhere({id: '3'})).not.toBeDefined();
      done();
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });

  it('can have a requester collection be pushed a model when it tracks a model already in cache', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var requester1 = cache.createPrivateCollection(1);
    var requester2 = cache.createPrivateCollection(2);
    requester1.trackNewId('1');
    requester1.trackNewId('2');
    expect(requester1.size()).toBe(0);
    cache.fetch().done(function() {
      expect(requester1.size()).toBe(2);
      expect(requester1.findWhere({id: '1'})).toBeDefined();
      expect(requester1.findWhere({id: '2'})).toBeDefined();
      expect(requester1.findWhere({id: '3'})).not.toBeDefined();
      requester2.trackNewId('2');
      requester2.trackNewId('3');
      expect(requester2.size()).toBe(1);
      expect(requester2.findWhere({id: '2'})).toBeDefined();
      expect(requester2.findWhere({id: '3'})).not.toBeDefined();
      done();
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });

  it('can have multiple requester collections tracking overlapping ids', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var requester1 = cache.createPrivateCollection(1);
    var requester2 = cache.createPrivateCollection(2);
    expect(_.size(cache.knownPrivateCollections)).toBe(2);
    expect(_.size(cache.getRequesters())).toBe(0);
    requester1.trackNewId('1');
    requester1.trackNewId('2');
    requester2.trackNewId('2');
    requester2.trackNewId('3');
    expect(_.size(cache.getRequesters())).toBe(2);
    var requesterIds = cache.getAllRequestedIds();
    expect(_.size(requesterIds)).toBe(3);
    expect(_.contains(requesterIds, '1', '2', '3')).toBe(true);
    cache.fetch().done(function() {
      expect(cache.size()).toBe(3);
      expect(requester1.size()).toBe(2);
      expect(requester1.findWhere({id: '1'})).toBeDefined();
      expect(requester1.findWhere({id: '2'})).toBeDefined();
      expect(requester1.findWhere({id: '3'})).not.toBeDefined();
      expect(requester2.size()).toBe(2);
      expect(requester2.findWhere({id: '1'})).not.toBeDefined();
      expect(requester2.findWhere({id: '2'})).toBeDefined();
      expect(requester2.findWhere({id: '3'})).toBeDefined();
      done();
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });

  it('can sort requester collections seperate from cache', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var requester1 = cache.createPrivateCollection(1);
    requester1.comparator = 'count';
    requester1.trackNewId(1);
    requester1.trackNewId(2);
    cache.fetch().done(function() {
      requester1.sort();
      expect(requester1.models[0].get('count')).toBe(0);
      expect(requester1.models[1].get('count')).toBe(1);
      expect(cache.models[0].get('count')).toBe(0);
      expect(cache.models[1].get('count')).toBe(1);
      requester1.comparator = function(model) {
        return -model.get('count');
      };
      requester1.sort();
      expect(requester1.models[0].get('count')).toBe(1);
      expect(requester1.models[1].get('count')).toBe(0);
      expect(cache.models[0].get('count')).toBe(0);
      expect(cache.models[1].get('count')).toBe(1);
      done();
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });

  it('can poll fetch', function() {
    jasmine.clock().install();
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    expect(cache.getLoadedOncePromise).toBeDefined();
    expect(cache.hasLoadedOnce).toBeDefined();
    expect(cache.isLoading).toBeDefined();
    expect(cache.__loadWrapper).toBeDefined();
    var requester1 = cache.createPrivateCollection(1);
    requester1.trackNewId('1');
    expect(cache.isPolling()).toBe(false);
    spyOn(cache, 'polledFetch');
    cache.startPolling(30);
    expect(cache.isPolling()).toBe(true);
    jasmine.clock().tick(100);
    expect(cache.polledFetch.calls.count()).toEqual(4); // once when started, 3 times when polling
    cache.stopPolling();
    expect(cache.isPolling()).toBe(false);
    jasmine.clock().uninstall();
  });

  it('can trigger events when loading from server', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var collection = cache.createPrivateCollection(1);
    var loadBeginCounter = 0;
    var loadCompleteCounter = 0;
    collection.trackNewId('1');
    cache.on('load-begin', function() {
      loadBeginCounter++;
    });
    cache.on('load-complete', function() {
      loadCompleteCounter++;
    });
    expect(loadBeginCounter).toBe(0);
    expect(loadCompleteCounter).toBe(0);
    expect(cache.hasLoadedOnce()).toBe(false);
    cache.fetch().done(function() {
      expect(cache.hasLoadedOnce()).toBe(true);
      expect(loadBeginCounter).toBe(1);
      expect(loadCompleteCounter).toBe(1);
      done();
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
    expect(cache.isLoading()).toBe(true);
    expect(loadBeginCounter).toBe(1);
    expect(loadCompleteCounter).toBe(0);
  });

  it('can notify that a cache has started/stopped loading from a requester collection', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var collection = cache.createPrivateCollection(1);
    var loadBeginCounter = 0;
    var loadCompleteCounter = 0;
    var cacheLoadBeginCounter = 0;
    var cacheLoadCompleteCounter = 0;
    collection.trackNewId('1');
    // load-begin -> cache-load-begin -> FETCHING -> cache-load-complete -> load-complete
    collection.on('load-begin', function() {
      expect(cacheLoadBeginCounter).toBe(0);
      loadBeginCounter++;
    });
    collection.on('load-complete', function() {
      loadCompleteCounter++;
    });
    collection.on('cache-load-begin', function() {
      cacheLoadBeginCounter++;
    });
    collection.on('cache-load-complete', function() {
      expect(loadCompleteCounter).toBe(0);
      cacheLoadCompleteCounter++;
    });
    collection.fetch().done(function() {
      expect(loadBeginCounter).toBe(1);
      expect(loadCompleteCounter).toBe(1);
      expect(cacheLoadBeginCounter).toBe(1);
      expect(cacheLoadCompleteCounter).toBe(1);
      done();
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
    expect(loadBeginCounter).toBe(1);
    expect(loadCompleteCounter).toBe(0);
    expect(cacheLoadBeginCounter).toBe(1);
    expect(cacheLoadCompleteCounter).toBe(0);
  });

  it('can release untracked models', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var requester1 = cache.createPrivateCollection(1);
    var requester2 = cache.createPrivateCollection(2);
    requester1.trackNewId('1');
    requester1.trackNewId('2');
    requester2.trackNewId('2');
    requester2.trackNewId('3');
    cache.fetch().done(function() {
      expect(cache.size()).toBe(3);
      expect(requester1.size()).toBe(2);
      expect(requester2.size()).toBe(2);
      requester1.trackIds(['1']);
      requester2.trackIds(['3']);
      cache.fetch().done(function() {
        expect(cache.size()).toBe(2);
        expect(requester1.size()).toBe(1);
        expect(requester2.size()).toBe(1);
        done();
      }).fail(function(response) {
        console.log(response);
        console.log('Failed to fetch from cache');
        expect(true).toBe(false);
        done();
      });
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });

  it('can have a requester collections fetch a subset of their tracked ids', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var requester1 = cache.createPrivateCollection(1);
    requester1.trackNewId('1');
    requester1.trackNewId('2');
    expect(cache.size()).toBe(0);
    expect(requester1.size()).toBe(0);
    requester1.fetchSubsetOfTrackedIds(['1', '3']).done(function(data) {
      expect(cache.size()).toBe(1);
      expect(requester1.size()).toBe(1);
      var dataIds = _.pluck(data, 'id');
      expect(dataIds.length).toBe(1);
      expect(dataIds[0]).toBe('1');
      expect(requester1.findWhere({id: '1'})).toBeDefined();
      expect(requester1.findWhere({id: '2'})).not.toBeDefined();
      expect(requester1.findWhere({id: '3'})).not.toBeDefined();
      done();
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });

  it('can have a requester collections pull into cache models it is tracking that are not in cache', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var requester1 = cache.createPrivateCollection(1);
    requester1.trackNewId('1');
    requester1.trackNewId('2');
    cache.fetch().done(function() {
      expect(cache.size()).toBe(2);
      expect(requester1.size()).toBe(2);
      expect(requester1.findWhere({id: '1'})).toBeDefined();
      expect(requester1.findWhere({id: '2'})).toBeDefined();
      expect(requester1.findWhere({id: '3'})).not.toBeDefined();
      requester1.trackNewId('3');
      requester1.pull().done(function(data) {
        expect(cache.size()).toBe(3);
        expect(requester1.size()).toBe(3);
        var dataIds = _.pluck(data, 'id');
        expect(dataIds.length).toBe(1);
        expect(dataIds[0]).toBe('3');
        expect(requester1.findWhere({id: '3'})).toBeDefined();
        done();
      });
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });

  it('can have a requester collections track ids and pull into cache tracked ids that are not in cache', function(done) {
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var requester1 = cache.createPrivateCollection(1);
    var requester2 = cache.createPrivateCollection(2);
    requester1.trackNewId('1');
    requester1.trackNewId('2');
    cache.fetch().done(function() {
      expect(cache.size()).toBe(2);
      expect(requester2.size()).toBe(0);
      expect(requester1.findWhere({id: '1'})).toBeDefined();
      expect(requester1.findWhere({id: '2'})).toBeDefined();
      expect(requester1.findWhere({id: '3'})).not.toBeDefined();
      requester2.pullByIds(['1', '3']).done(function(data) {
        expect(cache.size()).toBe(3);
        expect(requester2.size()).toBe(2);
        var dataIds = _.pluck(data, 'id');
        expect(dataIds.length).toBe(1);
        expect(dataIds[0]).toBe('3');
        expect(requester2.findWhere({id: '1'})).toBeDefined();
        expect(requester2.findWhere({id: '2'})).not.toBeDefined();
        expect(requester2.findWhere({id: '3'})).toBeDefined();
        done();
      });
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });

  xit('can track ids that are longs/ints', function(done) {
    //TODO this doesn't work. Id's come back as strings.
    var MyModel = Model.extend({});
    var MyCollection = Collection.extend({url: '/myModel', model: MyModel});
    var cache = new MyCollection();
    var requester1 = cache.createPrivateCollection(1);
    requester1.trackNewId(1);
    cache.fetch().done(function() {
      expect(requester1.models[0].id).toBe(1);
      done();
    }).fail(function(response) {
      console.log(response);
      console.log('Failed to fetch from cache');
      expect(true).toBe(false);
      done();
    });
  });
});