/**
 * Creates a view class that has various events it's listening to
 * with spies on the callbacks.
 * @param TorsoView {View} Torso's view
 * @param _ {Underscore} underscore
 * @param spyOnBackbone {function} the spy on backbone function
 */
module.exports = function(TorsoView, _, spyOnBackbone) {

  var ClickView = TorsoView.extend({
    events: {
      'click div' : 'myClick'
    },
    render: function() {
      this.$el.html('<div class="click">test</div>');
    },
    initialize: function() {
      this.super();
      this.on('myEvent', this.afterMyEvent);
      this.render();
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
