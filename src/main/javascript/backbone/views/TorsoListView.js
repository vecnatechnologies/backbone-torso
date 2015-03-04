(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './TorsoView'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'), require('./TorsoView'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Views = root.Torso.Views || {};
    root.Torso.Views.List = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Torso.Views.View);
  };
}(this, function(_, $, TorsoView) {
  'use strict;'

  /**
   * Generic List View.
   * More info at 'Webotics --> Backbone Standards --> List View' on the wiki
   * @module    Torso
   * @namespace Torso.Views
   * @class     List
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var TorsoListView = TorsoView.extend((function() {

    var removeChildView, addChildView;

    /**
     * Handles the removal of a child view if a model has been removed from the collection
     * @private
     * @method removeChildView
     * @param model {Backbone Model instance} the model that has been removed
     */
    removeChildView = function(model) {
      var childView = this._childViews[model.id];
      if (childView) {
        childView.dispose();
        this.trigger('child-view-removed', {model: model, view: childView});
      }
      delete this._childViews[model.id];
      if (_.isEmpty(this._childViews) && this._emptyTemplate) {
        // Render an empty list html block
        this.templateRender(this._findInjectionSite(), this._emptyTemplate, this.prepareEmptyListContext());
      }
    };

    /**
     * Handles the addition of a child view if a model has been added to the collection
     * @private
     * @method addChildView
     * @param model the model being added
     */
    addChildView = function(model) {
      if (this.modelsToRender().indexOf(model) > -1) {
        this.refreshChildrenViews({createNewViews: true});
      }
    };

    return {
      className: '',
      _collection: null,
      _modelName: '',
      _childView: null,
      _template: null,
      _emptyTemplate: null,
      args: null,

      /**
       * Initialize the list view object.
       * Override to add more functionality but remember to call this.listViewSetup(args) first
       * @method initialize
       * @param args {Object} - options argument
       * @param args.childModel {String} - attribute name for the model inside the injected context that's passed to the child view

       * @param args.childView {Backbone.View definition} - the class definition of the child view. This view will be instantiated
       *                                                     for every model returned by modelsToRender()
       * @param args.collection {Backbone.Collection instance} - The collection that will back this list view. A subclass of list view
       *                                                          might provide a default collection. Can be private or public collection
       * @param [args.template] {HTML Template} - allows a list view to hold it's own HTML like filter buttons, etc.
       * @param [args.childrenContainer] {String}  - (Required if 'template' is provided) name of injection site for list of children
       * @param [args.emptyTemplate] {HTML Template} - if provided, this template that will be shown if the modelsToRender() method returns
       *                                             an empty list. If a childrenContainer is provided, the empty template will be
       *                                             rendered there.
       * @param [args.modelsToRender] {Function} - If provided, this function will override the modelsToRender() method with custom
       *                                           functionality.
       */
      initialize: function(args) {
        this.super();
        this.listViewSetup(args);
        this.render();
      },

      /**
       * Set up the list view object. See {#initialize()} to understand the arguments required
       * @method listViewSetup
       * @param args {Object} See initialize method for args documentation as they are identical
       */
      listViewSetup: function(args) {
        var initialModels, i, l, childView,
          injectionSite = this.$el;

        args = args || {};
        this._modelName = args.childModel;
        this._collection = args.collection;
        this._childView = args.childView;
        this._template = args.template;
        this._childrenContainer = args.childrenContainer;
        this._emptyTemplate = args.emptyTemplate;
        this._childViews = {};
        // If a modelsToRender argument was passed in, override the modelsToRender method
        if (args.modelsToRender) {
          this.modelsToRender = args.modelsToRender;
        }

        this.render();

        // save the injected context into a local variable
        this.args = args.context;
        injectionSite = this._findInjectionSite();

        // create the views for the models that are currently in the collection
        initialModels = this.modelsToRender();
        if (initialModels.length > 0) {
          for (i = 0, l = initialModels.length; i < l; i++) {
            childView = this._createChildView(initialModels[i]);
            injectionSite.append(childView.$el);
          }
        }

        // if a 'changed' event happens, the model's view should handle re-rendering itself
        this.listenTo(this._collection, 'remove', removeChildView, this);
        this.listenTo(this._collection, 'add', addChildView, this);
        this.listenTo(this._collection, 'sort', this.sortChildrenViews, this);
        this.listenTo(this._collection, 'reset', this.render, this);
      },

      /**
       * The core rendering method that produces the template for the list view first
       * then invokes a refresh on all children views or renders an empty list template
       * if there are no models in the modelsToRender
       * @method render
       */
      render: function() {
        // Fill out the base html
        if (this._template) {
          // Note: If any dom elements were added or removed from list view's template, the injection site will be reset
          this.templateRender(this.$el, this._template, this.prepare(), {ignoreElements: [this._getInjectionSelector()]});
        }

        if (_.keys(this._childViews).length > 0) {
          // Call a refresh on all children
          // If we could know whether the injection site was ignored, we wouldn't have to refresh the children
          this.refreshChildrenViews();
        } else if (this._emptyTemplate) {
          // Render an empty list html block
          this.templateRender(this._findInjectionSite(), this._emptyTemplate, this.prepareEmptyListContext());
        } else {
          this._findInjectionSite().empty();
        }
        this.delegateEvents();
        this.trigger('render-complete');
      },

      /**
       * Override to prepare a context for the HTML template used as the base list view
       * @method prepare
       * @return {Object} an object to use for HTML templating the base list view
       */
      prepare: function() {
        return {};
      },

      /**
       * Returns an array of which models should be rendered.
       * By default, all models in the input collection will be
       * shown.  Extensions of this class may override this
       * method to apply collection filters.
       * @method modelsToRender
       */
      modelsToRender: function() {
        return this._collection ? this._collection.models : [];
      },

      /**
       * Calls a render on all child views. Do this when you want to rerender the children
       * but not the surrounding list view
       * @method refreshChildrenViews
       * @param [options] {Object} options parameter
       * @param [options.createNewViews] {Boolean} will generate a new child view if new models were added
       * @param [options.retain=true] {Boolean} Will retain all old elements instead of emptying the injection site
       */
      refreshChildrenViews: function(options) {
        var i, childView, model, injectionFragment,
          injectionSite = this._findInjectionSite(),
          models = this.modelsToRender();

        // Create a blank options hash if none passed in
        options = options || {};

        // Clean out old injection site
        if (!options.retain) {
          injectionSite.empty();
        }
        // When we upgrade from jQuery 1.7 to 1.8 we can treat this fragment as a jQuery object
        injectionFragment = document.createDocumentFragment();
        for (i = 0; i < models.length; i++) {
          model = models[i];
          childView = this._childViews[model.id];
          if (!childView && options.createNewViews) {
            childView = this._createChildView(model);
            this.trigger('child-view-added', {model: model, view: childView});
          }
          // Reinsert into injection site and rerender
          if (childView) {
            injectionFragment.appendChild(childView.el);
            childView.render();
          }
        }
        // Reinsert into injection site once to call a single reflow
        injectionSite.append(injectionFragment);
      },

      /**
       * A convenience method that refreshes children views with the appropriate flags
       * Children views will not be refreshed if the order of the models has not changed.
       * @method sortChildrenViews
       */
      sortChildrenViews: function() {
        var childView,
          currentChildren = this.$el.children(),
          models = this.modelsToRender();

        // Trigger a refresh if any DOM elements are out of expected order
        _.each(models, $.proxy(function(model, i) {
          childView = this._childViews[model.id];
          if (childView) {
            if (currentChildren[i] !== childView.el) {
              this.refreshChildrenViews({retain: true});
              return;
            }
          }
        }, this));
      },

      /**
       * Method to prepare a context for a child view. Override this method
       * in an extension of a list to augment the context for a given child view.
       * Most likely, you'll want to start with the default functionality by
       * calling this.prepareChildContext(model)
       * @method prepareInjectedContext
       * @param model the model for a child view
       * @return a context to be used by a child view
       */
      prepareInjectedContext: function(model) {
        return this.prepareChildContext(model);
      },

      /**
       * The format of the subview's injected context is:
       * {
       *   context: {
       *     ... inherited from parent ...
       *   },
       *   <modelName>: <modelObject>
       * }
       * @method prepareChildContext
       * @return a context that can be used by the child views
       */
      prepareChildContext: function(model) {
        var injectedContext = this.prepareBaseInjectedContext();
        injectedContext[this._modelName] = model;
        return injectedContext;
      },

      /**
       * Override if you want a different context for your empty template
       * The format of the empty list template's context is:
       * {
       *   context: {
       *     ... inherited from parent ...
       *   }
       * }
       * @method prepareEmptyListContext
       * @return a context that can be used by the empty list template
       */
      prepareEmptyListContext: function() {
        return _.extend(this.prepare(), this.prepareBaseInjectedContext());
      },

      /**
       * @method prepareBaseInjectedContext
       * @return a base context and adds the context variables provided by the parent view
       */
      prepareBaseInjectedContext: function() {
        return {'context': _.extend({}, this.args)};
      },

      /**
       * Override the cleanupChildViews method to correctly
       * dispose of all child views.
       * @method cleanupChildViews
       */
      cleanupChildViews: function() {
        var i, key, childView;
        for (i = 0; i < _.keys(this._childViews).length; i++) {
          key = _.keys(this._childViews)[i];
          childView = this._childViews[key];
          if (childView) {
            childView.dispose();
          }
        }
        this._childViews = {};
      },

      /**
       * Creates a child view and stores a reference to it
       * @method _createChildView
       * @private
       * @param model {Backbone Model} the model to create the view from
       * @return {Backbone View} the new child view
       */
      _createChildView: function(model) {
        this._childViews[model.id] = new this._childView(this.prepareInjectedContext(model));
        return this._childViews[model.id];
      },

      /**
       * NOTE: only use this if there is a template for the list view
       * @method _getInjectionSelector
       * @private
       * @return {String} the jQuery selector string for the element to inject the children view
       */
      _getInjectionSelector: function() {
        return '[inject=' + this._childrenContainer + ']';
      },

      /**
       * NOTE: this should only be run after the list view's base template has been rendered.
       * @method _findInjectionSite
       * @private
       * @return {jQuery object} the jQuery element where child view can be injected.
       */
      _findInjectionSite: function() {
        return this._template ? this.$el.find(this._getInjectionSelector()) : this.$el;
      }
    };
  })());

  return TorsoListView;
}));