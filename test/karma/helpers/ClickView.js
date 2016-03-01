var _ = require('underscore');
var TorsoView = require('./../../../modules/View');
var spyOnBackbone = require('./spyOnBackbone');

var ClickView = TorsoView.extend({
  className: 'click',
  events: {
    'click div' : 'myClick'
  },
  render: function() {
    this.$el.html('<div>test</div>');
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
  // hook for registering additional spies
  spyHook: _.noop
});

spyOnBackbone(ClickView, 'myClick');
spyOnBackbone(ClickView, 'afterMyEvent');
spyOnBackbone(ClickView, 'afterMyDeactivatableEvent');
spyOnBackbone(ClickView, '_activate');
module.exports = ClickView;