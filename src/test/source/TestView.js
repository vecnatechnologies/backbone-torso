
module.exports = function(TorsoView) {
  return TorsoView.extend({
    className: 'testView',
    template: require('./validation-test-template'),
    clicked: 0,
    events: {
      'click button' : 'buttonClicked'
    },

    initialize: function() {
      this.super();
      this.render();
    },

    prepare: function() {
      return {};
    },

    render: function() {
      this.templateRender(this.$el, this.template, this.prepare());
      this.delegateEvents();
    },

    buttonClicked: function() {
      this.clicked++;
    }
  });
}