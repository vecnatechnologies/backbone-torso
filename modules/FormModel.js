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
     * mapping: {
     *   modelName: 'foo bar baz' // track a model by providing an alias for a name and a space seperated list of fields to track as a String
     *   modelName2: true          // to track all fields
     *   ...                      // can have many model mappings
     *   computedName: {
     *     modelName: 'taz raz',  // mappings for models that will be used for this computed mapping.
     *     ...                    // can have many model mappings for a computed
     *     pull: function(models) {}, // a callback that will be invoked when pulling data from the Object model. Passes in a map of model alias/name to shallow copies of fields being tracked on that model.
     *     push: function(models) {}  // a callback that will be invoked when pushing data to the Object model. Passes in a map of model alias/name to object model being tracked under that alias.
     *   }
     * },
     * models: {
     *   modelName: modelInstance,  // optionally, provide a set of model instance to model name (aliases) to start tracking
     *   modelName2: modelInstance2 // provide as many aliases to model instances as you'd like
     * }
     * @method constructor
     * @param [options] {Object}
     *   @param [options.mapping] {Object} map from aliases (either model names or computed value names) to mappings.
     *     A model mapping can bind an alias to a space seperated list of fields to track as a String  r the boolean true if it is mapping all the
     *     fields. A computed mapping can bind an alias to a set of model mappings required for this computed value and both a pull and/or push method
     *     that are used to compute different values to or from object model(s).
     *   @param [options.models] {Object} Because the options.mapping parameter only allows you to define the mappings to aliases, this options allows
     *     you to bind model instances to aliases. Setting model instances to aliases are required to actually begin pulling/pushing values.
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
      this.validation = _.extend({}, this.validation, options.validation);
      this.labels = _.extend({}, this.labels, options.labels);

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

    /**
     * @method getMapping
     * @param alias {String} the alias of the mapping - either a model mapping or a computed mapping
     * @return the mapping config for that alias
     */
    getMapping: function(alias) {
      return this.__currentMappings[alias];
    },

    /**
     * @method getMappings
     * @return all the current mapping configs
     */
    getMappings: function() {
      return this.__currentMappings;
    },

    /**
     * Define or redefine how the form model pull/pushes or otherwise tracks properties between an object model(s).
     * Examples:
     * this.setMapping('modelAlias', true, optional model instance);
     * this.setMapping('modelAlias, 'foo bar baz', optional model instance);
     * this.setMapping('computedAlias', {
     *   model1: 'foo',
     *   model2: 'bar',
     *   push: function(models) {
     *     models.model1.set('foo', this.get('foobar')[0]);
     *     models.model2.set('bar', this.get('foobar')[1]);
     *   },
     *   pull: function(models) {
     *     this.set('foobar', [models.model1.foo, models.model2.bar]);
     *   },
     * }, optional model map)
     * @method setMapping
     * @param alias {String} the name for the mapping - either a model mapping or a computed mapping
     * @param mapping {String, Boolean or Object} Provides the mapping for this alias. If trying to map to a model, then either provide
     *  a space delimited list of fields to track as a String or the boolean true to track all the model's fields. If the mapping is for
     *  a computed value, then provide a map from model alias to model mapping for all the fields needed for the computed and a pull method
     *  if you want to change/combine/split object model properties before bringing them into the form model and a push method if you want to
     *  change/combine/split form model properties before pushing them to the object models.
     * @param [models] {Object or Backbone.Model instance} Provides instances to use for this mapping. If mapping is a computed,
     *   provide a map from alias to model instance. If mapping is for a single model, just provide the model instance for that alias.
     * @param [copy=false] if true, will pull values definined by this mapping after setting the mapping. Requires models to be passed in.
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
        _.each(this.__getModelAliases(config), function(modelAlias) {
          config.mapping[modelAlias] = config.mapping[modelAlias].split(' ');
        });
      } else {
        config.mapping = fields;
      }
      if (models) {
        if (computed) {
          this.setTrackedModels(models, copy);
        } else {
          this.setTrackedModel(alias, models, copy);
        }
      }
      this.__currentMappings[alias] = config;
    },

    /**
     * Sets multiple mappings (both model mappings and computed value mappings) with one call.
     * Uses the same style of mapping syntax as the constructor. Please refer to the documentation on the constructor.
     * Here is an example:
     * this.setMappings({
     *   model1: 'foo bar',
     *   model2: 'baz',
     *   ssn: {
     *     model1: 'ssn',
     *     model2: 'lastssn'
     *     push: function(models) {},
     *     pull: function(models) {},
     *   }
     * }, optional model map)
     * @method setMappings
     * @param mappings {Object} Uses the same style of mapping syntax as the constructor. Please refer to the documentation on the constructor.
     * @param [models] {Object} this parameter allows you to immediately bind model instances to aliases. Keys are aliases and values are backbone model instances.
     * @param [copy=false] if true, will pull values definined by this mapping after setting the mapping. Requires models to be passed in.
     */
    setMappings: function(mappings, models, copy) {
      _.each(mappings, function(mapping, alias) {
        this.setMapping(alias, mapping);
      }, this);
      if (models) {
        this.setTrackedModels(models, copy);
      }
    },

    /**
     * Remove a mapping (model or computed) by alias
     * @method unsetMapping
     * @param aliasOrModel {String or Backbone.Model instance} if a String is provided, it will unset the mapping with that alias.
     *   If a Backbone Model instance is provided, it will remove the model mapping that was bound to that model.
     * @param [removeModelIfUntracked=false] {Boolean} If true, after the mapping is removed, the model will also be unset but only if
     *   no other mappings reference it. Note, setting this to true will not remove any computed mappings that also use that model.
     */
    unsetMapping: function(aliasOrModel, removeModelIfUntracked) {
      var alias = this.__findAlias(aliasOrModel);
      if (alias) {
        delete this.__currentMappings[alias];
      }
      var model = this.getTrackedModel(alias);
      if (removeModelIfUntracked && model && _.isEmpty(this.__getTrackedModelFields(model))) {
        this.unsetTrackedModel(model);
      }
    },

    /**
     * Removes all current mappings
     * Does NOT remove current model being tracked. Call this.unsetTrackedModels afterwards if you wish this behavior.
     * @method unsetMappings
     */
    unsetMappings: function() {
      this.__currentMappings = [];
      this.resetUpdating();
    },

    /**
     * Returns the object model currently bound to the given name/alias.
     * @method getTrackedModel
     * @param alias {String} the name/alias used by the mappings.
     * @return {Backbone Model instance} the model currently bound to the alias
     */
    getTrackedModel: function(alias) {
      return this.__currentObjectModels[alias];
    },

    /**
     * Returns all the currently tracked object models
     * @method getTrackedModels
     * @return all the currently tracked object models
     */
    getTrackedModels: function() {
      return _.values(this.__currentObjectModels);
    },

    /**
     * Update or create a binding between an object model and an alias.
     * @method setTrackedModel
     * @param alias {String} the alias/name to bind to.
     * @param model {Backbone Model instance} the model to be bound. Mappings referencing this alias will start applying to this model.
     * @param [copy=false] {Boolean} if true, the form model will perform a pull on any mappings using this alias.
     */
    setTrackedModel: function(alias, model, copy) {
      this.__currentObjectModels[alias] = model;
      this.__updateCache(model);
      this.resetUpdating();
      if (copy) {
        _.each(this.getMappings(), function(config, mappingAlias) {
          var modelAliases;
          if (alias === mappingAlias) {
            this.__pullFromAlias(mappingAlias);
          }
          if (config.computed) {
            modelAliases = this.__getModelAliases(mappingAlias);
            if (_.contains(modelAlias, alias)) {
              this.__pullFromAlias(mappingAlias);
            }
          }
        }, this);
      }
    },

    /**
     * Binds multiple models to their aliases.
     * @method setTrackedModels
     * @param models {Map from String to Backbone Model instances} A map from alias/name to model to be bound to that alias.
     * @param [copy=false] {Boolean} if true, the form model will perform a pull on any mapping using these models.
     */
    setTrackedModels: function(models, copy) {
      _.each(models, function(instance, alias) {
        this.setTrackedModel(alias, instance, copy);
      }, this);
    },

    /**
     * Removes the binding between a model alias and a model instance. Effectively stops tracking that model.
     * @method unsetTrackedModel
     * @param aliasOrModel {String or Backbone Model instance} If a string is given, it will unset the model using that alias. If a model instance
     *   is given, it will unbind whatever alias is currently bound to it.
     */
    unsetTrackedModel: function(aliasOrModel) {
      var model,
        alias = this.__findAlias(aliasOrModel);
      if (alias) {
        model = this.__currentObjectModels[alias];
        delete this.__currentObjectModels[alias];
        this.__updateCache(model);
      }
      this.resetUpdating();
    },

    /**
     * Removes all the bindings between model aliases and model instances. Effectively stops tracking the current models.
     * @method unsetTrackedModels
     */
    unsetTrackedModels: function() {
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
     * NOTE: using this method can override user-submitted data from an HTML form. Use caution.
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
      } else if (this.isTrackingAnyObjectModel()) {
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
     * @method isTrackingAnyObjectModel
     * @return true if this form model is backed by an Object model. That means that at least one object model was bound to an mapping alias.
     */
    isTrackingAnyObjectModel: function() {
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
      if (this.isTrackingAnyObjectModel() && !this.isUpdating()) {
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

    /**
     * If updating, it will reset the updating events to match the current mappings.
     * @method resetUpdating
     */
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
      _.each(this.getTrackedModels(), function(model) {
        this.isModelStale(model, staleModels, currentHashValues);
      }, this);
      return _.values(staleModels);
    },

    //************** Private methods **************//

    /**
     * Sets up a listener to update the form model if the model's field (or any field) changes.
     * @param model {Backbone.Model} the object model from which this form model will start listen to changes
     * @param [field] {String} the field name that it will start listening to. If no field is given, it will listen to the general 'change' event.
     * @method __listenToModelField
     * @private
     */
    __listenToModelField: function(model, field) {
      var callback, eventName;
      if (field) {
        eventName = 'change:' + field;
        callback = _.bind(this.__updateFormField, {
          formModel: this,
          field: field
        });
      } else {
        eventName = 'change';
        callback = this.__updateFormModel;
      }
      this.listenTo(model, eventName, callback);
      this.__currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /**
     * Sets up a listener on one (or all) of the fields that is needed to update a computed value
     * @param model {Backbone.Model} the object model from which this form model will start listen to changes
     * @param [field] {String} the field name that it will start listening to. If no field is given, it will listen to the general 'change' event.
     * @param computedAlias {String} the name/alias of the computed mapping being used.
     * @method __listenToComputedValuesDependency
     * @private
     */
    __listenToComputedValuesDependency: function(model, field, computedAlias) {
      var callback, eventName;
      if (field) {
        eventName = 'change:' + field;
      } else {
        eventName = 'change';
      }
      callback = _.bind(this.__invokeComputedPull, {
        formModel: this,
        alias: computedAlias
      });
      this.listenTo(model, eventName, callback);
      this.__currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /**
     * Returns the models that a currently being tracked that are part of a computed mapping
     * If there is a missing model (a model alias is referenced but no model instance is bound to that alias), then it will return undefined.
     * @method __getComputedModels
     * @param computedAlias {String} the name/alias of the computed mapping
     * @return {Object} a map from model name/alias to model instance. If there is a missing model (an model alias is referenced but no model
     *   instance is bound to that alias), then it will return undefined.
     * @private
     */
    __getComputedModels: function(computedAlias) {
      var hasAllModels = !_.isUndefined(this.getMapping(computedAlias)),
        models = {};
      _.each(this.__getModelAliases(computedAlias), function(modelAlias) {
        var model = this.getTrackedModel(modelAlias);
        if (model) {
          models[modelAlias] = model;
        } else {
          hasAllModels = false;
        }
      }, this);
      return hasAllModels ? models : undefined;
    },

    /**
     * Returns the aliases/names of models referenced in the computed mapping with the given alias
     * @method __getModelAliases
     * @param computedAliasOrConfig {String or Object} the name/alias of the computed mapping or the computed mapping itself as
     *   an object if it hasn't been added as a mapping yet.
     * @return {Array of Strings} an array of the model names/aliases referenced inside the computed mapping
     * @private
     */
    __getModelAliases: function(computedAliasOrConfig) {
      var config,
        modelAliases = [];
      if (_.isString(computedAliasOrConfig)) {
        config = this.getMapping(computedAliasOrConfig);
      } else {
        config = computedAliasOrConfig;
      }
      return _.filter(_.keys(config.mapping), function(key) {
        return key != 'pull' && key != 'push';
      });
    },

    /**
     * Repackages a computed mapping to be easier consumed by methods wanting the model mappings tied to the model instances.
     * Returns a list of objects that contain the model instance and the mapping for that model.
     * @method __getComputedModelConfigs
     * @param computedAlias {String} the name/alias used for this computed
     * @return {Array of Objects} a list of objects that contain the model instance under "model" and the mapping for that model under "fields".
     */
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
        models = formModel.getTrackedModels(),
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
              _.each(formModel.getTrackedModels(), function(model) {
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

    /**
     * Pulls in new information from tracked models using the mapping defined by the given alias.
     * This works for both model mappings and computed value mappings
     * @method __pull
     * @param alias {String} the name of the mapping that will be used during the pull
     * @private
     */
    __pull: function(alias) {
      var model,
        config = this.getMapping(alias);
      if (config.computed && config.mapping.pull) {
        this.__invokeComputedPull.call({formModel: this, alias: alias});
      } else {
        model = this.getTrackedModel(alias);
        if (model) {
          this.__copyFields(config.mapping, this, model);
        }
      }
    },

    /**
     * Pushes form model information to tracked models using the mapping defined by the given alias.
     * This works for both model mappings and computed value mappings
     * @method __push
     * @param alias {String} the name of the mapping that will be used during the push
     * @private
     */
    __push: function(alias) {
      var model,
        config = this.getMapping(alias);
      if (config.computed && config.mapping.push) {
        var models = this.__getComputedModels(alias);
        if (models) {
          config.mapping.push.call(this, models);
        }
      } else {
        model = this.getTrackedModel(alias);
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
     * NOT the form model itself like if you called this.__updateFormField.
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
     * @param model {Backbone.Model instance} the object model that has been changed
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
     * @param model {Backbone.Model instance} the object model
     * @param [cache=this.__cache] {Object} if passed an object (can be empty), this method will fill
     *   this cache object instead of this form model's __cache field
     * @private
     * @method __updateCache
     */
    __updateCache: function(model) {
      if (!model) {
        this.__cache = {};
        _.each(this.getTrackedModels(), function(model) {
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

    /**
     * Returns the alias/name bound to the model passed in. If a string is passed in, it will just return this string.
     * @method __findAlias
     * @param aliasOrModel {String or Backbone.Model instance} If string, just returns this string. If a model instance, then the alias
     *   that is bound to the tracked model passed in will be found and returned.
     * @return {String} the alias
     * @private
     */
    __findAlias: function(aliasOrModel) {
      var alias, objectModel;
      if (_.isString(aliasOrModel)) {
        alias = aliasOrModel;
      } else {
        objectModel = aliasOrModel;
        alias = _.find(this.__currentObjectModels, function(model) {
          return model == objectModel;
        });
      }
      return alias;
    },

    /**
     * @param model {Backbone.Model instance} the model to create the hash value from
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
      _.each(this.getTrackedModels(), function(model) {
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
      var model, modelConfigs,
        formModel = this;
      _.each(formModel.getMappings(), function(config, alias) {
        if (config.computed) {
          modelConfigs = formModel.__getComputedModelConfigs(alias);
          _.each(modelConfigs, function(modelConfig) {
            var model = modelConfig.model;
            if (modelConfig.fields) {
              _.each(modelConfig.fields, function(field) {
                formModel.__listenToComputedValuesDependency(model, field, alias);
              });
            } else {
              formModel.__listenToComputedValuesDependency(model, '', alias);
            }
          });
        } else {
          model = formModel.getTrackedModel(alias);
          if (model) {
            if (config.mapping) {
              _.each(config.mapping, function(field) {
                formModel.__listenToModelField(model, field);
              });
            } else {
              formModel.__listenToModelField(model);
            }
          }
        }
      });
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
      if (!fields && this === origin && _.size(this.getTrackedModels()) > 1) {
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
     * Sets the mapping using the form model's default mapping or the options mappings if available.
     * Also sets the tracked models if options.models is provided.
     * @method __initMappings
     * @param [options] {Object} See initialize options: 'mapping' and 'models'.
     * @private
     */
    __initMappings: function(options) {
      var mapping,
        defaultMapping = _.result(this, 'mapping'),
        optionsMapping = options.mapping;
      mapping = options.mapping || defaultMapping;
      if (mapping) {
        this.setMappings(mapping, options.models);
      }
    },

    /**
     * Returns a map where the keys are the fields that are being tracked on tracked model and values are
     * the with current values of those fields.
     * @param model {Backbone.Model instance} the object model
     * @return {Object} aa map where the keys are the fields that are being tracked on tracked model and
     *   values are the with current values of those fields.
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

    /**
     * Returns a useful data structure that binds a tracked model to the fields being tracked on a mapping.
     * @method __createModelConfig
     * @param modelAlias
     * @param fields {Array of Strings or undefined} the fields that the model is tracking. Can be undefined if tracking all fields.
     *   When creating a model config for a computed mapping, the fields refers to the fields being tracked only for that computed value.
     * @return {Object} a binding between a tracked model and the fields its tracking for a mapping. If no tracked model is bound to the modelAlias,
     *   it will return undefined.
     * @private
     */
    __createModelConfig: function(modelAlias, fields) {
      var model = this.getTrackedModel(modelAlias);
      if (model) {
        return {
          fields: fields,
          model: model
        };
      }
    },

    /**
     * Returns an array of convenience data structures that bind tracked models to the fields they are tracking for each mapping,
     * including model mappings inside computed mappings. There will be a model config for each tracked model on a computed mapping
     * meaning there can be multiple model configs for the same tracked model.
     * @method __getAllModelConfigs
     * @return {Array} array of convenience data structures that bind tracked models to the fields they are tracking for each mapping,
     *   including model mappings inside computed mappings.
     * @private
     */
    __getAllModelConfigs: function() {
      var modelConfigs = [];
      _.each(this.getMappings(), function(config, alias) {
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
     * A wrapper function that can invoke the pull callback on a computed mapping during an event callback.
     * Because an event callback predetermines the argument list, this method assumes the necessary computed configuration is
     * bound as the part of the function context.
     * When invoking the pull callback, it will pass in a object map from model alias to shallow copy of the tracked fields the
     * computed value uses. It is NOT just the model, but a  copy of its attributes - feel free to change the properties.
     * Example:
     * fooBar: {
     *   myModel: 'foo bar',
     *   pull: function(models) {
     *     console.log(models.myModel.foo, models.myModel.bar)
     *   }
     * }
     * If any model mapping is tracking all fields by passing true as its config, a copy of all the attributes for that model will be provided.
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
          if (console && _.isFunction(console.log)) {
            console.log('Not pulling the computed: ' + alias + ', because no pull method was defined for this computed.');
          }
          return;
        }
        _.each(modelAliases, function(modelAlias) {
          var fields = config.mapping[modelAlias],
            model = formModel.getTrackedModel(modelAlias),
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
