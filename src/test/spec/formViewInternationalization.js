var distPath = '../../../dist',
  testPath = distPath + '/test',
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
      UpdateProfileFormModel = require(testPath + '/UpdateProfileFormModel')(env.window.Torso.Models.Form, _);

      /* Example form view */
      UpdateProfileFormView = require(testPath + '/UpdateProfileFormView')(env.window.Torso.Views.Form, _);

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