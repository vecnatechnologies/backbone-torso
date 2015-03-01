  var Torso = {};
  Torso.$ = $;
  Torso.Mixins = {};

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
