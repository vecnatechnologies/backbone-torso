var $ = require('jquery');
var ClickView = require('./helpers/ClickView');
var ParentClickView = require('./helpers/ParentClickView');
var setupInjectionSite = require('./helpers/setupInjectionSite');

describe('A View', function() {

  setupInjectionSite.apply(this);

  beforeEach(function() {
    this.clickView = new ClickView();
  });

  it('will be initialized with an $el', function() {
    var clickView = new ClickView();
    expect(clickView.$el).toBeDefined();
  });

  describe('that is attached', function() {

    beforeEach(function() {
      this.clickView.attach(this.injectionSite);
    });

    afterEach(function() {
      this.clickView.dispose();
    });

    it('will be rendered to the DOM', function() {
      expect(this.injectionContainer.html()).toMatch(this.clickView.className);
    });

    it('will trigger event handlers defined in the events hash', function() {
      expect(this.clickView.myClick).not.toHaveBeenCalled();
      this.clickView.$el.find('div').click().change();
      expect(this.clickView.myClick).toHaveBeenCalled();
    });

    it('will trigger event handlers registered by View.on ', function() {
      expect(this.clickView.afterMyEvent).not.toHaveBeenCalled();
      this.clickView.trigger('myEvent');
      expect(this.clickView.afterMyEvent).toHaveBeenCalled();
    });

    it('will trigger event handlers registered by a method in _activate', function() {
      expect(this.clickView.afterMyDeactivatableEvent).not.toHaveBeenCalled();
      this.clickView.trigger('myDeactivatableEvent');
      expect(this.clickView.afterMyDeactivatableEvent).toHaveBeenCalled();
    });

  });

  describe('that is detached', function() {
    beforeEach(function() {
      this.clickView.attach(this.injectionSite);
      this.clickView.detach();
    });

    afterEach(function() {
      this.clickView.dispose();
    });

    it('will not be rendered to the DOM', function() {
      expect(this.injectionContainer.html()).not.toMatch(this.clickView.className);
    });

    it('will not trigger event handlers defined in the events hash', function() {
      expect(this.clickView.myClick).not.toHaveBeenCalled();
      this.clickView.$el.click();
      expect(this.clickView.myClick).not.toHaveBeenCalled();
    });

    it('will trigger event handlers registered by View.on', function() {
      expect(this.clickView.afterMyEvent).not.toHaveBeenCalled();
      this.clickView.trigger('myEvent');
      expect(this.clickView.afterMyEvent).toHaveBeenCalled();
    });

    it('will trigger event handlers registered by a method in _activate', function() {
      expect(this.clickView.afterMyDeactivatableEvent).not.toHaveBeenCalled();
      this.clickView.trigger('myDeactivatableEvent');
      expect(this.clickView.afterMyDeactivatableEvent).toHaveBeenCalled();
    });
  });

});

