var spyOnBackbone = require('../spec/functional/backboneSpy');

/**
 * Creates a view class that has various events it's listening to
 * with spies on the callbacks.
 * @param window {window} the window object
 */
module.exports = function(window) {
  var _ = window._;

  var ClickView = window.Torso.View.extend({
    events: {
      'click div' : 'myClick'
    },
    template: '<div class="click">test</div>',
    initialize: function() {
      this.on('myEvent', this.afterMyEvent);
    },
    _activate: function() {
      this.on('myDeactivatableEvent', this.afterMyDeactivatableEvent);
    },
    _deactivate: function() {
      this.off('myDeactivatableEvent');
    },
    myClick: _.noop,
    afterMyEvent: _.noop,
    afterMyDeactivatableEvent: _.noop
  });
  spyOnBackbone(ClickView, 'myClick');
  spyOnBackbone(ClickView, 'afterMyEvent');
  spyOnBackbone(ClickView, 'afterMyDeactivatableEvent');
  return ClickView;
};
