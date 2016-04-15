var $ = require('jquery');
var _ = require('underscore');
var FeedbackView = require('./helpers/FeedbackView');
var setupInjectionSite = require('./helpers/setupInjectionSite');

describe('A View', function() {
  setupInjectionSite.apply(this);

  beforeEach(function() {
    this.feedbackView = new FeedbackView();
    this.feedbackView.attachTo(this.$app);
  });

  afterEach(function() {
    this.feedbackView.resetCheckboxChange();
  });

  // THIS FAILS! See https://github.com/vecnatechnologies/backbone-torso/issues/247
  xit('can invoke feedback once after render', function() {
    expect(this.feedbackView.checkboxChange).toBe(0);
    this.feedbackView.$el.find('#my-checkbox').click();
    expect(this.feedbackView.checkboxChange).toBe(1);
    this.feedbackView.render();
    this.feedbackView.$el.find('#my-checkbox').click();
    var postRenderChange = this.feedbackView.checkboxChange;
    expect(postRenderChange).toBe(2);
    this.feedbackView.delegateEvents();
    this.feedbackView.$el.find('#my-checkbox').click();
    expect(this.feedbackView.checkboxChange).toBe(postRenderChange + 1);
  });


  it('can invoke feedback off checkbox click', function() {
    expect(this.feedbackView.checkboxChange).toBe(0);
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
    this.feedbackView.$el.find('#my-checkbox').click();
    expect(this.feedbackView.checkboxChange).toBe(1);
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(true);
    this.feedbackView.$el.find('#my-checkbox').click();
    expect(this.feedbackView.checkboxChange).toBe(2);
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
  });

  it('can invoke feedback off checkbox\'s label click', function() {
    expect(this.feedbackView.checkboxChange).toBe(0);
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
    this.feedbackView.$el.find('#my-label').click();
    expect(this.feedbackView.checkboxChange).toBe(1);
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(true);
    this.feedbackView.$el.find('#my-label').click();
    expect(this.feedbackView.checkboxChange).toBe(2);
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
  });
});