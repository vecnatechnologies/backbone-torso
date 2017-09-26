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
   * ViewStateCell is a NestedCell that holds view state data and can trigger
   * change events. These changes events will propogate up and trigger on the view
   * as well.
   */
  var ViewStateCell = NestedCell.extend({

    initialize: function(attrs, opts) {
      opts = opts || {};
      this.view = opts.view;
    },

    /**
     * Retrigger view state change events on the view as well.
     * @method trigger
     * @override
     */
    trigger: function(name) {
      if (name === 'change' || name.indexOf('change:') === 0) {
        View.prototype.trigger.apply(this.view, arguments);
      }
      NestedCell.prototype.trigger.apply(this, arguments);
    }
  });

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
    template: undefined,
    feedback: null,
    feedbackCell: null,
    behaviors: null,
    templateRendererOptions: undefined,
    prepareFields: null,
    __behaviorInstances: null,
    __childViews: null,
    __sharedViews: null,
    __isActive: false,
    __isAttachedToParent: false,
    __isDisposed: false,
    __attachedCallbackInvoked: false,
    __feedbackOnEvents: null,
    __feedbackListenToEvents: null,
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
     */
    constructor: function(options) {
      options = options || {};
      this.viewState = new ViewStateCell({}, { view: this });
      this.feedbackCell = new Cell();
      this.__childViews = {};
      this.__sharedViews = {};
      this.__injectionSiteMap = {};
      this.__feedbackOnEvents = [];
      this.__feedbackListenToEvents = [];
      this.template = options.template || this.template;
      this.templateRendererOptions = options.templateRendererOptions || this.templateRendererOptions;
      this.__initializeBehaviors(options);
      this.trigger('initialize:begin');
      Backbone.View.apply(this, arguments);
      this.trigger('initialize:complete');
      if (!options.noActivate) {
        this.activate();
      }
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
     * Alias to this.viewState.toJSON()
     * @method toJSON
     */
    toJSON: function() {
      return this.viewState.toJSON();
    },

    /**
     * @param alias {String} the name/alias of the behavior
     * @return {Torso.Behavior} the behavior instance if one exists with that alias
     * @method getBehavior
     */
    getBehavior: function(alias) {
      if (this.__behaviorInstances) {
        return this.__behaviorInstances[alias];
      }
    },

    /**
     * prepareFields can be used to augment the default render method contents.
     * See __getPrepareFieldsContext() for more details on how to configure them.
     *
     * @return {Object} context for a render method. Defaults to:
     *    {view: this.viewState.toJSON(), model: this.model.toJSON()}
     * @method prepare
     */
    prepare: function() {
      return this.__getPrepareFieldsContext();
    },

    /**
     * Rebuilds the html for this view's element. Should be able to be called at any time.
     * Defaults to using this.templateRender. Assumes that this.template is a javascript
     * function that accepted a single JSON context.
     * The render method returns a promise that resolves when rendering is complete. Typically render
     * is synchronous and the rendering is complete upon completion of the method. However, when utilizing
     * transitions/animations, the render process can be asynchronous and the promise is useful to know when it has finished.
     * @method render
     * @return {Promise} a promise that when resolved signifies that the rendering process is complete.
     */
    render: function() {
      if (this.isDisposed()) {
        throw new Error('Render called on a view that has already been disposed.');
      }
      var view = this;
      this.trigger('render:begin');
      if (this.prerender() === false) {
        this.trigger('render:aborted');
        return $.Deferred().resolve().promise();
      }
      this.__updateInjectionSiteMap();
      this.trigger('render:before-dom-update');
      this.detachTrackedViews();
      this.updateDOM();
      if (this.__pendingAttachInfo) {
        this.__performPendingAttach();
      }
      this.trigger('render:after-dom-update');
      this.delegateEvents();
      this.trigger('render:after-delegate-events');
      this.trigger('render:before-attach-tracked-views');
      var promises = this.attachTrackedViews();
      return $.when.apply($, _.flatten([promises])).done(function() {
        view.postrender();
        view.trigger('render:complete');
      });
    },

    /**
     * Renders the view only if it is active and part of the DOM.
     * @method renderIfAttached
     */
    renderIfAttached: function() {
      if (this.isActive() && this.isAttached()) {
        this.render();
      }
    },

    /**
     * Hook during render that is invoked before any DOM rendering is performed.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.prerender.apply(this, arguments);
     * NOTE: if you require the view to be detached from the DOM, consider using _detach callback
     * @method prerender
     * @return {Promise or List of Promises} you can optionally return one or more promises that when all are resolved, prerender is finished. Note: render logic will not wait until promises are resolved.
     */
    prerender: _.noop,

    /**
     * Produces and sets this view's elements DOM. Used during the rendering process. Override if you have custom DOM update logic.
     * Defaults to using the stanrdard: this.templateRender(this.$el, this.template, this.prepare(), templateRendererOptions);
     * this.templateRendererOptions is an object or function defined on the view that is passed into the renderer.
     * Examples include: views with no template or multiple templates, or if you wish to use a different rendering engine than the templateRenderer or wish to pass options to it.
     * @method updateDOM
     */
    updateDOM: function() {
      if (this.template) {
        var templateRendererOptions = _.result(this, 'templateRendererOptions');
        this.templateRender(this.$el, this.template, this.prepare(), templateRendererOptions);
      }
    },

    /**
     * Hook during render that is invoked after all DOM rendering is done and tracked views attached.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.postrender.apply(this, arguments);
     * NOTE: if you require the view to be attached to the DOM, consider using _attach callback
     * @method postrender
     * @return {Promise or List of Promises} you can optionally return one or more promises that when all are resolved, postrender is finished. Note: render logic will not wait until promises are resolved.
     */
    postrender: _.noop,

    /**
     * Hotswap rendering system reroute method.
     * @method templateRender
     * See Torso.templateRenderer#render for params
     */
    templateRender: function(el, template, context, opts) {
      opts = opts || {};
      if (_.isString(template)) {
        opts.newHTML = template;
      }
      templateRenderer.render(el, template, context, opts);
    },

    /**
     * Overrides the base delegateEvents
     * Binds DOM events with the view using events hash while also adding feedback event bindings
     * @method delegateEvents
     */
    delegateEvents: function() {
      this.undelegateEvents(); // always undelegate events - backbone sometimes doesn't.
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
     * Overrides undelegateEvents
     * Unbinds DOM events from the view.
     * @method undelegateEvents
     */
    undelegateEvents: function() {
      Backbone.View.prototype.undelegateEvents.call(this);
      _.each(this.getTrackedViews(), function(view) {
        view.undelegateEvents();
      });
    },

    /**
     * If detached, will replace the element passed in with this view's element and activate the view.
     * @param [$el] {jQuery element} the element to attach to. This element will be replaced with this view.
     *                               If options.replaceMethod is provided, then this parameter is ignored.
     * @param [options] {Object} optional options
     * @param   [options.replaceMethod] {Fucntion} if given, this view will invoke replaceMethod function
     *                                             in order to attach the view's DOM to the parent instead of calling $el.replaceWith
     * @param   [options.discardInjectionSite=false] {Booleon} if set to true, the injection site is not saved.
     * @return {Promise} promise that when resolved, the attach process is complete. Normally this method is synchronous. Transition effects can
     *                   make it asynchronous.
     * @method attachTo
     */
    attachTo: function($el, options) {
      options = options || {};
      var view = this;
      if (!this.isAttachedToParent()) {
        this.__pendingAttachInfo = {
          $el: $el,
          options: options
        };
        return this.render().done(function() {
          if (!view.__attachedCallbackInvoked && view.isAttached()) {
            view.__invokeAttached();
          }
          view.__isAttachedToParent = true;
        });
      }
      return $.Deferred().resolve().promise();
    },

    /**
     * Registers the view as a tracked view (defaulting as a child view), then calls view.attachTo with the element argument
     * The element argument can be a String that references an element with the corresponding "inject" attribute.
     * When using attachView with options.useTransition:
     *   Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view
     *   previously had another view at this injections site, this previous view will be removed with that view's transitionOut.
     *   If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even
     *   though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.
     *   If the previous view is the same as the new view, it is injected normally without transitioning in.
     *   The previous view must has used an injection site with the standard "inject=<name of injection site>" attribute to be found.
     *   When the transitionIn and transitionOut methods are invoked on the new and previous views, the options parameter will be passed on to them. Other fields
     *   will be added to the options parameter to allow better handling of the transitions. These include:
     *   {
     *     newView: the new view
     *     previousView: the previous view (can be undefined)
     *     parentView: the parent view transitioning in or out the tracked view
     *   }
     * @param $el {jQuery element or String} the element to attach to OR the name of the injection site. The element with the attribute "inject=<name of injection site>" will be used.
     * @param view   {View}   The instantiated view object to be attached
     * @param [options] {Object} optionals options object. If using transitions, this options object will be passed on to the transitionIn and transitionOut methods as well.
     * @param   [options.noActivate=false] {Boolean} if set to true, the view will not be activated upon attaching.
     * @param   [options.shared=false] {Boolean} if set to true, the view will be treated as a shared view and not disposed during parent view disposing.
     * @param   [options.useTransition=false] {Boolean} if set to true, this method will delegate attach logic to this.__transitionNewViewIntoSite
     * @param   [options.addBefore=false] {Boolean} if true, and options.useTransition is true, the new view's element will be added before the previous view's element. Defaults to after.
     * @param   [options.previousView] {View} if using options.useTransition, then you can explicitly define the view that should be transitioned out.
     *                                        If using transitions and no previousView is provided, it will look to see if a view already is at this injection site and uses that by default.
     * @return {Promise} resolved when all transitions are complete. No payload is provided upon resolution. If no transitions, then returns a resolved promise.
     * @method attachView
     */
    attachView: function($el, view, options) {
      options = options || {};
      var injectionSite, injectionSiteName,
        usesInjectionSiteName = _.isString($el);
      if (usesInjectionSiteName) {
        injectionSiteName = $el;
        injectionSite = this.$('[inject=' + injectionSiteName + ']');
        if (!injectionSite) {
          throw 'View.attachView: No injection site found with which to attach this view. View.cid=' + this.cid;
        }
      } else {
        injectionSite = $el;
      }
      if (options.useTransition) {
        return this.__transitionNewViewIntoSite(injectionSiteName, view, options);
      }
      view.detach();
      this.registerTrackedView(view, options);
      view.attachTo(injectionSite, options);
      if (!options.noActivate) {
        view.activate();
      }
      return $.Deferred().resolve().promise();
    },

    /**
     * Hook to attach all your tracked views. This hook will be called after all DOM rendering is done so injection sites should be available.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.attachTrackedViews.apply(this, arguments);
     * @method attachTrackedViews
     * @return {Promise or List of Promises} you can optionally return one or more promises that when all are resolved, all tracked views are attached. Useful when using this.attachView with useTransition=true.
     */
    attachTrackedViews: _.noop,

    /**
     * Method to be invoked when the view is fully attached to the DOM (NOT just the parent). Use this method to manipulate the view
     * after the DOM has been attached to the document. The default implementation is a no-op.
     * @method _attached
     */
    _attached: _.noop,

    /**
     * @return {Boolean} true if the view is attached to a parent
     * @method isAttachedToParent
     */
    isAttachedToParent: function() {
      return this.__isAttachedToParent;
    },

    /**
     * NOTE: depends on a global variable "document"
     * @return {Boolean} true if the view is attached to the DOM
     * @method isAttached
     */
    isAttached: function() {
      return $.contains(document, this.$el[0]);
    },

    /**
     * If attached, will detach the view from the DOM.
     * This method will only separate this view from the DOM it was attached to, but it WILL invoke the _detach
     * callback on each tracked view recursively.
     * @method detach
     */
    detach: function() {
      var wasAttached;
      if (this.isAttachedToParent()) {
         wasAttached = this.isAttached();
        // Detach view from DOM
        this.trigger('before-dom-detach');
        if (this.injectionSite) {
          this.$el.replaceWith(this.injectionSite);
          this.injectionSite = undefined;
        } else {
          this.$el.detach();
        }
        if (wasAttached) {
          this.__invokeDetached();
        }
        this.undelegateEvents();
        this.__isAttachedToParent = false;
      }
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
     * Method to be invoked when the view is detached from the DOM (NOT just the parent). Use this method to clean up state
     * after the view has been removed from the document. The default implementation is a no-op.
     * @method _detached
     */
    _detached: _.noop,

    /**
     * Resets listeners and events in order for the view to be reattached to the visible DOM
     * @method activate
     */
    activate: function() {
      this.__activateTrackedViews();
      if (!this.isActive()) {
        this.trigger('before-activate-callback');
        this._activate();
        this.__isActive = true;
      }
    },

    /**
     * Method to be invoked when activate is called. Use this method to turn on any
     * custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.
     * @method _activate
     */
    _activate: _.noop,

    /**
     * @return {Boolean} true if the view is active
     * @method isActive
     */
    isActive: function() {
      return this.__isActive;
    },

    /**
     * Maintains view state and DOM but prevents view from becoming a zombie by removing listeners
     * and events that may affect user experience. Recursively invokes deactivate on child views
     * @method deactivate
     */
    deactivate: function() {
      this.__deactivateTrackedViews();
      if (this.isActive()) {
        this.trigger('before-deactivate-callback');
        this._deactivate();
        this.__isActive = false;
      }
    },

    /**
     * Method to be invoked when deactivate is called. Use this method to turn off any
     * custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.
     * @method _deactivate
     */
    _deactivate: _.noop,

    /**
     * Removes all listeners, disposes children views, stops listening to events, removes DOM.
     * After dispose is called, the view can be safely garbage collected. Called while
     * recursively removing views from the hierarchy.
     * @method dispose
     */
    dispose: function() {
      this.trigger('before-dispose-callback');
      this._dispose();

      // Detach DOM and deactivate the view
      this.detach();
      this.deactivate();

      // Clean up child views first
      this.__disposeChildViews();

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
     * @return {Boolean} true if the view was disposed
     * @method isDisposed
     */
    isDisposed: function() {
      return this.__isDisposed;
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
      return !_.isEmpty(this.getTrackedViews(options));
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
      return _.values(this.__getTrackedViewsHash(options));
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
      this.unregisterTrackedView(view);
      if (options.child || !options.shared) {
        this.__childViews[view.cid] = view;
      } else {
        this.__sharedViews[view.cid] = view;
      }
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
     * Override to provide your own transition out logic. Default logic is to just detach from the page.
     * The method is passed a callback that should be invoked when the transition out has fully completed.
     * @method transitionOut
     * @param done {Function} callback that MUST be invoked when the transition is complete.
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
     * The method is passed a callback that should be invoked when the transition in has fully completed.
     * @method transitionIn
     * @param attach {Function} callback to be invoked when you want this view to be attached to the dom.
                                If you are trying to transition in a tracked view, consider using this.transitionInView()
     * @param done {Function} callback that MUST be invoked when the transition is complete.
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
     * Invokes a feedback entry's "then" method
     * @param to {String} the "to" field corresponding to the feedback entry to be invoked.
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

    //************** Private methods **************//

    /**
     * Parses the combined arrays from the defaultPrepareFields array and the prepareFields array (or function
     * returning an array).
     *
     * The default prepared fields are: [ { name: 'view', value: 'viewState' }, 'model' ]
     *
     * Prepared fields can be defined in a couple of ways:
     *   preparedFields = [
     *     'model',
     *     { name: 'app', value: someGlobalCell },
     *     'a value that does not exist on the view',
     *     { name: 'view', value: 'viewState' },
     *     { name: 'patientId', value: '_patientId' },
     *     'objectWithoutToJSON'
     *   ]
     *
     * Will result in the following context (where this === this view and it assumes all the properties on the view
     * that are referenced are defined):
     *   {
     *     model: this.model.toJSON(),
     *     app: someGlobalCell.toJSON(),
     *     view: this.viewState.toJSON(),
     *     patientId: this._patientId,
     *     objectWithoutToJSON: this.objectWithoutToJSON
     *   }
     *
     * Things to be careful of:
     *   * If the view already has a field named 'someGlobalCell' then the property on the view will be used instead of the global value.
     *   * if the prepared field item is not a string or object containing 'name' and 'value' properties, then an exception
     *     will be thrown.
     *   * 'model' and 'view' are reserved field names and cannot be reused.
     *
     * @method __getPrepareFieldsContext
     * @return {Object} context composed of { modelName: model.toJSON() } for every model identified.
     * @private
     */
    __getPrepareFieldsContext: function() {
      var prepareFieldsContext = {};
      var prepareFields = _.result(this, 'prepareFields');
      var defaultPrepareFields = [ { name: 'view', value: 'viewState' }, 'model' ];
      prepareFields = _.union(prepareFields, defaultPrepareFields);
      if (prepareFields && prepareFields.length > 0) {
        for (var fieldIndex = 0; fieldIndex < prepareFields.length; fieldIndex++) {
          var prepareField = prepareFields[fieldIndex];
          var prepareFieldIsSimpleString = _.isString(prepareField);

          var prepareFieldName = prepareField;
          var prepareFieldValue = prepareField;

          if (!prepareFieldIsSimpleString) {
            if (!_.isString(prepareField.name)) {
              throw "prepareFields items need to either be a string or define a .name property that is a simple string to use for the key in the template context.";
            }

            if (_.isUndefined(prepareField.value)) {
              throw "prepareFields items need a value property if it is not a string.";
            }

            prepareFieldName = prepareField.name;
            prepareFieldValue = prepareField.value;
          }
          if (!_.isUndefined(prepareFieldsContext[prepareFieldName])) {
            throw "duplicate prepareFields name (" + prepareFieldName + ").  Note 'view' and 'model' are reserved names.";
          }

          // Note _.result() also returns undefined if the 2nd argument is not a string.
          var prepareFieldValueFromView = _.result(this, prepareFieldValue);
          var prepareFieldValueIsDefinedOnView = !_.isUndefined(prepareFieldValueFromView);
          if (prepareFieldValueIsDefinedOnView) {
            prepareFieldValue = prepareFieldValueFromView;
          }

          if (prepareFieldValue && _.isFunction(prepareFieldValue.toJSON)) {
            prepareFieldsContext[prepareFieldName] = prepareFieldValue.toJSON();
          } else if (!prepareFieldIsSimpleString || prepareFieldValueIsDefinedOnView) {
            prepareFieldsContext[prepareFieldName] = prepareFieldValue;
          }
        }
      }
      return prepareFieldsContext;
    },

    /**
     * Initializes the behaviors
     * @method __initializeBehaviors
     */
    __initializeBehaviors: function(viewOptions) {
      var view = this;
      if (!_.isEmpty(this.behaviors)) {
        view.__behaviorInstances = {};
        _.each(this.behaviors, function(behaviorDefinition, alias) {
          if (!_.has(behaviorDefinition, 'behavior')) {
            behaviorDefinition = {behavior: behaviorDefinition};
          }
          var BehaviorClass = behaviorDefinition.behavior;
          if (!(BehaviorClass && _.isFunction(BehaviorClass))) {
            throw new Error('Incorrect behavior definition. Expected key "behavior" to be a class but instead got ' +
              String(BehaviorClass));
          }

          var behaviorOptions = _.pick(behaviorDefinition, function(value, key) {
            return key !== 'behavior';
          });
          behaviorOptions.view = view;
          behaviorOptions.alias = alias;
          var behaviorAttributes = behaviorDefinition.attributes || {};
          var behaviorInstance = view.__behaviorInstances[alias] = new BehaviorClass(behaviorAttributes, behaviorOptions, viewOptions);
          // Add the behavior's mixin fields to the view's public API
          if (behaviorInstance.mixin) {
            var mixin = _.result(behaviorInstance, 'mixin');
            _.each(mixin, function(field, fieldName) {
              // Default to a view's field over a behavior mixin
              if (_.isUndefined(view[fieldName])) {
                if (_.isFunction(field)) {
                  // Behavior mixin functions will be behavior-scoped - the context will be the behavior.
                  view[fieldName] = _.bind(field, behaviorInstance);
                } else {
                  view[fieldName] = field;
                }
              }
            });
          }
        });
      }
    },

    /**
     * If the view is attaching during the render process, then it replaces the injection site
     * with the view's element after the view has generated its DOM.
     * @method __performPendingAttach
     * @private
     */
    __performPendingAttach: function() {
      this.trigger('before-dom-attach');
      this.__replaceInjectionSite(this.__pendingAttachInfo.$el, this.__pendingAttachInfo.options);
      delete this.__pendingAttachInfo;
    },

    /**
     * Deactivates all tracked views or a subset of them based on the options parameter.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, deactivate only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, deactivate only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method __deactivateTrackedViews
     * @private
     */
    __deactivateTrackedViews: function(options) {
      _.each(this.getTrackedViews(options), function(view) {
        view.deactivate();
      });
    },

    /**
     * Activates all tracked views or a subset of them based on the options parameter.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, activate only the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, activate only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method __activateTrackedViews
     * @private
     */
    __activateTrackedViews: function(options) {
      _.each(this.getTrackedViews(options), function(view) {
        view.activate();
      });
    },

    /**
     * Disposes all child views recursively
     * @method disposeChildViews
     * @private
     */
    __disposeChildViews: function() {
      _.each(this.__childViews, function(view) {
        view.dispose();
      });
    },

    /**
     * Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view
     * previously had another view at this injections site, this previous view will be removed with that view's transitionOut.
     * If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even
     * though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.
     * If the previous view is the same as the new view, it is injected normally without transitioning in.
     * The previous view must has used an injection site with the standard "inject=<name of injection site>" attribute to be found.
     * @method transitionNewViewIntoSite
     * @private
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
    __transitionNewViewIntoSite: function(injectionSiteName, newView, options) {
      var previousView, injectionSite;
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
        return this.attachView(injectionSiteName, newView, options);
      }
      if (!previousView) {
        // Only transition in the new current view and find the injection site.
        injectionSite = this.$('[inject=' + injectionSiteName + ']');
        return this.__transitionInView(injectionSite, newView, options);
      }
      return this.__performTwoWayTransition(injectionSiteName, previousView, newView, options);
    },

    /**
     * Will transition out previousView at the same time as transitioning in newView.
     * @method __performTwoWayTransition
     * @param injectionSiteName {String} The name of the injection site in the template. This is the value corresponding to the attribute "inject".
     * @param previousView {View} the view that should be transitioned out.
     * @param newView {View} The view that should be transitioned into the injection site
     * @param [options] {Object} optional options object. This options object will be passed on to the transitionIn and transitionOut methods as well.
     * @param   [options.addBefore=false] {Boolean} if true, the new view's element will be added before the previous view's element. Defaults to after.
     * @return {Promise} resolved when all transitions are complete. No payload is provided upon resolution.
     * @private
     */
    __performTwoWayTransition: function(injectionSiteName, previousView, newView, options) {
      var newInjectionSite, currentPromise,
        previousDeferred = $.Deferred();
      this.attachView(injectionSiteName, previousView, options);
      options.cachedInjectionSite = previousView.injectionSite;
      newInjectionSite = options.newInjectionSite = $('<span inject="' + injectionSiteName + '">');
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
      currentPromise = this.__transitionInView(newInjectionSite, newView, options);

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
     * @private
     */
    __transitionInView: function($el, newView, options) {
      var currentDeferred = $.Deferred(),
        parentView = this;
      options = _.extend({}, options);
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
     * Gets the hash from id to tracked views. You can limit the subset of views returned based on the options passed in.
     * NOTE: returns READ-ONLY snapshots. Updates to the returned cid->view map will not be saved nor will updates to the underlying maps be reflected later in returned objects.
     * This means that you can add "add" or "remove" tracked view using this method, however you can interact with the views inside the map completely.
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} If true, will add the shared views. These are views not owned by this parent. As compared to a child view
     *                                           which are disposed when the parent is disposed.
     *   @param [options.child=false] {Boolean} If true, will add child views. These are views that are owned by the parent and dispose of them if the parent is disposed.
     * @method __getTrackedViewsHash
     * @return READ-ONLY snapshot of the object maps cotaining tracked views keyed by their cid (filtered by optional options parameter).
     * @private
     */
    __getTrackedViewsHash: function(options) {
      var views = {};
      options = options || {};
      if (options.shared) {
        views = _.extend(views, this.__sharedViews);
      }
      if (options.child) {
        views = _.extend(views, this.__childViews);
      }
      if (!options.child && !options.shared) {
        views = _.extend(views, this.__sharedViews, this.__childViews);
      }
      return views;
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
          return view.injectionSite && view.injectionSite.attr('inject') == injectionSiteName;
        });
        previousView = _.first(matchingViews);
      }
      return previousView;
    },

    /**
     * Replaces the injection site element passed in using $el.replaceWith OR you can use your own replace method
     * @method __replaceInjectionSite
     * @param $el {jQuery Element} the injection site element to be replaced
     * @param [options] {Object} Optional options
     * @param   [options.replaceMethod] {Function} use an alternative replace method. Invoked with the view's element as the argument.
     * @param   [options.discardInjectionSite=false] {Boolean} if true, the view will not save a reference to the injection site after replacement.
     * @private
     */
    __replaceInjectionSite: function($el, options) {
      options = options || {};
      this.injectionSite = options.replaceMethod ? options.replaceMethod(this.$el) : $el.replaceWith(this.$el);
      if (options.discardInjectionSite) {
        this.injectionSite = undefined;
      }
    },

    /**
     * Call this method when a view is attached to the DOM. It is recursive to child views, but checks whether each child view is attached.
     * @method __invokeAttached
     * @private
     */
    __invokeAttached: function() {
      // Need to check if each view is attached because there is no guarentee that if parent is attached, child is attached.
      if (!this.__attachedCallbackInvoked) {
        this.trigger('before-attached-callback');
        this._attached();
        this.__attachedCallbackInvoked = true;
        _.each(this.getTrackedViews(), function(view) {
          if (view.isAttachedToParent()) {
            view.__invokeAttached();
          }
        });
      }
    },

    /**
     * Call this method when a view is detached from the DOM. It is recursive to child views.
     * @method __invokeDetached
     */
    __invokeDetached: function() {
      if (this.__attachedCallbackInvoked) {
        this.trigger('before-detached-callback');
        this._detached();
        this.__attachedCallbackInvoked = false;
      }
      _.each(this.getTrackedViews(), function(view) {
        // If the tracked view is currently attached to the parent, then invoke detatched on it.
        if (view.isAttachedToParent()) {
          view.__invokeDetached();
        }
      });
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

      // Cleanup previous "on" and "listenTo" events
      for (i = 0; i < this.__feedbackOnEvents.length; i++) {
        this.off(null, this.__feedbackOnEvents[i]);
      }
      for (i = 0; i < this.__feedbackListenToEvents.length; i++) {
        var feedbackListenToConfig = this.__feedbackListenToEvents[i];
        this.stopListening(feedbackListenToConfig.obj, feedbackListenToConfig.name, feedbackListenToConfig.callback);
      }
      this.__feedbackOnEvents = [];
      this.__feedbackListenToEvents = [];

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
              var invokeThen = self.__generateThenCallback(bindInfo, eventKey);
              self.on(eventKey, invokeThen, self);
              self.__feedbackOnEvents.push(invokeThen);
            });
            // Special "listenTo" listeners
            _.each(declaration.when.listenTo, function(listenToConfig) {
              var obj = listenToConfig.object;
              if (_.isFunction(obj)) {
                obj = _.bind(listenToConfig.object, self)();
              } else if (_.isString(obj)) {
                obj = _.result(self, listenToConfig.object);
              }
              if (obj) {
                var invokeThen = _.bind(self.__generateThenCallback(bindInfo, listenToConfig.events), self);
                self.listenTo(obj, listenToConfig.events, invokeThen);
                self.__feedbackListenToEvents.push({
                  object: obj,
                  name: listenToConfig.events,
                  callback: invokeThen
                });
              }
            });
          });
        });
      });
    },


    /**
     * Returns a properly wrapped "then" using a configuration object "bindInfo" and an "eventKey" that will be passed as the type
     * @param bindInfo {Object}
     * @param   bindInfo.feedbackCellField the property name of the feedback cell to store the "then" instructions
     * @param   bindInfo.fn the original "then" function
     * @param   [bindInfo.indices] the index map
     * @return {Function} the properly wrapped "then" function
     * @private
     * @method __generateThenCallback
     */
    __generateThenCallback: function(bindInfo, eventKey) {
      return function() {
        var result,
            args = [{
              args: arguments,
              type: eventKey
            }];
        args.push(bindInfo.indices);
        result = bindInfo.fn.apply(this, args);
        this.__processFeedbackThenResult(result, bindInfo.feedbackCellField);
      };
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

        if (whenField !== 'on' || whenField !== 'listenTo') {
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

    //************** End Private methods **************//
  });

  return View;
}));
