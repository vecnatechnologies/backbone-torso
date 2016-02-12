var $ = require('jquery');
var ClickView = require('./helpers/ClickView');
var spyOnBackbone = require('./../spec/functional/backboneSpy');

describe('A View', function() {

  var bodyElement, injectionContainer;
  beforeEach(function() {
    // Creates divs nested like:
    // <div class="injection-container">
    //   <div class="app-container"></div>
    // </div>
    //
    // Views should be injected into div.app-container
    // After the test runs, remove div.injection-container
    bodyElement = $('body');
    injectionContainer = $('<div class="injection-container"/>');
    this.$injectionSite = $('<div class="app-container"/>');

    bodyElement.append(injectionContainer);
    injectionContainer.append(this.$injectionSite);
  });

  afterEach(function() {
    injectionContainer.remove();
  });

  it('will be initialized with an $el', function() {
    var clickView = new ClickView();
    expect(clickView.$el).toBeDefined();
  });

  describe('that is attached', function() {

    beforeEach(function() {
      var SpiedClickView = ClickView.extend({spyHook: function() {
          spyOn(this, 'myClick');
          spyOn(this, 'afterMyEvent');
          spyOn(this, '_activate');
        }});
      this.spiedClickView = new SpiedClickView();
      this.spiedClickView.attach(this.$injectionSite);
    });

    afterEach(function() {
      this.spiedClickView.dispose();
    });

    it('will trigger event handlers defined in the events hash', function() {
      expect(this.spiedClickView.myClick).not.toHaveBeenCalled();
      this.spiedClickView.$el.find('div').click().change();
      expect(this.spiedClickView.myClick).toHaveBeenCalled();
    });

    it('will trigger event handlers registered by View.on ', function() {
      expect(this.spiedClickView.afterMyEvent).not.toHaveBeenCalled();
      this.spiedClickView.trigger('myEvent');
      expect(this.spiedClickView.afterMyEvent).toHaveBeenCalled();
    });

  });

});