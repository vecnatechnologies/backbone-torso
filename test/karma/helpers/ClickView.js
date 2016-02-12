var _ = require('underscore');
var TorsoView = require('./../../../modules/View');

module.exports = TorsoView.extend({
  events: {
    'click div' : 'myClick'
  },
  render: function() {
    this.$el.html('<div class="click">test</div>');
  },
  initialize: function() {
    this.spyHook();

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
  afterMyDeactivatableEvent: _.noop,
  spyHook: _.noop
});
