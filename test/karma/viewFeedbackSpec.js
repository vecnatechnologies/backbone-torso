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

    it('can invoke the then when model is present and referenced by name', function() {
      this.listenToFeedbackView.feedback = [
        {
          when: {
            'listenTo': [
              {
                object: 'model',
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
      this.listenToFeedbackView.model = new TorsoModel();
      this.listenToFeedbackView.delegateEvents();
      expect(this.listenToFeedbackView.change).toBe(0);
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

  describe('that uses array notation (single-character, such as "x") on "when"s', function() {
    beforeEach(function() {
      this.arrayFeedbackView = new feedbackViews.ArrayXFeedbackView();
      this.arrayFeedbackView.attachTo(this.$app);
    });

    afterEach(function() {
      this.arrayFeedbackView.reset();
    });

    it('can invoke the then when @foo[x] changes', function() {
      this.arrayFeedbackView.model.set('foo', [1, 2]);
      this.arrayFeedbackView.render();
      expect(this.arrayFeedbackView.change).toBe(0);
      this.arrayFeedbackView.$el.find('[data-model="foo[0]"]').change();
      expect(this.arrayFeedbackView.change).toBe(1);
      expect(this.arrayFeedbackView.indexMap.x).toBe(0);
      this.arrayFeedbackView.resetIndexMap();
      this.arrayFeedbackView.$el.find('[data-model="foo[0]"]').change();
      expect(this.arrayFeedbackView.change).toBe(2);
      expect(this.arrayFeedbackView.indexMap.x).toBe(0);
      this.arrayFeedbackView.resetIndexMap();
      this.arrayFeedbackView.$el.find('[data-model="foo[1]"]').change();
      expect(this.arrayFeedbackView.change).toBe(3);
      expect(this.arrayFeedbackView.indexMap.x).toBe(1);
    });
  });

  describe('that uses array notation (mutli-character, such as "bar") on "when"s', function() {
    beforeEach(function() {
      this.arrayFeedbackView = new feedbackViews.ArrayBarFeedbackView();
      this.arrayFeedbackView.attachTo(this.$app);
    });

    afterEach(function() {
      this.arrayFeedbackView.reset();
    });

    it('can invoke the then when @foo[bar] changes', function() {
      this.arrayFeedbackView.model.set('foo', ['abc', 'def']);
      this.arrayFeedbackView.render();
      expect(this.arrayFeedbackView.change).toBe(0);
      this.arrayFeedbackView.$el.find('[data-model="foo[0]"]').change();
      expect(this.arrayFeedbackView.change).toBe(1);
      expect(this.arrayFeedbackView.indexMap.bar).toBe(0);
      this.arrayFeedbackView.resetIndexMap();
      this.arrayFeedbackView.$el.find('[data-model="foo[0]"]').change();
      expect(this.arrayFeedbackView.change).toBe(2);
      expect(this.arrayFeedbackView.indexMap.bar).toBe(0);
      this.arrayFeedbackView.resetIndexMap();
      this.arrayFeedbackView.$el.find('[data-model="foo[1]"]').change();
      expect(this.arrayFeedbackView.change).toBe(3);
      expect(this.arrayFeedbackView.indexMap.bar).toBe(1);
    });
  });

  describe('that uses object notation on "when"s', function() {
    beforeEach(function() {
      this.objectFeedbackView = new feedbackViews.ObjectFeedbackView();
      this.objectFeedbackView.attachTo(this.$app);
    });

    afterEach(function() {
      this.objectFeedbackView.reset();
    });

    it('can invoke the then when @foo[bar] changes', function() {
      this.objectFeedbackView.model.set('foo', {'abc': 1, 'def': 2});
      this.objectFeedbackView.render();
      expect(this.objectFeedbackView.change).toBe(0);
      this.objectFeedbackView.$el.find('[data-model="foo[abc]"]').change();
      expect(this.objectFeedbackView.change).toBe(1);
      expect(this.objectFeedbackView.indexMap.bar).toBe('abc');
      this.objectFeedbackView.resetIndexMap();
      this.objectFeedbackView.$el.find('[data-model="foo[abc]"]').change();
      expect(this.objectFeedbackView.change).toBe(2);
      expect(this.objectFeedbackView.indexMap.bar).toBe('abc');
      this.objectFeedbackView.resetIndexMap();
      this.objectFeedbackView.$el.find('[data-model="foo[def]"]').change();
      expect(this.objectFeedbackView.change).toBe(3);
      expect(this.objectFeedbackView.indexMap.bar).toBe('def');
    });
  });
});