(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['backbone'], factory);
    } else if (typeof exports === 'object') {
      module.exports = factory(require('backbone'));
    } else {
      root.Torso = root.Torso || {};
      root.Torso.Models = root.Torso.Models || {};
      root.Torso.Models.Model = factory(root.Backbone);
    };
  }(this, function(Backbone) {
    'use strict;'

    var TorsoModel = Backbone.Model.extend({});

    return TorsoModel;
  })
);
