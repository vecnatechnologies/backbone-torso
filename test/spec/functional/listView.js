var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A List View', function() {

  var env, _, $, Handlebars, View, ListView, Collection, Model, MyListView, MyCollection,
      ItemView, myCollection, myListView, templateRenderer;

  beforeEach(function(done) {
    jasmine.clock().install();
    require('./clientEnv')().done(function(environment) {
      env = environment;
      $ = env.window.$;
      _ = env.window._;
      Handlebars = env.window.Handlebars;
      ListView = env.window.Torso.ListView;
      View = env.window.Torso.View;
      Collection = env.window.Torso.Collection;
      Model = env.window.Torso.Model;
      templateRenderer = env.window.Torso.Utils.templateRenderer;
      MyListView = ListView.extend({
        className: 'list'
      });
      spyOnBackbone(MyListView, 'render');
      MyCollection = Collection.extend({
        model: Model
      });
      ItemView = View.extend({
        events: {
          'click div.item-details': 'myClick'
        },
        template: Handlebars.compile('<div class="item-details">{{model.cid}}</div>'),
        initialize: function(args) {
          this.model = args.item;
          this.render();
        },
        prepare: function() {
          return {model: this.model};
        },
        className: 'item',
        render: function() {
          this.templateRender(this.$el, this.template, this.prepare());
        },
        myClick: _.noop
      });
      spyOnBackbone(ItemView, 'myClick');
      myCollection = new MyCollection();
      myListView = new MyListView({
        collection: myCollection,
        childModel: 'item',
        childView: ItemView
      });
      myListView.render();
      done();
    });
  });

  afterEach(function() {
    myListView.dispose();
  });

  it('can be iniatialized correctly', function() {
    expect(myListView).toBeDefined();
    expect(myListView.collection).toBeDefined();
    // _collection also exists....
    expect(myListView.modelsToRender().length).toBe(0);
  });

  it('can have child views added via a collection', function() {
    expect(myListView.modelsToRender().length).toBe(0);
    var model = new Model();
    myCollection.add(model);
    expect(myListView.modelsToRender().length).toBe(1);
    expect(myListView.getChildViewFromModel(model)).toBeDefined();
    expect(myListView.$el.find('div.item').length).toBe(1);
    expect(myListView.$el.find('div.item-details').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
    expect(myListView.getChildViewFromModel(model).model.cid).toBe(model.cid);
    var model2 = new Model();
    myCollection.add(model2);
    expect(myListView.modelsToRender().length).toBe(2);
    expect(myListView.getChildViewFromModel(model2)).toBeDefined();
    expect(myListView.$el.find('div.item').length).toBe(2);
    expect(myListView.$el.find('div.item-details').length).toBe(2);
    expect(myListView.$el.find('div').length).toBe(4);
    expect(myListView.getChildViewFromModel(model2).model.cid).toBe(model2.cid);
    expect($(_.first(myListView.$el.children())).html()).toBe(myListView.getChildViewFromModel(model).$el.html());
    expect($(_.first(myListView.$el.children())).is(myListView.getChildViewFromModel(model).$el)).toBe(true);
    expect(_.first(myListView.$el.children())).toBe(myListView.getChildViewFromModel(model).el);
    expect(_.last(myListView.$el.children())).toBe(myListView.getChildViewFromModel(model2).el);
  });

  it('can have a child view removed via a collection', function() {
    var model = new Model();
    myCollection.add(model);
    var model2 = new Model();
    myCollection.add(model2);
    var itemView2 = myListView.getChildViewFromModel(model2);
    myCollection.remove(model2);
    expect(myListView.modelsToRender().length).toBe(1);
    expect(myListView.getChildViewFromModel(model)).toBeDefined();
    expect(myListView.$el.find('div.item').length).toBe(1);
    expect(myListView.$el.find('div.item-details').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
    expect(myListView.getChildViewFromModel(model).model.cid).toBe(model.cid);
    expect(itemView2.isDisposed()).toBe(true);
  });

  it('can render an empty template when no children are present', function() {
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      childModel: 'item',
      childView: ItemView,
      emptyTemplate: Handlebars.compile('<div class="empty-list"></div>')
    });
    myListView.attach($('body'));
    expect(myListView.$el.find('div.empty-list').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(1);
    var model = new Model();
    myCollection.add(model);
    expect(myListView.$el.find('div.item').length).toBe(1);
    expect(myListView.$el.find('div.item-details').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
    myCollection.remove(model);
    expect(myListView.$el.find('div.empty-list').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(1);
  });

  it('can render an empty template and a "has-children" template', function() {
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      childModel: 'item',
      childView: ItemView,
      emptyTemplate: Handlebars.compile('<div class="empty-list"></div>'),
      template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
      childrenContainer: 'children'
    });
    myListView.attach($('body'));
    // Does empty template affect the injection site or the list view?
    expect(myListView.$el.find('div.empty-list').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
    var model = new Model();
    myCollection.add(model);
    expect(myListView.$el.find('div.templated-list').length).toBe(1);
    expect(myListView.$el.find('[inject="children"]').length).toBe(0);
    expect(myListView.$el.find('div.item').length).toBe(1);
    expect(myListView.$el.find('div.item-details').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(3);
    myCollection.remove(model);
    expect(myListView.$el.find('div.empty-list').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
  });

  it('can render using a template', function() {
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      childModel: 'item',
      childView: ItemView,
      template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
      childrenContainer: 'children'
    });
    myListView.attach($('body'));
    expect(myListView.$el.find('div.templated-list').length).toBe(1);
    expect(myListView.$el.find('[inject="children"]').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
    var model = new Model();
    myCollection.add(model);
    expect(myListView.$el.find('div.templated-list').length).toBe(1);
    expect(myListView.$el.find('[inject="children"]').length).toBe(0);
    expect(myListView.$el.find('div.item').length).toBe(1);
    expect(myListView.$el.find('div.item-details').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(3);
    myCollection.remove(model);
    expect(myListView.$el.find('div.templated-list').length).toBe(1);
    expect(myListView.$el.find('[inject="children"]').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
  });

  it('can render child views with specialized prepare content', function() {
    ItemView.prototype.initialize = function(args) {
      this.context = args.context;
      this.model = args.item;
    };
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      childModel: 'item',
      childView: ItemView,
      childContext: {
        data: 4
      }
    });
    myListView.render();
    var model = new Model();
    myCollection.add(model);
    expect(myListView.getChildViewFromModel(model).context.data).toBe(4);
    myListView = new MyListView({
      collection: myCollection,
      childModel: 'item',
      childView: ItemView,
      childContext: function() {
        return {
          data: 4
        };
      }
    });
    expect(myListView.getChildViewFromModel(model).context.data).toBe(4);
  });

  it('can trigger an event when a child view is removed', function(done) {
    var model = new Model();
    myCollection.add(model);
    var childView = myListView.getChildViewFromModel(model);
    myListView.on('child-view-removed', function(data) {
      expect(data.model.cid).toBe(model.cid);
      expect(data.view.cid).toBe(childView.cid);
      expect(childView.isDisposed()).toBe(true);
      done();
    });
    myCollection.remove(model);
  });

  it('can trigger an event when a child view is added', function(done) {
    var model = new Model();
    myListView.on('child-view-added', function(data) {
      expect(data.model.cid).toBe(model.cid);
      expect(data.view.cid).toBe(myListView.getChildViewFromModel(model).cid);
      done();
    });
    myCollection.add(model);
  });

  it('can reorder child views when the collection order changes', function() {
    var model = new Model({order: 3});
    myCollection.add(model);
    var model2 = new Model({order: 2});
    myCollection.add(model2);
    var model3 = new Model({order: 1});
    myCollection.add(model3);
    expect(myListView.$el.find('div.item').length).toBe(3);
    expect(_.first(myListView.$el.children())).toBe(myListView.getChildViewFromModel(model).el);
    expect(_.last(myListView.$el.children())).toBe(myListView.getChildViewFromModel(model3).el);
    myCollection.comparator = 'order';
    myCollection.sort();
    expect(_.first(myListView.$el.children())).toBe(myListView.getChildViewFromModel(model3).el);
    expect(_.last(myListView.$el.children())).toBe(myListView.getChildViewFromModel(model).el);
  });

  it('can sort a large list in a reasonable time', function() {
    var startTime, endTime, i,
        numberOfViews = 1000,
        threshold = 500;
    for (i = 0; i < numberOfViews; i++) {
      myCollection.add(new Model({order: numberOfViews - i}), {silent: true});
    }
    myListView.__createChildViews();
    myListView.render();
    myCollection.comparator = 'order';
    startTime = new Date().getTime();
    myCollection.sort();
    endTime = new Date().getTime() - startTime;
    expect(myListView.getChildViewFromModel(myCollection.at(0)).el).toBe(_.first(myListView.$el.find('div.item')));
    console.log('Sorted ' + numberOfViews + ' views in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
  });

  it('can add views in a reasonable time', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 100,
        threshold = 300,
        renderWait = 50;
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      childModel: 'item',
      childView: ItemView,
      renderWait: renderWait
    });
    for (i = 0; i < numberOfViews; i++) {
      models.push(new Model())
    }
    startTime = new Date().getTime();
    for (i = 0; i < numberOfViews; i++) {
      myCollection.add(models[i]);
    }
    endTime = new Date().getTime() - startTime;
    expect(myListView.getChildViews().length).toBe(numberOfViews);
    console.log('Added ' + numberOfViews + ' views in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
    jasmine.clock().tick(myListView._renderWait);
  });

  it('can add view to a large list in a reasonable time', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 1000,
        threshold = 20;
    for (i = 0; i < numberOfViews; i++) {
       models.push(new Model())
    }
    myCollection.reset(models);
    var newModel = new Model();
    startTime = new Date().getTime();
    myCollection.add(newModel);
    expect(myListView.getChildViewFromModel(newModel)).toBeDefined();
    endTime = new Date().getTime() - startTime;
    console.log('Added one view to ' + numberOfViews + ' views in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
  });

  it('can reset the collection with a large number of models in a reasonable time', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 1000,
        threshold = 300;
    for (i = 0; i < numberOfViews; i++) {
       models.push(new Model())
    }
    // do a reset first to generate all the views.
    myCollection.reset(models);
    startTime = new Date().getTime();
    myCollection.reset(models);
    endTime = new Date().getTime() - startTime;
    var newModel = new Model();
    console.log('Reset ' + numberOfViews + ' views in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
  });

  it('can reset a collection with a large number of models many times in a reasonable time', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 1000,
        numberOfTimes = 50,
        threshold = 500,
        renderWait = 50;
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      childModel: 'item',
      childView: ItemView,
      renderWait: renderWait
    });
    for (i = 0; i < numberOfViews; i++) {
       models.push(new Model())
    }
    // do a reset first to generate all the views.
    myCollection.reset(models);
    startTime = new Date().getTime();
    for (i = 0; i < numberOfTimes; i++) {
      myCollection.reset(models);
    }
    endTime = new Date().getTime() - startTime;
    var newModel = new Model();
    console.log('Reset ' + numberOfViews + ' views ' + numberOfTimes + ' times in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
  });

  /**
   * Skipping until jsdom adds setSelectionRange: https://github.com/tmpvar/jsdom/pull/804
   */
  xit('can keep position of carat', function() {
    ItemView.prototype.template = Handlebars.compile('<input type="text" value="123"/>');
    var model = new Model();
    myCollection.add(model);
    var view = myListView.getChildViewFromModel(model);
    var input = view.$el.find('input')[0];
    templateRenderer.setCaretPosition(input, 1);
    expect(templateRenderer.getCaretPosition(input)).toBe(1);
    myListView.render();
    expect(templateRenderer.getCaretPosition(view.$el.find('input')[0])).toBe(1);
  });

  it('can call a delayed render and then add a child view to break the delay', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 20,
        numberOfTimes = 50,
        threshold = 500,
        renderWait = 500;
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      childModel: 'item',
      childView: ItemView,
      renderWait: renderWait,
      emptyTemplate: Handlebars.compile('<div class="empty-list"></div>'),
      template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
      childrenContainer: 'children'
    });
    myListView.attach($('body'));
    for (i = 0; i < numberOfViews; i++) {
       models.push(new Model())
    }
    myCollection.reset(models);
    expect(myListView.$el.find('div.empty-list').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
    var model = new Model();
    myCollection.add(model);
    expect(myListView.$el.find('div.empty-list').length).toBe(0);
    expect(myListView.$el.find('div.templated-list').length).toBe(1);
    expect(myListView.$el.find('[inject="children"]').length).toBe(0);
    expect(myListView.$el.find('div.item').length).toBe(numberOfViews + 1);
    expect(myListView.$el.find('div.item-details').length).toBe(numberOfViews + 1);
  });

  it('has children views that it can add and have them still react to DOM events', function() {
    var model = new Model();
    myCollection.add(model);
    var itemView = myListView.getChildViewFromModel(model);
    itemView.$el.find('div.item-details').click().change();
    expect(itemView.myClick.calls.count()).toBe(1);
  });

  it('has children views that it can sort and have them still react to DOM events', function() {
    var model = new Model({order: 3});
    myCollection.add(model);
    var model2 = new Model({order: 2});
    myCollection.add(model2);
    var model3 = new Model({order: 1});
    myCollection.add(model3);
    myCollection.comparator = 'order';
    myCollection.sort();
    var itemView = myListView.getChildViewFromModel(model);
    itemView.$el.find('div.item-details').click().change();
    expect(itemView.myClick.calls.count()).toBe(1);
  });

  it('has children views that it can refresh and not need to render', function() {
    var model = new Model();
    myCollection.add(model);
    var model2 = new Model();
    myCollection.add(model2);
    var renderCount = myListView.render.calls.count();
    myListView.renderChildViews();
    expect(myListView.render.calls.count()).toBe(renderCount);
  });
});
