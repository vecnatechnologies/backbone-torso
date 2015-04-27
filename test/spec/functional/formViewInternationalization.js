var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe("A Form View's internationalization", function() {
  var model, view, UpdateProfileFormModel, UpdateProfileFormView,
      init, $, _, env;

  /**
   * Sets up test view
   */
  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      $ = env.window.$;
      _ = env.window._;

      /* Example Form Model */
      UpdateProfileFormModel = require(testSrcPath + '/UpdateProfileFormModel')(env.window.Torso.FormModel, _);

      /* Example form view */
      UpdateProfileFormView = require(testSrcPath + '/UpdateProfileFormView')(env.window.Torso.FormView, _);

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

  it("can support i18n messages");

  it("can support i18n messages with template values");
});