(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['backbone', 'backbone-nested'], factory);
    } else if (typeof exports === 'object') {
      require('backbone-nested');
      module.exports = factory(require('backbone'));
    } else {
      root.Torso = root.Torso || {};
      root.Torso.Models = root.Torso.Models || {};
      root.Torso.Models.Nested = factory(root.Backbone);
    };
  }(this, function(Backbone) {
    'use strict;'

    var TorsoNestedModel = Backbone.NestedModel.extend({});

    return TorsoNestedModel;
  })
);
