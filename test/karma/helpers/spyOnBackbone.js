var _ = require('underscore');

/**
 * Attaches a jasmine spy to a backbone constructor
 * Note that you can only call spyOnBackbone on a constructor's method once
 *
 * @method spyOnBackbone
 * @param {Function} backboneClass a class constructor created by Backbone's extend
 * @param {String} method name of method to spy on
 */
module.exports = function spyOnBackbone(backboneClass, method) {
  backboneClass.prototype.initialize = _.wrap(backboneClass.prototype.initialize, function(initialize) {
    spyOn(this, method).and.callThrough();
    initialize.apply(this, Array.prototype.slice.call(arguments, 1));
  });
};