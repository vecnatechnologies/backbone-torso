// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A List View', function() {

  var env, _, $, Handlebars, View, ListView, Collection, Model, MyListView, MyCollection,
      ItemView, myCollection, myListView, templateRenderer;

  beforeEach(function(done) {
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
        modelName: 'item',
        itemView: ItemView
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

  it('can have item views added via a collection', function() {
    expect(myListView.modelsToRender().length).toBe(0);
    var model = new Model();
    myCollection.add(model);
    expect(myListView.modelsToRender().length).toBe(1);
    expect(myListView.getItemViewFromModel(model)).toBeDefined();
    expect(myListView.$el.find('div.item').length).toBe(1);
    expect(myListView.$el.find('div.item-details').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
    expect(myListView.getItemViewFromModel(model).model.cid).toBe(model.cid);
    var model2 = new Model();
    myCollection.add(model2);
    expect(myListView.modelsToRender().length).toBe(2);
    expect(myListView.getItemViewFromModel(model2)).toBeDefined();
    expect(myListView.$el.find('div.item').length).toBe(2);
    expect(myListView.$el.find('div.item-details').length).toBe(2);
    expect(myListView.$el.find('div').length).toBe(4);
    expect(myListView.getItemViewFromModel(model2).model.cid).toBe(model2.cid);
    expect($(_.first(myListView.$el.children())).html()).toBe(myListView.getItemViewFromModel(model).$el.html());
    expect($(_.first(myListView.$el.children())).is(myListView.getItemViewFromModel(model).$el)).toBe(true);
    expect(_.first(myListView.$el.children())).toBe(myListView.getItemViewFromModel(model).el);
    expect(_.last(myListView.$el.children())).toBe(myListView.getItemViewFromModel(model2).el);
  });

  it('can have a item view removed via a collection', function() {
    var model = new Model();
    myCollection.add(model);
    var model2 = new Model();
    myCollection.add(model2);
    var itemView2 = myListView.getItemViewFromModel(model2);
    myCollection.remove(model2);
    expect(myListView.modelsToRender().length).toBe(1);
    expect(myListView.getItemViewFromModel(model)).toBeDefined();
    expect(myListView.$el.find('div.item').length).toBe(1);
    expect(myListView.$el.find('div.item-details').length).toBe(1);
    expect(myListView.$el.find('div').length).toBe(2);
    expect(myListView.getItemViewFromModel(model).model.cid).toBe(model.cid);
    expect(itemView2.isDisposed()).toBe(true);
  });

  it('can render an empty template when no items are present', function() {
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      modelName: 'item',
      itemView: ItemView,
      emptyTemplate: Handlebars.compile('<div class="empty-list"></div>')
    });
    myListView.attachTo($('body'));
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
      modelName: 'item',
      itemView: ItemView,
      emptyTemplate: Handlebars.compile('<div class="empty-list"></div>'),
      template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
      itemContainer: 'children'
    });
    myListView.attachTo($('body'));
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
      modelName: 'item',
      itemView: ItemView,
      template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
      itemContainer: 'children'
    });
    myListView.attachTo($('body'));
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

  it('can render item views with specialized prepare content', function() {
    ItemView.prototype.initialize = function(args) {
      this.context = args.context;
      this.model = args.item;
    };
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      modelName: 'item',
      itemView: ItemView,
      itemContext: {
        data: 4
      }
    });
    myListView.render();
    var model = new Model();
    myCollection.add(model);
    expect(myListView.getItemViewFromModel(model).context.data).toBe(4);
    myListView = new MyListView({
      collection: myCollection,
      modelName: 'item',
      itemView: ItemView,
      itemContext: function() {
        return {
          data: 4
        };
      }
    });
    expect(myListView.getItemViewFromModel(model).context.data).toBe(4);
  });

  it('can trigger an event when a item view is removed', function(done) {
    var model = new Model();
    myCollection.add(model);
    var itemView = myListView.getItemViewFromModel(model);
    myListView.on('item-view-removed', function(data) {
      expect(data.model.cid).toBe(model.cid);
      expect(data.view.cid).toBe(itemView.cid);
      expect(itemView.isDisposed()).toBe(true);
      done();
    });
    myCollection.remove(model);
  });

  it('can trigger an event when a item view is added', function(done) {
    var model = new Model();
    myListView.on('item-view-added', function(data) {
      expect(data.model.cid).toBe(model.cid);
      expect(data.view.cid).toBe(myListView.getItemViewFromModel(model).cid);
      done();
    });
    myCollection.add(model);
  });

  it('can remove stale views during a reset', function(done) {
    var model = new Model();
    myCollection.add(model);
    var itemView = myListView.getItemViewFromModel(model);
    myListView.on('item-view-removed', function(data) {
      expect(data.model.cid).toBe(model.cid);
      expect(data.view.cid).toBe(itemView.cid);
      expect(itemView.isDisposed()).toBe(true);
      done();
    });
    myCollection.reset(new Model());
  });

  it('can reorder item views when the collection order changes', function() {
    var model = new Model({order: 3});
    myCollection.add(model);
    var model2 = new Model({order: 2});
    myCollection.add(model2);
    var model3 = new Model({order: 1});
    myCollection.add(model3);
    expect(myListView.$el.find('div.item').length).toBe(3);
    expect(_.first(myListView.$el.children())).toBe(myListView.getItemViewFromModel(model).el);
    expect(_.last(myListView.$el.children())).toBe(myListView.getItemViewFromModel(model3).el);
    myCollection.comparator = 'order';
    myCollection.sort();
    expect(_.first(myListView.$el.children())).toBe(myListView.getItemViewFromModel(model3).el);
    expect(_.last(myListView.$el.children())).toBe(myListView.getItemViewFromModel(model).el);
  });

  it('can reorder item views when the collection order changes while using a list view item container', function() {
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      modelName: 'item',
      itemView: ItemView,
      emptyTemplate: Handlebars.compile('<div class="empty-list"></div>'),
      template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
      itemContainer: 'children'
    });
    myListView.attachTo($('body'));
    var model = new Model({order: 3});
    myCollection.add(model);
    var model2 = new Model({order: 2});
    myCollection.add(model2);
    var model3 = new Model({order: 1});
    myCollection.add(model3);
    expect(myListView.$el.find('div.item').length).toBe(3);
    expect(_.first(myListView.$el.find('div.item'))).toBe(myListView.getItemViewFromModel(model).el);
    expect(_.last(myListView.$el.find('div.item'))).toBe(myListView.getItemViewFromModel(model3).el);
    myCollection.comparator = 'order';
    myCollection.sort();
    expect(_.first(myListView.$el.find('div.item'))).toBe(myListView.getItemViewFromModel(model3).el);
    expect(_.last(myListView.$el.find('div.item'))).toBe(myListView.getItemViewFromModel(model).el);
  });

  it('can sort a large list in a reasonable time', function() {
    var startTime, endTime, i,
        numberOfViews = 1000,
        threshold = 1000;
    myListView.attachTo($('body'));
    for (i = 0; i < numberOfViews; i++) {
      myCollection.add(new Model({order: numberOfViews - i}), {silent: true});
    }
    myListView.__createItemViews();
    myListView.render();
    myCollection.comparator = 'order';
    startTime = new Date().getTime();
    myCollection.sort();
    endTime = new Date().getTime() - startTime;
    expect(myListView.getItemViewFromModel(myCollection.at(0)).el).toBe(_.first(myListView.$el.find('div.item')));
    console.log('Sorted ' + numberOfViews + ' views in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
    var itemView = myListView.getItemViewFromModel(myCollection.at(0));
    itemView.$el.find('div.item-details').click().change();
    expect(itemView.myClick.calls.count()).toBe(1);
  });

  it('can sort a large list in a reasonable time while using a item container', function() {
    var startTime, endTime, i,
        numberOfViews = 1000,
        threshold = 1000;
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      modelName: 'item',
      itemView: ItemView,
      emptyTemplate: Handlebars.compile('<div class="empty-list"></div>'),
      template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
      itemContainer: 'children'
    });
    myListView.attachTo($('body'));
    for (i = 0; i < numberOfViews; i++) {
      myCollection.add(new Model({order: numberOfViews - i}), {silent: true});
    }
    myListView.__createItemViews();
    myListView.render();
    myCollection.comparator = 'order';
    startTime = new Date().getTime();
    myCollection.sort();
    endTime = new Date().getTime() - startTime;
    expect(myListView.getItemViewFromModel(myCollection.at(0)).el).toBe(_.first(myListView.$el.find('div.item')));
    console.log('Sorted ' + numberOfViews + ' views in a item container in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
    var itemView = myListView.getItemViewFromModel(myCollection.at(0));
    itemView.$el.find('div.item-details').click().change();
    expect(itemView.myClick.calls.count()).toBe(1);
  });

  it('can add views in a reasonable time', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 100,
        threshold = 500;
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      modelName: 'item',
      itemView: ItemView
    });
    myListView.attachTo($('body'));
    for (i = 0; i < numberOfViews; i++) {
      models.push(new Model())
    }
    startTime = new Date().getTime();
    for (i = 0; i < numberOfViews; i++) {
      myCollection.add(models[i]);
    }
    endTime = new Date().getTime() - startTime;
    expect(myListView.getItemViews().length).toBe(numberOfViews);
    console.log('Added ' + numberOfViews + ' views in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
  });

  it('can add view to a large list in a reasonable time', function() {
    myListView.attachTo($('body'));
    var startTime, endTime, i,
        models = [],
        numberOfViews = 1000,
        threshold = 25;
    for (i = 0; i < numberOfViews; i++) {
       models.push(new Model())
    }
    myCollection.reset(models);
    var newModel = new Model();
    startTime = new Date().getTime();
    myCollection.add(newModel);
    expect(myListView.getItemViewFromModel(newModel)).toBeDefined();
    endTime = new Date().getTime() - startTime;
    console.log('Added one view to ' + numberOfViews + ' views in ' + endTime + 'ms');
    expect(myListView.getItemViews().length).toBe(numberOfViews + 1);
    expect(endTime < threshold).toBe(true);
  });

  describe('can reset models effectively', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 1000,
        threshold = 1000;

    beforeEach(function() {
      models = [];
      for (i = 0; i < numberOfViews; i++) {
        models.push(new Model())
      }
      myListView.dispose();
      myListView = new MyListView({
        collection: myCollection,
        modelName: 'item',
        itemView: ItemView
      });
      myListView.attachTo($('body'));
      myCollection.reset(models);
    });

    it('with a large number of models in a reasonable time', function() {
      myCollection.reset([]);
      startTime = new Date().getTime();
      myCollection.reset(models);
      endTime = new Date().getTime() - startTime;
      console.log('Reset ' + numberOfViews + ' views in ' + endTime + 'ms');
      expect(myListView.getItemViews().length).toBe(numberOfViews);
      expect(endTime < threshold).toBe(true);
    });

    it('can remove a few models from the back of many models correctly and in a reasonable time', function() {
      threshold = 500;
      startTime = new Date().getTime();
      myCollection.reset(models.slice(0, numberOfViews - 100));
      endTime = new Date().getTime() - startTime;
      console.log('Removed 100 old views at the end of ' + numberOfViews + ' views using reset in ' + endTime + 'ms');
      expect(myListView.getItemViews().length).toBe(numberOfViews - 100);
      expect(endTime < threshold).toBe(true);
    });

    it('can remove a few models from the front of many models correctly and in a reasonable time', function() {
      threshold = 500;
      startTime = new Date().getTime();
      myCollection.reset(models.slice(100, numberOfViews));
      endTime = new Date().getTime() - startTime;
      console.log('Removed 100 old views at the front of ' + numberOfViews + ' views using reset in ' + endTime + 'ms');
      expect(myListView.getItemViews().length).toBe(numberOfViews - 100);
      expect(endTime < threshold).toBe(true);
    });

    it('can add a few models to the front of many models correctly and in a reasonable time', function() {
      threshold = 500;
      var newModels = []
      for (i = 0; i < 100; i++) {
        newModels.push(new Model());
      }
      newModels = newModels.concat(models.slice(0, numberOfViews));
      startTime = new Date().getTime();
      myCollection.reset(newModels);
      endTime = new Date().getTime() - startTime;
      console.log('Added 100 new views at the front of ' + numberOfViews + ' views using reset in ' + endTime + 'ms');
      expect(myListView.getItemViews().length).toBe(numberOfViews + 100);
      expect(myListView.getItemViews()[0].model.cid).toBe(myCollection.at(0).cid);
      expect(myListView.getItemViews()[numberOfViews + 99].model.cid).toBe(myCollection.at(numberOfViews + 99).cid);
      expect(endTime < threshold).toBe(true);
    });

    describe('using a item container,', function() {

      var newModels = [];

      beforeEach(function() {
        myListView.dispose();
        myListView = new MyListView({
          collection: myCollection,
          modelName: 'item',
          itemView: ItemView,
          emptyTemplate: Handlebars.compile('<div class="empty-list"></div>'),
          template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
          itemContainer: 'children'
        });
        myListView.attachTo($('body'));
        myCollection.reset(models);
        newModels = []
        for (i = 0; i < 100; i++) {
          newModels.push(new Model());
        }
        newModels = newModels.concat(models.slice(100, numberOfViews - 100));
      });

      it('can add and remove a few models from many models correctly and in a reasonable time', function() {
        startTime = new Date().getTime();
        myCollection.reset(newModels);
        endTime = new Date().getTime() - startTime;
        console.log('Added 100 to the front and removed 200 views to ' + numberOfViews + ' item views using reset in ' + endTime + 'ms');
        expect(myListView.getItemViews().length).toBe(numberOfViews - 100);
        expect(myListView.getItemViews()[0].model.cid).toBe(myCollection.at(0).cid);
        expect(myListView.getItemViews()[numberOfViews - 101].model.cid).toBe(myCollection.at(numberOfViews - 101).cid);
        expect(endTime < threshold).toBe(true);
      });

      it('can add and remove a few models from many models correctly and in a reasonable time', function() {
        myCollection.reset(newModels);
        _.shuffle(models);
        startTime = new Date().getTime();
        myCollection.reset(models);
        endTime = new Date().getTime() - startTime;
        console.log('Removed 100 from the front, added 200 views and shuffled the entire list of ' + numberOfViews + ' item views using reset in ' + endTime + 'ms');
        expect(myListView.getItemViews().length).toBe(numberOfViews);
        expect(myListView.getItemViews()[0].model.cid).toBe(myCollection.at(0).cid);
        expect(myListView.getItemViews()[numberOfViews - 1].model.cid).toBe(myCollection.at(numberOfViews - 1).cid);
        expect(endTime < threshold).toBe(true);
      });
    });
  });

  it('can reset a collection to the same large set of models many times in a reasonable time', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 1000,
        numberOfTimes = 50,
        threshold = 1000;
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      modelName: 'item',
      itemView: ItemView
    });
    myListView.attachTo($('body'));
    for (i = 0; i < numberOfViews; i++) {
       models.push(new Model())
    }
    startTime = new Date().getTime();
    for (i = 0; i < numberOfTimes; i++) {
      myCollection.reset(models);
    }
    endTime = new Date().getTime() - startTime;
    console.log('Reset ' + numberOfViews + ' views ' + numberOfTimes + ' times with same models in ' + endTime + 'ms');
    expect(myListView.getItemViews().length).toBe(numberOfViews);
    expect(endTime < threshold).toBe(true);
  });

  /**
   * Skipping until jsdom adds setSelectionRange: https://github.com/tmpvar/jsdom/pull/804
   */
  xit('can keep position of carat', function() {
    ItemView.prototype.template = Handlebars.compile('<input type="text" value="123"/>');
    var model = new Model();
    myCollection.add(model);
    var view = myListView.getItemViewFromModel(model);
    var input = view.$el.find('input')[0];
    templateRenderer.setCaretPosition(input, 1);
    expect(templateRenderer.getCaretPosition(input)).toBe(1);
    myListView.render();
    expect(templateRenderer.getCaretPosition(view.$el.find('input')[0])).toBe(1);
  });

  it('can call a delayed render and then add a item view to break the delay', function() {
    var startTime, endTime, i,
        models = [],
        numberOfViews = 20,
        numberOfTimes = 50,
        threshold = 500,
        renderWait = 500;
    myListView.dispose();
    myListView = new MyListView({
      collection: myCollection,
      modelName: 'item',
      itemView: ItemView,
      renderWait: renderWait,
      emptyTemplate: Handlebars.compile('<div class="empty-list"></div>'),
      template: Handlebars.compile('<div class="templated-list"></div><div inject="children"></div>'),
      itemContainer: 'children'
    });
    myListView.attachTo($('body'));
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

  it('has item views that it can add and have them still react to DOM events', function() {
    var model = new Model();
    myCollection.add(model);
    var itemView = myListView.getItemViewFromModel(model);
    itemView.$el.find('div.item-details').click().change();
    expect(itemView.myClick.calls.count()).toBe(1);
  });

  it('has item views that it can sort and have them still react to DOM events', function() {
    var model = new Model({order: 3});
    myCollection.add(model);
    var model2 = new Model({order: 2});
    myCollection.add(model2);
    var model3 = new Model({order: 1});
    myCollection.add(model3);
    myCollection.comparator = 'order';
    myCollection.sort();
    var itemView = myListView.getItemViewFromModel(model);
    itemView.$el.find('div.item-details').click().change();
    expect(itemView.myClick.calls.count()).toBe(1);
  });

  it('has item views that it can refresh and not need to render', function() {
    var model = new Model();
    myCollection.add(model);
    var model2 = new Model();
    myCollection.add(model2);
    var renderCount = myListView.render.calls.count();
    myListView.renderChildViews();
    expect(myListView.render.calls.count()).toBe(renderCount);
  });

  it('can get list of item views sorted correctly', function() {
    myListView.attachTo($('body'));
    var model = new Model({order: 1});
    myCollection.add(model);
    var model2 = new Model({order: 2});
    myCollection.add(model2);
    var itemViews = myListView.getItemViews();
    expect(itemViews[0].model.cid).toBe(model.cid);
    expect(itemViews[1].model.cid).toBe(model2.cid);
    myCollection.reset([model2, model]);
    itemViews = myListView.getItemViews();
    expect(myCollection.models[0].cid).toBe(model2.cid);
    expect(myCollection.models[1].cid).toBe(model.cid);
    expect(itemViews[0].model.cid).toBe(model2.cid);
    expect(itemViews[1].model.cid).toBe(model.cid);
    var model3 = new Model({order: 3});
    myCollection.add(model3, {at: 1});
    itemViews = myListView.getItemViews();
    expect(itemViews[0].model.cid).toBe(model2.cid);
    expect(itemViews[1].model.cid).toBe(model3.cid);
    expect(itemViews[2].model.cid).toBe(model.cid);
    myCollection.remove(model3);
    itemViews = myListView.getItemViews();
    expect(itemViews[0].model.cid).toBe(model2.cid);
    expect(itemViews[1].model.cid).toBe(model.cid);
    myCollection.comparator = 'order';
    myCollection.sort();
    itemViews = myListView.getItemViews();
    expect(itemViews[0].model.cid).toBe(model.cid);
    expect(itemViews[1].model.cid).toBe(model2.cid);
  });

  it('can get list of many item views sorted correctly in a reasonable time', function() {
    var numberOfViews = 1000,
      threshold = 50;
    myCollection.comparator = 'order';
    myListView.attachTo($('body'));
    for (i = 0; i < numberOfViews; i++) {
      myCollection.add(new Model({order: numberOfViews - i}), {silent: true});
    }
    myListView.__createItemViews();
    myCollection.sort();
    startTime = new Date().getTime();
    var itemViews = myListView.getItemViews()
    endTime = new Date().getTime() - startTime;
    expect(itemViews[0].model.cid).toBe(myCollection.at(0).cid);
    expect(itemViews[numberOfViews - 1].model.cid).toBe(myCollection.at(numberOfViews - 1).cid);
    console.log('Got ' + numberOfViews + ' views in the correct order in ' + endTime + 'ms');
    expect(endTime < threshold).toBe(true);
  });

});
