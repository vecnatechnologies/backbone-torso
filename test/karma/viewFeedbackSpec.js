var $ = require('jquery');
var _ = require('underscore');
var feedbackViews = require('./helpers/feedbackViews');
var setupInjectionSite = require('./helpers/setupInjectionSite');
var TorsoModel = require('../../modules/Model');

describe('A View', function() {
  setupInjectionSite.apply(this);

  describe('that uses no events', function() {

    beforeEach(function() {
      this.emptyEventsFeedbackView = new feedbackViews.EmptyEventsFeedbackView();
      this.emptyEventsFeedbackView.attachTo(this.$app);
    });

    afterEach(function() {
      this.emptyEventsFeedbackView.resetIncrease();
    });

    it('can invoke feedback once after render', function() {
      expect(this.emptyEventsFeedbackView.change).toBe(0);
      this.emptyEventsFeedbackView.$el.find('#my-div').click();
      expect(this.emptyEventsFeedbackView.change).toBe(1);
      this.emptyEventsFeedbackView.render();
      this.emptyEventsFeedbackView.$el.find('#my-div').click();
      var postRenderChange = this.emptyEventsFeedbackView.change;
      expect(postRenderChange).toBe(2);
      this.emptyEventsFeedbackView.delegateEvents();
      this.emptyEventsFeedbackView.$el.find('#my-div').click();
      expect(this.emptyEventsFeedbackView.change).toBe(postRenderChange + 1);
    });
  });

  describe('that uses a checkbox', function() {

    beforeEach(function() {
      this.checkboxFeedbackView = new feedbackViews.CheckboxFeedbackView();
      this.checkboxFeedbackView.attachTo(this.$app);
    });

    afterEach(function() {
      this.checkboxFeedbackView.resetCheckboxChange();
    });

    it('can invoke feedback off checkbox click', function() {
      expect(this.checkboxFeedbackView.checkboxChange).toBe(0);
      expect(this.checkboxFeedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
      this.checkboxFeedbackView.$el.find('#my-checkbox').click();
      expect(this.checkboxFeedbackView.checkboxChange).toBe(1);
      expect(this.checkboxFeedbackView.$el.find('#my-checkbox').prop('checked')).toBe(true);
      this.checkboxFeedbackView.$el.find('#my-checkbox').click();
      expect(this.checkboxFeedbackView.checkboxChange).toBe(2);
      expect(this.checkboxFeedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
    });

    it('can invoke feedback off checkbox\'s label click', function() {
      expect(this.checkboxFeedbackView.checkboxChange).toBe(0);
      expect(this.checkboxFeedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
      this.checkboxFeedbackView.$el.find('#my-label').click();
      expect(this.checkboxFeedbackView.checkboxChange).toBe(1);
      expect(this.checkboxFeedbackView.$el.find('#my-checkbox').prop('checked')).toBe(true);
      this.checkboxFeedbackView.$el.find('#my-label').click();
      expect(this.checkboxFeedbackView.checkboxChange).toBe(2);
      expect(this.checkboxFeedbackView.$el.find('#my-checkbox').prop('checked')).toBe(false);
    });
  });

  describe('that uses listenTo on "when"s', function() {
    beforeEach(function() {
      this.listenToFeedbackView = new feedbackViews.ListenToFeedbackView();
      this.listenToFeedbackView.attachTo(this.$app);
    });

    afterEach(function() {
      this.listenToFeedbackView.resetIncrease();
    });

    it('can invoke the then when model is present', function() {
      expect(this.listenToFeedbackView.change).toBe(0);
      this.listenToFeedbackView.model = new TorsoModel();
      this.listenToFeedbackView.delegateEvents();
      this.listenToFeedbackView.model.set('foo', 1);
      expect(this.listenToFeedbackView.change).toBe(1);
    });

    it('can skip the then when model is not present', function() {
      var model = new TorsoModel();
      expect(this.listenToFeedbackView.change).toBe(0);
      this.listenToFeedbackView.model = model;
      this.listenToFeedbackView.delegateEvents();
      this.listenToFeedbackView.model.set('foo', 1);
      expect(this.listenToFeedbackView.change).toBe(1);
      this.listenToFeedbackView.model = undefined;
      this.listenToFeedbackView.delegateEvents();
      model.set('bar', 2);
      expect(this.listenToFeedbackView.change).toBe(1);
    });
  });
});