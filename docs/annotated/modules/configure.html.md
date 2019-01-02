





  

```
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

```




