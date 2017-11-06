var $ = require('jquery');
var _ = require('underscore');
var TorsoView = require('../../modules/View');

var ChildView = TorsoView.extend({
  className: 'child'
});

describe('A View when using injectionSites', function() {

  it('can add child view to injection site directly', function() {
    var child = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: child
      },
      template: '<div inject="foo"></div>'
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
  });

  it('can add child view to injection site by name', function() {
    var child = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: 'childView'
      },
      template: '<div inject="foo"></div>',
      initialize: function() {
        this.childView = child;
      }
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
  });

  it('can add child view to injection site by config', function() {
    var child = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: {
          view: child
        }
      },
      template: '<div inject="foo"></div>'
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
  });

  it('can add child view to injection site by function', function() {
    var child = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: function () {
          return child;
        }
      },
      template: '<div inject="foo"></div>'
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
  });

  it('can add child view to injection site by function with proper context', function() {
    var child = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: function () {
          return this.childView;
        }
      },
      template: '<div inject="foo"></div>',
      initialize: function() {
        this.childView = child;
      }
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
  });

  it('can add multiple child views to injection sites', function() {
    var fooView = new ChildView();
    var barView = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: fooView,
        bar: barView
      },
      template: '<div inject="foo"></div><div inject="bar"></div>'
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(2);
  });

  it('can add also use attachTrackedViews', function() {
    var fooView = new ChildView();
    var barView = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: fooView
      },
      template: '<div inject="foo"></div><div inject="bar"></div>',
      attachTrackedViews: function() {
        this.attachView('bar', barView);
      },
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(2);
  });

  it('can pass in options', function() {
    var fooView = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: {
          view: fooView,
          options: { shared: true }
        }
      },
      template: '<div inject="foo"></div>'
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
    expect(parentView.getTrackedViews({shared: true}).length).toBe(1);
  });

  it('can use a function to create config', function() {
    var fooView = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: function() {
          return {
            view: function() {
              return this.fooView;
            },
            options: { shared: true }
          };
        }
      },
      template: '<div inject="foo"></div>',
      initialize: function() {
        this.fooView = fooView;
      }
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
    expect(parentView.getTrackedViews({shared: true}).length).toBe(1);
  });

  it('can add hide views using set(\'hide:...\')', function() {
    var child = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: child
      },
      template: '<div inject="foo"></div>'
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
    parentView.set('hide:foo', true);
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(0);
    parentView.set('hide:foo', false);
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
  });

  it('can rerender when using set(\'hide:...\')', function() {
    var child = new ChildView();
    var ParentView = TorsoView.extend({
      injectionSites: {
        foo: child
      },
      template: '<div inject="foo"></div>'
    });
    var parentView = new ParentView();
    parentView.render();
    expect(parentView.$el.find('.child').length).toBe(1);
    parentView.set('hide:foo', true);
    expect(parentView.$el.find('.child').length).toBe(0);
    parentView.set('hide:foo', false);
    expect(parentView.$el.find('.child').length).toBe(1);
  });
});