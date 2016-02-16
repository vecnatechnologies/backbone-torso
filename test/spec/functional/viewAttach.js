var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A View being detached and attached', function() {

  var env, $, ClickView, ParentView, Handlebars;

  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      $ = env.window.$;
      Handlebars = env.window.Handlebars;
      ClickView = require(testSrcPath + '/clickViewGenerator')(env.window);
      ParentView = require(testSrcPath + '/parentClickViewGenerator')(env.window);
      $('body').append('<div class="app"></div>');
      done();
    });
  });

  it('can be iniatialized correctly', function() {
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    view.attach($('div.app'));
    expect(view.myClick).not.toHaveBeenCalled();
    view.$el.find('div').click().change();
    expect(view.myClick).toHaveBeenCalled();
    expect(view.afterMyEvent).not.toHaveBeenCalled();
    view.trigger('myEvent');
    expect(view.afterMyEvent).toHaveBeenCalled();
    view.dispose();
  });

  it('can be attached correctly', function() {
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    view.attach($('div.app'));
    expect(view.myClick).not.toHaveBeenCalled();
    view.$el.find('div').click().change();
    expect(view.myClick).toHaveBeenCalled();
    expect(view.afterMyEvent).not.toHaveBeenCalled();
    view.trigger('myEvent');
    expect(view.afterMyEvent).toHaveBeenCalled();
    expect(view.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    view.trigger('myDeactivatableEvent');
    expect(view.afterMyDeactivatableEvent).toHaveBeenCalled();
    view.dispose();
  });

  it('can be detached correctly', function() {
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    view.attach($('div.app'));
    view.detach();
    expect($('div.click').length).toBe(0);
    expect($('div.app').length).toBe(1);
    expect(view.$el).toBeDefined();
    $('body').append('<div>Dont trigger event!</div>');
    expect(view.myClick).not.toHaveBeenCalled();
    $('div').click().change();
    expect(view.myClick).not.toHaveBeenCalled();
    expect(view.afterMyEvent).not.toHaveBeenCalled();
    view.trigger('myEvent');
    expect(view.afterMyEvent).toHaveBeenCalled();
    expect(view.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    view.trigger('myDeactivatableEvent');
    expect(view.afterMyDeactivatableEvent).toHaveBeenCalled();
    view.dispose();
  });

  it('can be initialized correctly with child views', function() {
    var view = new ParentView();
    var childView1 = view.childView1;
    var childView2 = view.childView2;
    expect(view.$el).toBeDefined();
    expect(childView1.$el).toBeDefined();
    expect(childView2.$el).toBeDefined();
    view.attach($('div.app'));

    expect(view.myClick).not.toHaveBeenCalled();
    expect(childView1.myClick).not.toHaveBeenCalled();
    expect(childView2.myClick).not.toHaveBeenCalled();
    view.$el.find('div.parent').click().change();
    expect(view.myClick).toHaveBeenCalled();
    expect(childView1.myClick).not.toHaveBeenCalled();
    expect(childView2.myClick).not.toHaveBeenCalled();

    childView1.$el.find('div.child').click().change();
    expect(view.myClick.calls.count()).toBe(1);
    expect(childView1.myClick).toHaveBeenCalled();
    expect(childView2.myClick).not.toHaveBeenCalled();

    expect(view.afterMyEvent).not.toHaveBeenCalled();
    expect(childView1.afterMyEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyEvent).not.toHaveBeenCalled();
    view.trigger('myEvent');
    expect(view.afterMyEvent).toHaveBeenCalled();
    expect(view.afterMyEvent.calls.count()).toBe(1);
    expect(childView1.afterMyEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyEvent).not.toHaveBeenCalled();
    childView1.trigger('myEvent');
    expect(view.afterMyEvent.calls.count()).toBe(1);
    expect(childView1.afterMyEvent).toHaveBeenCalled();
    expect(childView2.afterMyEvent).not.toHaveBeenCalled();

    expect(view.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    view.trigger('myDeactivatableEvent');
    expect(view.afterMyDeactivatableEvent).toHaveBeenCalled();
    expect(childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    childView1.trigger('myDeactivatableEvent');
    expect(view.afterMyDeactivatableEvent.calls.count()).toBe(1);
    expect(childView1.afterMyDeactivatableEvent).toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();

    view.dispose();
  });

  it('can be detached correctly with child views', function() {
    var view = new ParentView();
    var childView1 = view.childView1;
    var childView2 = view.childView2;
    expect(view.$el).toBeDefined();
    expect(childView1.$el).toBeDefined();
    expect(childView2.$el).toBeDefined();
    view.attach($('div.app'));
    view.detach();
    expect($('div.app').length).toBe(1);
    expect($('div.click').length).toBe(0);
    expect(view.$el).toBeDefined();
    $('body').append('<div class="parent child">Dont trigger event!</div>');

    expect(view.myClick).not.toHaveBeenCalled();
    expect(childView1.myClick).not.toHaveBeenCalled();
    expect(childView2.myClick).not.toHaveBeenCalled();
    $('div').click().change();
    expect(view.myClick).not.toHaveBeenCalled();
    expect(childView1.myClick).not.toHaveBeenCalled();
    expect(childView2.myClick).not.toHaveBeenCalled();

    expect(view.afterMyEvent).not.toHaveBeenCalled();
    expect(childView1.afterMyEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyEvent).not.toHaveBeenCalled();
    view.trigger('myEvent');
    expect(view.afterMyEvent).toHaveBeenCalled();
    expect(childView1.afterMyEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyEvent).not.toHaveBeenCalled();

    childView1.trigger('myEvent');
    expect(view.afterMyEvent.calls.count()).toBe(1);
    expect(childView1.afterMyEvent).toHaveBeenCalled();
    expect(childView2.afterMyEvent).not.toHaveBeenCalled();

    expect(view.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    view.trigger('myDeactivatableEvent');
    expect(view.afterMyDeactivatableEvent).toHaveBeenCalled();
    expect(childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();

    childView1.trigger('myDeactivatableEvent');
    expect(view.afterMyDeactivatableEvent.calls.count()).toBe(1);
    expect(childView1.afterMyDeactivatableEvent).toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();

    view.dispose();
  });

  it('can attach and detach a view correctly', function() {
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    view.attach($('div.app'));
    expect($('div.click').length).toBe(1);
    expect($('div.app').length).toBe(0);
    view.detach();
    expect($('div.click').length).toBe(0);
    expect($('div.app').length).toBe(1);
  });

  it('can inject subviews multiple times', function() {
    var view = new ParentView();
    var childView1 = view.childView1;
    var childView2 = view.childView2;
    expect(view.isAttachedToParent()).toBe(false);
    expect(childView1.isAttachedToParent()).toBe(false);
    expect(childView2.isAttachedToParent()).toBe(false);
    view.attach($('div.app'));
    expect(view.isAttachedToParent()).toBe(true);
    expect(childView1.isAttachedToParent()).toBe(true);
    expect(childView2.isAttachedToParent()).toBe(true);
    view.template = Handlebars.compile("<div class='parent'>test</div><div inject='one'></div><div inject='two'></div>");
    view.prepare = function() {return {};};
    view.attachTrackedViews = function() {
      this.attachView('one', this.childView1);
      this.attachView('two', this.childView2);
    };
    view.render();
    expect($('div.child').length).toBe(2);
    expect($('div[inject]').length).toBe(0);
    view.render();
    expect($('div.child').length).toBe(2);
    expect($('div[inject]').length).toBe(0);
    childView1.detach();
    expect($('div.child').length).toBe(1);
    expect($('div[inject]').length).toBe(1);
    view.render();
    expect($('div.child').length).toBe(2);
    expect($('div[inject]').length).toBe(0);
  });
});
