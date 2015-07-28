(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './templateRenderer', './Cell', './Logger'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./templateRenderer'), require('./Cell'), require('./Logger'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.View = factory(root._, root.Backbone, root.Torso.Utils.templateRenderer, root.Torso.Cell, root.Torso.Logger);
  }
}(this, function(_, Backbone, templateRenderer, Cell, Logger) {
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
    feedbackModel: null,
    __childViews: null,
    __isActive: false,
    __isAttachedToParent: false,
    __isDisposed: false,
    __feedbackEvents: null,
    /**
     * Array of feedback when-then-to's. Example:
     * [{
     *   when: {'@fullName': ['change']},
     *   then: function(event) { return {text: this.feedbackModel.get('fullName')};},
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
      this.feedbackModel = new Cell();
      this.__childViews = {};
      this.__feedbackEvents = [];
      Backbone.View.apply(this, arguments);
      if (!options.noActivate) {
        this.activate();
      }
      
      this.updateDelegateEvents();
    },

    updateDelegateEvents: function(){
      var backboneDelegateEvents = Backbone.View.prototype.delegateEvents;
      Backbone.View.prototype.delegateEvents = function(events){
        var delegateEventSplitter = /^(\S+)\s*(.*)$/;
        if (!(events || (events = _.result(this, 'events')))) return this;
        this.undelegateEvents();

        var trackEvents = function(method){
          var self = this;
          var methodCopy = method;
          var eventInfo = {};
          eventInfo.UUID = "uuid-"+(new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
          eventInfo.type = "click";

          method = _.bind(function(){
            eventInfo.before = Date.now();
            methodCopy.call(self);
            eventInfo.after = Date.now();
            eventInfo.loadTime = eventInfo.after-eventInfo.before;
            Logger.track(eventInfo);
          },this);

          return method;
          };

        for (var key in events) {
          var method = events[key];
          if (!_.isFunction(method)) method = this[events[key]];
          if (!method) continue;

          var match = key.match(delegateEventSplitter);
          var eventName = match[1], selector = match[2];

          trackEvents = _.bind(trackEvents,this);
          method = trackEvents(method);          

          eventName += '.delegateEvents' + this.cid;
          if (selector === '') {
            this.$el.on(eventName, method);
          } else {
            this.$el.on(eventName, selector, method);
          }
        }
        return this;
      };
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
      
      var eventInfo = {};
      eventInfo.UUID = "uuid-"+(new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
      eventInfo.before = Date.now();
      eventInfo.type = "templateRender";      

      this.detachChildViews();
      templateRenderer.render(el, template, context, opts);

      eventInfo.after = Date.now();
      eventInfo.loadTime = eventInfo.after-eventInfo.before;
      Logger.track(eventInfo);      

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
      this.__generateFeedbackModelCallbacks();
      _.each(this.__childViews, function(view) {
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
    },

    /**
     * Attaches a child view by finding the element with the attribute inject=<injectionSite>
     * Invokes attachChildView as the bulk of the functionality
     * @method injectView
     * @param injectionSite {String} The name of the injection site in the layout template
     * @param view          {View}   The instantiated view object to
     * @param [options] {Object} optionals options object
     * @param   [options.noActivate=false] {Boolean} if set to true, the child view will not be activated upon attaching.
     */
    injectView: function(injectionSite, view, options) {
      var injectionPoint = this.$('[inject=' + injectionSite + ']');
      if (view && injectionPoint.size() > 0) {
        this.attachChildView(injectionPoint, view, options);
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
        this.__isAttachedToParent = true;
      }
    },

    /**
     * Maintains view state and DOM but prevents view from becoming a zombie by removing listeners
     * and events that may affect user experience. Recursively invokes deactivate on child views
     * @method deactivate
     */
    deactivate: function() {
      this.deactivateChildViews();
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
      this.activateChildViews();
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
     * Registers the child view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the child view
     * @param [options] {Object} optionals options object
     * @param   [options.noActivate=false] {Boolean} if set to true, the child view will not be activated upon attaching.
     * @method attachChildView
     */
    attachChildView: function($el, view, options) {
      options = options || {};
      view.detach();
      this.registerChildView(view);
      view.attach($el);
      if (!options.noActivate) {
        view.activate();
      }
    },

    /**
     * @return {Boolean} true if this view has child views
     * @method hasChildViews
     */
    hasChildViews: function() {
      return !_.isEmpty(this.__childViews);
    },

    /**
     * @return all of the child views this list view has registered
     * @method getChildViews
     */
    getChildViews: function() {
      return _.values(this.__childViews);
    },

    /**
     * Returns the view that corresponds to the cid
     * @param viewCID {cid} the view cid
     * @return the child view corresponding to the cid
     * @method getChildView
     */
    getChildView: function(viewCID) {
      return this.__childViews[viewCID];
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
     * Deactivates all child views recursively
     * @method deactivateChildViews
     */
    deactivateChildViews: function() {
      _.each(this.__childViews, function(view) {
        view.deactivate();
      });
    },

    /**
     * Detach all child views. NOTE: this is not recursive - it will not separate the entire view tree.
     * @method detachChildViews
     */
    detachChildViews: function() {
      _.each(this.__childViews, function(view) {
        view.detach();
      });
    },

    /**
     * Activates all child views
     * @method activateChildViews
     */
    activateChildViews: function() {
      _.each(this.__childViews, function(view) {
        view.activate();
      });
    },

    /**
     * Binds the view as a child view - any recursive calls like activate, deactivate, or dispose will
     * be done to the child view as well.
     * @param view {View} the child view
     * @method registerChildView
     */
    registerChildView: function(view) {
      this.__childViews[view.cid] = view;
    },

    /**
     * Unbinds the child view - no recursive calls will be made to this child view
     * @param view {View} the child view
     * @method unregisterChildView
     */
    unregisterChildView: function(view) {
      delete this.__childViews[view.cid];
    },

    /**
     * Unregisters all child views
     * @method unregisterChildViews
     */
    unregisterChildViews: function() {
      _.each(this.__childViews, function(view) {
        this.unregisterChildView(view);
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
        feedbackModelField = to;
      if (feedbackToInvoke) {
        if (indexMap) {
          feedbackModelField = this.__substituteIndicesUsingMap(to, indexMap);
        }
        result = feedbackToInvoke.then.call(this, evt, indexMap);
        this.__processFeedbackThenResult(result, feedbackModelField);
      }
    },

    /************** Private methods **************/

    /**
     * Generates callbacks for changes in feedback model fields
     * 'change fullName' -> invokes all the jQuery (or $) methods on the element as stored by the feedback model
     * If feedbackModel.get('fullName') returns:
     * { text: 'my text',
     *   attr: {class: 'newClass'}
     *   hide: [100, function() {...}]
     * ...}
     * Then it will invoke $element.text('my text'), $element.attr({class: 'newClass'}), etc.
     * @private
     * @method __generateFeedbackModelCallbacks
     */
    __generateFeedbackModelCallbacks: function() {
      var self = this;
      // Feedback one-way bindings
      self.feedbackModel.off();
      _.each(this.$('[data-feedback]'), function(element) {
        var attr = $(element).data('feedback');
        self.feedbackModel.on('change:' + attr, (function(field) {
          return function() {
            var $element,
              state = self.feedbackModel.get(field);
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
      _.each(self.feedbackModel.attributes, function(value, attr) {
        self.feedbackModel.trigger('change:' + attr);
      });
    },

    /**
     * Processes the result of the then method. Adds to the feedback model.
     * @param result {Object} the result of the then method
     * @param feedbackModelField {Object} the name of the feedbackModelField, typically the "to" value.
     * @private
     * @method __processFeedbackThenResult
     */
    __processFeedbackThenResult: function(result, feedbackModelField) {
      var newState = $.extend({}, result);
      this.feedbackModel.set(feedbackModelField, newState, {silent: true});
      this.feedbackModel.trigger('change:' + feedbackModelField);
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
              feedbackModelField: fieldName,
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
                  self.__processFeedbackThenResult(result, bindInfo.feedbackModelField);
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
                self.__processFeedbackThenResult(result, bindInfo.feedbackModelField);
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

    /************** End Feedback **************/
  });

  return View;
}));
