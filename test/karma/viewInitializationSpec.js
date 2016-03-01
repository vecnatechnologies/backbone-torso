var TorsoView = require('./../../modules/View');
var ClickView = require('./helpers/ClickView');
var ParentClickView = require('./helpers/ParentClickView');
var ChildClickView = require('./helpers/ChildClickView');

describe('A Torso View', function() {
  it('can be initialized', function() {
    var torsoView = new TorsoView();
    expect(torsoView).toBeDefined();
  });
});

describe('ClickView', function() {
  it('is initialized with spies', function() {
    var clickView = new ClickView();
    expect(clickView).toBeDefined();
    clickView.myClick();
    expect(clickView.myClick).toHaveBeenCalled();
    clickView.afterMyEvent();
    expect(clickView.afterMyEvent).toHaveBeenCalled();
  });

  it('can be initialized multiple times with independent spies', function() {
    var clickView1 = new ClickView();
    var clickView2 = new ClickView();
    clickView1.myClick();
    expect(clickView1.myClick).toHaveBeenCalled();
    expect(clickView2.myClick).not.toHaveBeenCalled();
  });

  describe('when initialized', function() {

    it('will call _activate', function() {
      var clickView = new ClickView();
      expect(clickView._activate).toHaveBeenCalled();
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