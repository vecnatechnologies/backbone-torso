var _ = require('underscore');
var TorsoDataBehavior = require('./../../modules/behaviors/DataBehavior');
var TorsoView = require('./../../modules/View');
var TorsoCollection = require('./../../modules/Collection');
var TorsoNestedModel = require('./../../modules/NestedModel');
var Torso  = require('./../../modules/torso');

var setupInjectionSite = require('./helpers/setupInjectionSite');

var TorsoTestCacheCollection = TorsoCollection.extend({
  url: '/myModel',
  fetchHttpAction: 'POST'
});

var MOCKJAX_ROUTE_WITH_OTHER_IDS = {
  url: '/myModel/ids',
  type: 'POST',
  dataType: 'json',
  responseTime: 100,
  response: function(settings) {
    var models = [],
      data = _.isString(settings.data) ? JSON.parse(settings.data) : settings.data;
    for (var i = 0; i < data.length; i++) {
      models.push({
        id: data[i],
        count: i,
        otherIds: [i + 1, i + 2, i + 3],
        otherOtherIds: ['a' + i, 'b' + i, 'c' + i, 'd' + i, 'e' + i, 'f' + i]
      });
    }
    this.responseText = models;
  }
};

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

    it('can specify a single numeric value for id:\n\
id = 1\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      delete defaultBehaviorConfiguration.ids;
      defaultBehaviorConfiguration.id = 1;
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a single string value for id:\n\
id = \'1\'\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      delete defaultBehaviorConfiguration.ids;
      defaultBehaviorConfiguration.id = '1';
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['1']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an array of numeric values for ids:\n\
ids = [1, 2]\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = [1, 2];
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1, 2]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an array of string values for ids:\n\
ids = [\'1\', \'2\']\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = ['1', '2'];
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['1', '2']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function returning a single numeric value for ids:\n\
ids = function() {\n\
  return 1;\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = function() {
        return 1;
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function returning a single string value for ids:\n\
ids = function() {\n\
  return \'1\';\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = function() {
        return '1';
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['1']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function returning an array of numeric values for ids:\n\
ids = function() {\n\
  return [1, 2];\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = function() {
        return [1, 2];
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1, 2]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function returning an array of string values for ids:\n\
ids = function() {\n\
  return [\'1\', \'2\'];\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = function() {
        return ['1', '2'];
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['1', '2']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function for ids that gets the cache as the first argument:\n\
ids = function(cache) {\n\
  ...\n\
}\n\
', function() {
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

    it('can specify a function for ids that returns a jquery deferred object resolving to the ids sync:\n\
ids = function() {\n\
  return $.Deferred().resolve([1, 2]).promise();\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = function() {
        return $.Deferred().resolve([1, 2]).promise();
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1, 2]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify a function for ids that returns a jquery deferred object resolving to the ids async:\n\
ids = function() {\n\
  var deferred = $.Deferred();\n\
  window.setTimeout(function() {\n\
    deferred.resolve([1, 2]);\n\
  }, 1);\n\
  return deferred.promise();\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = function() {
        var deferred = $.Deferred();
        window.setTimeout(function() {
          deferred.resolve([1, 2]);
        }, 1);
        return deferred.promise();
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1, 2]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids and requires a property field to be set on it:\n\
ids = {}\n\
', function() {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {};
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      try {
        new ViewWithBehavior();
        fail('error expected');
      } catch(error) {
        // expected.
      }
    });

    it('can reference a context that does not exist and will return an empty array of ids:\n\
ids = {\n\
  property: \'type\',\n\
  context: function() {\n\
    return undefined;\n\
  }\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'type',
        context: function() {
          return undefined;
        }
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can reference a property that does not exist and will return an empty array of ids:\n\
ids = {\n\
  property: \'type\',\n\
  context: function() {\n\
    return {\n\
      test: 1\n\
    };\n\
  }\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'type',
        context: function() {
          return {
            test: 1
          };
        }
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a property directly on the view:\n\
ids = {\n\
  property: \'_viewId\'\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: '_viewId'
      };
      var ViewWithBehavior = TorsoView.extend({
        _viewId: 1,
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([1]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a property directly on the viewState:\n\
ids = {\n\
  property: \'testId\'\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'testId'
      };
      var ViewWithBehavior = TorsoView.extend({
        initialize: function() {
          this.set('testId', '2');
        },
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['2']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a property directly on the viewState:\n\
ids = {\n\
  property: \'viewState.testId2\'\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'viewState.testId2'
      };
      var ViewWithBehavior = TorsoView.extend({
        initialize: function() {
          this.set('testId2', ['3', '5']);
        },
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['3', '5']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a property directly on the view.model:\n\
ids = {\n\
  property: \'model.dependentIds\'\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'model.dependentIds'
      };
      var ViewWithBehavior = TorsoView.extend({
        initialize: function() {
          this.model = new TorsoNestedModel({ dependentIds: ['a', 'b', 'c']})
        },
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['a', 'b', 'c']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a property on another behavior:\n\
ids = {\n\
  property: \'behaviors.dataBehavior2._someIds\'\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'behaviors.dataBehavior2._someIds'
      };
      var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration,
          dataBehavior2: defaultBehavior2Configuration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
      dataBehavior2._someIds = [100, 300, 252341, 643];
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([100, 300, 252341, 643]);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a data property on another behavior:\n\
ids = {\n\
  property: \'behaviors.dataBehavior2.someOtherId\'\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'behaviors.dataBehavior2.someOtherId'
      };
      var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration,
          dataBehavior2: defaultBehavior2Configuration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
      dataBehavior2.privateCollection.add(new TorsoNestedModel({ someOtherId: 100 }));
      dataBehavior2.privateCollection.add(new TorsoNestedModel({ someOtherId: 'abd' }));
      dataBehavior2.privateCollection.add(new TorsoNestedModel({ someOtherId: 252341 }));
      dataBehavior2.privateCollection.add(new TorsoNestedModel({ someOtherId: 'blah' }));
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual([100, 'abd', 252341, 'blah']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a field of a context object:\n\
var context = {\n\
  dependencyIds: [\'blah\', \'blah\', \'blah\', \'blah\']\n\
};\n\
ids = {\n\
  property: \'dependencyIds\',\n\
  context: context\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      var context = {
        dependencyIds: ['blah', 'blah', 'blah', 'blah']
      };
      defaultBehaviorConfiguration.ids = {
        property: 'dependencyIds',
        context: context
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['blah']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference an attribute of a context object:\n\
var contextModel = new TorsoNestedModel({ referenceId: \'test\' });\n\
ids = {\n\
  property: \'referenceId\',\n\
  context: contextModel\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      var contextModel = new TorsoNestedModel({ referenceId: 'test' });
      defaultBehaviorConfiguration.ids = {
        property: 'referenceId',
        context: contextModel
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['test']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a field of a context object retrieved by a function:\n\
ids = {\n\
  property: \'reference2Id\',\n\
  context: function() {\n\
    return { reference2Id: \'test2\' }\n\
  }\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'reference2Id',
        context: function() {
          return { reference2Id: 'test2' }
        }
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['test2']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('can specify an object for ids that uses the property field to reference a field of a context object retrieved by a function where this is bound to the behavior:\n\
ids = {\n\
  property: \'type\',\n\
  context: function() {\n\
    return this.contextModel;\n\
  }\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'type',
        context: function() {
          return this.contextModel;
        }
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.contextModel = new TorsoNestedModel({ type: 'other' });
      dataBehavior.__getIds()
        .then(function(ids) {
          expect(ids).toEqual(['other']);
          done();
        }, function(error) {
          fail(error);
          done();
        });
    });

    it('has a toJSON() method that will return the contents of the fetched models', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      var contextModel = new TorsoNestedModel({ referenceId: 'initialValue' });
      defaultBehaviorConfiguration.ids = {
        property: 'referenceId',
        context: contextModel
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.retrieve()
        .then(function() {
          expect(dataBehavior.toJSON()).toEqual([{ id: 'initialValue', count: 0 }]);
          done();
        });
    });

    it('will re-fetch the ids and data when the ids context triggers a change event for the ids property', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      var contextModel = new TorsoNestedModel();
      contextModel.referenceId = 'initialId';
      defaultBehaviorConfiguration.ids = {
        property: 'referenceId',
        context: contextModel
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.retrieve()
        .then(function() {
          expect(dataBehavior.toJSON()).toEqual([{ id: 'initialId', count: 0 }]);
          contextModel.referenceId = 'newId';
          expect(dataBehavior.toJSON()).toEqual([{ id: 'initialId', count: 0 }]);
          dataBehavior.on('fetched', function() {
            expect(dataBehavior.toJSON()).toEqual([{ id: 'newId', count: 0 }]);
            done();
          });
          contextModel.trigger('change:referenceId');
        });
    });

    it('will re-fetch the ids and data when the change:context event is triggered on the behavior', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      var initialContextModel = new TorsoNestedModel();
      var contextContainer = new TorsoNestedModel();
      contextContainer.context = initialContextModel;
      initialContextModel.id = 'initialId';
      defaultBehaviorConfiguration.ids = {
        property: 'id',
        context: function() {
          return contextContainer.context;
        }
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.retrieve()
        .then(function() {
          expect(dataBehavior.toJSON()).toEqual([{ id: 'initialId', count: 0 }]);
          initialContextModel.id = 'newId';
          expect(dataBehavior.toJSON()).toEqual([{ id: 'initialId', count: 0 }]);
          dataBehavior.once('fetched', function() {
            expect(dataBehavior.toJSON()).toEqual([{ id: 'newId', count: 0 }]);

            var newContextModel = new TorsoNestedModel();
            newContextModel.id = 'anotherId';
            contextContainer.context = newContextModel;
            dataBehavior.trigger('change:context');

            dataBehavior.once('fetched', function() {
              expect(dataBehavior.toJSON()).toEqual([{ id: 'anotherId', count: 0 }]);
              done();
            });
          });
          initialContextModel.trigger('change:id');
        });
    });

    it('will re-bind the change event on the id object when the change:context event is triggered on the behavior', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      var initialContextModel = new TorsoNestedModel();
      var contextContainer = new TorsoNestedModel();
      contextContainer.context = initialContextModel;
      initialContextModel.id = 'initialId';
      defaultBehaviorConfiguration.ids = {
        property: 'id',
        context: function() {
          return contextContainer.context;
        }
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.retrieve()
        .then(function() {
          expect(dataBehavior.toJSON()).toEqual([{ id: 'initialId', count: 0 }]);
          initialContextModel.id = 'newId';
          expect(dataBehavior.toJSON()).toEqual([{ id: 'initialId', count: 0 }]);
          dataBehavior.once('fetched', function() {
            expect(dataBehavior.toJSON()).toEqual([{ id: 'newId', count: 0 }]);

            var newContextModel = new TorsoNestedModel();
            newContextModel.id = 'anotherId';
            contextContainer.context = newContextModel;
            dataBehavior.trigger('change:context');

            dataBehavior.once('fetched', function() {
              expect(dataBehavior.toJSON()).toEqual([{ id: 'anotherId', count: 0 }]);

              newContextModel.id = 'yetAnotherId';
              newContextModel.trigger('change:id');
              dataBehavior.once('fetched', function() {
                expect(dataBehavior.toJSON()).toEqual([{ id: 'yetAnotherId', count: 0 }]);
                done();
              });
            });
          });
          initialContextModel.trigger('change:id');
        });
    });

    it('and depends on another behavior will re-fetch data when the ids on the root behavior change:\n\
ids = {\n\
  property: \'behaviors.dataBehavior.otherIds\'\n\
}\n\\n\
', function(done) {
      $.mockjax.clear(this.routes['/myModel/ids|post']);
      $.mockjax(MOCKJAX_ROUTE_WITH_OTHER_IDS);

      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.returnSingleResult = true;
      defaultBehaviorConfiguration.ids = {
        property: 'viewState.idFromView'
      };
      var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
      defaultBehavior2Configuration.ids = {
        property: 'behaviors.dataBehavior.otherIds'
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration,
          dataBehavior2: defaultBehavior2Configuration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
      });

      var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
      dataBehavior2.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
        expect(dataBehavior2.toJSON()).toEqual([{ id: 1, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
                                                { id: 2, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
                                                { id: 3, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] }]);
        done();
      });
      viewWithBehavior.set('idFromView', 10);
    });

    it('will handle a collection of models each with an array of ids:\n\
ids = {\n\
  property: \'behaviors.dataBehavior.otherIds\'\n\
}\n\
\n\
dataBehavior gets multiple objects with this structure: { id: 10, otherIds: [1, 2, 3] ... }.\n\
dataBehavior2 will pull the unique collection of ids collected from all of the otherIds in dataBehavior\'s objects.\n\
\n\
', function(done) {
      $.mockjax.clear(this.routes['/myModel/ids|post']);
      $.mockjax(MOCKJAX_ROUTE_WITH_OTHER_IDS);

      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'viewState.idFromView'
      };
      var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
      defaultBehavior2Configuration.ids = {
        property: 'behaviors.dataBehavior.otherIds'
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration,
          dataBehavior2: defaultBehavior2Configuration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual([{ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
                                               { id: 20, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
                                               { id: 30, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] }]);
      });

      var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
      dataBehavior2.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual([{ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
                                               { id: 20, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
                                               { id: 30, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] }]);
        expect(dataBehavior2.toJSON()).toEqual([{ id: 1, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
                                                { id: 2, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
                                                { id: 3, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] },
                                                { id: 4, count: 3, otherIds: [4, 5, 6], otherOtherIds: ['a3', 'b3', 'c3', 'd3', 'e3', 'f3'] },
                                                { id: 5, count: 4, otherIds: [5, 6, 7], otherOtherIds: ['a4', 'b4', 'c4', 'd4', 'e4', 'f4'] }]);
        done();
      });
      viewWithBehavior.set('idFromView', [10, 20, 30]);
    });

    it('will handle a chain of behaviors:\n\
defaultBehaviorConfiguration.returnSingleResult = true;\n\
defaultBehaviorConfiguration.ids = {\n\
  property: \'viewState.idFromView\'\n\
};\n\
\n\
var defaultBehavior2Configuration = getBasicBehaviorConfiguration();\n\
defaultBehavior2Configuration.ids = {\n\
  property: \'behaviors.dataBehavior.otherIds\'\n\
};\n\
\n\
var defaultBehavior3Configuration = getBasicBehaviorConfiguration();\n\
defaultBehavior3Configuration.ids = {\n\
  property: \'behaviors.dataBehavior2.otherOtherIds\'\n\
};\n\
\n\
var ViewWithBehavior = TorsoView.extend({\n\
  behaviors: {\n\
    dataBehavior: defaultBehaviorConfiguration,\n\
      dataBehavior2: defaultBehavior2Configuration,\n\
      dataBehavior3: defaultBehavior3Configuration\n\
  }\n\
});\n\
', function(done) {
      $.mockjax.clear(this.routes['/myModel/ids|post']);
      $.mockjax(MOCKJAX_ROUTE_WITH_OTHER_IDS);

      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.returnSingleResult = true;
      defaultBehaviorConfiguration.ids = {
        property: 'viewState.idFromView'
      };
      var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
      defaultBehavior2Configuration.ids = {
        property: 'behaviors.dataBehavior.otherIds'
      };
      var defaultBehavior3Configuration = getBasicBehaviorConfiguration();
      defaultBehavior3Configuration.ids = {
        property: 'behaviors.dataBehavior2.otherOtherIds'
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration,
          dataBehavior2: defaultBehavior2Configuration,
          dataBehavior3: defaultBehavior3Configuration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
      });

      var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
      dataBehavior2.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
        expect(dataBehavior2.toJSON()).toEqual([{ id: 1, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
                                                { id: 2, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
                                                { id: 3, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] }]);
      });

      var dataBehavior3 = viewWithBehavior.getBehavior('dataBehavior3');
      dataBehavior3.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
        expect(dataBehavior2.toJSON()).toEqual([{ id: 1, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
                                                { id: 2, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
                                                { id: 3, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] }]);
        expect(dataBehavior3.toJSON()).toEqual([{ id: 'a0', count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
                                                { id: 'b0', count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
                                                { id: 'c0', count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] },
                                                { id: 'd0', count: 3, otherIds: [4, 5, 6], otherOtherIds: ['a3', 'b3', 'c3', 'd3', 'e3', 'f3'] },
                                                { id: 'e0', count: 4, otherIds: [5, 6, 7], otherOtherIds: ['a4', 'b4', 'c4', 'd4', 'e4', 'f4'] },
                                                { id: 'f0', count: 5, otherIds: [6, 7, 8], otherOtherIds: ['a5', 'b5', 'c5', 'd5', 'e5', 'f5'] },
                                                { id: 'a1', count: 6, otherIds: [7, 8, 9], otherOtherIds: ['a6', 'b6', 'c6', 'd6', 'e6', 'f6'] },
                                                { id: 'b1', count: 7, otherIds: [8, 9, 10], otherOtherIds: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7'] },
                                                { id: 'c1', count: 8, otherIds: [9, 10, 11], otherOtherIds: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8'] },
                                                { id: 'd1', count: 9, otherIds: [10, 11, 12], otherOtherIds: ['a9', 'b9', 'c9', 'd9', 'e9', 'f9'] },
                                                { id: 'e1', count: 10, otherIds: [11, 12, 13], otherOtherIds: ['a10', 'b10', 'c10', 'd10', 'e10', 'f10'] },
                                                { id: 'f1', count: 11, otherIds: [12, 13, 14], otherOtherIds: ['a11', 'b11', 'c11', 'd11', 'e11', 'f11'] },
                                                { id: 'a2', count: 12, otherIds: [13, 14, 15], otherOtherIds: ['a12', 'b12', 'c12', 'd12', 'e12', 'f12'] },
                                                { id: 'b2', count: 13, otherIds: [14, 15, 16], otherOtherIds: ['a13', 'b13', 'c13', 'd13', 'e13', 'f13'] },
                                                { id: 'c2', count: 14, otherIds: [15, 16, 17], otherOtherIds: ['a14', 'b14', 'c14', 'd14', 'e14', 'f14'] },
                                                { id: 'd2', count: 15, otherIds: [16, 17, 18], otherOtherIds: ['a15', 'b15', 'c15', 'd15', 'e15', 'f15'] },
                                                { id: 'e2', count: 16, otherIds: [17, 18, 19], otherOtherIds: ['a16', 'b16', 'c16', 'd16', 'e16', 'f16'] },
                                                { id: 'f2', count: 17, otherIds: [18, 19, 20], otherOtherIds: ['a17', 'b17', 'c17', 'd17', 'e17', 'f17'] }]);
        done();
      });
      viewWithBehavior.set('idFromView', 10);
    });

    it('will re-fetch when the id property on another data behavior changes to a non-empty value:\n\
ids = {\n\
  property: \'behaviors.dataBehavior.otherIds\'\n\
}\n\
\n\
Manually force a change in the one model\'s value:\n\
dataBehavior.privateCollection.models[0].set(\'otherIds\', [20, 30, 40]);\n\
\n\
', function(done) {
      $.mockjax.clear(this.routes['/myModel/ids|post']);
      $.mockjax(MOCKJAX_ROUTE_WITH_OTHER_IDS);

      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.returnSingleResult = true;
      defaultBehaviorConfiguration.ids = {
        property: 'viewState.idFromView'
      };
      var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
      defaultBehavior2Configuration.ids = {
        property: 'behaviors.dataBehavior.otherIds'
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration,
          dataBehavior2: defaultBehavior2Configuration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
      });

      var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
      dataBehavior2.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
        expect(dataBehavior2.toJSON()).toEqual([{ id: 1, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
          { id: 2, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
          { id: 3, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] }]);

        dataBehavior2.once('fetched', function() {
          expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [20, 30, 40], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
          expect(dataBehavior2.toJSON()).toEqual([{ id: 20, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
            { id: 30, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
            { id: 40, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] }]);
          done();
        });
        dataBehavior.privateCollection.models[0].set('otherIds', [20, 30, 40]);
      });
      viewWithBehavior.set('idFromView', 10);
    });

    it('will re-fetch when the id property on another data behavior changes to an empty value:\n\
ids = {\n\
  property: \'behaviors.dataBehavior.otherIds\'\n\
}\n\
\n\
Manually force a change in the one model\'s value:\n\
dataBehavior.privateCollection.models[0].unset(\'otherIds\');\n\
\n\
', function(done) {
      $.mockjax.clear(this.routes['/myModel/ids|post']);
      $.mockjax(MOCKJAX_ROUTE_WITH_OTHER_IDS);

      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.returnSingleResult = true;
      defaultBehaviorConfiguration.ids = {
        property: 'viewState.idFromView'
      };
      var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
      defaultBehavior2Configuration.ids = {
        property: 'behaviors.dataBehavior.otherIds'
      };
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          dataBehavior: defaultBehaviorConfiguration,
          dataBehavior2: defaultBehavior2Configuration
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
      });

      var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
      dataBehavior2.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
        expect(dataBehavior2.toJSON()).toEqual([{ id: 1, count: 0, otherIds: [1, 2, 3], otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] },
          { id: 2, count: 1, otherIds: [2, 3, 4], otherOtherIds: ['a1', 'b1', 'c1', 'd1', 'e1', 'f1'] },
          { id: 3, count: 2, otherIds: [3, 4, 5], otherOtherIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2'] }]);

        dataBehavior2.once('fetched', function() {
          expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0, otherOtherIds: ['a0', 'b0', 'c0', 'd0', 'e0', 'f0'] });
          expect(dataBehavior2.toJSON()).toEqual([]);
          done();
        });
        dataBehavior.privateCollection.models[0].unset('otherIds');
      });
      viewWithBehavior.set('idFromView', 10);
    });
  });

  it('will re-fetch the id and data when an arbitrary event on the behavior is fired:\n\
ids = {\n\
  property: \'_idFromView\'\n\
}\n\
updateEvents = \'this:some:random:event\'\n\
\n\
dataBehavior.trigger(\'some:random:event\');\n\
\n\
', function(done) {
    var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
    defaultBehaviorConfiguration.returnSingleResult = true;
    defaultBehaviorConfiguration.ids = {
      property: '_idFromView'
    };
    defaultBehaviorConfiguration.updateEvents = 'this:some:random:event';
    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        dataBehavior: defaultBehaviorConfiguration
      }
    });
    var viewWithBehavior = new ViewWithBehavior();
    var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
    dataBehavior.once('fetched', function() {
      expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0 });

      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 100, count: 0 });
        done();
      });
      viewWithBehavior._idFromView = 100;
      dataBehavior.trigger('some:random:event');
    });

    viewWithBehavior._idFromView = 10;
    dataBehavior.trigger('some:random:event');
  });

  it('will re-fetch the id and data when an arbitrary event on the view is fired:\n\
ids = {\n\
  property: \'_idFromView\'\n\
}\n\
updateEvents = \'view:view-event\'\n\
\n\
viewWithBehavior.trigger(\'view-event\');\n\
\n\
', function(done) {
    var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
    defaultBehaviorConfiguration.returnSingleResult = true;
    defaultBehaviorConfiguration.ids = {
      property: '_idFromView'
    };
    defaultBehaviorConfiguration.updateEvents = 'view:view-event';
    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        dataBehavior: defaultBehaviorConfiguration
      }
    });
    var viewWithBehavior = new ViewWithBehavior();
    var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
    dataBehavior.once('fetched', function() {
      expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0 });

      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 100, count: 0 });
        done();
      });
      viewWithBehavior._idFromView = 100;
      viewWithBehavior.trigger('view-event');
    });

    viewWithBehavior._idFromView = 10;
    viewWithBehavior.trigger('view-event');
  });

  it('will re-fetch the id and data when an arbitrary event on the view\'s viewState is fired:\n\
ids = {\n\
  property: \'_idFromView\'\n\
}\n\
updateEvents = \'viewState:viewState-event\'\n\
\n\
viewWithBehavior.viewState.trigger(\'viewState-event\');\n\
\n\
', function(done) {
    var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
    defaultBehaviorConfiguration.returnSingleResult = true;
    defaultBehaviorConfiguration.ids = {
      property: '_idFromView'
    };
    defaultBehaviorConfiguration.updateEvents = 'viewState:viewState-event';
    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        dataBehavior: defaultBehaviorConfiguration
      }
    });
    var viewWithBehavior = new ViewWithBehavior();
    var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
    dataBehavior.once('fetched', function() {
      expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0 });

      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 100, count: 0 });
        done();
      });
      viewWithBehavior._idFromView = 100;
      viewWithBehavior.viewState.trigger('viewState-event');
    });

    viewWithBehavior._idFromView = 10;
    viewWithBehavior.viewState.trigger('viewState-event');
  });

  it('will re-fetch the id and data when an arbitrary event on the view\'s model is fired:\n\
ids = {\n\
  property: \'_idFromView\'\n\
}\n\
updateEvents = \'model:model-event\'\n\
\n\
viewWithBehavior.model.trigger(\'model-event\');\n\
\n\
', function(done) {
    var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
    defaultBehaviorConfiguration.returnSingleResult = true;
    defaultBehaviorConfiguration.ids = {
      property: '_idFromView'
    };
    defaultBehaviorConfiguration.updateEvents = 'model:model-event';
    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        dataBehavior: defaultBehaviorConfiguration
      }
    });
    var viewModel = new TorsoNestedModel({ anIdProperty: false});
    var viewWithBehavior = new ViewWithBehavior({
      model: viewModel
    });
    var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
    dataBehavior.once('fetched', function() {
      expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0 });

      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 100, count: 0 });
        done();
      });
      viewWithBehavior._idFromView = 100;
      viewWithBehavior.model.trigger('model-event');
    });

    viewWithBehavior._idFromView = 10;
    viewWithBehavior.model.trigger('model-event');
  });

  it('will re-fetch the id and data when an arbitrary event on another behavior defined on this view is fired:\n\
ids = {\n\
  property: \'_idFromView\'\n\
}\n\
updateEvents = \'dataBehavior2:otherBehavior-event\'\n\
\n\
dataBehavior2.trigger(\'otherBehavior-event\');\n\
\n\
', function(done) {
    var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
    defaultBehaviorConfiguration.returnSingleResult = true;
    defaultBehaviorConfiguration.ids = {
      property: '_idFromView'
    };
    defaultBehaviorConfiguration.updateEvents = 'dataBehavior2:otherBehavior-event';
    var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        dataBehavior: defaultBehaviorConfiguration,
        dataBehavior2: defaultBehavior2Configuration
      }
    });
    var viewWithBehavior = new ViewWithBehavior();
    var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
    var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
    dataBehavior.once('fetched', function() {
      expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0 });

      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 100, count: 0 });
        done();
      });
      viewWithBehavior._idFromView = 100;
      dataBehavior2.trigger('otherBehavior-event');
    });

    viewWithBehavior._idFromView = 10;
    dataBehavior2.trigger('otherBehavior-event');
  });

  it('will re-fetch the id and data when an arbitrary event on an arbitrary context is fired:\n\
ids = {\n\
  property: \'_idFromView\'\n\
}\n\
updateEvents = { arbitraryContextEvent: context }\n\
\n\
context.trigger(\'arbitraryContextEvent\');\n\
\n\
', function(done) {
    var context = new TorsoNestedModel();
    var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
    defaultBehaviorConfiguration.returnSingleResult = true;
    defaultBehaviorConfiguration.ids = {
      property: '_idFromView'
    };
    defaultBehaviorConfiguration.updateEvents = { arbitraryContextEvent: context };
    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        dataBehavior: defaultBehaviorConfiguration
      }
    });
    var viewWithBehavior = new ViewWithBehavior();
    var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
    dataBehavior.once('fetched', function() {
      expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0 });

      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 100, count: 0 });
        done();
      });
      viewWithBehavior._idFromView = 100;
      context.trigger('arbitraryContextEvent');
    });

    viewWithBehavior._idFromView = 10;
    context.trigger('arbitraryContextEvent');
  });

  it('will re-fetch the id and data when a arbitrary events on an arbitrary contexts are fired:\n\
ids = {\n\
  property: \'_idFromView\'\n\
}\n\
updateEvents = {\n\
  arbitraryContextEvent: context1,\n\
    \'other-arbitrary-context-event\': context2\n\
}\n\
\n\
context1.trigger(\'arbitraryContextEvent\');\n\
context2.trigger(\'other-arbitrary-context-event\');\n\
\n\
', function(done) {
    var context1 = new TorsoNestedModel();
    var context2 = new TorsoNestedModel();
    var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
    defaultBehaviorConfiguration.returnSingleResult = true;
    defaultBehaviorConfiguration.ids = {
      property: '_idFromView'
    };
    defaultBehaviorConfiguration.updateEvents = {
      arbitraryContextEvent: context1,
      'other-arbitrary-context-event': context2
    };
    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        dataBehavior: defaultBehaviorConfiguration
      }
    });
    var viewWithBehavior = new ViewWithBehavior();
    var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
    dataBehavior.once('fetched', function() {
      expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0 });

      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 100, count: 0 });
        done();
      });
      viewWithBehavior._idFromView = 100;
      context2.trigger('other-arbitrary-context-event');
    });

    viewWithBehavior._idFromView = 10;
    context1.trigger('arbitraryContextEvent');
  });

  it('will re-fetch the id and data when multiple events are fired:\n\
ids = {\n\
  property: \'_idFromView\'\n\
}\n\
updateEvents = [\n\
  \'this:this-event\',\n\
  \'view:view-event\',\n\
  \'viewState:viewState-event\',\n\
  \'model:model-event\',\n\
  \'dataBehavior2:otherBehavior-event\',\n\
  {\n\
    arbitraryContextEvent: context1,\n\
    \'other-arbitrary-context-event\': context2\n\
  }\n\
];\n\
\n\
context1.trigger(\'arbitraryContextEvent\');\n\
context2.trigger(\'other-arbitrary-context-event\');\n\
dataBehavior2.trigger(\'otherBehavior-event\');\n\
viewWithBehavior.model.trigger(\'model-event\');\n\
viewWithBehavior.viewState.trigger(\'viewState-event\');\n\
viewWithBehavior.trigger(\'view-event\');\n\
dataBehavior.trigger(\'this-event\');\n\
\n\
', function(done) {
    var context1 = new TorsoNestedModel();
    var context2 = new TorsoNestedModel();
    var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
    defaultBehaviorConfiguration.returnSingleResult = true;
    defaultBehaviorConfiguration.ids = {
      property: '_idFromView'
    };
    defaultBehaviorConfiguration.updateEvents = [
      'this:this-event',
      'view:view-event',
      'viewState:viewState-event',
      'model:model-event',
      'dataBehavior2:otherBehavior-event',
      {
        arbitraryContextEvent: context1,
        'other-arbitrary-context-event': context2
      }
    ];
    var defaultBehavior2Configuration = getBasicBehaviorConfiguration();
    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        dataBehavior: defaultBehaviorConfiguration,
        dataBehavior2: defaultBehavior2Configuration
      }
    });
    var viewModel = new TorsoNestedModel({ anIdProperty: false});
    var viewWithBehavior = new ViewWithBehavior({
      model: viewModel
    });
    var dataBehavior = viewWithBehavior.getBehavior('dataBehavior');
    var dataBehavior2 = viewWithBehavior.getBehavior('dataBehavior2');
    dataBehavior.once('fetched', function() {
      expect(dataBehavior.toJSON()).toEqual({ id: 10, count: 0 });

      dataBehavior.once('fetched', function() {
        expect(dataBehavior.toJSON()).toEqual({ id: 100, count: 0 });

        dataBehavior.once('fetched', function() {
          expect(dataBehavior.toJSON()).toEqual({ id: 1000, count: 0 });

          dataBehavior.once('fetched', function() {
            expect(dataBehavior.toJSON()).toEqual({ id: 10000, count: 0 });

            dataBehavior.once('fetched', function() {
              expect(dataBehavior.toJSON()).toEqual({ id: 100000, count: 0 });

              dataBehavior.once('fetched', function() {
                expect(dataBehavior.toJSON()).toEqual({ id: 1000000, count: 0 });

                dataBehavior.once('fetched', function() {
                  expect(dataBehavior.toJSON()).toEqual({ id: 10000000, count: 0 });
                  done();
                });
                viewWithBehavior._idFromView = 10000000;
                dataBehavior.trigger('this-event');
              });
              viewWithBehavior._idFromView = 1000000;
              viewWithBehavior.trigger('view-event');
            });
            viewWithBehavior._idFromView = 100000;
            viewWithBehavior.viewState.trigger('viewState-event');
          });
          viewWithBehavior._idFromView = 10000;
          viewWithBehavior.model.trigger('model-event');
        });
        viewWithBehavior._idFromView = 1000;
        dataBehavior2.trigger('otherBehavior-event');
      });
      viewWithBehavior._idFromView = 100;
      context2.trigger('other-arbitrary-context-event');
    });

    viewWithBehavior._idFromView = 10;
    context1.trigger('arbitraryContextEvent');
  });
});