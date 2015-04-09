/**
 * Creates a child view class with different dom
 * @param TorsoView {View} Torso's view
 * @param _ {Underscore} underscore
 * @param spyOnBackbone {function} the spy on backbone function
 */
module.exports = function(TorsoView, _, spyOnBackbone) {
  var ChildView = require('./ClickView')(TorsoView, _, spyOnBackbone).extend({
    events: {
      'click div.child' : 'myClick'
    },
    render: function() {
      this.$el.html("<div class='child'>test</div>");
    },
  });
  return ChildView;
};
