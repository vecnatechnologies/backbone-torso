var _ = require('underscore');
var TorsoView = require('./../../../modules/View');
var spyOnBackbone = require('./spyOnBackbone');

var CheckboxFeedbackView = TorsoView.extend({

  // DO NOT ADD events HASH! Important for tests.

  feedback: [
    {
      when: {
        '#my-checkbox': ['change']
      },
      then: function(evt) {
        this.increase();
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
  },

  increase: function() {
    this.checkboxChange++;
  }
});

module.exports = {
  CheckboxFeedbackView: CheckboxFeedbackView
};