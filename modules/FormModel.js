(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './NestedModel', './validation'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'), require('./NestedModel'), require('./validation'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.FormModel = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Torso.NestedModel, root.Torso.validation);
  }
}(this, function(_, $, NestedModel, validation) {
  'use strict';

  /**
   * Generic Form Model
   * @module    Torso
   * @class     FormModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var FormModel = NestedModel.extend({
    /**
     * @private
     * @property _computed
     * @type Array
     **/
    /**
     * @private
     * @property _cache
     * @type Object
     **/
    /**
     * @private
     * @property _modelConfigs
     * @type Array
     **/
    /**
     * @private
     * @property _currentUpdateEvents
     * @type Array
     **/
    /**
     * @property validation
     * @type Object
     **/
    /**
     * @property labels
     * @type Object
     **/
    /**
     * @property defaultMapping
     * @type Object|Function
     **/
    defaultMapping: null,

    /**
     * Initializes the form model. Can take in attributes to set initially. These will override any pulled values from object models
     * on initialization. On initialization the object model's values will be pulled once.
     * For the options, here are needed definitions:
     * Model Configuration: {
     *   model: {Object} An object model
     *   [fields]: {Array} An array of strings where each String value corresponds to an attribute in the model. Leave empty if you
     *     want to listen to all the fields.
     * }
     * Computed Configuration: {
     *   models: {Array} of Model Configurations that are needed for the computation
     *   pull: {Function} a callback that will be invoked when pulling data from the Object model. The arguments to this function
     *     will be a copy of all the fields defined by the models array in order that they were defined including the models array
     *     order. If any model configuration does not contain a fields array, a hash will be provided for that entry into the model
     *     array that will contain a copy of all the attributes of that model.
     *   push: {Function} a callback that will be invoked when pushing data to the Object model. It will take a single argument,
     *     an array of all the models defined in the the model configuration array: _.pluck(computedConfig.models, 'model')
     * }
     * @method initialize
     * @param [options] {Object}
     *   @param [options.models] {Array} list of model configurations. These will dictate what fields from the Object model will be
     *     used during the pulling and pushing. Will be ignored if options.model exists.
     *   @param [options.model] {Backbone.Model} An object model to track. Short hand for options.models of size one.
     *   @param [options.fields] {Array} An array of fields to track off of options.model. If left not defined, all fields will
     *     be tracked.
     *   @param [options.computed] {Array} list of computed value configurations. These give you flexibility in how fields are copied
     *     to and from any number of Object models.
     *   @param [options.startUpdating=false] {Boolean} set to true if you want to immediately set up listeners to update this form
     *     model as the object model updates. You can always toggle this state with startUpdating() and stopUpdating().
     *   @param [options.validation] {Object} A Backbone.Validation plugin hash to dictate the validation rules
     *   @param [options.labels] {Object} A Backbone.Validation plugin hash to dictate the attribute labels
     */
    initialize: function(attributes, options) {
      this._computed = [];
      this._cache = {};
      this._currentUpdateEvents = [];
      this._modelConfigs = [];
      options = options || {};
      this.__initMappings(options);

      // override + extend the validation and labels hashes
      this.validation = _.extend({}, this.validation || {}, options.validation || {});
      this.labels = _.extend({}, this.labels || {}, options.labels || {});

      // Do an initial pull
      this.pull();

      // The pull may have overridden default attributes
      if (attributes) {
        this.set(attributes);
      }

      // Begin updating if requested
      if (options.startUpdating) {
        this.startUpdating();
      }
      this.trigger('initialization-complete');
    },

    /**
     * Add a model that this form model should track against
     * @method addModel
     * @param modelConfig {Object} the Object model configuration you are tracking.
     *   @param modelConfig.model {Backbone.Model} the object model
     *   @param [modelConfig.fields] {Array} an array of strings where each String value corresponds to an attribute in the model.
     *     Leave empty if you want to listen to all the fields.
     * @param [copy=false] {Boolean} set to true if you want to make an initial pull from the object model upon adding.
     */
    addModel: function(modelConfig, copy) {
      this._modelConfigs.push(modelConfig);
      if (copy) {
        this.__copyFields(modelConfig.fields, this, modelConfig.model);
        this.__updateCache(modelConfig.model);
      }
    },

    /**
     * Add a computed value. This allows you to alter fields before pulling and pushing to/from the Object model. It also allows you
     * to aggregate or separate fields from the Object model.
     * @method addComputed
     * @param computedConfig {Object} the configuration for a computed field(s)
     *   @param computedConfig.models {Array} of Model Configurations that are needed for the computation
     *   @param computedConfig.pull {Function} a callback that will be invoked when pulling data from the Object model. The arguments
     *     to this function will be a copy of all the fields defined by the models array in order that they were defined including the
     *     models array order. If any model configuration does not contain a fields array, a hash will be provided for that entry into
     *     the model array that will contain a copy of all the attributes of that model.
     *   @param computedConfig.push {Function} a callback that will be invoked when pushing data to the Object model. It will take a single
     *     argument, an array of all the models defined in the the model configuration array: _.pluck(computedConfig.models, 'model')
     * @param [copy=false] {Boolean} set to true if you want to make an initial pull from the object models upon adding.
     */
    addComputed: function(computedConfig, copy) {
      this._computed.push(computedConfig);
      if (copy) {
        this.__invokeComputedPull.call({formModel: this, models: computedConfig.models, pull: computedConfig.pull});
        _.each(computedConfig.models, function(modelConfig) {
          this.__updateCache(modelConfig.model);
        }, this);
      }
    },

    /**
     * @method isTrackingObjectModel
     * @return true if this form model is backed by an Object model. That means that at least one model was added or one computed
     * value was added to this form model.
     */
    isTrackingObjectModel: function() {
      return _.size(this._modelConfigs) > 0 || _.size(this._computed) > 0;
    },

    /**
     * @method isUpdating
     * @return true if any updates to an object model will immediately copy new values into this form model.
     */
    isUpdating: function() {
      return this._currentUpdateEvents.length > 0;
    },

    /**
     * Will add listeners that will automatically pull new updates from this form's object models.
     * @param [pullFirst=false] {Boolean} if true, the form model will pull most recent values then start listening
     * @method startUpdating
     */
    startUpdating: function(pullFirst) {
      if (this.isTrackingObjectModel() && !this.isUpdating()) {
        if (pullFirst) {
          this.pull();
        }
        this.__setupListeners();
      }
    },

    /**
     * This will stop the form model from listening to its object models.
     * @method stopUpdating
     */
    stopUpdating: function() {
      _.each(this._currentUpdateEvents, function(eventConfig) {
        this.stopListening(eventConfig.model, eventConfig.eventName);
      }, this);
      this._currentUpdateEvents = [];
    },

    /**
     * Pushes the form model values to the object models it is tracking and invokes save on each one. Returns a promise.
     * @param [options] {Object}
     *   @param [options.rollback=true] {Boolean} if true, when any object model fails to save, it will revert the object
     *     model attributes to the state they were before calling save. NOTE: if there are updates that happen
     *     to object models within the timing of this save method, the updates could be lost.
     *   @param [options.force=true] {Boolean} if false, the form model will check to see if an update has been made
     *     to any object models it is tracking since it's last pull. If any stale data is found, save with throw an exception
     *     with attributes: {name: 'Stale data', staleModels: [Array of model cid's]}
     * @return a promise that will either resolve when all the models have successfully saved in which case the context returned
     *   is an array of the responses (order determined by first the array of models and then the array of models used by
     *   the computed values, normalized), or if any of the saves fail, the promise will be rejected with an array of responses.
     *   Note: the size of the failure array will always be one - the first model that failed. This is a side-effect of $.when
     * @method save
     */
    save: function(options) {
      var notTrackingResponse,
        promise = new $.Deferred();
      options = options || {};
      _.defaults(options, {
        rollback: true,
        force: true
      });
      if (this.isTrackingObjectModel()) {
        (function(formModel) {
          var staleModels,
            responsesSucceeded = 0,
            responsesFailed = 0,
            responses = {},
            oldValues = {},
            models = formModel.__getAllModels(true),
            numberOfSaves = models.length;
          // If we're not forcing a save, then throw an error if the models are stale
          if (!options.force) {
            staleModels = formModel.checkIfModelsAreStale();
            if (staleModels.length > 0) {
              throw {
                name: 'Stale data',
                staleModels: staleModels
              };
            }
          }
          // Callback for each response
          function responseCallback(response, model, success) {
            // Add response to a hash that will eventually be returned through the promise
            responses[model.cid] = {
                success: success,
                response: response
              };
            // If we have reached the total of number of expected responses, then resolve or reject the promise
            if (responsesFailed + responsesSucceeded === numberOfSaves) {
              if (responsesFailed > 0) {
                // Rollback if any responses have failed
                if (options.rollback) {
                  _.each(formModel.__getAllModels(true), function(model) {
                    model.set(oldValues[model.cid]);
                    if (responses[model.cid].success) {
                      model.save();
                    }
                  });
                }
                formModel.trigger('save-fail', responses);
                promise.reject(responses);
              } else {
                formModel.trigger('save-success', responses);
                promise.resolve(responses);
              }
            }
          }
          // Grab the current values of the object models
          _.each(models, function(model) {
            oldValues[model.cid] = formModel.__getTrackedModelFields(model);
          });
          // Push the form model values to the object models
          formModel.push();
          // Call save on each object model
          _.each(models, function(model) {
            model.save().fail(function() {
              responsesFailed++;
              responseCallback(arguments, model, false);
            }).done(function() {
              responsesSucceeded++;
              responseCallback(arguments, model, true);
            });
          });
        })(this);
        return promise.promise();
      } else {
        // Return a response that is generated when this form model is not tracking an object model
        notTrackingResponse = {
          'none': {
            success: false,
            response: [{
              responseJSON: {
                generalReasons: [{messageKey: 'no.models.were.bound.to.form'}]
              }
            }]
          }
        };
        this.trigger('save-fail', notTrackingResponse);
        return (new $.Deferred()).reject(notTrackingResponse).promise();
      }
    },

    /**
     * Pushes values from this form model back to the object models it is tracking. This includes invoking the push callbacks from
     * computed values
     * @method push
     */
    push: function() {
      _.each(this._modelConfigs, function(modelConfig) {
        this.__copyFields(modelConfig.fields, modelConfig.model, this);
      }, this);
      _.each(this._computed, function(computedConfig) {
        // If a push callback is defined, fire it.
        if (computedConfig.push) {
          computedConfig.push.apply(this, [_.pluck(computedConfig.models, 'model')]);
        }
      }, this);
    },

    /**
     * Pulls the most recent values of every object model that this form model tracks including computed values
     * NOTE: using this method can override user-submitted data. Use caution.
     * @method pull
     */
    pull: function() {
      _.each(this._modelConfigs, function(modelConfig) {
        this.__copyFields(modelConfig.fields, this, modelConfig.model);
        this.__updateCache(modelConfig.model);
      }, this);
      _.each(this._computed, function(computedConfig) {
        this.__invokeComputedPull.call({formModel: this, models: computedConfig.models, pull: computedConfig.pull});
        _.each(computedConfig.models, function(modelConfig) {
          this.__updateCache(modelConfig.model);
        }, this);
      }, this);
    },

    /**
     * @param model {Backbone.Model} the backbone model that is being checked
     * @param [staleModels] {Object} a hash that will be updated to contain this model if it is stale in the form: cid -> model.
     * @param [currentHashValues] {Object} If passed an object, it will look in this cache for the current value of the object model
     *   instead of calculating it. It should be key'ed by the model's cid
     * @return {Boolean} true if the model passed in has been changed since the last pull from the object model.
     * @method isModelStale
     */
    isModelStale: function(model, staleModels, currentHashValues) {
      var hashValue;
      currentHashValues = currentHashValues || {};
      if (!currentHashValues[model.cid]) {
        currentHashValues[model.cid] = this.__generateHashValue(model);
      }
      hashValue = currentHashValues[model.cid];
      var isStaleModel = this._cache[model.cid] !== hashValue;
      if (staleModels) {
        if (isStaleModel) {
          staleModels[model.cid] = model;
        } else if (staleModels[model.cid]) {
          delete staleModels[model.cid];
        }
      }
      return isStaleModel;
    },

    /**
     * @return {Array} an array of the object models that have been updated since the last pull from this form model
     * @method checkIfModelsAreStale
     */
    checkIfModelsAreStale: function() {
      var staleModels = {},
        currentHashValues = this.__generateAllHashValues();
      _.each(this.__getAllModels(true), function(model) {
        this.isModelStale(model, staleModels, currentHashValues);
      }, this);
      return _.values(staleModels);
    },

    /**
     * Sets up a listener to update the form model if the model's field changes.
     * @param model {Backbone.Model} the object model from which this form model will start listen to changes
     * @param field {String} the field name that it will start listening to.
     * @method listenToModelField
     */
    listenToModelField: function(model, field) {
      var eventName = 'change:' + field;
      this.listenTo(model, eventName, _.bind(this.__updateFormField,
          {formModel: this, field: field}));
      this._currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /**
     * Sets up a listener on one of the fields that is needed to update a computed value
     * @param computedConfig {Object} the Computed Config that will be updated when changes occur
     * @param model {Backbone.Model} the object model from which this form model will start listen to changes
     * @param field {String} the field name that it will start listening to.
     * @method listenToComputedValuesDependency
     */
    listenToComputedValuesDependency: function(computedConfig, model, field) {
      var eventName = 'change:' + field;
      this.listenTo(model, 'change:' + field, _.bind(this.__invokeComputedPull,
          {formModel: this, models: computedConfig.models, pull: computedConfig.pull}));
      this._currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /************** Private methods **************/

    /**
     * Updates a single attribute in this form model.
     * NOTE: requires the context of this function to be:
     * {
     *  formModel: <this form model>,
     *  field: <the field being updated>
     * }
     * @private
     * @method __updateFormField
     */
    __updateFormField: function(model, value) {
      this.formModel.set(this.field, value);
      this.formModel.__updateCache(model);
    },

    /**
     * NOTE: When looking to update the form model manually, call this.pull().
     * Updates this form model with the changed attributes of a given object model
     * @param model {Backbone.Model} the object model that has been changed
     * @private
     * @method __updateFormModel
     */
    __updateFormModel: function(model) {
      _.each(model.changedAttributes(), function(value, fieldName) {
        this.set(fieldName, this.__cloneVal(value));
      }, this);
      this.__updateCache(model);
    },

    /**
     * Updates the form model's snapshot of the model's attributes to use later
     * @param model {Backbone.Model} the object model
     * @param [cache=this._cache] {Object} if passed an object (can be empty), this method will fill
     *   this cache object instead of this form model's _cache field
     * @private
     * @method __updateCache
     */
    __updateCache: function(model) {
      this._cache[model.cid] = this.__generateHashValue(model);
    },

    /**
     * Create a hash value of a simple object
     * @param obj {Object} simple object with no functions
     * @return a hash value of the object
     * @private
     * @method __hashValue
     */
    __hashValue: function(obj) {
      return JSON.stringify(obj);
    },

    /**
     * @param model {Backbone.Model} the model to create the hash value from
     * @return {String} the hash value of the model making sure to only use the tracked fields
     * @private
     * @method __generateHashValue
     */
    __generateHashValue: function(model) {
      var modelFields = this.__getTrackedModelFields(model);
      return this.__hashValue(modelFields);
    },

    /**
     * @return {Object} a map of model's cid to the hash value of the model making sure to only use the tracked fields
     * @private
     * @method __generateAllHashValues
     */
    __generateAllHashValues: function() {
      var currentHashValues = {};
      _.each(this.__getAllModels(true), function(model) {
        currentHashValues[model.cid] = this.__generateHashValue(model);
      }, this);
      return currentHashValues;
    },

    /**
     * Deep clones the attributes. There should be no functions in the attributes
     * @param val {Object|Array|Basic Data Type} a non-function value
     * @return the clone
     * @private
     * @method __cloneVal
     */
    __cloneVal: function(val) {
      var seed;
      if (_.isArray(val)) {
        seed = [];
      } else if (_.isObject(val)) {
        seed = {};
      } else {
        return val;
      }
      return $.extend(true, seed, val);
    },

    /**
     * Attaches listeners to the tracked object models with callbacks that will copy new properties into this form model.
     * @private
     * @method __setupListeners
     */
    __setupListeners: function() {
      _.each(this._modelConfigs, function(modelConfig) {
        if (modelConfig.fields) {
          _.each(modelConfig.fields, function(field) {
            this.listenToModelField(modelConfig.model, field);
          }, this);
        } else {
          this.listenTo(modelConfig.model, 'change', this.__updateFormModel, this);
          this._currentUpdateEvents.push({model: modelConfig.model, eventName: 'change'});
        }
      }, this);
      _.each(this._computed, function(computedConfig) {
        _.each(computedConfig.models, function(modelConfig) {
          _.each(modelConfig.fields, function(field) {
            this.listenToComputedValuesDependency(computedConfig, modelConfig.model, field);
          }, this);
        }, this);
      }, this);
    },

    /**
     * Copies fields from one backbone model to another. Is useful during a pull or push to/from Object models. The values will
     * be deep cloned from the origin to the destination.
     * @param [fields] {Array} a string of attribute names on the origin model that will be copied. Leave null if all attributes
     *   are to be copied
     * @param destination {Backbone.Model} the backbone model that will have values copied into
     * @param origin {Backbone.Model} the backbone model that will be used to grab values.
     * @private
     * @method __copyFields
     */
    __copyFields: function(fields, destination, origin) {
      if (!fields && this === origin) {
        fields = _.keys(destination.attributes);
      }
      if (fields) {
        _.each(fields, function(field) {
          destination.set(field, this.__cloneVal(origin.get(field)));
        }, this);
      } else {
        destination.set(this.__cloneVal(origin.attributes));
      }
    },

    /**
     * @param [options] {Object} See initialize option's 'model', 'fields', 'models', 'computed'.
     * @private
     * @method __initMappings
     */
    __initMappings: function(options) {
      var defaultMapping = _.result(this, 'mapping'),
        optionsMapping = _.pick(options, ['model', 'fields', 'models', 'computed']);
      this.__initModels(optionsMapping, defaultMapping);
      this.__initComputeds(optionsMapping, defaultMapping);
    },

    /**
     * @param [optionsMapping] {Object} a mapping object with override values
     * @param [defaultMapping] {Object} the default mapping object
     * @private
     * @method __initModels
     */
    __initModels: function(optionsMapping, defaultMapping) {
      var modelConfigs = this.__pullModelsFromMapping(optionsMapping) || this.__pullModelsFromMapping(defaultMapping);
      _.each(modelConfigs, this.addModel, this);
    },

    /**
     * @param [optionsMapping] {Object} a mapping object with override values
     *   @param [optionsMapping.computed] {Array} an array of Computed Configs
     * @param [defaultMapping] {Object} the default mapping object
     *   @param [defaultMapping.computed] {Array} and array of Computed Configs
     * @private
     * @method __initComputeds
     */
    __initComputeds: function(optionsMapping, defaultMapping) {
      var computeds;
      optionsMapping = optionsMapping || {};
      defaultMapping = defaultMapping || {};
      computeds = optionsMapping.computed || defaultMapping.computed;
      _.each(computeds, this.addComputed, this);
    },

    /**
     * @param [mapping] {Object} object with attributes that contain either a model/field pair as a convenience or an array of
     *   model configs. The model/field pair takes priority if both exist.
     * @return {Array} an array of model configs that are either from the mapping.model or mapping.model. If no model configs are
     *   defined in the mapping, it will return null.
     * @private
     * @method __pullModelsFromMapping
     */
    __pullModelsFromMapping: function(mapping) {
      var modelConfigs = [];
      if (mapping && mapping.model) {
        modelConfigs.push({
          model: mapping.model,
          fields: mapping.fields
        });
      } else if (mapping && mapping.models) {
        modelConfigs = mapping.models.slice();
      }
      return modelConfigs.length === 0 ? null : modelConfigs;
    },

    /**
     * @param model {Backbone.Model} the object model
     * @return {Object} an object with key's as the fields this form model is tracking against
     *   the model and value's as the current value in that object model
     * @private
     * @method __getTrackedModelFields
     */
    __getTrackedModelFields: function(model) {
      var allFields,
        fieldsUsed = {},
        modelFields = {},
        modelConfigs = [];
      _.each(this.__getAllModelConfigs(), function(modelConfig) {
        if (modelConfig.model.cid === model.cid) {
          modelConfigs.push(modelConfig);
        }
      });
      allFields = _.reduce(modelConfigs, function(result, modelConfig) {
        return result || !modelConfig.fields;
      }, false);
      if (allFields) {
        modelFields = this.__cloneVal(model.attributes);
      } else {
        _.each(modelConfigs, function(modelConfig) {
          _.each(modelConfig.fields, function(field) {
            if (!fieldsUsed[field]) {
              fieldsUsed[field] = true;
              modelFields[field] = this.__cloneVal(model.get(field));
            }
          }, this);
        }, this);
      }
      return modelFields;
    },

    /**
     * @param [normalize=false] {Boolean} if true, there will be no duplicate models in the list
     * @return {Array} a list of object models that this form model is using a dependencies. Includes those defined in the
     *   computed fields
     * @private
     * @method __getAllModels
     */
    __getAllModels: function(normalize) {
      var modelsSeen = {},
        models = _.pluck(this.__getAllModelConfigs(), 'model');
      if (normalize) {
        var normalizedModels = [];
        _.each(models, function(model) {
          if (!modelsSeen[model.cid]) {
            modelsSeen[model.cid] = true;
            normalizedModels.push(model);
          }
        });
        models = normalizedModels;
      }
      return models;
    },

    /**
     * @return {Array} a list of Model Configurations that this form model is using a dependencies. Includes those defined in the
     *   computed fields
     * @private
     * @method __getAllModelConfigs
     */
    __getAllModelConfigs: function() {
      var modelConfigs = this._modelConfigs.slice();
      _.each(this._computed, function(computedConfig) {
        modelConfigs = modelConfigs.concat(computedConfig.models);
      });
      return modelConfigs;
    },

    /**
     * A wrapper function that can invoke the pull callback on a Computed Configuration. The pull callback in the Computed
     * Configuration will be passed a list of arguments. This list will be a copy of all the fields defined by the models array in
     * order that they were defined including the models array order. If any model configuration does not contain a fields array, a
     * hash will be provided for that entry into the model array that will contain a copy of all the attributes of that model.
     * @param [model] {Backbone.Model} the model that was updated. If provided, the cache will be updated
     * NOTE: requires the context of this function to be:
     * {
     *  formModel: <this form model>,
     *  models: <the 'models' array of model configurations from the Computed Configuration>,
     *  update: <the update callback from the Computed Configuration>,
     * }
     * @private
     * @method __invokeComputedPull
     */
    __invokeComputedPull: function(model) {
      var args = [];
      if (model) {
        this.formModel.__updateCache(model);
      }
      (function(formModel, pullCallback, modelConfigs) {
        _.each(modelConfigs, function(modelConfig) {
          if (modelConfig.fields) {
            _.each(modelConfig.fields, function(field) {
              args.push(formModel.__cloneVal(modelConfig.model.get(field)));
            });
          } else {
            args.push(formModel.__cloneVal(modelConfig.model.attributes));
          }
        });
        pullCallback.apply(formModel, args);
      })(this.formModel, this.pull, this.models);
    }
  });

  _.extend(FormModel.prototype, validation.mixin);

  return FormModel;
}));
