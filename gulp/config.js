(function() {
  'use strict';

  var dest = "./dist",
      src = './src',
      srcTest = src + '/test',
      config = {
        root: __dirname.replace('/gulp', ''),
        app: src + '/main/javascript',
        test: srcTest + '/spec',
        testSrc: srcTest + '/source',
        testEnv: dest + '/test',
        dist: dest + '/src',
        uglify: dest + '/uglify',
        docs: dest + '/jsdocs',
        dest: dest,

        importPaths: {
          torsoPath: '/torso',
          backboneRelativePath: '/backbone',
          utilsRelativePath: '/utils'
        }
      };

  config.importPaths.torsoEventsPath = config.importPaths.backboneRelativePath + '/torsoEvents';

  config.importPaths.collectionsRelativePath = config.importPaths.backboneRelativePath + '/collections';
  config.importPaths.torsoCollectionPath = config.importPaths.collectionsRelativePath + '/TorsoCollection';

  config.importPaths.mixinsRelativePath = config.importPaths.backboneRelativePath + '/mixins';
  config.importPaths.torsoCollectionLoadingMixinPath = config.importPaths.mixinsRelativePath + '/torsoCollectionLoadingMixin';
  config.importPaths.torsoCollectionRegistrationMixinPath = config.importPaths.mixinsRelativePath + '/torsoCollectionRegistrationMixin';
  config.importPaths.torsoPollingMixinPath = config.importPaths.mixinsRelativePath + '/torsoPollingMixin';
  config.importPaths.torsoValidationPath = config.importPaths.mixinsRelativePath + '/torsoValidation';
  config.importPaths.torsoViewHierarchyMixinPath = config.importPaths.mixinsRelativePath + '/torsoViewHierarchyMixin';

  config.importPaths.modelsRelativePath = config.importPaths.backboneRelativePath + '/models';

  config.importPaths.torsoModelPath = config.importPaths.modelsRelativePath + '/TorsoModel';
  config.importPaths.torsoFormModelPath = config.importPaths.modelsRelativePath + '/TorsoFormModel';
  config.importPaths.torsoNestedModelPath = config.importPaths.modelsRelativePath + '/TorsoNestedModel';

  config.importPaths.servicesRelativePath = config.importPaths.backboneRelativePath + '/services';
  config.importPaths.torsoServicePath = config.importPaths.servicesRelativePath + '/TorsoService';

  config.importPaths.viewsRelativePath = config.importPaths.backboneRelativePath + '/views';
  config.importPaths.torsoViewPath = config.importPaths.viewsRelativePath + '/TorsoView';
  config.importPaths.torsoFormViewPath = config.importPaths.viewsRelativePath + '/TorsoFormView';
  config.importPaths.torsoListViewPath = config.importPaths.viewsRelativePath + '/TorsoListView';

  config.importPaths.torsoGuidManagerPath = config.importPaths.utilsRelativePath + '/torsoGuidManager';
  config.importPaths.torsoHandlebarsUtilsPath = config.importPaths.utilsRelativePath + '/torsoHandlebarsUtils';
  config.importPaths.torsoStickitUtilsPath = config.importPaths.utilsRelativePath + '/torsoStickitUtils';
  config.importPaths.torsoTemplateRendererPath = config.importPaths.utilsRelativePath + '/torsoTemplateRenderer';

  module.exports = config;
})();
