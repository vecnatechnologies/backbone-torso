(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './guidManager', './templateRenderer', './Cell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./guidManager'), require('./templateRenderer'), require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.View = factory(root._, root.Backbone, root.Torso.Utils.guidManager, root.Torso.Utils.templateRenderer, root.Torso.Cell);
  }
}(this, function(_, Backbone, guidManager, templateRenderer, Cell) {
  'use strict';

  /**
   * Generic View that deals with:
   * - Unique GUID setting
   * - Creation of private collections
   * - Lifecycle of a view
   * @module    Torso
   * @class     View
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var View = Backbone.View.extend({
    _GUID: null,
    _childViews: null,
    _sharedViews: null,
    viewState: null,
    template: null,
    _isActive: false,
    _isAttached: false,
    _isDisposed: false,

    /**
     * The super constructor / initialize method for views.
     * Creates a unique GUID for this view.
     * @method super
     */
    super: function() {
      this.generateGUID();
      this._childViews = {};
      this._sharedViews = {};
      this.viewState = this.viewState || new Cell();
    },

    /**
     * The default initialize method should simply call the
     * super constructor.
     * @method initialize
     */
    initialize: function() {
      this.super();
      this.render();
      this.activate();
    },

    /**
     * @return {Object} context for a render method. Defaults to empty object.
     * @method prepare
     */
    prepare: function() {
      if (this.model) {
        return this.model.toJSON();
      } else {
        return {};
      }
    },

    /**
     * Rebuilds the html for this view's element. Should be able to be called at any time.
     * Defaults to using this.templateRender
     * @method render
     */
    render: function() {
      if (this.template) {
        this.templateRender(this.$el, this.template, this.prepare());
        this.delegateEvents();
      }
    },

    /**
     * Generates and sets this view's GUID (if null)
     * @method generateGUID
     */
    generateGUID: function() {
      if (this._GUID === null) {
        this._GUID = guidManager.generate(this);
      }
    },

    /**
     * Returns the GUID
     *
     * @method getGUID
     */
    getGUID: function() {
      return this._GUID;
    },

    /**
     * Hotswap rendering system reroute method.
     * @method templateRender
     * See Torso.templateRenderer#render for params
     */
    templateRender: function(el, template, context, opts) {
      this.detachChildViews();
      this.detachSharedViews();
      templateRenderer.render(el, template, context, opts);
    },

    /**
     * Creates a private collection object for this view using the
     * input collection as a reference.  If the invoking view is
     * visiting this method for the first time, the view will be
     * assigned a unique requester Id.  Private collections have all
     * the functionality of the original collection, but are automatically
     * managed by the parent (passed in) collection.  That is, any view
     * using a private collection should only have to worry about registering
     * Ids of interest, and the rest is managed behind the scenes.
     * @method createPrivateCollection
     * @param  parentCollection {Collection} The parent collection to mimic and link to
     * @return {Collection} The new private collection
     */
    createPrivateCollection: function(parentCollection) {
      return parentCollection.createPrivateCollection(this._GUID);
    },

    /**
     * Removes all events and corresponding DOM for a view.
     * Guarantees to call call "cleanupChildViews" to enforce
     * recursive removal of views.
     * @method cleanupSelf
     */
    cleanupSelf: function() {
      // Detach handles cleaning up shared views.
      this.detach();

      // Clean up child views first
      this.cleanupChildViews();

      // Remove view from DOM
      this.remove();

      // Unbind all local event bindings
      this.off();
      this.stopListening();
      if (this.viewState) {
        this.viewState.off();
        this.viewState.stopListening();
      }
      // Delete the dom references
      delete this.$el;
      delete this.el;

      this._isDisposed = true;
    },

    /**
     * Method to be invoked when deactivate is called. Use this method to turn off any
     * custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.
     * @method deactivateCallback
     */
    deactivateCallback: _.noop,

    /**
     * Method to be invoked when activate is called. Use this method to turn on any
     * custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.
     * @method deactivateCallback
     */
    activateCallback: _.noop,

    /**
     * @return {Boolean} true if this view has child views
     * @method hasChildViews
     */
    hasChildViews: function() {
      return !_.isEmpty(this._childViews);
    },

    /**
     * @return all of the child views this list view has registered
     * @method getChildViews
     */
    getChildViews: function() {
      return _.values(this._childViews);
    },

    /**
     * Default child view cleanup method that may be overriden.
     * @method cleanupChildViews
     */
    cleanupChildViews: function() {
      _.each(this._childViews, function(view) {
        view.dispose();
      });
    },

    /**
     * Deactivates all child views
     * Default method may be overriden.
     * @method deactivateChildViews
     */
    deactivateChildViews: function() {
      _.each(this._childViews, function(view) {
        view.deactivate();
      });
    },

    /**
     * Activates all child views
     * Default method may be overriden.
     * @method deactivateChildViews
     */
    activateChildViews: function() {
      _.each(this._childViews, function(view) {
        view.activate();
      });
    },

    /**
     * Detach all child views
     * Default method may be overriden.
     * @method detachChildViews
     */
    detachChildViews: function() {
      _.each(this._childViews, function(view) {
        view.detach();
      });
    },

    /**
     * Binds the view as a child view - any recursive calls like activate, deactivate, or dispose will
     * be done to the child view as well.
     * @param view {View} the child view
     * @return {View} the child view
     * @method registerChildView
     */
    registerChildView: function(view) {
      this._childViews[view.cid] = view;
      return view;
    },

    /**
     * Unbinds the child view - no recursive calls will be made to this child view
     * @param view {View} the child view
     * @return {View} the child view
     * @method unregisterChildView
     */
    unregisterChildView: function(view) {
      delete this._childViews[view.cid];
      return view;
    },

    /**
     * Attaches a child view by finding the element with the attribute inject=<injectionSite>
     * Invokes attachChildView as the bulk of the functionality
     * @method injectView
     * @param injectionSite {String} The name of the injection site in the layout template
     * @param view {View} The instantiated view object to inject
     * @param [options={}] {Object} Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     */
    injectView: function(injectionSite, view, options) {
      var injectionPoint = this.$el.find('[inject=' + injectionSite + ']');
      if (view && injectionPoint.size() > 0) {
        this.attachView(injectionPoint, view, options);
      }
    },

    /**
     * Registers the child or shared view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the child view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method attachView
     */
    attachView: function($el, view, options) {
      var defaultOptions = {
        shared: false
      };
      options = _.extend(defaultOptions, options);

      view.detach();
      if (options.shared) {
        this.registerSharedView(view);
      } else {
        this.registerChildView(view);
      }
      view.attach($el);
    },

    /**
     * Registers the child view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the child view
     * @method attachChildView
     */
    attachChildView: function($el, view) {
      view.detach();
      this.registerChildView(view);
      view.attach($el);
    },

    /**
     * @return {Boolean} true if this view has shared views
     * @method hasSharedViews
     */
    hasSharedViews: function() {
      return !_.isEmpty(this._sharedViews);
    },

    /**
     * @return all of the shared views this list view has registered
     * @method getSharedViews
     */
    getSharedViews: function() {
      return _.values(this._sharedViews);
    },

    /**
     * Binds the view as a shared view - any recursive calls like activate, deactivate, or dispose will
     * be done to the shared view as well.  Except dispose.
     *
     * @param view {View} the shared view
     * @return {View} the shared view
     * @method registerSharedView
     */
    registerSharedView: function(view) {
      this._sharedViews[view.cid] = view;
      return view;
    },

    /**
     * Unbinds the shared view - no recursive calls will be made to this shared view
     * @param view {View} the shared view
     * @return {View} the shared view
     * @method unregisterSharedView
     */
    unregisterSharedView: function(view) {
      delete this._sharedViews[view.cid];
      return view;
    },

    /**
     * Deactivates all shared views
     *
     * @method deactivateSharedViews
     */
    deactivateSharedViews: function() {
      _.each(this._sharedViews, function(view) {
        view.deactivate();
      });
    },

    /**
     * Activates all shared views
     *
     * @method activateSharedViews
     */
    activateSharedViews: function() {
      _.each(this._sharedViews, function(view) {
        view.activate();
      });
    },

    /**
     * Detach all shared views
     *
     * @method detachSharedViews
     */
    detachSharedViews: function() {
      _.each(this._sharedViews, function(view) {
        view.detach();
      });
    },

    /**
     * If attached, will detach the view from the DOM and calls deactivate
     * @method detach
     */
    detach: function() {
      if (this.isAttached()) {
        // Detach view from DOM
        if (this.injectionSite) {
          this.$el.replaceWith(this.injectionSite);
        } else {
          this.$el.detach();
        }
        this.deactivate();
        this._isAttached = false;
      }
    },

    /**
     * If detached, will replace the element passed in with this view's element and activate the view.
     * @param $el [jQuery element] the element to attach to. This element will be replaced will this view
     * @method attach
     */
    attach: function($el) {
      if (!this.isAttached()) {
        // be safe and deactivate before attaching yourself
        this.deactivate();
        this.render();
        this.injectionSite = $el.replaceWith(this.$el);
        this.activate();
        this._isAttached = true;
      }
    },

    /**
     * @returns {Boolean} true if the view is attached
     * @method isAttached
     */
    isAttached: function() {
      return this._isAttached;
    },

    /**
     * Maintains view state and DOM but prevents view from becoming a zombie by removing listeners
     * and events that may affect user experience. Recursively invokes deactivate on child views
     * @method deactivate
     */
    deactivate: function() {
      this.deactivateChildViews();
      this.deactivateSharedViews();
      if (this.isActive()) {
        this.undelegateEvents();
        this.deactivateCallback();
        this._isActive = false;
      }
    },

    /**
     * Resets listeners and events in order for the view to be reattached to the visible DOM
     * @method activate
     */
    activate: function() {
      this.activateChildViews();
      this.activateSharedViews();
      if (!this.isActive()) {
        this.delegateEvents();
        this.activateCallback();
        this._isActive = true;
      }
    },

    /**
     * @returns {Boolean} true if the view is active
     * @method isActive
     */
    isActive: function() {
      return this._isActive;
    },

    /**
     * Removes all listeners, disposes children views, stops listening to events, removes DOM.
     * After dispose is called, the view can be safely garbage collected.
     * By default, dispose pipes directly to cleanupSelf. Called while
     * recursively removing views from the hierarchy.
     * @method dispose
     */
    dispose: function() {
      this.cleanupSelf();
    },

    /**
     * @returns {Boolean} true if the view was disposed
     * @method isDisposed
     */
    isDisposed: function() {
      return this._isDisposed;
    }
  });

  return View;
}));
