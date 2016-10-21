(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../Behavior'], factory);
  } else if (typeof exports === 'object') {
    var Behavior = require('../Behavior');
    module.exports = factory(Behavior);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.behaviors = root.Torso.behaviors || {};
    root.Torso.behaviors.DataSourceBehavior = factory(root.Torso.Behavior);
  }
}(this, function(Behavior) {
  'use strict';
  return Behavior.extend({

  });
}));