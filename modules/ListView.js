(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './View', './templateRenderer'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./View'), require('./templateRenderer'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ListView = factory(root._, root.Backbone, root.Torso.View, root.Torso.Utils.templateRenderer);
  }
}(this, function(_, Backbone, View, templateRenderer) {
  'use strict';

    var removeItemView, _removeItemView, addItemView, _addItemView, aggregateRenders, breakDelayedRender;

    var $ = Backbone.$;

    /**
     * If one exists, this method will clear the delayed render timeout and invoke render
     * @param {ListView} view the list view
     * @private
     */
    breakDelayedRender = function(view) {
      if (view.__delayedRenderTimeout) {
        clearTimeout(view.__delayedRenderTimeout);
        view.__delayedRenderTimeout = null;
        if (!view.isDisposed()) {
          view.render();
        }
      }
    };

    /**
     * Aggregates calls to render by waiting a certain amount of time and then rendering.
     * Calls that happen while it is waiting, will be swallowed. Useful for when you want to
     * batch render calls
     * @private
     * @param {number} wait the number of milliseconds to wait before rendering
     * @param {ListView} view the list view
     */
    aggregateRenders = function(wait, view) {
      var postpone = function() {
        view.__delayedRenderTimeout = null;
        if (!view.isDisposed()) {
          view.render();
        }
      };
      return function() {
        if (!view.__delayedRenderTimeout && wait > 0) {
          view.__delayedRenderTimeout = setTimeout(postpone, wait);
        } else if (wait <= 0 && !view.isDisposed()) {
          view.render();
        }
      };
    };

    /**
     * Handles the removal of an item view if a model has been removed from the collection
     * @private
     * @param {Backbone Model instance} model the model that has been removed
     */
    removeItemView = function(model) {
      var itemView = this.getItemViewFromModel(model);
      if (itemView) {
        _removeItemView.call(this, itemView, model[this.__modelId], model);
        if (!this.hasItemViews()) {
          this.__delayedRender();
        }
      }
    };

    /**
     * Disposes of an item view, unregisters, stops tracking and triggers a 'item-view-removed' event
     * with the model and an item view as the payload.
     * @private
     * @param {Backbone View instance} itemView the view being removed
     * @param {string|Number} modelId the id used for the model
     * @param {Backbone Model instance} [model] the model
     */
    _removeItemView = function(itemView, modelId, model) {
      itemView.dispose();
      this.unregisterTrackedView(itemView, { shared: false });
      delete this.__modelToViewMap[modelId];
      this.__updateOrderedModelIdList();
      this.trigger('item-view-removed', {model: model || itemView.model, view: itemView});
      this.trigger('child-view-removed', {model: model || itemView.model, view: itemView});
    };

    /**
     * Handles the addition of an item view if a model has been added to the collection.
     * When possible, it will append the view instead of causing a rerender
     * @private
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
        viewAfter = this.getItemViewFromModel(models[indexOfModel + 1]);
        viewBefore = this.getItemViewFromModel(models[indexOfModel - 1]);
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
     * The item view class definition that will be instantiated for each model in the list.
     * itemView can also be a function that takes a model and returns a view class. This allows
     * for different view classes depending on the model.
     * @property itemView
     * @type View or Function
     */
    itemView: null,
    /**
     * The template that allows a list view to hold it's own HTML like filter buttons, etc.
     * @property template
     * @type HTML Template
     */
    template: null,
    /**
     * If provided, this template that will be shown if the modelsToRender() method returns
     * an empty list. If an itemContainer is provided, the empty template will be rendered there.
     * @property emptyTemplate
     * @type HTML Template
     */
    emptyTemplate: null,
    /**
     * (Required if 'template' is provided, ignored otherwise) name of injection site for list of item views
     * @property itemContainer
     * @type String
     */
    itemContainer: null,
    __modelName: '',
    __modelId: '',
    __modelToViewMap: null,
    __itemContext: null,
    __renderWait: 0,
    __delayedRender: null,
    /**
     * @property __delayedRenderTimeout
     * @private
     * @type {number}
     */
    __delayedRenderTimeout: null,

    /**
     * Constructor for the list view object.
     * @param {Object} args - options argument
     *   @param {Backbone.View definition or Function} args.itemView - the class definition of the item view. This view will be instantiated for every model returned by modelsToRender(). If a function is passed in, then for each model, this function will be invoked to find the appropriate view class. It takes the model as the only parameter.
     *   @param {Backbone.Collection instance} args.collection - The collection that will back this list view. A subclass of list view might provide a default collection. Can be private or public collection
     *   @param {Object|Function} [args.itemContext] - object or function that's passed to the item view's during initialization under the name "context". Can be used by the item view during their prepare method.
     *   @param {HTML Template} [args.template] - allows a list view to hold it's own HTML like filter buttons, etc.
     *   @param {string} [args.itemContainer]  - (Required if 'template' is provided, ignored otherwise) name of injection site for list of item views
     *   @param {HTML Template} [args.emptyTemplate] - if provided, this template will be shown if the modelsToRender() method returns an empty list. If a itemContainer is provided, the empty template will be rendered there.
     *   @param {Function} [args.modelsToRender] - If provided, this function will override the modelsToRender() method with custom functionality.
     *   @param {number} [args.renderWait=0] - If provided, will collect any internally invoked renders (typically through collection events like reset) for a duration specified by renderWait in milliseconds and then calls a single render instead. Helps to remove unnecessary render calls when modifying the collection often.
     *   @param [args.modelId='cid'] {'cid' or 'id'} - model property used as identifier for a given model. This property is saved and used to find the corresponding view.
     *   @param [args.modelName='model'] {string} - name of the model argument passed to the item view during initialization
     */
    constructor: function(args) {
      View.apply(this, arguments);
      args = args || {};

      var collection = args.collection || this.collection;

      this.template = args.template || this.template;
      this.emptyTemplate = args.emptyTemplate || this.emptyTemplate;
      this.itemView = args.itemView || this.itemView;
      this.itemContainer = args.itemContainer || this.itemContainer;
      if (this.template && !this.itemContainer) {
        throw 'Item container is required when using a template';
      }
      this.modelsToRender = args.modelsToRender || this.modelsToRender;
      this.__itemContext = args.itemContext || this.__itemContext;
      this.__modelToViewMap = {};
      this.__renderWait = args.renderWait || this.__renderWait;
      this.__modelId = args.modelId || this.modelId || 'cid';
      this.__modelName = args.modelName || this.modelName || 'model';
      this.__orderedModelIdList = [];
      this.__createItemViews();
      this.__delayedRender = aggregateRenders(this.__renderWait, this);

      if (collection) {
        this.setCollection(collection, true);
      }
      this.on('render:after-dom-update', this.__cleanupItemViewsAfterAttachedToParent);
    },

    /**
     * Sets the collection from which this view generates item views.
     * This method will attach all necessary event listeners to the new collection to auto-generate item views
     * and has the option of removing listeners on a previous collection. It will immediately update child
     * views and re-render if it is necessary - this behavior can be prevented with preventUpdate argument
     *
     * @param {Backbone.Collection instance} collection the new collection that this list view should use.
     * @param {boolean} preventUpdate if true, the list view will not update the child views nor rerender.
     */
    setCollection: function(collection, preventUpdate) {
      this.stopListening(this.collection, 'remove', removeItemView);
      this.stopListening(this.collection, 'add', addItemView);
      this.stopListening(this.collection, 'sort', this.reorder);
      this.stopListening(this.collection, 'reset', this.update);

      this.collection = collection;

      this.listenTo(this.collection, 'remove', removeItemView);
      this.listenTo(this.collection, 'add', addItemView);
      this.listenTo(this.collection, 'sort', this.reorder);
      this.listenTo(this.collection, 'reset', this.update);

      if (!preventUpdate) {
        this.update();
      }
    },

    /**
     * Override of View.__updateDOM
     * Builds a single DOM fragment from the item views and attaches it at once.
     */
    updateDOM: function() {
      var injectionSite,
        newDOM = $(templateRenderer.copyTopElement(this.el));
      if (this.template) {
        newDOM.html(this.template(this.prepare()));
        injectionSite = newDOM.find('[inject=' + this.itemContainer + ']');
      } else {
        injectionSite = $('<span>');
        newDOM.append(injectionSite);
      }
      if (this.hasItemViews()) {
        injectionSite.replaceWith(this.__emptyAndRebuildItemViewsFragment());
      } else if (this.emptyTemplate) {
        injectionSite.replaceWith(this.emptyTemplate(this.prepareEmpty()));
      }
      this.$el.html(newDOM.contents());
    },

    /**
     * Completes each item view's lifecycle of being attached to a parent.
     * Because the item views are attached in a non-standard way, it's important to make sure
     * that the item views are in the appropriate state after being attached as one fragment.
     * @private
     */
    __cleanupItemViewsAfterAttachedToParent: function() {
      _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          itemView.delegateEvents();
          if (!itemView.__attachedCallbackInvoked && itemView.isAttached()) {
            itemView.__invokeAttached();
          }
          itemView.activate();
        } else {
          // Shouldn't get here. Item view is missing...
        }
      }, this);
    },

    /**
     * Loops through children views and renders them
     */
    renderChildViews: function() {
      _.each(this.getTrackedViews({child: true}), function(childView) {
        childView.render();
      });
    },

    /**
     * Takes existing item views and moves them into correct order defined by
     * this.modelsToRender(). NOTE: As this method doesn't generate or remove views,
     * this method takes advantage of jquery's ability to move elements already attached to the DOM.
     */
    reorder: function() {
      var firstItemView, sameOrder,
        elements = [],
        models = this.modelsToRender(),
        newOrderOfIds = _.pluck(models, this.__modelId),
        sizeOfNewModels = _.size(newOrderOfIds),
        sizeOfOldModels = _.size(this.__orderedModelIdList),
        sameSize = sizeOfNewModels === sizeOfOldModels;

      if (sameSize) {
        // is order the same?
        sameOrder = _.reduce(this.__orderedModelIdList, function(result, oldId, index) {
          return result && newOrderOfIds[index] == oldId;
        }, true);
      } else {
        throw 'Reorder should not be invoked if the number of models have changed';
      }
      if (!sizeOfNewModels || sameOrder) {
        // stop early if there are no models to reorder or the models are the same
        return;
      }
      _.each(models, function(model, index) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          elements.push(itemView.$el);
        }
        if (index === 0) {
          firstItemView = itemView;
        }
      }, this);
      // elements that are already connected to the DOM will be moved instead of re-attached
      // meaning that detach, delegate events, and attach are not needed
      if (!this.itemContainer) {
        this.$el.append(elements);
      } else if (firstItemView) {
        var injectionSite = $("<span>");
        firstItemView.$el.before(injectionSite);
        injectionSite.after(elements);
        injectionSite.remove();
      }
      this.__updateOrderedModelIdList(newOrderOfIds);
      this.trigger('reorder-complete');
    },

    /**
     * Override if you want a different context for your empty template. Defaults to this.prepare()
     * @return a context that can be used by the empty list template
     */
    prepareEmpty: function() {
      return this.prepare();
    },

    /**
     * Returns an array of which models should be rendered.
     * By default, all models in the input collection will be
     * shown.  Extensions of this class may override this
     * method to apply collection filters.
     */
    modelsToRender: function() {
      return this.collection ? this.collection.models : [];
    },

    /**
     * Builds any new views, removes stale ones, and re-renders
     */
    update: function() {
      var oldViews = this.getItemViews();
      var newViews = this.__createItemViews();
      var staleViews = this.__getStaleItemViews();
      var sizeOfOldViews = _.size(oldViews);
      var sizeOfNewViews = _.size(newViews);
      var sizeOfStaleViews = _.size(staleViews);
      var sizeOfFinalViews = sizeOfOldViews - sizeOfStaleViews + sizeOfNewViews;
      var changes = sizeOfNewViews + sizeOfStaleViews;
      var percentChange = changes / Math.max(sizeOfFinalViews, 1);
      var fromEmptyToNotEmpty = !sizeOfOldViews && sizeOfNewViews;
      var fromNotEmptyToEmpty = sizeOfOldViews && sizeOfOldViews === sizeOfStaleViews && !sizeOfNewViews;
      var threshold = this.updateThreshold || 0.5;
      var signficantChanges = percentChange >= threshold;
      if (changes <= 0) {
        return this.reorder();
      }
      // A switch from empty to not empty or vise versa, needs a new render
      var renderNeeded = fromEmptyToNotEmpty || fromNotEmptyToEmpty || signficantChanges;
      if (renderNeeded) {
        this.__removeStaleItemViews(staleViews);
        this.__delayedRender();
      } else {
        this.__updateByAddingRemoving(oldViews, newViews, staleViews);
      }
    },

    /**
     * Returns the view that corresponds to the model if one exists
     * @param {Model} model the model
     * @return the item view corresponding to the model
     */
    getItemViewFromModel: function(model) {
      return model ? this.getTrackedView(this.__modelToViewMap[model[this.__modelId]]) : undefined;
    },

    /**
     * @return {boolean} returns true if there exists any generated item views
     */
    hasItemViews: function() {
      return !_.isEmpty(this.getItemViews());
    },

    /**
     * @return {Array of views} Returns unordered list of views generated by this list view
     */
    getItemViews: function() {
      var view = this;
      var orderedViewIds = _.map(this.__orderedModelIdList, this.__getViewIdFromModelId, this);
      return _.map(orderedViewIds, this.getTrackedView, this);
    },

    //************** Private methods **************//

    /**
     * Creates all needed item views that don't exist from modelsToRender()
     * @private
     * @return {Array} each object in array contains a 'view' and 'indexOfModel' field
     */
    __createItemViews: function() {
      var newItemViews = [];
      _.each(this.modelsToRender(), function(model, indexOfModel) {
        var itemView = this.getItemViewFromModel(model);
        if (!itemView) {
          newItemViews.push({
            view: this.__createItemView(model, true),
            indexOfModel: indexOfModel
          });
        }
      }, this);
      this.__updateOrderedModelIdList();
      return newItemViews;
    },

    /**
     * Creates an item view and stores a reference to it
     * @private
     * @param {external:Backbone-Model} model the model to create the view from
     * @param [noUpdateToIdList=false] if true, the internal order of model ids are not updated
     * @return {Backbone View} the new item view
     */
    __createItemView: function(model, noUpdateToIdList) {
      var itemView,
        ItemViewClass = this.itemView;
      if (!_.isFunction(this.itemView.extend)) {
        ItemViewClass = this.itemView(model);
      }
      itemView = new ItemViewClass(this.__generateItemViewArgs(model));
      this.registerTrackedView(itemView, { shared: false });
      this.__modelToViewMap[model[this.__modelId]] = itemView.cid;
      if (!noUpdateToIdList) {
        this.__updateOrderedModelIdList();
      }
      this.trigger('child-view-added', {model: model, view: itemView});
      this.trigger('item-view-added', {model: model, view: itemView});
      return itemView;
    },

    /**
     * Gets all item views that have models that are no longer tracked by modelsToRender
     * @return {Array} An array of information about stale items. Each object has a 'view' and 'modelId' field
     * @private
     */
    __getStaleItemViews: function() {
      var staleItemViews = [];
      var modelsWithViews = _.clone(this.__modelToViewMap);
      _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          delete modelsWithViews[model[this.__modelId]];
        }
      }, this);
      _.each(modelsWithViews, function(viewId, modelId) {
        var itemView = this.getTrackedView(viewId);
        if (itemView) {
          staleItemViews.push({ view: itemView, modelId: modelId });
        }
      }, this);
      return staleItemViews;
    },

    /**
     * Removes the item views that no longer have models returned by modelsToRender()
     * @param [staleItemViewInfo] {Array of objects:
     *   [{
     *     view: stale item view,
     *     modelId: id of model item
     *   }]} If provided, stale items will not be found, but this array will be used instead.
     * @private
     */
    __removeStaleItemViews: function(staleItemViewInfo) {
      var view = this;
      staleItemViewInfo = staleItemViewInfo || this.__getStaleItemViews();
      _.each(staleItemViewInfo, function(staleViewInfo) {
        _removeItemView.call(view, staleViewInfo.view, staleViewInfo.modelId);
      });
    },

    /**
     * Creates a DOM fragment with each item view appended in the order defined by
     * modelsToRender(). This will clear the List View's DOM and invoke the necessary
     * detach, register and render logic on each item view.
     * @return a DOM fragment with item view elements appended
     * @private
     */
    __emptyAndRebuildItemViewsFragment: function() {
      var injectionFragment = document.createDocumentFragment();
      // Clearing the DOM will reduce the repaints needed as we detach each item view.
      this.$el.empty();

     _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          // detach to be safe, but during a render, the item views will already be detached.
          itemView.detach();
          this.registerTrackedView(itemView, { shared: false });
          itemView.attachTo(null, {
            replaceMethod: function($el) {
              injectionFragment.appendChild($el[0]);
            },
            discardInjectionSite: true
          });
        }
      }, this);
      this.__updateOrderedModelIdList();
      return $(injectionFragment);
    },

    /**
     * Attempts to insert new views and remove stale views individually and correctly reorder all views in an
     * attempt to be faster then a full view re-render
     * @param {Array of Views} oldViews - correctly ordered list of views before making changes to models to render
     * @param {Array of Views} newViews - the new views created that will be inserted
     * @param {Array of Views} staleViews - the stale views that will be removed
     */
    __updateByAddingRemoving: function(oldViews, newViews, staleViews) {
      var firstItemViewLeft, injectionSite,
        view = this,
        sizeOfOldViews = _.size(oldViews),
        sizeOfNewViews = _.size(newViews),
        sizeOfStaleViews = _.size(staleViews);
      if (view.itemContainer && sizeOfOldViews && sizeOfOldViews == sizeOfStaleViews) {
        // we removed all the views!
        injectionSite = $('<span>');
        _.first(oldViews).$el.before(injectionSite);
      }
      view.__removeStaleItemViews(staleViews);
      _.each(newViews, function(createdViewInfo, indexOfView) {
        if (createdViewInfo.indexOfModel === 0) {
          // need to handle this case uniquely.
          var replaceMethod;
          if (!view.itemContainer) {
            replaceMethod = _.bind(view.$el.prepend, view.$el);
          } else {
            if (injectionSite) {
              replaceMethod = _.bind(injectionSite.replaceWith, injectionSite);
            } else {
              var staleModelIdMap = _.indexBy(staleViews, 'modelId');
              var firstModelIdLeft = _.find(view.__orderedModelIdList, function(modelId) {
                return !staleModelIdMap[modelId];
              });
              firstItemViewLeft = view.getTrackedView(view.__modelToViewMap[firstModelIdLeft]);
              replaceMethod = _.bind(firstItemViewLeft.$el.prepend, firstItemViewLeft.$el);
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
     * @param {Array of ids} [newIdsList] - if passed the array, it will use that instead of finding the list.
     * @private
     */
    __updateOrderedModelIdList: function(newIdsList) {
      this.__orderedModelIdList = newIdsList || _.pluck(this.modelsToRender(), this.__modelId);
    },

    /**
     * Method to generate arguments when creating an item view. Override this method
     * to change the arguments for a given item view.
     * The format of the subview's arguments is:
     * {
     *   context: {
     *     ... inherited from parent ...
     *   },
     *   <modelName>: <modelObject>,
     *   listView: the parent list view
     * }
     * @private
     * @param model the model for an item view
     * @return a context to be used by an item view
     */
    __generateItemViewArgs: function(model) {
      var args = {
        'context': _.extend({}, _.result(this, '__itemContext')),
        'listView': this
      };
      args[this.__modelName] = model;
      return args;
    },

    /**
     * Alias method for __generateItemViewArgs()
     */
    __generateChildArgs: function() {
      return this.__generateItemViewArgs.apply(this, arguments);
    },

    /**
     * @private
     * @param {string|Number} modelId id of model
     * @return {string|Number} view cid that was built from corresponding model
     */
    __getViewIdFromModelId: function(modelId) {
      return this.__modelToViewMap[modelId];
    }
  });

  return ListView;
}));
