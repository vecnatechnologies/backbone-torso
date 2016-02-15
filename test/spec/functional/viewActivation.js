// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A View being deactivated and activated', function() {

  var env, $, ClickView, ParentView;

  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      $ = env.window.$;
      ClickView = require(testSrcPath + '/clickViewGenerator')(env.window);
      ParentView = require(testSrcPath + '/parentClickViewGenerator')(env.window);
      $('body').append('<div class="app"></div>');
      done();
    });
  });

  it('can be deactivated correctly', function() {
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    expect(view.isActive()).toBe(true);
    view.attach($('div.app'));
    expect(view.isActive()).toBe(true);
    view.deactivate();
    expect(view.isActive()).toBe(false);
    expect($('div.app').length).toBe(0);
    expect($('div.click').length).toBe(1);
    expect(view.$el).toBeDefined();
    $('div.app').append('<div>Dont trigger event!</div>');
    expect(view.myClick).not.toHaveBeenCalled();
    $('div').click().change();
    expect(view.myClick).toHaveBeenCalled();
    expect(view.afterMyEvent).not.toHaveBeenCalled();
    view.trigger('myEvent');
    expect(view.afterMyEvent).toHaveBeenCalled();
    expect(view.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    view.trigger('myDeactivatableEvent');
    expect(view.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    view.dispose();
  });

  it('can be activated correctly', function() {
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    expect(view.isActive()).toBe(true);
    view.attach($('div.app'));
    expect(view.isActive()).toBe(true);
    expect($('div.app').length).toBe(0);
    expect($('div.click').length).toBe(1);
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

  it('can be deactivated correctly with child views', function() {
    var view = new ParentView();
    var childView1 = view.childView1;
    var childView2 = view.childView2;
    expect(view.$el).toBeDefined();
    expect(childView1.$el).toBeDefined();
    expect(childView2.$el).toBeDefined();
    view.attach($('div.app'));
    view.deactivate();
    expect($('div.parent').length).toBe(1);
    expect($('div.app').length).toBe(0);
    expect(view.$el).toBeDefined();
    $('div.app').append('<div class="parent child">Dont trigger event!</div>');

    expect(view.myClick).not.toHaveBeenCalled();
    expect(childView1.myClick).not.toHaveBeenCalled();
    expect(childView2.myClick).not.toHaveBeenCalled();
    $('div').click().change();
    expect(view.myClick).toHaveBeenCalled();
    expect(childView1.myClick).toHaveBeenCalled();
    expect(childView2.myClick).toHaveBeenCalled();

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
    expect(view.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();

    childView1.trigger('myDeactivatableEvent');
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();

    view.dispose();
  });

  it('can be activated correctly with child views', function() {
    var view = new ParentView();
    var childView1 = view.childView1;
    var childView2 = view.childView2;
    expect(view.$el).toBeDefined();
    expect(childView1.$el).toBeDefined();
    expect(childView2.$el).toBeDefined();
    view.attach($('div.app'));
    expect($('div.parent').length).toBe(1);
    expect($('div.app').length).toBe(0);
    expect(view.$el).toBeDefined();
    $('div.app').append('<div class="parent child">Dont trigger event!</div>');

    expect(view.myClick).not.toHaveBeenCalled();
    expect(childView1.myClick).not.toHaveBeenCalled();
    expect(childView2.myClick).not.toHaveBeenCalled();
    $('div').click().change();
    expect(view.myClick).toHaveBeenCalled();
    expect(childView1.myClick).toHaveBeenCalled();
    expect(childView2.myClick).toHaveBeenCalled();

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
    expect(childView1.afterMyDeactivatableEvent).toHaveBeenCalled();
    expect(childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();

    view.dispose();
  });
});
