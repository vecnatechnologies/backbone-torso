var $ = require('jquery');
var TorsoView = require('../../modules/View');
var TorsoModel = require('../../modules/Model');

var candybarModel = new TorsoModel({ name: 'butterfinger' });
var candyModel = new TorsoModel({ type: 'skittles' });

describe('A View', function() {

  describe('when using _prepare', function() {

    it('can add context to the passed in argument', function() {
      var PrepareView = TorsoView.extend({
        initialize: function() {
          this.set('bar', 444);
        },

        _prepare: function(context) {
          context.foo = 123;
        }
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.foo).toBe(123);
      expect(context.view).toBeDefined();
      expect(context.view.bar).toBe(444);
    });

    it('can override existing context', function() {
      var PrepareView = TorsoView.extend({
        _prepare: function(context) {
          context.view = 123;
        }
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.view).toBe(123);
    });

    it('can return a context', function() {
      var PrepareView = TorsoView.extend({
        initialize: function() {
          this.set('bar', 444);
        },

        _prepare: function(context) {
          return {
            foo: 555
          };
        }
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.foo).toBe(555);
      expect(context.view).toBeDefined();
      expect(context.view.bar).toBe(444);
    });

    it('can return an overriding context', function() {
      var PrepareView = TorsoView.extend({
        prepareFields: [
          {name: 'foo', value: 111},
          {name: 'bar', value: true}
        ],

        _prepare: function(context) {
          return {
            view: 123,
            foo: 555
          };
        }
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.view).toBe(123);
      expect(context.foo).toBe(555);
      expect(context.bar).toBe(true);
    });
  });

  describe('when using prepareFields', function() {

    it('can reference any object', function() {
      var PrepareView = TorsoView.extend({
        prepareFields: [{
          name: 'foo',
          value: 123
        }]
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.foo).toBe(123);
    });

    // This one is questionable, it covers up any undefined value you expect to get from the view.
    // In other words if the value on the view is undefined then you get the string instead of undefined.
    it('can reference a string', function() {
      var PrepareView = TorsoView.extend({
        prepareFields: [{
          name: 'bar',
          value: 'test'
        }]
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.bar).toBe('test');
    });

    it('can reference a model', function() {
      var PrepareView = TorsoView.extend({
        prepareFields: [{
          name: 'candybar',
          value: candybarModel
        }]
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.candybar.name).toBe('butterfinger');
    });

    it('can reference a function that is run in the context of the view', function() {
      var PrepareView = TorsoView.extend({
        initialize: function() {
          this._cheese = 'cheese';
        },

        prepareFields: [{
          name: 'food',
          value: function() {
            return this._cheese + 'burger';
          }
        }]
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.food).toBe('cheeseburger');
    });

    it('can reference a function that returns a model', function() {
      var PrepareView = TorsoView.extend({
        initialize: function() {
          this._cheese = 'cheese';
        },

        prepareFields: [{
          name: 'candy',
          value: function() {
            return candyModel;
          }
        }]
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.candy.type).toBe('skittles');
    });

    it('can reference a view property that is the same as the alias', function() {
      var PrepareView = TorsoView.extend({
        initialize: function() {
          this.bar = 'test';
        },

        prepareFields: [ 'bar' ]
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.bar).toBe('test');
    });

    it('can reference a view property that is different from the alias', function() {
      var PrepareView = TorsoView.extend({
        initialize: function() {
          this._bar = 'test';
        },

        prepareFields: [{
          name: 'bar',
          value: '_bar'
        }]
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.bar).toBe('test');
    });

    it('can use an object as the mapping', function() {
      var PrepareView = TorsoView.extend({
        initialize: function() {
          this._bar = 'test';
          this._cheese = 'cheese';
        },

        prepareFields: {
          foo: 123,
          bar: '_bar',
          bard: 'rogue',
          candybar: candybarModel,
          food: function() {
            return this._cheese + 'burger';
          },
          candy: function() {
            return candyModel;
          }
        }
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.foo).toBe(123);
      expect(context.bar).toBe('test');
      expect(context.bard).toBe('rogue');
      expect(context.candybar.name).toBe('butterfinger');
      expect(context.food).toBe('cheeseburger');
      expect(context.candy.type).toBe('skittles');
    });
  });

});