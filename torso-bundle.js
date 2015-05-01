(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Utils = root.Torso.Utils || {};
    root.Torso.Utils.guidManager = factory();
  }
}(this, function() {
  'use strict';

  /**
   * A static object responsible for tracking and creating
   * unique GUIDs when asked.  These GUIDs can be used for anything.
   *
   * @module    Torso
   * @class     guidManager
   * @static
   * @author    ariel.wexler@vecna.com
   */
  var guidManager = {
    /**
     * The next GUID numeral
     * @property _current
     */
    _current: 0,

    /**
     * Create a GUID and return it
     * @method generate
     * @return {String} A unique hash
     */
    generate: function() {
      var hash = this._generateGUID();
      return hash;
    },

    /**
     * Random GUID generator.  Creates GUIDs in the format: G<number>
     * @private
     * @method _generateGUID
     * @return {String} A sequence of Hex Digits
     */
    _generateGUID: function() {
      var GUID = 'G' + this._current;
      this._current++;
      return GUID;
    }
  };
  return guidManager;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['handlebars'], factory);
  } else if (typeof exports === 'object') {
    factory(require('handlebars'));
  } else {
    factory(root.Handlebars);
  }
}(this, function(Handlebars) {
  'use strict';

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

      newAttributes = newDOM.get(0).attributes;
      // Skip trying to hotswap an injection site
      var injectionSite = _.findWhere(newAttributes, {name: 'inject'});
      if (injectionSite) {
        return false;
      }
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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.collectionLoading = factory((root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function($) {
  /**
   * Loading logic to be mixed into Backbone Collections.
   * Requires collectionRegistrationMixin.js to be imported first
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  collectionLoading
   * @author kent.willis@vecna.com
   */
  var collectionLoadingMixin = function(base) {

    var loadingMixin,
        baseSuper = base.super || function() {};

    loadingMixin = function(collection, options) {

      var loadedOnceDeferred = options.loadedOnceDeferred,
        loadedOnce = options.loadedOnce,
        loading = options.loading;

      /**
       * @method hasLoadedOnce
       * @return true if this collection has ever loaded from a fetch call
       */
      collection.hasLoadedOnce = function() {
        return loadedOnce;
      };

      /**
       * @method isLoading
       * @return true if this collection is currently loading new values from the server
       */
      collection.isLoading = function() {
        return loading;
      };

      /**
       * @method getLoadedOncePromise
       * @return a promise that will resolve when the collection has loaded for the first time
       */
      collection.getLoadedOncePromise = function() {
        return loadedOnceDeferred.promise();
      };

      /**
       * Wraps the base fetch in a wrapper that manages loaded states
       * @method fetch
       * @param options {Object} - the object to hold the options needed by the base fetch method
       */
      collection.fetch = function(options) {
        this._loadWrapper(base.fetch, options);
      };

      /**
       * Base load function that will trigger a "load-begin" and a "load-complete" as
       * the fetch happens. Use this method to wrap any method that returns a promise in loading events
       * @method _loadWrapper
       * @param fetchMethod {Function} - the method to invoke a fetch
       * @param options {Object} - the object to hold the options needed by the fetchMethod
       * @return a promise when the fetch method has completed and the events have been triggered
       */
      collection._loadWrapper = function(fetchMethod, options) {
        loading = true;
        collection.trigger('load-begin');
        return $.when(fetchMethod.call(collection, options)).done(function(data, textStatus, jqXHR) {
          collection.trigger('load-complete', {success: true, data: data, textStatus: textStatus, jqXHR: jqXHR});
        }).fail(function(jqXHR, textStatus, errorThrown) {
          collection.trigger('load-complete', {success: false, jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown});
        }).always(function() {
          if (!loadedOnce) {
            loadedOnce = true;
            loadedOnceDeferred.resolve();
          }
          loading = false;
        });
      };
    };

    return {
      /**
       * Adds the loading mixin to the collection
       * @method super
       * @param args {Object} the arguments to the base super method
       */
      super: function(args) {
        baseSuper.call(this, args);
        loadingMixin(this, {
          loadedOnceDeferred: new $.Deferred(),
          loadedOnce: false,
          loading: false
        });
      }
    };
  };

  return collectionLoadingMixin;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.polling = factory((root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function($) {
  /**
   * Periodic Polling Object to be mixed into Backbone Collections and Models.
   *
   * The polling functionality should only be used for collections and for models that are not
   * part of any collections. It should not be used for a model that is a part of a collection.
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  polling
   * @author ariel.wexler@vecna.com
   */
  var pollingMixin = {
    /**
     * @property pollTimeoutId {Number} The id from when setTimeout was called to start polling.
     */
    pollTimeoutId: undefined,
    _pollStarted: false,
    _pollInterval: 5000,

    /**
     * Returns true if the poll is active
     * @method isPolling
     */
    isPolling: function() {
      return this._pollStarted;
    },

    /**
     * Starts polling Model/Collection by calling fetch every pollInterval.
     * Note: Each Model/Collection will only allow a singleton of polling to occur so
     * as not to have duplicate threads updating Model/Collection.
     * @method startPolling
     * @param  pollInterval {Integer} interval between each poll in ms.
     */
    startPolling: function(pollInterval) {
      if (pollInterval) {
        this._pollInterval = pollInterval;
      }
      // have only 1 poll going at a time
      if (this._pollStarted) {
        return;
      } else {
        this._pollStarted = true;
        this._poll();
        this.pollTimeoutId = window.setInterval($.proxy(function() {
          this._poll();
        }, this), this._pollInterval);
      }
    },

    /**
     * Stops polling Model and clears all Timeouts.
     * @method  stopPolling
     */
    stopPolling: function() {
      window.clearInterval(this.pollTimeoutId);
      this._pollStarted = false;
    },

    /**
     * By default, the polled fetching operation is routed directly
     * to backbone's fetch all.
     * @method polledFetch
     */
    polledFetch: function() {
      this.fetch();
    },

    /**
     * Private function to recursively call itself and poll for db updates.
     * @private
     * @method _poll
     */
    _poll: function() {
      this.polledFetch();
    }
  };

  return pollingMixin;
}));
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.collectionRegistration = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }
}(this, function(_, $) {
  /**
   * Custom additions to the Backbone Collection object.
   * - safe disposal methods for memory + event management
   * - special functional overrides to support ID registration for different views
   *
   * @module    Torso
   * @namespace Torso.Mixins
   * @class  collectionRegistration
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var collectionRegistrationMixin = function(base) {

    var cacheMixin, createRequesterCollectionClass,
      baseSuper = base.super || function() {};

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

        var requesterMixin,
          baseParentSuper = parentClass.super;

        /**
         * A mixin that overrides base collection methods meant for cache's and tailors them
         * to a requester.
         * @method requesterMixin
         */
        requesterMixin = function(collection, myTrackedIds) {

          /**
           * @method requesterMixin.getTrackedIds
           * @return {Array} array of ids that this collection is tracking
           */
          collection.getTrackedIds = function() {
            return myTrackedIds;
          };

          /**
           * Will force the cache to fetch just the registered ids of this collection
           * @method requesterMixin.fetch
           * @return {Promise} promise that will resolve when the fetch is complete
           */
          collection.fetch = function() {
            return collection._loadWrapper(function() {
              if (myTrackedIds && myTrackedIds.length) {
                return parentInstance.fetchByIds({idsToFetch: myTrackedIds, setOptions: {remove: false}});
              } else {
                return $.Deferred().resolve().promise();
              }
            });
          };

          /**
           * Override the Id registration system to route via the parent collection
           * @method requesterMixin.trackIds
           * @param ids The list of ids that this collection wants to track
           */
          collection.trackIds = function(ids) {
            collection.remove(_.difference(myTrackedIds, ids));
            parentInstance.registerIds(ids, ownerKey);
            myTrackedIds = ids;
          };

          /**
           * Will register the new ids and then ask the cache to fetch them
           * @method requesterMixin.fetchByIds
           * @return the promise of the fetch by ids
           */
          collection.fetchByIds = function(newIds) {
            collection.trackIds(newIds);
            return collection.fetch();
          };

          /**
           * Handles the disposing of this collection as it relates to a requester collection.
           * @method requesterMixin.requesterDispose
           */
          collection.requesterDispose = function() {
            parentInstance.removeRequster(ownerKey);
          };
        };

        return {
          /**
           * The super constructor / initialize method for requester collections.
           * @method requesterMixin.super
           */
          super: function(args) {
            args = args || {};
            args.isRequester = true;
            baseParentSuper.call(this, args);
            requesterMixin(this, []);
            this.listenTo(parentInstance, 'load-begin', function() {
              this.trigger('cache-load-begin');
            });
            this.listenTo(parentInstance, 'load-complete', function() {
              this.trigger('cache-load-complete');
            });
          }
        };
      })(parent.constructor.__super__, parent, guid));
    };

    /**
     * Adds functions to manage state of requesters
     * @method cacheMixin
     * @param collection {Collection} the collection to add this mixin
     * @param options.requestMap {Object} the object to hold all request state
     * @param options.collectionTrackedIds {Array} list of all ids this collection is tracking
     * @param [options.getByIdsUrl='/ids'] {String} url path extension to the base collection.url that retrieves
                                                    many models when posted to with the ids of those models.
     * @param options.knownPrivateCollections {Object} map of all private collections that have registered ids [GUID -> collection]
     */
    cacheMixin = function(collection, options) {

      //************* PRIVATE METHODS ************//

      var setRequestedIds,
        requestMap = options.requestMap,
        collectionTrackedIds = options.collectionTrackedIds,
        getByIdsUrl = options.getByIdsUrl || '/ids',
        knownPrivateCollections = options.knownPrivateCollections;

      /**
       * If true, the collection will only fetch an object from the server once.
       * @property lazyFetch
       * @type boolean
       * @default false
       */
      collection.lazyFetch = collection.lazyFetch  || false;

      /**
       * @private
       * @method cacheMixin.setRequestedIds
       * @param guid {String} the global unique identifier for the requester
       * @param array {Array} the array of ids the requester wants
       */
      setRequestedIds = function(guid, array) {
        requestMap[guid] = {
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
        return requestMap[guid] && requestMap[guid].array;
      };

      /**
       * @method cacheMixin.getRequesterIdsAsDictionary
       * This method is used for quick look up of a certain id within the list of requested ids
       * @param guid {String} the global unique id of the requester
       * @return {Object} an dictionary of id -> id of the requester ids for a given requester.
       */
      collection.getRequesterIdsAsDictionary = function(guid) {
        return requestMap[guid] && requestMap[guid].dict;
      };

      /**
       * @method cacheMixin.removeRequster
       * Removes a requester from this cache. No longer receives updates
       * @param guid {String} the global unique id of the requester
       */
      collection.removeRequster = function(guid) {
        delete requestMap[guid];
        delete knownPrivateCollections[guid];
      };

      /**
       * @method cacheMixin.getRequesters
       * @return {Array} an array of the all requesters in the form of their GUID's
       */
      collection.getRequesters = function()  {
        return _.keys(requestMap);
      };

      /**
       * Return the list of Ids requested by this collection
       * @method cacheMixin.getAllRequestedIds
       * @return {Array} the corresponding requested Ids
       */
      collection.getAllRequestedIds = function() {
        return collectionTrackedIds;
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
      collection.createPrivateCollection = function(guid) {
        var RequesterClass = createRequesterCollectionClass(collection, guid);
        knownPrivateCollections[guid] = new RequesterClass();
        return knownPrivateCollections[guid];
      };

      /**
       * Registers a list of Ids that a particular object cares about.  This method
       * intelligently updates the "_requestedIds" field to contain all unique
       * requests for Ids to be fetched.  Furthermore, the "polledFetch" method
       * is overriden such that it no longer routes through Backbone's fetch all,
       * but rather a custom "fetchByIds" method.
       * @method cacheMixin.registerIds
       * @param newIds {Array}  - New ids to register under the requester
       * @param guid {String}   - The GUID of the object that wants the ids
       */
      collection.registerIds = function(newIds, guid) {
        var i, requesterIdx, storedIds, requesters, requesterLength,
            distinctIds = {},
            result = [];

        // Save the new requests in the map
        setRequestedIds(guid, newIds);
        requesters = collection.getRequesters();
        requesterLength = requesters.length;

        // Create a new request list
        for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
          storedIds = collection.getRequesterIds(requesters[requesterIdx]);
          for (i = 0; i < storedIds.length; i++) {
            distinctIds[storedIds[i]] = true;
          }
        }

        // Convert the hash table of unique Ids to a list
        for (i in distinctIds) {
          result.push(parseInt(i, 10));
        }
        collectionTrackedIds = result;

        // Overrides the polling mixin's fetch method
        collection.polledFetch = function() {
          collection.fetchByIds({
            idsToFetch: collectionTrackedIds,
            setOptions: {remove: true}
          });
        };
      };

      /**
       * A custom fetch operation to only fetch the requested Ids.
       * @method cacheMixin.fetchByIds
       * @param options.idsToFetch {Array} - A list of request Ids
       * @param options.setOptions {Object} - if a set is made, then the setOptions will be passed into the set method
       * @return {Promise} the promise of the fetch
       */
      collection.fetchByIds = function(options) {
        // Fires a method from the loadingMixin that wraps the fetch with events that happen before and after
        return collection._loadWrapper(function(args) {
          var requestedIds, idsToFetch;
          requestedIds = args.idsToFetch;
          if (collection.lazyFetch) {
            idsToFetch = _.difference(requestedIds, this.models.pluck('id'));
          } else {
            idsToFetch = requestedIds;
          }
          return $.ajax({
              type:'POST',
              url: collection.url + getByIdsUrl,
              contentType: 'application/json; charset=utf-8',
              data: JSON.stringify(idsToFetch)
            }).done(
              // Success function
              function(data) {
                var i, requesterIdx, requesterIdsAsDict, models, privateCollection,
                    requesterLength, requesters, model,
                    requestedIdsLength = requestedIds.length,
                    setOptions = args.setOptions;
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
                  privateCollection = knownPrivateCollections[requesters[requesterIdx]];
                  // a fetch by the parent will not remove a model in a requester collection that wasn't fetched with this call
                  privateCollection.set(models, {remove: false});
                }
              });
        }, options);
      };

      /**
       * Sets the lazyFetch mode. When enabled, the collection will assume models don't change, and only fetch each model from the server once.
       * @method setLazyFetch
       * @param lazyFetch {boolean} the lazyFetch mode to set
       */
      collection.setLazyFetch = function(lazyFetch) {
        collection.lazyFetch = lazyFetch;
      };

      /**
       * Gets the lazyFetch mode.
       * @method isLazyFetch
       * @return {boolean} true if this collection fetches lazily.
       */
      collection.isLazyFetch = function() {
        return collection.lazyFetch;
      };
    };

    return {
      /**
       * The super constructor / initialize method for collections.
       * Allocate new memory for the local references if they
       * were null when this method was called.
       * @method super
       */
      super: function(args) {
        args = args || {};
        baseSuper.call(this, args);
        this.isRequester = args && args.isRequester;
        if (!this.isRequester) {
          cacheMixin(this, {
            requestMap: {},
            collectionTrackedIds: [],
            knownPrivateCollections: {},
            getByIdsUrl: args.getByIdsUrl
          });
        }
      },

      /**
       * The default initialize method should simply call the
       * super constructor.
       * @method initialize
       * @param [args] {Object} Optional argument object
       */
      initialize: function(args) {
        this.super(args);
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
      },

      /**
       * The default filter.  Always returns itself.
       * @method filterDefault
       * @return {Collection} a new instance of this collection
       */
      filterDefault: function() {
        return this.constructor(this);
      }
    };
  };

  return collectionRegistrationMixin;
}));
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Mixins = root.Torso.Mixins || {};
    root.Torso.Mixins.cellPersistenceRemovalMixin = factory();
  }
}(this, function() {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @namespace Torso.Mixins
   * @class  cellPersistenceRemoval
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
    define(['underscore', 'backbone', './cellPersistenceRemovalMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./cellPersistenceRemovalMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Cell = factory(root._, root.Backbone, root.Torso.Mixins.cellPersistenceRemovalMixin);
  }
}(this, function(_, Backbone, cellPersistenceRemovalMixin) {
  'use strict';
  /**
   * An non-persistable object that can listen to and emit events like a models.
   * @module Torso
   * @class  Cell
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var Cell = Backbone.Model.extend({});
  _.extend(Cell.prototype, cellPersistenceRemovalMixin);

  return Cell;
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
    define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.events = factory(root._, root.Backbone);
  }
}(this, function(_, Backbone) {
  'use strict';

  /**
   * Generic Events.
   * @module    Torso
   * @class     events
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var torsoEvents = _.extend({}, Backbone.Events);

  return torsoEvents;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './pollingMixin', './collectionRegistrationMixin', './collectionLoadingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'), require('./collectionRegistrationMixin'), require('./collectionLoadingMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Collection = factory(root._, root.Backbone, root.Torso.Mixins.polling, root.Torso.Mixins.collectionRegistration, root.Torso.Mixins.collectionLoading);
  }
}(this, function(_, Backbone, pollingMixin, collectionRegistrationMixin, collectionLoadingMixin) {
  'use strict';

  /**
   * Generic Collection
   * @module    Torso
   * @class     Collection
   * @constructor
   * @author kent.willis@vecna.com
   */
  var Collection = Backbone.Collection.extend({});
  _.extend(Collection.prototype, pollingMixin);
  _.extend(Collection.prototype, collectionRegistrationMixin(Collection.prototype));
  _.extend(Collection.prototype, collectionLoadingMixin(Collection.prototype));

  return Collection;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './pollingMixin'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'));
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
    define(['underscore', 'backbone', './pollingMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./pollingMixin'));
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
    define(['underscore', 'backbone', './cellPersistenceRemovalMixin', 'backbone-nested'], factory);
  } else if (typeof exports === 'object') {
    require('backbone-nested');
    module.exports = factory(require('underscore'), require('backbone'), require('./cellPersistenceRemovalMixin'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.NestedCell = factory(root._, root.Backbone, root.Torso.Mixins.cellPersistenceRemovalMixin);
  }
}(this, function(_, Backbone, cellPersistenceRemovalMixin) {
  'use strict';

  /**
   * Generic Nested Model
   * @module    Torso
   * @class     NestedModel
   * @constructor
   * @author kent.willis@vecna.com
   */
  var NestedCell = Backbone.NestedModel.extend({});
  _.extend(NestedCell.prototype, cellPersistenceRemovalMixin);

  return NestedCell;
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
   * @author ariel.wexler@vecna.com
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
    var getOptionsAttrs = function(options, view) {
      var attrs = options.attributes;
      if (_.isFunction(attrs)) {
        attrs = attrs(view);
      } else if (_.isString(attrs) && (_.isFunction(defaultAttributeLoaders[attrs]))) {
        attrs = defaultAttributeLoaders[attrs](view);
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
        for (i = 0 ; i < model.get(attrName).length; i++) {
          newIndices = subIndices.slice();
          newIndices.push(i);
          subAttrs.push(generateSubAttributes(attrName + '[' + i + ']' + remainder, model, newIndices));
        }
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
    var mixin = function(view, options) {
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

          option = option || getOptionsAttrs(options, view);

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
              // Loop through all associated views
              _.each(this.associatedViews, function(view) {
                if (error) {
                  options.invalid(view, attr, error, options.selector);
                } else {
                  options.valid(view, attr, options.selector);
                }
              }, this);
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
          var model = this, validateAll, opt, validatedAttrs, allAttrs, flattened, changedAttrs, result;

          validateAll = !attrs;
          opt = _.extend({}, options, setOptions);
          validatedAttrs = getValidatedAttrs(model, getOptionsAttrs(options, view));
          allAttrs = _.extend({}, validatedAttrs, model.attributes, attrs);
          flattened = flatten(allAttrs);
          changedAttrs = attrs ? flatten(attrs) : flattened;
          result = validateModel(model, allAttrs, _.pick(flattened, _.keys(validatedAttrs)));
          model._isValid = result.isValid;

          //After validation is performed, loop through all associated views
          _.each(model.associatedViews, function(view){

            // After validation is performed, loop through all validated and changed attributes
            // and call the valid and invalid callbacks so the view is updated.
            _.each(validatedAttrs, function(val, attr){
                var invalid = result.invalidAttrs.hasOwnProperty(attr),
                  changed = changedAttrs.hasOwnProperty(attr);

                if(!invalid){
                  opt.valid(view, attr, opt.selector);
                }
                if(invalid && (changed || validateAll)){
                  opt.invalid(view, attr, result.invalidAttrs[attr], opt.selector);
                }
            });
          });

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

    // Helper to mix in validation on a model. Stores the view in the associated views array.
    var bindModel = function(view, model, options) {
      if (model.associatedViews) {
        model.associatedViews.push(view);
      } else {
        model.associatedViews = [view];
      }
      _.extend(model, mixin(view, options));
    };

    // Removes view from associated views of the model or the methods
    // added to a model if no view or single view provided
    var unbindModel = function(model, view) {
      if (view && model.associatedViews.length > 1){
        model.associatedViews = _.without(model.associatedViews, view);
      } else {
        delete model.validate;
        delete model.preValidate;
        delete model.isValid;
        delete model.associatedViews;
      }
    };

    // Mix in validation on a model whenever a model is
    // added to a collection
    var collectionAdd = function(model) {
      bindModel(this.view, model, this.options);
    };

    // Remove validation from a model whenever a model is
    // removed from a collection
    var collectionRemove = function(model) {
      unbindModel(model);
    };

    // Returns the public methods on Backbone.Validation
    return {

      // Current version of the library
      version: '0.11.3',

      // Called to configure the default options
      configure: function(options) {
        _.extend(defaultOptions, options);
      },

      // Hooks up validation on a view with a model
      // or collection
      bind: function(view, options) {
        options = _.extend({}, defaultOptions, defaultCallbacks, options);

        var model = options.model || view.model,
            collection = options.collection || view.collection;

        if(typeof model === 'undefined' && typeof collection === 'undefined'){
          throw 'Before you execute the binding your view must have a model or a collection.\n' +
                'See http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.';
        }

        if(model) {
          bindModel(view, model, options);
        }
        else if(collection) {
          collection.each(function(model){
            bindModel(view, model, options);
          });
          collection.bind('add', collectionAdd, {view: view, options: options});
          collection.bind('remove', collectionRemove);
        }
      },

      // Removes validation from a view with a model
      // or collection
      unbind: function(view, options) {
        options = _.extend({}, options);
        var model = options.model || view.model,
            collection = options.collection || view.collection;

        if(model) {
          unbindModel(model, view);
        }
        else if(collection) {
          collection.each(function(model){
            unbindModel(model, view);
          });
          collection.unbind('add', collectionAdd);
          collection.unbind('remove', collectionRemove);
        }
      },

      // Used to extend the Backbone.Model.prototype
      // with validation
      mixin: mixin(null, defaultOptions)
    };
  }());


  // Callbacks
  // ---------

  var defaultCallbacks = Validation.callbacks = {

    // Gets called when a previously invalid field in the
    // view becomes valid. Removes any error message.
    // Should be overridden with custom functionality.
    valid: function(view, attr, selector) {
      view.$('[' + selector + '~="' + attr + '"]')
          .removeClass('invalid')
          .removeAttr('data-error');
    },

    // Gets called when a field in the view becomes invalid.
    // Adds a error message.
    // Should be overridden with custom functionality.
    invalid: function(view, attr, error, selector) {
      view.$('[' + selector + '~="' + attr + '"]')
          .addClass('invalid')
          .attr('data-error', error);
    }
  };


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

  // AttributeLoaders

  var defaultAttributeLoaders = Validation.attributeLoaders = {
    inputNames: function (view) {
      var attrs = [];
      if (view) {
        view.$('form [name]').each(function () {
          if (/^(?:input|select|textarea)$/i.test(this.nodeName) && this.name &&
            this.type !== 'submit' && attrs.indexOf(this.name) === -1) {
            attrs.push(this.name);
          }
        });
      }
      return attrs;
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
      this._initMappings(options);

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
        this._copyFields(modelConfig.fields, this, modelConfig.model);
        this._updateCache(modelConfig.model);
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
        this._invokeComputedPull.call({formModel: this, models: computedConfig.models, pull: computedConfig.pull});
        _.each(computedConfig.models, function(modelConfig) {
          this._updateCache(modelConfig.model);
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
        this._setupListeners();
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
            models = formModel._getAllModels(true),
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
                  _.each(formModel._getAllModels(true), function(model) {
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
            oldValues[model.cid] = formModel._getTrackedModelFields(model);
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
        this._copyFields(modelConfig.fields, modelConfig.model, this);
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
        this._copyFields(modelConfig.fields, this, modelConfig.model);
        this._updateCache(modelConfig.model);
      }, this);
      _.each(this._computed, function(computedConfig) {
        this._invokeComputedPull.call({formModel: this, models: computedConfig.models, pull: computedConfig.pull});
        _.each(computedConfig.models, function(modelConfig) {
          this._updateCache(modelConfig.model);
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
        currentHashValues[model.cid] = this._generateHashValue(model);
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
        currentHashValues = this._generateAllHashValues();
      _.each(this._getAllModels(true), function(model) {
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
      this.listenTo(model, eventName, _.bind(this._updateFormField,
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
      this.listenTo(model, 'change:' + field, _.bind(this._invokeComputedPull,
          {formModel: this, models: computedConfig.models, pull: computedConfig.pull}));
      this._currentUpdateEvents.push({model: model, eventName: eventName});
    },

    /**
     * Deep clones the attributes. There should be no functions in the attributes
     * @param val {Object|Array|Basic Data Type} a non-function value
     * @return the clone
     * @private
     * @method _clone
     */
    _clone: function(val) {
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
     * @method _setupListeners
     */
    _setupListeners: function() {
      _.each(this._modelConfigs, function(modelConfig) {
        if (modelConfig.fields) {
          _.each(modelConfig.fields, function(field) {
            this.listenToModelField(modelConfig.model, field);
          }, this);
        } else {
          this.listenTo(modelConfig.model, 'change', this._updateFormModel, this);
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
     * @method _copyFields
     */
    _copyFields: function(fields, destination, origin) {
      if (!fields && this === origin) {
        fields = _.keys(destination.attributes);
      }
      if (fields) {
        _.each(fields, function(field) {
          destination.set(field, this._clone(origin.get(field)));
        }, this);
      } else {
        destination.set(this._clone(origin.attributes));
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
     * @method _updateFormField
     */
    _updateFormField: function(model, value) {
      this.formModel.set(this.field, value);
      this.formModel._updateCache(model);
    },

    /**
     * Create a hash value of a simple object
     * @param obj {Object} simple object with no functions
     * @return a hash value of the object
     * @private
     * @method _hashValue
     */
    _hashValue: function(obj) {
      return JSON.stringify(obj);
    },

    /**
     * @param model {Backbone.Model} the model to create the hash value from
     * @return {String} the hash value of the model making sure to only use the tracked fields
     * @private
     * @method _generateHashValue
     */
    _generateHashValue: function(model) {
      var modelFields = this._getTrackedModelFields(model);
      return this._hashValue(modelFields);
    },

    /**
     * @return {Object} a map of model's cid to the hash value of the model making sure to only use the tracked fields
     * @private
     * @method _generateAllHashValues
     */
    _generateAllHashValues: function() {
      var currentHashValues = {};
      _.each(this._getAllModels(true), function(model) {
        currentHashValues[model.cid] = this._generateHashValue(model);
      }, this);
      return currentHashValues;
    },

    /**
     * Updates this form model with the changed attributes of a given object model
     * @param model {Backbone.Model} the object model that has been changed
     * @private
     * @method _updateFormModel
     */
    _updateFormModel: function(model) {
      _.each(model.changedAttributes(), function(value, fieldName) {
        this.set(fieldName, this._clone(value));
      }, this);
      this._updateCache(model);
    },

    /**
     * Updates the form model's snapshot of the model's attributes to use later
     * @param model {Backbone.Model} the object model
     * @param [cache=this._cache] {Object} if passed an object (can be empty), this method will fill
     *   this cache object instead of this form model's _cache field
     * @private
     * @method _updateCache
     */
    _updateCache: function(model) {
      this._cache[model.cid] = this._generateHashValue(model);
    },

    /**
     * @param [options] {Object} See initialize option's 'model', 'fields', 'models', 'computed'.
     * @private
     * @method _initMappings
     */
    _initMappings: function(options) {
      var defaultMapping = _.result(this, 'mapping'),
        optionsMapping = _.pick(options, ['model', 'fields', 'models', 'computed']);
      this._initModels(optionsMapping, defaultMapping);
      this._initComputeds(optionsMapping, defaultMapping);
    },

    /**
     * @param [optionsMapping] {Object} a mapping object with override values
     * @param [defaultMapping] {Object} the default mapping object
     * @private
     * @method _initModels
     */
    _initModels: function(optionsMapping, defaultMapping) {
      var modelConfigs = this._pullModelsFromMapping(optionsMapping) || this._pullModelsFromMapping(defaultMapping);
      _.each(modelConfigs, this.addModel, this);
    },

    /**
     * @param [optionsMapping] {Object} a mapping object with override values
     *   @param [optionsMapping.computed] {Array} an array of Computed Configs
     * @param [defaultMapping] {Object} the default mapping object
     *   @param [defaultMapping.computed] {Array} and array of Computed Configs
     * @private
     * @method _initComputeds
     */
    _initComputeds: function(optionsMapping, defaultMapping) {
      var computeds;
      optionsMapping = optionsMapping || {};
      defaultMapping = defaultMapping || {};
      computeds = optionsMapping.computed || defaultMapping.computed;
      _.each(computeds, this.addComputed, this);
    },

    /**
     * @param [mapping] {Object} an object with object model(s) as dependencies
     * @return {Boolean} true if the mapping exists and specifies an object model dependency
     * @private
     * @method _mappingHasModels
     */
    _mappingHasModels: function(mapping) {
      return mapping && (mapping.model || mapping.models);
    },

    /**
     * @param [mapping] {Object} object with attributes that contain either a model/field pair as a convenience or an array of
     *   model configs. The model/field pair takes priority if both exist.
     * @return {Array} an array of model configs that are either from the mapping.model or mapping.model. If no model configs are
     *   defined in the mapping, it will return null.
     * @private
     * @method _pullModelsFromMapping
     */
    _pullModelsFromMapping: function(mapping) {
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
     * @method _getTrackedModelFields
     */
    _getTrackedModelFields: function(model) {
      var allFields,
        fieldsUsed = {},
        modelFields = {},
        modelConfigs = [];
      _.each(this._getAllModelConfigs(), function(modelConfig) {
        if (modelConfig.model.cid === model.cid) {
          modelConfigs.push(modelConfig);
        }
      });
      allFields = _.reduce(modelConfigs, function(result, modelConfig) {
        return result || !modelConfig.fields;
      }, false);
      if (allFields) {
        modelFields = this._clone(model.attributes);
      } else {
        _.each(modelConfigs, function(modelConfig) {
          _.each(modelConfig.fields, function(field) {
            if (!fieldsUsed[field]) {
              fieldsUsed[field] = true;
              modelFields[field] = this._clone(model.get(field));
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
     * @method _getAllModels
     */
    _getAllModels: function(normalize) {
      var modelsSeen = {},
        models = _.pluck(this._getAllModelConfigs(), 'model');
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
     * @method _getAllModelConfigs
     */
    _getAllModelConfigs: function() {
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
     * @method _invokeComputedPull
     */
    _invokeComputedPull: function(model) {
      var args = [];
      if (model) {
        this.formModel._updateCache(model);
      }
      (function(formModel, pullCallback, modelConfigs) {
        _.each(modelConfigs, function(modelConfig) {
          if (modelConfig.fields) {
            _.each(modelConfig.fields, function(field) {
              args.push(formModel._clone(modelConfig.model.get(field)));
            });
          } else {
            args.push(formModel._clone(modelConfig.model.attributes));
          }
        });
        pullCallback.apply(formModel, args);
      })(this.formModel, this.pull, this.models);
    }
  });

  _.extend(FormModel.prototype, validation.mixin);

  return FormModel;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './guidManager', './templateRenderer', './Cell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./guidManager'), require('./templateRenderer'), require('./Cell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.View = factory(root._, root.Backbone, root.Torso.Utils.guidManager, root.Torso.Utils.templateRenderer, root.Torso.Cell);
  }
}(this, function(_, Backbone, guidManager, templateRenderer, Cell) {
  'use strict';

  /**
   * Generic View that deals with:
   * - Unique GUID setting
   * - Creation of private collections
   * - Lifecycle of a view
   * @module    Torso
   * @class     View
   * @constructor
   * @author ariel.wexler@vecna.com, kent.willis@vecna.com
   */
  var View = Backbone.View.extend({
    _GUID: null,
    _childViews: null,
    viewState: null,
    tabInfo: null,
    _isActive: false,
    _isAttached: false,
    _isDisposed: false,

    /**
     * The super constructor / initialize method for views.
     * Creates a unique GUID for this view.
     * @method super
     */
    super: function() {
      this.generateGUID();
      this._childViews = {};
      this.viewState = new Cell();
    },

    /**
     * The default initialize method should simply call the
     * super constructor.
     * @method initialize
     */
    initialize: function() {
      this.super();
      this.render();
      this.activate();
    },

    /**
     * @return {Object} context for a render method. Defaults to empty object.
     * @method prepare
     */
    prepare: function() {
      return {};
    },

    /**
     * Rebuilds the html for this view's element. Should be able to be called at any time.
     * Defaults to using this.templateRender
     * @method render
     */
    render: function() {
      if (this.template) {
        this.templateRender(this.$el, this.template, this.prepare());
      }
    },

    /**
     * Generates and sets this view's GUID (if null)
     * @method generateGUID
     */
    generateGUID: function() {
      if (this._GUID === null) {
        this._GUID = guidManager.generate(this);
      }
    },

    /**
     * Returns the GUID
     *
     * @method getGUID
     */
    getGUID: function() {
      return this._GUID;
    },

    /**
     * Trigger a change:tab-info event, so any tab view listening can react to it.
     * @method triggerInfoChange
     */
    triggerTabInfoChange: function() {
      this.trigger('change:tab-info', this.tabInfo);
    },

    /**
     * Hotswap rendering system reroute method.
     * @method templateRender
     * See Torso.templateRenderer#render for params
     */
    templateRender: function(el, template, context, opts) {
      templateRenderer.render(el, template, context, opts);
    },

    /**
     * Creates a private collection object for this view using the
     * input collection as a reference.  If the invoking view is
     * visiting this method for the first time, the view will be
     * assigned a unique requester Id.  Private collections have all
     * the functionality of the original collection, but are automatically
     * managed by the parent (passed in) collection.  That is, any view
     * using a provate collection should only have to worry about registering
     * Ids of interest, and the rest is managed behind the scenes.
     * @method createPrivateCollection
     * @param  parentCollection {Collection} The parent collection to mimic and link to
     * @return {Collection} The new private collection
     */
    createPrivateCollection: function(parentCollection) {
      return parentCollection.createPrivateCollection(this._GUID);
    },

    /**
     * Removes all events and corresponding DOM for a view.
     * Guarantees to call call "cleanupChildViews" to enforce
     * recursive removal of views.
     * @method cleanupSelf
     */
    cleanupSelf: function() {
      this.detach();

      // Clean up child views first
      this.cleanupChildViews();

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

      this._isDisposed = true;
    },

    /**
     * Method to be invoked when deactivate is called. Use this method to turn off any
     * custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.
     * @method deactivateCallback
     */
    deactivateCallback: _.noop,

    /**
     * Method to be invoked when activate is called. Use this method to turn on any
     * custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.
     * @method deactivateCallback
     */
    activateCallback: _.noop,

    /**
     * @return {Boolean} true if this view has child views
     * @method hasChildViews
     */
    hasChildViews: function() {
      return !_.isEmpty(this._childViews);
    },

    /**
     * @return all of the child views this list view has registered
     * @method getChildViews
     */
    getChildViews: function() {
      return _.values(this._childViews);
    },

    /**
     * Default child view cleanup method that may be overriden.
     * @method cleanupChildViews
     */
    cleanupChildViews: function() {
      _.each(this._childViews, function(view) {
        view.dispose();
      });
    },

    /**
     * Deactivates all child views
     * Default method may be overriden.
     * @method deactivateChildViews
     */
    deactivateChildViews: function() {
      _.each(this._childViews, function(view) {
        view.deactivate();
      });
    },

    /**
     * Activates all child views
     * Default method may be overriden.
     * @method deactivateChildViews
     */
    activateChildViews: function() {
      _.each(this._childViews, function(view) {
        view.activate();
      });
    },

    /**
     * Binds the view as a child view - any recursive calls like activate, deactivate, or dispose will
     * be done to the child view as well.
     * @param view {View} the child view
     * @return {View} the child view
     * @method registerChildView
     */
    registerChildView: function(view) {
      this._childViews[view.cid] = view;
      return view;
    },

    /**
     * Unbinds the child view - no recursive calls will be made to this child view
     * @param view {View} the child view
     * @return {View} the child view
     * @method unregisterChildView
     */
    unregisterChildView: function(view) {
      delete this._childViews[view.cid];
      this.stopListening(view);
      return view;
    },

    /**
     * Attaches a child view by finding the element with the attribute inject=<injectionSite>
     * Invokes attachChildView as the bulk of the functionality
     * @method injectView
     * @param injectionSite {String} The name of the injection site in the layout template
     * @param view          {View}   The instantiated view object to inject
     */
    injectView: function(injectionSite, view) {
      var injectionPoint = this.$el.find('[inject=' + injectionSite + ']');
      if (view && injectionPoint.size() > 0) {
        this.attachChildView(injectionPoint, view);
      }
    },

    /**
     * Registers the child view if not already done so, then calls view.attach with the element argument
     * @param $el {jQuery element} the element to attach to.
     * @param view {View} the child view
     * @method attachChildView
     */
    attachChildView: function($el, view) {
      view.detach();
      this.registerChildView(view);
      view.attach($el);
    },

    /**
     * If attached, will detach the view from the DOM and calls deactivate
     * @method detach
     */
    detach: function() {
      if (this.isAttached()) {
        // Detach view from DOM
        if (this.injectionSite) {
          this.$el.replaceWith(this.injectionSite);
        } else {
          this.$el.detach();
        }
        this.deactivate();
        this._isAttached = false;
      }
    },

    /**
     * If detached, will replace the element passed in with this view's element and activate the view.
     * @param $el [jQuery element] the element to attach to. This element will be replaced will this view
     * @method attach
     */
    attach: function($el) {
      if (!this.isAttached()) {
        // be safe and deactivate before attaching yourself
        this.deactivate();
        this.render();
        this.injectionSite = $el.replaceWith(this.$el);
        this.activate();
        this._isAttached = true;
      }
    },

    /**
     * @returns {Boolean} true if the view is attached
     * @method isAttached
     */
    isAttached: function() {
      return this._isAttached;
    },

    /**
     * Maintains view state and DOM but prevents view from becoming a zombie by removing listeners
     * and events that may affect user experience. Recursively invokes deactivate on child views
     * @method deactivate
     */
    deactivate: function() {
      this.deactivateChildViews();
      if (this.isActive()) {
        this.undelegateEvents();
        this.deactivateCallback();
        this._isActive = false;
      }
    },

    /**
     * Resets listeners and events in order for the view to be reattached to the visible DOM
     * @method activate
     */
    activate: function() {
      this.activateChildViews();
      if (!this.isActive()) {
        this.delegateEvents();
        this.activateCallback();
        this._isActive = true;
      }
    },

    /**
     * @returns {Boolean} true if the view is active
     * @method isActive
     */
    isActive: function() {
      return this._isActive;
    },

    /**
     * Removes all listeners, disposes children views, stops listening to events, removes DOM.
     * After dispose is called, the view can be safely garbage collected.
     * By default, dispose pipes directly to cleanupSelf. Called while
     * recursively removing views from the hierarchy.
     * @method dispose
     */
    dispose: function() {
      this.cleanupSelf();
    },

    /**
     * @returns {Boolean} true if the view was disposed
     * @method isDisposed
     */
    isDisposed: function() {
      return this._isDisposed;
    }
  });

  return View;
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

    var removeChildView, addChildView, aggregateRenders, breakDelayedRender;

    /**
     * If one exists, this method will clear the delayed render timeout and invoke render
     * @param view {List View} the list view
     * @private
     * @method breakDelayedRender
     */
    breakDelayedRender = function(view) {
      if (view._delayedRenderTimeout) {
        clearTimeout(view._delayedRenderTimeout);
        view._delayedRenderTimeout = null;
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
        view._delayedRenderTimeout = null;
        view.render();
      };
      return function() {
        if (!view._delayedRenderTimeout && wait > 0) {
          view._delayedRenderTimeout = setTimeout(postpone, wait);
        } else if (wait <= 0) {
          view.render();
        }
      };
    };

    /**
     * Handles the removal of a child view if a model has been removed from the collection
     * @private
     * @method removeChildView
     * @param model {Backbone Model instance} the model that has been removed
     */
    removeChildView = function(model) {
      var childView = this.getChildView(model);
      if (childView) {
        childView.dispose();
        this.unregisterChildView(childView);
        delete this._modelToViewMap[model.cid];
        this.trigger('child-view-removed', {model: model, view: childView});
        if (!this.hasChildViews()) {
          this._delayedRender();
        }
      }
    };

    /**
     * Handles the addition of a child view if a model has been added to the collection.
     * When possible, it will append the view instead of causing a rerender
     * @private
     * @method addChildView
     * @param model the model being added
     */
    addChildView = function(model) {
      var childView, viewAfter, viewBefore,
          models = this.modelsToRender(),
          indexOfModel = models.indexOf(model);
      if (indexOfModel > -1) {
        this._createChildViews();
        if (!this.hasChildViews()) {
          this._delayedRender();
        } else {
          breakDelayedRender(this);
          childView = this.getChildView(model);
          viewAfter = this.getChildView(models[indexOfModel + 1]);
          viewBefore = this.getChildView(models[indexOfModel - 1]);
          if (viewAfter) {
            viewAfter.$el.before(childView.$el);
          } else if (viewBefore) {
            viewBefore.$el.after(childView.$el);
          } else {
            this._delayedRender();
          }
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
    className: '',
    _collection: null,
    _modelName: '',
    _childView: null,
    _modelToViewMap: null,
    _template: null,
    _emptyTemplate: null,
    _childContext: null,
    _renderWait: 0,
    _delayedRender: null,
    _delayedRenderTimeout: null,

    /**
     * Initialize the list view object.
     * Override to add more functionality but remember to call this.listViewSetup(args) first
     * @method initialize
     * @param args {Object} - options argument
     *   @param args.childModel {String} - name of the model argument passed to the child view during initialization
     *   @param args.childView {Backbone.View definition} - the class definition of the child view. This view will be instantiated
     *                                                     for every model returned by modelsToRender()
     *   @param args.collection {Backbone.Collection instance} - The collection that will back this list view. A subclass of list view
     *                                                          might provide a default collection. Can be private or public collection
     *   @param [args.childContext] {Object or Function} - object or function that's passed to the child view's during initialization under the name "context". Can be used by the child view during their prepare method.
     *   @param [args.template] {HTML Template} - allows a list view to hold it's own HTML like filter buttons, etc.
     *   @param [args.childrenContainer] {String}  - (Required if 'template' is provided, ignored otherwise) name of injection site for list of children
     *   @param [args.emptyTemplate] {HTML Template} - if provided, this template that will be shown if the modelsToRender() method returns
     *                                             an empty list. If a childrenContainer is provided, the empty template will be
     *                                             rendered there.
     *   @param [args.modelsToRender] {Function} - If provided, this function will override the modelsToRender() method with custom
     *                                           functionality.
     *   @param [args.renderWait=0] {Numeric} - If provided, will collect any internally invoked renders (typically through collection events like reset) for a duration specified by renderWait in milliseconds and then calls a single render instead. Helps to remove unnecessary render calls when modifying the collection often.
     *   @param [args.modelId='cid'] {String} - model property used as identifier for a given model. This property is saved and used to find the corresponding view.
     */
    initialize: function(args) {
      this.super();
      this.listViewSetup(args);
      this.render();
    },

    /**
     * Set up the list view object. See {#initialize()} to understand the arguments required
     * @method listViewSetup
     * @param args {Object} See initialize method for args documentation as they are identical
     */
    listViewSetup: function(args) {
      var initialModels, i, l, childView,
        injectionSite = this.$el;
      args = args || {};
      this._modelName = args.childModel || 'model';
      this._collection = args.collection;
      this._childView = args.childView;
      this._template = args.template;
      this._childrenContainer = args.childrenContainer;
      if (this._template && !this._childrenContainer) {
        throw 'Children container is required when using a template';
      }
      this._emptyTemplate = args.emptyTemplate;
      this.modelsToRender = args.modelsToRender || this.modelsToRender;
      this._childContext = args.childContext;
      this._modelToViewMap = {};
      this._renderWait = args.renderWait || this._renderWait;
      this._modelId = args.modelId || 'cid';
      this._createChildViews();
      this._delayedRender = aggregateRenders(this._renderWait, this);

      // if a 'changed' event happens, the model's view should handle re-rendering itself
      this.listenTo(this._collection, 'remove', removeChildView, this);
      this.listenTo(this._collection, 'add', addChildView, this);
      this.listenTo(this._collection, 'sort', this._delayedRender, this);
      this.listenTo(this._collection, 'reset', this.update, this);
    },

    /**
     * The core rendering method that produces the template for the list view first
     * then invokes a refresh on all children views or renders an empty list template
     * if there are no models in the modelsToRender
     * @method render
     */
    render: function() {
      var injectionSite,
          newDOM = templateRenderer.copyTopElement(this.$el);
      if (this._template) {
        newDOM.html(this._template(this.prepare()));
        injectionSite = newDOM.find('[inject=' + this._childrenContainer + ']');
      } else {
        injectionSite = $('<span>');
        newDOM.append(injectionSite);
      }
      if (this.hasChildViews()) {
        injectionSite.replaceWith(this._buildChildViewsFragment());
      } else if (this._emptyTemplate) {
        injectionSite.replaceWith(this._emptyTemplate(this.prepareEmpty()));
      }
      this.trigger('render-before-dom-replacement', newDOM);
      this.$el.html(newDOM.contents());
      this.delegateEvents();
      this.trigger('render-complete');
    },

    /**
     * Loops through children views and renders them
     * @method renderChildViews
     */
    renderChildViews: function() {
      _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildView(model);
        childView.render();
      }, this);
    },

    /**
     * Override to prepare a context for the HTML template used as the base list view
     * @method prepare
     * @return {Object} an object to use for HTML templating the base list view
     */
    prepare: function() {
      return {};
    },

    /**
     * Override if you want a different context for your empty template
     * @method prepareEmpty
     * @return a context that can be used by the empty list template
     */
    prepareEmpty: function() {
      return {};
    },

    /**
     * Returns an array of which models should be rendered.
     * By default, all models in the input collection will be
     * shown.  Extensions of this class may override this
     * method to apply collection filters.
     * @method modelsToRender
     */
    modelsToRender: function() {
      return this._collection ? this._collection.models : [];
    },

    /**
     * Builds any new views and re-renders
     * @method update
     */
    update: function() {
      this._createChildViews();
      this._delayedRender();
    },

    /**
     * Returns the view that corresponds to the model if one exists
     * @param model {Model} the model
     * @return the child view corresponding to the model
     * @method getChildView
     */
    getChildView: function(model) {
      return model ? this._childViews[this._modelToViewMap[model[this._modelId]]] : undefined;
    },

    /**
     * Creates a new child view if there doesn't exist one for a model
     * @method _createChildViews
     */
    _createChildViews: function() {
      _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildView(model);
        if (!childView) {
          childView = this._createChildView(model);
          this.trigger('child-view-added', {model: model, view: childView});
        }
      }, this);
    },

    /**
     * @return a DOM fragment with child view elements appended
     * @method _buildChildViewsFragment
     * @private
     */
    _buildChildViewsFragment: function(renderAlso) {
      var injectionFragment = document.createDocumentFragment();
     _.each(this.modelsToRender(), function(model) {
        var childView = this.getChildView(model);
        if (childView) {
          injectionFragment.appendChild(childView.el);
        }
      }, this);
      return $(injectionFragment);
    },

    /**
     * Creates a child view and stores a reference to it
     * @method _createChildView
     * @private
     * @param model {Backbone Model} the model to create the view from
     * @return {Backbone View} the new child view
     */
    _createChildView: function(model) {
      var childView = this.registerChildView(new this._childView(this._generateChildArgs(model)));
      this._modelToViewMap[model.cid] = childView.cid;
      return childView;
    },

    /**
     * Method to generate arguments when creating a child view. Override this method
     * to change the arguments for a given child view.
     * The format of the subview's arguments is:
     * {
     *   context: {
     *     ... inherited from parent ...
     *   },
     *   <modelName>: <modelObject>
     * }
     * @method _generateChildArgs
     * @private
     * @param model the model for a child view
     * @return a context to be used by a child view
     */
    _generateChildArgs: function(model) {
      var args = {
        'context': _.extend({}, _.result(this, '_childContext'))
      };
      args[this._modelName] = model;
      return args;
    }
  });

  return ListView;
}));


(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', './View', './FormModel'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'), require('./View'), require('./FormModel'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.FormView = factory(root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Torso.View, root.Torso.FormModel);
  }
}(this, function(_, $, View, FormModel) {
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
     * Initialize the form view object.
     * Override to add more functionality
     * @method initialize
     * @param args {Object} - options argument
     * @param args.model       {Torso.FormModel} - requires a form model for binding
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
      this.model = this.model || (new FormModel());
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
      this.unplug();
      this.templateRender(this.$el, this.template, context);
      this.plug();
      this.delegateEvents();
    },

    /**
     * Override the delegate events and wrap our custom additions
     * @method delegateEvents
     */
    delegateEvents: function() {
      /* DOM event bindings and plugins */
      this._generateStickitBindings();
      this.stickit();
      View.prototype.delegateEvents.call(this);
      this._generateFeedbackBindings();
      this._generateFeedbackModelCallbacks();
    },

    /**
     * Before any DOM rendering is done, this method is called and removes any
     * custom plugins including events that attached to the existing elements.
     * This method can be overwritten as usual OR extended using <class>.__super__.plug.apply(this, arguments);
     * @method unplug
     */
    unplug: function() {
      // nothing by default
    },

    /**
     * After all DOM rendering is done, this method is called and attaches any
     * custom plugins to the existing elements.  This method can be overwritten
     * as usual OR extended using <class>.__super__.plug.apply(this, arguments);
     * @method plug
     */
    plug: function() {
      // nothing by default
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
     * Invokes a feedback entry's "then" method
     * @param to {String} the "to" field corresponding to the feedback entry to be invoked
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
      FormView.__super__.dispose.apply(this, arguments);
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
      _.each(self.feedbackModel.attributes, function(value, attr) {
        self.feedbackModel.trigger('change:' + attr);
      });
    },

    /**
     * @method _getFieldOptions
     * @param attr {String} An attribute of the model
     * @return {Object} Any settings that are associates with that attribute
     */
    _getFieldOptions: function(attr) {
      attr = this._stripAllAttribute(attr);
      return this.fields[attr] || {};
    },

    /**
     * Returns an array of all the values and variables used within the array notations in a string
     * Example: foo.bar[x].baz[0][1].taz[y] will return ['x', 0, 1, 'y']. It will parse integers if they are numbers
     * This does not handle or return any "open" array notations: []
     * @private
     * @method _getAllIndexTokens
     */
    _getAllIndexTokens: function(attr) {
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
     * @method _stripAllAttribute
     */
    _stripAllAttribute: function(attr) {
      attr = attr.replace(/\[.+?\]/g, function() {
        return '[]';
      });
      return attr;
    },

    /**
     * Takes a map from variable name to value to be replaced and processes a string with them.
     * Example: foo.bar[x].baz[0][1].taz[y] and {x: 5, y: 9} will return as foo.bar[5].baz[0][1].taz[9]
     * @private
     * @method _substituteIndicesUsingMap
     */
    _substituteIndicesUsingMap : function(dest, indexMap) {
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
     * Processes the result of the then method. Adds to the feedback model.
     * @param result {Object} the result of the then method
     * @param feedbackModelField {Object} the name of the feedbackModelField, typically the "to" value.
     * @private
     * @method _processFeedbackThenResult
     */
    _processFeedbackThenResult: function(result, feedbackModelField) {
      var newState = $.extend({}, result);
      this.feedbackModel.set(feedbackModelField, newState, {silent: true});
      this.feedbackModel.trigger('change:' + feedbackModelField);
    },

    /**
     * @method _generateModelFieldBinding
     * @param field {String} A specific model field
     * @param options {Object} Additional heavior options for the bindings
     * @param [options.modelFormat] {Object} The function called before setting model values
     * @param [options.viewFormat] {Object} The function called before setting view values
     * @private
     * @return {<Stickit Binding Hash>}
     */
    _generateModelFieldBinding: function(field, options) {
      var indices = this._getAllIndexTokens(field);
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
    },

    /**
     * Creates the "when" bindings, and collates and invokes the "then" methods for all feedbacks
     * Finds all feedback zones that match the "to" field, and binds the "when" events to invoke the "then" method
     * @private
     * @method _generateFeedbackBindings
     */
    _generateFeedbackBindings: function() {
      var i,
          self = this;

      // Cleanup previous "on" events
      for (i = 0; i < this._feedbackEvents.length; i++) {
        this.off(null, this._feedbackEvents[i]);
      }
      this._feedbackEvents = [];

      // For each feedback configuration
      _.each(this.feedback, function(declaration) {
        var toEntries = [declaration.to];
        if (_.isArray(declaration.to)) {
          toEntries = declaration.to;
        }
        _.each(toEntries, function(to) {
          var destinations = self._getFeedbackDestinations(to),
            destIndexTokens = self._getAllIndexTokens(to);

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

            // track the indices for binding
            bindInfo = {
              feedbackModelField: fieldName,
              fn: then,
              indices: indexMap
            };
            // Iterate over all "when" clauses
            whenEvents = self._generateWhenEvents(declaration.when, indexMap);
            _.each(whenEvents, function(eventKey) {
              var match, delegateEventSplitter,
                invokeThen = function(evt) {
                  var i, args, result;
                  args = [evt];
                  newState = {};
                  args.push(bindInfo.indices);
                  result = bindInfo.fn.apply(self, args);
                  self._processFeedbackThenResult(result, bindInfo.feedbackModelField);
                };
              delegateEventSplitter = /^(\S+)\s*(.*)$/;
              match = eventKey.match(delegateEventSplitter);
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
    },
 

    /**
     * Checks to see if the form model's field is valid. If the field is invalid, it adds the class.
     * If the field is invalid, it removes the class. When an array is passed in for the fieldName,
     * it will validate all the fields together as if they were one (any failure counts as a total failure,
     * and all fields need to be valid for success).
     * @param fieldName {String or Array<String>} the name of the form model field or an array of field names
     * @param className {String} the class name to add or remove
     * @param [onValid] {Boolean} if true, will reverse the logic operator
     * @private
     * @method _thenAddClassIfInvalid
     * @for WebCore.Views.Form
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
     * Checks to see if the form model's field is valid. If the field is invalid, it sets the text.
     * If the field is invalid, it removes the text. When an array is passed in for the fieldName,
     * it will validate all the fields together as if they were one (any failure counts as a total failure,
     * and all fields need to be valid for success).
     * @param fieldName {String or Array<String>} the name of the form model field or an array of field names
     * @param text {String} the text to set
     * @param [onValid] {Boolean} if true, will reverse the logic operator
     * @private
     * @method _thenAddTextIfInvalid
     * @for WebCore.Views.Form
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
    }
  });

  return FormView;
}));
