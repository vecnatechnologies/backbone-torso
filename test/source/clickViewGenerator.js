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
    render: function() {
      this.$el.html('<div class="click">test</div>');
    },
    initialize: function() {
      window.Torso.View.prototype.initialize.call(this);
      this.on('myEvent', this.afterMyEvent);
    },
    activateCallback: function() {
      this.on('myDeactivatableEvent', this.afterMyDeactivatableEvent);
    },
    deactivateCallback: function() {
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
