var _ = require('underscore');
var TorsoDataBehavior = require('./../../modules/behaviors/DataBehavior');
var TorsoView = require('./../../modules/View');
var TorsoCollection = require('./../../modules/Collection');
var TorsoNestedModel = require('./../../modules/NestedModel');
var TorsoEvents = require('./../../modules/Events');
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

    it('can specify an object for ids that uses the property field to reference an attribute on another behavior:\n\
ids = {\n\
  property: \'behaviors.dataBehavior2.someOtherIds\'\n\
}\n\
', function(done) {
      var defaultBehaviorConfiguration = getBasicBehaviorConfiguration();
      defaultBehaviorConfiguration.ids = {
        property: 'behaviors.dataBehavior2.someOtherIds'
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
      dataBehavior2.set('someOtherIds', [100, 'abd', 252341, 'blah']);
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
      var contextModel = TorsoEvents; // simplest object that triggers events.
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
      var initialContextModel = TorsoEvents;
      var contextContainer = TorsoEvents;
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

            var newContextModel = TorsoEvents;
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
      var initialContextModel = TorsoEvents;
      var contextContainer = TorsoEvents;
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

            var newContextModel = TorsoEvents;
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
  });
});