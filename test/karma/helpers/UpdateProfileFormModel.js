var TorsoFormModel = require('../../../modules/FormModel');

module.exports = TorsoFormModel.extend({
  defaults: {
    fullName: '',
    email: '',
    shortBio: '',
    gender: undefined,
    schedule: [],
    ranking: '',
    dates: [{
      eventName: 'birthday',
      date: (new Date(90, 11, 31)),
      levels: [1, 2, 3]
    }, {
      eventName: 'first day of work',
      date: (new Date(114, 4, 14)),
      levels: [4, 5, 6, 7, 8]
    }]
  },
  validation: {
    fullName: {
      required: true
    },
    email: {
      required: false,
      pattern: 'email'
    },
    schedule: function(value) {
      var req = (3 - value.length);
      if (req > 0) {
        return 'Must select ' + req +' more day(s).';
      }
    }
  }
});