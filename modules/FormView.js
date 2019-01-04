(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './View', './FormModel', './Cell', 'backbone.stickit'], factory);
  } else if (typeof exports === 'object') {
    require('backbone.stickit');
    module.exports = factory(require('underscore'), require('backbone'), require('./View'), require('./FormModel'), require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.FormView = factory(root._, root.Backbone, root.Torso.View, root.Torso.FormModel, root.Torso.Cell);
  }
}(this, function(_, Backbone, View, FormModel, Cell) {
  'use strict';

  var $ = Backbone.$;

  /**
   * Generic Form View
   *
   * @class FormView
   * @extends View
   *
   * @param {Object} args - options argument
   * @param {FormModel} [args.model=new this.FormModelClass()] - a form model for binding that defaults to class-level
                                                                  model or instantiates a FormModelClass
   * @param {Function} [args.FormModelClass=FormModel] - the class (that extends {@link FormModel}) that will be used as the FormModel. Defaults to a class-level
                                                    definition or {@link FormModel} if none is provided
   * @param {external:Handlebars-Template} [args.template] - overrides the template used by this view
   * @param {Object} [args.events] - events hash: merge + override the events hash used by this view
   * @param {Object} [args.fields] - field hash: merge + override automated two-way binding field hash used by this view
   * @param {Object} [args.bindings] - binding hash: merge + override custom epoxy binding hash used by this view
   *
   * @author ariel.wexler@vecna.com
   *
   * @see <a href="../annotated/modules/FormView.html">FormView Annotated Source</a>
   */
  var FormView = View.extend(/** @lends FormView.prototype */{
    /**
     * Validation error hash
     * @private
     * @property _errors
     * @type Object
     */
    /**
     * Validation success
     * @private
     * @property _success
     * @type Boolean
     */
    /**
     * Stickit bindings hash local backup
     * @private
     * @name _bindings
     * @memberof FormView
     * @instance
     * @type Object
     */
    /**
     * Handlebars template for form
     * @name template
     * @memberof FormView
     * @instance
     * @type external:Handlebars-Template
     */
    /**
     * Backbone events hash
     * @name events
     * @memberof FormView
     * @instance
     * @type Object
     */
    /**
     * Two-way binding field customization
     * @name fields
     * @memberof FormView
     * @instance
     * @type Object
     */
    /**
     * Stickit bindings hash
     * @name bindings
     * @memberof FormView
     * @instance
     * @type Object
     */
    /**
     * The class to be used when instantiating the form model
     * @name FormModelClass
     * @memberof FormView
     * @instance
     * @type {FormModel.prototype}
     */
    constructor: function(args) {
      args = args || {};

      /* Listen to model validation callbacks */
      var FormModelClass = args.FormModelClass || this.FormModelClass || FormModel;
      this.model = args.model || this.model || (new FormModelClass());

      /* Override template */
      this.template = args.template || this.template;

      /* Merge events, fields, bindings, and computeds */
      this.events = _.extend({}, this.events || {}, args.events || {});
      this.fields = _.extend({}, this.fields || {}, args.fields || {});
      this._errors = [];
      this._success = false;
      // this._bindings is a snapshot of the original bindings
      this._bindings = _.extend({}, this.bindings || {}, args.bindings || {});

      View.apply(this, arguments);

      this.resetModelListeners(this.model);
    },

    /**
     * Prepare the formview's default render context
     * @return {Object}
     *         {Object.errors} A hash of field names mapped to error messages
     *         {Object.success} A boolean value of true if validation has succeeded
     */
    prepare: function() {
      var templateContext = View.prototype.prepare.apply(this);
      templateContext.formErrors = (_.size(this._errors) !== 0) ? this._errors : null;
      templateContext.formSuccess = this._success;
      return templateContext;
    },

    /**
     * Override the delegate events and wrap our custom additions
     */
    delegateEvents: function() {
      /* DOM event bindings and plugins */
      this.__generateStickitBindings();
      this.stickit();
      View.prototype.delegateEvents.call(this);
    },

    /**
     * Resets the form model with the passed in model. Stops listening to current form model
     * and sets up listeners on the new one.
     * @param {Torso.FormModel} model the new form model
     * @param {boolean} [stopListening=false] if true, it will stop listening to the previous form model
     */
    resetModelListeners: function(model, stopListening) {
      if (this.model && stopListening) {
        this.stopListening(this.model);
      }
      this.model = model;
      this.listenTo(this.model, 'validated:valid', this.valid);
      this.listenTo(this.model, 'validated:invalid', this.invalid);
    },

    /**
     * Default method called on validation success.
     */
    valid: function() {
      this._success = true;
      this._errors = [];
    },

    /**
     * Default method called on validation failure.
     */
    invalid: function(model, errors) {
      this._success = false;
      this._errors = errors;
    },

    /**
     * Deactivate callback that removes bindings and other resources
     * that shouldn't exist in a dactivated state
     */
    deactivate: function() {
      View.prototype.deactivate.call(this);
      // No detach callback... Deactivate will have to do as it is called by detach
      if (this.$el) {
        this.unstickit();
      }
    },

    /**
     * For use in a feedback's "then" callback
     * Checks to see if the form model's field is valid. If the field is invalid, it adds the class.
     * If the field is invalid, it removes the class. When an array is passed in for the fieldName,
     * it will validate all the fields together as if they were one (any failure counts as a total failure,
     * and all fields need to be valid for success).
     * @param {(string|string[])} fieldName the name of the form model field or an array of field names
     * @param {string} className the class name to add or remove
     * @param {boolean} [onValid] if true, will reverse the logic operator
     * @private
     */
    _thenAddClassIfInvalid: function(fieldName, className, onValid) {
      var isValid = this.model.isValid(fieldName);
      if ((onValid ? true : false) === (isValid ? true : false)) {
        return {
          addClass: className
        };
      } else {
        return {
          removeClass: className
        };
      }
    },

    /**
     * For use in a feedback's "then" callback
     * Checks to see if the form model's field is valid. If the field is invalid, it sets the text.
     * If the field is invalid, it removes the text. When an array is passed in for the fieldName,
     * it will validate all the fields together as if they were one (any failure counts as a total failure,
     * and all fields need to be valid for success).
     * @param {(string|string[])} fieldName the name of the form model field or an array of field names
     * @param {string} text the text to set
     * @param {boolean} [onValid] if true, will reverse the logic operator
     * @private
     */
    _thenSetTextIfInvalid: function(fieldName, text, onValid) {
      var isValid = this.model.isValid(fieldName);
      if ((onValid ? true : false) === (isValid ? true : false)) {
        return {
          text: text
        };
      } else {
        return {
          text: ''
        };
      }
    },

    //************** Private methods **************//

    /**
     * Selects all data-model references in this view's DOM, and creates stickit bindings
     * @private
     */
    __generateStickitBindings: function() {
      var self = this;
      // Start by removing all old bindings and falling back to the initialized binding contents
      this.bindings = _.extend({}, this._bindings);

      // Stickit model two-way bindings
      _.each(this.$('[data-model]'), function(element) {
        var attr = $(element).data('model'),
            options = self.__getFieldOptions(attr),
            fieldBinding = self.__generateModelFieldBinding(attr, options);

        //add select options
        if ($(element).is('select')) {
          fieldBinding.selectOptions = self.__generateSelectOptions(element, options);
        }

        self.bindings['[data-model="' + attr + '"]'] = fieldBinding;
      });
    },

    /**
     * @private
     * @param {string} attr An attribute of the model
     * @return {Object} Any settings that are associates with that attribute
     */
    __getFieldOptions: function(attr) {
      attr = this.__stripAllAttribute(attr);
      return this.fields[attr] || {};
    },

    /**
     * @param {string} field A specific model field
     * @param {Object} options Additional behavior options for the bindings
     * @param {Object} [options.modelFormat] The function called before setting model values
     * @param {Object} [options.viewFormat] The function called before setting view values
     * @param {Object} [options.stickit] Any options fields that stickit accepts
     * @private
     * @return {Object} Stickit Binding Hash
     */
    __generateModelFieldBinding: function(field, options) {
      var indices = this.__getAllIndexTokens(field);
      options = options || {};
      var stickitOpts = options.stickit || {};
      if (_.isFunction(stickitOpts)) {
        stickitOpts = stickitOpts.call(this, field, options);
      }
      return _.extend({
        observe: field,
        onSet: function(value) {
          var params = [value];
          params.push(indices);
          params = _.flatten(params);
          return options.modelFormat ? options.modelFormat.apply(this, params) : value;
        },
        onGet: function(value) {
          var params = [value];
          params.push(indices);
          params = _.flatten(params);
          return options.viewFormat ? options.viewFormat.apply(this, params) : value;
        }
      }, stickitOpts);
    },

    /**
     * @param {Element} element The select element to generate options for
     * @param {Object} opts Additional behavior options for the bindings
     * @param {Object} [opts.modelFormat] The function called before setting model values
     * @param {Object} [opts.stickit.selectOptions] stickit's selectOptions fields. Overrides what Torso does by default
     * @private
     * @return {Object} Stickit options hash
     */
    __generateSelectOptions: function(element, opts) {
      var collection = [],
          options = $(element).children('option');
      opts = opts || {};
      opts.stickit = opts.stickit || {};
      var selectOptions = opts.stickit.selectOptions || {};
      if (_.isFunction(selectOptions)) {
        selectOptions = selectOptions.call(this, element, opts);
      }

      _.each(options, function(option) {
        collection.push({'label': $(option).text(), 'value': opts.modelFormat ? opts.modelFormat.apply(this, [$(option).val()]) : $(option).val()});
      });

      return _.extend({
        collection: collection,
        labelPath: 'label',
        valuePath: 'value'
      }, selectOptions);
    }
  });

  return FormView;
}));
