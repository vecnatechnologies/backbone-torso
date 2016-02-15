var _ = require('underscore');
var TorsoView = require('./../../../modules/View');

module.exports = TorsoView.extend({
  className: 'click',
  events: {
    'click div' : 'myClick'
  },
  render: function() {
    this.$el.html('<div>test</div>');
  },
  initialize: function() {
    this.spyHook();
    spyOn(this, 'myClick');
    spyOn(this, 'afterMyEvent');
    spyOn(this, 'afterMyDeactivatableEvent');

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
  // hook for registering additional spies
  spyHook: _.noop
});
