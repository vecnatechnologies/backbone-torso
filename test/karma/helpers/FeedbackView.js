var _ = require('underscore');
var TorsoView = require('./../../../modules/View');
var spyOnBackbone = require('./spyOnBackbone');

var FeedbackView = TorsoView.extend({

  feedback: [
    {
      when: {
        '#my-checkbox': ['change']
      },
      then: function(evt) {
        this.checkboxChange++;
        return {};
      },
      to: 'checkbox-test'
    }
  ],

  template: '<input id="my-checkbox" type="checkbox" name="test" value="test"></input><label id="my-label" for="my-checkbox">Test</label><div data-feedback="checkbox-test"></div>',

  initialize: function() {
    this.resetCheckboxChange();
  },

  resetCheckboxChange: function() {
    this.checkboxChange = 0;
  }
});

module.exports = FeedbackView;