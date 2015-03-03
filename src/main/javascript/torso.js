(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./backbone/models/TorsoNestedModel', './backbone/mixins/torsoValidation'], function() {
      return {};
    });
  } else if (typeof exports === 'object') {
    root.$ = require('jquery');
    factory(require('./backbone/models/TorsoNestedModel'), require('./backbone/mixins/torsoValidation'), module.exports);
  } else {
    root.Torso = root.Torso || {};
  }
}(this));