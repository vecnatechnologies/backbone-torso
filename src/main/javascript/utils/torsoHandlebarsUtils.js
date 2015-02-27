(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['handlebars'], factory);
  } else if (typeof exports === 'object') {
    factory(require('handlebars'));
  } else {
    factory(root.Handlebars);
  };
}(this, function(Handlebars) {
  'use strict;'

  /**
   * Extensions to handlebars helpers.
   *
   * @module    Torso
   * @namespace Torso.Utils
   * @class     handlebarsUtils
   * @static
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var FEEDBACK_KEY = 'feedback',
      MODEL_KEY = 'model';

  /**
   * Usage: {{label 'fieldName' value="suffix"}}
   * Generates: for="field-name-suffix"
   * @method Handlebars.helpers.label
   * @param field {String} The field name to convert to a compliant "for" attribute
   * @param options {<Handlebars context>} Always passed in as final argument
   * @param [option.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
   * @return {String} Compliant HTML generating the "for" attribute
   */
  Handlebars.registerHelper('label', function(field, options) {
    return Handlebars.helpers.formAttr(field, 'for', options);
  });

  /**
   * Usage: {{bindModel 'fieldName' value='suffix'}}
   * Generates: id="field-name-suffix" name="field-name-suffix" data-model="fieldName" data-feedback="firstName"
   * @method Handlebars.helpers.bindModel
   * @param field {String} The field name to convert to compliant id, name, data-model, and data-feedback attributes
   * @param options {<Handlebars context>} Always passed in as final argument
   * @param [options.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
   * @return {String} Compliant HTML generating the id, name, data-model, and data-feedback attributes
   */
  Handlebars.registerHelper('bindModel', function(field, options) {
    return Handlebars.helpers.formAttr(field, MODEL_KEY + ', ' + FEEDBACK_KEY + ', name, id', options);
  });

  /**
   * Usage: {{feedback 'fieldName'}}
   * Generates: data-feedback="firstName"
   * @method Handlebars.helpers.feedback
   * @param field {String} The field name to convert to a compliant data-feedback attribute
   * @param options {<Handlebars context>} Always passed in as final argument
   * @return {String} Compliant HTML generating the data-feedback attribute
   */
  Handlebars.registerHelper('feedback', function(field, options) {
    return Handlebars.helpers.formAttr(field, FEEDBACK_KEY, options);
  });

  /**
   * Usage: {{formAttr 'fieldName[x].sub' 'id, for' value='demo' x=123}}
   * Generates: id="first-name-123_sub-demo" for="first-name-123_sub"
   * @method Handlebars.helpers.formAttr
   * @param field {String} The field name to convert to a compliant data-feedback attribute
   * @param options {<Handlebars context>} Always passed in as final argument
   * @param [options.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
   * @return {String} Compliant HTML generating the data-feedback attribute
   */
  Handlebars.registerHelper('formAttr', function(field, attrs, options) {
    var i, attrName,
      value = (options.hash ? options.hash.value : undefined),
      res = Handlebars.helpers.injectFieldIndices(field, options.hash),
      attributes = '';
    attrs = attrs.split(',');
    for (i = 0; i < attrs.length; i++) {
      attrName = attrs[i].trim();
      if (attrName === FEEDBACK_KEY) {
        attributes += 'data-feedback="' + res + '" ';
      } else if (attrName === MODEL_KEY) {
        attributes += 'data-model="' + res + '" ';
      } else if (attrName === 'name') {
        attributes += 'name="' + Handlebars.helpers.dasherize(res) + '" ';
      } else if (attrName === 'id') {
        attributes += 'id="' + Handlebars.helpers.dasherize(res);
        if (value !== undefined) {
          attributes += '-' + value;
        }
        attributes += '" ';
      } else if (attrName === 'for') {
        attributes += 'for="' + Handlebars.helpers.dasherize(res);
        if (value !== undefined) {
          attributes += '-' + value;
        }
        attributes += '" ';
      }
    }
    if (value !== undefined) {
      attributes += 'value="' + value +'"';
    }
    return new Handlebars.SafeString(attributes);
  });

  /**
   * @method Handlebars.helpers.dasherize
   * @param str {String} The input string to make HTML compliant (convert to dashes)
   * @return {String} HTML complicant / dasherized string
   */
  Handlebars.registerHelper('dasherize', function(str) {
    var camelCaseRemoved, dotsRemoved, bracesRemoved;
    camelCaseRemoved = str.replace(/([A-Z])/g, function(rep) {
      return '-' + rep.toLowerCase();
    });
    dotsRemoved = camelCaseRemoved.replace(/\./g, function() {
      return '_';
    });
    bracesRemoved = dotsRemoved.replace(/\[[0-9]+\]/g, function(rep) {
      return '-' + rep.substring(1, rep.length - 1);
    });
    return bracesRemoved;
  });

  /**
   * Usage: injectFieldIndices('test[x]-thisIsRegular-y', {x: 123, y: 456});
   * Generates: 'test[123]-thisIsRegular-y'
   * @method injectFieldIndices
   * @param field {String} The field name
   * @param indexMap {Object} A map of variables
   * @return {String} the field string with array variables substituted
   */
  Handlebars.registerHelper('injectFieldIndices', function(field, indexMap) {
    if (indexMap) {
      return field.replace(/\[.+?\]/g, function(m) {
        var newIndex = indexMap[m.substring(1, m.length - 1)];
        return '[' + (newIndex === undefined ? '' : newIndex) + ']';
      });
    } else {
      return field;
    }
  });
}));
