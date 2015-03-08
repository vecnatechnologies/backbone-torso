module.exports = function(TorsoNestedModel) {
  return TorsoNestedModel.extend({

    urlRoot: '/test2',

    defaults: function() {
      return {
        pieces: 5,
        color: 'red',
        ingredients: [
          { name: 'flour' },
          { name: 'dye' },
          { name: 'sugar' }
        ]
      }
    },

    initialize: function(args) {
      this._baked = false;
      this._ready = true;
    },

    bake: function() {
      this._baked = true;
      this.set('color', 'brown');
    },

    addPiece: function() {
      this.set('pieces', this.get('pieces') + 1);
    }

  });
}
