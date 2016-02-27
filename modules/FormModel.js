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
     * @property __currentMappings
     * @type Object
     **/
    /**
     * @private
     * @property __cache
     * @type Object
     **/
    /**
     * @private
     * @property __currentObjectModels
     * @type Object
     **/
    /**
     * @private
     * @property __currentUpdateEvents
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
     * @property mapping
     * @type Object
     **/
    mapping: undefined,

    /**
     * Constructor the form model. Can take in attributes to set initially. These will override any pulled values from object models
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
     * @method constructor
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
    constructor: function(attributes, options) {
      options = options || {};
      this.__cache = {};
      this.__currentUpdateEvents = [];
      this.__currentMappings = {};
      this.__currentObjectModels = {};

      // override + extend the validation and labels hashes
      this.validation = _.extend({}, this.validation || {}, options.validation || {});
      this.labels = _.extend({}, this.labels || {}, options.labels || {});

      NestedModel.apply(this, arguments);

      this.__initMappings(options);

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

    getMapping: function(alias) {
      return this.__currentMappings[alias];
    },

    getMappings: function() {
      return this.__currentMappings;
    },

    /**
     * this.setMapping('modelAlias', true, optional model instance);
     * this.setMapping('modelAlias, 'foo bar baz', optional model instance);
     * this.setMapping('computedAlias', {
     *   model1: 'foo bar',
     *   model2: 'baz',
     *   push: function() {},
     *   pull: function() {},
     * }, optional model map)
     */
    setMapping: function(alias, mapping, models, copy) {
      var computed, fields,
        config = {};
      if (_.isString(mapping)) {
        fields = mapping.split(' ');
      } else if (mapping === true) {
        fields = undefined;
      } else if (_.isObject(mapping)) {
        mapping = _.clone(mapping);
        computed = true;
      }
      config.computed = computed;
      if (computed) {
        config.mapping = mapping;
        _.each(this.__getModelAliases(undefined, config), function(modelAlias) {
          config.mapping[modelAlias] = config.mapping[modelAlias].split(' ');
        });
      } else {
        config.mapping = fields;
      }
      if (models) {
        if (computed) {
          this.setModels(models, copy);
        } else {
          this.setModel(alias, models, copy);
        }
      }
      this.__currentMappings[alias] = config;
    },

    /*
     * this.setMappings({
     *   model1: 'foo bar',
     *   model2: 'baz',
     *   ssn: {
     *     model1: 'ssn',
     *     model2: 'lastssn'
     *     push: function() {},
     *     pull: function() {},
     *   }
     * }, optional model map)
     */
    setMappings: function(mappings, models, copy) {
      _.each(mappings, function(mapping, alias) {
        this.setMapping(alias, mapping);
      }, this);
      if (models) {
        this.setModels(models, copy);
      }
    },

    unsetMapping: function(aliasOrModel) {
      var alias = this.__findAlias(aliasOrModel);
      if (alias) {
        delete this.__currentMappings[alias];
      }
      var model = this.getModel(alias);
      if (model && _.isEmpty(this.__getTrackedModelFields(model))) {
        this.unsetModel(model);
      }
    },

    unsetMappings: function() {
      this.__currentMappings = [];
      this.resetUpdating();
    },

    getModel: function(alias) {
      return this.__currentObjectModels[alias];
    },

    getModels: function() {
      return _.values(this.__currentObjectModels);
    },

    setModel: function(alias, model, copy) {
      this.__currentObjectModels[alias] = model;
      this.__updateCache(model);
      this.resetUpdating();
      if (copy) {
        _.each(this.getMappings(), function(config, mappingAlias) {
          if (alias === mappingAlias) {
            this.__pullFromAlias(mappingAlias);
          }
          if (config.computed) {
            var modelAliases = this.__getModelAliases(mappingAlias);
            if (_.contains(modelAlias, alias)) {
              this.__pullFromAlias(mappingAlias);
            }
          }
        }, this);
      }
    },

    setModels: function(models, copy) {
      _.each(models, function(instance, alias) {
        this.setModel(alias, instance, copy);
      }, this);
    },

    unsetModel: function(aliasOrModel) {
      var alias = this.__findAlias(aliasOrModel);
      if (alias) {
        var model = this.__currentObjectModels[alias];
        delete this.__currentObjectModels[alias];
        this.__updateCache(model);
      }
      this.resetUpdating();
    },

    unsetModels: function() {
      this.__currentObjectModels = [];
      this.__updateCache();
      this.resetUpdating();
    },

    /**
     * Pushes values from this form model back to the object models it is tracking. This includes invoking the push callbacks from
     * computed values
     * @method push
     */
    push: function() {
      _.each(this.getMappings(), function(config, alias) {
        this.__push(alias);
      }, this);
    },

    /**
     * Pulls the most recent values of every object model that this form model tracks including computed values
     * NOTE: using this method can override user-submitted data. Use caution.
     * @method pull
     */
    pull: function() {
      _.each(this.getMappings(), function(config, alias) {
        this.__pull(alias);
      }, this);
      this.__updateCache();
    },

    /**
     * If FormModel has a "url" property defined, it will invoke a save on the form model, and after successfully
     * saving, will perform a push.
     * If no "url" property is defined then the following behavior is used:
     * Pushes the form model values to the object models it is tracking and invokes save on each one. Returns a promise.
     * NOTE: if no url is specified and no models are being tracked, it will instead trigger a 'save-fail' event and reject the returned promise
     * with a payload that mimics a server response: {none: { success: false, response: [{ responseJSON: { generalReasons: [{messageKey: 'no.models.were.bound.to.form'}] }}] }}
     * @param [options] {Object}
     *   @param [options.rollback=true] {Boolean} if true, when any object model fails to save, it will revert the object
     *     model attributes to the state they were before calling save. NOTE: if there are updates that happen
     *     to object models within the timing of this save method, the updates could be lost.
     *   @param [options.force=true] {Boolean} if false, the form model will check to see if an update has been made
     *     to any object models it is tracking since it's last pull. If any stale data is found, save with throw an exception
     *     with attributes: {name: 'Stale data', staleModels: [Array of model cid's]}
     * @return when using a "url", a promise is returned for the save on this form model.
         If not using a "url", a promise that will either resolve when all the models have successfully saved in which case the context returned
     *   is an array of the responses (order determined by first the array of models and then the array of models used by
     *   the computed values, normalized), or if any of the saves fail, the promise will be rejected with an array of responses.
     *   Note: the size of the failure array will always be one - the first model that failed. This is a side-effect of $.when
     * @method save
     */
    save: function(options) {
      var notTrackingResponse, url,
        deferred = new $.Deferred(),
        formModel = this;
      options = options || {};
      _.defaults(options, {
        rollback: true,
        force: true
      });
      try {
        url = _.result(formModel, 'url');
      } catch (e) {
        // no url attached to this form model. Continue by pushing to models.
      }
      if (url) {
        return NestedModel.prototype.save.apply(formModel, arguments).done(function() {
          formModel.push();
        });
      } else if (this.isTrackingObjectModel()) {
        this.__saveToModels(deferred, options);
        return deferred.promise();
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
     * @method isTrackingObjectModel
     * @return true if this form model is backed by an Object model. That means that at least one object model was set
     */
    isTrackingObjectModel: function() {
      return _.size(this.__currentObjectModels) > 0;
    },

    /**
     * @method isUpdating
     * @return true if any updates to an object model will immediately copy new values into this form model.
     */
    isUpdating: function() {
      return this.__currentUpdateEvents.length > 0;
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
      _.each(this.__currentUpdateEvents, function(eventConfig) {
        this.stopListening(eventConfig.model, eventConfig.eventName);
      }, this);
      this.__currentUpdateEvents = [];
    },

    resetUpdating: function() {
      if (this.isUpdating()) {
        this.stopUpdating();
        this.startUpdating();
      }
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
      var isStaleModel = this.__cache[model.cid] !== hashValue;
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
      _.each(this.getModels(), function(model) {
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
      var eventName = field ? ('change:' + field) : 'change';
      var callback = field ? _.bind(this.__updateFormField, {formModel: this, field: field}) : this.__updateFormModel;
      this.listenTo(model, eventName, callback);
      this.__currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /**
     * Sets up a listener on one of the fields that is needed to update a computed value
     * @param computedConfig {Object} the Computed Config that will be updated when changes occur
     * @param model {Backbone.Model} the object model from which this form model will start listen to changes
     * @param field {String} the field name that it will start listening to.
     * @method listenToComputedValuesDependency
     */
    listenToComputedValuesDependency: function(model, field, computedAlias) {
      var eventName = field ? ('change:' + field) : 'change';
      this.listenTo(model, eventName, _.bind(this.__invokeComputedPull,
          {formModel: this, alias: computedAlias}));
      this.__currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /************** Private methods **************/

    __getComputedModels: function(computedAlias) {
      var hasAllModels = !_.isUndefined(this.getMapping(computedAlias)),
        models = {};
      _.each(this.__getModelAliases(computedAlias), function(modelAlias) {
        var model = this.getModel(modelAlias);
        if (model) {
          models[modelAlias] = model;
        } else {
          hasAllModels = false;
        }
      }, this);
      return hasAllModels ? models : undefined;
    },

    __getModelAliases: function(computedAlias, config) {
      var modelAliases = [];
      config = config || this.getMapping(computedAlias);
      _.each(config.mapping, function(mapping, key) {
        if (key != 'pull' && key != 'push') {
          modelAliases.push(key);
        }
      }, this);
      return modelAliases;
    },

    __getComputedModelConfigs: function(computedAlias) {
      var hasAllModels = true,
        config = this.getMapping(computedAlias),
        modelConfigs = [];
      _.each(this.__getModelAliases(computedAlias), function(modelAlias) {
        var modelConfig = this.__createModelConfig(modelAlias, config.mapping[modelAlias]);
        if (modelConfig) {
          modelConfigs.push(modelConfig);
        } else {
          hasAllModels = false;
        }
      }, this);
      return hasAllModels ? modelConfigs : undefined;
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
     * @private
     * @method __saveToModels
     */
    __saveToModels: function(deferred, options) {
      var staleModels,
        formModel = this,
        responsesSucceeded = 0,
        responsesFailed = 0,
        responses = {},
        oldValues = {},
        models = formModel.getModels(),
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
              _.each(formModel.getModels(), function(model) {
                model.set(oldValues[model.cid]);
                if (responses[model.cid].success) {
                  model.save();
                }
              });
            }
            formModel.trigger('save-fail', responses);
            deferred.reject(responses);
          } else {
            formModel.trigger('save-success', responses);
            deferred.resolve(responses);
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
    },

    __pull: function(alias) {
      var config = this.getMapping(alias);
      if (config.computed && config.mapping.pull) {
        this.__invokeComputedPull.call({formModel: this, alias: alias});
      } else {
        var model = this.getModel(alias);
        if (model) {
          this.__copyFields(config.mapping, this, model);
        }
      }
    },

    __push: function(alias) {
      var config = this.getMapping(alias);
      if (config.computed && config.mapping.push) {
        var models = this.__getComputedModels(alias);
        if (models) {
          config.mapping.push.call(this, models);
        }
      } else {
        var model = this.getModel(alias);
        if (model) {
          this.__copyFields(config.mapping, model, this);
        }
      }
    },

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
     * @param [cache=this.__cache] {Object} if passed an object (can be empty), this method will fill
     *   this cache object instead of this form model's __cache field
     * @private
     * @method __updateCache
     */
    __updateCache: function(model) {
      if (!model) {
        this.__cache = {};
        _.each(this.getModels(), function(model) {
          this.__updateCache(model);
        }, this);
      } else {
        this.__cache[model.cid] = this.__generateHashValue(model);
      }
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

    __findAlias: function(aliasOrModel) {
      var alias, objectModel;
      // this.unsetModel('alias')
      if (_.isString(aliasOrModel)) {
        alias = aliasOrModel;
      } else {
        // this.unsetModel(myObjectModel)
        objectModel = aliasOrModel;
        alias = _.find(this.__currentObjectModels, function(model) {
          return model == objectModel;
        });
      }
      return alias;
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
      _.each(this.getModels(), function(model) {
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
      _.each(this.__currentMappings, function(config, alias) {
        if (config.computed) {
          var modelConfigs = this.__getComputedModelConfigs(alias);
          _.each(modelConfigs, function(modelConfig) {
            var model = modelConfig.model;
            if (modelConfig.fields) {
              _.each(modelConfig.fields, function(field) {
                this.listenToComputedValuesDependency(model, field, alias);
              }, this);
            } else {
              // TODO setup listeners for computeds that listen to all fields
            }
          }, this);
        } else {
          var model = this.getModel(alias);
          if (model) {
            if (config.mapping) {
              _.each(config.mapping, function(field) {
                this.listenToModelField(model, field);
              }, this);
            } else {
              this.listenToModelField(model);
            }
          }
        }
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
      if (!fields && this === origin && _.size(this.getModels()) > 1) {
        // only copy attributes that exist on object model when the form model is tracking all the properties
        // of that object model, but is also tracking other models as well.
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
        optionsMapping = options.mapping;
      this.setMappings(options.mapping || defaultMapping, options.models);
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
        if (modelConfig.model && modelConfig.model.cid === model.cid) {
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

    __createModelConfig: function(modelAlias, fields) {
      var model = this.getModel(modelAlias);
      if (model) {
        return {
          fields: fields,
          model: model
        };
      }
    },

    /**
     * @return {Array} a list of Model Configurations that this form model is using a dependencies. Includes those defined in the
     *   computed fields
     * @private
     * @method __getAllModelConfigs
     */
    __getAllModelConfigs: function() {
      var modelConfigs = [];
      _.each(this.__currentMappings, function(config, alias) {
        if (config.computed) {
          var computedModelConfigs = this.__getComputedModelConfigs(alias);
          if (computedModelConfigs) {
            modelConfigs = modelConfigs.concat(computedModelConfigs);
          }
        } else {
          var modelConfig = this.__createModelConfig(alias, config.mapping);
          if (modelConfig) {
            modelConfigs.push(modelConfig);
          }
        }
      }, this);
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
     *  alias: <the computed alias>,
     * }
     * @private
     * @method __invokeComputedPull
     */
    __invokeComputedPull: function(model) {
      if (model) {
        this.formModel.__updateCache(model);
      }
      (function(formModel, alias) {
        var hasAllModels = true,
          config = formModel.getMapping(alias),
          modelAliases = formModel.__getModelAliases(alias),
          models = {};
        if (!config.mapping.pull) {
          console.log('Not pulling the computed: ' + alias + ', because no pull method was defined for this computed.');
          return;
        }
        _.each(modelAliases, function(modelAlias) {
          var fields = config.mapping[modelAlias],
            model = formModel.getModel(modelAlias),
            modelCopy = {};
          if (!model) {
            hasAllModels = false;
          } else {
            if (fields) {
              _.each(fields, function(field) {
                modelCopy[field] = formModel.__cloneVal(model.get(field));
              });
            } else {
              modelCopy = formModel.__cloneVal(modelConfig.model.attributes);
            }
            models[modelAlias] = modelCopy;
          }
        });
        if (hasAllModels) {
          config.mapping.pull.call(formModel, models);
        }
      })(this.formModel, this.alias);
    }
  });

  _.extend(FormModel.prototype, validation.mixin);

  return FormModel;
}));
