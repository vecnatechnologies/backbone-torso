/**
 * The backbone View reference
 * @external Backbone
 * @property {external:Backbone-View} View
 * @see {@link http://backbonejs.org/|Backbone}
 */
/**
 * Module containing all dependencies that exports a single object with everything attached (same format as the global).
 *
 * @constant torso
 *
 * @property {Behavior} Behavior The {@link Behavior} prototype.
 * @property {Object} behaviors Collection of behaviors that ship with Torso.
 *   @property {DataBehavior} behaviors.DataBehavior The {@link DataBehavior} prototype.
 * @property {Cell} Cell The {@link Cell} prototype.
 * @property {Collection} Collection The {@link Collection} prototype.
 * @property {Events} Events The {@link Events} prototype.
 * @property {Object} Mixins Collection of mixins that are used by Torso.
 *   @property {loadingMixin} Mixins.loading The {@link loadingMixin}.
 *   @property {cacheMixin} Mixins.cache The {@link cacheMixin}.
 *   @property {pollingMixin} Mixins.polling The {@link pollingMixin}.
 *   @property {validation.mixin} Mixins.validation The {@link validation.mixin}.
 *   @property {cellMixin} Mixins.cell The {@link cellMixin}.
 * @property {Model} Model The {@link Model} prototype.
 * @property {NestedCell} NestedCell The {@link NestedCell} prototype.
 * @property {NestedModel} NestedModel The {@link NestedModel} prototype.
 * @property {FormModel} FormModel The {@link FormModel} prototype.
 * @property {ServiceCell} ServiceCell The {@link ServiceCell} prototype.
 * @property {Router} Router The {@link Router} prototype.
 * @property {history} history Convient access to backbone history.
 * @property {registry} registry The torso object registry.
 * @property {Utils} Utils Collection of utilities used by Torso.
 *   @property {templateRenderer} Utils.loading Template renderer used by Torso.
 *   @property {handlebarsUtils} Utils.loading Handlebars utilities used by Torso.
 * @property {validation} validation The {@link validation} prototype.
 * @property {View} View The {@link View} prototype.
 * @property {ListView} ListView The {@link ListView} prototype.
 * @property {FormView} FormView The {@link FormView} prototype.
 *
 * @author    jyoung@vecna.com
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./behaviors/DataBehavior',
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
            './registry',
            './View', './ListView', './FormView',
            './templateRenderer',
            './handlebarsUtils',
            './configure',
            './stickitUtils'],
           factory);
  } else if (typeof exports === 'object') {
    require('./stickitUtils');
    require('./configure');
    module.exports = factory(require('./behaviors/DataBehavior'),
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
                             require('./registry'),
                             require('./View'), require('./ListView'), require('./FormView'),
                             require('./templateRenderer'), require('./handlebarsUtils'));
  } else {
    root.Torso = root.Torso || {};
  }
}(this, function(DataBehavior,
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
                 registry,
                 View, ListView, FormView,
                 templateRenderer,
                 handlebarsUtils) {

  return {
    Behavior: Behavior,
    behaviors: {
      DataBehavior: DataBehavior
    },
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
    registry: registry,
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
