var _ = require('underscore');
var TorsoView = require('./../../../modules/View');
var spyOnBackbone = require('./spyOnBackbone');

var CheckboxFeedbackView = TorsoView.extend({

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

var EmptyEventsFeedbackView = TorsoView.extend({

  // DO NOT ADD events HASH! Important for tests.

  feedback: [
    {
      when: {
        '#my-div': ['click']
      },
      then: function(evt) {
        this.increase();
        return {};
      },
      to: 'my-feedback'
    }
  ],

  template: '<div id="my-div"/><div data-feedback="my-feedback"></div>',

  initialize: function() {
    this.resetIncrease();
  },

  resetIncrease: function() {
    this.change = 0;
  },

  increase: function() {
    this.change++;
  }
});


var ListenToFeedbackView = TorsoView.extend({

  feedback: [
    {
      when: {
        'listenTo': [
          {
            object: function() { return this.model; },
            events: 'change',
          }
        ]
      },
      then: function(evt) {
        this.increase();
        return {};
      },
      to: 'my-feedback'
    }
  ],

  template: '<div data-feedback="my-feedback"></div>',

  initialize: function() {
    this.resetIncrease();
  },

  resetIncrease: function() {
    this.change = 0;
  },

  increase: function() {
    this.change++;
  }
});

module.exports = {
  CheckboxFeedbackView: CheckboxFeedbackView,
  EmptyEventsFeedbackView: EmptyEventsFeedbackView,
  ListenToFeedbackView: ListenToFeedbackView
};