describe('A view with two children', function() {

  setupInjectionSite.apply(this);

  beforeEach(function() {
    this.parentView = new ParentClickView();
    this.childView1 = this.parentView.childView1;
    this.childView2 = this.parentView.childView2;
  });

  afterEach(function() {
    this.parentView.dispose();
  });

  it('will not have called listeners', function() {
    expect(this.parentView.myClick).not.toHaveBeenCalled();
    expect(this.childView1.myClick).not.toHaveBeenCalled();
    expect(this.childView2.myClick).not.toHaveBeenCalled();
    expect(this.parentView.afterMyEvent).not.toHaveBeenCalled();
    expect(this.childView1.afterMyEvent).not.toHaveBeenCalled();
    expect(this.childView2.afterMyEvent).not.toHaveBeenCalled();
    expect(this.parentView.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(this.childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
    expect(this.childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
  });

  describe('before being attached', function() {
    it('parent will not be attached to parent', function() {
      expect(this.parentView.isAttachedToParent()).toBe(false);
    });

    it('children will not be attached to parent', function() {
      expect(this.childView1.isAttachedToParent()).toBe(false);
      expect(this.childView2.isAttachedToParent()).toBe(false);
    });
  });

  describe('when attached', function() {
    beforeEach(function() {
      this.parentView.attach(this.injectionSite);
    });

    it('will render both children', function() {
      expect($('.child').length).toBe(2);
    });

    it('will replace injection sites with children', function() {
      expect($('div[inject]').length).toBe(0);
    });

    describe('if one child detached', function() {
      beforeEach(function() {
        this.childView1.detach();
      });

      it('other child will still be attached', function() {
        expect($('.child').length).toBe(1);
      });

      it('will restore injection site', function() {
        expect($('div[inject]').length).toBe(1);
      });

      it('and parent view rerendered, will render both children again', function() {
        this.parentView.render();
        expect($('.child').length).toBe(2);
        expect($('div[inject]').length).toBe(0);
      });
    });

    it('parent will be attached to parent', function() {
      expect(this.parentView.isAttachedToParent()).toBe(true);
    });

    it('children will be attached to parent', function() {
      expect(this.childView1.isAttachedToParent()).toBe(true);
      expect(this.childView2.isAttachedToParent()).toBe(true);
    });

    describe('for event handlers defined in the event hash', function() {
      it('can trigger event handlers for self and not for children', function() {
        this.parentView.$el.find('.parent').click();

        expect(this.parentView.myClick).toHaveBeenCalled();
        expect(this.childView1.myClick).not.toHaveBeenCalled();
        expect(this.childView2.myClick).not.toHaveBeenCalled();
      });

      it('can trigger event for one child and not the parent or other child', function() {
        this.childView1.$el.find('.child').click();

        expect(this.parentView.myClick).not.toHaveBeenCalled();
        expect(this.childView1.myClick).toHaveBeenCalled();
        expect(this.childView2.myClick).not.toHaveBeenCalled();
      });
    });

    describe('for event handlers registered by View.on', function() {
      it('can trigger event handlers for self and not for children', function() {
        this.parentView.trigger('myEvent');
        expect(this.parentView.afterMyEvent).toHaveBeenCalled();
        expect(this.childView1.afterMyEvent).not.toHaveBeenCalled();
        expect(this.childView2.afterMyEvent).not.toHaveBeenCalled();
      });

      it('can trigger event for one child and not the parent or other child', function() {
        this.childView1.trigger('myEvent');

        expect(this.parentView.afterMyEvent).not.toHaveBeenCalled();
        expect(this.childView1.afterMyEvent).toHaveBeenCalled();
        expect(this.childView2.afterMyEvent).not.toHaveBeenCalled();
      });
    });

    describe('for event handlers registered in _activate', function() {
      it('can trigger event handlers for self and not for children', function() {
        this.parentView.trigger('myDeactivatableEvent');
        expect(this.parentView.afterMyDeactivatableEvent).toHaveBeenCalled();
        expect(this.childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
        expect(this.childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
      });

      it('can trigger event for one child and not the parent or other child', function() {
        this.childView1.trigger('myDeactivatableEvent');

        expect(this.parentView.afterMyDeactivatableEvent).not.toHaveBeenCalled();
        expect(this.childView1.afterMyDeactivatableEvent).toHaveBeenCalled();
        expect(this.childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
      });
    });

  });


  describe('when detatched', function() {
    beforeEach(function() {
      this.parentView.attach(this.injectionSite);
      this.parentView.detach();
    });

    it('children will not be rendered in dom', function() {
      expect(this.injectionContainer.html()).not.toMatch(this.childView1.className);
    });

    it('parent will not be attached to a parent', function() {
      expect(this.parentView.isAttachedToParent()).toBe(false);
    });

    it('children will be attached to parent', function() {
      expect(this.childView1.isAttachedToParent()).toBe(true);
      expect(this.childView2.isAttachedToParent()).toBe(true);
    });

    describe('for event handlers defined in the event hash', function() {
      it('will not trigger event handlers if parent clicked', function() {
        this.parentView.$el.find('.parent').click();

        expect(this.parentView.myClick).not.toHaveBeenCalled();
        expect(this.childView1.myClick).not.toHaveBeenCalled();
        expect(this.childView2.myClick).not.toHaveBeenCalled();
      });

      it('will not trigger event handlers if child clicked', function() {
        this.childView1.$el.find('.child').click();

        expect(this.parentView.myClick).not.toHaveBeenCalled();
        expect(this.childView1.myClick).not.toHaveBeenCalled();
        expect(this.childView2.myClick).not.toHaveBeenCalled();
      });
    });

    describe('for event handlers registered by View.on', function() {
      it('can trigger event handlers for self and not for children', function() {
        this.parentView.trigger('myEvent');
        expect(this.parentView.afterMyEvent).toHaveBeenCalled();
        expect(this.childView1.afterMyEvent).not.toHaveBeenCalled();
        expect(this.childView2.afterMyEvent).not.toHaveBeenCalled();
      });

      it('can trigger event for one child and not the parent or other child', function() {
        this.childView1.trigger('myEvent');

        expect(this.parentView.afterMyEvent).not.toHaveBeenCalled();
        expect(this.childView1.afterMyEvent).toHaveBeenCalled();
        expect(this.childView2.afterMyEvent).not.toHaveBeenCalled();
      });
    });

    describe('for event handlers registered in _activate', function() {
      it('can trigger event handlers for self and not for children', function() {
        this.parentView.trigger('myDeactivatableEvent');
        expect(this.parentView.afterMyDeactivatableEvent).toHaveBeenCalled();
        expect(this.childView1.afterMyDeactivatableEvent).not.toHaveBeenCalled();
        expect(this.childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
      });

      it('can trigger event for one child and not the parent or other child', function() {
        this.childView1.trigger('myDeactivatableEvent');

        expect(this.parentView.afterMyDeactivatableEvent).not.toHaveBeenCalled();
        expect(this.childView1.afterMyDeactivatableEvent).toHaveBeenCalled();
        expect(this.childView2.afterMyDeactivatableEvent).not.toHaveBeenCalled();
      });
    });
  });

});