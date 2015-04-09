/**
 * Creates a parent view with two children views
 * @param TorsoView {View} Torso's view
 * @param _ {Underscore} underscore
 * @param spyOnBackbone {function} the spy on backbone function
 * @param ChildView1 {View} the class for the first child view
 * @param ChildView2 {View} the class for the second child view
 */
module.exports = function(TorsoView, _, spyOnBackbone, ChildView1, ChildView2) {
  var ParentView = TorsoView.extend({
    events: {
      'click div.parent' : 'myClick'
    },
    render: function() {
      this.$el.html("<div class='parent'>test</div><div inject='one'></div><div inject='two'></div>");
      this.injectView('one', this.childView1);
      this.injectView('two', this.childView2);
    },
    initialize: function() {
      this.super();
      this.childView1 = new ChildView1();
      this.childView2 = new ChildView2();
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

  spyOnBackbone(ParentView, 'myClick');
  spyOnBackbone(ParentView, 'afterMyEvent');
  spyOnBackbone(ParentView, 'afterMyDeactivatableEvent');
  return ParentView;
};
