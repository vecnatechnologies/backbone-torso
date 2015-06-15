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
    currentAttributes = currentNode.attributes;
    while (idx < currentAttributes.length) {
      currentAttr = currentAttributes[idx].name;
      if (!_.contains(currentAttr, newNode.attributes)) {
        currentNode.removeAttribute(currentAttr);
      }
      idx++;
    }

    // Set new attributes
    _.each(newNode.attributes, function(attrib) {
      currentNode.setAttribute(attrib.name, attrib.value);
    });

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
     * @param  [opts.ignoreElements] {Array} jQuery selectors of DOM elements to ignore during render. Can be an expensive check
     */
    render: function($el, template, context, opts) {
      var newDOM,
          newHTML = template(context),
          el = $el.get(0);
      opts = opts || {};

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
          activeElement = document.activeElement;
      if (activeElement && activeElement.hasAttribute('value') && this.supportsSelection(activeElement)) {
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
