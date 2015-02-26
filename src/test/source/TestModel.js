module.exports = function(WebCore) {
  return WebCore.NestedModel.extend({

    urlRoot: '/tests',

    _initializedValue: null,

    defaults: function() {
      return {
        foo: 123,
        bar: 'test',
        obj: {
          a: 1,
          b: 'b value',
          c: {
            d: true
          }
        }
      }
    },

    initialize: function(args) {
      this._initializedValue = true;
    },

    increaseFoo: function() {
      this.set('foo', this.get('foo') + 1);
    }

  });
}
