var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe("A Form View's feedback bindings", function() {
  var model, view, UpdateProfileFormView,
      init, $, _, env;

  /**
   * Sets up test view
   */
  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      $ = env.window.$;
      _ = env.window._;
      UpdateProfileFormView = require(testSrcPath + '/UpdateProfileFormView')(env.window.Torso.FormView, _);
      done();
    });
  });

  it('can update a feedback zone on change of an input', function() {
    var TestFormModel = env.window.Torso.FormModel.extend({
      defaults: {
        fullName: ''
      },
      validation: {
        fullName: function(value) {
          return value === '' ? 'REQUIRED' : '';
        }
      }
    });
    var testView = new UpdateProfileFormView({
      model: new TestFormModel()
    });
    testView.attachTo($('body'));
    var feedbackZone = testView.$el.find('[data-feedback="fullName-error"]');
    var input = testView.$el.find('[data-model="fullName"]');
    expect(feedbackZone.text()).toBe('');
    input.val('something');
    expect(feedbackZone.text()).toBe('');
    input.val('').change();
    expect(feedbackZone.text()).toBe('REQUIRED');
  });

  it('can update a feedback zone on change of a radio group', function() {
    var TestFormModel = env.window.Torso.FormModel.extend({
      defaults: {
        gender: undefined
      },
      validation: {
        gender: function(value) {
          return value !== 'female' ? 'MUST BE A GIRL' : '';
        }
      }
    });
    var testView = new UpdateProfileFormView({
      model: new TestFormModel()
    });
    testView.attachTo($('body'));
    var feedbackZone = testView.$el.find('[data-feedback="gender-error"]');
    var maleInput = testView.$el.find('[data-model="gender"][value="male"]');
    var femaleInput = testView.$el.find('[data-model="gender"][value="female"]');
    expect(feedbackZone.text()).toBe('');
    maleInput.click().change();
    expect(feedbackZone.text()).toBe('MUST BE A GIRL');
    femaleInput.click().change();
    expect(feedbackZone.text()).toBe('');
  });

  it('can update a feedback zone on change of a checkbox group', function() {
    var TestFormModel = env.window.Torso.FormModel.extend({
      defaults: {
        schedule: []
      },
      validation: {
        schedule: function(value) {
          var req = (3 - value.length);
          return (req > 0 ? 'Must select ' + req +' more day(s).' : '');
        }
      }
    });
    var testView = new UpdateProfileFormView({
      model: new TestFormModel()
    });
    testView.attachTo($('body'));
    var feedbackZone = testView.$el.find('[data-feedback="schedule-error"]');
    var mondayCheckbox = testView.$el.find('[data-model="schedule"][value="M"]');
    var tuesdayCheckbox = testView.$el.find('[data-model="schedule"][value="T"]');
    var wednesdayCheckbox = testView.$el.find('[data-model="schedule"][value="W"]');
    expect(feedbackZone.text()).toBe('');
    mondayCheckbox.click().change();
    expect(feedbackZone.text()).toBe('Must select 2 more day(s).');
    tuesdayCheckbox.click().change();
    expect(feedbackZone.text()).toBe('Must select 1 more day(s).');
    wednesdayCheckbox.click().change();
    expect(feedbackZone.text()).toBe('');
  });

});
