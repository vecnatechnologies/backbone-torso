var transitionableChildViewGenerator = require('./transitionableChildViewGenerator');

/**
 * Creates a parent view with two children views
 * @param window {window} the window object
 * @param ChildView1 {View} the class for the first child view
 * @param ChildView2 {View} the class for the second child view
 */
module.exports = function(window) {
  var _ = window._,
      ChildView = transitionableChildViewGenerator(window);
  var ParentView = window.Torso.View.extend({
    template: "<div class='parent'>test</div><div inject='current'></div>",
    initialize: function(args) {
      args = args || {};
      this.transitionTime = args.transitionTime || 500;
      args.numberOfChildren = args.numberOfChildren || 3;
      this.myChildViews = [];
      _.times(args.numberOfChildren, function(i) {
        this.myChildViews.push(new ChildView({index: i}));
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
  return ParentView;
};
