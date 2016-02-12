var TorsoView = require('./../../modules/View');
var ClickView = require('./helpers/ClickView');
var ChildClickView = require('./helpers/ChildClickView');
var ParentClickView = require('./helpers/ParentClickView');

describe('A Torso View', function() {
  it('can be initialized', function() {
    var torsoView = new TorsoView();
    expect(torsoView).toBeDefined();
  });
});

describe('ClickView', function() {
  it('can be initialized', function() {
    var clickView = new ClickView();
    expect(clickView).toBeDefined();
  });

  describe('when initialized', function() {
    it('will call _activate', function() {
      var SpiedClickView = ClickView.extend({spyHook: function() {
        spyOn(this, '_activate');
      }});
      var spiedClickView = new SpiedClickView();
      expect(spiedClickView._activate).toHaveBeenCalled();
    });
  });

  it('can register spys from a hook', function() {
    var SpiedClickView = ClickView.extend({spyHook: function() {
      spyOn(this, 'myClick');
    }});
    var spiedClickView = new SpiedClickView();
    spiedClickView.myClick();
    expect(spiedClickView.myClick).toHaveBeenCalled();
  });

});

describe('ChildClickView', function() {
  it('can be initialized', function() {
    var childClickView = new ChildClickView();
    expect(childClickView).toBeDefined();
  });
});

describe('ParentClickView', function() {
  it('can be initialized', function() {
    var parentClickView = new ParentClickView();
    expect(parentClickView).toBeDefined();
  });
});