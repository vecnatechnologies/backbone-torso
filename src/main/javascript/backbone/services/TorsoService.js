(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['backbone'], factory);
    } else if (typeof exports === 'object') {
      module.exports = factory(require('backbone'));
    } else {
      root.Torso = root.Torso || {};
      root.Torso.Services = root.Torso.Services || {};
      root.Torso.Services.Service = factory(root.Backbone);
    };
  }(this, function(Backbone) {
    'use strict;'
    /**
     * Service object
     * Accepts a module method and returns a pure backbone Model object.
     * This allows services to hook in to all change events that models offer.
     * @module    Torso
     * @namespace Torso
     * @class  Service
     * @author ariel.wexler@vecna.com
     */
    var TorsoService = function(serviceModule) {
      return function() {
        var module, ExtendedModule, model;
        module = serviceModule.apply(this, arguments);
        ExtendedModule = Backbone.Model.extend(module);
        model = new ExtendedModule();
        return model;
      };
    };

    return TorsoService;
  })
);
