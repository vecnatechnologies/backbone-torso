WebCore.$ = $;
WebCore.Mixins = {};

/* Validation label configuration */
WebCore.Validation = Backbone.Validation;
WebCore.Mixins.Validation = Backbone.Validation.mixin;

/* Stickit configuration */
WebCore.Stickit = Backbone.Stickit;

/* Custom WebCore Model/View/Collection to be extended and customized in the future. */
WebCore.NestedModel = Backbone.NestedModel.extend({});
WebCore.Model = Backbone.Model.extend({});
WebCore.View = Backbone.View.extend({});
WebCore.Collection = Backbone.Collection.extend({});

/* Holds any WebCore classes */
WebCore.Views = {};
WebCore.Models = {};
WebCore.Collections = {};
WebCore.Services = {};

/* Holds WebCore Events */
WebCore.Events = _.extend({}, Backbone.Events);