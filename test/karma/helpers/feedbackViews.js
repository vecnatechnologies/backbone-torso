var _ = require('underscore');
var TorsoView = require('./../../../modules/View');
var TorsoFormView = require('./../../../modules/FormView');
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

var ArrayXFeedbackView = TorsoFormView.extend({

  feedback: [
    {
      when: {
       '@foo[x]': ['change']
     },
     then: function(evt, indexMap) {
       this.increase();
       this.setIndexMap(indexMap);
       return {};
     },
     to: 'foo[x]'
    }
  ],

  template: '<input name="foo[0]" data-model="foo[0]" data-feedback="foo[0]" /><input name="foo[1]" data-model="foo[1]" data-feedback="foo[1]" />',

  initialize: function() {
    this.reset();
  },

  reset: function() {
    this.resetIncrease();
    this.resetIndexMap();
  },

  resetIncrease: function() {
    this.change = 0;
  },

  increase: function() {
    this.change++;
  },

  resetIndexMap: function() {
    delete this.indexMap;
  },

  setIndexMap: function(indexMap) {
    this.indexMap = indexMap;
  }
});

var ArrayBarFeedbackView = TorsoFormView.extend({

  feedback: [
    {
      when: {
       '@foo[bar]': ['change']
     },
     then: function(evt, indexMap) {
       this.increase();
       this.setIndexMap(indexMap);
       return {};
     },
     to: 'foo[bar]'
    }
  ],

  template: '<input name="foo[0]" data-model="foo[0]" data-feedback="foo[0]" /><input name="foo[1]" data-model="foo[1]" data-feedback="foo[1]" />',

  initialize: function() {
    this.reset();
  },

  reset: function() {
    this.resetIncrease();
    this.resetIndexMap();
  },

  resetIncrease: function() {
    this.change = 0;
  },

  increase: function() {
    this.change++;
  },

  resetIndexMap: function() {
    delete this.indexMap;
  },

  setIndexMap: function(indexMap) {
    this.indexMap = indexMap;
  }
});

var ObjectFeedbackView = TorsoFormView.extend({

  feedback: [
    {
      when: {
       '@foo[bar]': ['change']
     },
     then: function(evt, indexMap) {
       this.increase();
       this.setIndexMap(indexMap);
       return {};
     },
     to: 'foo[bar]'
    }
  ],

  template: '<input name="foo[abc]" data-model="foo[abc]" data-feedback="foo[abc]" /><input name="foo[def]" data-model="foo[def]" data-feedback="foo[def]" />',

  initialize: function() {
    this.reset();
  },

  reset: function() {
    this.resetIncrease();
    this.resetIndexMap();
  },

  resetIncrease: function() {
    this.change = 0;
  },

  increase: function() {
    this.change++;
  },

  resetIndexMap: function() {
    delete this.indexMap;
  },

  setIndexMap: function(indexMap) {
    this.indexMap = indexMap;
  }
});

module.exports = {
  CheckboxFeedbackView: CheckboxFeedbackView,
  EmptyEventsFeedbackView: EmptyEventsFeedbackView,
  ListenToFeedbackView: ListenToFeedbackView,
  ArrayXFeedbackView: ArrayXFeedbackView,
  ArrayBarFeedbackView: ArrayBarFeedbackView,
  ObjectFeedbackView: ObjectFeedbackView
};