var $ = require('jquery');
var TorsoView = require('../../modules/View');

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

    it('can use an object as the mapping', function() {
      var PrepareView = TorsoView.extend({
        initialize: function() {
          this._bar = 'test';
        },

        prepareFields: {
          foo: 123,
          bar: '_bar'
        }
      });
      var prepareView = new PrepareView();
      var context = prepareView.prepare();
      expect(context.foo).toBe(123);
      expect(context.bar).toBe('test');
    });
  });

});