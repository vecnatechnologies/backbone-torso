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

  it('has two children', function() {
    var parentClickView = new ParentClickView();
    expect(parentClickView.childView1).toBeDefined();
    expect(parentClickView.childView2).toBeDefined();
  });
});