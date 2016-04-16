var spyOnBackbone = require('./helpers/spyOnBackbone');
var _ = require('underscore');
var $ = require('jquery');
var UpdateProfileFormModel = require('./helpers/UpdateProfileFormModel');
var UpdateProfileFormView = require('./helpers/UpdateProfileFormView');
var setupInjectionSite = require('./helpers/setupInjectionSite');
require('../../modules/stickitUtils');

describe("A Form View's two-way binding", function() {
  var model, view;

  setupInjectionSite.apply(this);

  // Sets up test view
  beforeEach(function() {
    /* Create basic model and view */
    model = new UpdateProfileFormModel();
    view = new UpdateProfileFormView({
      model: model
    });
    view.attachTo(this.$app);
  });

  afterEach(function() {
    view.dispose();
  });

  it("can support i18n messages");

  it("can support i18n messages with template values");
});