var $ = require('jquery');

// Exposes this.$app for injecting views and this.$appContainer for inspecting page contents
module.exports = function() {
  var bodyElement;
  beforeEach(function() {
    // Creates divs nested like:
    // <div class="app-container">
    //   <div class="injection-site"></div>
    // </div>
    bodyElement = $('body');
    this.$appContainer = $('<div class="app-container"/>');
    this.$app = $('<div class="app"/>');

    bodyElement.append(this.$appContainer);
    this.$appContainer.append(this.$app);
  });

  afterEach(function() {
    this.$appContainer.remove();
  });
};