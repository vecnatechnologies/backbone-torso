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
      this.detachTrackedViews({ shared: false });
      this.detachTrackedViews({ shared: true });
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
     * @deprecated 0.3.x - use this.hasTrackedViews({ shared: false }); instead
     */
    hasChildViews: function() {
      return this.hasTrackedViews({ shared: false });
    },

    /**
     * @return all of the child views this list view has registered
     * @method getChildViews
     * @deprecated 0.3.x - use this.getTrackedViews({ shared: false }); instead
     */
    getChildViews: function() {
      return this.getTrackedViews({ shared: false });
    },

    /**
     * Deactivates all child views
     * Default method may be overriden.
     * @method deactivateChildViews
     * @deprecated 0.3.x - use this.deactivateTrackedViews({ shared: false }); instead
     */
    deactivateChildViews: function() {
      this.deactivateTrackedViews({ shared: false });
    },

    /**
     * Activates all child views
     * Default method may be overriden.
     * @method deactivateChildViews
     * @deprecated 0.3.x - use this.activateTrackedViews({ shared: false }); instead
     */
    activateChildViews: function() {
      this.activateTrackedViews({ shared: false });
    },

    /**
     * Detach all child views
     * Default method may be overriden.
     * @method detachChildViews
     * @deprecated 0.3.x - use this.detachTrackedViews({ shared: false }); instead
     */
    detachChildViews: function() {
      this.detachTrackedViews({ shared: false });
    },

    /**
     * Binds the view as a child view - any recursive calls like activate, deactivate, or dispose will
     * be done to the child view as well.
     * @param view {View} the child view
     * @return {View} the child view
     * @method registerChildView
     * @deprecated 0.3.x - use this.registerTrackedView(view, { shared: false }); instead
     */
    registerChildView: function(view) {
      return this.registerTrackedView(view, { shared: false });
    },

    /**
     * Unbinds the child view - no recursive calls will be made to this child view
     * @param view {View} the child view
     * @return {View} the child view
     * @method unregisterChildView
     * @deprecated 0.3.x - use this.unregisterTrackedView(view, { shared: false }); instead
     */
    unregisterChildView: function(view) {
      return this.unregisterTrackedView(view, { shared: false });
    },

    /**
     * Registers the child view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the child view
     * @method attachChildView
     * @deprecated 0.3.x - use this.attachView($el, view, { shared: false }); instead
     */
    attachChildView: function($el, view) {
      this.attachView($el, view, { shared: false });
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
      view.detach();
      this.registerTrackedView(view, options);
      view.attach($el);
    },

    /**
     * Gets the hash from id to views of the correct views given the options.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method __getTrackedViewsHash
     */
    __getTrackedViewsHash: function(options) {
      options = options || {};
      if (options.shared) {
        return this._sharedViews;
      } else {
        return this._childViews;
      }
    },

    /**
     * @return {Boolean} true if this view has shared views
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method hasTrackedViews
     */
    hasTrackedViews: function(options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      return !_.isEmpty(trackedViewsHash);
    },

    /**
     * @return all of the shared views this list view has registered
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method getTrackedViews
     */
    getTrackedViews: function(options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      return _.values(trackedViewsHash);
    },

    /**
     * Binds the view as a tracked view - any recursive calls like activate, deactivate, or dispose will
     * be done to the tracked view as well.  Except dispose for shared views.
     *
     * @param view {View} the shared view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @return {View} the shared view
     * @method registerTrackedView
     */
    registerTrackedView: function(view, options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      trackedViewsHash[view.cid] = view;
      return view;
    },

    /**
     * Unbinds the tracked view - no recursive calls will be made to this shared view
     * @param view {View} the shared view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @return {View} the shared view
     * @method unregisterTrackedView
     */
    unregisterTrackedView: function(view, options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      delete trackedViewsHash[view.cid];
      return view;
    },

    /**
     * Deactivates all tracked views
     *
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method deactivateTrackedViews
     */
    deactivateTrackedViews: function(options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      _.each(trackedViewsHash, function(view) {
        view.deactivate();
      });
    },

    /**
     * Activates all tracked views
     *
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method activateTrackedViews
     */
    activateTrackedViews: function(options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      _.each(trackedViewsHash, function(view) {
        view.activate();
      });
    },

    /**
     * Detach all shared views
     *
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method detachSharedViews
     */
    detachTrackedViews: function(options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      _.each(trackedViewsHash, function(view) {
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
      this.deactivateTrackedViews({ shared: false });
      this.deactivateTrackedViews({ shared: true });
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
      this.activateTrackedViews({ shared: false });
      this.activateTrackedViews({ shared: true });
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
