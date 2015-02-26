module.exports = function(Torso, _) {

  var NestedExampleFormModel = Torso.Models.Form.extend({
    defaults: {
      userId: 0,
      userAddrs: [
        {
          street: '4 bumble rd.',
          state: 'Beetown'
        }, {
          street: '772 flower ave.',
          state: 'Orchadia'
        }
      ],
      traits: {
        happy: true,
        flappy: [1, 6]
      }
    },
    validation: {
      'userAddrs': {
        inlineFn: function(value, attr, model, computed) {
          if (!value || value.length == 0) {
            return 'Must have at least one address.';
          }
        }
      },
      'traits.happy': {
        inlineFn: function(value, attr, model, computed) {
          if (value !== true) {
            return 'Must be happy!';
          }
        }
      }
    }
  });

  return NestedExampleFormModel;
}