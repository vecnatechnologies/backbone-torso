var _ = require('underscore');
var TorsoView = require('./../../../modules/View');
var ChildClickView = require('./ChildClickView');
var spyOnBackbone = require('./spyOnBackbone');

var ParentClickView = TorsoView.extend({
  events: {
    'click div.parent' : 'myClick'
  },
  template: "<div class='parent'>test</div><div inject='one'></div><div inject='two'></div>",
  initialize: function() {
    this.childView1 = new ChildClickView();
    this.childView2 = new ChildClickView();
    this.on('myEvent', this.afterMyEvent);
  },
  attachTrackedViews: function() {
    this.attachView('one', this.childView1);
    this.attachView('two', this.childView2);
  },
  _activate: function() {
    this.on('myDeactivatableEvent', this.afterMyDeactivatableEvent);
  },
  _deactivate: function() {
    this.off('myDeactivatableEvent');
  },
  myClick: _.noop,
  afterMyEvent: _.noop,
  afterMyDeactivatableEvent: _.noop
});

spyOnBackbone(ParentClickView, 'myClick');
spyOnBackbone(ParentClickView, 'afterMyEvent');
spyOnBackbone(ParentClickView, 'afterMyDeactivatableEvent');
module.exports = ParentClickView;