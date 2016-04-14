var _ = require('underscore');
var TorsoBehavior = require('./../../modules/Behavior');
var TorsoView = require('./../../modules/View');

var spyOnBackbone = require('./helpers/spyOnBackbone');
var setupInjectionSite = require('./helpers/setupInjectionSite');

var ViewWithBehavior = TorsoView.extend({
  behaviors: {
    torsoBehavior: {
      behavior: TorsoBehavior
    }
  }
});

/**
 * @method generateBehaviorTracking
 * @param methodsCalled {Array} to push method descriptor when executed
 * @param methodName {String} to track
 * @return {Torso.Behavior} that will push string to methodsCalled when method executes
 */
function generateBehaviorTracking(methodsCalled, methodName) {
  var classDefinition = {};
  classDefinition[methodName] = function() {
    methodsCalled.push('behavior:' + methodName);
  };
  return TorsoBehavior.extend(classDefinition);
}

/**
 * @method generateViewAndBehaviorTracking
 * @param methodsCalled {Array} to push method descriptor when executed
 * @param methodName {String} to track
 * @return {Torso.View} with behavior
 */
function generateViewAndBehaviorTracking(methodsCalled, methodName) {
  var BehaviorClass = generateBehaviorTracking(methodsCalled, methodName);
  var viewClassDefinition = {
    behaviors: {
      generatedBehavior: {
        behavior: BehaviorClass
      }
    }
  };
  viewClassDefinition[methodName] = function() {
    methodsCalled.push('view:' + methodName);
  };
  return TorsoView.extend(viewClassDefinition);
}

/**
 * Generates Behavior and View class definitions with tracked methods
 * When condition runs, verifies that the behavior's method runs before the view's method
 *
 * @method expectBehaviorMethodToRunBeforeViewMethod
 * @param methodName {String} on behavior and view
 * @param condition {Function} to trigger methods. Will be passed in the generated View class
 */
function expectBehaviorMethodToRunBeforeViewMethod(methodName, condition) {
  var methodsCalled = [];
  var ViewTrackingMethod = generateViewAndBehaviorTracking(methodsCalled, methodName);
  condition(ViewTrackingMethod);

  // TODO: write better matcher
  expect(methodsCalled[0]).toBe('behavior:' + methodName);
  expect(methodsCalled[1]).toBe('view:' + methodName);
}

