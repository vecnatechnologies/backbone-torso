var _ = require('underscore');
var TorsoDataBehavior = require('./../../modules/behaviors/DataBehavior');
var TorsoView = require('./../../modules/View');
var TorsoCollection = require('./../../modules/Collection');
var Torso  = require('./../../modules/torso');

var setupInjectionSite = require('./helpers/setupInjectionSite');

function getBasicBehaviorConfiguration() {
  return {
    behavior: TorsoDataBehavior,
    cache: new TorsoCollection(),
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
  });

});





