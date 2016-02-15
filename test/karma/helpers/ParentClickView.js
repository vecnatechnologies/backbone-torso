var _ = require('underscore');
var TorsoView = require('./../../../modules/View');
var ChildClickView = require('./ChildClickView');

module.exports = TorsoView.extend({
  events: {
    'click div.parent' : 'myClick'
  },
  initialize: function() {
    this.spyHook();

    spyOn(this, 'myClick');
    spyOn(this, 'afterMyEvent');
    spyOn(this, 'afterMyDeactivatableEvent');

    this.childView1 = new ChildClickView();
    this.childView2 = new ChildClickView();
    this.on('myEvent', this.afterMyEvent);
  },
  render: function() {
    this.$el.html('<div class="parent">test</div><div inject="one"></div><div inject="two"></div>');
    this.injectView('one', this.childView1);
    this.injectView('two', this.childView2);
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