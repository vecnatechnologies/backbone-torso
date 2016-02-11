(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'backbone', './templateRenderer', './Cell', './NestedCell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'), require('backbone'), require('./templateRenderer'), require('./Cell'), require('./NestedCell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.View = factory(root._, root.$, root.Backbone, root.Torso.Utils.templateRenderer, root.Torso.Cell, root.Torso.NestedCell);
  }
}(this, function(_, $, Backbone, templateRenderer, Cell, NestedCell) {
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
    viewState: null,
    template: null,
    feedback: null,
    feedbackCell: null,
    __childViews: null,
    __sharedViews: null,
    __isActive: false,
    __isAttachedToParent: false,
    __isDisposed: false,
    __attachedCallbackInvoked: false,
    __feedbackEvents: null,
    /**
     * Array of feedback when-then-to's. Example:
     * [{
     *   when: {'@fullName': ['change']},
     *   then: function(event) { return {text: this.feedbackCell.get('fullName')};},
     *   to: 'fullName-feedback'
     * }]
     * @private
     * @property feedback
     * @type Array
     */

    /**
     * Overrides constructor to create needed fields and invoke activate/render after initialization
     * @method constructor
     * @override
     */
    constructor: function(options) {
      options = options || {};
      this.viewState = new NestedCell();
      this.feedbackCell = new Cell();
      this.__childViews = {};
      this.__sharedViews = {};
      this.__injectionSiteMap = {};
      this.__feedbackEvents = [];
      Backbone.View.apply(this, arguments);
      if (!options.noActivate) {
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
      this.trigger('render-begin');
      this.prerender();
      this.trigger('render-before-dom-replacement');
      if (this.template) {
        this.__updateInjectionSiteMap();
        // Detach this view's tracked views for a more effective hotswap.
        // The child views should be reattached by the attachTrackedViews method.
        this.detachTrackedViews();
        if (_.isString(this.template)) {
          this.$el.html(this.template);
        } else {
          this.templateRender(this.$el, this.template, this.prepare());
        }
      }
      this.delegateEvents();
      this.trigger('render-after-dom-replacement');
      this.attachTrackedViews();
      this.__injectionSiteMap = {};
      this.postrender();
      this.trigger('render-complete');
    },

    /**
     * Alias to this.viewState.get()
     * @method get
     */
    get: function() {
      return this.viewState.get.apply(this.viewState, arguments);
    },

    /**
     * Alias to this.viewState.set()
     * @method set
     */
    set: function() {
      return this.viewState.set.apply(this.viewState, arguments);
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
     * Binds DOM events with the view using events hash.
     * Also adds feedback event bindings
     * @method delegateEvents
     * @override
     */
    delegateEvents: function() {
      Backbone.View.prototype.delegateEvents.call(this);
      this.__generateFeedbackBindings();
      this.__generateFeedbackCellCallbacks();
      _.each(this.getTrackedViews(), function(view) {
        if (view.isAttachedToParent()) {
          view.delegateEvents();
        }
      });
    },

    /**
     * Unbinds DOM events from the view.
     * @method undelegateEvents
     * @override
     */
    undelegateEvents: function() {
      Backbone.View.prototype.undelegateEvents.call(this);
      _.each(this.getTrackedViews(), function(view) {
        view.undelegateEvents();
      });
    },

    /**
     * Attaches a child view by finding the element with the attribute inject=<injectionSiteName>
     * Invokes attachView as the bulk of the functionality
     * @method injectView
     * @param injectionSiteName {String} The name of the injection site in the layout template
     * @param newView   {View}   The instantiated view object to be injected
     * @param [options] {Object} optionals options object
     * @param   [options.noActivate=false] {Boolean} if set to true, the view will not be activated upon attaching.
     * @param   [options.useTransition=false] {Boolean} if set to true, this method will delegate injection logic to this.transitionView
     * @param   [options.shared=false] {Boolean} if set to true, the view will be treated as a shared view and not disposed during parent view disposing.
     */
    injectView: function(injectionSiteName, newView, options) {
      options = options || {};
      if (options.useTransition) {
        return this.transitionNewViewIntoSite(injectionSiteName, newView, options);
      } else {
        var injectionPoint = this.$('[inject=' + injectionSiteName + ']');
        this.attachView(injectionPoint, newView, options);
        return $.Deferred().resolve().promise();
      }
    },

    /**
     * Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view
     * previously had another view at this injections site, this previous view will be removed with that view's transitionOut.
     * If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even
     * though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.
     * If the previous view is the same as the new view, it is injected normally without transitioning in.
     * @method transitionNewViewIntoSite
     * @param injectionSiteName {String} The name of the injection site in the template. This is the value corresponding to the attribute "inject".
     * @param newView {View} The instantiated view object to be transitioned into the injection site
     * @param [options] {Object} optional options object. This options object will be passed on to the transitionIn and transitionOut methods as well.
     * @param   [options.previousView] {View} the view that should be transitioned out. If none is provided, it will look to see if a view already
     *                                 is at this injection site and uses that by default.
     * @param   [options.addBefore=false] {Boolean} if true, the new view's element will be added before the previous view's element. Defaults to after.
     * @param   [options.shared=false] {Boolean} if set to true, the view will be treated as a shared view and not disposed during parent view disposing.
     * @return {Promise} resolved when all transitions are complete. No payload is provided upon resolution.
     * When the transitionIn and transitionOut methods are invoked on the new and previous views, the options parameter will be passed on to them. Other fields
     * will be added to the options parameter to allow better handling of the transitions. These include:
     * {
     *   newView: the new view
     *   previousView: the previous view (can be undefined)
     *   parentView: the parent view transitioning in or out the tracked view
     * }
     */
    transitionNewViewIntoSite: function(injectionSiteName, newView, options) {
      var previousView, injectionPoint, newInjectionSite, currentPromise,
        previousDeferred = $.Deferred();
      options = options || {};
      // find previous view that used this injection site.
      previousView = options.previousView;
      if (!previousView) {
        previousView = this.__getLastTrackedViewAtInjectionSite(injectionSiteName);
      }
      _.defaults(options, {
        parentView: this,
        newView: newView,
        previousView: previousView
      });
      options.useTransition = false;
      if (previousView == newView) {
        // Inject this view like normal if it's already the last one there
        return this.injectView(injectionSiteName, newView, options);
      }
      if (!previousView) {
        // Only transition in the new current view and find the injection point.
        injectionPoint = this.$('[inject=' + injectionSiteName + ']');
        return this.transitionInView(injectionPoint, newView, options);
      }
      this.injectView(injectionSiteName, previousView, options);
      options.cachedInjectionSite = previousView.injectionSite;
      newInjectionSite = options.newInjectionSite = $('<div inject="' + injectionSiteName + '">');
      if (options.addBefore) {
        previousView.$el.before(newInjectionSite);
      } else {
        previousView.$el.after(newInjectionSite);
      }

      // clear the injections site so it isn't replaced back into the dom.
      previousView.injectionSite = undefined;

      // transition previous view out
      previousView.transitionOut(previousDeferred.resolve, options);
      // transition new current view in
      currentPromise = this.transitionInView(newInjectionSite, newView, options);

      // return a combined promise
      return $.when(previousDeferred.promise(), currentPromise);
    },

    /**
     * Simliar to this.attachView except it utilizes the new view's transitionIn method instead of just attaching the view.
     * This method is invoked on the parent view to attach a tracked view where the transitionIn method defines how a tracked view is brought onto the page.
     * @param $el {jQuery element} the element to attach to.
     * @param newView {View} the view to be transitioned in.
     * @param [options] {Object} optional options object
     * @param   [options.noActivate=false] {Boolean} if set to true, the view will not be activated upon attaching.
     * @param   [options.shared=false] {Boolean} if set to true, the view will be treated as a shared view and not disposed during parent view disposing.
     * @return {Promise} resolved when transition is complete. No payload is provided upon resolution.
     * @method transitionInView
     */
    transitionInView: function($el, newView, options) {
      var currentDeferred = $.Deferred(),
        parentView = this;
      options = options || {};
      _.defaults(options, {
        parentView: this,
        newView: newView
      });
      newView.transitionIn(function() {
        parentView.attachView($el, newView, options);
      }, currentDeferred.resolve, options);
      return currentDeferred.promise();
    },

    /**
     * If attached, will detach the view from the DOM and calls deactivate
     * @method detach
     */
    detach: function() {
      if (this.isAttachedToParent()) {
        // Detach view from DOM
        if (this.injectionSite) {
          this.$el.replaceWith(this.injectionSite);
          this.injectionSite = undefined;
        } else {
          this.$el.detach();
        }
        this.invokeDetached();
        this.undelegateEvents();
        this.__isAttachedToParent = false;
      }
    },

    /**
     * If detached, will replace the element passed in with this view's element and activate the view.
     * @param [$el] {jQuery element} the element to attach to. This element will be replaced with this view.
     *                               If options.replaceMethod is provided, then this parameter is ignored.
     * @param [options] {Object} optional options
     * @param   [options.replaceMethod] {Fucntion} if given, this view will invoke replaceMethod function
     *                                             in order to attach the view's DOM to the parent instead of calling $el.replaceWith
     * @param   [options.discardInjectionSite=false] {Booleon} if set to true, the injection site is not saved.
     * @method attach
     */
    attach: function($el, options) {
      options = options || {};
      var injectionSite,
        replaceMethod = options.replaceMethod,
        discardInjectionSite = options.discardInjectionSite;
      if (!this.isAttachedToParent()) {
        this.render();
        this.injectionSite = replaceMethod ? replaceMethod(this.$el) : $el.replaceWith(this.$el);
        if (discardInjectionSite) {
          this.injectionSite = undefined;
        }
        this.__cleanupAfterReplacingInjectionSite();
      }
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
        this._deactivate();
        this.__isActive = false;
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
        this._activate();
        this.__isActive = true;
      }
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

      this.__isDisposed = true;
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
     * Method to be invoked when the view is fully attached to the DOM (NOT just the parent). Use this method to manipulate the view
     * after the DOM has been attached to the document. The default implementation is a no-op.
     * @method _attached
     */
    _attached: _.noop,

    /**
     * Method to be invoked when the view is detached from the DOM (NOT just the parent). Use this method to clean up state
     * after the view has been removed from the document. The default implementation is a no-op.
     * @method _detached
     */
    _detached: _.noop,

    /**
     * Hook during render that is invoked before any DOM rendering is performed.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.prerender.apply(this, arguments);
     * NOTE: if you require the view to be detached from the DOM, consider using _detach callback
     * @method prerender
     */
    prerender: _.noop,

    /**
     * Hook to inject in (or transition in) tracked views. Called after all DOM rendering is done so injection sites should be available.
     * This method can be overwritten  as usual OR extended using <baseClass>.prototype.attachTrackedViews.apply(this, arguments);
     * @method attachTrackedViews
     */
    attachTrackedViews: _.noop,

    /**
     * Hook during render that is invoked after all DOM rendering is done and tracked views attached.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.postrender.apply(this, arguments);
     * NOTE: if you require the view to be attached to the DOM, consider using _attach callback
     * @method postrender
     */
    postrender: _.noop,

    /**
     * Override to provide your own transition out logic. Default logic is to just detach from the page.
     * @method transitionOut
     * @param done {Function} callback to be invoked when the transitions is complete *MUST BE CALLED*
     * @param options {Object} optionals options object
     * @param   options.currentView {View} the view that is being transitioned in.
     * @param   options.previousView {View} the view that is being transitioned out. Typically this view.
     * @param   options.parentView {View} the view that is invoking the transition.
     */
    transitionOut: function(done, options) {
      this.detach();
      done();
    },

    /**
     * Override to provide your own transition in logic. Default logic is to just attach to the page.
     * @method transitionIn
     * @param attach {Function} callback to be invoked when you want this view to be attached to the dom.
                                If you are trying to transition in a tracked view, consider using this.transitionInView()
     * @param done {Function} callback to be invoked when the transitions is complete *MUST BE CALLED*
     * @param options {Object} optionals options object
     * @param   options.currentView {View} the view that is being transitioned in.
     * @param   options.previousView {View} the view that is being transitioned out. Typically this view.
     * @param   options.parentView {View} the view that is invoking the transition.
     */
    transitionIn: function(attach, done, options) {
      attach();
      done();
    },

    /**
     * Registers the child or shared view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the view
     * @param [options] {Object} optional options object
     *   @param [options.noActivate=false] {Boolean} if set to true, the view will not be activated upon attaching.
     * @param   [options.shared=false] {Boolean} if set to true, the view will be treated as a shared view and not disposed during parent view disposing.
     * @method attachView
     */
    attachView: function($el, view, options) {
      options = options || {};
      view.detach();
      this.registerTrackedView(view, options);
      view.attach($el, options);
      if (!options.noActivate) {
        view.activate();
      }
    },

    /**
     * @return {Boolean} true if this view has tracked views (limited by the options parameter)
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, only check the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, only check the child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method hasTrackedViews
     */
    hasTrackedViews: function(options) {
      var trackedViewsHash = this.getTrackedViews(options);
      return !_.isEmpty(trackedViewsHash);
    },

    /**
     * Returns all tracked views, both child views and shared views.
     * @method getTrackedViews
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, get only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, get only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @return {List<View>} all tracked views (filtered by options parameter)
     */
    getTrackedViews: function(options) {
      options = options || {};
      if (options.shared || options.child) {
        return _.values(this.__getTrackedViewsHash(options));
      } else {
        return _.values(this.__sharedViews).concat(_.values(this.__childViews));
      }
    },

    /**
     * @return the view with the given cid.  Will look in both shared and child views.
     * @param viewCID {String} the cid of the view
     * @method getTrackedView
     */
    getTrackedView: function(viewCID) {
      var childView = this.__childViews[viewCID],
          sharedView = this.__sharedViews[viewCID];
      return childView || sharedView;
    },

    /**
     * Disposes all child views recursively
     * @method disposeChildViews
     */
    disposeChildViews: function() {
      _.each(this.__childViews, function(view) {
        view.dispose();
      });
    },

    /**
     * Deactivates all tracked views or a subset of them based on the options parameter.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, deactivate only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, deactivate only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method deactivateTrackedViews
     */
    deactivateTrackedViews: function(options) {
      var trackedViewsHash = this.getTrackedViews(options);
      _.each(trackedViewsHash, function(view) {
        view.deactivate();
      });
    },

    /**
     * Detach all tracked views or a subset of them based on the options parameter.
     * NOTE: this is not recursive - it will not separate the entire view tree.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, detach only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, detach only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method detachTrackedViews
     */
    detachTrackedViews: function(options) {
      var trackedViewsHash = this.getTrackedViews(options);
      _.each(trackedViewsHash, function(view) {
        view.detach();
      });
    },

    /**
     * Activates all tracked views or a subset of them based on the options parameter.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, activate only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, activate only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method activateTrackedViews
     */
    activateTrackedViews: function(options) {
      var trackedViewsHash = this.getTrackedViews(options);
      _.each(trackedViewsHash, function(view) {
        view.activate();
      });
    },

    /**
     * Binds the view as a tracked view - any recursive calls like activate, deactivate, or dispose will
     * be done to the tracked view as well.  Except dispose for shared views. This method defaults to register the
     * view as a child view unless specified by options.shared.
     * @param view {View} the tracked view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, registers view as a shared view. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed. If false, registers view as a child view which are disposed when the parent is disposed.
     * @return {View} the tracked view
     * @method registerTrackedView
     */
    registerTrackedView: function(view, options) {
      options = options || {};
      options.child = options.shared ? false : true;
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      trackedViewsHash[view.cid] = view;
      return view;
    },

    /**
     * Unbinds the tracked view - no recursive calls will be made to this shared view
     * @param view {View} the shared view
     * @return {View} the tracked view
     * @method unregisterTrackedView
     */
    unregisterTrackedView: function(view) {
      delete this.__childViews[view.cid];
      delete this.__sharedViews[view.cid];
      return view;
    },

    /**
     * Unbinds all tracked view - no recursive calls will be made to this shared view
     * You can limit the types of views that will be unregistered by using the options parameter.
     * @param view {View} the shared view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, unregister only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, unregister only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @return {View} the tracked view
     * @method unregisterTrackedView
     */
    unregisterTrackedViews: function(options) {
      var trackedViewsHash = this.getTrackedViews(options);
      _.each(trackedViewsHash, function(view) {
        this.unregisterTrackedView(view, options);
      }, this);
    },

    /**
     * @returns {Boolean} true if the view is attached to a parent
     * @method isAttachedToParent
     */
    isAttachedToParent: function() {
      return this.__isAttachedToParent;
    },

    /**
     * NOTE: depends on a global variable "document"
     * @returns {Boolean} true if the view is attached to the DOM
     * @method isAttached
     */
    isAttached: function() {
      return $.contains(document, this.$el[0]);
    },

    /**
     * @returns {Boolean} true if the view is active
     * @method isActive
     */
    isActive: function() {
      return this.__isActive;
    },

    /**
     * @returns {Boolean} true if the view was disposed
     * @method isDisposed
     */
    isDisposed: function() {
      return this.__isDisposed;
    },

    /**
     * Invokes a feedback entry's "then" method
     * @param to {String} the "to" field corresponding to the feedback entry to be invoked
     * @param [evt] {Event} the event to be passed to the "then" method
     * @param [indexMap] {Object} a map from index variable name to index value. Needed for "to" fields with array notation.
     * @method invokeFeedback
     */
    invokeFeedback: function(to, evt, indexMap) {
      var result,
        feedbackToInvoke = _.find(this.feedback, function(feedback) {
          var toToCheck = feedback.to;
          if (_.isArray(toToCheck)) {
            return _.contains(toToCheck, to);
          } else {
            return to === toToCheck;
          }
        }),
        feedbackCellField = to;
      if (feedbackToInvoke) {
        if (indexMap) {
          feedbackCellField = this.__substituteIndicesUsingMap(to, indexMap);
        }
        result = feedbackToInvoke.then.call(this, evt, indexMap);
        this.__processFeedbackThenResult(result, feedbackCellField);
      }
    },

    /**
     * Call this method when a view is attached to the DOM. It is recursive to child views, but checks whether each child view is attached.
     * @method invokeAttached
     */
    invokeAttached: function() {
      // Need to check if each view is attached because there is no guarentee that if parent is attached, child is attached.
      if (!this.__attachedCallbackInvoked) {
        this._attached();
        this.__attachedCallbackInvoked = true;
        _.each(this.getTrackedViews(), function(view) {
          if (view.isAttachedToParent()) {
            view.invokeAttached();
          }
        });
      }
    },

    /**
     * Call this method when a view is detached from the DOM. It is recursive to child views.
     * @method invokeDetached
     */
    invokeDetached: function() {
      // No need to check if child views are actually detached, because if parent is detached, children are detached.
      if (this.__attachedCallbackInvoked) {
        this._detached();
        this.__attachedCallbackInvoked = false;
      }
      _.each(this.getTrackedViews(), function(view) {
        view.invokeDetached();
      });
    },

    /************** Private methods **************/

    /**
     * Gets the hash from id to views of the correct views given the options.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method __getTrackedViewsHash
     * @return the object map cotaining either the shared or child views keyed by their cid
     * @private
     */
    __getTrackedViewsHash: function(options) {
      options = options || {};
      if (options.shared) {
        return this.__sharedViews;
      } else {
        return this.__childViews;
      }
    },

    /**
     * Used internally by Torso.View to keep a cache of tracked views and their current injection sites before detaching during render logic.
     * @private
     * @method __updateInjectionSiteMap
     */
    __updateInjectionSiteMap: function() {
      var parentView = this;
      this.__injectionSiteMap = {};
      _.each(this.getTrackedViews(), function(view) {
        if (view.isAttachedToParent() && view.injectionSite) {
          parentView.__injectionSiteMap[view.injectionSite.attr('inject')] = view;
        }
      });
    },

    /**
     * Finds the last view at a given injection site. The view returned must be currently tracked by this view (the parent view).
     * When used with the render method, it will return the view at a injections site before the render logic detaches all tracked views.
     * @private
     * @method __getLastTrackedViewAtInjectionSite
     * @param injectionSiteName {String} the injection site name - the value of the "inject" attribute on the element used as an injection target for tracked views.
     * @return {View} the previous view at that site. Undefined if no view was at that injection site before.
     */
    __getLastTrackedViewAtInjectionSite: function(injectionSiteName) {
      // check to see if a view was cached before a render
      var previousView = this.__injectionSiteMap[injectionSiteName];
      if (previousView) {
        // make sure previous view is still tracked
        previousView = _.contains(this.getTrackedViews(), previousView) ? previousView : undefined;
      } else {
        // if not, see if a view is currently in the injection site.
        var matchingViews = this.getTrackedViews().filter(function(view) {
          return view.injectionSite && view.injectionSite.attr('inject') == injectionSiteName && (!excludingViews || !_.contains(excludingViews, view));
        });
        previousView = _.first(matchingViews);
      }
      return previousView;
    },

    /**
     * After a view's DOM element replaces an injection site, there is logic that must be performed,
     * including delegating events, invoking the attached callback if necessary and marking the view as
     * attached to a parent. This method performs all of these cleanup tasks.
     * @private
     * @method __cleanupAfterReplacingInjectionSite
     */
    __cleanupAfterReplacingInjectionSite: function() {
      if (!this.isAttachedToParent()) {
        this.delegateEvents();
        if (!this.__attachedCallbackInvoked && this.isAttached()) {
          this.invokeAttached();
        }
        this.__isAttachedToParent = true;
      }
    },

    /**
     * Generates callbacks for changes in feedback cell fields
     * 'change fullName' -> invokes all the jQuery (or $) methods on the element as stored by the feedback cell
     * If feedbackCell.get('fullName') returns:
     * { text: 'my text',
     *   attr: {class: 'newClass'}
     *   hide: [100, function() {...}]
     * ...}
     * Then it will invoke $element.text('my text'), $element.attr({class: 'newClass'}), etc.
     * @private
     * @method __generateFeedbackCellCallbacks
     */
    __generateFeedbackCellCallbacks: function() {
      var self = this;
      // Feedback one-way bindings
      self.feedbackCell.off();
      _.each(this.$('[data-feedback]'), function(element) {
        var attr = $(element).data('feedback');
        self.feedbackCell.on('change:' + attr, (function(field) {
          return function() {
            var $element,
              state = self.feedbackCell.get(field);
            if (!state) {
              return;
            }
            $element = self.$el.find('[data-feedback="' + field + '"]');
            _.each(state, function(value, key) {
              var target;
              if (_.first(key) === '_') {
                target = self[key.slice(1)];
              } else {
                target = $element[key];
              }
              if (_.isArray(value)) {
                target.apply($element, value);
              } else if (value !== undefined) {
                target.call($element, value);
              }
            });
          };
        })(attr));
      });
      _.each(self.feedbackCell.attributes, function(value, attr) {
        self.feedbackCell.trigger('change:' + attr);
      });
    },

    /**
     * Processes the result of the then method. Adds to the feedback cell.
     * @param result {Object} the result of the then method
     * @param feedbackCellField {Object} the name of the feedbackCellField, typically the "to" value.
     * @private
     * @method __processFeedbackThenResult
     */
    __processFeedbackThenResult: function(result, feedbackCellField) {
      var newState = $.extend({}, result);
      this.feedbackCell.set(feedbackCellField, newState, {silent: true});
      this.feedbackCell.trigger('change:' + feedbackCellField);
    },

    /**
     * Creates the "when" bindings, and collates and invokes the "then" methods for all feedbacks
     * Finds all feedback zones that match the "to" field, and binds the "when" events to invoke the "then" method
     * @private
     * @method __generateFeedbackBindings
     */
    __generateFeedbackBindings: function() {
      var i,
          self = this;

      // Cleanup previous "on" events
      for (i = 0; i < this.__feedbackEvents.length; i++) {
        this.off(null, this.__feedbackEvents[i]);
      }
      this.__feedbackEvents = [];

      // For each feedback configuration
      _.each(this.feedback, function(declaration) {
        var toEntries = [declaration.to];
        if (_.isArray(declaration.to)) {
          toEntries = declaration.to;
        }
        _.each(toEntries, function(to) {
          var destinations = self.__getFeedbackDestinations(to),
            destIndexTokens = self.__getAllIndexTokens(to);

          // Iterate over all destinations
          _.each(destinations, function(dest) {
            var fieldName, indices, indexMap, then, args, method, whenEvents, bindInfo;
            dest = $(dest);
            fieldName = dest.data('feedback');
            indices = self.__getAllIndexTokens(fieldName);
            indexMap = {};
            // Generates a mapping from variable name to value:
            // If the destination "to" mapping is: my-feedback-element[x][y] and this particular destination is: my-feedback-element[1][4]
            // then the map would look like: {x: 1, y: 4}
            _.each(destIndexTokens, function(indexToken, i) {
              indexMap[indexToken] = indices[i];
            });
            then = declaration.then;

            // If the "then" clause is a string, assume it's a view method
            if (_.isString(then)) {
              then = self[then];
            } else if (_.isArray(then)) {
              // If the "then" clause is an array, assume it's [viewMethod, arg[0], arg[1], ...]
              args = then.slice();
              method = args[0];
              args.shift();
              then = self[method].apply(self, args);
            }

            // track the indices for binding
            bindInfo = {
              feedbackCellField: fieldName,
              fn: then,
              indices: indexMap
            };
            // Iterate over all "when" clauses
            whenEvents = self.__generateWhenEvents(declaration.when, indexMap);
            _.each(whenEvents, function(eventKey) {
              var match, delegateEventSplitter,
                invokeThen = function(evt) {
                  var i, args, result, newState;
                  args = [evt];
                  newState = {};
                  args.push(bindInfo.indices);
                  result = bindInfo.fn.apply(self, args);
                  self.__processFeedbackThenResult(result, bindInfo.feedbackCellField);
                };
              delegateEventSplitter = /^(\S+)\s*(.*)$/;
              match = eventKey.match(delegateEventSplitter);
              self.$el.on(match[1] + '.delegateEvents' + self.cid, match[2], _.bind(invokeThen, self));
            });
            // Special "on" listeners
            _.each(declaration.when.on, function(eventKey) {
              var invokeThen = function() {
                var result,
                    args = [{
                      args: arguments,
                      type: eventKey
                    }];
                args.push(bindInfo.indices);
                result = bindInfo.fn.apply(self, args);
                self.__processFeedbackThenResult(result, bindInfo.feedbackCellField);
              };
              self.on(eventKey, invokeThen, self);
              self.__feedbackEvents.push(invokeThen);
            });
          });
        });
      });
    },

    /**
     * Returns all elements on the page that match the feedback mapping
     * If dest is: my-feedback-foo[x][y] then it will find all elements that match: data-feedback="my-feedback-foo[*][*]"
     * @param dest {String} the string of the data-feedback
     * @return {jQuery array} all elements on the page that match the feedback mapping
     * @private
     * @method __getFeedbackDestinations
     */
    __getFeedbackDestinations: function(dest) {
      var self = this,
          strippedField = this.__stripAllAttribute(dest),
          destPrefix = dest,
          firstArrayIndex = dest.indexOf('[');
      if (firstArrayIndex > 0) {
        destPrefix = dest.substring(0, firstArrayIndex);
      }
      // Tries to match as much as possible by using a prefix (the string before the array notation)
      return this.$('[data-feedback^="' + destPrefix + '"]').filter(function() {
        // Only take the elements that actually match after the array notation is converted to open notation ([x] -> [])
        return self.__stripAllAttribute($(this).data('feedback')) === strippedField;
      });
    },

    /**
     * Generates the events needed to listen to the feedback's when methods. A when event is only created
     * if the appropriate element exist on the page
     * @param whenMap the collection of "when"'s for a given feedback
     * @param indexMap map from variable names to values when substituting array notation
     * @return the events that were generated
     * @private
     * @method __generateWhenEvents
     */
    __generateWhenEvents: function(whenMap, indexMap) {
      var self = this,
          events = [];
      _.each(whenMap, function(whenEvents, whenField) {
        var substitutedWhenField,
            qualifiedFields = [whenField],
            useAtNotation = (whenField.charAt(0) === '@');

        if (whenField !== 'on') {
          if (useAtNotation) {
            whenField = whenField.substring(1);
            // substitute indices in to "when" placeholders
            // [] -> to all, [0] -> to specific, [x] -> [x's value]
            substitutedWhenField = self.__substituteIndicesUsingMap(whenField, indexMap);
            qualifiedFields = _.flatten(self.__generateSubAttributes(substitutedWhenField, self.model));
          }
          // For each qualified field
          _.each(qualifiedFields, function(qualifiedField) {
            _.each(whenEvents, function(eventType) {
              var backboneEvent = eventType + ' ' + qualifiedField;
              if (useAtNotation) {
                backboneEvent = eventType + ' [data-model="' + qualifiedField + '"]';
              }
              events.push(backboneEvent);
            });
          });
        }
      });
      return events;
    },

    /**
     * Returns an array of all the values and variables used within the array notations in a string
     * Example: foo.bar[x].baz[0][1].taz[y] will return ['x', 0, 1, 'y']. It will parse integers if they are numbers
     * This does not handle or return any "open" array notations: []
     * @private
     * @method __getAllIndexTokens
     */
    __getAllIndexTokens: function(attr) {
      return _.reduce(attr.match(/\[.+?\]/g), function(result, arrayNotation) {
        var token = arrayNotation.substring(1, arrayNotation.length - 1);
        if (!isNaN(token)) {
          result.push(parseInt(token, 10));
        } else {
          result.push(token);
        }
        return result;
      }, []);
    },

    /**
     * Replaces all array notations with open array notations.
     * Example: foo.bar[x].baz[0][1].taz[y] will return as foo.bar[].baz[][].taz[]
     * @private
     * @method __stripAllAttribute
     */
    __stripAllAttribute: function(attr) {
      attr = attr.replace(/\[.+?\]/g, function() {
        return '[]';
      });
      return attr;
    },

    /**
     * Takes a map from variable name to value to be replaced and processes a string with them.
     * Example: foo.bar[x].baz[0][1].taz[y] and {x: 5, y: 9} will return as foo.bar[5].baz[0][1].taz[9]
     * @private
     * @method __substituteIndicesUsingMap
     */
    __substituteIndicesUsingMap : function(dest, indexMap) {
      var newIndex;
      return dest.replace(/\[.?\]/g, function(arrayNotation) {
        if (arrayNotation.match(/\[\d+\]/g) || arrayNotation.match(/\[\]/g)) {
          return arrayNotation;
        } else {
          newIndex = indexMap[arrayNotation.substring(1, arrayNotation.length - 1)];
          return '[' + (newIndex === undefined ? '' : newIndex) + ']';
        }
      });
    },

    /**
     * Generates an array of all the possible field accessors and their indices when using
     * the "open" array notation:
     *    foo[] -> ['foo[0]', 'foo[1]'].
     * Will also perform nested arrays:
     *    foo[][] -> ['foo[0][0]', foo[1][0]']
     * @method __generateSubAttributes
     * @private
     * @param {String} attr The name of the attribute to expand according to the bound model
     * @return {Array<String>} The fully expanded subattribute names
     */
    __generateSubAttributes: function(attr, model) {
      var i, attrName, remainder, subAttrs, values,
        firstBracket = attr.indexOf('[]');
      if (firstBracket === -1) {
        return [attr];
      } else {
        attrName = attr.substring(0, firstBracket);
        remainder = attr.substring(firstBracket + 2);
        subAttrs = [];
        values = model.get(attrName);
        if (!values) {
          return [attr];
        }
        for (i = 0 ; i < values.length; i++) {
          subAttrs.push(this.__generateSubAttributes(attrName + '[' + i + ']' + remainder, model));
        }
        return subAttrs;
      }
    }

    /************** End Private methods **************/
  });

  return View;
}));
