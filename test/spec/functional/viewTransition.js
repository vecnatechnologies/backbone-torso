var testSrcPath = '../../source';

describe('A View that can transition in tracked views', function() {

  beforeEach(function(done) {
    var test = this;
    require('./clientEnv')().done(function(environment) {
      test.env = environment;
      test.$ = test.env.window.$;
      test._ = test.env.window._;
      test.ParentView = require(testSrcPath + '/transitionUsingParentViewGenerator')(test.env.window);
      test.$('body').append('<div class="app"></div>');
      done();
    });
  });

  it('can transition in the first view into an injection site', function(done) {
    var parentView = new this.ParentView(),
      test = this;
    parentView.render();
    expect(parentView.$el).toBeDefined();
    parentView.transitionPromise.done(function() {
      var childViewDom = parentView.$el.find('.transition-child');
      expect(test._.size(childViewDom)).toBe(1);
      expect(childViewDom.html()).toBe('0');
      expect(parentView.getCurrentView().get('index')).toBe(0);
      expect(parentView.getCurrentView().get('transitioning-in')).toBe(false);
      done();
    });
    var childViewDom = parentView.$el.find('.transition-child');
    expect(test._.size(childViewDom)).toBe(0);
    expect(parentView.getCurrentView().get('index')).toBe(0);
    expect(parentView.getCurrentView().get('transitioning-in')).toBe(true);
  });

  it('can transition in a new view into an injection site with a previous view already there', function(done) {
    var parentView = new this.ParentView(),
      test = this;
    parentView.render();
    parentView.transitionPromise.done(function() {
      parentView.set('current', 1);
      parentView.transitionPromise.done(function() {
        var childViewDom = parentView.$el.find('.transition-child');
        expect(test._.size(childViewDom)).toBe(1);
        expect(childViewDom.html()).toBe('1');
        expect(parentView.getCurrentView().get('index')).toBe(1);
        expect(parentView.getCurrentView().get('transitioning-in')).toBe(false);
        expect(parentView.myChildViews[0].get('transitioning-out')).toBe(false);
        done();
      });
      var childViewDom = parentView.$el.find('.transition-child');
      expect(test._.size(childViewDom)).toBe(1);
      expect(childViewDom.html()).toBe('0');
      expect(parentView.getCurrentView().get('index')).toBe(1);
      expect(parentView.getCurrentView().get('transitioning-in')).toBe(true);
      expect(parentView.myChildViews[0].get('transitioning-out')).toBe(true);
    });
  });
});