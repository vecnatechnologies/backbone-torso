var TransitionableChildView = require('./TransitionableChildView');
var TorsoView = require('../../../modules/View');
var _ = require('underscore');

module.exports = ParentView = TorsoView.extend({
  template: "<div class='parent'>test</div><div inject='current'></div>",
  initialize: function(args) {
    args = args || {};
    this.transitionTime = args.transitionTime || 500;
    args.numberOfChildren = args.numberOfChildren || 3;
    this.myChildViews = [];
    _.times(args.numberOfChildren, function(i) {
      this.myChildViews.push(new TransitionableChildView({index: i}));
    }, this);
    this.listenTo(this.viewState, 'change:current', this.render);
    this.set('current', 0);
  },
  attachTrackedViews: function() {
    this.transitionPromise = this.attachView('current', this.getCurrentView(), {
      useTransition: true,
      transitionTime: 500
    });
  },
  setCurrentView: function(view) {
    this.set('current', this.myChildViews.indexOf(view));
  },
  getCurrentView: function() {
    return this.myChildViews[this.get('current')];
  }
});