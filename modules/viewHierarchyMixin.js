(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './guidManager', './templateRenderer'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('./guidManager'), require('./templateRenderer'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.viewHierarchy = factory(root._, root.Torso.Utils.guidManager, root.Torso.Utils.templateRenderer);
  }
}(this, function(_, guidManager, templateRenderer) {
  'use strict';

  /**
   * Custom View mixins:
   * - Unique GUID setting
   * - creation of private collections for views
   * - cleanup methods for safe disposal of UI + events
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  viewHierarchy
   * @author ariel.wexler@vecna.com
   */
  var viewHierarchyMixin = {
    _GUID: null,
    _childViews: null,
    tabInfo: null,
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
     * Trigger a change:tab-info event, so any tab view listening can react to it.
     * @method triggerInfoChange
     */
    triggerTabInfoChange: function() {
      this.trigger('change:tab-info', this.tabInfo);
    },

    /**
     * Hotswap rendering system reroute method.
     * @method templateRender
     * See Torso.templateRenderer#render for params
     */
    templateRender: function(el, template, context, opts) {
      templateRenderer.render(el, template, context, opts);
    },

    /**
     * Creates a private collection object for this view using the
     * input collection as a reference.  If the invoking view is
     * visiting this method for the first time, the view will be
     * assigned a unique requester Id.  Private collections have all
     * the functionality of the original collection, but are automatically
     * managed by the parent (passed in) collection.  That is, any view
     * using a provate collection should only have to worry about registering
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
      this.detach();

      // Clean up child views first
      this.cleanupChildViews();

      // Remove view from DOM
      this.remove();

      // Unbind all local event bindings
      this.unbind();
      this.off();
      this.stopListening();

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
      this.stopListening(view);
      return view;
    },

    /**
     * Attaches a child view by finding the element with the attribute inject=<injectionSite>
     * Invokes attachChildView as the bulk of the functionality
     * @method injectView
     * @param injectionSite {String} The name of the injection site in the layout template
     * @param view          {View}   The instantiated view object to inject
     */
    injectView: function(injectionSite, view) {
      var injectionPoint = this.$el.find('[inject=' + injectionSite + ']');
      if (view && injectionPoint) {
        this.attachChildView(injectionPoint, view);
      }
    },

    /**
     * Registers the child view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the child view
     * @method attachChildView
     */
    attachChildView: function($el, view) {
      this.registerChildView(view);
      view.attach($el);
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
     * Default render method that may be overriden.
     * @method render
     */
    render: function() {
      //do nothing
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
  };

  return viewHierarchyMixin;
}));
