(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ViewPropertyReference = factory(root._);
  }
}(this, function(_) {
  'use strict';

  /**
   * An object used to parse a property and context definition that references a property of a context object.
   * Specifically for managing DataBehavior's id(s) and events definitions.
   * @module Torso
   * @class  ViewPropertyReference
   * @param options {Object}
   *   @param options.rootObject {Object} the 'this' to use when evaluating a context fxn.
   *   @param options.view {Torso.View} the view to base the reference from.
   *   @param options.reference {Object} the reference object that identifies how to access the context and the property.
   *     @param options.reference.property {String} defines how to access the property from the context.
   *     @param [options.reference.context=view] {Object|Function} defines how to retrieve the context.  If undefined the view is assumed to be the context.
   * @author jyoung@vecna.com
   */
  var ViewPropertyReference = function(options) {
    this.__rootObject = options.rootObject;
    this.__view = options.view;
    this.__reference = options.reference;
  };

  _.extend(ViewPropertyReference.prototype, {
    /**
     * Gets the value described by this view property reference.
     * @method get
     * @return {Object} the result of applying the property to the context.
     */
    get: function() {
      var contextAndPropertyName = this.getContextAndPropertyName();
      var context = contextAndPropertyName.context;
      var propertyName = contextAndPropertyName.propertyName;
      var value = context && context[propertyName];

      if (context && _.isUndefined(value) && _.isFunction(context.get)) {
        value = context.get(propertyName);
      }
      return value;
    },
    /**
     * Converts the definition into the actual context object and property to retrieve off of that context.
     * @method getContextAndPropertyName
     * @return {{propertyName, context: Object}} the name of the property and the actual object to use as the context.
     */
    getContextAndPropertyName: function() {
      var context;
      if (_.isUndefined(this.__reference.context)) {
        context = this.__view;
      } else if (_.isFunction(this.__reference.context)) {
        var contextFxn = _.bind(this.__reference.context, this.__rootObject);
        context = contextFxn();
      } else if (_.isString(this.__reference.context)) {
        context = _.result(this, this.__reference.context);
      } else if (_.isObject(this.__reference.context)) {
        context = this.__reference.context;
      } else {
        throw new Error('Invalid context.  Not a string, object or function: ' + JSON.stringify(this.__reference));
      }

      var property = this.__reference.property;

      var propertyParts = property.split('.');
      var isNestedProperty = propertyParts.length > 1;
      if (isNestedProperty) {
        var rootPropertyName = propertyParts[0];
        if (rootPropertyName === 'behaviors' || rootPropertyName === 'behavior') {
          var behaviorName = propertyParts[1];
          context = this.__view.getBehavior(behaviorName);
          property = propertyParts.slice(2).join('.');
        } else if (!_.isUndefined(context[rootPropertyName])) {
          context = context[rootPropertyName];
          property = propertyParts.slice(1).join('.');
        }
      }

      return {
        propertyName: property,
        context: context
      };
    }
  });

  /**
   * @method isViewPropertyReference
   * @param reference {Object} the reference configuration to test if it is a view property reference.
   * @return {Boolean} true if the reference configuration is a view property reference, false otherwise.
   */
  ViewPropertyReference.isViewPropertyReference = function(reference) {
    return _.isString(reference.property);
  };

  return ViewPropertyReference;
}));
