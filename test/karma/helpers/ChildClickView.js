var ClickView = require('./ClickView');
module.exports = ClickView.extend({
  events: {
    'click div.child' : 'myClick'
  },
  template: '<div class="child">test</div>'
});