var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A View being deactivated and activated', function() {

  var env, _, $, View;

  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      $ = env.window.$;
      _ = env.window._;
      View = env.window.Torso.Views.View;
      done();
    });
  });

  var setUpView = function() {
    var ClickView = View.extend({
      events: {
        'click div' : 'myClick'
      },
      render: function() {
        this.$el.html("<div>test</div>");
      },
      activate: function() {
        View.prototype.activate.call(this);
        this.on('myEvent', this.afterMyEvent);
        this.on('myDeactivatableEvent', this.afterMyDeactivatableEvent);
      },
      deactivate: function() {
        View.prototype.deactivate.call(this);
        this.off('myDeactivatableEvent');
      },
      myClick: function() {
        //do nothing
      },
      afterMyEvent: function() {
        //do nothing
      },
      afterMyDeactivatableEvent: function() {
        //do nothing
      }
    });

    spyOnBackbone(ClickView, 'myClick');
    spyOnBackbone(ClickView, 'afterMyEvent');
    spyOnBackbone(ClickView, 'afterMyDeactivatableEvent');
    return ClickView;
  };

  var createChildView = function() {
    var ChildView = setUpView().extend({
      events: {
        'click div.child' : 'myClick' 
      },
      render: function() {
        this.$el.html("<div class='child'>test</div>");
      },
    });
    return ChildView;
  };

  var setUpParentView = function(ChildView1, ChildView2) {
    var ParentView = View.extend({
      events: {
        'click div.parent' : 'myClick' 
      },
      render: function() {
        this.$el.html("<div class='parent'>test</div><div inject='one'></div><div inject='two'></div>");
        this.injectView('one', this.childView1);
        this.injectView('two', this.childView2);
      },
      initialize: function() {
        this.super();
        this.childView1 = new ChildView1();
        this.childView2 = new ChildView2();
        this.render();
        this.activate();
      },
      activate: function() {
        View.prototype.activate.call(this);
        this.on('myEvent', this.afterMyEvent);
        this.on('myDeactivatableEvent', this.afterMyDeactivatableEvent);
      },
      deactivate: function() {
        View.prototype.deactivate.call(this);
        this.off('myDeactivatableEvent');
      },
      activateChildViews: function() {
        this.childView1.activate();
        this.childView2.activate();
      },
      deactivateChildViews: function() {
        this.childView1.deactivate();
        this.childView2.deactivate();
      },
      cleanupChildViews: function() {
        this.childView1.dispose();
        this.childView2.dispose();
      },
      myClick: function() {
        //do nothing
      },
      afterMyEvent: function() {
        //do nothing
      },
      afterMyDeactivatableEvent: function() {
        //do nothing
      }
    });

    spyOnBackbone(ParentView, 'myClick');
    spyOnBackbone(ParentView, 'afterMyEvent');
    spyOnBackbone(ParentView, 'afterMyDeactivatableEvent');
    return ParentView;
  };


  it('can be iniatialized correctly', function() {
    var ClickView = setUpView();
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    $('body').html(view.$el);
    expect(view.myClick).not.toHaveBeenCalled();
    view.$el.find('div').click().change();
    expect(view.myClick).toHaveBeenCalled();
    expect(view.afterMyEvent).not.toHaveBeenCalled();
    view.trigger('myEvent');
    expect(view.afterMyEvent).toHaveBeenCalled();
    view.dispose();
  });

  it('can be attached correctly', function() {
    var ClickView = setUpView();
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    $('body').html(view.$el);
    view.detach();
    expect($('body').find('div').length).toBe(0);
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
    expect(view.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    view.dispose();
  });

  it('can be detached correctly', function() {
    var ClickView = setUpView();
    var view = new ClickView();
    expect(view.$el).toBeDefined();
    $('body').html(view.$el);
    view.detach();
    view.attach($('body'));
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
    var ParentView = setUpParentView(createChildView(), createChildView());
    var view = new ParentView();
    var childView1 = view.childView1;
    var childView2 = view.childView2;
    expect(view.$el).toBeDefined();
    expect(childView1.$el).toBeDefined();
    expect(childView2.$el).toBeDefined();
    $('body').html(view.$el);

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

  it('can be detached correctly with child views', function() {
    var ParentView = setUpParentView(createChildView(), createChildView());
    var view = new ParentView();
    var childView1 = view.childView1;
    var childView2 = view.childView2;
    expect(view.$el).toBeDefined();
    expect(childView1.$el).toBeDefined();
    expect(childView2.$el).toBeDefined();
    $('body').html(view.$el);
    view.detach();
    expect($('body').find('div').length).toBe(0);
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


  });
});
