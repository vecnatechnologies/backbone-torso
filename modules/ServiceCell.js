(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./Cell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ServiceCell = factory(root.Torso.Cell);
  }
}(this, function(Cell) {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module    Torso
   * @class  ServiceCell
   * @author kent.willis@vecna.com
   */
  var ServiceCell = Cell.extend({ });

  return ServiceCell;
}));
