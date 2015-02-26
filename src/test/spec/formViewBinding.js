var distPath = '../../../dist',
  testPath = distPath + '/test',
  spyOnBackbone = require('./backboneSpy');

describe("A Form View's two-way binding", function() {
  var model, view, UpdateProfileFormModel, UpdateProfileFormView,
    $, _, env;

  /**
   * Sets up test view
   */
   beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      $ = env.window.$;
      _ = env.window._;

      /* Example Form Model */
      UpdateProfileFormModel = require(testPath + '/UpdateProfileFormModel')(env.window.WebCore, _);

      /* Example form view */
      UpdateProfileFormView = require(testPath + '/UpdateProfileFormView')(env.window.WebCore, _);

      /* Create basic model and view */
      model = new UpdateProfileFormModel();
      view = new UpdateProfileFormView({
        model: model
      });
      $('body').append(view.$el);

      done();
    });
  });

   afterEach(function() {
    view.dispose();
   });

  /******** PUSHING from FormModel to FormView ********/

  it("can update DOM text inputs on change of FormModel", function() {
    expect(view.$el.find('#full-name').val()).toBe('');
    model.set('fullName', 'Jon Doe');
    expect(view.$el.find('#full-name').val()).toBe('Jon Doe');
  });

  it("can update DOM textarea inputs on change of FormModel", function() {
    expect(view.$el.find('#short-bio').val()).toBe('');
    model.set('shortBio', 'This is a short biography');
    expect(view.$el.find('#short-bio').val()).toBe('This is a short biography');
  });

  it("can update DOM radio inputs on change of FormModel", function() {
    expect(view.$el.find('#gender-male').prop('checked')).toBe(false);
    expect(view.$el.find('#gender-female').prop('checked')).toBe(false);

    model.set('gender', 'male');
    expect(view.$el.find('#gender-male').prop('checked')).toBe(true);
    expect(view.$el.find('#gender-female').prop('checked')).toBe(false);

    model.set('gender', 'female');
    expect(view.$el.find('#gender-male').prop('checked')).toBe(false);
    expect(view.$el.find('#gender-female').prop('checked')).toBe(true);

    model.set('gender', undefined);
    expect(view.$el.find('#gender-male').prop('checked')).toBe(false);
    expect(view.$el.find('#gender-female').prop('checked')).toBe(false);
  });

  it("can update DOM checkbox inputs on change of FormModel", function() {
    expect(view.$el.find('#schedule-M').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-T').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-W').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-R').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-F').prop('checked')).toBe(false);

    model.set('schedule', ['M','W','F']);
    expect(view.$el.find('#schedule-M').prop('checked')).toBe(true);
    expect(view.$el.find('#schedule-T').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-W').prop('checked')).toBe(true);
    expect(view.$el.find('#schedule-R').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-F').prop('checked')).toBe(true);

    model.set('schedule', ['R']);
    expect(view.$el.find('#schedule-M').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-T').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-W').prop('checked')).toBe(false);
    expect(view.$el.find('#schedule-R').prop('checked')).toBe(true);
    expect(view.$el.find('#schedule-F').prop('checked')).toBe(false);
  });

  it("can update DOM select dropdown inputs on change of FormModel", function() {
    expect(view.$el.find('#ranking').val()).toBe('');
    model.set('ranking', 'lieutenant');
    expect(view.$el.find('#ranking').val()).toBe('lieutenant');
  });

  /******** PULLING from FormModel to FormView ********/

  it("can update model attributes on change of DOM text inputs", function() {
    expect(model.get('fullName')).toBe('');
    view.$el.find('#full-name').val('Jon Doe').change();
    expect(model.get('fullName')).toBe('Jon Doe');
  });

  it("can update model attributes on change of DOM textarea inputs", function() {
    expect(model.get('shortBio')).toBe('');
    view.$el.find('#short-bio').val('This is a short biography').change();
    expect(model.get('shortBio')).toBe('This is a short biography');
  });

  it("can update model attributes on change of DOM radio inputs", function() {
    expect(model.get('gender')).toBeUndefined();
    view.$el.find('#gender-male').click().change();
    expect(model.get('gender')).toBe('male');
    view.$el.find('#gender-female').click().change();
    expect(model.get('gender')).toBe('female');
  });

  it("can update model attributes on change of DOM checkbox inputs", function() {
    expect(_.isEqual(model.get('schedule'), [])).toBe(true);
    view.$el.find('#schedule-M').click().change();
    expect(_.isEqual(model.get('schedule'), ['M'])).toBe(true);
    view.$el.find('#schedule-W').click().change();
    expect(_.isEqual(model.get('schedule'), ['M', 'W'])).toBe(true);
    view.$el.find('#schedule-F').click().change();
    expect(_.isEqual(model.get('schedule'), ['M', 'W', 'F'])).toBe(true);
    view.$el.find('#schedule-M').click().change();
    expect(_.isEqual(model.get('schedule'), ['W', 'F'])).toBe(true);
    view.$el.find('#schedule-F').click().change();
    expect(_.isEqual(model.get('schedule'), ['W'])).toBe(true);
    view.$el.find('#schedule-T').click().change();
    expect(_.isEqual(model.get('schedule'), ['T', 'W'])).toBe(true);
  });

  it("can update model attributes on change of DOM select dropdown inputs", function() {
    expect(model.get('ranking')).toBe('');
    view.$el.find('#ranking').val('cadet').change();
    expect(model.get('ranking')).toBe('cadet');
  });
});