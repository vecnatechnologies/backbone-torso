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
