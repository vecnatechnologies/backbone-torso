(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'backbone', './templateRenderer', './Cell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'), require('backbone'), require('./templateRenderer'), require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.View = factory(root._, root.$, root.Backbone, root.Torso.Utils.templateRenderer, root.Torso.Cell);
  }
}(this, function(_, $, Backbone, templateRenderer, Cell) {
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
      this.viewState = new Cell();
      this.feedbackCell = new Cell();
      this.__childViews = {};
      this.__sharedViews = {};
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
      this.unplug();
      if (this.template) {
        this.templateRender(this.$el, this.template, this.prepare());
      }
      this.plug();
      this.delegateEvents();
    },

    /**
     * Hotswap rendering system reroute method.
     * @method templateRender
     * See Torso.templateRenderer#render for params
     */
    templateRender: function(el, template, context, opts) {
      // Detach just this view's child views for a more effective hotswap.
      // The child views will be reattached by the render method.
      this.detachTrackedViews({ shared: false });
      // Detach just this view's shared views for a more effective hotswap.
      // The shared views will be reattached by the render method.
      this.detachTrackedViews({ shared: true });
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
      _.each(this.__childViews, function(view) {
        if (view.isAttachedToParent()) {
          view.delegateEvents();
        }
      });
      _.each(this.__sharedViews, function(view) {
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
      _.each(this.__childViews, function(view) {
        view.undelegateEvents();
      });
      _.each(this.__sharedViews, function(view) {
        view.undelegateEvents();
      });
    },

    /**
     * Attaches a child view by finding the element with the attribute inject=<injectionSite>
     * Invokes attachChildView as the bulk of the functionality
     * @method injectView
     * @param injectionSite {String} The name of the injection site in the layout template
     * @param view          {View}   The instantiated view object to
     * @param [options] {Object} optionals options object
     * @param   [options.noActivate=false] {Boolean} if set to true, the view will not be activated upon attaching.
     */
    injectView: function(injectionSite, view, options) {
      var injectionPoint = this.$('[inject=' + injectionSite + ']');
      if (view && injectionPoint.size() > 0) {
        this.attachView(injectionPoint, view, options);
      }
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
     * @param $el [jQuery element] the element to attach to. This element will be replaced will this view
     * @method attach
     */
    attach: function($el) {
      if (!this.isAttachedToParent()) {
        this.render();
        this.injectionSite = $el.replaceWith(this.$el);
        this.delegateEvents();
        if (!this.__attachedCallbackInvoked && this.isAttached()) {
          this.invokeAttached();
        }
        this.__isAttachedToParent = true;
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
     * Before any DOM rendering is done, this method is called and removes any
     * custom plugins including events that attached to the existing elements.
     * This method can be overwritten as usual OR extended using <baseClass>.prototype.plug.apply(this, arguments);
     * NOTE: if you require the view to be detached from the DOM, consider using _detach callback
     * @method unplug
     */
    unplug: _.noop,

    /**
     * After all DOM rendering is done, this method is called and attaches any
     * custom plugins to the existing elements.  This method can be overwritten
     * as usual OR extended using <baseClass>.prototype.plug.apply(this, arguments);
     * NOTE: if you require the view to be attached to the DOM, consider using _attach callback
     * @method plug
     */
    plug: _.noop,

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
        return this.__sharedViews;
      } else {
        return this.__childViews;
      }
    },

    /**
     * Registers the child or shared view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the view
     * @param [options] {Object} optionals options object
     *   @param [options.noActivate=false] {Boolean} if set to true, the view will not be activated upon attaching.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @method attachView
     */
    attachView: function($el, view, options) {
      options = options || {};
      view.detach();
      this.registerTrackedView(view, options);
      view.attach($el);
      if (!options.noActivate) {
        view.activate();
      }
    },

    /**
     * Registers the child view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the child view
     * @param [options] {Object} optionals options object
     * @param   [options.noActivate=false] {Boolean} if set to true, the child view will not be activated upon attaching.
     * @method attachChildView
     * @deprecated 0.3.x - use this.attachView($el, view, { shared: false }); instead
     */
    attachChildView: function($el, view, options) {
      _.extend(options, { shared: false });
      this.attachView($el, view, options);
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
     * @return {Boolean} true if this view has child views
     * @method hasChildViews
     * @deprecated 0.3.x - use this.hasTrackedViews({ shared: false }); instead
     */
    hasChildViews: function() {
      return this.hasTrackedViews({ shared: false });
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
     * @return all of the child views this list view has registered
     * @method getChildViews
     * @deprecated 0.3.x - use this.getTrackedViews({ shared: false }); instead
     */
    getChildViews: function() {
      return this.getTrackedViews({ shared: false });
    },

    /**
     * @return the view with the given cid.  Will look in both shared and tracked views.
     * @method getTrackedView
     */
    getTrackedView: function(viewCID) {
      var childView = this.__childViews[viewCID],
          sharedView = this.__sharedViews[viewCID];
      return childView || sharedView;
    },

    /**
     * Returns the view that corresponds to the cid
     * @param viewCID {cid} the view cid
     * @return the child view corresponding to the cid
     * @method getChildView
     * @deprecated 0.3.x - use this.getTrackedView(viewCID); instead
     */
    getChildView: function(viewCID) {
      return this.getTrackedView(viewCID);
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
     * Deactivates all tracked views (either all shared or all child views based on options.shared).
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
     * Deactivates all child views recursively
     * @method deactivateChildViews
     * @deprecated 0.3.x - use this.deactivateTrackedViews({ shared: false }); instead
     */
    deactivateChildViews: function() {
      this.deactivateTrackedViews({ shared: false });
    },

    /**
     * Detach all shared views (either all shared or all child views based on options.shared).
     * NOTE: this is not recursive - it will not separate the entire view tree.
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
     * Detach all child views. NOTE: this is not recursive - it will not separate the entire view tree.
     * @method detachChildViews
     * @deprecated 0.3.x - use this.detachTrackedViews({ shared: false }); instead
     */
    detachChildViews: function() {
      this.detachTrackedViews({ shared: false });
    },

    /**
     * Activates all tracked views (either all shared or all child views based on options.shared).
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
     * Activates all child views
     * @method activateChildViews
     * @deprecated 0.3.x - use this.activateTrackedViews({ shared: false }); instead
     */
    activateChildViews: function() {
      this.activateTrackedViews({ shared: false });
    },

    /**
     * Binds the view as a tracked view - any recursive calls like activate, deactivate, or dispose will
     * be done to the tracked view as well.  Except dispose for shared views.
     *
     * @param view {View} the tracked view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @return {View} the tracked view
     * @method registerTrackedView
     */
    registerTrackedView: function(view, options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      trackedViewsHash[view.cid] = view;
      return view;
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
     * Unbinds the tracked view - no recursive calls will be made to this shared view
     * @param view {View} the shared view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @return {View} the tracked view
     * @method unregisterTrackedView
     */
    unregisterTrackedView: function(view, options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      delete trackedViewsHash[view.cid];
      return view;
    },

    /**
     * Unbinds the child view - no recursive calls will be made to this child view
     * @param view {View} the child view
     * @method unregisterChildView
     * @deprecated 0.3.x - use this.unregisterTrackedView(view, { shared: false }); instead
     */
    unregisterChildView: function(view) {
      return this.unregisterTrackedView(view, { shared: false });
    },

    /**
     * Unbinds all tracked view - no recursive calls will be made to this shared view
     * (either all shared or all child views based on options.shared).
     * @param view {View} the shared view
     * @param [options={}] {Object}  Optional options.
     *   @param [options.shared=false] {Boolean} The view is a shared view instead of a child view
     *                                           (shared views are not disposed when the parent is disposed)
     * @return {View} the tracked view
     * @method unregisterTrackedView
     */
    unregisterTrackedViews: function(options) {
      var trackedViewsHash = this.__getTrackedViewsHash(options);
      _.each(trackedViewsHash, function(view) {
        this.unregisterTrackedView(view, options);
      }, this);
    },

    /**
     * Unregisters all child views
     * @method unregisterChildViews
     * @deprecated 0.3.x - use this.unregisterTrackedViews({ shared: false }); instead
     */
    unregisterChildViews: function() {
      this.unregisterTrackedViews({ shared: false });
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
        _.each(this.__childViews, function(view) {
          if (view.isAttachedToParent()) {
            view.invokeAttached();
          }
        });
        _.each(this.__sharedViews, function(view) {
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
      _.each(this.__childViews, function(view) {
        view.invokeDetached();
      });
      _.each(this.__sharedViews, function(view) {
        view.invokeDetached();
      });
    },

    /************** Private methods **************/

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
