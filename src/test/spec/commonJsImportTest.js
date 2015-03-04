var torsoPath = '/torso',

    backboneRelativePath = '/backbone'
    torsoEventsPath = backboneRelativePath + '/torsoEvents',

    collectionsRelativePath = backboneRelativePath + '/collections',
    torsoCollectionPath = collectionsRelativePath + '/TorsoCollection',

    mixinsRelativePath = backboneRelativePath + '/mixins',
    torsoCollectionLoadingMixinPath = mixinsRelativePath + '/torsoCollectionLoadingMixin',
    torsoCollectionRegistrationMixinPath = mixinsRelativePath + '/torsoCollectionRegistrationMixin',
    torsoPollingMixinPath = mixinsRelativePath + '/torsoPollingMixin',
    torsoValidationPath = mixinsRelativePath + '/torsoValidation',
    torsoViewHierarchyMixinPath = mixinsRelativePath + '/torsoViewHierarchyMixin',

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
    torsoGuidManagerPath = utilsRelativePath + '/torsoGuidManager',
    torsoHandlebarsUtilsPath = utilsRelativePath + '/torsoHandlebarsUtils',
    torsoStickitUtilsPath = utilsRelativePath + '/torsoStickitUtils',
    torsoTemplateRendererPath = utilsRelativePath + '/torsoTemplateRenderer',

    _ = require('underscore');


commonJsImportTest = function(moduleToImport, expectedModules) {
  expectedModules.push(moduleToImport);
  describe('CommonJS Module import of "' + moduleToImport + '"', function() {
    var windowRequire, module, actualModule, moduleIndex;

    beforeAll(function(done) {
      require('./clientCommonJsEnv')(moduleToImport).done(function(window) {
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
        // requireify (what brings in the require method on the window object) also generates a 'fake' dependency for the original file, this can be ignored
        if (existingModule.indexOf('fake') < 0 ) {
          if (existingModule !== moduleToImport) {
            allDependencies.push(existingModule);
          }
          if (!_.contains(expectedModules, existingModule)) {
            failed = true;
            fail(existingModule + ' is not an expected dependency: ' + expectedModules);
          }
        }
      }
      if (failed) {
        fail('Expected Modules For "' + moduleToImport + '" are [\'' + allDependencies.join('\', \'') + '\'].');
      }
    });
  });
};

commonJsImportTest(torsoEventsPath, ['underscore', 'backbone']);

commonJsImportTest(torsoCollectionPath, ['underscore', 'backbone', 'jquery',
                                         torsoPollingMixinPath, torsoCollectionRegistrationMixinPath, torsoCollectionLoadingMixinPath]);

commonJsImportTest(torsoCollectionLoadingMixinPath, ['jquery']);
commonJsImportTest(torsoCollectionRegistrationMixinPath, ['underscore', 'jquery']);
commonJsImportTest(torsoPollingMixinPath, ['jquery']);
commonJsImportTest(torsoValidationPath, ['underscore', 'backbone-nested', 'backbone', 'jquery',
                                         torsoPollingMixinPath, torsoNestedModelPath]);
commonJsImportTest(torsoViewHierarchyMixinPath, ['underscore', 'jquery', torsoGuidManagerPath, torsoTemplateRendererPath]);

commonJsImportTest(torsoModelPath, ['underscore', 'backbone', 'jquery', torsoPollingMixinPath]);
commonJsImportTest(torsoNestedModelPath, ['backbone-nested', 'underscore', 'backbone', 'jquery', torsoPollingMixinPath]);
commonJsImportTest(torsoFormModelPath, ['underscore', 'jquery', 'backbone-nested', 'backbone',
                                        torsoPollingMixinPath, torsoNestedModelPath, torsoValidationPath]);

commonJsImportTest(torsoServicePath, ['backbone']);

commonJsImportTest(torsoViewPath, ['underscore', 'backbone', 'jquery',
                                   torsoGuidManagerPath, torsoTemplateRendererPath, torsoViewHierarchyMixinPath]);
commonJsImportTest(torsoFormViewPath, ['underscore', 'jquery', 'backbone', 'backbone-nested',
                                       torsoGuidManagerPath, torsoTemplateRendererPath, torsoViewHierarchyMixinPath, torsoViewPath,
                                       torsoPollingMixinPath, torsoNestedModelPath, torsoValidationPath, torsoFormModelPath]);
commonJsImportTest(torsoListViewPath, ['underscore', 'jquery', 'backbone',
                                       torsoGuidManagerPath, torsoTemplateRendererPath, torsoViewHierarchyMixinPath, torsoViewPath]);

commonJsImportTest(torsoGuidManagerPath, []);
commonJsImportTest(torsoHandlebarsUtilsPath, ['handlebars']);
commonJsImportTest(torsoStickitUtilsPath, ['backbone', 'backbone.stickit']);
commonJsImportTest(torsoTemplateRendererPath, ['underscore', 'jquery']);

commonJsImportTest(torsoPath, ['handlebars', 'backbone', 'backbone-nested', 'backbone.stickit', 'underscore', 'jquery',
                               torsoHandlebarsUtilsPath, torsoStickitUtilsPath,
                               torsoPollingMixinPath, torsoCollectionRegistrationMixinPath, torsoCollectionLoadingMixinPath, torsoValidationPath, torsoViewHierarchyMixinPath,
                               torsoCollectionPath,
                               torsoEventsPath,
                               torsoNestedModelPath, torsoModelPath, torsoFormModelPath, torsoServicePath,
                               torsoViewPath, torsoListViewPath, torsoFormViewPath,
                               torsoGuidManagerPath, torsoTemplateRendererPath]);