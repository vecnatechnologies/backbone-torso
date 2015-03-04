(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./backbone/collections/TorsoCollection',
            './backbone/torsoEvents',
            './backbone/mixins/torsoCollectionLoadingMixin', './backbone/mixins/torsoCollectionRegistrationMixin',
            './backbone/mixins/torsoPollingMixin',
            './backbone/mixins/torsoValidation',
            './backbone/mixins/torsoViewHierarchyMixin',
            './backbone/models/TorsoModel', './backbone/models/TorsoNestedModel', './backbone/models/TorsoFormModel',
            './backbone/services/TorsoService',
            './backbone/views/TorsoView', './backbone/views/TorsoListView', './backbone/views/TorsoFormView',
            './utils/torsoGuidManager', './utils/torsoTemplateRenderer',
            './utils/torsoHandlebarsUtils', './utils/torsoStickitUtils'],
           factory);
  } else if (typeof exports === 'object') {
    require('./utils/torsoHandlebarsUtils');
    require('./utils/torsoStickitUtils');
    module.exports = factory(require('./backbone/collections/TorsoCollection'),
                             require('./backbone/torsoEvents'),
                             require('./backbone/mixins/torsoCollectionLoadingMixin'), require('./backbone/mixins/torsoCollectionRegistrationMixin'),
                             require('./backbone/mixins/torsoPollingMixin'),
                             require('./backbone/mixins/torsoValidation'),
                             require('./backbone/mixins/torsoViewHierarchyMixin'),
                             require('./backbone/models/TorsoModel'), require('./backbone/models/TorsoNestedModel'), require('./backbone/models/TorsoFormModel'),
                             require('./backbone/services/TorsoService'),
                             require('./backbone/views/TorsoView'), require('./backbone/views/TorsoListView'), require('./backbone/views/TorsoFormView'),
                             require('./utils/torsoGuidManager'), require('./utils/torsoTemplateRenderer'));
  } else {
    root.Torso = root.Torso || {};
  };
}(this, function(TorsoCollection,
                 torsoEvents,
                 torsoCollectionLoadingMixin, torsoCollectionRegistrationMixin,
                 torsoPollingMixin,
                 torsoValidation,
                 torsoViewHierarchyMixin,
                 TorsoModel, TorsoNestedModel, TorsoFormModel,
                 TorsoService,
                 TorsoView, TorsoListView, TorsoFormView,
                 torsoGuidManager, torsoTemplateRenderer) {

  /**
   * File containing all dependencies that exports a single object with everything attached (same format as the global).
   *
   * @module    Torso
   * @class     Torso
   * @static
   * @author    ariel.wexler@vecna.com
   */
  return {
    Collections: {
      Collection: TorsoCollection
    },
    events: torsoEvents,
    Mixins: {
      collectionLoading: torsoCollectionLoadingMixin,
      collectionRegistration: torsoCollectionRegistrationMixin,
      polling: torsoPollingMixin,
      validation: torsoValidation.mixin,
      viewHierarchy: torsoViewHierarchyMixin
    },
    Models: {
      Model: TorsoModel,
      Nested: TorsoNestedModel,
      Form: TorsoFormModel
    },
    Services: {
      Service: TorsoService
    },
    Utils: {
      guidManager: torsoGuidManager,
      templateRenderer: torsoTemplateRenderer
    },
    Validation: torsoValidation,
    Views: {
      View: TorsoView,
      List: TorsoListView,
      Form: TorsoFormView
    }
  };
}));
