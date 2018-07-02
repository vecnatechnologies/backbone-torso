var TorsoView = require('../../modules/View');

var ORIGINAL_CLASS_NAME = 'original-class-name';
var NEW_CLASS_NAME = 'new-class-name';

var View = TorsoView.extend({
  className: ORIGINAL_CLASS_NAME,
  getElClass: function() {
    return this.$el.attr('class');
  }
});

describe('A View', function() {
  beforeEach(function() {
    this.view = new View();
    this.view.render();
  });

  afterEach(function() {
    this.view.dispose();
  });

  it('uses the default className property from the view if updateClassName is not called', function() {
    expect(this.view.getElClass()).toBe(ORIGINAL_CLASS_NAME);
  });

  it('updates the class of the view $el to a new class name when updateClassName is called and the new class name is provided', function() {
    expect(this.view.getElClass()).toBe(ORIGINAL_CLASS_NAME);
    var newClassName = NEW_CLASS_NAME;
    this.view.updateClassName(newClassName);
    expect(this.view.getElClass()).toBe(newClassName);
  });

  it('removes the class of the view $el when updateClassName is called without providing a parameter', function() {
    expect(this.view.getElClass()).toBe(ORIGINAL_CLASS_NAME);
    this.view.updateClassName();
    expect(this.view.getElClass()).toBeUndefined();
  });
});