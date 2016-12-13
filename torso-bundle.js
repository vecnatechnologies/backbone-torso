(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Events = factory(root._, root.Backbone);
  }
}(this, function(_, Backbone) {
  'use strict';

  /**
   * Generic Events.
   * @module    Torso
   * @class     Events
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var Events = _.extend({}, Backbone.Events);

  return Events;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Router = factory(root.Backbone);
  }
}(this, function(Backbone) {
  'use strict';
  /**
   * Backbone's router.
   * @module Torso
   * @class  Router
   * @author kent.willis@vecna.com
   */
  return Backbone.Router.extend({});
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'), require('jquery'));
  } else {
    factory(root.Backbone, root.$);
  }
}(this, function(Backbone, $) {
  'use strict';
  Backbone.$ = $;
  return true;
}));
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Utils = root.Torso.Utils || {};
    root.Torso.Utils.handlebarsUtils = factory();
  }
}(this, function() {
  'use strict';

  return function(Handlebars) {

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
     * Usage: {{labelFor 'fieldName' value="suffix"}}
     * Generates: for="field-name-suffix"
     * @method Handlebars.helpers.labelFor
     * @param field {String} The field name to convert to a compliant "for" attribute
     * @param options {<Handlebars context>} Always passed in as final argument
     * @param [option.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
     * @return {String} Compliant HTML generating the "for" attribute
     */
    Handlebars.registerHelper('labelFor', function(field, options) {
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
     * Generates: id="first-name-123_sub-demo" for="first-name-123_sub" value="demo"
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
  };
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.history = factory(root.Backbone);
  }
}(this, function(Backbone) {
  'use strict';

  /**
   * Backbone's history object.
   * @module    Torso
   * @class     history
   * @constructor
   * @author kent.willis@vecna.com
   */
  return Backbone.history;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'backbone.stickit'], factory);
  } else if (typeof exports === 'object') {
    require('backbone.stickit');
    factory(require('backbone'));
  } else {
    factory(root.Backbone);
  }
}(this, function(Backbone) {
  'use strict';

  /**
   * Extensions to stickit handlers.
   *
   * @module    Torso
   * @namespace Torso.Utils
   * @class     stickitUtils
   * @static
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  Backbone.Stickit.addHandler({
    selector: 'input[type="radio"]',
    events: ['change'],
    update: function($el, val) {
      $el.prop('checked', false);
      $el.filter('[value="' + val + '"]').prop('checked', true);
    },
    getVal: function($el) {
      return $el.filter(':checked').val();
    }
  });
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Utils = root.Torso.Utils || {};
    root.Torso.Utils.templateRenderer = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function(_, $) {
  'use strict';

  /**
   * Changes DOM Nodes that are different, and leaves others untouched.
   *
   * Algorithm:
   * Delegates to a particular swapMethod, depending on the Node type.
   * Recurses for nested Element Nodes only.
   * There is always room for optimizing this method.
   *
   * @method hotswap
   * @param currentNode {Node} The DOM Node corresponding to the existing page content to update
   * @param newNode {Node} The detached DOM Node representing the desired DOM subtree
   * @param ignoreElements {Array} Array of jQuery selectors for DOM Elements to ignore during render. Can be an expensive check.
   */
  function hotswap(currentNode, newNode, ignoreElements) {
    var newNodeType = newNode.nodeType,
      currentNodeType = currentNode.nodeType,
      swapMethod;

    if(newNodeType !== currentNodeType) {
      $(currentNode).replaceWith(newNode);
    } else {
      swapMethod = swapMethods[newNodeType] || swapMethods['default'];
      swapMethod(currentNode, newNode, ignoreElements);
    }
  }

  /**
   * Stickit will rely on the 'stickit-bind-val' jQuery data attribute to determine the value to use for a given option.
   * If the value DOM attribute is not the same as the stickit-bind-val, then this will clear the jquery data attribute
   * so that stickit will use the value DOM attribute of the option.  This happens when templateRenderer merges
   * the attributes of the newNode into a current node of the same type when the current node has the stickit-bind-val
   * jQuery data attribute set.
   *
   * If the node value is not set, then the stickit-bind-val might be how the view is communicating the value for stickit to use
   * (possibly in the case of non-string values).  In this case trust the stickit-bind-val.
   *
   * @param node {Node} the DoM element to test and fix the stickit data on.
   */
  function cleanupStickitData(node) {
    var $node = $(node);
    var stickitValue = $node.data('stickit-bind-val');
    if (node.tagName === 'OPTION' && node.value !== undefined && stickitValue !== node.value) {
      $node.removeData('stickit-bind-val');
    }
  }

  /*
   * Swap method for Element Nodes
   * @param currentNode {Element} The pre-existing DOM Element to update
   * @param newNode {Element} The detached DOM Element representing the desired DOM Element subtree
   * @param ignoreElements {Array} Array of jQuery selectors for DOM Elements to ignore during render. Can be an expensive check.
   */
  function swapElementNodes(currentNode, newNode, ignoreElements) {
    var currentAttr, shouldIgnore, $currChildNodes, $newChildNodes, currentAttributes,
      $currentNode = $(currentNode),
      $newNode = $(newNode),
      idx = 0;

    shouldIgnore = _.some(ignoreElements, function(selector) {
      return $currentNode.is(selector);
    });

    if (shouldIgnore) {
      return;
    }

    // Handle tagname changes with full replacement
    if (newNode.tagName !== currentNode.tagName) {
      $currentNode.replaceWith(newNode);
      return;
    }

    // Remove current attributes that have changed
    // This is necessary, because some types of attributes cannot be removed
    // without causing a browser error.
    currentAttributes = currentNode.attributes;
    while (idx < currentAttributes.length) {
      currentAttr = currentAttributes[idx].name;
      if (newNode.getAttribute(currentAttr)) {
        idx++;
      } else {
        currentNode.removeAttribute(currentAttr);
      }
    }

    // Set new attributes
    _.each(newNode.attributes, function(attrib) {
      currentNode.setAttribute(attrib.name, attrib.value);
    });

    cleanupStickitData(currentNode);

    // Quick check to see if we need to bother comparing sub-levels
    if ($currentNode.html() === $newNode.html()) {
      return;
    }

    // Include all child nodes, including text and comment nodes
    $newChildNodes = $newNode.contents();
    $currChildNodes = $currentNode.contents();

    // If the DOM lists are different sizes, perform a hard refresh
    if ($newChildNodes.length !== $currChildNodes.length) {
      $currentNode.html($newNode.html());
      return;
    }

    // Perform a recursive hotswap for all children nodes
    $currChildNodes.each(function(index, currChildNode) {
      hotswap(currChildNode, $newChildNodes.get(index), ignoreElements);
    });
  }

  /*
   * Swap method for Text, Comment, and CDATA Section Nodes
   * @param currentNode {Node} The pre-existing DOM Node to update
   * @param newNode {Node} The detached DOM Node representing the desired DOM Node subtree
   */
  function updateIfNodeValueChanged(currentNode, newNode){
    var nodeValueChanged = newNode.nodeValue !== currentNode.nodeValue;
    if (nodeValueChanged) {
      $(currentNode).replaceWith(newNode);
    }
  }

  /*
   * Map of nodeType to hot swap implementations.
   * NodeTypes are hard-coded integers per the DOM Level 2 specification instead of
   * references to constants defined on the window.Node object for IE8 compatibility
   */
  var swapMethods = {
    1: swapElementNodes, // ELEMENT_NODE
    3: updateIfNodeValueChanged, // TEXT_NODE
    4: updateIfNodeValueChanged, // CDATA_SECTION_NODE
    8: updateIfNodeValueChanged, // COMMENT_NODE
    default: function(currentNode, newNode) {
      $(currentNode).replaceWith(newNode);
    }
  };

  /**
   * Static Template Engine.
   * All template renders should be piped through this method.
   *
   * @module    Torso
   * @namespace Torso.Utils
   * @class     templateRenderer
   * @static
   * @author    ariel.wexler@vecna.com
   */
  var templateRenderer = {
    /**
     * Performs efficient re-rendering of a template.
     * @method render
     * @param  $el {jQueryObject} The Element to render into
     * @param  template {Handlebars Template} The HBS template to apply
     * @param  context {Object} The context object to pass to the template
     * @param  [opts] {Object} Other options
     * @param  [opts.force=false] {Boolean} Will forcefully do a fresh render and not a diff-render
     * @param  [opts.newHTML] {String} If you pass in newHTML, it will not use the template or context, but use this instead.
     * @param  [opts.ignoreElements] {Array} jQuery selectors of DOM elements to ignore during render. Can be an expensive check
     */
    render: function($el, template, context, opts) {
      var newDOM, newHTML,
          el = $el.get(0);
      opts = opts || {};

      newHTML = opts.newHTML || template(context);
      if (opts.force) {
        $el.html(newHTML);
      } else {
        newDOM = this.copyTopElement(el);
        $(newDOM).html(newHTML);
        this.hotswapKeepCaret(el, newDOM, opts.ignoreElements);
      }
    },

    /**
     * Call this.hotswap but also keeps the caret position the same
     * @param currentNode {Node} The DOM Node corresponding to the existing page content to update
     * @param newNode {Node} The detached DOM Node representing the desired DOM subtree
     * @param ignoreElements {Array} Array of jQuery selectors for DOM Elements to ignore during render. Can be an expensive check.
     * @method hotswapKeepCaret
     */

    hotswapKeepCaret: function(currentNode, newNode, ignoreElements) {
      var currentCaret,
          activeElement;
      try {
        activeElement = document.activeElement;
      } catch (error) {
        activeElement = null;
      }
      if (activeElement && this.supportsSelection(activeElement)) {
        currentCaret = this.getCaretPosition(activeElement);
      }
      this.hotswap(currentNode, newNode, ignoreElements);
      if (activeElement && this.supportsSelection(activeElement)) {
        this.setCaretPosition(activeElement, currentCaret);
      }
    },

    // See above function declaration for method-level documentation
    hotswap: hotswap,

    /**
     * Produces a copy of the element tag with attributes but with no contents
     * @param el {Element} the DOM element to be copied
     * @return {Element} a shallow copy of the element with no children but with attributes
     * @method copyTopElement
     */
    copyTopElement: function(el) {
      var newDOM = document.createElement(el.tagName);
      _.each(el.attributes, function(attrib) {
        newDOM.setAttribute(attrib.name, attrib.value);
      });
      return newDOM;
    },

    /**
     * Determines if the element supports selection. As per spec, https://html.spec.whatwg.org/multipage/forms.html#do-not-apply
     * selection is only allowed for text, search, tel, url, password. Other input types will throw an exception in chrome
     * @param el {Element} the DOM element to check
     * @return {Boolean} boolean indicating whether or not the selection is allowed for {Element} el
     * @method supportsSelection
     */
    supportsSelection : function (el) {
      return (/text|password|search|tel|url/).test(el.type);
    },

    /**
     * Method that returns the current caret (cursor) position of a given element.
     * Source: http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
     * @method getCaretPosition
     * @param elem {element} the DOM element to check caret position
     * @return {Integer} the cursor index of the given element.
     */
    getCaretPosition: function(elem) {
      // range {IE selection object}
      // iCaretPos {Integer} will store the final caret position
      var range,
          iCaretPos = 0;
      // IE Support
      if (document.selection) {
        // Set focus on the element
        elem.focus();
        // To get cursor position, get empty selection range
        range = document.selection.createRange();
        // Move selection start to 0 position
        range.moveStart('character', -elem.value.length);
        // The caret position is selection length
        iCaretPos = range.text.length;
      } else if (elem.selectionStart || elem.selectionStart === 0) {
        // Firefox support
        iCaretPos = elem.selectionStart;
      }
      // Return results
      return iCaretPos;
    },

    /**
     * Method that returns sets the current caret (cursor) position of a given element and puts it in focus.
     * Source: http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
     * @method setCaretPosition
     * @param elem {element}
     * @param caretPos {Integer} The caret index to set
     * @return {Integer} the cursor index of the given element.
     */
    setCaretPosition: function(elem, caretPos) {
      var range;
      if (elem) {
        if (elem.createTextRange) {
          // IE support
          range = elem.createTextRange();
          range.move('character', caretPos);
          range.select();
        } else if (elem.selectionStart || elem.selectionStart === 0) {
          // Firefox support
          elem.focus();
          elem.setSelectionRange(caretPos, caretPos);
        } else {
          // At least focus the element if nothing else
          elem.focus();
        }
      }
    }
  };

  return templateRenderer;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.cache = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function(_, $) {
  /**
   * Custom additions to the Backbone Collection object.
   * - safe disposal methods for memory + event management
   * - special functional overrides to support ID registration for different views
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  cacheMixin
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var mixin = function(base) {

    var cacheMixin, createRequesterCollectionClass;

    /**
     * Returns a new class of collection that inherits from the parent but not the cacheMixin
     * and adds a requesterMixin that connects this cache to it's parent
     *
     * @method createRequesterCollectionClass
     * @param parent {Backbone Collection instance} the parent of the private collection
     * @param guid {String} the unique code of the owner of this private collection
     */
    createRequesterCollectionClass = function(parent, guid) {
      return parent.constructor.extend((function(parentClass, parentInstance, ownerKey) {

        /**
         * A mixin that overrides base collection methods meant for cache's and tailors them
         * to a requester.
         * @method requesterMixin
         */
        var requesterMixin = {

          /**
           * @method requesterMixin.getTrackedIds
           * @return {Array} array of ids that this collection is tracking
           */
          getTrackedIds: function() {
            return this.trackedIds;
          },

          /**
           * Will force the cache to fetch just the registered ids of this collection
           * @method requesterMixin.fetch
           * @param [options] - argument options
           * @param [options.idsToFetch=collectionTrackedIds] {Array} - A list of request Ids, will default to current tracked ids
           * @param [options.setOptions] {Object} - if a set is made, then the setOptions will be passed into the set method
           * @return {Promise} promise that will resolve when the fetch is complete
           */
          fetch: function(options) {
            options = options || {};
            options.idsToFetch = options.idsToFetch || this.trackedIds;
            options.setOptions = options.setOptions || {remove: false};
            return this.__loadWrapper(function() {
              if (options.idsToFetch && options.idsToFetch.length) {
                return parentInstance.fetchByIds(options);
              } else {
                return $.Deferred().resolve().promise();
              }
            });
          },

          /**
           * Will force the cache to fetch a subset of this collection's tracked ids
           * @method requesterMixin.fetchByIds
           * @param ids {Array} array of model ids
           * @param [options] {Object} if given, will pass the options argument to this.fetch. Note, will not affect options.idsToFetch
           * @return {Promise} promise that will resolve when the fetch is complete
           */
          fetchByIds: function(ids, options) {
            options = options || {};
            options.idsToFetch = _.intersection(ids, this.getTrackedIds());
            return this.fetch(options);
          },

          /**
           * Pass a list of ids to begin tracking. This will reset any previous list of ids being tracked.
           * Overrides the Id registration system to route via the parent collection
           * @method requesterMixin.trackIds
           * @param ids The list of ids that this collection wants to track
           */
          trackIds: function(ids) {
            this.remove(_.difference(this.trackedIds, ids));
            parentInstance.registerIds(ids, ownerKey);
            this.trackedIds = ids;
          },

          /**
           * Adds a new model to the requester collection and tracks the model.id
           * @method requesterMixin.addModelAndTrack
           * @param model {Backbone Model} the model to be added
           */
          addModelAndTrack: function(model) {
            this.add(model);
            parentInstance.add(model);
            this.trackNewId(model.id);
          },

          /**
           * Tracks a new id
           * @method requesterMixin.trackNewId
           * @param id {String or Number} the id attribute of the model
           */
          trackNewId: function(id) {
            this.trackIds(this.getTrackedIds().concat(id));
          },

          /**
           * Will begin tracking the new ids and then ask the cache to fetch them
           * This will reset any previous list of ids being tracked.
           * @method requesterMixin.trackAndFetch
           * @return the promise of the fetch by ids
           */
          trackAndFetch: function(newIds) {
            this.trackIds(newIds);
            return this.fetch();
          },

          /**
           * Will force the cache to fetch any of this collection's tracked models that are not in the cache
           * while not fetching models that are already in the cache. Useful when you want the effeciency of
           * pulling models from the cache and don't need all the models to be up-to-date.
           *
           * If the ids being fetched are already being fetched by the cache, then they will not be re-fetched.
           *
           * The resulting promise is resolved when ALL items in the process of being fetched have completed.
           * The promise will resolve to a unified data property that is a combination of the completion of all of the fetches.
           *
           * @method requesterMixin.pull
           * @param [options] {Object} if given, will pass the options argument to this.fetch. Note, will not affect options.idsToFetch
           * @return {Promise} promise that will resolve when the fetch is complete with all of the data that was fetched from the server.
           *                   Will only resolve once all ids have attempted to be fetched from the server.
           */
          pull: function(options) {
            options = options || {};

            //find ids that we don't have in cache and aren't already in the process of being fetched.
            var idsNotInCache = _.difference(this.getTrackedIds(), _.pluck(parentInstance.models, 'id'));
            var idsWithPromises = _.pick(parentInstance.idPromises, idsNotInCache);

            // Determine which ids are already being fetched and the associated promises for those ids.
            options.idsToFetch = _.difference(idsNotInCache, _.uniq(_.flatten(_.keys(idsWithPromises))));
            var thisFetchPromise = this.fetch(options);

            // Return a promise that resolves when all ids are fetched (including pending ids).
            var allPromisesToWaitFor = _.flatten(_.values(idsWithPromises));
            allPromisesToWaitFor.push(thisFetchPromise);
            var allUniquePromisesToWaitFor = _.uniq(allPromisesToWaitFor);
            return $.when.apply($, allUniquePromisesToWaitFor)
              // Make it look like the multiple promises was performed by a single request.
              .then(function() {
                // collects the parts of each ajax call into arrays: result = { [data1, data2, ...], [textStatus1, textStatus2, ...], [jqXHR1, jqXHR2, ...] };
                var result = _.zip(arguments);
                // Flatten the data so it looks like the result of a single request.
                var resultData = result[0];
                var flattenedResultData = _.flatten(resultData);
                return flattenedResultData;
              });
          },

          /**
           * Will register the new ids and then pull in any models not stored in the cache. See this.pull() for
           * the difference between pull and fetch.
           * @method requesterMixin.trackAndPull
           * @return the promise of the fetch by ids
           */
          trackAndPull: function(newIds) {
            this.trackIds(newIds);
            return this.pull();
          },

          /**
           * Handles the disposing of this collection as it relates to a requester collection.
           * @method requesterMixin.requesterDispose
           */
          requesterDispose: function() {
            parentInstance.removeRequester(ownerKey);
          }
        };

        return requesterMixin;
      })(parent.constructor.__super__, parent, guid));
    };

    /**
     * Adds functions to manage state of requesters
     * @method cacheMixin
     * @param collection {Collection} the collection to add this mixin
     */
    cacheMixin = function(collection) {

      //************* PRIVATE METHODS ************//

      /**
       * @private
       * @method cacheMixin.setRequestedIds
       * @param guid {String} the global unique identifier for the requester
       * @param array {Array} the array of ids the requester wants
       */
      var setRequestedIds = function(guid, array) {
        collection.requestMap[guid] = {
          array: array,
          dict: _.object(_.map(array, function(id) { return [id, id]; }))
        };
      };

      //*********** PUBLIC METHODS ************//

      /**
       * @method cacheMixin.getRequesterIds
       * @param {String} the global unique id of the requester
       * @return {Array} an array of the ids the requester with the guid has requested
       */
      collection.getRequesterIds = function(guid) {
        return this.requestMap[guid] && this.requestMap[guid].array;
      };

      /**
       * @method cacheMixin.getRequesterIdsAsDictionary
       * This method is used for quick look up of a certain id within the list of requested ids
       * @param guid {String} the global unique id of the requester
       * @return {Object} an dictionary of id -> id of the requester ids for a given requester.
       */
      collection.getRequesterIdsAsDictionary = function(guid) {
        return this.requestMap[guid] && this.requestMap[guid].dict;
      };

      /**
       * @method cacheMixin.removeRequester
       * Removes a requester from this cache. No longer receives updates
       * @param guid {String} the global unique id of the requester
       */
      collection.removeRequester = function(guid) {
        delete this.requestMap[guid];
        delete this.knownPrivateCollections[guid];
      };

      /**
       * NOTE: this methods returns only the guids for requester collections that are currently tracking ids
       * TODO: should this return just the knownPrivateCollections
       * @method cacheMixin.getRequesters
       * @return {Array} an array of the all requesters in the form of their GUID's
       */
      collection.getRequesters = function()  {
        return _.keys(this.requestMap);
      };

      /**
       * Return the list of Ids requested by this collection
       * @method cacheMixin.getAllRequestedIds
       * @return {Array} the corresponding requested Ids
       */
      collection.getAllRequestedIds = function() {
        return this.collectionTrackedIds;
      };

      /**
       * Used to return a collection of desired models given the requester object.
       * Binds a custom "resized" event to the private collections.
       * Overrides the fetch method to call the parent collection's fetchByIds method.
       * Overrides the registerIds method to redirect to its parent collection.
       * @method cacheMixin.createPrivateCollection
       * @param guid {String} Identifier for the requesting view
       * @return {Collection} an new empty collection of the same type as "this"
       */
      collection.createPrivateCollection = function(guid, args) {
        args = args || {};
        args.isRequester = true;
        args.parentInstance = collection;
        var RequesterClass = createRequesterCollectionClass(collection, guid);
        this.knownPrivateCollections[guid] = new RequesterClass(null, args);
        return this.knownPrivateCollections[guid];
      };

      /**
       * Registers a list of Ids that a particular object cares about and pushes
       * any cached models its way.
       *
       * This method intelligently updates the "_requestedIds" field to contain all unique
       * requests for Ids to be fetched.  Furthermore, the "polledFetch" method
       * is overriden such that it no longer routes through Backbone's fetch all,
       * but rather a custom "fetchByIds" method.
       * @method cacheMixin.registerIds
       * @param newIds {Array}  - New ids to register under the requester
       * @param guid {String}   - The GUID of the object that wants the ids
       */
      collection.registerIds = function(newIds, guid) {
        var i, newIdx, model, requesterIdx, storedIds,
            requesters, requesterLength, privateCollection,
            models = [],
            distinctIds = {},
            result = [];

        // Save the new requests in the map
        setRequestedIds(guid, newIds);
        requesters = collection.getRequesters();
        requesterLength = requesters.length;

        // Collect all cached models
        for (newIdx = 0; newIdx < newIds.length; newIdx++) {
          model = collection.get(newIds[newIdx]);
          if (model) {
            models.push(model);
          }
        }

        // Push cached models to the respective requester
        privateCollection = collection.knownPrivateCollections[guid];
        privateCollection.set(models, {remove: false});

        // Create a new request list
        for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
          storedIds = this.getRequesterIds(requesters[requesterIdx]);
          if (!_.isUndefined(storedIds)) {
            for (i = 0; i < storedIds.length; i++) {
              distinctIds[storedIds[i]] = true;
            }
          }
        }

        // Convert the hash table of unique Ids to a list
        for (i in distinctIds) {
          result.push(i);
        }
        this.collectionTrackedIds = result;

        // Overrides the polling mixin's fetch method
        this.polledFetch = function() {
          collection.fetchByIds({
            setOptions: {remove: true}
          });
        };
      };

      /**
       * Overrides the base fetch call if this.fetchUsingTrackedIds is true
       * Calling fetch from the cache will fetch the tracked ids if fetchUsingTrackedIds is set to true, otherwise
       * it will pass through to the default fetch.
       * @method fetch
       */
      collection.fetch = function(options) {
        options = options || {};
        if (this.fetchUsingTrackedIds) {
          return this.fetchByIds({
            setOptions: _.extend({remove: true}, options)
          });
        } else {
          return base.prototype.fetch.apply(this, options);
        }
      };

      /**
       * A custom fetch operation to only fetch the requested Ids.
       * @method cacheMixin.fetchByIds
       * @param [options] - argument options
       * @param [options.idsToFetch=collection.collectionTrackedIds] {Array} - A list of request Ids, will default to current tracked ids
       * @param [options.setOptions] {Object} - if a set is made, then the setOptions will be passed into the set method
       * @return {Promise} the promise of the fetch
       */
      collection.fetchByIds = function(options) {
        options = options || {};
        // Fires a method from the loadingMixin that wraps the fetch with events that happen before and after
        var requestedIds = options.idsToFetch || collection.collectionTrackedIds;
        var fetchComplete = false;
        var fetchPromise = this.__loadWrapper(function(options) {
          var contentType = options.fetchContentType || collection.fetchContentType;
          var ajaxOpts = {
              type: collection.fetchHttpAction,
              url: _.result(collection, 'url') + collection.getByIdsUrl,
              data: {ids: requestedIds.join(',')}
            };
          if (contentType || (ajaxOpts.type && ajaxOpts.type.toUpperCase() != 'GET')) {
            ajaxOpts.contentType = contentType || 'application/json; charset=utf-8';
            ajaxOpts.data = JSON.stringify(requestedIds);
          }
          return $.ajax(ajaxOpts)
            .done(function(data) {
              var i, requesterIdx, requesterIdsAsDict, models, privateCollection,
                  requesterLength, requesters, model,
                  requestedIdsLength = requestedIds.length,
                  setOptions = options.setOptions;
              collection.set(collection.parse(data), setOptions);
              // Set respective collection's models for requested ids only.
              requesters = collection.getRequesters();
              requesterLength = requesters.length;
              // For each requester...
              for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
                requesterIdsAsDict = collection.getRequesterIdsAsDictionary(requesters[requesterIdx]);
                models = [];
                // ... now let's iterate over the ids that were fetched ...
                for (i = 0; i < requestedIdsLength; i++) {
                  //if the id that the requester cares about matches that model whose id was just fetched...
                  if (requesterIdsAsDict[requestedIds[i]]) {
                    model = collection.get(requestedIds[i]);
                    // if the model was removed, no worries, the parent won't attempt to update the child on that one.
                    if (model) {
                      models.push(model);
                    }
                  }
                }
                privateCollection = collection.knownPrivateCollections[requesters[requesterIdx]];
                // a fetch by the parent will not remove a model in a requester collection that wasn't fetched with this call
                privateCollection.set(models, {remove: false});
              }
            });
        }, options)
          .always(function() {
            // This happens once the promise is resolved, and removes the pending promise for that id.

            // Track that the fetch was completed so we don't add a dead promise (since this is what cleans up completed promises).
            fetchComplete = true;

            // Note that an id may have multiple promises (if fetch was called multiple times and then a pull with the same id).
            // We want to wait for all of them to complete, this tracks them separately and removes the in-flight promises once they are done.
            _.each(requestedIds, function(requestedId) {
              if (collection.idPromises) {
                var existingPromisesForId = collection.idPromises[requestedId];
                var remainingPromisesForId = _.without(existingPromisesForId, fetchPromise);
                if (_.isEmpty(remainingPromisesForId)) {
                  delete collection.idPromises[requestedId];
                } else {
                  collection.idPromises[requestedId] = remainingPromisesForId;
                }
              }
            });
          });

        // Track the promises associated with each id so we know when that id has completed fetching.
        // Multiple simultaneous pulls will generate multiple promises for a shared id.
        // Pulls will not generate new promises for the given ids (if there are ids being fetched
        if (!fetchComplete) { // fixes the sync case (mainly during tests when mockjax is used).
          _.each(requestedIds, function(requestedId) {
            var existingPromises = collection.idPromises[requestedId];
            if (!existingPromises) {
              existingPromises = [];
              collection.idPromises[requestedId] = existingPromises;
            }

            existingPromises.push(fetchPromise);
          });
        }

        return fetchPromise;
      };
    };

    return {
      /**
       * The constructor constructor / initialize method for collections.
       * Allocate new memory for the local references if they
       * were null when this method was called.
       * @param [options] {Object} - optional options object
       * @param   [options.fetchHttpAction='POST'] {String} http action used to get objects by ids
       * @param   [options.getByIdsUrl='/ids'] {String} path appended to collection.url to get objects by a list of ids
       * @param   [options.fetchUsingTrackedIds=true] {Boolean} if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids
                                                               but will rather call the default fetch method.
       * @method constructor
       */
      constructor: function(models, options) {
        options = options || {};
        base.call(this, models, options);
        this.isRequester = options.isRequester;
        this.parentInstance = options.parentInstance;
        if (!this.isRequester) {
          this.requestMap = {};
          this.collectionTrackedIds = [];
          this.knownPrivateCollections = {};
          this.idPromises = {};
          var cacheDefaults = _.defaults(
            _.pick(options, 'getByIdsUrl', 'fetchHttpAction', 'fetchUsingTrackedIds'),
            _.pick(this, 'getByIdsUrl', 'fetchHttpAction', 'fetchUsingTrackedIds'),
            {
              getByIdsUrl: '/ids',
              fetchHttpAction: 'GET',
              fetchUsingTrackedIds: true
            }
          );
          _.extend(this, cacheDefaults);
          cacheMixin(this);
        } else {
          this.trackedIds = [];
          this.listenTo(this.parentInstance, 'load-begin', function() {
            this.trigger('cache-load-begin');
          });
          this.listenTo(this.parentInstance, 'load-complete', function() {
            this.trigger('cache-load-complete');
          });
        }
      },
    };
  };

  return mixin;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.cell = factory();
  }
}(this, function() {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @namespace Torso.Mixins
   * @class  cellMixin
   * @author kent.willis@vecna.com
   */
  return {
    /**
     * Whether a cell can pass as a model or not.
     * If true, the cell will not fail is persisted functions are invoked
     * If false, the cell will throw exceptions if persisted function are invoked
     * @property {Boolean} isModelCompatible
     * @default false
     */
    isModelCompatible: false,

    save: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have save';
      }
    },

    fetch: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have fetch';
      }
    },

    sync: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have sync';
      }
    },

    url: function() {
      if (!this.isModelCompatible) {
        throw 'Cell does not have url';
      }
    }
  };
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.loading = factory((root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function($) {
  /**
   * Loading logic.
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  loadingMixin
   * @author kent.willis@vecna.com
   */
  var loadingMixin = function(base) {

    return {
      /**
       * Adds the loading mixin
       * @method constructor
       * @param args {Object} the arguments to the base constructor method
       */
      constructor: function(args) {
        base.call(this, args);
        this.loadedOnceDeferred = new $.Deferred();
        this.loadedOnce = false;
        this.loading = false;
      },

      /**
       * @method hasLoadedOnce
       * @return true if this model/collection has ever loaded from a fetch call
       */
      hasLoadedOnce: function() {
        return this.loadedOnce;
      },

      /**
       * @method isLoading
       * @return true if this model/collection is currently loading new values from the server
       */
      isLoading: function() {
        return this.loading;
      },

      /**
       * @method getLoadedOncePromise
       * @return a promise that will resolve when the model/collection has loaded for the first time
       */
      getLoadedOncePromise: function() {
        return this.loadedOnceDeferred.promise();
      },

      /**
       * Wraps the base fetch in a wrapper that manages loaded states
       * @method fetch
       * @param options {Object} - the object to hold the options needed by the base fetch method
       * @return {Promise} The loadWrapper promise
       */
      fetch: function(options) {
        return this.__loadWrapper(base.prototype.fetch, options);
      },

      /**
       * Base load function that will trigger a "load-begin" and a "load-complete" as
       * the fetch happens. Use this method to wrap any method that returns a promise in loading events
       * @method __loadWrapper
       * @param fetchMethod {Function} - the method to invoke a fetch
       * @param options {Object} - the object to hold the options needed by the fetchMethod
       * @return a promise when the fetch method has completed and the events have been triggered
       */
      __loadWrapper: function(fetchMethod, options) {
        var object = this;
        this.loading = true;
        this.trigger('load-begin');
        return $.when(fetchMethod.call(object, options)).always(function() {
          if (!object.loadedOnce) {
            object.loadedOnce = true;
            object.loadedOnceDeferred.resolve();
          }
          object.loading = false;
        }).done(function(data, textStatus, jqXHR) {
          object.trigger('load-complete', {success: true, data: data, textStatus: textStatus, jqXHR: jqXHR});
        }).fail(function(jqXHR, textStatus, errorThrown) {
          object.trigger('load-complete', {success: false, jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown});
        });
      }
    };
  };

  return loadingMixin;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.polling = factory();
  }
}(this, function() {
  /**
   * Periodic Polling Object to be mixed into Backbone Collections and Models.
   *
   * The polling functionality should only be used for collections and for models that are not
   * part of any collections. It should not be used for a model that is a part of a collection.
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  pollingMixin
   * @author ariel.wexler@vecna.com
   */
  var pollingMixin = {
    /**
     * @property pollTimeoutId {Number} The id from when setTimeout was called to start polling.
     */
    pollTimeoutId: undefined,
    __pollStarted: false,
    __pollInterval: 5000,

    /**
     * Returns true if the poll is active
     * @method isPolling
     */
    isPolling: function() {
      return this.__pollStarted;
    },

    /**
     * Starts polling Model/Collection by calling fetch every pollInterval.
     * Note: Each Model/Collection will only allow a singleton of polling to occur so
     * as not to have duplicate threads updating Model/Collection.
     * @method startPolling
     * @param  pollInterval {Integer} interval between each poll in ms.
     */
    startPolling: function(pollInterval) {
      var self = this;
      if (pollInterval) {
        this.__pollInterval = pollInterval;
      }
      // have only 1 poll going at a time
      if (this.__pollStarted) {
        return;
      } else {
        this.__pollStarted = true;
        this.__poll();
        this.pollTimeoutId = window.setInterval(function() {
          self.__poll();
        }, this.__pollInterval);
      }
    },

    /**
     * Stops polling Model and clears all Timeouts.
     * @method  stopPolling
     */
    stopPolling: function() {
      window.clearInterval(this.pollTimeoutId);
      this.__pollStarted = false;
    },

    /**
     * By default, the polled fetching operation is routed directly
     * to backbone's fetch all.
     * @method polledFetch
     */
    polledFetch: function() {
      this.fetch();
    },

    //************** Private methods **************//

    /**
     * Private function to recursively call itself and poll for db updates.
     * @private
     * @method __poll
     */
    __poll: function() {
      this.polledFetch();
    }
  };

  return pollingMixin;
}));
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/cellMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/cellMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Cell = factory(root._, root.Backbone, root.Torso.Mixins.cell);
  }
}(this, function(_, Backbone, cellMixin) {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @class  Cell
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var Cell = Backbone.Model.extend({});
  _.extend(Cell.prototype, cellMixin);

  return Cell;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin', './mixins/cacheMixin', './mixins/loadingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'), require('./mixins/cacheMixin'), require('./mixins/loadingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Collection = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Mixins.cache, root.Torso.Mixins.loading);
  }
}(this, function(_, Backbone, pollingMixin, cacheMixin, loadingMixin) {
  'use strict';

  /**
   * Generic Collection
   * @module    Torso
   * @class     Collection
   * @constructor
   * @author kent.willis@vecna.com
   */
  var Collection = Backbone.Collection.extend({
      /**
       * The default filter.  Always returns itself.
       * @method filterDefault
       * @return {Collection} a new instance of this collection
       */
      filterDefault: function() {
        return this.constructor(this);
      },

      /**
       * Will abolish all listeners and events that are hooked
       * to this collection.
       * @method dispose
       */
      dispose: function() {
        this.unbind();
        this.off();
        this.stopListening();
        this.stopPolling();
        if (this.isRequester) {
          this.requesterDispose();
        }
      }
  });
  _.extend(Collection.prototype, pollingMixin);
  Collection = Collection.extend(loadingMixin(Collection));
  Collection = Collection.extend(cacheMixin(Collection));

  return Collection;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Model = factory(root._, root.Backbone, root.Torso.Mixins.polling);
  }
}(this, function(_, Backbone, pollingMixin) {
  'use strict';

  /**
   * Generic Model
   * @module    Torso
   * @class     Model
   * @constructor
   * @author kent.willis@vecna.com
   */
  var Model = Backbone.Model.extend({});
  _.extend(Model.prototype, pollingMixin);

  return Model;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/cellMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/cellMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedCell = factory(root._, root.Backbone, root.Torso.Mixins.cell);
  }
}(this, function(_, Backbone, cellMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @class     NestedModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedCell = Backbone.NestedModel.extend({});
  _.extend(NestedCell.prototype, cellMixin);

  return NestedCell;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './mixins/pollingMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./mixins/pollingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedModel = factory(root._, root.Backbone, root.Torso.Mixins.polling);
  }
}(this, function(_, Backbone, pollingMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @class     NestedModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedModel = Backbone.NestedModel.extend({});
  _.extend(NestedModel.prototype, pollingMixin);

  return NestedModel;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './Cell'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var TorsoCell = require('./Cell');
    module.exports = factory(_, TorsoCell);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Behavior = factory(root._, root.Torso.Cell);
  }
}(this, function(_, Cell) {
  'use strict';

  // Map of eventName: lifecycleMethod
  var eventMap = {
    'before-attached-callback': '_attached',
    'before-detached-callback':  '_detached',
    'before-activate-callback': '_activate',
    'before-deactivate-callback': '_deactivate',
    'before-dispose-callback': '_dispose',
    'render:before-attach-tracked-views': 'attachTrackedViews',
    'render:begin': 'prerender',
    'render:complete': 'postrender',
    'initialize:begin':  'preinitialize',
    'initialize:complete': 'postinitialize'
  };

  /**
   * Allows abstraction of common view logic into separate object
   *
   * @module Torso
   * @class  Behavior
   * @method constructor
   * @author  deena.wang@vecna.com
   */
  var Behavior = Cell.extend({
    /**
     * Unique name of the behavior instance w/in a view.  More human readable than the cid.
     * @property alias {String}
     */
    /**
     * @property cidPrefix of Behaviors
     * @type {String}
     */
    cidPrefix: 'b',

    /**
     * Add functions to be added to the view's public API. They will be behavior-scoped.
     * @property mixin
     * @type {Object}
     */
    mixin: {},

    /**
     * The behavior's prepare result will be combined with the view's prepare with the behavior's alias as the namespace.
     * effectively: { <behaviorName>: behavior.prepare() } will be combined with the view's prepare result.
     * @method prepare
     * @return a prepare context suitable to being added to the view's prepare result.
     */
    prepare: _.noop,

    /**
     * @method constructor
     * @override
     * @param behaviorOptions {Object}
     *   @param behaviorOptions.view {Backbone.View} that Behavior is attached to
     *   @param behaviorOptions.alias {Backbone.View} the alias for the behavior in this view.
     * @param [viewOptions] {Object} options passed to View's initialize
     */
    constructor: function(behaviorOptions, viewOptions) {
      behaviorOptions = behaviorOptions || {};
      if (!behaviorOptions.view) {
        throw new Error('Torso Behavior constructed without behaviorOptions.view');
      }
      this.view = behaviorOptions.view;
      if (!behaviorOptions.alias) {
        throw new Error('Torso Behavior constructed without behaviorOptions.alias');
      }
      this.alias = behaviorOptions.alias;
      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.__bindLifecycleMethods();
      Cell.apply(this, arguments);
      this.__bindEventCallbacks();
    },

    /**
     * This is called after the view's initialize method is called and will wrap the view's prepare()
     * such that it returns the combination of the view's prepare result with the behavior's prepare result
     * inside it under the behavior's alias.
     * @method __augmentViewPrepare
     * @private
     */
    __augmentViewPrepare: function() {
      var originalViewPrepareFn = _.bind(this.view.prepare, this.view);
      var wrappedPrepareFn = _.wrap(originalViewPrepareFn, this.__viewPrepareWrapper);
      this.view.prepare = _.bind(wrappedPrepareFn, this);
    },

    /**
     * Wraps the view's prepare such that it returns the combination of the view and behavior's prepare results.
     * @method __viewPrepareWrapper
     * @private
     * @param viewPrepare {Function} the prepare method from the view.
     * @return {Object} the combined view and behavior prepare() results.
     * {
     *   <behavior alias>: behavior.prepare(),
     *   ... // view prepare properties.
     * }
     */
    __viewPrepareWrapper: function(viewPrepare) {
      var viewContext = viewPrepare() || {};
      var behaviorContext = _.omit(this.toJSON(), 'view');
      _.extend(behaviorContext, this.prepare());
      viewContext[this.alias] = behaviorContext;
      return viewContext;
    },

    /**
     * Registers defined lifecycle methods to be called at appropriate time in view's lifecycle
     *
     * @method __bindLifecycleMethods
     * @private
     */
    __bindLifecycleMethods: function() {
      this.listenTo(this.view, 'initialize:complete', this.__augmentViewPrepare);
      _.each(eventMap, function(callback, event) {
        this.listenTo(this.view, event, this[callback]);
      }, this);
    },

    /**
     * Adds behavior's event handlers to view
     * Behavior's event handlers fire on view events but are run in the context of the behavior
     *
     * @method __bindEventCallbacks
     * @private
     */
    __bindEventCallbacks: function() {
      var behaviorEvents = _.result(this, 'events');
      var viewEvents = this.view.events;

      if (!viewEvents) {
        if (!behaviorEvents) {
          return;
        } else {
          viewEvents = {};
        }
      }

      var namespacedEvents = this.__namespaceEvents(behaviorEvents);
      var boundBehaviorEvents = this.__bindEventCallbacksToBehavior(namespacedEvents);

      if (_.isFunction(viewEvents)) {
        this.view.events = _.wrap(_.bind(viewEvents, this.view), function(viewEventFunction) {
          return _.extend(boundBehaviorEvents, viewEventFunction());
        });
      } else if (_.isObject(viewEvents)) {
        this.view.events = _.extend(boundBehaviorEvents, viewEvents);
      }
    },

    /**
     * Namespaces events in event hash
     *
     * @method __namespaceEvents
     * @param eventHash {Object} to namespace
     * @return {Object} with event namespaced with '.behavior' and the cid of the behavior
     * @private
     */
    __namespaceEvents: function(eventHash) {
      // coped from Backbone
      var delegateEventSplitter = /^(\S+)\s*(.*)$/;
      var namespacedEvents = {};
      var behaviorId = this.cid;
      _.each(eventHash, function(value, key) {
        var splitEventKey = key.match(delegateEventSplitter);
        var eventName = splitEventKey[1];
        var selector = splitEventKey[2];
        var namespacedEventName = eventName + '.behavior.' + behaviorId;
        namespacedEvents[[namespacedEventName, selector].join(' ')] = value;
      });
      return namespacedEvents;
    },

    /**
     * @method __bindEventCallbacksToBehavior
     * @param eventHash {Object} keys are event descriptors, values are String method names or functions
     * @return {Object} event hash with values as methods bound to view
     * @private
     */
    __bindEventCallbacksToBehavior: function(eventHash) {
      return _.mapObject(eventHash, function(method) {
        if (!_.isFunction(method)) {
          method = this[method];
        }
        return _.bind(method, this);
      }, this);
    }

  });

  return Behavior;
}));


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./Cell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ServiceCell = factory(root.Torso.Cell);
  }
}(this, function(Cell) {
  'use strict';
  /**
   * A service cell is a event listening and event emitting object that is independent of any model or view.
   * @module    Torso
   * @class  ServiceCell
   * @author kent.willis@vecna.com
   */
  var ServiceCell = Cell.extend({ });

  return ServiceCell;
}));

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
     * The render method returns a promise that resolves when rendering is complete. Typically render
     * is synchronous and the rendering is complete upon completion of the method. However, when utilizing
     * transitions/animations, the render process can be asynchronous and the promise is useful to know when it has finished.
     * @method render
     * @return {Promise} a promise that when resolved signifies that the rendering process is complete.
     */
    render: function() {
      var promises,
        view = this;
      this.trigger('render:begin');
      this.prerender();
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
      promises = this.attachTrackedViews();
      return $.when.apply($, _.flatten([promises])).done(function() {
        view.postrender();
        view.trigger('render:complete');
      });
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
     * Initializes the behaviors
     * @method __initializeBehaviors
     */
    __initializeBehaviors: function(viewOptions) {
      var view = this;
      if (!_.isEmpty(this.behaviors)) {
        view.__behaviorInstances = {};
        _.each(this.behaviors, function(behaviorDefinition, alias) {
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
          var behaviorInstance = view.__behaviorInstances[alias] = new BehaviorClass(behaviorOptions, viewOptions);
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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', './NestedModel'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('./NestedModel'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.validation = factory(root._, root.Torso.NestedModel);
    root.Torso.Mixins.validation = root.Torso.validation.mixin;
  }
}(this, function(_, NestedModel) {
  'use strict';

  // Default options
  // ---------------

  var defaultOptions = {
    forceUpdate: false,
    selector: 'name',
    labelFormatter: 'sentenceCase',
    messageFormatter: 'none',
    valid: Function.prototype,
    invalid: Function.prototype
  };


  // Helper functions
  // ----------------

  // Formatting functions used for formatting error messages
  var formatFunctions = {
    // Uses the configured label formatter to format the attribute name
    // to make it more readable for the user
    formatLabel: function(attrName, model) {
      return defaultLabelFormatters[defaultOptions.labelFormatter](attrName, model);
    },

    // Replaces nummeric placeholders like {0} in a string with arguments
    // passed to the function
    format: function() {
      return defaultMessageFormatters[defaultOptions.messageFormatter].apply(defaultMessageFormatters, arguments);
    }
  };

  // Flattens an object
  // eg:
  //
  //     var o = {
  //       owner: {
  //         name: 'Backbone',
  //         address: {
  //           street: 'Street',
  //           zip: 1234
  //         }
  //       }
  //     };
  //
  // becomes:
  //
  //     var o = {
  //       'owner': {
  //         name: 'Backbone',
  //         address: {
  //           street: 'Street',
  //           zip: 1234
  //         }
  //       },
  //       'owner.name': 'Backbone',
  //       'owner.address': {
  //         street: 'Street',
  //         zip: 1234
  //       },
  //       'owner.address.street': 'Street',
  //       'owner.address.zip': 1234
  //     };
  // This may seem redundant, but it allows for maximum flexibility
  // in validation rules.
  var flatten = function (obj, into, prefix) {
    into = into || {};
    prefix = prefix || '';

    _.each(obj, function(val, key) {
      if(obj.hasOwnProperty(key)) {
        if (!!val && typeof val === 'object' && val.constructor === Object) {
          flatten(val, into, prefix + key + '.');
        }

        // Register the current level object as well
        into[prefix + key] = val;
      }
    });

    return into;
  };

  // Validation
  // ----------

  /**
   * Validation object containing validation mixin.
   *
   * @module    Torso
   * @namespace Torso
   * @class  validation
   * @author ariel.wexler@vecna.com, kent.willis@mostlyepic.com
   */
  var Validation = (function(){

    // Returns an object with undefined properties for all
    // attributes on the model that has defined one or more
    // validation rules.
    var getValidatedAttrs = function(model, attrs) {
      attrs = attrs || _.keys(_.result(model, 'validation') || {});
      return _.reduce(attrs, function(memo, key) {
        memo[key] = void 0;
        return memo;
      }, {});
    };

    // Returns an array with attributes passed through options
    var getOptionsAttrs = function(options) {
      var attrs = options.attributes;
      if (_.isFunction(attrs)) {
        attrs = attrs();
      }
      if (_.isArray(attrs)) {
        return attrs;
      }
    };


    // Looks on the model for validations for a specified
    // attribute. Returns an array of any validators defined,
    // or an empty array if none is defined.
    var getValidators = function(model, attr) {
      var attrValidationSet = model.validation ? _.result(model, 'validation')[attr] || {} : {};

      // If the validator is a function or a string, wrap it in a function validator
      if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
        attrValidationSet = {
          fn: attrValidationSet
        };
      }

      // Stick the validator object into an array
      if(!_.isArray(attrValidationSet)) {
        attrValidationSet = [attrValidationSet];
      }

      // Reduces the array of validators into a new array with objects
      // with a validation method to call, the value to validate against
      // and the specified error message, if any
      return _.reduce(attrValidationSet, function(memo, attrValidation) {
        _.each(_.without(_.keys(attrValidation), 'msg', 'msgKey'), function(validator) {
          memo.push({
            fn: defaultValidators[validator],
            val: attrValidation[validator],
            msg: attrValidation.msg,
            msgKey: attrValidation.msgKey
          });
        });
        return memo;
      }, []);
    };

    // Gets the indices out of an attr name: foo[0][1] -> [0, 1] and foo[2] -> [2]
    var extractIndices = function(attr) {
      var startIndex, endIndex,
        i = 0,
        hasEndBracket = true,
        indices = [];
      startIndex = attr.indexOf('[', i);
      while (startIndex > 0 && hasEndBracket) {
         endIndex = attr.indexOf(']', i);
         indices.push(parseInt(attr.substring(startIndex + 1, endIndex), 10));
         i = endIndex + 1;
         hasEndBracket = i > 0;
         startIndex = attr.indexOf('[', i);
      }
      return indices;
    };

    // Generates an array of all the possible field accessors and their indices when using the "open" array notation
    // foo[] -> [{attr: 'foo[0]', index: [0]}, {attr: 'foo[1]', index: [1]}].  Will also perform nested arrays:
    // foo[][] -> [[{attr: 'foo[0][0]', index: [0][0]}], [{attr: 'foo[1][0]', index: [1][0]}]]
    var generateSubAttributes = function(attr, model, subIndices) {
      var i, attrName, remainder, subAttrs, newIndices,
        firstBracket = attr.indexOf('[]');
      if (_.isEmpty(subIndices)) {
        subIndices = [];
      }
      if (firstBracket === -1) {
        return {attr: attr, index: subIndices};
      } else {
        attrName = attr.substring(0, firstBracket);
        remainder = attr.substring(firstBracket + 2);
        subAttrs = [];
        var valueArray = model.get(attrName);
        _.each(valueArray, function(value, i) {
          newIndices = subIndices.slice();
          newIndices.push(i);
          subAttrs.push(generateSubAttributes(attrName + '[' + i + ']' + remainder, model, newIndices));
        });
        return subAttrs;
      }
    };

    // Is this model a nested torso model
    var isNestedModel = function(model) {
      return NestedModel && model instanceof NestedModel;
    };

    // Is the attribute using dot notation or array notation: foo.bar or foo[] or foo[1]
    var isNestedAttr = function(attr) {
      return attr.indexOf('.') > 0 || attr.indexOf(']') > 0;
    };

    // Remove the indices for a field name: foo[1][2] -> foo[][]
    var stripIndices = function(attr) {
      var startIndex, newAttr,
        i = 0,
        hasEndBracket = true;
      startIndex = attr.indexOf('[', i);
      if (startIndex < 0) {
        return attr;
      }
      newAttr = attr.substring(0, startIndex + 1);
      while (startIndex > 0 && hasEndBracket) {
         i = attr.indexOf(']', i) + 1;
         hasEndBracket = i > 0;
         startIndex = attr.indexOf('[', i);
         if (startIndex > 0) {
           newAttr = newAttr + attr.substring(i - 1, startIndex + 1);
         }
      }
      newAttr = newAttr + attr.substring(i - 1);
      return newAttr;
    };

    // Validates safely for a nested attribute. If the attr is an array, it will construct
    // validation errors with the same array structure ['foo[0]', 'foo[1]'] -> [false, 'Error Example']
    // Also handles nested array structure
    var validateWithOpenArrayHelper = function(model, attrConfig, value, computed, validators, depth) {
      var attr, indices;

      if (_.isArray(attrConfig)) {
        return _.reduce(attrConfig, function(memo, nestedAttrConfig) {
          memo.push(validateWithOpenArrayHelper(model, nestedAttrConfig, value, computed, validators, depth + 1));
          return memo;
        }, []);
      } else {
        indices = attrConfig.index;
        attr = attrConfig.attr;
        // if the value wasn't passed in and the attribute is nested, get the value
        if (_.isUndefined(value) && isNestedAttr(attr)) {
          value = model.get(attr);
        }
        return invokeValidator(validators, model, value, attr, computed, indices);
      }
    };

    // Invokes the validator set for an attr
    var invokeValidator = function(validators, model, value, attr, computed, indices) {
      return _.reduce(validators, function(memo, validator) {
          // Pass the format functions plus the default
          // validators as the context to the validator
          var context = _.extend({msgKey: validator.msgKey}, formatFunctions, defaultValidators),
              result = validator.fn.call(context, value, attr, validator.val, model, computed, indices);

          if (result === false || memo === false) {
            return false;
          }
          if (result && !memo) {
            return _.result(_.extend({}, validator, formatFunctions, defaultValidators), 'msg') || result;
          }
          return memo;
        }, '');
    };

    // Validates an attribute against all validators defined
    // for that attribute. If one or more errors are found,
    // the first error message is returned.
    // If the attribute is valid, an empty string is returned.
    var validateAttrWithOpenArray = function(model, attr, value, computed) {
      // Reduces the array of validators to an error message by
      // applying all the validators and returning the first error
      // message, if any.
      var hasErrors, subAttr, result,
        validators = getValidators(model, attr);
      subAttr = generateSubAttributes(attr, model);
      result = validateWithOpenArrayHelper(model, subAttr, value, computed, validators, 0);
      if (_.isArray(result)) {
        hasErrors = _.reduce(_.flatten(result), function(memo, val) {
          return memo || val;
        }, false);
        if (!hasErrors) {
          return '';
        }
      }
      return result;
    };

    // Loops through the model's attributes and validates the specified attrs.
    // Returns and object containing names of invalid attributes
    // as well as error messages.
    var validateModel = function(model, attrs, validatedAttrs) {
      var error,
          invalidAttrs = {},
          isValid = true,
          computed = _.clone(attrs);

      _.each(validatedAttrs, function(val, attr) {
        error = validateAttrWithOpenArray(model, attr, val, computed);
        if (error) {
          invalidAttrs[attr] = error;
          isValid = false;
        }
      });

      return {
        invalidAttrs: invalidAttrs,
        isValid: isValid
      };
    };

    // Validates attribute without open array notation.
    var validateAttr = function(model, value, attr) {
      var indices, validators,
        validations = model.validation ? _.result(model, 'validation') || {} : {};
      // If the validations hash contains an entry for the attr
      if (_.contains(_.keys(validations), attr)) {
        return validateAttrWithOpenArray(model, attr, value, _.extend({}, model.attributes));
      } else {
        indices = extractIndices(attr);
        attr = stripIndices(attr);
        validators = getValidators(model, attr);
        return invokeValidator(validators, model, value, attr, _.extend({}, model.attributes), indices);
      }
    };

    // Contains the methods that are mixed in on the model when binding
    var mixin = function(options) {
      return {

        /**
         * Check whether an attribute or a set of attributes are valid. It will default to use the model's current values but
         * you can pass in different values to use in the validation process instead.
         * @param attr {String or Object or Array} Either the name of the attribute, an array containing many attribute names, or
         * on object with attribute name to values
         * @param [value] {Any} a value to use for the attribute value instead of using the model's value.
         * @return undefined if no errors, a validation exception if a single attribute, or an object with attribute name as key
         * and the error as the value
         * @method preValidate
         */
        preValidate: function(attr, value) {
          var self = this,
              result = {},
              error;
          if (_.isArray(attr)) {
            _.each(attr, function(attr) {
              error = self.preValidate(attr);
              if (error) {
                result[attr] = error;
              }
            });
            return _.isEmpty(result) ? undefined : result;
          } else if (_.isObject(attr)) {
            _.each(attr, function(value, key) {
              error = self.preValidate(key, value);
              if (error) {
                result[key] = error;
              }
            });
            return _.isEmpty(result) ? undefined : result;
          } else {
            if (_.isUndefined(value) && isNestedModel(this)) {
              value = this.get(attr);
            }
            return validateAttr(this, value, attr);
          }
        },

        // Check to see if an attribute, an array of attributes or the
        // entire model is valid. Passing true will force a validation
        // of the model.
        isValid: function(option) {
          var flattened, attrs, error, invalidAttrs;

          option = option || getOptionsAttrs(options);

          if(_.isString(option)){
            attrs = [option];
          } else if(_.isArray(option)) {
            attrs = option;
          }
          if (attrs) {
            // Loop through all attributes
            _.each(attrs, function (attr) {
              var value;
              if (isNestedModel(this)) {
                value = this.get(attr);
              } else {
                value = flatten(this.attributes)[attr];
              }
              error = validateAttr(this, value, attr);
              if (error) {
                invalidAttrs = invalidAttrs || {};
                invalidAttrs[attr] = error;
              }
            }, this);
          }

          if (option === true) {
            invalidAttrs = this.validate();
          }
          if (invalidAttrs) {
            this.trigger('invalid', this, invalidAttrs, {validationError: invalidAttrs});
          }
          return attrs ? !invalidAttrs : this.validation ? this._isValid : true;
        },

        // This is called by Backbone when it needs to perform validation.
        // You can call it manually without any parameters to validate the
        // entire model.
        validate: function(attrs, setOptions){
          var model = this;
          var opt = _.extend({}, options, setOptions);
          var validatedAttrs = getValidatedAttrs(model, getOptionsAttrs(options));
          var allAttrs = _.extend({}, validatedAttrs, model.attributes, attrs);
          var flattened = _.extend(flatten(allAttrs), attrs); // allow people to pass in nested attributes
          var changedAttrs = attrs ? flatten(attrs) : flattened;
          var result = validateModel(model, allAttrs, _.pick(flattened, _.keys(validatedAttrs)));
          model._isValid = result.isValid;

          // Trigger validated events.
          // Need to defer this so the model is actually updated before
          // the event is triggered.
          _.defer(function() {
            model.trigger('validated', model._isValid, model, result.invalidAttrs);
            model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
          });

          // Return any error messages to Backbone, unless the forceUpdate flag is set.
          // Then we do not return anything and fools Backbone to believe the validation was
          // a success. That way Backbone will update the model regardless.
          if (!opt.forceUpdate && _.intersection(_.keys(result.invalidAttrs), _.keys(changedAttrs)).length > 0) {
            return result.invalidAttrs;
          }
        }
      };
    };

    // Returns the public methods on Backbone.Validation
    return {

      // Current version of the library
      version: '0.11.3',

      // Called to configure the default options
      configure: function(options) {
        _.extend(defaultOptions, options);
      },

      // Used to extend the Backbone.Model.prototype
      // with validation
      mixin: mixin(defaultOptions)
    };
  }());


  // Patterns
  // --------

  var defaultPatterns = Validation.patterns = {
    // Matches any digit(s) (i.e. 0-9)
    digits: /^\d+$/,

    // Matches any number (e.g. 100.000)
    number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,

    // Matches a valid email address (e.g. mail@example.com)
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

    // Mathes any valid url (e.g. http://www.xample.com)
    url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  };


  // Error messages
  // --------------

  // Error message for the build in validators.
  // {x} gets swapped out with arguments form the validator.
  var defaultMessages = Validation.messages = {
    required: '{0} is required',
    acceptance: '{0} must be accepted',
    min: '{0} must be greater than or equal to {1}',
    max: '{0} must be less than or equal to {1}',
    range: '{0} must be between {1} and {2}',
    length: '{0} must be {1} characters',
    minLength: '{0} must be at least {1} characters',
    maxLength: '{0} must be at most {1} characters',
    rangeLength: '{0} must be between {1} and {2} characters',
    oneOf: '{0} must be one of: {1}',
    equalTo: '{0} must be the same as {1}',
    digits: '{0} must only contain digits',
    number: '{0} must be a number',
    email: '{0} must be a valid email',
    url: '{0} must be a valid url',
    inlinePattern: '{0} is invalid'
  };

  // Label formatters
  // ----------------

  // Label formatters are used to convert the attribute name
  // to a more human friendly label when using the built in
  // error messages.
  // Configure which one to use with a call to
  //
  //     Backbone.Validation.configure({
  //       labelFormatter: 'label'
  //     });
  var defaultLabelFormatters = Validation.labelFormatters = {

    // Returns the attribute name with applying any formatting
    none: function(attrName) {
      return attrName;
    },

    // Converts attributeName or attribute_name to Attribute name
    sentenceCase: function(attrName) {
      return attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
        return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
      }).replace(/_/g, ' ');
    },

    // Looks for a label configured on the model and returns it
    //
    //      var Model = Backbone.Model.extend({
    //        validation: {
    //          someAttribute: {
    //            required: true
    //          }
    //        },
    //
    //        labels: {
    //          someAttribute: 'Custom label'
    //        }
    //      });
    label: function(attrName, model) {
      return (model.labels && model.labels[attrName]) || defaultLabelFormatters.sentenceCase(attrName, model);
    }
  };

  // Message Formatters
  // ------------------

  var defaultMessageFormatters = Validation.messageFormatters = {
    none: function() {
      var args = Array.prototype.slice.call(arguments),
        text = args.shift();
      return text.replace(/\{(\d+)\}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
      });
    }
  };

  // Built in validators
  // -------------------

  var defaultValidators = Validation.validators = (function(){
    // Use native trim when defined
    var trim = String.prototype.trim ?
      function(text) {
        return text === null ? '' : String.prototype.trim.call(text);
      } :
      function(text) {
        var trimLeft = /^\s+/,
            trimRight = /\s+$/;

        return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
      };

    // Determines whether or not a value is a number
    var isNumber = function(value){
      return _.isNumber(value) || (_.isString(value) && value.match(defaultPatterns.number));
    };

    // Determines whether or not a value is empty
    var hasValue = function(value) {
      return !(_.isNull(value) || _.isUndefined(value) || (_.isString(value) && trim(value) === '') || (_.isArray(value) && _.isEmpty(value)));
    };

    var getMessageKey = function(msgKey, defaultKey) {
      return msgKey ? msgKey : defaultKey;
    };

    return {
      format: formatFunctions.format,
      formatLabel: formatFunctions.formatLabel,

      // Function validator
      // Lets you implement a custom function used for validation
      fn: function(value, attr, fn, model, computed) {
        if(_.isString(fn)){
          fn = model[fn];
        }
        return fn.call(model, value, attr, computed);
      },

      // Allows the creation of an inline function that uses the validators context
      // instead of the model context.
      inlineFn: function(value, attr, fn, model, computed, indices) {
        return fn.call(this, value, attr, model, computed, indices);
      },

      // Required validator
      // Validates if the attribute is required or not
      // This can be specified as either a boolean value or a function that returns a boolean value
      required: function(value, attr, required, model, computed) {
        var isRequired = _.isFunction(required) ? required.call(model, value, attr, computed) : required;
        if(!isRequired && !hasValue(value)) {
          return false; // overrides all other validators
        }
        if (isRequired && !hasValue(value)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.required), this.formatLabel(attr, model));
        }
      },

      // Acceptance validator
      // Validates that something has to be accepted, e.g. terms of use
      // `true` or 'true' are valid
      acceptance: function(value, attr, accept, model) {
        if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.acceptance), this.formatLabel(attr, model));
        }
      },

      // Min validator
      // Validates that the value has to be a number and equal to or greater than
      // the min value specified
      min: function(value, attr, minValue, model) {
        if (!isNumber(value) || value < minValue) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.min), this.formatLabel(attr, model), minValue);
        }
      },

      // Max validator
      // Validates that the value has to be a number and equal to or less than
      // the max value specified
      max: function(value, attr, maxValue, model) {
        if (!isNumber(value) || value > maxValue) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.max), this.formatLabel(attr, model), maxValue);
        }
      },

      // Range validator
      // Validates that the value has to be a number and equal to or between
      // the two numbers specified
      range: function(value, attr, range, model) {
        if(!isNumber(value) || value < range[0] || value > range[1]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.range), this.formatLabel(attr, model), range[0], range[1]);
        }
      },

      // Length validator
      // Validates that the value has to be a string with length equal to
      // the length value specified
      length: function(value, attr, length, model) {
        if (!_.isString(value) || value.length !== length) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.length), this.formatLabel(attr, model), length);
        }
      },

      // Min length validator
      // Validates that the value has to be a string with length equal to or greater than
      // the min length value specified
      minLength: function(value, attr, minLength, model) {
        if (!_.isString(value) || value.length < minLength) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.minLength), this.formatLabel(attr, model), minLength);
        }
      },

      // Max length validator
      // Validates that the value has to be a string with length equal to or less than
      // the max length value specified
      maxLength: function(value, attr, maxLength, model) {
        if (!_.isString(value) || value.length > maxLength) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.maxLength), this.formatLabel(attr, model), maxLength);
        }
      },

      // Range length validator
      // Validates that the value has to be a string and equal to or between
      // the two numbers specified
      rangeLength: function(value, attr, range, model) {
        if (!_.isString(value) || value.length < range[0] || value.length > range[1]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.rangeLength), this.formatLabel(attr, model), range[0], range[1]);
        }
      },

      // One of validator
      // Validates that the value has to be equal to one of the elements in
      // the specified array. Case sensitive matching
      oneOf: function(value, attr, values, model) {
        if(!_.include(values, value)){
          return this.format(getMessageKey(this.msgKey, defaultMessages.oneOf), this.formatLabel(attr, model), values.join(', '));
        }
      },

      // Equal to validator
      // Validates that the value has to be equal to the value of the attribute
      // with the name specified
      equalTo: function(value, attr, equalTo, model, computed) {
        if(value !== computed[equalTo]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.equalTo), this.formatLabel(attr, model), this.formatLabel(equalTo, model));
        }
      },

      // Pattern validator
      // Validates that the value has to match the pattern specified.
      // Can be a regular expression or the name of one of the built in patterns
      pattern: function(value, attr, pattern, model) {
        if (!hasValue(value) || !value.toString().match(defaultPatterns[pattern] || pattern)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages[pattern]) || defaultMessages.inlinePattern, this.formatLabel(attr, model), pattern);
        }
      }
    };
  }());

  return Validation;
}));

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
          var configMappingForAlias = config.mapping[modelAlias];
          if (_.isString(configMappingForAlias)) {
            configMappingForAlias = configMappingForAlias.split(' ');
          } else if (configMappingForAlias === true) {
            configMappingForAlias = undefined;
          }
          config.mapping[modelAlias] = configMappingForAlias;
        });
      } else {
        config.mapping = fields;
      }
      this.__currentMappings[alias] = config;
      if (models) {
        if (computed) {
          this.setTrackedModels(models, copy);
        } else {
          this.setTrackedModel(alias, models, copy);
        }
      }
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
      this.__currentMappings = {};
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
            this.__pull(mappingAlias);
          }
          if (config.computed) {
            modelAliases = this.__getModelAliases(mappingAlias);
            if (_.contains(modelAliases, alias)) {
              this.__pull(mappingAlias);
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
      var config = this.getMapping(alias);
      if (config.computed && config.mapping.pull) {
        this.__invokeComputedPull.call({formModel: this, alias: alias});
      } else if (config.computed) {
        var modelAliases = this.__getModelAliases(alias);
        _.each(modelAliases, function(modelAlias) {
          var model = this.getTrackedModel(modelAlias);
          if (model) {
            this.__copyFields(config.mapping[modelAlias], this, model);
          }
        }, this);
      } else {
        var model = this.getTrackedModel(alias);
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
      var config = this.getMapping(alias);
      if (config.computed && config.mapping.push) {
        var models = this.__getComputedModels(alias);
        if (models) {
          config.mapping.push.call(this, models);
        }
      } else if (config.computed) {
        var modelAliases = this.__getModelAliases(alias);
        _.each(modelAliases, function(modelAlias) {
          var model = this.getTrackedModel(modelAlias);
          if (model) {
            this.__copyFields(config.mapping[modelAlias], model, this);
          }
        }, this);
      } else {
        var model = this.getTrackedModel(alias);
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
          if (model) {
            this.__updateCache(model);
          }
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
      if ((!fields || fields === true) && this === origin && _.size(this.getTrackedModels()) > 1) {
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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './View', './templateRenderer'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'), require('./View'), require('./templateRenderer'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.ListView = factory(root._, root.$, root.Torso.View, root.Torso.Utils.templateRenderer);
  }
}(this, function(_, $, View, templateRenderer) {
  'use strict';

    var removeItemView, _removeItemView, addItemView, _addItemView, aggregateRenders, breakDelayedRender;

    /**
     * If one exists, this method will clear the delayed render timeout and invoke render
     * @param view {List View} the list view
     * @private
     * @method breakDelayedRender
     */
    breakDelayedRender = function(view) {
      if (view.__delayedRenderTimeout) {
        clearTimeout(view.__delayedRenderTimeout);
        view.__delayedRenderTimeout = null;
        view.render();
      }
    };

    /**
     * Aggregates calls to render by waiting a certain amount of time and then rendering.
     * Calls that happen while it is waiting, will be swallowed. Useful for when you want to
     * batch render calls
     * @private
     * @method aggregateRenders
     * @param wait {Numeric} the number of milliseconds to wait before rendering
     * @param view {List View} the list view
     */
    aggregateRenders = function(wait, view) {
      var postpone = function() {
        view.__delayedRenderTimeout = null;
        view.render();
      };
      return function() {
        if (!view.__delayedRenderTimeout && wait > 0) {
          view.__delayedRenderTimeout = setTimeout(postpone, wait);
        } else if (wait <= 0) {
          view.render();
        }
      };
    };

    /**
     * Handles the removal of an item view if a model has been removed from the collection
     * @private
     * @method removeItemView
     * @param model {Backbone Model instance} the model that has been removed
     */
    removeItemView = function(model) {
      var itemView = this.getItemViewFromModel(model);
      if (itemView) {
        _removeItemView.call(this, itemView, model[this.__modelId], model);
        if (!this.hasItemViews()) {
          this.__delayedRender();
        }
      }
    };

    /**
     * Disposes of an item view, unregisters, stops tracking and triggers a 'item-view-removed' event
     * with the model and an item view as the payload.
     * @private
     * @method _removeItemView
     * @param itemView {Backbone View instance} the view being removed
     * @param modelId {String or Number} the id used for the model
     * @param [model] {Backbone Model instance} the model
     */
    _removeItemView = function(itemView, modelId, model) {
      itemView.dispose();
      this.unregisterTrackedView(itemView, { shared: false });
      delete this.__modelToViewMap[modelId];
      this.__updateOrderedModelIdList();
      this.trigger('item-view-removed', {model: model || itemView.model, view: itemView});
      this.trigger('child-view-removed', {model: model || itemView.model, view: itemView});
    };

    /**
     * Handles the addition of an item view if a model has been added to the collection.
     * When possible, it will append the view instead of causing a rerender
     * @private
     * @method addItemView
     * @param model the model being added
     */
    addItemView = function(model) {
      var itemView,
          models = this.modelsToRender(),
          indexOfModel = models.indexOf(model);
      if (indexOfModel > -1) {
        itemView = this.__createItemView(model);
        _addItemView.call(this, itemView, indexOfModel);
      }
    };

    /**
     * Adds the new item view before or after a sibling view. If no sibling view exists
     * or if this item view is the first, it will cause a re-render. This method will break
     * any delayed renders and force a re-render before continuing.
     * @private
     * @method _addItemView
     * @param itemView the view being added
     * @param indexOfModel - the index of the model into the array of models to render
     */
    _addItemView = function(itemView, indexOfModel) {
      var viewAfter, viewBefore, replaceMethod,
        models = this.modelsToRender();
      if (!this.hasItemViews()) {
        this.__delayedRender();
      } else {
        breakDelayedRender(this);
        viewAfter = this.getItemViewFromModel(models[indexOfModel + 1]);
        viewBefore = this.getItemViewFromModel(models[indexOfModel - 1]);
        if (viewAfter) {
          replaceMethod = _.bind(viewAfter.$el.before, viewAfter.$el);
        } else if (viewBefore) {
          replaceMethod = _.bind(viewBefore.$el.after, viewBefore.$el);
        } else {
          this.__delayedRender();
        }
        if (replaceMethod) {
          this.attachView(null, itemView, {
            replaceMethod: replaceMethod,
            discardInjectionSite: true
          });
        }
      }
    };

  /**
   * A view that is backed by a collection that managers views per model in the collection.
   * @module    Torso
   * @class     ListView
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var ListView = View.extend({
    /**
     * The collection that holds the models that this list view will track
     * @property collection
     * @type Collection
     */
    collection: null,
    /**
     * The item view class definition that will be instantiated for each model in the list.
     * itemView can also be a function that takes a model and returns a view class. This allows
     * for different view classes depending on the model.
     * NOTE: replacement for deprecated field: childView
     * @property itemView
     * @type View or Function
     */
    itemView: null,
    /**
     * The template that allows a list view to hold it's own HTML like filter buttons, etc.
     * @property template
     * @type HTML Template
     */
    template: null,
    /**
     * If provided, this template that will be shown if the modelsToRender() method returns
     * an empty list. If an itemContainer is provided, the empty template will be rendered there.
     * @property emptyTemplate
     * @type HTML Template
     */
    emptyTemplate: null,
    /**
     * (Required if 'template' is provided, ignored otherwise) name of injection site for list of item views
     * NOTE: replacement for deprecated field: childContainer
     * @property itemContainer
     * @type String
     */
    itemContainer: null,
    __modelName: '',
    __modelId: '',
    __modelToViewMap: null,
    __itemContext: null,
    __renderWait: 0,
    __delayedRender: null,
    __delayedRenderTimeout: null,

    /**
     * Constructor for the list view object.
     * @method constructor
     * @param args {Object} - options argument
     *   @param args.itemView {Backbone.View definition or Function} - the class definition of the item view. This view will be instantiated for every model returned by modelsToRender(). If a function is passed in, then for each model, this function will be invoked to find the appropriate view class. It takes the model as the only parameter.
     *   @param args.collection {Backbone.Collection instance} - The collection that will back this list view. A subclass of list view might provide a default collection. Can be private or public collection
     *   @param [args.itemContext] {Object or Function} - object or function that's passed to the item view's during initialization under the name "context". Can be used by the item view during their prepare method.
     *   @param [args.template] {HTML Template} - allows a list view to hold it's own HTML like filter buttons, etc.
     *   @param [args.itemContainer] {String}  - (Required if 'template' is provided, ignored otherwise) name of injection site for list of item views
     *   @param [args.emptyTemplate] {HTML Template} - if provided, this template will be shown if the modelsToRender() method returns an empty list. If a itemContainer is provided, the empty template will be rendered there.
     *   @param [args.modelsToRender] {Function} - If provided, this function will override the modelsToRender() method with custom functionality.
     *   @param [args.renderWait=0] {Numeric} - If provided, will collect any internally invoked renders (typically through collection events like reset) for a duration specified by renderWait in milliseconds and then calls a single render instead. Helps to remove unnecessary render calls when modifying the collection often.
     *   @param [args.modelId='cid'] {'cid' or 'id'} - model property used as identifier for a given model. This property is saved and used to find the corresponding view.
     *   @param [args.modelName='model'] {String} - name of the model argument passed to the item view during initialization
     *   @param [args.childView] {String} DEPRECATED - deprecated alias to args.itemView
     *   @param [args.childContext] {String} DEPRECATED - deprecated alias to args.itemContext
     *   @param [args.childContainer] {String} DEPRECATED - deprecated alias to args.itemContainer
     *   @param [args.childModel] {String} DEPRECATED - deprecated alias to args.modelName
     */
    constructor: function(args) {
      View.apply(this, arguments);
      args = args || {};

      var collection = args.collection || this.collection;

      this.template = args.template || this.template;
      this.emptyTemplate = args.emptyTemplate || this.emptyTemplate;
      this.itemView = args.itemView || this.itemView || args.childView || this.childView;
      this.itemContainer = args.itemContainer || this.itemContainer || args.childrenContainer || this.childrenContainer;
      if (this.template && !this.itemContainer) {
        throw 'Item container is required when using a template';
      }
      this.modelsToRender = args.modelsToRender || this.modelsToRender;
      this.__itemContext = args.itemContext || this.__itemContext || args.childContext || this.__childContext;
      this.__modelToViewMap = {};
      this.__renderWait = args.renderWait || this.__renderWait;
      this.__modelId = args.modelId || 'cid';
      this.__modelName = args.modelName || args.childModel || 'model';
      this.__orderedModelIdList = [];
      this.__createItemViews();
      this.__delayedRender = aggregateRenders(this.__renderWait, this);

      if (collection) {
        this.setCollection(collection);
      }

      this.on('render:after-dom-update', this.__cleanupItemViewsAfterAttachedToParent);
    },

    /**
     * Sets the collection from which this view generates item views.
     * This method will attach all necessary event listeners to the new collection to auto-generate item views
     * and has the option of removing listeners on a previous collection.
     *
     * @method setCollection
     * @param collection {Backbone.Collection instance} the new collection that this list view should use.
     */
    setCollection: function(collection) {
      this.stopListening(this.collection, 'remove', removeItemView);
      this.stopListening(this.collection, 'add', addItemView);
      this.stopListening(this.collection, 'sort', this.reorder);
      this.stopListening(this.collection, 'reset', this.update);

      this.collection = collection;

      this.listenTo(this.collection, 'remove', removeItemView);
      this.listenTo(this.collection, 'add', addItemView);
      this.listenTo(this.collection, 'sort', this.reorder);
      this.listenTo(this.collection, 'reset', this.update);
    },

    /**
     * Override of View.__updateDOM
     * Builds a single DOM fragment from the item views and attaches it at once.
     * @method __updateDOM
     */
    updateDOM: function() {
      var injectionSite,
        newDOM = $(templateRenderer.copyTopElement(this.el));
      if (this.template) {
        newDOM.html(this.template(this.prepare()));
        injectionSite = newDOM.find('[inject=' + this.itemContainer + ']');
      } else {
        injectionSite = $('<span>');
        newDOM.append(injectionSite);
      }
      if (this.hasItemViews()) {
        injectionSite.replaceWith(this.__emptyAndRebuildItemViewsFragment());
      } else if (this.emptyTemplate) {
        injectionSite.replaceWith(this.emptyTemplate(this.prepareEmpty()));
      }
      this.$el.html(newDOM.contents());
    },

    /**
     * Completes each item view's lifecycle of being attached to a parent.
     * Because the item views are attached in a non-standard way, it's important to make sure
     * that the item views are in the appropriate state after being attached as one fragment.
     * @method __cleanupItemViewsAfterAttachedToParent
     * @private
     */
    __cleanupItemViewsAfterAttachedToParent: function() {
      _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          itemView.delegateEvents();
          if (!itemView.__attachedCallbackInvoked && itemView.isAttached()) {
            itemView.__invokeAttached();
          }
          itemView.activate();
        } else {
          // Shouldn't get here. Item view is missing...
        }
      }, this);
    },

    /**
     * Loops through children views and renders them
     * @method renderChildViews
     */
    renderChildViews: function() {
      _.each(this.getTrackedViews({child: true}), function(childView) {
        childView.render();
      });
    },

    /**
     * Takes existing item views and moves them into correct order defined by
     * this.modelsToRender(). NOTE: As this method doesn't generate or remove views,
     * this method takes advantage of jquery's ability to move elements already attached to the DOM.
     * @method reorder
     */
    reorder: function() {
      var firstItemView, sameOrder,
        elements = [],
        models = this.modelsToRender(),
        newOrderOfIds = _.pluck(models, this.__modelId),
        sizeOfNewModels = _.size(newOrderOfIds),
        sizeOfOldModels = _.size(this.__orderedModelIdList),
        sameSize = sizeOfNewModels === sizeOfOldModels;

      if (sameSize) {
        // is order the same?
        sameOrder = _.reduce(this.__orderedModelIdList, function(result, oldId, index) {
          return result && newOrderOfIds[index] == oldId;
        }, true);
      } else {
        throw 'Reorder should not be invoked if the number of models have changed';
      }
      if (!sizeOfNewModels || sameOrder) {
        // stop early if there are no models to reorder or the models are the same
        return;
      }
      _.each(models, function(model, index) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          elements.push(itemView.$el);
        }
        if (index === 0) {
          firstItemView = itemView;
        }
      }, this);
      // elements that are already connected to the DOM will be moved instead of re-attached
      // meaning that detach, delegate events, and attach are not needed
      if (!this.itemContainer) {
        this.$el.append(elements);
      } else if (firstItemView) {
        var injectionSite = $("<span>");
        firstItemView.$el.before(injectionSite);
        injectionSite.after(elements);
        injectionSite.remove();
      }
      this.__updateOrderedModelIdList(newOrderOfIds);
      this.trigger('reorder-complete');
    },

    /**
     * Override if you want a different context for your empty template. Defaults to this.prepare()
     * @method prepareEmpty
     * @return a context that can be used by the empty list template
     */
    prepareEmpty: function() {
      return this.prepare();
    },

    /**
     * Returns an array of which models should be rendered.
     * By default, all models in the input collection will be
     * shown.  Extensions of this class may override this
     * method to apply collection filters.
     * @method modelsToRender
     */
    modelsToRender: function() {
      return this.collection ? this.collection.models : [];
    },

    /**
     * Builds any new views, removes stale ones, and re-renders
     * @method update
     */
    update: function() {
      var view = this,
        renderNeeded = false,
        oldViews = this.getItemViews(),
        newViews = this.__createItemViews(),
        staleViews = this.__getStaleItemViews(),
        sizeOfOldViews = _.size(oldViews),
        sizeOfNewViews = _.size(newViews),
        sizeOfStaleViews = _.size(staleViews),
        sizeOfFinalViews = sizeOfOldViews - sizeOfStaleViews + sizeOfNewViews,
        changes = sizeOfNewViews + sizeOfStaleViews,
        percentChange = changes / Math.max(sizeOfFinalViews, 1),
        fromEmptyToNotEmpty = !sizeOfOldViews && sizeOfNewViews,
        fromNotEmptyToEmpty = sizeOfOldViews && sizeOfOldViews === sizeOfStaleViews && !sizeOfNewViews,
        threshold = this.updateThreshold || 0.5,
        signficantChanges = percentChange >= threshold;
      if (changes <= 0) {
        return this.reorder();
      }
      // A switch from empty to not empty or vise versa, needs a new render
      renderNeeded = fromEmptyToNotEmpty || fromNotEmptyToEmpty || signficantChanges;
      if (renderNeeded) {
        this.__removeStaleItemViews(staleViews);
        this.__delayedRender();
      } else {
        this.__updateByAddingRemoving(oldViews, newViews, staleViews);
      }
    },

    /**
     * Returns the view that corresponds to the model if one exists
     * @param model {Model} the model
     * @return the item view corresponding to the model
     * @method getItemViewFromModel
     */
    getItemViewFromModel: function(model) {
      return model ? this.getTrackedView(this.__modelToViewMap[model[this.__modelId]]) : undefined;
    },

    /**
     * Alias method for getItemViewFromModel()
     * @method getChildViewFromModel
     */
    getChildViewFromModel: function() {
      return this.getItemViewFromModel.apply(this, arguments);
    },

    /**
     * @return {Boolean} returns true if there exists any generated item views
     * @method hasItemViews
     */
    hasItemViews: function() {
      return !_.isEmpty(this.getItemViews());
    },

    /**
     * @return {Array of views} Returns unordered list of views generated by this list view
     * @method getItemViews
     */
    getItemViews: function() {
      var view = this;
      var orderedViewIds = _.map(this.__orderedModelIdList, this.__getViewIdFromModelId, this);
      return _.map(orderedViewIds, this.getTrackedView, this);
    },

    //************** Private methods **************//

    /**
     * Creates all needed item views that don't exist from modelsToRender()
     * @method __createItemViews
     * @private
     * @return {Array} each object in array contains a 'view' and 'indexOfModel' field
     */
    __createItemViews: function() {
      var newItemViews = [];
      _.each(this.modelsToRender(), function(model, indexOfModel) {
        var itemView = this.getItemViewFromModel(model);
        if (!itemView) {
          newItemViews.push({
            view: this.__createItemView(model, true),
            indexOfModel: indexOfModel
          });
        }
      }, this);
      this.__updateOrderedModelIdList();
      return newItemViews;
    },

    /**
     * Creates an item view and stores a reference to it
     * @method __createItemView
     * @private
     * @param model {Backbone Model} the model to create the view from
     * @param [noUpdateToIdList=false] if true, the internal order of model ids are not updated
     * @return {Backbone View} the new item view
     */
    __createItemView: function(model, noUpdateToIdList) {
      var itemView,
        ItemViewClass = this.itemView;
      if (!_.isFunction(this.itemView.extend)) {
        ItemViewClass = this.itemView(model);
      }
      itemView = new ItemViewClass(this.__generateItemViewArgs(model));
      this.registerTrackedView(itemView, { shared: false });
      this.__modelToViewMap[model[this.__modelId]] = itemView.cid;
      if (!noUpdateToIdList) {
        this.__updateOrderedModelIdList();
      }
      this.trigger('child-view-added', {model: model, view: itemView});
      this.trigger('item-view-added', {model: model, view: itemView});
      return itemView;
    },

    /**
     * Gets all item views that have models that are no longer tracked by modelsToRender
     * @method __getStaleItemViews
     * @return {Array} An array of information about stale items. Each object has a 'view' and 'modelId' field
     * @private
     */
    __getStaleItemViews: function() {
      var staleItemViews = [];
      var modelsWithViews = _.clone(this.__modelToViewMap);
      _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          delete modelsWithViews[model[this.__modelId]];
        }
      }, this);
      _.each(modelsWithViews, function(viewId, modelId) {
        var itemView = this.getTrackedView(viewId);
        if (itemView) {
          staleItemViews.push({ view: itemView, modelId: modelId });
        }
      }, this);
      return staleItemViews;
    },

    /**
     * Removes the item views that no longer have models returned by modelsToRender()
     * @method __removeStaleItemViews
     * @param [staleItemViewInfo] {Array of objects:
     *   [{
     *     view: stale item view,
     *     modelId: id of model item
     *   }]} If provided, stale items will not be found, but this array will be used instead.
     * @private
     */
    __removeStaleItemViews: function(staleItemViewInfo) {
      var view = this;
      staleItemViewInfo = staleItemViewInfo || this.__getStaleItemViews();
      _.each(staleItemViewInfo, function(staleViewInfo) {
        _removeItemView.call(view, staleViewInfo.view, staleViewInfo.modelId);
      });
    },

    /**
     * Creates a DOM fragment with each item view appended in the order defined by
     * modelsToRender(). This will clear the List View's DOM and invoke the necessary
     * detach, register and render logic on each item view.
     * @return a DOM fragment with item view elements appended
     * @method __emptyAndRebuildItemViewsFragment
     * @private
     */
    __emptyAndRebuildItemViewsFragment: function() {
      var injectionFragment = document.createDocumentFragment();
      // Clearing the DOM will reduce the repaints needed as we detach each item view.
      this.$el.empty();

     _.each(this.modelsToRender(), function(model) {
        var itemView = this.getItemViewFromModel(model);
        if (itemView) {
          // detach to be safe, but during a render, the item views will already be detached.
          itemView.detach();
          this.registerTrackedView(itemView);
          itemView.attachTo(null, {
            replaceMethod: function($el) {
              injectionFragment.appendChild($el[0]);
            },
            discardInjectionSite: true
          });
        }
      }, this);
      this.__updateOrderedModelIdList();
      return $(injectionFragment);
    },

    /**
     * Attempts to insert new views and remove stale views individually and correctly reorder all views in an
     * attempt to be faster then a full view re-render
     * @method __updateByAddingRemoving
     * @param oldViews {Array of Views} - correctly ordered list of views before making changes to models to render
     * @param newViews {Array of Views} - the new views created that will be inserted
     * @param staleViews {Array of Views} - the stale views that will be removed
     */
    __updateByAddingRemoving: function(oldViews, newViews, staleViews) {
      var firstItemViewLeft, injectionSite,
        view = this,
        sizeOfOldViews = _.size(oldViews),
        sizeOfNewViews = _.size(newViews),
        sizeOfStaleViews = _.size(staleViews);
      if (view.itemContainer && sizeOfOldViews && sizeOfOldViews == sizeOfStaleViews) {
        // we removed all the views!
        injectionSite = $('<span>');
        _.first(oldViews).$el.before(injectionSite);
      }
      view.__removeStaleItemViews(staleViews);
      _.each(newViews, function(createdViewInfo, indexOfView) {
        if (createdViewInfo.indexOfModel === 0) {
          // need to handle this case uniquely.
          var replaceMethod;
          if (!view.itemContainer) {
            replaceMethod = _.bind(view.$el.prepend, view.$el);
          } else {
            if (injectionSite) {
              replaceMethod = _.bind(injectionSite.replaceWith, injectionSite);
            } else {
              var staleModelIdMap = _.indexBy(staleViews, 'modelId');
              var firstModelIdLeft = _.find(view.__orderedModelIdList, function(modelId) {
                return !staleModelIdMap[modelId];
              });
              firstItemViewLeft = view.getTrackedView(view.__modelToViewMap[firstModelIdLeft]);
              replaceMethod = _.bind(firstItemViewLeft.$el.prepend, firstItemViewLeft.$el);
            }
          }
          view.attachView(null, createdViewInfo.view, {
            replaceMethod: replaceMethod,
            discardInjectionSite: true
          });
        } else {
          // There will always the view before this one because we are adding new views in order
          // and we took care of the initial case.
          _addItemView.call(view, createdViewInfo.view, createdViewInfo.indexOfModel);
        }
      });
      this.reorder();
    },

    /**
     * Updates the internal list of model ids that correspond to the models used for the current
     * list of item views. The order is the same order of the item views.
     * @method __updateOrderedModelIdList
     * @param [newIdsList] {Array of ids} - if passed the array, it will use that instead of finding the list.
     * @private
     */
    __updateOrderedModelIdList: function(newIdsList) {
      this.__orderedModelIdList = newIdsList || _.pluck(this.modelsToRender(), this.__modelId);
    },

    /**
     * Method to generate arguments when creating an item view. Override this method
     * to change the arguments for a given item view.
     * The format of the subview's arguments is:
     * {
     *   context: {
     *     ... inherited from parent ...
     *   },
     *   <modelName>: <modelObject>,
     *   listView: the parent list view
     * }
     * @method __generateItemViewArgs
     * @private
     * @param model the model for an item view
     * @return a context to be used by an item view
     */
    __generateItemViewArgs: function(model) {
      var args = {
        'context': _.extend({}, _.result(this, '__itemContext')),
        'listView': this
      };
      args[this.__modelName] = model;
      return args;
    },

    /**
     * Alias method for __generateItemViewArgs()
     * @method __generateChildArgs
     */
    __generateChildArgs: function() {
      return this.__generateItemViewArgs.apply(this, arguments);
    },

    /**
     * @method __getViewIdFromModelId
     * @private
     * @param modelId {String or Number} id of model
     * @return {String or Number} view cid that was built from corresponding model
     */
    __getViewIdFromModelId: function(modelId) {
      return this.__modelToViewMap[modelId];
    }
  });

  return ListView;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', '../Behavior', '../Collection', '../Events'], factory);
  } else if (typeof exports === 'object') {
    var _ = require('underscore');
    var $ = require('jquery');
    var Behavior = require('../Behavior');
    var Collection = require('../Collection');
    var Events = require('../Events');
    module.exports = factory(_, $, Behavior, Collection, Events);
  } else {
    root.Torso = root.Torso || {};
    root.Torso.behaviors = root.Torso.behaviors || {};
    root.Torso.behaviors.DataBehavior = factory(root._, root.$, root.Torso.Behavior, root.Torso.Collection, root.Torso.Events);
  }
}(this, function(_, $, Behavior, Collection, Events) {
  'use strict';

  /**
   * Converts string or number values into an array with a single string or number item.
   * If the input is not a string, number or array then undefined is returned.
   * This is a private helper method used internally by this behavior and is not exposed in any way.
   * @param ids {String|Number|String[]|Number[]} the ids to convert.
   * @return {String[]|Number[]} an array of strings or numbers.
   * @private
   */
  function normalizeIds(ids) {
    if (_.isArray(ids)) {
      // remove any nesting of arrays - it is assumed that the resulting ids will be simple string or number values.
      ids = _.flatten(ids);
      // remove any duplicate ids.
      return _.uniq(ids);
    } else if (_.isString(ids) || _.isNumber(ids)) {
      // individual id - convert to array for consistency.
      return [ids];
    }
  }

  /**
   * Behaviors defined in Torso.
   * @module Torso.behaviors
   * @namespace Torso.behaviors
   */

  /**
   * This behavior implements simplified interaction with data sources (i.e. TorsoCollection).
   * This behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.
   * This behavior also manages dependencies between data and other objects to allow intelligent re-fetching when data changes.
   *
   * Example Configuration on the view:
   *
   *     TorsoView.extend({
   *       behaviors: {
   *         demographics: {
   *           behavior: TorsoDataBehavior,
   *           cache: require('./demographicsCacheCollection'),
   *           returnSingleResult: true,
   *           id: { property: '_patientVecnaId' }
   *         }
   *       }
   *     }
   *
   * Any options for this behavior can also be configured directly on it using the same extension mechanism as other
   * Backbone or Torso objects.
   *
   * Example configuration by extension:
   *
   *     var AppointmentDataBehavior = DataBehavior.extend({
   *       cache: require('./appointmentCacheCollection'),
   *       id: { property: '_appointmentExternalId' },
   *       returnSingleResult: true,
   *       alwaysFetch: true
   *     });
   *
   * Ways to cause this data behavior to refresh the data.  Ids are retrieved from the idsContainer whenever a refresh of data is requested.
   *  * __view.getBehavior('thisBehaviorAlias').pull()__ - Any ids that are already in the cache are added immediately.
   *                                                       Any that are not already in the cache are fetched as a single batch of ids.
   *  * __view.getBehavior('thisBehaviorAlias').fetch()__ - Regardless of the cache state all ids identified by this behavior are fetched from the server.
   *  * __view.getBehavior('thisBehaviorAlias').retrieve()__ - Will either fetch or pull based on the current value of 'alwaysFetch'.
   *                                                           Defaults to pull (if alwaysFetch is not explicitly set).
   *  * __view.getBehavior('thisBehaviorAlias').trigger('ids-container-updated')__ - this is a way to indicate that the id container changed
   *                                                                                 which means the id listeners should be rebound and data should be refreshed.
   *  * __idsContainer.trigger('change:<idPropertyName>')__ - This is the change event that is already emitted by Cell-like objects when their properties change.
   *  * __idsContainer.trigger('fetched:ids')__ - This indicates that the ids have been fetched for the first time (when a change event may not be fired) and is used
   *                                              mainly to chain data behaviors together (this event is also emitted by this behavior whenever a fetch or pull completes).
   *
   * Ways to get properties from the data in this behavior:
   *  * __view.getBehavior('thisBehaviorAlias').data.toJSON()__ - Either array of data if returnSingleResult is false (default),
   *                                                              Or the object data directly if returnSingleResult is true.
   *  * __view.getBehavior('thisBehaviorAlias').data.toJSON('some.data.property')__ - returns just that property of the result or undefined if it hasn't been fetched or doesn't exist.
   *                                                                                  If returnSingleResult is false then an array of values for that object is returned
   *                                                                                  This is equivalent to _.pluck(view.getBehavior('thisBehaviorAlias').toJSON(), 'some.data.property').
   *
   *   The context generated by `view.prepare()` will contain all of the data associated with this view namespaced by the behavior's alias .data on the view.
   *   This the same data as returned by `view.getBehavior('thisBehaviorAlias').data.toJSON()`.
   *
   *     View.extend({
   *       behaviors: {
   *         thisBehaviorAlias: {
   *           behavior: ThisBehaviorClass
   *         }
   *       }
   *     });
   *
   *   result from prepare:
   *
   *     {
   *       ...,
   *       thisBehaviorAlias: {
   *         ...,
   *         data: <result of view.getBehavior('thisBehaviorAlias').data.toJSON()>
   *       }
   *     }
   *
   * Some Example Configurations:
   *
   * __Static id__ (can be a single String or Number or an array of Strings or Numbers):
   *
   *     View.extend({
   *        behaviors: {
   *          article: {
   *            behavior: require('torso/modules/behaviors/DataBehavior'),
   *            cache: require('app/article/articleCacheCollection'),
   *            returnSingleResult: true,
   *            id: 1234
   *          }
   *        }
   *      });
   *
   *    value used for id: `1234`
   *
   *    context for template:
   *
   *     {
   *       ...,
   *       article: {
   *         ...,
   *         data: {
   *           id: 1234,
   *           title: 'A really cool thing',
   *           text: 'So I was walking down the street one day...'
   *         }
   *       }
   *     }
   *
   * __Static ids__ (can be a single String or Number or an array of Strings or Numbers):
   *
   *     View.extend({
   *       behaviors: {
   *         posts: {
   *           behavior: require('torso/modules/behaviors/DataBehavior'),
   *           cache: require('app/article/postCacheCollection'),
   *           ids: [ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]
   *         }
   *       }
   *     });
   *
   *    value used for ids: `[ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]`
   *
   *    context for template:
   *
   *      {
   *        ...,
   *        posts: {
   *          ...,
   *          data: [{
   *            id: 'yesterday-by-the-river',
   *            title: 'Yesterday by the River',
   *            author: 'John Smith',
   *            content: 'While I was walking by the river...'
   *          },{
   *            id: 'tomorrow-by-the-sea',
   *            title: 'Tomorrow by the Sea',
   *            author: 'Mary Smith',
   *            content: 'I will walk on the beach tomorrow...'
   *          }]
   *        }
   *      }
   *
   * __Static id property on view__ (can be a single String or Number or an array of Strings or Numbers):
   *
   *     View.extend({
   *        behaviors: {
   *          article: {
   *            behavior: require('torso/modules/behaviors/DataBehavior'),
   *            cache: require('app/article/articleCacheCollection'),
   *            returnSingleResult: true,
   *            id: { property: '_articleId' }
   *          }
   *        }
   *      });
   *
   *    value used for id: `view._articleId`
   *
   *    context for template:
   *
   *     {
   *       ...,
   *       article: {
   *         ...,
   *         data: {
   *           id: 12,
   *           title: 'A really cool thing',
   *           text: 'So I was walking down the street one day...'
   *         }
   *       }
   *     }
   *
   * __Static ids property on view__ (can be a single String or Number or an array of Strings or Numbers):
   *
   *     View.extend({
   *       behaviors: {
   *         posts: {
   *           behavior: require('torso/modules/behaviors/DataBehavior'),
   *           cache: require('app/article/postCacheCollection'),
   *           ids: { property: '_postIds' }
   *         }
   *       }
   *     });
   *
   *    value used for ids: `view._postIds`
   *
   *    context for template:
   *
   *      {
   *        ...,
   *        posts: {
   *          ...,
   *          data: [{
   *            id: 'yesterday-by-the-river',
   *            title: 'Yesterday by the River',
   *            author: 'John Smith',
   *            content: 'While I was walking by the river...'
   *          },{
   *            id: 'tomorrow-by-the-sea',
   *            title: 'Tomorrow by the Sea',
   *            author: 'Mary Smith',
   *            content: 'I will walk on the beach tomorrow...'
   *          }]
   *        }
   *      }
   *
   * __
   *
   * @class DataBehavior
   * @method constructor
   * @author  jyoung@vecna.com
   */
  var DataBehavior = Behavior.extend({
    /**
     * The torso collection that is acting as a cache used to create the private collections.
     * This property/option is required.  Instantiation will fail if it is not set.
     * @property cache {Collection}
     */
    cache: undefined,

    /**
     * Determines the result of `view.getBehavior('thisBehaviorAlias').toJSON()`.
     * true - a single model result is returned.
     * false (default) - an array of model results are returned.
     * @property returnSingleResult {Boolean}
     * @default false
     */
    returnSingleResult: false,

    /**
     * Determines whether `pull()` or `fetch()` is called when using `retrieve()`.
     * true - Use fetch() by default on the private collection.
     * false (default) - Use pull() by default on the private collection.
     * True will query the server more often, but will provide more up-to-date data.
     * False will only query the server if the model hasn't already been retrieved.
     * This property will be ignored if `fetch()` or `pull()` is called directly.
     * @property alwaysFetch {Boolean}
     * @default false
     */
    alwaysFetch: false,

    /**
     * Duck-typed property that identifies the ids to use. id or ids is required (either by behavior options or as properties).
     *   - {String|Number} - the id to use directly (equivalent to an array of a single id).
     *   - {String[]|Number[]} - the ids to use directly.
     *   - {Object} - more complex configuration that identifies a model-like object that fires a change event and the
     *                property on that object to use. The object can fire the change event for the given property
     *                and have a .get('propertyName') method, or it can define the property directly on the context.
     *                Only one property can be identified as supplying the id for this data model.
     *                If the identified object does not fire a change event then the id(s) will never be refreshed for this behavior.
     *                The context can also fire a 'fetched:ids' event on itself to signal to this data behavior that the ids
     *                have been fetched for the first time.  Then a 'change:<propertyName>' event can be used to notify this
     *                data behavior that the property has been modified.
     *     - property {String} - the name of the property that defines the ids. The root object is assumed to be the view unless
     *                           context is defined. The context is the object that fires a change event for the given property name.
     *                           Uses the view or the context as the root to get the identified property (i.e. 'viewState.', 'model.', etc).
     *                           Will get the property before the first '.' from the view and if it is an object will try to use a
     *                           .get('<propertyName>') on it and set a 'change:<propertyName>' listener on it.
     *                           If it is a string/number or array of string/number, then it will use that as the ids.
     *                           Triggering a 'id-container-updated' event on the behavior will cause it to stop listing to the
     *                           old context and start listening to the new one defined by this property.
     *     - context {Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change
     *                           events and has a .get('propertyName') function. It isn't required to fire events -
     *                           the change event is only required if it needs to re-fetch when the id property value changes.
     *     Examples:
     *       - { property: '_patientId' }
     *       - { property: 'viewState.appointmentId' }
     *       - { property: 'model.type' }
     *       - { property: 'behaviors.demographics.data.appointments' }
     *       - { property: 'id', context: userService }
     *       - { property: 'username', context: function() { application.getCurrentUser() } }
     *   - {Function(cache)} - expected to return the ids (either array, jquery deferred that resolves to the ids or single primitive)
     *                         to track with the private collection. Cache is passed in as the first argument so that the behavior
     *                         can be defined and the cache can be overridden later.
     *                         'this' is the behavior (from which you can get the view if needed).
     *                         What was criteria should use this instead:
     *
     *         function(cache) {
     *           var thisBehaviorInstance = this;
     *           var view = this.view;
     *           var criteria = { ... some criteria ... };
     *           return cache.fetchIdsByCriteria(criteria);
     *         }
     * @property ids {String|Number|String[]|Number[]|Object|Function}
     */
    ids: undefined,

    /**
     * cause this behavior to re-calculate its ids and refetch them from the server if the given events are triggered
     * (space separated if string, single item is equivalent to array of single item).
     *   - 'view:eventName' - arbitrary event triggered on the view (eventName can be a change:propertyName event).
     *   - 'viewState:eventName' - arbitrary event triggered on the viewState (eventName can be a change:propertyName event).
     *   - 'model:eventName' - arbitrary even triggered on the view's model (eventName can be a change:propertyName event).
     *   - 'this:eventName' - arbitrary event triggered by this behavior (eventName can be a change:propertyName event).
     *   - 'behaviorAlias:eventName' - arbitrary event triggered by another data behavior on this view (eventName can be a change:propertyName event).
     *   - 'behaviorAlias.data:eventName' - arbitrary event triggered by the data of another DataBehavior on this view (eventName can be a change:propertyName event).
     *   - { '<eventName>': < object (or function returning an object) that the event is triggered on > } - arbitrary ('<eventName>') triggered on the supplied object.
     * @property updateEvents {String|String[]|Object|Object[]}
     */
    updateEvents: undefined,

    /**
     * Object that manages interaction with the data.  Contains the privateCollection, proxies all events from the privateCollection,
     * and has get('...') and .toJSON() methods that access the private collection data.
     * @property data {Torso.behaviors.DataBehavior.Data}
     */
    data: undefined,

    /**
     * @method constructor
     * @override
     * @param behaviorOptions {Object}
     *   @param behaviorOptions.cache {Collection} see cache property.
     *   @param [behaviorOptions.returnSingleResult=false] {Boolean} see returnSingleResult property.
     *   @param [behaviorOptions.alwaysFetch=false] {Boolean} see alwaysFetch property.
     *   @param [behaviorOptions.id=behaviorOptions.ids] {String|Number|String[]|Number[]|{property: String, context: Object}|Function} see id property.
     *   @param [behaviorOptions.ids=behaviorOptions.id] {String|Number|String[]|Number[]|{property: String, context: Object}|Function} see ids property.
     *   @param [behaviorOptions.updateEvents] {String|String[]|Object|Object[]} see updateEvents property.
     * @param [viewOptions] {Object} options passed to View's initialize
     */
    constructor: function(behaviorOptions, viewOptions) {
      _.bindAll(this, '__fetchSuccess', '__fetchFailed');
      behaviorOptions = behaviorOptions || {};
      behaviorOptions = _.defaults(behaviorOptions, {
        alwaysFetch: false
      });
      _.extend(this, _.pick(behaviorOptions, 'cache', 'id', 'ids', 'returnSingleResult', 'alwaysFetch', 'updateEvents'));

      this.__validateCache();
      this.__normalizeAndValidateIds();
      this.__normalizeAndValidateUpdateEvents();

      this.cid = this.cid || _.uniqueId(this.cidPrefix);
      this.data = new this.Data({
        parentBehavior: this,
        privateCollection: this.cache.createPrivateCollection(this.cid)
      });

      Behavior.apply(this, arguments);

      this.on('id-container-updated', this.listenToIdsPropertyChangeEvent);
      this.on('id-container-updated', this.retrieve);
      this.listenTo(this.view, 'initialize:complete', this.listenToIdsPropertyChangeEvent);
      this.listenTo(this.view, 'initialize:complete', this._delegateUpdateEvents);
      this.listenTo(this.view, 'initialize:complete', this.retrieve);
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection to track and then does a
     * pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).
     * @method retrieve
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    retrieve: function() {
      if (this.alwaysFetch) {
        return this.fetch();
      } else {
        return this.pull();
      }
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection's trackAndPull() method.
     * @method pull
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    pull: function() {
      var thisDataBehavior = this;
      return this.__getIds()
        .then(function(ids) {
          return thisDataBehavior.data.privateCollection.trackAndPull(ids);
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Retrieves the ids for this data object and passes them off to the private collection's trackAndFetch() method.
     * @method fetch
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the retrieved models.
     */
    fetch: function() {
      var thisDataBehavior = this;
      return this.__getIds()
        .then(function(ids) {
          return thisDataBehavior.data.privateCollection.trackAndFetch(ids);
        })
        .then(this.__fetchSuccess, this.__fetchFailed);
    },

    /**
     * Adds the toJSON of the data represented by this behavior to the context.
     * @method prepare
     * @override
     */
    prepare: function() {
      var behaviorContext = Behavior.prototype.prepare.apply(this);
      behaviorContext.data = this.data.toJSON();
      return behaviorContext;
    },

    /**
     * Listens for the change event on the ids property and, if triggered, re-fetches the data based on the new ids.
     * @method listenToIdsPropertyChangeEvent
     */
    listenToIdsPropertyChangeEvent: function() {
      if (!_.isUndefined(this.ids.property)) {
        this.stopListeningToIdsPropertyChangeEvent();
        var idsPropertyNameAndContext = this.__parseIdsPropertyNameAndContext();
        var idsContext = idsPropertyNameAndContext.idsContext;
        var canListenToEvents = idsContext && _.isFunction(idsContext.on);
        if (canListenToEvents) {
          this.__currentContextWithListener = idsContext;
          this.__currentContextEventName = 'change:' + idsPropertyNameAndContext.idsPropertyName;
          this.listenTo(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
          this.listenTo(this.__currentContextWithListener, 'fetched:ids', this.retrieve);
        }
      }
    },

    /**
     * Removes the listener added by listenToIdsPropertyChangeEvent().
     * @method stopListeningToIdsPropertyChangeEvent
     */
    stopListeningToIdsPropertyChangeEvent: function() {
      if (this.__currentContextWithListener) {
        this.stopListening(this.__currentContextWithListener, this.__currentContextEventName, this.retrieve);
        this.stopListening(this.__currentContextWithListener, 'fetched:ids', this.retrieve);
        delete this.__currentContextWithListener;
        delete this.__currentContextEventName;
      }
    },

    /**
     * Removes existing listeners and adds new ones for all of the updateEvents configured.
     * @method _delegateUpdateEvents
     * @private
     */
    _delegateUpdateEvents: function() {
      this._undelegateUpdateEvents();
      var updateEvents = this.__parseUpdateEvents();
      _.each(updateEvents, function(parsedUpdateEvent) {
        this.listenTo(parsedUpdateEvent.context, parsedUpdateEvent.eventName, this.retrieve);
      }, this);
    },

    /**
     * Removes existing event listeners.
     * @method _undelegateEvents
     * @private
     */
    _undelegateUpdateEvents: function() {
      var updateEvents = this.__parseUpdateEvents();
      _.each(updateEvents, function(parsedUpdateEvent) {
        this.stopListening(parsedUpdateEvent.context, parsedUpdateEvent.eventName, this.retrieve);
      }, this);
    },

    /**
     * Parses this.updateEvents configuration.
     * @return {[{ eventName: String, context: Object }]} an array of objects with the event name and context included.
     * @private
     */
    __parseUpdateEvents: function() {
      this.__normalizeAndValidateUpdateEvents();
      var updateEvents = _.flatten(_.map(this.updateEvents, this.__parseUpdateEvent, this));
      return _.compact(updateEvents);
    },

    /**
     * Parses an individual event configuration.
     * Note: events defined using objects can have more than one event defined w/in the object.
     * @param updateEventConfiguration {String | Object} the configuration for an individual event configuration.
     * @return {[{ eventName: String, context: Object }] | undefined} an array of objects with the event name and context included.
     *                                                                If the event could not be parsed, undefined is returned.
     * @private
     */
    __parseUpdateEvent: function(updateEventConfiguration) {
      if (_.isUndefined(updateEventConfiguration)) {
        return undefined;
      }
      var parsedUpdateEvents = [];
      if (_.isString(updateEventConfiguration)) {
        var updateEvent = this.__parseStringUpdateEvent(updateEventConfiguration);
        if (!_.isUndefined(updateEvent)) {
          parsedUpdateEvents.push(updateEvent);
        }
      }
      if (_.isObject(updateEventConfiguration)) {
        parsedUpdateEvents = _.map(updateEventConfiguration, function(context, eventName) {
          return {
            context: context,
            eventName: eventName
          };
        });
      }
      return parsedUpdateEvents;
    },

    /**
     * Parse a string type update event.
     * Context Key (first part of the string up to the first ':') can be one of the following:
     *   this (maps to the behavior),
     *   view (maps to the behavior's view),
     *   viewState (maps to the behavior's view's viewState),
     *   model (maps to the behavior's view's model),
     *   <*> any others are assumed to be the names of behaviors on this behavior's view.
     * @param updateEventConfiguration {String} a string representation of the event.
     * @return {{eventName: String, context: Backbone.Events}} the parsed configuration with the event name and context object.
     * @private
     */
    __parseStringUpdateEvent: function(updateEventConfiguration) {
      var contextString = updateEventConfiguration.split(':', 1)[0];
      var rootContextString = contextString.split('.', 1)[0];
      var rootContext;
      if (rootContextString === 'this') {
        rootContext = this;
      } else if (rootContextString === 'view') {
        rootContext = this.view;
      } else if (rootContextString === 'viewState') {
        rootContext = this.view.viewState;
      } else if (rootContextString === 'model') {
        rootContext = this.view.model;
      } else {
        // assume its a behavior alias.
        rootContext = this.view.getBehavior(rootContextString);
      }
      if (!_.isUndefined(rootContext)) {
        var context = rootContext;
        var contextPropertyString = contextString.replace(rootContextString, '');
        if (contextPropertyString) {
          // remove . in the case that there is a property string.
          contextPropertyString = contextPropertyString.substring(1);
          context = rootContext[contextPropertyString.substring(1)];
        }

        var eventName = updateEventConfiguration.replace(contextString + ':', '');
        return {
          eventName: eventName,
          context: context
        };
      }
    },

    /**
     * Validates that the cache property is valid and if not throws an error describing why its not valid.
     * @method __validateCache
     * @private
     */
    __validateCache: function() {
      if (!this.cache) {
        throw new Error('Torso Data Behavior constructed without a cache');
      }
      if (!(this.cache instanceof Collection)) {
        throw new Error('Torso Data Behavior\'s cache is not of type Torso.Collection');
      }
    },

    /**
     * Validates that the ids property is valid and if not throws an error describing why its not valid.
     * A side effect of this method is copying id into the ids location (if id is set).  Ids is what is used by the rest of the code.
     * This is done as part of validation because we first validate that both are not set.
     * @method __normalizeAndValidateIds
     * @private
     */
    __normalizeAndValidateIds: function() {
      if (!_.isUndefined(this.ids) && !_.isUndefined(this.id)) {
        throw new Error('Torso Data Behavior constructed with both id and ids.  Please define only one.');
      }
      this.ids = this.id || this.ids;
      this.__validateIds();
    },

    /**
     * Validates that the ids property is valid and if not throws an error describing why its not valid.
     * A side effect of this method is copying id into the ids location (if id is set).  Ids is what is used by the rest of the code.
     * This is done as part of validation because we first validate that both are not set.
     * @method __normalizeAndValidateIds
     * @private
     */
    __validateIds: function() {
      if (_.isUndefined(this.ids)) {
        throw new Error('Torso Data Behavior constructed without a way to identify the ids for this data.  Please define either id, ids.');
      }

      var idsIsArray = _.isArray(this.ids);
      var idsIsSingleId = _.isString(this.ids) || _.isNumber(this.ids);
      var idsIsFunction = _.isFunction(this.ids);
      var idsIsObjectWithStringProperty = _.isString(this.ids.property);
      var idsIsObject = _.isObject(this.ids);
      var idsIsValid = idsIsArray || idsIsSingleId || idsIsFunction || idsIsObjectWithStringProperty;
      if (!idsIsValid && idsIsObject) {
        throw new Error('Data Behavior ids invalid definition.  It is an object, but the property field is not defined or is not a string: ' + JSON.stringify(this.ids));
      } else if (!idsIsValid) {
        throw new Error('Data Behavior ids invalid definition.  Not a string, number, object, array or function: ' + JSON.stringify(this.ids));
      }
    },

    /**
     * Validates that the updateEvents property is valid and if not throws an error describing why its not valid.
     * @method __normalizeAndValidateUpdateEvents
     * @private
     */
    __normalizeAndValidateUpdateEvents: function() {
      var updateEventsIsArray = _.isArray(this.updateEvents);
      var updateEventsIsSingleValue = !updateEventsIsArray && (_.isObject(this.updateEvents) || _.isString(this.updateEvents));
      var updateEventsIsUndefined = _.isUndefined(this.updateEvents);
      var updateEventsIsValidType = updateEventsIsArray || updateEventsIsSingleValue || updateEventsIsUndefined;

      if (updateEventsIsSingleValue) {
        this.updateEvents = [this.updateEvents];
      }

      if (!updateEventsIsValidType) {
        throw new Error('Update events are not an array, string or object.  Please see parameters for examples of how to define updateEvents.  Configured UpdateEvents: ', this.updateEvents);
      }

      // Remove any random falsey values (mostly to get rid of undefined events).
      this.updateEvents = _.compact(this.updateEvents);
      _.each(this.updateEvents, this.__validUpdateEvent);
    },

    /**
     * Validates that the updateEventConfiguration is valid and if not throws an error describing why its not valid.
     * @method __normalizeAndValidateIds
     * @private
     */
    __validUpdateEvent: function(updateEventConfiguration) {
      var validStringConfig = _.isString(updateEventConfiguration);
      var validObjectConfig = _.isObject(updateEventConfiguration) && _.keys(updateEventConfiguration).length > 0;
      if (!validStringConfig && !validObjectConfig) {
        throw new Error('Not a valid updateEvent configuration.  Update events need to either be strings or objects with a single property: ' + JSON.stringify(updateEventConfiguration));
      }
    },

    /**
     * @method __getIds
     * @return {$.Deferred.Promise} a jquery deferred promise that resolves to the ids to track in the private collection
     *                              or rejects with the error message.
     * @private
     */
    __getIds: function() {
      this.__validateIds(); // validate ids enforces a fast-fail that guarantees that one of the if statements below will work.

      var idsDeferred = $.Deferred();
      var ids = this.ids;
      var normalizedIds = normalizeIds(ids);
      if (!_.isUndefined(normalizedIds)) {
        idsDeferred.resolve(normalizedIds);
      } else if (_.isFunction(this.ids)) {
        ids = this.ids(this.cache);
        normalizedIds = normalizeIds(ids);
        if (!_.isUndefined(normalizedIds)) {
          idsDeferred.resolve(normalizedIds);
        } else if (!_.isUndefined(ids) && _.isFunction(ids.then)) {
          idsDeferred = ids.then(normalizeIds);
        } else {
          idsDeferred.resolve([]);
        }
      } else if (!_.isUndefined(this.ids.property)) {
        var parsedContextDefinition = this.__parseIdsPropertyNameAndContext();
        var propertyName = parsedContextDefinition.idsPropertyName;
        var context = parsedContextDefinition.idsContext;

        ids = context && context[propertyName];
        var propertyOnContextIsUndefined = context && _.isUndefined(ids);
        var contextHasGetMethod = context && _.isFunction(context.get);

        if (propertyOnContextIsUndefined && contextHasGetMethod) {
          ids = context.get(propertyName);
        }
        normalizedIds = normalizeIds(ids);

        idsDeferred.resolve(normalizedIds || []);
      }
      return idsDeferred.promise();
    },

    /**
     * Converts the definition into the actual context object and property name to retrieve off of that context.
     * @method __parseIdsPropertyNameAndContext
     * @return {{idsPropertyName: String, context: Object}} the name of the ids property and the actual object to use as the context.
     * @private
     */
    __parseIdsPropertyNameAndContext: function() {
      var context = this.__parseIdsContext();

      var propertyName = this.ids.property;

      var propertyParts = propertyName.split('.');
      var isNestedProperty = propertyParts.length > 1;
      if (isNestedProperty) {
        var rootPropertyName = propertyParts[0];
        if (rootPropertyName === 'behaviors' || rootPropertyName === 'behavior') {
          var behaviorName = propertyParts[1];
          context = this.view.getBehavior(behaviorName);
          if (propertyParts[2] === 'data') {
            context = context.data;
            propertyName = propertyParts.slice(3).join('.');
          } else {
            propertyName = propertyParts.slice(2).join('.');
          }
        } else if (!_.isUndefined(context[rootPropertyName])) {
          context = context[rootPropertyName];
          propertyName = propertyParts.slice(1).join('.');
        }
      }

      return {
        idsPropertyName: propertyName,
        idsContext: context
      };
    },

    /**
     * Parses the context property of ids.
     * @return {Object} the context object to apply the properties value to (may not be the final context depending on the property definition).
     * @private
     */
    __parseIdsContext: function() {
      var contextDefinition = this.ids.context;
      var context;
      if (_.isUndefined(contextDefinition)) {
        context = this.view;
      } else if (_.isFunction(contextDefinition)) {
        var contextFxn = _.bind(contextDefinition, this);
        context = contextFxn();
      } else if (_.isString(contextDefinition)) {
        context = _.result(this, contextDefinition);
      } else if (_.isObject(contextDefinition)) {
        context = contextDefinition;
      } else {
        throw new Error('Invalid context.  Not a string, object or function: ' + JSON.stringify(this.ids));
      }
      return context;
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'success' } when the fetch completes successfully.
     * @method __fetchSuccess
     * @private
     */
    __fetchSuccess: function() {
      this.trigger('fetched', { status: 'success' });
      this.data.trigger('fetched', { status: 'success' });
      this.trigger('fetched:ids');
      this.data.trigger('fetched:ids');
    },

    /**
     * Triggers a 'fetched' event with the payload { status: 'failed' } when the fetch fails.
     * @method __fetchFailed
     * @private
     */
    __fetchFailed: function() {
      this.trigger('fetched', { status: 'failed' });
      this.data.trigger('fetched', { status: 'failed' });
      this.trigger('fetched:ids');
      this.data.trigger('fetched:ids');
    },

    /**
     * Adds listeners when the view is activated.
     * @method _activate
     * @private
     */
    _activate: function() {
      this.listenToIdsPropertyChangeEvent();
      this._delegateUpdateEvents();
      this.data.activate();
    },

    /**
     * Stops listening when the view is deactivated.
     * @method _deactivate
     * @private
     */
    _deactivate: function() {
      this.stopListeningToIdsPropertyChangeEvent();
      this._undelegateUpdateEvents();
      this.data.deactivate();
    },

    /**
     * Default dispose stuff because its not already on behavior.  See https://github.com/vecnatechnologies/backbone-torso/issues/295
     * @method _dispose
     * @private
     */
    _dispose: function() {
      this.data.dispose();

      this.off();
      this.stopListening();
    }
  });

  /**
   * @module Torso.behaviors.DataBehavior
   * @namespace Torso.behaviors.DataBehavior
   */

  /**
   * Data object used to create the .data property of the DataBehavior.
   * @class Data
   * @constructor
   */
  var Data = function(options) {
    this.initialize(options);
  };

  _.extend(Data.prototype, {
    /**
     * Instantiates the data objects and binds it to this behavior instance.
     * @param options {Object} to pass to the initialize methods.
     *   @param options.parentBehavior {DataBehavior} the data behavior instance that this Data object should be bound to.
     *   @param options.privateCollection {Collection} the private collection that this data represents.
     */
    initialize: function(options) {
      _.extend(this, Events);
      /**
       * The dataBehavior instance that owns this data object.
       * @property parentBehavior {DataBehavior}
       */
      this.parentBehavior = options.parentBehavior;
      /**
       * The private collection that this data object manages.
       * @property privateCollection {Collection}
       */
      this.privateCollection = options.privateCollection;
    },

    /**
     * Get the full data object contents.  Either an array if returnSingleResult is false or a single object if it is true.
     * @method toJSON
     * @return {Object|Object[]} containing the full contents of either the collection or model.
     */
    toJSON: function() {
      var privateCollection = this.privateCollection;
      if (!this.parentBehavior.returnSingleResult) {
        return privateCollection.toJSON();
      }

      if (privateCollection.length === 0) {
        return undefined;
      } else if (privateCollection.length === 1) {
        var singleResultModel = privateCollection.at(0);
        return singleResultModel.toJSON();
      } else {
        throw new Error('Multiple results found, but single result expected: ' + JSON.stringify(privateCollection.toJSON()));
      }
    },

    /**
     * Get the full data object contents (either an array of model attributes or a single model attribute based on the
     * value of propertyName) or the value of a specific property if a single result is expected.
     *
     * If returnSingleResult is true then this will return the given property from the model (if that model exists).
     * If returnSingleResult is false then this will return an array containing that property from all of the retrieved models.
     * @method get
     * @param [propertyName] {String} the property to get from the model(s).
     * @return {Object|Object[]} containing the full contents of either the collection or model.
     */
    get: function(propertyName) {
      var privateCollection = this.privateCollection;
      if (!this.parentBehavior.returnSingleResult) {
        if (_.isString(propertyName)) {
          return privateCollection.pluck(propertyName);
        } else {
          return privateCollection.toJSON();
        }
      }

      if (privateCollection.length === 0) {
        return undefined;
      } else if (privateCollection.length === 1) {
        var singleResultModel = privateCollection.at(0);
        if (_.isString(propertyName)) {
          return singleResultModel.get(propertyName);
        }
        return singleResultModel.toJSON();
      } else {
        throw new Error('Multiple results found, but single result expected: ' + JSON.stringify(privateCollection.toJSON()));
      }
    },

    /**
     * Adds the listeners to the private collection.
     * @method activate
     */
    activate: function() {
      this.listenTo(this.privateCollection, 'all', this.trigger);
    },

    /**
     * Removes the listeners on the private collection.
     * @method deactivate
     */
    deactivate: function() {
      this.stopListening(this.privateCollection, 'all', this.trigger);
    },

    /**
     * Dispose of the data events.
     */
    dispose: function() {
      this.off();
      this.stopListening();
    }
  });

  DataBehavior.prototype.Data = Data;

  return DataBehavior;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './View', './FormModel', './Cell', 'backbone.stickit'], factory);
  } else if (typeof exports === 'object') {
    require('backbone.stickit');
    module.exports = factory(require('underscore'), require('jquery'), require('./View'), require('./FormModel'), require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.FormView = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Torso.View, root.Torso.FormModel, root.Torso.Cell);
  }
}(this, function(_, $, View, FormModel, Cell) {
  'use strict';

  /**
   * Generic Form View
   * @module    Torso
   * @class     FormView
   * @constructor
   * @author ariel.wexler@vecna.com
   */
  var FormView = View.extend({
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
     * Constructor the form view object.
     * @method constructor
     * @param args {Object} - options argument
     * @param args.model       {Torso.FormModel} - requires a form model for binding
     * @param [args.template]  {HTML Template} - overrides the template used by this view
     * @param [args.events]    {Events Hash} - merge + override the events hash used by this view
     * @param [args.fields]    {Field Hash} - merge + override automated two-way binding field hash used by this view
     * @param [args.bindings]  {Binding Hash} - merge + override custom epoxy binding hash used by this view
     */
    constructor: function(args) {
      args = args || {};

      /* Listen to model validation callbacks */
      this.model = args.model || this.model || (new FormModel());

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
     * @method prepare
     * @return {Object}
     *         {Object.errors} A hash of field names mapped to error messages
     *         {Object.success} A boolean value of true if validation has succeeded
     */
    prepare: function() {
      return {
        model: this.model.toJSON(),
        view: this.viewState.toJSON(),
        formErrors: (_.size(this._errors) !== 0) ? this._errors : null,
        formSuccess: this._success
      };
    },

    /**
     * Override the delegate events and wrap our custom additions
     * @method delegateEvents
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
     * @method resetModelListeners
     * @param model {Torso.FormModel} the new form model
     * @param [stopListening=false] {Boolean} if true, it will stop listening to the previous form model
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
     * @method valid
     */
    valid: function() {
      this._success = true;
      this._errors = [];
    },

    /**
     * Default method called on validation failure.
     * @method valid
     */
    invalid: function(model, errors) {
      this._success = false;
      this._errors = errors;
    },

    /**
     * Deactivate callback that removes bindings and other resources
     * that shouldn't exist in a dactivated state
     * @method _deactivate
     */
    _deactivate: function() {
      View.prototype._deactivate.call(this);
      // No detach callback... Deactivate will have to do as it is called by detach
      this.unstickit();
    },

    /**
     * For use in a feedback's "then" callback
     * Checks to see if the form model's field is valid. If the field is invalid, it adds the class.
     * If the field is invalid, it removes the class. When an array is passed in for the fieldName,
     * it will validate all the fields together as if they were one (any failure counts as a total failure,
     * and all fields need to be valid for success).
     * @param fieldName {String or Array<String>} the name of the form model field or an array of field names
     * @param className {String} the class name to add or remove
     * @param [onValid] {Boolean} if true, will reverse the logic operator
     * @private
     * @method _thenAddClassIfInvalid
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
     * @param fieldName {String or Array<String>} the name of the form model field or an array of field names
     * @param text {String} the text to set
     * @param [onValid] {Boolean} if true, will reverse the logic operator
     * @private
     * @method _thenAddTextIfInvalid
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
     * @method __generateStickitBindings
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
        self.bindings['[data-model="' + attr + '"]'] = fieldBinding;
      });
    },

    /**
     * @method __getFieldOptions
     * @param attr {String} An attribute of the model
     * @return {Object} Any settings that are associates with that attribute
     */
    __getFieldOptions: function(attr) {
      attr = this.__stripAllAttribute(attr);
      return this.fields[attr] || {};
    },

    /**
     * @method __generateModelFieldBinding
     * @param field {String} A specific model field
     * @param options {Object} Additional heavior options for the bindings
     * @param [options.modelFormat] {Object} The function called before setting model values
     * @param [options.viewFormat] {Object} The function called before setting view values
     * @private
     * @return {<Stickit Binding Hash>}
     */
    __generateModelFieldBinding: function(field, options) {
      var indices = this.__getAllIndexTokens(field);
      return {
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
      };
    }
  });

  return FormView;
}));
