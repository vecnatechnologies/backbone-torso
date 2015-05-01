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
     * @param  el {jQueryObject} The Element to render into
     * @param  template {Handlebars Template} The HBS template to apply
     * @param  context {Object} The context object to pass to the template
     * @param  [opts] {Object} Other options
     * @param  [opts.force=false] {Boolean} Will forcefully do a fresh render and not a diff-render
     * @param  [opts.ignoreElements] {Array} jQuery selectors of DOM elements to ignore during render. Can be an expensive check
     */
    render: function(el, template, context, opts) {
      var newDOM, activeElement, currentCaret,
          newHTML = template(context);
      opts = opts || {};

      if (opts.force) {
        el.html(newHTML);
      } else {
        newDOM = this.copyTopElement(el);
        newDOM.html(newHTML);
        this.hotswapKeepCaret(el, newDOM, opts);
      }
    },

    /**
     * Call this.hotswap but also keeps the caret position the same
     * @param  el {jQueryObject} The Element to render into
     * @param  template {Handlebars Template} The HBS template to apply
     * @param  context {Object} The context object to pass to the template
     * @method hotswapKeepCaret
     */
    hotswapKeepCaret: function(el, newDOM, opts) {
      opts = opts || {};
      var currentCaret,
          activeElement = document.activeElement;
      if (activeElement && activeElement.hasAttribute('value')) {
        currentCaret = this.getCaretPosition(activeElement);
      }
      this.hotswap(el, newDOM, opts.ignoreElements, false);
      if (activeElement) {
        this.setCaretPosition(activeElement, currentCaret);
      }
    },

    /**
     * Hotswap algorithm:
     * Runtime is O(N) where N is the number of total DOM elements.
     * There is always room for optimizing this method.
     * Changes DOM elements that are different, and
     * leaves others untouched.  Note that the top-most element's
     * tag type is immutable so it can never be changed.
     * @method hotswap
     * @param newDOM {jQueryElement} The jQuery DOM for the desired render
     * @param currentDOM {jQueryElement} The jQuery DOM for the existing render
     * @param ignoreElements {Array} Array of jQuery selectors of DOM elements to ignore during render. Can be an expensive check.
     * @param returnRefreshTree {Boolean} if true, will return an array tree that corresponds element-by-element to the currentDOM
     *   where a true value means the element was forced to refresh. A true value will short circuit that branch. A common example
     *   would be if the top level current dom needs a force refresh, this method will return a single true value.
     * @return {Boolean} true if requires a full refresh, false otherwise
     */
    hotswap: function(currentDOM, newDOM, ignoreElements, returnRefreshTree) {
      var i, newTag, currTag,
        newElem, currElem,
        newChildren, currChildren,
        newAttributes, currentAttributes,
        replacementDOM, attrNode,
        skip, ignoreIdx, childForceRefresh,
        hardRefreshes = [],
        ignoreElementsLen = ignoreElements ? ignoreElements.length : 0;

      // Handle tagname changes with full replacement
      newTag = newDOM.prop('tagName');
      currTag = currentDOM.prop('tagName');
      if (newTag !== currTag) {
        replacementDOM = $('<' + newTag + '>' + newDOM.html() + '</' + newTag + '>');
        currentDOM.replaceWith(replacementDOM);
        currentDOM = replacementDOM;
      }

      // Skip trying to hotswap an injection site
      newAttributes = newDOM.get(0).attributes;
      // Attribute removing old values
      currentAttributes = currentDOM.get(0).attributes;
      while (currentAttributes.length > 0) {
        currentAttributes.removeNamedItem(currentAttributes[0].name);
      }

      // Attribute setting for new values
      _.each(newAttributes, function(attrib) {
        attrNode = document.createAttribute(attrib.name);
        attrNode.value = attrib.value;
        currentAttributes.setNamedItem(attrNode);
      });

      // Quick check if we need to bother comparing sub-levels
      if (currentDOM.html() === newDOM.html()) {
        return false;
      }

      newChildren = newDOM.children();
      currChildren = currentDOM.children();

      // If the DOM lists are different sizes, perform a hard refresh
      if (newChildren.length !== currChildren.length) {
        currentDOM.html(newDOM.html());
        return true;
      }

      // Compare and set content if this is a leaf node
      if (currChildren.length === 0) {
        currentDOM.html(newDOM.html());
        return false;
      }

      // Perform a recursive hotswap for all children elements
      for (i = 0; i < currChildren.length; i++) {
        skip = false;
        newElem = $(newChildren[i]);
        currElem = $(currChildren[i]);
        if (ignoreElements) {
          for (ignoreIdx = 0; ignoreIdx < ignoreElementsLen; ignoreIdx++) {
            if (currElem.is(ignoreElements[ignoreIdx])) {
              skip = true;
              break;
            }
          }
        }
        if (!skip) {
          childForceRefresh = this.hotswap(currElem, newElem, ignoreElements, returnRefreshTree);
          if (returnRefreshTree) {
            hardRefreshes.push(childForceRefresh);
          }
        }
      }
      return hardRefreshes;
    },

    /**
     * Produces a copy of the element tag with attributes but with no contents
     * @param el {jQuery element} the element to be copied
     * @return a shallow copy of the element with no children but with attributes
     * @method copyTopElement
     */
    copyTopElement: function(el) {
      var newDOM = $('<' + el.prop('tagName') + '></' + el.prop('tagName') + '>');
      _.each(el.get(0).attributes, function(attrib) {
        newDOM.attr(attrib.name, attrib.value);
      });
      return newDOM;
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
