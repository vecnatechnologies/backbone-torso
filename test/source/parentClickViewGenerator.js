var spyOnBackbone = require('../spec/functional/backboneSpy'),
    childClickViewGenerator = require('./childClickViewGenerator');

/**
 * Creates a parent view with two children views
 * @param window {window} the window object
 * @param ChildView1 {View} the class for the first child view
 * @param ChildView2 {View} the class for the second child view
 */
module.exports = function(window) {
  var _ = window._,
      ChildView1 = childClickViewGenerator(window),
      ChildView2 = childClickViewGenerator(window);

  var ParentView = window.Torso.View.extend({
    events: {
      'click div.parent' : 'myClick'
    },
    template: "<div class='parent'>test</div><div inject='one'></div><div inject='two'></div>",
    attachTrackedViews: function() {
      this.attachView('one', this.childView1);
      this.attachView('two', this.childView2);
    },
    initialize: function() {
      this.childView1 = new ChildView1();
      this.childView2 = new ChildView2();
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

  spyOnBackbone(ParentView, 'myClick');
  spyOnBackbone(ParentView, 'afterMyEvent');
  spyOnBackbone(ParentView, 'afterMyDeactivatableEvent');
  return ParentView;
};
