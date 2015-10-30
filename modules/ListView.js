(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './View', './templateRenderer'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'), require('./View'), require('./templateRenderer'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ListView = factory(root._, root.$, root.Torso.View, root.Torso.Utils.templateRenderer);
  }
}(this, function(_, $, View, templateRenderer) {
  'use strict';

    var removeChildView, addChildView, aggregateRenders, breakDelayedRender;

    /**
     * If one exists, this method will clear the delayed render timeout and invoke render
     * @param view {List View} the list view
     * @private
     * @method breakDelayedRender
     */
    breakDelayedRender = function(view) {
      if (view.__delayedRenderTimeout) {
        clearTimeout(view.__delayedRenderTimeout);
        view.__delayedRenderTimeout = null;
        view.render();
      }
    };

    /**
     * Aggregates calls to render by waiting a certain amount of time and then rendering.
     * Calls that happen while it is waiting, will be swallowed. Useful for when you want to
     * batch render calls
     * @private
     * @method aggregateRenders
     * @param wait {Numeric} the number of milliseconds to wait before rendering
     * @param view {List View} the list view
     */
    aggregateRenders = function(wait, view) {
      var postpone = function() {
        view.__delayedRenderTimeout = null;
        view.render();
      };
      return function() {
        if (!view.__delayedRenderTimeout && wait > 0) {
          view.__delayedRenderTimeout = setTimeout(postpone, wait);
        } else if (wait <= 0) {
          view.render();
        }
      };
    };

    /**
     * Handles the removal of a child view if a model has been removed from the collection
     * @private
     * @method removeChildView
     * @param model {Backbone Model instance} the model that has been removed
     */
    removeChildView = function(model) {
      var childView = this.getChildViewFromModel(model);
      if (childView) {
        childView.dispose();
        this.unregisterTrackedView(childView, { shared: false });
        delete this.__modelToViewMap[model.cid];
        this.trigger('child-view-removed', {model: model, view: childView});
        if (!this.hasTrackedViews({ shared: false })) {
          this.__delayedRender();
        }
      }
    };

    /**
     * Handles the addition of a child view if a model has been added to the collection.
     * When possible, it will append the view instead of causing a rerender
     * @private
     * @method addChildView
     * @param model the model being added
     */
    addChildView = function(model) {
      var childView, viewAfter, viewBefore,
          models = this.modelsToRender(),
          indexOfModel = models.indexOf(model);
      if (indexOfModel > -1) {
        this.__createChildViews();
        if (!this.hasTrackedViews({ shared: false })) {
          this.__delayedRender();
        } else {
          breakDelayedRender(this);
          childView = this.getChildViewFromModel(model);
          viewAfter = this.getChildViewFromModel(models[indexOfModel + 1]);
          viewBefore = this.getChildViewFromModel(models[indexOfModel - 1]);
          if (viewAfter) {
            viewAfter.$el.before(childView.$el);
          } else if (viewBefore) {
            viewBefore.$el.after(childView.$el);
          } else {
            this.__delayedRender();
          }
        }
      }
    };

  /**
   * A view that is backed by a collection that managers views per model in the collection.
   * @module    Torso
   * @class     ListView
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var ListView = View.extend({
    /**
     * The collection that holds the models that this list view will track
     * @property collection
     * @type Collection
     */
    collection: null,
    /**
     * The child view class definition that will be instantiated for each model in the list
     * @property childView
     * @type View
     */
    childView: null,
    /**
     * The template that allows a list view to hold it's own HTML like filter buttons, etc.
     * @property template
     * @type HTML Template
     */
    template: null,
    /**
     * If provided, this template that will be shown if the modelsToRender() method returns
     * an empty list. If a childrenContainer is provided, the empty template will be rendered there.
     * @property emptyTemplate
     * @type HTML Template
     */
    emptyTemplate: null,
    /**
     * (Required if 'template' is provided, ignored otherwise) name of injection site for list of children
     * @property childrenContainer
     * @type String
     */
    childrenContainer: null,
    __modelName: '',
    __modelId: '',
    __modelToViewMap: null,
    __childContext: null,
    __renderWait: 0,
    __delayedRender: null,
    __delayedRenderTimeout: null,

    /**
     * Initialize the list view object.
     * Override to add more functionality but remember to call ListView.prorotype.initialize.call(this, args) first
     * @method initialize
     * @param args {Object} - options argument
     *   @param args.childView {Backbone.View definition} - the class definition of the child view. This view will be instantiated
     *                                                     for every model returned by modelsToRender()
     *   @param args.collection {Backbone.Collection instance} - The collection that will back this list view. A subclass of list view
     *                                                          might provide a default collection. Can be private or public collection
     *   @param [args.childContext] {Object or Function} - object or function that's passed to the child view's during initialization under the name "context". Can be used by the child view during their prepare method.
     *   @param [args.template] {HTML Template} - allows a list view to hold it's own HTML like filter buttons, etc.
     *   @param [args.childrenContainer] {String}  - (Required if 'template' is provided, ignored otherwise) name of injection site for list of children
     *   @param [args.emptyTemplate] {HTML Template} - if provided, this template will be shown if the modelsToRender() method returns
     *                                             an empty list. If a childrenContainer is provided, the empty template will be
     *                                             rendered there.
     *   @param [args.modelsToRender] {Function} - If provided, this function will override the modelsToRender() method with custom
     *                                           functionality.
     *   @param [args.renderWait=0] {Numeric} - If provided, will collect any internally invoked renders (typically through collection events like reset) for a duration specified by renderWait in milliseconds and then calls a single render instead. Helps to remove unnecessary render calls when modifying the collection often.
     *   @param [args.modelId='cid'] {String} - model property used as identifier for a given model. This property is saved and used to find the corresponding view.
     *   @param [args.childModel='model'] {String} - name of the model argument passed to the child view during initialization
     */
    initialize: function(args) {
      var initialModels, i, l, childView,
        injectionSite = this.$el;
      args = args || {};
      this.collection = args.collection;
      this.template = args.template;
      this.emptyTemplate = args.emptyTemplate;
      this.childView = args.childView;
      this.childrenContainer = args.childrenContainer;
      if (this.template && !this.childrenContainer) {
        throw 'Children container is required when using a template';
      }
      this.modelsToRender = args.modelsToRender || this.modelsToRender;
      this.__childContext = args.childContext;
      this.__modelToViewMap = {};
      this.__renderWait = args.renderWait || this.__renderWait;
      this.__modelId = args.modelId || 'cid';
      this.__modelName = args.childModel || 'model';
      this.__createChildViews();
      this.__delayedRender = aggregateRenders(this.__renderWait, this);

      // if a 'changed' event happens, the model's view should handle re-rendering itself
      this.listenTo(this.collection, 'remove', removeChildView, this);
      this.listenTo(this.collection, 'add', addChildView, this);
      this.listenTo(this.collection, 'sort', this.__delayedRender, this);
      this.listenTo(this.collection, 'reset', this.update, this);
    },

    /**
     * The core rendering method that produces the template for the list view first
     * then invokes a refresh on all children views or renders an empty list template
     * if there are no models in the modelsToRender
     * @method render
     */
    render: function() {
      var injectionSite,
          newDOM = $(templateRenderer.copyTopElement(this.el));
      if (this.template) {
        newDOM.html(this.template(this.prepare()));
        injectionSite = newDOM.find('[inject=' + this.childrenContainer + ']');
      } else {
        injectionSite = $('<span>');
        newDOM.append(injectionSite);
      }
      if (this.hasTrackedViews({ shared: false })) {
        injectionSite.replaceWith(this.__buildChildViewsFragment());
      } else if (this.emptyTemplate) {
        injectionSite.replaceWith(this.emptyTemplate(this.prepareEmpty()));
      }
      this.trigger('render-before-dom-replacement', newDOM);
      this.$el.html(newDOM.contents());
      this.delegateEvents();
      this.trigger('render-complete');
    },

    /**
     * Loops through children views and renders them
     * @method renderChildViews
     */
    renderChildViews: function() {
      _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildViewFromModel(model);
        childView.render();
      }, this);
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
     * Override if you want a different context for your empty template
     * @method prepareEmpty
     * @return a context that can be used by the empty list template
     */
    prepareEmpty: function() {
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
      return this.collection ? this.collection.models : [];
    },

    /**
     * Builds any new views and re-renders
     * @method update
     */
    update: function() {
      this.__createChildViews();
      this.__delayedRender();
    },

    /**
     * Returns the view that corresponds to the model if one exists
     * @param model {Model} the model
     * @return the child view corresponding to the model
     * @method getChildViewFromModel
     */
    getChildViewFromModel: function(model) {
      return model ? this.getChildView(this.__modelToViewMap[model[this.__modelId]]) : undefined;
    },

    /************** Private methods **************/

    /**
     * Creates a new child view if there doesn't exist one for a model
     * @method __createChildViews
     */
    __createChildViews: function() {
      _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildViewFromModel(model);
        if (!childView) {
          childView = this.__createChildView(model);
          this.trigger('child-view-added', {model: model, view: childView});
        }
      }, this);
    },

    /**
     * @return a DOM fragment with child view elements appended
     * @method __buildChildViewsFragment
     * @private
     */
    __buildChildViewsFragment: function(renderAlso) {
      var injectionFragment = document.createDocumentFragment();
     _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildViewFromModel(model);
        if (childView) {
          injectionFragment.appendChild(childView.el);
        }
      }, this);
      return $(injectionFragment);
    },

    /**
     * Creates a child view and stores a reference to it
     * @method __createChildView
     * @private
     * @param model {Backbone Model} the model to create the view from
     * @return {Backbone View} the new child view
     */
    __createChildView: function(model) {
      var childView = new this.childView(this.__generateChildArgs(model));
      this.registerTrackedView(childView, { shared: false });
      this.__modelToViewMap[model.cid] = childView.cid;
      return childView;
    },

    /**
     * Method to generate arguments when creating a child view. Override this method
     * to change the arguments for a given child view.
     * The format of the subview's arguments is:
     * {
     *   context: {
     *     ... inherited from parent ...
     *   },
     *   <modelName>: <modelObject>
     * }
     * @method __generateChildArgs
     * @private
     * @param model the model for a child view
     * @return a context to be used by a child view
     */
    __generateChildArgs: function(model) {
      var args = {
        'context': _.extend({}, _.result(this, '__childContext'))
      };
      args[this.__modelName] = model;
      return args;
    }
  });

  return ListView;
}));
