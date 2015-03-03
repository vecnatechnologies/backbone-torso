var distPath = '../../../dist/compressed',

    backboneRelativePath = '/backbone'
    collectionsRelativePath = backboneRelativePath + '/collections',

    torsoCollectionPath = collectionsRelativePath + '/TorsoCollection',

    mixinsRelativePath = backboneRelativePath + '/mixins',

    torsoValidationPath = mixinsRelativePath + '/torsoValidation',

    modelsRelativePath = backboneRelativePath + '/models',

    torsoModelPath = modelsRelativePath + '/TorsoModel',
    torsoFormModelPath = modelsRelativePath + '/TorsoFormModel',
    torsoNestedModelPath = modelsRelativePath + '/TorsoNestedModel',

    servicesRelativePath = backboneRelativePath + '/services',

    torsoServicePath = servicesRelativePath + '/TorsoService',

    viewsRelativePath = backboneRelativePath + '/views',

    torsoViewPath = viewsRelativePath + '/TorsoView',
    torsoFormViewPath = viewsRelativePath + '/TorsoFormView',
    torsoListViewPath = viewsRelativePath + '/TorsoListView',

    utilsRelativePath = '/utils',


    _ = require('underscore');


commonJsImportTest = function(moduleToImport, expectedModules) {
  expectedModules.push(moduleToImport);
  describe('CommonJS Module import of "' + moduleToImport + '"', function() {
    var windowRequire, module, actualModule, moduleIndex;

    beforeAll(function(done) {
      require('./clientCommonJsEnv')(moduleToImport).done(function(environment) {
        windowRequire = environment.window.require;
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
      var existingModule;
      for (existingModule in windowRequire) {
        // requireify (what brings in the require method on the window object) also generates a 'fake' dependency for the original file, this can be ignored
        if (existingModule.indexOf('fake') < 0 && !_.contains(expectedModules, existingModule)) {
          fail(existingModule + ' is not an expected dependency: ' + expectedModules);
        }
      }
    });
  });
};

commonJsImportTest(torsoCollectionPath, ['backbone']);

commonJsImportTest(torsoValidationPath, ['underscore', 'backbone', 'backbone-nested', torsoNestedModelPath]);

commonJsImportTest(torsoModelPath, ['backbone']);
commonJsImportTest(torsoNestedModelPath, ['backbone', 'backbone-nested']);
commonJsImportTest(torsoFormModelPath, ['underscore', 'jquery', 'backbone', 'backbone-nested', torsoNestedModelPath, torsoValidationPath]);

commonJsImportTest(torsoServicePath, ['backbone']);

commonJsImportTest(torsoViewPath, ['backbone']);
commonJsImportTest(torsoFormViewPath, ['underscore', 'jquery', 'backbone', 'backbone-nested', torsoViewPath, torsoFormModelPath, torsoNestedModelPath, torsoValidationPath]);
commonJsImportTest(torsoListViewPath, ['underscore', 'jquery', 'backbone', torsoViewPath]);