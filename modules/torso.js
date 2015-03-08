(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./Collection',
            './events',
            './collectionLoadingMixin', './collectionRegistrationMixin',
            './pollingMixin',
            './validation',
            './viewHierarchyMixin',
            './Model', './NestedModel', './FormModel',
            './Service',
            './View', './ListView', './FormView',
            './guidManager', './templateRenderer',
            './handlebarsUtils', './stickitUtils'],
           factory);
  } else if (typeof exports === 'object') {
    require('./handlebarsUtils');
    require('./stickitUtils');
    module.exports = factory(require('./Collection'),
                             require('./events'),
                             require('./collectionLoadingMixin'), require('./collectionRegistrationMixin'),
                             require('./pollingMixin'),
                             require('./validation'),
                             require('./viewHierarchyMixin'),
                             require('./Model'), require('./NestedModel'), require('./FormModel'),
                             require('./Service'),
                             require('./View'), require('./ListView'), require('./FormView'),
                             require('./guidManager'), require('./templateRenderer'));
  } else {
    root.Torso = root.Torso || {};
  }
}(this, function(Collection,
                 events,
                 collectionLoadingMixin, collectionRegistrationMixin,
                 pollingMixin,
                 validation,
                 viewHierarchyMixin,
                 Model, NestedModel, FormModel,
                 Service,
                 View, ListView, FormView,
                 guidManager, templateRenderer) {

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
      Collection: Collection
    },
    events: events,
    Mixins: {
      collectionLoading: collectionLoadingMixin,
      collectionRegistration: collectionRegistrationMixin,
      polling: pollingMixin,
      validation: validation.mixin,
      viewHierarchy: viewHierarchyMixin
    },
    Models: {
      Model: Model,
      Nested: NestedModel,
      Form: FormModel
    },
    Services: {
      Service: Service
    },
    Utils: {
      guidManager: guidManager,
      templateRenderer: templateRenderer
    },
    Validation: validation,
    Views: {
      View: View,
      List: ListView,
      Form: FormView
    }
  };
}));
