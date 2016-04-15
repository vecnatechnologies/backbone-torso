var $ = require('jquery');
var FeedbackView = require('./helpers/FeedbackView');
var setupInjectionSite = require('./helpers/setupInjectionSite');

describe('A View', function() {
  setupInjectionSite.apply(this);

  beforeEach(function() {
    this.feedbackView = new FeedbackView();
    this.feedbackView.attachTo(this.$app);
  });

  it('can invoke feedback off checkbox check', function() {
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
    this.feedbackView.$el.find('#my-checkbox').click();
    expect(this.feedbackView.checkboxChange).toBe(1);
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(true);
    this.feedbackView.$el.find('#my-checkbox').click();
    expect(this.feedbackView.checkboxChange).toBe(2);
    expect(this.feedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
  });
});