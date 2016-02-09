var ClickView = require('./ClickView');
module.exports = ClickView.extend({
  events: {
    'click div.child' : 'myClick'
  },
  render: function() {
    this.$el.html('<div class="child">test</div>');
  },
});