(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./Cell',
            './Collection',
            './Events',
            './mixins/loadingMixin', './mixins/cacheMixin', './mixins/cellMixin', './mixins/pollingMixin',
            './validation',
            './Model', './NestedCell', './NestedModel', './FormModel',
            './ServiceCell',
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
                             require('./mixins/loadingMixin'), require('./mixins/cacheMixin'), require('./mixins/cellMixin'), require('./mixins/pollingMixin'),
                             require('./validation'),
                             require('./Model'), require('./NestedCell'), require('./NestedModel'), require('./FormModel'),
                             require('./ServiceCell'),
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
                 loadingMixin, cacheMixin, cellMixin, pollingMixin,
                 validation,
                 Model, NestedCell, NestedModel, FormModel,
                 ServiceCell,
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
      loading: loadingMixin,
      cache: cacheMixin,
      polling: pollingMixin,
      validation: validation.mixin,
      cell: cellMixin
    },
    Model: Model,
    NestedCell: NestedCell,
    NestedModel: NestedModel,
    FormModel: FormModel,
    ServiceCell: ServiceCell,
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