describe('A Torso Behavior', function() {

  setupInjectionSite.apply(this);

  it('exists', function() {
    expect(TorsoBehavior).toBeDefined();
  });

  it('can be instantiated', function() {
    expect(new TorsoBehavior()).toBeDefined();
  });

  it('can be extended', function() {
    expect(TorsoBehavior.extend).toBeDefined();
  });

  describe('instance', function() {
    beforeEach(function() {
      this.behavior = new TorsoBehavior();
    });

    it('can set and get properties', function() {
      this.behavior.set('property', 'value');
      var property = this.behavior.get('property');
      expect(property).toBe('value');
    });

  });

  describe('when instantiated', function() {
    it('options are passed to initialize', function() {
      var BehaviorWithInitialize = TorsoBehavior.extend({
        initialize: function() {
          this.initializeArguments = arguments;
        }
      });
      var options = {propertyKey: 'propertyValue'};

      var behaviorWithInitialize = new BehaviorWithInitialize(options);
      expect(behaviorWithInitialize.initializeArguments).toBeDefined();
      expect(behaviorWithInitialize.initializeArguments[0]).toEqual(options);
    });

    // Don't override constructor in normal usage of Behavior
    it('arguments are passed to constructor', function() {
      var BehaviorWithConstructor = TorsoBehavior.extend({
        constructor: function() {
          this.constructorArguments = arguments;
          TorsoBehavior.apply(this, arguments);
        }
      });
      var options = {propertyKey: 'propertyValue'};
      var view = new TorsoView();

      var behaviorWithConstructor = new BehaviorWithConstructor(options, view);
      expect(behaviorWithConstructor.constructorArguments[0]).toBe(options);
      expect(behaviorWithConstructor.constructorArguments[1]).toBe(view);
    });

    it('will set reference to view', function() {
      var view = new TorsoView();
      var behaviorCreatedWithView = new TorsoBehavior({view: view});
      expect(behaviorCreatedWithView.view).toBeDefined();
      expect(behaviorCreatedWithView.view).toEqual(view);
    });
  });

  it('A view can reference its behavior using an alias', function() {
    var viewWithBehavior = new ViewWithBehavior();
    var behaviorInView = viewWithBehavior.getBehavior('torsoBehavior');
    expect(behaviorInView).toBeDefined();
  });

  it('Behaviors are not static fields, i.e. they are instantiated per view instance', function() {
    var firstViewWithBehavior = new ViewWithBehavior();
    var secondViewWithBehavior = new ViewWithBehavior();

    var firstBehavior = firstViewWithBehavior.getBehavior('torsoBehavior');
    var secondBehavior = secondViewWithBehavior.getBehavior('torsoBehavior');

    expect(firstBehavior).not.toBe(secondBehavior);
  });

  it('A view can have multiple behaviors distinguished by alias', function() {
    var ViewWithTwoBehaviors = TorsoView.extend({
      behaviors: {
        firstBehavior: {
          behavior: TorsoBehavior
        },
        secondBehavior: {
          behavior: TorsoBehavior
        }
      }
    });
    var viewWithTwoBehaviors = new ViewWithTwoBehaviors();
    var firstBehavior = viewWithTwoBehaviors.getBehavior('firstBehavior');
    expect(firstBehavior).toBeDefined();
    var secondBehavior = viewWithTwoBehaviors.getBehavior('secondBehavior');
    expect(secondBehavior).toBeDefined();
    expect(firstBehavior).not.toBe(secondBehavior);
  });


  it('instantiated as part of a view has a reference to its containing view', function() {
    var viewWithBehavior = new ViewWithBehavior();
    var behaviorInView = viewWithBehavior.getBehavior('torsoBehavior');
    expect(behaviorInView.view).toBeDefined();
    expect(behaviorInView.view).toBe(viewWithBehavior);
  });

  it('if any behavior definition has no "behavior" key, an instantiation-time error will be thrown', function() {
    var ViewWithIncorrectlyDefinedBehavior = TorsoView.extend({
      behaviors: {
        confirmModal: {
        }
      }
    });
    try {
      new ViewWithIncorrectlyDefinedBehavior();
      fail('Expected behavior definition without "behavior" key to throw exception');
    } catch (e) {}
  });

  it('options defined in the view are passed to the behavior in its "initialize"', function() {
    var BehaviorWithInitialize = TorsoBehavior.extend({
      initialize: function() {
        this.initializeArguments = arguments;
      }
    });

    var ViewWithBehaviorWithInitialize = TorsoView.extend({
      behaviors: {
        behaviorWithInitialize: {
          behavior: BehaviorWithInitialize,
          propertyKey: 'propertyValue'
        }
      }
    });
    var viewWithBehaviorWithInitialize = new ViewWithBehaviorWithInitialize();

    var behaviorWithInitialize = viewWithBehaviorWithInitialize.getBehavior('behaviorWithInitialize');
    expect(behaviorWithInitialize.initializeArguments).toBeDefined();
    expect(_.isMatch(behaviorWithInitialize.initializeArguments[0])).toBe(true);
  });

  describe('runs lifecycle methods at the appropriate time', function() {
    it('initialize during view construction', function() {
      var BehaviorWithInitialize = TorsoBehavior.extend({
        initialize: function() {
          this.initialized = true;
        }
      });

      var ViewWithBehaviorWithInitialize = TorsoView.extend({
        behaviors: {
          behaviorWithInitialize: {
            behavior: BehaviorWithInitialize,
            propertyKey: 'propertyValue'
          }
        }
      });

      var viewWithBehaviorWithInitialize = new ViewWithBehaviorWithInitialize();
      var behaviorWithInitialize = viewWithBehaviorWithInitialize.getBehavior('behaviorWithInitialize');
      expect(behaviorWithInitialize.initialized).toBe(true);
    });

    it('prerender before view.updateDOM', function() {
      var methodsCalled = [];
      var BehaviorTrackingPrerender = generateBehaviorTracking(methodsCalled, 'prerender');

      var ViewTrackingUpdateDom = TorsoView.extend({
        behaviors: {
          behaviorTrackingPrerender: {
            behavior: BehaviorTrackingPrerender
          }
        },
        updateDOM: function() {
          methodsCalled.push('view:updateDOM');
        }
      });

      var viewTrackingUpdateDom = new ViewTrackingUpdateDom();
      viewTrackingUpdateDom.render();

      expect(methodsCalled[0]).toBe('behavior:prerender');
      expect(methodsCalled[1]).toBe('view:updateDOM');
    });

    it('postrender after view.updateDOM', function() {
      var methodsCalled = [];
      var BehaviorTrackingPostrender = TorsoBehavior.extend({
        postrender: function() {
          methodsCalled.push('behavior:postrender');
        }
      });
      var ViewTrackingUpdateDom = TorsoView.extend({
        behaviors: {
          behaviorTrackingPrerender: {
            behavior: BehaviorTrackingPostrender
          }
        },
        updateDOM: function() {
          methodsCalled.push('view:updateDOM');
        }
      });

      var viewTrackingUpdateDom = new ViewTrackingUpdateDom();
      viewTrackingUpdateDom.render();

      expect(methodsCalled[0]).toBe('view:updateDOM');
      expect(methodsCalled[1]).toBe('behavior:postrender');
    });

    it('attachTrackedViews after view.updateDOM', function() {
      var methodsCalled = [];
      var BehaviorTrackingAttachTrackedViews = TorsoBehavior.extend({
        attachTrackedViews: function() {
          methodsCalled.push('behavior:attachTrackedViews');
        }
      });
      var ViewTrackingUpdateDom = TorsoView.extend({
        behaviors: {
          behaviorTrackingAttachTrackedViews: {
            behavior: BehaviorTrackingAttachTrackedViews
          }
        },
        updateDOM: function() {
          methodsCalled.push('view:updateDOM');
        }
      });

      var viewTrackingUpdateDom = new ViewTrackingUpdateDom();
      viewTrackingUpdateDom.render();

      expect(methodsCalled[0]).toBe('view:updateDOM');
      expect(methodsCalled[1]).toBe('behavior:attachTrackedViews');
    });



    it('_attached before view._attached', function() {
      var methodsCalled = [];
      var ViewTrackingAttached = generateViewAndBehaviorTracking(methodsCalled, '_attached');
      var viewTrackingAttached = new ViewTrackingAttached();

      viewTrackingAttached.attachTo(this.$app);
      expect(methodsCalled[0]).toBe('behavior:_attached');
      expect(methodsCalled[1]).toBe('view:_attached');
    });

    it('_detached before view._detached', function() {
      var methodsCalled = [];
      var ViewTrackingDetached = generateViewAndBehaviorTracking(methodsCalled, '_detached');
      var viewTrackingDetached = new ViewTrackingDetached();

      viewTrackingDetached.attachTo(this.$app);
      viewTrackingDetached.detach();

      expect(methodsCalled[0]).toBe('behavior:_detached');
      expect(methodsCalled[1]).toBe('view:_detached');
    });

    it('_activate before view._activate', function() {
      var methodsCalled = [];
      var ViewTrackingActivate = generateViewAndBehaviorTracking(methodsCalled, '_activate');
      // Views are activated upon instantiation
      var viewTrackingActivate = new ViewTrackingActivate();

      expect(methodsCalled[0]).toBe('behavior:_activate');
      expect(methodsCalled[1]).toBe('view:_activate');
    });

    it('_deactivate before view._deactivate', function() {
      var methodsCalled = [];
      var ViewTrackingDeactivate = generateViewAndBehaviorTracking(methodsCalled, '_deactivate');
      var viewTrackingDeactivate = new ViewTrackingDeactivate();
      viewTrackingDeactivate.deactivate();

      expect(methodsCalled[0]).toBe('behavior:_deactivate');
      expect(methodsCalled[1]).toBe('view:_deactivate');
    });

    it('_dispose before view._dispose', function() {
      var methodsCalled = [];
      var ViewTrackingDispose = generateViewAndBehaviorTracking(methodsCalled, '_dispose');
      var viewTrackingDispose = new ViewTrackingDispose();
      viewTrackingDispose.dispose();

      expect(methodsCalled[0]).toBe('behavior:_dispose');
      expect(methodsCalled[1]).toBe('view:_dispose');

      function triggerDispose(ViewClass) {
        var viewToDispose = new ViewClass();
        viewToDispose.dispose();
      }
      expectBehaviorMethodToRunBeforeViewMethod('_dispose', triggerDispose);
    });

  });

  describe('events', function() {

    beforeEach(function() {
      // Need to generate class definition each time to reset static spy
      this.BehaviorWithClickEvent = TorsoBehavior.extend({
        events: {
          'click': 'onClick'
        },
        onClick: jasmine.createSpy('onClick')
      });
      expect(this.BehaviorWithClickEvent.prototype.onClick).not.toHaveBeenCalled();
    });

    it('can define events hash with callbacks that fire on view DOM events', function() {
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          behaviorWithClickEvent: {
            behavior: this.BehaviorWithClickEvent
          }
        }
      });

      var viewWithBehavior = new ViewWithBehavior();
      viewWithBehavior.attachTo(this.$app);
      viewWithBehavior.$el.click();

      var behaviorWithClickEvent = viewWithBehavior.getBehavior('behaviorWithClickEvent');
      expect(behaviorWithClickEvent.onClick).toHaveBeenCalled();
    });

    it('callback is run in the context of the behavior', function() {
      var savedContext;
      var BehaviorWithEvent = TorsoBehavior.extend({
        events: {
          'click': 'saveContext'
        },
        saveContext: function() {
          savedContext = this;
        }
      });
      var ViewWithBehavior = TorsoView.extend({
        behaviors: {
          behaviorWithEvent: {
            behavior: BehaviorWithEvent
          }
        }
      });
      var viewWithBehavior = new ViewWithBehavior();
      viewWithBehavior.attachTo(this.$app);
      viewWithBehavior.$el.click();

      var behaviorWithEvent = viewWithBehavior.getBehavior('behaviorWithEvent');
      expect(savedContext).toBe(behaviorWithEvent);
    });

    it('can define events in both view hash and behavior hash', function() {
      var ViewWithBehaviorAndEvent = TorsoView.extend({
        behaviors: {
          behaviorWithClickEvent: {
            behavior: this.BehaviorWithClickEvent
          }
        },
        events: {
          'change': 'onChange'
        },
        onChange: jasmine.createSpy('onChange')
      });

      var viewWithBehaviorAndEvent = new ViewWithBehaviorAndEvent();
      viewWithBehaviorAndEvent.attachTo(this.$app);
      viewWithBehaviorAndEvent.$el.click();
      viewWithBehaviorAndEvent.$el.change();
      var behaviorWithClickEvent = viewWithBehaviorAndEvent.getBehavior('behaviorWithClickEvent');

      expect(viewWithBehaviorAndEvent.onChange).toHaveBeenCalled();
      expect(behaviorWithClickEvent.onClick).toHaveBeenCalled();
    });

    describe('if view.events is a method', function() {
      it('can still fire events on view and behavior', function() {
        var ViewWithBehaviorAndEvent = TorsoView.extend({
          behaviors: {
            behaviorWithClickEvent: {
              behavior: this.BehaviorWithClickEvent
            }
          },
          events: function() {
            return {
              'change': 'onChange'
            };
          },
          onChange: jasmine.createSpy('onChange')
        });

        var viewWithBehaviorAndEvent = new ViewWithBehaviorAndEvent();
        viewWithBehaviorAndEvent.attachTo(this.$app);
        viewWithBehaviorAndEvent.$el.click();
        viewWithBehaviorAndEvent.$el.change();
        var behaviorWithClickEvent = viewWithBehaviorAndEvent.getBehavior('behaviorWithClickEvent');

        expect(viewWithBehaviorAndEvent.onChange).toHaveBeenCalled();
        expect(behaviorWithClickEvent.onClick).toHaveBeenCalled();
      });

      it('view.events is run in the context of the view', function() {
        var savedContext;
        var ViewWithBehaviorAndEvent = TorsoView.extend({
          behaviors: {
            behaviorWithClickEvent: {
              behavior: this.BehaviorWithClickEvent
            }
          },
          events: function() {
            savedContext = this;
            return {
              'change': 'onChange'
            };
          },
          onChange: jasmine.createSpy('onChange')
        });

        var viewWithBehaviorAndEvent = new ViewWithBehaviorAndEvent();

        expect(savedContext).toBe(viewWithBehaviorAndEvent);
      });
    });

    it('if duplicate events are defined in view and behavior event hash, only view handler runs', function() {
      var ViewWithBehaviorAndEvent = TorsoView.extend({
        behaviors: {
          behaviorWithClickEvent: {
            behavior: this.BehaviorWithClickEvent
          }
        },
        events: {
          'click': 'onClick'
        },
        onClick: jasmine.createSpy('onClick')
      });

      var viewWithBehaviorAndEvent = new ViewWithBehaviorAndEvent();
      viewWithBehaviorAndEvent.attachTo(this.$app);
      viewWithBehaviorAndEvent.$el.click();
      var behaviorWithClickEvent = viewWithBehaviorAndEvent.getBehavior('behaviorWithClickEvent');

      expect(viewWithBehaviorAndEvent.onClick).toHaveBeenCalled();
      expect(behaviorWithClickEvent.onClick).not.toHaveBeenCalled();
    });

  });

});

