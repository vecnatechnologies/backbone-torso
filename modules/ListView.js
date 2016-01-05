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

    var removeItemView, _removeItemView, addItemView, _addItemView, aggregateRenders, breakDelayedRender;

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
     * @method removeItemView
     * @param model {Backbone Model instance} the model that has been removed
     */
    removeItemView = function(model) {
      var childView = this.getChildViewFromModel(model);
      if (childView) {
        _removeItemView.call(this, childView, model[this.__modelId], model);
        if (!this.hasItemViews()) {
          this.__delayedRender();
        }
      }
    };

    /**
     * Disposes of a child view, unregisters, stops tracking and triggers a 'child-view-removed' event
     * with the model and child view as the payload.
     * @private
     * @method _removeItemView
     * @param childView {Backbone View instance} the view being removed
     * @param modelId {String or Number} the id used for the model
     * @param [model] {Backbone Model instance} the model
     */
    _removeItemView = function(childView, modelId, model) {
      childView.dispose();
      this.unregisterTrackedView(childView, { shared: false });
      delete this.__modelToViewMap[modelId];
      this.__updateOrderedModelIdList();
      this.trigger('child-view-removed', {model: model || childView.model, view: childView});
    };

    /**
     * Handles the addition of an item view if a model has been added to the collection.
     * When possible, it will append the view instead of causing a rerender
     * @private
     * @method addItemView
     * @param model the model being added
     */
    addItemView = function(model) {
      var itemView,
          models = this.modelsToRender(),
          indexOfModel = models.indexOf(model);
      if (indexOfModel > -1) {
        itemView = this.__createItemView(model);
        _addItemView.call(this, itemView, indexOfModel);
      }
    };

    /**
     * Adds the new item view before or after a sibling view. If no sibling view exists
     * or if this item view is the first, it will cause a re-render. This method will break
     * any delayed renders and force a re-render before continuing.
     * @private
     * @method _addItemView
     * @param itemView the view being added
     * @param indexOfModel - the index of the model into the array of models to render
     */
    _addItemView = function(itemView, indexOfModel) {
      var viewAfter, viewBefore, replaceMethod,
        models = this.modelsToRender();
      if (!this.hasItemViews()) {
        this.__delayedRender();
      } else {
        breakDelayedRender(this);
        viewAfter = this.getChildViewFromModel(models[indexOfModel + 1]);
        viewBefore = this.getChildViewFromModel(models[indexOfModel - 1]);
        if (viewAfter) {
          replaceMethod = _.bind(viewAfter.$el.before, viewAfter.$el);
        } else if (viewBefore) {
          replaceMethod = _.bind(viewBefore.$el.after, viewBefore.$el);
        } else {
          this.__delayedRender();
        }
        if (replaceMethod) {
          this.attachView(null, itemView, {
            replaceMethod: replaceMethod,
            discardInjectionSite: true
          });
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
     * The child view class definition that will be instantiated for each model in the list.
     * childView can also be a function that takes a model and returns a view class. This allows
     * for different view classes depending on the model.
     * @property childView
     * @type View or Function
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
     * Constructor for the list view object.
     * @method constructor
     * @param args {Object} - options argument
     *   @param args.childView {Backbone.View definition or Function} - the class definition of the child view. This view will be instantiated
     *                                                     for every model returned by modelsToRender(). If a function is passed in, then for each model,
     *                                                     this function will be invoked to find the appropriate view class. It takes the model as the only parameter.
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
     *   @param [args.modelId='cid'] {'cid' or 'id'} - model property used as identifier for a given model. This property is saved and used to find the corresponding view.
     *   @param [args.childModel='model'] {String} - name of the model argument passed to the child view during initialization
     */
    constructor: function(args) {
      View.apply(this, arguments);
      args = args || {};

      var initialModels, i, l, childView,
          injectionSite = this.$el,
          collection = args.collection || this.collection;

      this.template = args.template || this.template;
      this.emptyTemplate = args.emptyTemplate || this.emptyTemplate;
      this.childView = args.childView || this.childView;
      this.childrenContainer = args.childrenContainer || this.childrenContainer;
      if (this.template && !this.childrenContainer) {
        throw 'Children container is required when using a template';
      }
      this.modelsToRender = args.modelsToRender || this.modelsToRender;
      this.__childContext = args.childContext || this.__childContext;
      this.__modelToViewMap = {};
      this.__renderWait = args.renderWait || this.__renderWait;
      this.__modelId = args.modelId || 'cid';
      this.__modelName = args.childModel || 'model';
      this.__orderedModelIdList = [];
      this.__createItemViews();
      this.__delayedRender = aggregateRenders(this.__renderWait, this);


      if (collection) {
        this.setCollection(collection, true);
      }
    },

    /**
     * Sets the collection from which this view generates child views.
     * This method will attach all necessary event listeners to the new collection to auto-generate child views
     * and has the option of removing listeners on a previous collection.
     *
     * @method setCollection
     * @param collection {Backbone.Collection instance} the new collection that this list view should use.
     * @param [preserveListeners=false] {Boolean} whether to clear existing event listeners that this view has on the previous collection (false).
     *                                            or to preserve any existing listeners on the view's previous collection (true).
     */
    setCollection: function(collection, preserveListeners) {
      if (this.collection && !preserveListeners) {
        this.stopListening(this.collection);
      }
      this.collection = collection;
      this.listenTo(this.collection, 'remove', removeItemView, this);
      this.listenTo(this.collection, 'add', addItemView, this);
      this.listenTo(this.collection, 'sort', this.reorder, this);
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
      if (this.hasItemViews()) {
        injectionSite.replaceWith(this.__emptyAndRebuildItemViewsFragment());
      } else if (this.emptyTemplate) {
        injectionSite.replaceWith(this.emptyTemplate(this.prepareEmpty()));
      }
      this.trigger('render-before-dom-replacement', newDOM);
      this.$el.html(newDOM.contents());
      this.delegateEvents();
      _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildViewFromModel(model);
        if (childView) {
          childView.__cleanupAfterReplacingInjectionSite();
          childView.activate();
        } else {
          // Shouldn't get here. Child views are missing...
        }
      }, this);
      this.trigger('render-complete');
    },

    /**
     * Loops through children views and renders them
     * @method renderChildViews
     */
    renderChildViews: function() {
      _.each(this.getChildViews(), function(childView) {
        childView.render();
      });
    },

    /**
     * Takes existing child views and moves them into correct order defined by
     * this.modelsToRender(). NOTE: As this method doesn't generate or remove views,
     * this method takes advantage of jquery's ability to move elements already attached to the DOM.
     * @method reorder
     */
    reorder: function() {
      var firstChildView, elements = [];
     _.each(this.modelsToRender(), function(model, index) {
        var childView = this.getChildViewFromModel(model);
        if (childView) {
          elements.push(childView.$el);
        }
        if (index === 0) {
          firstChildView = childView;
        }
      }, this);
      // elements that are already connected to the DOM will be moved instead of re-attached
      // meaning that detach, delegate events, and attach are not needed
      if (!this.childrenContainer) {
        this.$el.append(elements);
      } else if (firstChildView) {
        var injectionSite = $("<span>");
        firstChildView.$el.before(injectionSite);
        injectionSite.after(elements);
        injectionSite.remove();
      }
      this.__updateOrderedModelIdList();
      this.trigger('reorder-complete');
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
     * Builds any new views, removes stale ones, and re-renders
     * @method update
     */
    update: function() {
      var view = this,
        renderNeeded = false,
        oldViews = this.getItemViews(),
        newViews = this.__createItemViews(),
        staleViews = this.__getStaleItemViews(),
        sizeOfOldViews = _.size(oldViews),
        sizeOfNewViews = _.size(newViews),
        sizeOfStaleViews = _.size(staleViews),
        changes = sizeOfNewViews + sizeOfStaleViews,
        percentChange = changes / Math.max((sizeOfOldViews - sizeOfStaleViews + sizeOfNewViews), 1),
        threshold = this.updateThreshold || 0.5;
      if (!changes) {
        this.reorder();
        return;
      }
      // A switch from empty to not empty or vise versa, needs a new render
      renderNeeded = (!sizeOfOldViews && sizeOfNewViews) || (sizeOfOldViews && sizeOfOldViews === staleViews && !sizeOfNewViews);
      if (renderNeeded || percentChange >= threshold) {
        // TODO look into chunking views, look for rendering only visible views at first, or look for deferred rendering of child views
        this.$el.empty(); // TODO find out if this is usefull...
        _.each(staleViews, function(staleViewInfo) {
          _removeItemView.call(view, staleViewInfo.view, staleViewInfo.modelId);
        });
        this.__delayedRender();
      } else {
        this.__updateByAddingRemoving(oldViews, newViews, staleViews);
      }
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

    /**
     * @returns {Boolean} returns true if there exists any generated item views
     * @method hasItemViews
     */
    hasItemViews: function() {
      return !_.isEmpty(this.getItemViews());
    },

    /**
     * @returns {Array of views} Returns unordered list of views generated by this list view
     * @method getItemViews
     */
    getItemViews: function() {
      var view = this;
      var orderedViewIds = _.map(this.__orderedModelIdList, function(modelId) { return view.__modelToViewMap[modelId]; });
      return _.map(orderedViewIds, this.getChildView, this);
    },

    /************** Private methods **************/

    /**
     * Creates a new item view for a model if there doesn't exist one
     * @method __createItemViews
     * @private
     */
    __createItemViews: function() {
      var newItemViews = [];
      _.each(this.modelsToRender(), function(model, indexOfModel) {
        var childView = this.getChildViewFromModel(model);
        if (!childView) {
          newItemViews.push({ view: this.__createItemView(model, true), indexOfModel: indexOfModel });
        }
      }, this);
      this.__updateOrderedModelIdList();
      return newItemViews;
    },

    /**
     * Creates an item view and stores a reference to it
     * @method __createItemView
     * @private
     * @param model {Backbone Model} the model to create the view from
     * @param [noUpdateToIdList=false] if true, the internal order of model ids are not updated
     * @return {Backbone View} the new item view
     */
    __createItemView: function(model, noUpdateToIdList) {
      var itemView,
        ItemViewClass = this.childView;
      if (!_.isFunction(this.childView.extend)) {
        ItemViewClass = this.childView(model);
      }
      itemView = new ItemViewClass(this.__generateChildArgs(model));
      this.registerTrackedView(itemView, { shared: false });
      this.__modelToViewMap[model[this.__modelId]] = itemView.cid;
      if (!noUpdateToIdList) {
        this.__updateOrderedModelIdList();
      }
      this.trigger('child-view-added', {model: model, view: itemView});
      return itemView;
    },

    /**
     * Gets all child views that have models that are no longer tracked by modelsToRender
     * @method __getStaleItemViews
     * @private
     */
    __getStaleItemViews: function() {
      var staleChildViews = [];
      var modelsWithViews = _.clone(this.__modelToViewMap);
      _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildViewFromModel(model);
        if (childView) {
          delete modelsWithViews[model[this.__modelId]];
        }
      }, this);
      _.each(modelsWithViews, function(viewId, modelId) {
        var childView = this.getChildView(viewId);
        if (childView) {
          staleChildViews.push({ view: childView, modelId: modelId });
        } else {
          delete this.__modelToViewMap[modelId];
        }
      }, this);
      return staleChildViews;
    },

    /**
     * Creates a DOM fragment with each child view appended in the order defined by
     * modelsToRender(). This will clear the List View's DOM and invoke the necessary
     * detach, register and render logic on each child view.
     * @return a DOM fragment with child view elements appended
     * @method __emptyAndRebuildItemViewsFragment
     * @private
     */
    __emptyAndRebuildItemViewsFragment: function(renderAlso) {
      var injectionFragment = document.createDocumentFragment();
      // Clearing the DOM will reduce the repaints needed as we detach each child view.
      this.$el.empty();
     _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildViewFromModel(model);
        if (childView) {
          childView.detach();
          this.registerTrackedView(childView);
          childView.render();
          injectionFragment.appendChild(childView.el);
        }
      }, this);
      this.__updateOrderedModelIdList();
      return $(injectionFragment);
    },

    /**
     * Attempts to insert new views and remove stale views individually and correctly reorder all views in an
     * attempt to be faster then a full view re-render
     * @method __updateByAddingRemoving
     * @param oldViews {Array of Views} - correctly ordered list of views before making changes to models to render
     * @param newViews {Array of Views} - the new views created that will be inserted
     * @param staleViews {Array of Views} - the stale views that will be removed
     */
    __updateByAddingRemoving: function(oldViews, newViews, staleViews) {
      var firstChildViewLeft, injectionSite,
        view = this,
        sizeOfOldViews = _.size(oldViews),
        sizeOfNewViews = _.size(newViews),
        sizeOfStaleViews = _.size(staleViews);
      if (view.childrenContainer && sizeOfOldViews && sizeOfOldViews == sizeOfStaleViews) {
        // we removed all the views!
        injectionSite = $('<span>');
        _.first(oldViews).$el.before(injectionSite);
      }
      _.each(staleViews, function(staleViewInfo, indexOfView) {
        _removeItemView.call(view, staleViewInfo.view, staleViewInfo.modelId);
      });
      _.each(newViews, function(createdViewInfo, indexOfView) {
        if (createdViewInfo.indexOfModel === 0) {
          // need to handle this case uniquely.
          var replaceMethod;
          if (!view.childrenContainer) {
            replaceMethod = _.bind(view.$el.prepend, view.$el);
          } else {
            if (injectionSite) {
              replaceMethod = _.bind(injectionSite.replaceWith, injectionSite);
            } else {
              var staleModelIdMap = _.indexBy(staleViews, 'modelId');
              var firstModelIdLeft = _.find(view.__orderedModelIdList, function(modelId) {
                return !staleModelIdMap[modelId];
              });
              firstChildViewLeft = view.getChildView(view.__modelToViewMap[firstModelIdLeft]);
              replaceMethod = _.bind(firstChildViewLeft.$el.prepend, firstChildViewLeft.$el);
            }
          }
          view.attachView(null, createdViewInfo.view, {
            replaceMethod: replaceMethod,
            discardInjectionSite: true
          });
        } else {
          // There will always the view before this one because we are adding new views in order
          // and we took care of the initial case.
          _addItemView.call(view, createdViewInfo.view, createdViewInfo.indexOfModel);
        }
      });
      this.reorder();
    },

    /**
     * Updates the internal list of model ids that correspond to the models used for the current
     * list of item views. The order is the same order of the item views.
     * @method __updateOrderedModelIdList
     * @private
     */
    __updateOrderedModelIdList: function() {
      this.__orderedModelIdList = _.pluck(this.modelsToRender(), this.__modelId);
    },

    /**
     * Method to generate arguments when creating a child view. Override this method
     * to change the arguments for a given child view.
     * The format of the subview's arguments is:
     * {
     *   context: {
     *     ... inherited from parent ...
     *   },
     *   <modelName>: <modelObject>,
     *   listView: the parent list view
     * }
     * @method __generateChildArgs
     * @private
     * @param model the model for a child view
     * @return a context to be used by a child view
     */
    __generateChildArgs: function(model) {
      var args = {
        'context': _.extend({}, _.result(this, '__childContext')),
        'listView': this
      };
      args[this.__modelName] = model;
      return args;
    }
  });

  return ListView;
}));
