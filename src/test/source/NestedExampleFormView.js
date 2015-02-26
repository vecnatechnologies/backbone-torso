module.exports = function(WebCore, _) {

  var NestedExampleFormView = WebCore.Views.Form.extend({
    template: require('./binding-nested-test-template'),
    fields: {
      'userId': {type: 'text'},
      'userAddrs[0].street': {type: 'text'},
      'userAddrs[0].state': {type: 'text'},
      'traits.happy': {
        type: 'radio',
        values: ['T', 'F']
      },
      'traits.flappy[0]': {
        type: 'radio',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    events: {
      'click .submit.primary': 'submitCallback'
    },
    submitCallback: function(evt) {
      this.model.validate();
      return false;
    }
  });

  return NestedExampleFormView;
}