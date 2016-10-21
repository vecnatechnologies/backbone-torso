(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./behaviors/DataSourceBehavior',
            './Behavior',
            './Cell',
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
    require('./configure');
    module.exports = factory(require('./behaviors/DataSourceBehavior'),
                             require('./Behavior'),
                             require('./Cell'),
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
}(this, function(DataSourceBehavior,
                 Behavior,
                 Cell,
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
    behaviors: {
      DataSourceBehavior: DataSourceBehavior
    },
    Behavior: Behavior,
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
