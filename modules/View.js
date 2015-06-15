(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './templateRenderer', './Cell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./templateRenderer'), require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.View = factory(root._, root.Backbone, root.Torso.Utils.templateRenderer, root.Torso.Cell);
  }
}(this, function(_, Backbone, templateRenderer, Cell) {
  'use strict';

  /**
   * Generic View that deals with:
   * - Creation of private collections
   * - Lifecycle of a view
   * @module    Torso
   * @class     View
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var View = Backbone.View.extend({
    _childViews: null,
    viewState: null,
    template: null,
    _isActive: false,
    _isAttached: false,
    _isDisposed: false,

    /**
     * Overrides constructor to create needed fields and invoke activate/render after initialization
     * @method constructor
     * @override
     */
    constructor: function(options) {
      options = options || {};
      this._childViews = {};
      this.viewState = new Cell();
      Backbone.View.apply(this, arguments);
      if (!options.preventDefault) {
        this.render();
        this.activate();
      }
    },

    /**
     * @return {Object} context for a render method. Defaults to:
     *    {view: this.viewState.toJSON(), model: this.model.toJSON()}
     * @method prepare
     */
    prepare: function() {
      if (this.model) {
        return {
          model: this.model.toJSON(),
          view: this.viewState.toJSON()
        };
      } else {
        return {
          view: this.viewState.toJSON()
        };
      }
    },

    /**
     * Rebuilds the html for this view's element. Should be able to be called at any time.
     * Defaults to using this.templateRender. Assumes that this.template is a javascript
     * function that accepted a single JSON context.
     * @method render
     */
    render: function() {
      this.unplug();
      if (this.template) {
        this.templateRender(this.$el, this.template, this.prepare());
        this.delegateEvents();
      }
      this.plug();
    },

    /**
     * Hotswap rendering system reroute method.
     * @method templateRender
     * See Torso.templateRenderer#render for params
     */
    templateRender: function(el, template, context, opts) {
      this.detachChildViews();
      templateRenderer.render(el, template, context, opts);
    },

    /**
     * Removes all listeners, disposes children views, stops listening to events, removes DOM.
     * After dispose is called, the view can be safely garbage collected. Called while
     * recursively removing views from the hierarchy.
     * @method dispose
     */
    dispose: function() {
      this._dispose();

      // Detach DOM and deactivate the view
      this.detach();
      this.deactivate();

      // Clean up child views first
      this.disposeChildViews();

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
     * Method to be invoked when dispose is called. By default calling dispose will remove the
     * view's element, its on's, listenTo's, and any registered children.
     * Override this method to destruct any extra
     * @method _dispose
     */
    _dispose: _.noop,

    /**
     * Method to be invoked when deactivate is called. Use this method to turn off any
     * custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.
     * @method _deactivate
     */
    _deactivate: _.noop,

    /**
     * Method to be invoked when activate is called. Use this method to turn on any
     * custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.
     * @method _activate
     */
    _activate: _.noop,

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
     * @method disposeChildViews
     */
    disposeChildViews: function() {
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
     * @method registerChildView
     */
    registerChildView: function(view) {
      this._childViews[view.cid] = view;
    },

    /**
     * Unbinds the child view - no recursive calls will be made to this child view
     * @param view {View} the child view
     * @method unregisterChildView
     */
    unregisterChildView: function(view) {
      delete this._childViews[view.cid];
    },

    /**
     * Unregisters all child views
     * @method unregisterChildViews
     */
    unregisterChildViews: function() {
      _.each(this._childViews, function(view) {
        delete this._childViews[view.cid];
      }, this);
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
      if (view && injectionPoint.size() > 0) {
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
      view.detach();
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
        this._deactivate();
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
        this._activate();
        this._isActive = true;
      }
    },

        /**
     * Before any DOM rendering is done, this method is called and removes any
     * custom plugins including events that attached to the existing elements.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.plug.apply(this, arguments);
     * @method unplug
     */
    unplug: _.noop,

    /**
     * After all DOM rendering is done, this method is called and attaches any
     * custom plugins to the existing elements.  This method can be overwritten
     * as usual OR extended using <baseClass>.prototype.plug.apply(this, arguments);
     * @method plug
     */
    plug: _.noop,

    /**
     * @returns {Boolean} true if the view is active
     * @method isActive
     */
    isActive: function() {
      return this._isActive;
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
