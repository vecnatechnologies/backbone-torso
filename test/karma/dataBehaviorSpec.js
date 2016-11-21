var _ = require('underscore');
var TorsoDataBehavior = require('./../../modules/behaviors/DataBehavior');
var TorsoView = require('./../../modules/View');
var TorsoCollection = require('./../../modules/Collection');
var Torso  = require('./../../modules/torso');

var setupInjectionSite = require('./helpers/setupInjectionSite');

var TorsoTestCacheCollection = TorsoCollection.extend({
  url: '/myModel'
});

function getBasicBehaviorConfiguration() {
  return {
    behavior: TorsoDataBehavior,
    cache: new TorsoTestCacheCollection(),
    ids: [1, 2]
  };
}
var ViewWithDataBehavior = TorsoView.extend({
  behaviors: {
    dataBehavior: getBasicBehaviorConfiguration()
  }
});

describe('A Torso Data Behavior', function() {

  setupInjectionSite.apply(this);

  beforeEach(function() {
    this.routes = require('./helpers/mockjax')();
  });

  it('exists', function() {
    expect(TorsoDataBehavior).toBeDefined();
  });

  it('exists on the torso global', function() {
    expect(Torso.behaviors.DataBehavior).toBeDefined();
  });

  describe('when instantiated', function() {
    it('exists', function() {
      var viewWithDataBehavior = new ViewWithDataBehavior();
      expect(viewWithDataBehavior.getBehavior('dataBehavior')).toBeDefined();
    });

    it('requires a cache', function() {
      try {
        var defaultBehaviorConfigurationNoCache = getBasicBehaviorConfiguration();
        delete defaultBehaviorConfigurationNoCache.cache;
        var ViewWithBehaviorNoCache = TorsoView.extend({
          behaviors: {
            dataBehavior: defaultBehaviorConfigurationNoCache
          }
        });
        new ViewWithBehaviorNoCache();
        fail('Error expected');
      } catch (error) {
        // expected.
      }
    });

    it('requires id or ids', function() {
      try {
        var defaultBehaviorConfigurationNoId = getBasicBehaviorConfiguration();
        delete defaultBehaviorConfigurationNoId.id;
        delete defaultBehaviorConfigurationNoId.ids;
        var ViewWithBehaviorNoIds = TorsoView.extend({
          behaviors: {
            dataBehavior: defaultBehaviorConfigurationNoId
          }
        });
        new ViewWithBehaviorNoIds();
        fail('Error expected');
      } catch (error) {
        // expected.
      }
    });

    it('requires not both id and ids', function() {
      try {
        var defaultBehaviorConfigurationBothIdAndIds = getBasicBehaviorConfiguration();
        defaultBehaviorConfigurationBothIdAndIds.id = 1;
        defaultBehaviorConfigurationBothIdAndIds.ids = [1];
        var ViewWithBehaviorBothIdAndIds = TorsoView.extend({
          behaviors: {
            dataBehavior: defaultBehaviorConfigurationBothIdAndIds
          }
        });
        new ViewWithBehaviorBothIdAndIds();
        fail('Error expected');
      } catch (error) {
        // expected.
      }
    });

    it('defaults returnSingleResult to false', function() {
      var defaultBehaviorConfigurationReturnSingleResultUndefined = getBasicBehaviorConfiguration();
      delete defaultBehaviorConfigurationReturnSingleResultUndefined.returnSingleResult;
      var ViewWithDataBehaviorReturnSingleResultUndefined = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationReturnSingleResultUndefined
        }
      });
      var viewWithDataBehaviorReturnSingleResultUndefined = new ViewWithDataBehaviorReturnSingleResultUndefined();
      expect(viewWithDataBehaviorReturnSingleResultUndefined.getBehavior('dataBehavior').__returnSingleResult).toBe(false);
    });

    it('can set returnSingleResult to false', function() {
      var defaultBehaviorConfigurationReturnSingleResultFalse = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationReturnSingleResultFalse.returnSingleResult = false;
      var ViewWithDataBehaviorReturnSingleResultFalse = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationReturnSingleResultFalse
        }
      });
      var viewWithDataBehaviorReturnSingleResultFalse = new ViewWithDataBehaviorReturnSingleResultFalse();
      expect(viewWithDataBehaviorReturnSingleResultFalse.getBehavior('dataBehavior').__returnSingleResult).toBe(false);
    });

    it('can set returnSingleResult to true', function() {
      var defaultBehaviorConfigurationReturnSingleResultTrue = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationReturnSingleResultTrue.returnSingleResult = true;
      var ViewWithDataBehaviorReturnSingleResultTrue = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationReturnSingleResultTrue
        }
      });
      var viewWithDataBehaviorReturnSingleResultTrue = new ViewWithDataBehaviorReturnSingleResultTrue();
      expect(viewWithDataBehaviorReturnSingleResultTrue.getBehavior('dataBehavior').__returnSingleResult).toBe(true);
    });

    it('defaults alwaysFetch to false', function() {
      var defaultBehaviorConfigurationAlwaysFetchUndefined = getBasicBehaviorConfiguration();
      delete defaultBehaviorConfigurationAlwaysFetchUndefined.alwaysFetch;
      var ViewWithDataBehaviorAlwaysFetchUndefined = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationAlwaysFetchUndefined
        }
      });
      var viewWithDataBehaviorAlwaysFetchUndefined = new ViewWithDataBehaviorAlwaysFetchUndefined();
      expect(viewWithDataBehaviorAlwaysFetchUndefined.getBehavior('dataBehavior').__alwaysFetch).toBe(false);
    });

    it('can set alwaysFetch to false', function() {
      var defaultBehaviorConfigurationAlwaysFetchFalse = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationAlwaysFetchFalse.alwaysFetch = false;
      var ViewWithDataBehaviorAlwaysFetchFalse = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationAlwaysFetchFalse
        }
      });
      var viewWithDataBehaviorAlwaysFetchFalse = new ViewWithDataBehaviorAlwaysFetchFalse();
      expect(viewWithDataBehaviorAlwaysFetchFalse.getBehavior('dataBehavior').__alwaysFetch).toBe(false);
    });

    it('can set alwaysFetch to true', function() {
      var defaultBehaviorConfigurationAlwaysFetchTrue = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationAlwaysFetchTrue.alwaysFetch = true;
      var ViewWithDataBehaviorAlwaysFetchTrue = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationAlwaysFetchTrue
        }
      });
      var viewWithDataBehaviorAlwaysFetchTrue = new ViewWithDataBehaviorAlwaysFetchTrue();
      expect(viewWithDataBehaviorAlwaysFetchTrue.getBehavior('dataBehavior').__alwaysFetch).toBe(true);
    });

    it('creates a private collection available in the initialize of the behavior', function() {
      var TestPrivateCollectionDataBehavior = TorsoDataBehavior.extend({
        initialize: function() {
          this.testPrivateCollection = this.privateCollection;
        }
      });
      var defaultBehaviorConfigurationWithTestBehavior = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationWithTestBehavior.behavior = TestPrivateCollectionDataBehavior;
      var TestPrivateCollectionView = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationWithTestBehavior
        }
      });
      var testPrivateCollectionView = new TestPrivateCollectionView();
      expect(testPrivateCollectionView.getBehavior('dataBehavior').testPrivateCollection).toBeDefined();
    });

    it('creates a private collection available in the initialize of the view', function() {
      var TestPrivateCollectionView = ViewWithDataBehavior.extend({
        initialize: function() {
          this.testPrivateCollection = this.getBehavior('dataBehavior').privateCollection;
        }
      });
      var testPrivateCollectionView = new TestPrivateCollectionView();
      expect(testPrivateCollectionView.testPrivateCollection).toBeDefined();
    });

    it('can specify a single numeric value for id', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      delete defaultBehaviorConfigurationSingleNumericId.ids;
      defaultBehaviorConfigurationSingleNumericId.id = 1;
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a single string value for id', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      delete defaultBehaviorConfigurationSingleNumericId.ids;
      defaultBehaviorConfigurationSingleNumericId.id = '1';
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['1']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an array of numeric values for ids', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationSingleNumericId.ids = [1, 2];
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1, 2]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an array of string values for ids', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationSingleNumericId.ids = ['1', '2'];
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['1', '2']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function returning a single numeric value for ids', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationSingleNumericId.ids = function() {
        return 1;
      };
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function returning a single string value for ids', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationSingleNumericId.ids = function() {
        return '1';
      };
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['1']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function returning an array of numeric values for ids', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationSingleNumericId.ids = function() {
        return [1, 2];
      };
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1, 2]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function returning an array of string values for ids', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationSingleNumericId.ids = function() {
        return ['1', '2'];
      };
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['1', '2']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function for ids that gets the cache as the first argument', function() {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();

      var actualCacheArgument = null;
      defaultBehaviorConfiguration.ids = function(cache) {
        actualCacheArgument = cache;
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds();
      expect(actualCacheArgument).toBe(dataBehavior.__cache);
    });

    it('can specify a function for ids that returns a jquery deferred object resolving to the ids sync', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationSingleNumericId.ids = function() {
        return $.Deferred().resolve([1, 2]).promise();
      };
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1, 2]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function for ids that returns a jquery deferred object resolving to the ids async', function(done) {
      var defaultBehaviorConfigurationSingleNumericId = getBasicBehaviorConfiguration();
      defaultBehaviorConfigurationSingleNumericId.ids = function() {
        var deferred = $.Deferred();
        window.setTimeout(function() {
          deferred.resolve([1, 2]);
        }, 1);
        return deferred.promise();
      };
      var ViewWithBehaviorSingleNumericId = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfigurationSingleNumericId
        }
      });
      var viewWithBehaviorSingleNumericId = new ViewWithBehaviorSingleNumericId();
      var dataBehaviorSingleNumericId = viewWithBehaviorSingleNumericId.getBehavior('dataBehavior');
      dataBehaviorSingleNumericId.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1, 2]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });
  });
});





