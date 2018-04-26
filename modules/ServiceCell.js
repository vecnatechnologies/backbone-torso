(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './Cell', './registry'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('./Cell'), require('./registry'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ServiceCell = factory(root._, root.Torso.Cell, root.Torso.registry);
  }
}(this, function(_, Cell, registry) {
  'use strict';
  /**
   * A service cell is a event listening and event emitting object that is independent of any model or view.
   * @module    Torso
   * @class  ServiceCell
   * @constructor
   * @param attributes {Object} the initial attributes to use for this service.
   * @param [options={}] {Object} the options for setting up this service.
   *   @param [options.register=true] {Boolean} whether to register this service in the app-level registry.
   *                                            By default this WILL add it to the registry unless set to false because
   *                                            most services are global so holding on to them beyond
   * @author kent.willis@vecna.com
   */
  var ServiceCell = Cell.extend({
    constructor: function() {
      arguments[1] = arguments[1] || {};
      // Register by default.
      arguments[1].register = _.isUndefined(arguments[1].register) || arguments[1].register;
      Cell.apply(this, arguments);
    },

    /**
     * Register this item with the service registry after initialize.
     * @method __postInitialize
     * @private
     * @override
     */
    __postInitialize: function() {
      registry.serviceInitialized(this);
    }
  });

  return ServiceCell;
}));
