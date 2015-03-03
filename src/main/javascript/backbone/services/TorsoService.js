/**
 * Service object
 * Accepts a module method and returns a pure backbone Model object.
 * This allows services to hook in to all change events that models offer.
 * @module    Torso
 * @namespace Torso
 * @class  Service
 * @author ariel.wexler@vecna.com
 */
Torso.Service = function(serviceModule) {
  return function() {
    var module, ExtendedModule, model;
    module = serviceModule.apply(this, arguments);
    ExtendedModule = Backbone.Model.extend(module);
    model = new ExtendedModule();
    return model;
  };
};