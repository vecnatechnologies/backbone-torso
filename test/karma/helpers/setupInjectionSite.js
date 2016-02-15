var $ = require('jquery');

// Exposes this.injectionSite for injecting views and this.injectionContainer for inspecting page contents
module.exports = function() {
  var bodyElement;
  beforeEach(function() {
    // Creates divs nested like:
    // <div class="injection-container">
    //   <div class="app-container"></div>
    // </div>
    bodyElement = $('body');
    this.injectionContainer = $('<div class="injection-container"/>');
    this.injectionSite = $('<div class="app-container"/>');

    bodyElement.append(this.injectionContainer);
    this.injectionContainer.append(this.injectionSite);
  });

  afterEach(function() {
    this.injectionContainer.remove();
  });
};