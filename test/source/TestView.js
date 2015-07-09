
module.exports = function(TorsoView) {
  return TorsoView.extend({
    className: 'testView',
    template: require('./validation-test-template'),
    clicked: 0,
    events: {
      'click button' : 'buttonClicked'
    },

    buttonClicked: function() {
      this.clicked++;
    }
  });
}