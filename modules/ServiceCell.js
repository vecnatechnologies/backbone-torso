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
   *
   * @class ServiceCell
   * @extends Cell
   *
   * @param {Object} attributes the initial attributes to use for this service.
   * @param {Object} [options={}] the options for setting up this service.
   *   @param {boolean} [options.register=true] whether to register this service in the app-level registry.
   *                                            By default this WILL add it to the registry unless set to false because
   *                                            most services are global so holding on to them beyond
   * @author kent.willis@vecna.com
   *
   * @see <a href="../annotated/modules/ServiceCell.html">ServiceCell Annotated Source</a>
   */
  var ServiceCell = Cell.extend(/** @lends ServiceCell# */{
    constructor: function() {
      var args = Array.prototype.slice.call(arguments);
      args[1] = args[1] || {};
      // Register by default.
      args[1].register = _.isUndefined(args[1].register) || _.isNull(args[1].register) || args[1].register;
      Cell.apply(this, args);
    },

    /**
     * Register this item with the service registry after initialize.
     * @private
     * @override
     */
    __register: function() {
      registry.serviceInitialized(this);
    }
  });

  return ServiceCell;
}));
