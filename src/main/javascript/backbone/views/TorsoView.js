(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['backbone'], factory);
    } else if (typeof exports === 'object') {
      module.exports = factory(require('backbone'));
    } else {
      root.Torso = root.Torso || {};
      root.Torso.Views = root.Torso.Views || {};
      root.Torso.Views.View = factory(root.Backbone);
    };
  }(this, function(Backbone) {
    'use strict;'

    var TorsoView = Backbone.View.extend({});

    return TorsoView;
  })
);
