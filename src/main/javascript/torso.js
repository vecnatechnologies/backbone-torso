(function(root, factory) {
    if (typeof define === "function" && define.amd) {
      define(["torso", "underscore", "jquery", "backbone", "handlebars", "backbone-nested", "backbone-stickit", "backbone-validation"],
             function(Torso, _, $, Backbone, Handlebars) {
        return factory(root, Torso, _, $, Backbone, Handlebars);
      });
    } else if (typeof exports === "object") {
        require("backbone-nested"); +
        require("backbone-epoxy"); +
        require("backbone-validation"); +
        module.exports = factory(root, require("torso", require("underscore"), null, require("backbone"), require("handlebars"));
    } else {
      root.Torso = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Backbone, root.Handlebars);
    };
  }(this, function(root, Torso, _, $, Backbone, Handlebars) {
    "use strict;"

    Torso.$ = $;
    Torso.Mixins = {};

    /* Validation label configuration */
    Torso.Validation = Backbone.Validation;
    Torso.Mixins.Validation = Backbone.Validation.mixin;

    /* Stickit configuration */
    Torso.Stickit = Backbone.Stickit;

    /* Custom Torso Model/View/Collection to be extended and customized in the future. */
    Torso.NestedModel = Backbone.NestedModel.extend({});
    Torso.Model = Backbone.Model.extend({});
    Torso.View = Backbone.View.extend({});
    Torso.Collection = Backbone.Collection.extend({});

    /* Holds any Torso classes */
    Torso.Views = {};
    Torso.Models = {};
    Torso.Collections = {};
    Torso.Services = {};

    /* Holds Torso Events */
    Torso.Events = _.extend({}, Backbone.Events);

    return Torso;
  })
);