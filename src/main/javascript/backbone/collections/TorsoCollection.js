(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['backbone'], factory);
    } else if (typeof exports === 'object') {
      module.exports = factory(require('backbone'));
    } else {
      root.Torso = root.Torso || {};
      root.Torso.Collections = root.Torso.Collections || {};
      root.Torso.Collections.Collection = factory(root.Backbone);
    };
  }(this, function(Backbone) {
    'use strict;'

    var TorsoCollection = Backbone.Collection.extend({});

    return TorsoCollection;
  })
);
