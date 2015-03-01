(function(root, factory) {
    if (typeof define === "function" && define.amd) {
      define(["torso", "formModel", "underscore", "jquery"], factory);
    } else if (typeof exports === "object") {
      factory(require("torso"), require("formModel"), require("underscore"), module.exports);
    } else {
      factory(root.Torso, root.Torso.Models.Form, root._, (root.jQuery || root.Zepto || root.ender || root.$), {});
    };
  }(this, function(Torso, TorsoFormModel, _, $, FormView) {
    "use strict;"

    /**
     * Generic Form View
     * @module    Torso
     * @namespace Torso.Views
     * @class     Form
     * @constructor
     * @author ariel.wexler@vecna.com
     */
    TorsoFormView = Torso.View.extend({
      /**
       * Validation error hash
       * @private
       * @property _errors
       * @type Object
       **/
      /**
       * Validation success
       * @private
       * @property _success
       * @type Boolean
       **/
      /**
       * Stickit bindings hash local backup
       * @private
       * @property _bindings
       * @type Object
       */
      /**
       * Handlebars template for form
       * @property template
       * @type HTMLtemplate
       **/
      /**
       * Backbone events hash
       * @property events
       * @type Object
       **/
      /**
       * Two-way binding field customization
       * @property fields
       * @type Object
       **/
      /**
       * Stickit bindings hash
       * @property bindings
       * @type Object
       **/

      /**
       * Initialize the form view object.
       * Override to add more functionality
       * @method initialize
       * @param args {Object} - options argument
       * @param args.model       {Torso.Models.Form} - requires a form model for binding
       * @param [args.template]  {HTML Template} - overrides the template used by this view
       * @param [args.events]    {Events Hash} - merge + override the events hash used by this view
       * @param [args.fields]    {Field Hash} - merge + override automated two-way binding field hash used by this view
       * @param [args.bindings]  {Binding Hash} - merge + override custom epoxy binding hash used by this view
       */
      initialize: function(args) {
        this.super();

        args = args || {};

        /* Listen to model validation callbacks */
        this.feedbackModel = new Backbone.Model();
        this.model = this.model || (new TorsoFormModel());
        this.listenTo(this.model, 'validated:valid', this.valid);
        this.listenTo(this.model, 'validated:invalid', this.invalid);

        /* Override template */
        this.template = args.template || this.template;

        /* Merge events, fields, bindings, and computeds */
        this.events = _.extend({}, this.events || {}, args.events || {});
        this.fields = _.extend({}, this.fields || {}, args.fields || {});
        this._errors = [];
        this._success = false;
        this._feedbackEvents = [];
        // this._bindings is a snapshot of the original bindings
        this._bindings = _.extend({}, this.bindings || {}, args.bindings || {});

        /* Render */
        this.render();
      },

      /**
       * Prepare the formview's default render context
       * @method prepare
       * @return {Object}
       *         {Object.errors} A hash of field names mapped to error messages
       *         {Object.success} A boolean value of true if validation has succeeded
       */
      prepare: function() {
        return {
          model: this.model.toJSON(),
          formErrors: (_.size(this._errors) !== 0) ? this._errors : null,
          formSuccess: this._success
        };
      },

      /**
       * Render the formview, delegate the view events, apply two-way bindings,
       * and finally attach the additional plugins.
       * @method render
       */
      render: function() {
        /* Actually render the template */
        var context = this.prepare();
        this.templateRender(this.$el, this.template, context);
        this.delegateEvents();
        this.plug();
      },

      /**
       * Override the delegate events and wrap our custom additions
       * @method delegateEvents
       */
      delegateEvents: function() {
        /* DOM event bindings and plugins */
        this._generateStickitBindings();
        this.stickit();
        Torso.View.prototype.delegateEvents.call(this);
        this._generateFeedbackBindings();
        this._generateFeedbackModelCallbacks();
      },

      /**
       * After all DOM rendering is done, this method is called and attaches any
       * custom plugins to the existing elements.  This method can be overwritten
       * as usual OR extended using <class>.__super__.plug.apply(this, arguments);
       * @method plug
       */
      plug: function() {
        // If the "chosen.js" plugin exists
        var selectApplyChosen = this.$el.find('select');
        if (selectApplyChosen.chosen) {
          selectApplyChosen.chosen({});
        }
      },

      /**
       * Default method called on validation success.
       * @method valid
       */
      valid: function() {
        this._success = true;
        this._errors = [];
        this.render();
      },

      /**
       * Default method called on validation failure.
       * @method valid
       */
      invalid: function(model, errors) {
        this._success = false;
        this._errors = errors;
        this.render();
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
          feedbackToInvoke = _.findWhere(this.feedback, {to: to}),
          feedbackModelField = to;
        if (feedbackToInvoke) {
          if (indexMap) {
            feedbackModelField = this._substituteIndicesUsingMap(to, indexMap);
          }
          result = feedbackToInvoke.then.call(this, evt, indexMap);
          this._processFeedbackThenResult(result, feedbackModelField);
        }
      },

      /**
       * Dispose method that intelligently removes any newly allocated
       * resources or event bindings then calls the super class.
       * @method valid
       */
      dispose: function() {
        this.unstickit();
        TorsoFormView.__super__.dispose.apply(this, arguments);
      },

      /**
       * Selects all data-model references in this view's DOM, and creates stickit bindings
       * @method _generateStickitBindings
       * @private
       */
      _generateStickitBindings: function() {
        var self = this;
        // Start by removing all old bindings and falling back to the initialized binding contents
        this.bindings = _.extend({}, this._bindings);

        // Stickit model two-way bindings
        _.each(this.$el.find('[data-model]'), function(element) {
          var attr = $(element).data('model'),
              options = self._getFieldOptions(attr),
              fieldBinding = self._generateModelFieldBinding(attr, options);
          self.bindings['[data-model="' + attr + '"]'] = fieldBinding;
        });
      },

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
       * @method _generateFeedbackModelCallbacks
       */
      _generateFeedbackModelCallbacks: function() {
        var self = this;
        // Feedback one-way bindings
        self.feedbackModel.off();
        _.each(this.$el.find('[data-feedback]'), function(element) {
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
                if (_.isArray(value)) {
                  $element[key].apply($element, value);
                } else {
                  $element[key].call($element, value);
                }
              });
            };
          },
          onGet: function(value) {
            var params = [value];
            params.push(indices);
            params = _.flatten(params);
            return options.viewFormat ? options.viewFormat.apply(this, params) : value;
          }
        };
      },

      /**
       * Creates the "when" bindings, and collates and invokes the "then" methods for all feedbacks
       * Finds all feedback zones that match the "to" field, and binds the "when" events to invoke the "then" method
       * @private
       * @method _generateFeedbackBindings
       */
      _generateFeedbackBindings: function() {
        var self = this;

        // Cleanup previous "on" events
        for (var i = 0; i < this._feedbackEvents.length; i++) {
          this.off(null, this._feedbackEvents[i]);
        }
        this._feedbackEvents = [];

        // For each feedback configuration
        _.each(this.feedback, function(declaration) {
          var destinations = self._getFeedbackDestinations(declaration.to),
            destIndexTokens = self._getAllIndexTokens(declaration.to);

          // Iterate over all destinations
          _.each(destinations, function(dest) {
            var fieldName, indices, indexMap, then, args, method, whenEvents, bindInfo;
            dest = $(dest);
            fieldName = dest.data('feedback');
            indices = self._getAllIndexTokens(fieldName);
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
          },

            // track the indices for binding
            bindInfo = {
              feedbackModelField: fieldName,
              fn: then,
              indices: indexMap
            };
            // Iterate over all "when" clauses
            whenEvents = self._generateWhenEvents(declaration.when, indexMap);
            _.each(whenEvents, function(eventKey) {
              var invokeThen = function(evt) {
                var i, args, result;
                args = [evt];
                newState = {};
                args.push(bindInfo.indices);
                result = bindInfo.fn.apply(self, args);
                self._processFeedbackThenResult(result, bindInfo.feedbackModelField);
              };
              var delegateEventSplitter = /^(\S+)\s*(.*)$/;
              var match = eventKey.match(delegateEventSplitter);
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
                self._processFeedbackThenResult(result, bindInfo.feedbackModelField);
              };
              self.on(eventKey, invokeThen, self);
              self._feedbackEvents.push(invokeThen);
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
       * @method _getFeedbackDestinations
       */
      _getFeedbackDestinations: function(dest) {
        var self = this,
            strippedField = this._stripAllAttribute(dest),
            destPrefix = dest,
            firstArrayIndex = dest.indexOf('[');
        if (firstArrayIndex > 0) {
          destPrefix = dest.substring(0, firstArrayIndex);
        }
        // Tries to match as much as possible by using a prefix (the string before the array notation)
        return this.$el.find('[data-feedback^="' + destPrefix + '"]').filter(function() {
          // Only take the elements that actually match after the array notation is converted to open notation ([x] -> [])
          return self._stripAllAttribute($(this).data('feedback')) === strippedField;
        });
      },

      /**
       * Generates the events needed to listen to the feedback's when methods. A when event is only created
       * if the appropriate element exist on the page
       * @param whenMap the collection of "when"'s for a given feedback
       * @param indexMap map from variable names to values when substituting array notation
       * @return the events that were generated
       * @private
       * @method _generateWhenEvents
       */
      _generateWhenEvents: function(whenMap, indexMap) {
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
              substitutedWhenField = self._substituteIndicesUsingMap(whenField, indexMap);
              qualifiedFields = _.flatten(self._generateSubAttributes(substitutedWhenField, self.model));
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
       * Generates an array of all the possible field accessors and their indices when using
       * the "open" array notation:
       *    foo[] -> ['foo[0]', 'foo[1]'].
       * Will also perform nested arrays:
       *    foo[][] -> ['foo[0][0]', foo[1][0]']
       * @method _generateSubAttributes
       * @private
       * @param {String} attr The name of the attribute to expand according to the bound model
       * @return {Array<String>} The fully expanded subattribute names
       */
      _generateSubAttributes: function(attr, model) {
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
            subAttrs.push(this._generateSubAttributes(attrName + '[' + i + ']' + remainder, model));
          }
          return subAttrs;
        }
      }
    });

    Torso.Views.Form = TorsoFormView;
    return TorsoFormView;
  })
);
