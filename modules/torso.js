(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./Cell',
            './Collection',
            './Events',
            './collectionLoadingMixin', './collectionRegistrationMixin', './cellPersistenceRemovalMixin',
            './pollingMixin',
            './validation',
            './Model', './NestedCell', './NestedModel', './FormModel',
            './ServiceCell', './EventTracker',
            './Router',
            './history',
            './View', './ListView', './FormView',
            './templateRenderer',
            './handlebarsUtils',
            './configure',
            './stickitUtils'],
           factory);
  } else if (typeof exports === 'object') {
    require('./stickitUtils');
    require('./configure')
    module.exports = factory(require('./Cell'),
                             require('./Collection'),
                             require('./Events'),
                             require('./collectionLoadingMixin'), require('./collectionRegistrationMixin'), require('./cellPersistenceRemovalMixin'),
                             require('./pollingMixin'),
                             require('./validation'),
                             require('./Model'), require('./NestedCell'), require('./NestedModel'), require('./FormModel'),
                             require('./ServiceCell'), require('./EventTracker'),
                             require('./Router'),
                             require('./history'),
                             require('./View'), require('./ListView'), require('./FormView'),
                             require('./templateRenderer'), require('./handlebarsUtils'));
  } else {
    root.Torso = root.Torso || {};
  }
}(this, function(Cell,
                 Collection,
                 Events,
                 collectionLoadingMixin, collectionRegistrationMixin, cellPersistenceRemovalMixin,
                 pollingMixin,
                 validation,
                 Model, NestedCell, NestedModel, FormModel,
                 ServiceCell, EventTracker,
                 Router,
                 history,
                 View, ListView, FormView,
                 templateRenderer,
                 handlebarsUtils) {

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
    Events: Events,
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
    EventTracker: EventTracker,
    Router: Router,
    history: history,
    Utils: {
      templateRenderer: templateRenderer,
      handlebarsUtils: handlebarsUtils
    },
    validation: validation,
    View: View,
    ListView: ListView,
    FormView: FormView
  };
}));
