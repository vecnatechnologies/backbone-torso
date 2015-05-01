(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./Cell',
            './Collection',
            './events',
            './collectionLoadingMixin', './collectionRegistrationMixin', './cellPersistenceRemovalMixin',
            './pollingMixin',
            './validation',
            './Model', './NestedCell', './NestedModel', './FormModel',
            './ServiceCell',
            './Router',
            './View', './ListView', './FormView',
            './guidManager', './templateRenderer',
            './handlebarsUtils', './stickitUtils'],
           factory);
  } else if (typeof exports === 'object') {
    require('./handlebarsUtils');
    require('./stickitUtils');
    module.exports = factory(require('./Cell'),
                             require('./Collection'),
                             require('./events'),
                             require('./collectionLoadingMixin'), require('./collectionRegistrationMixin'), require('./cellPersistenceRemovalMixin'),
                             require('./pollingMixin'),
                             require('./validation'),
                             require('./Model'), require('./NestedCell'), require('./NestedModel'), require('./FormModel'),
                             require('./ServiceCell'),
                             require('./Router'),
                             require('./View'), require('./ListView'), require('./FormView'),
                             require('./guidManager'), require('./templateRenderer'));
  } else {
    root.Torso = root.Torso || {};
  }
}(this, function(Cell,
                 Collection,
                 events,
                 collectionLoadingMixin, collectionRegistrationMixin, cellPersistenceRemovalMixin,
                 pollingMixin,
                 validation,
                 Model, NestedCell, NestedModel, FormModel,
                 ServiceCell,
                 Router,
                 View, ListView, FormView,
                 guidManager, templateRenderer) {

  /**
   * File containing all dependencies that exports a single object with everything attached (same format as the global).
   *
   * @module    Torso
   * @class     Torso
   * @static
   * @author    jyoung@vecna.com
   */
  return {
    Cell: Cell,
    Collection: Collection,
    events: events,
    Mixins: {
      collectionLoading: collectionLoadingMixin,
      collectionRegistration: collectionRegistrationMixin,
      polling: pollingMixin,
      validation: validation.mixin,
      cellPersistenceRemoval: cellPersistenceRemovalMixin
    },
    Model: Model,
    NestedCell: NestedCell,
    NestedModel: NestedModel,
    FormModel: FormModel,
    ServiceCell: ServiceCell,
    Router: Router,
    Utils: {
      guidManager: guidManager,
      templateRenderer: templateRenderer
    },
    validation: validation,
    View: View,
    ListView: ListView,
    FormView: FormView
  };
}));
