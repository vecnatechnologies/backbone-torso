/**
 * Creates a child view class with different dom
 * @param window {window} the window object
 */
module.exports = function(window) {
  var ChildView = require('./clickViewGenerator')(window).extend({
    events: {
      'click div.child' : 'myClick'
    },
    render: function() {
      this.$el.html("<div class='child'>test</div>");
    },
  });
  return ChildView;
};
