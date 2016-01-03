var commonJsImportTest,
    _ = require('underscore');

commonJsImportTest = function(moduleToImport, expectedModules) {
  expectedModules.push(moduleToImport);
  describe('CommonJS Module import of "' + moduleToImport + '"', function() {
    var windowRequire, module, actualModule, moduleIndex;

    // Each module is browserified separately to validate requiring just that module.
    // This loads the browserified module and then tests that it includes all the dependencies that are required for that module.
    // e.g. to validate the Events module (which would be brought using require('/modules/Events')) this would load the browserified
    //   file from testSandbox/browserified/modules/Events.js and create a jsdom environment and expose the require method
    //   from the window which is then used to verify that all of the dependencies (and only those dependencies) are included.
    beforeAll(function(done) {
      require('./importEnv')('browserified' + moduleToImport).done(function(window) {
        windowRequire = window.require;
        done();
      });
    })

    for (moduleIndex = 0; moduleIndex < expectedModules.length; moduleIndex++) {
      module = expectedModules[moduleIndex];
      it('has the expected "' + module  + '" dependency.', function() {
        expect(windowRequire(this)).toBeDefined();
      }.bind(module));
    }

    it('does not implement any extra dependencies.', function() {
      var existingModule, dependenciesIndex, failed = false, allDependencies = [];
      for (existingModule in windowRequire) {
        if (existingModule !== moduleToImport) {
          allDependencies.push(existingModule);
        }
        if (!_.contains(expectedModules, existingModule)) {
          failed = true;
          fail(existingModule + ' is not an expected dependency: ' + expectedModules);
        }
      }
      if (failed) {
        fail('Expected Modules For "' + moduleToImport + '" are [\'' + allDependencies.join('\', \'') + '\'].');
      }
    });
  });
};

commonJsImportTest('/modules/Events', ['underscore', 'backbone']);

commonJsImportTest('/modules/Cell', ['underscore', 'backbone', '/modules/cellPersistenceRemovalMixin']);
commonJsImportTest('/modules/Collection', ['underscore', 'backbone', 'jquery',
                                         '/modules/pollingMixin', '/modules/collectionRegistrationMixin', '/modules/collectionLoadingMixin']);

commonJsImportTest('/modules/collectionLoadingMixin', ['jquery']);
commonJsImportTest('/modules/collectionRegistrationMixin', ['underscore', 'jquery']);
commonJsImportTest('/modules/pollingMixin', []);
commonJsImportTest('/modules/validation', ['underscore', 'backbone-nested', 'backbone',
                                         '/modules/pollingMixin', '/modules/NestedModel']);

commonJsImportTest('/modules/Model', ['underscore', 'backbone', '/modules/pollingMixin']);
commonJsImportTest('/modules/NestedCell', ['underscore', 'backbone', '/modules/cellPersistenceRemovalMixin', 'backbone-nested']);
commonJsImportTest('/modules/NestedModel', ['backbone-nested', 'underscore', 'backbone', '/modules/pollingMixin']);
commonJsImportTest('/modules/FormModel', ['underscore', 'jquery', 'backbone-nested', 'backbone',
                                        '/modules/pollingMixin', '/modules/NestedModel', '/modules/validation']);

commonJsImportTest('/modules/ServiceCell', ['underscore', 'backbone', '/modules/cellPersistenceRemovalMixin', '/modules/Cell']);
commonJsImportTest('/modules/Router', ['backbone']);
commonJsImportTest('/modules/history', ['backbone']);
commonJsImportTest('/modules/View', ['underscore', 'backbone', 'jquery', 'backbone-nested', '/modules/Cell', '/modules/NestedCell', '/modules/cellPersistenceRemovalMixin',
                                   '/modules/templateRenderer']);
commonJsImportTest('/modules/FormView', ['underscore', 'jquery', 'backbone', 'backbone-nested', '/modules/Cell', '/modules/NestedCell', '/modules/cellPersistenceRemovalMixin',
                                       '/modules/templateRenderer', '/modules/View',
                                       '/modules/pollingMixin', '/modules/NestedModel', '/modules/validation', '/modules/FormModel', 'backbone.stickit']);
commonJsImportTest('/modules/ListView', ['underscore', 'jquery', 'backbone', 'backbone-nested', '/modules/Cell', '/modules/NestedCell', '/modules/cellPersistenceRemovalMixin',
                                       '/modules/templateRenderer', '/modules/View']);

commonJsImportTest('/modules/handlebarsUtils', []);
commonJsImportTest('/modules/stickitUtils', ['backbone', 'backbone.stickit']);
commonJsImportTest('/modules/templateRenderer', ['underscore', 'jquery']);
commonJsImportTest('/modules/configure', ['backbone', 'jquery']);

commonJsImportTest('/modules/torso', ['backbone', 'backbone-nested', 'backbone.stickit', 'underscore', 'jquery',
                               '/modules/stickitUtils',
                               '/modules/pollingMixin', '/modules/collectionRegistrationMixin', '/modules/collectionLoadingMixin', '/modules/cellPersistenceRemovalMixin', '/modules/validation',
                               '/modules/Cell',
                               '/modules/Collection',
                               '/modules/Events',
                               '/modules/Router',
                               '/modules/history',
                               '/modules/NestedCell', '/modules/NestedModel', '/modules/Model', '/modules/FormModel', '/modules/ServiceCell',
                               '/modules/View', '/modules/ListView', '/modules/FormView',
                               '/modules/templateRenderer', '/modules/handlebarsUtils', '/modules/configure']);
