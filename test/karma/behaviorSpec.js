var _ = require('underscore');
var TorsoBehavior = require('./../../modules/Behavior');
var TorsoView = require('./../../modules/View');

var setupInjectionSite = require('./helpers/setupInjectionSite');

var ViewWithBehavior = TorsoView.extend({
  behaviors: {
    torsoBehavior: {
      behavior: TorsoBehavior
    }
  }
});

var ViewWithSimplifiedBehavior = TorsoView.extend({
    behaviors: {
        torsoBehavior: TorsoBehavior
    }
});

var BehaviorRecordingInitializeArguments = TorsoBehavior.extend({
  initialize: function() {
    this.initializeArguments = arguments;
  }
});

describe('A Torso Behavior', function() {

  setupInjectionSite.apply(this);

  it('exists', function() {
    expect(TorsoBehavior).toBeDefined();
  });

  it('can be extended', function() {
    expect(TorsoBehavior.extend).toBeDefined();
  });

  describe('instance', function() {
    beforeEach(function() {
      var behaviorOptions = {
        alias: 'foo',
        view: new TorsoView()
      };
      this.behavior = new TorsoBehavior(behaviorOptions);
    });

    it('can set and get properties', function() {
      this.behavior.set('property', 'value');
      var property = this.behavior.get('property');
      expect(property).toBe('value');
    });

  });

  describe('when instantiated', function() {

    it('accepts a view as an option', function() {
      var behaviorOptions = {
        alias: 'foo',
        view: new TorsoView()
      };
      expect(new TorsoBehavior(behaviorOptions)).toBeDefined();
    });

    it('throws an error if not instantiated with a view', function() {
      try {
        new TorsoBehavior({ alias: 'foo' });
        fail('Expected error');
      } catch (e) {}
    });

    it('throws an error if not instantiated with an alias', function() {
      try {
        new TorsoBehavior({ view: new TorsoView() });
        fail('Expected error');
      } catch (e) {}
    });

    it('options are passed to initialize', function() {
      var BehaviorWithInitialize = TorsoBehavior.extend({
        initialize: function() {
          this.initializeArguments = arguments;
        }
      });
      var options = {
        propertyKey: 'propertyValue',
        alias: 'foo',
        view: (new TorsoView())
      };

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
      var options = {
        propertyKey: 'propertyValue',
        alias: 'foo',
        view: (new TorsoView())
      };

      var behaviorWithConstructor = new BehaviorWithConstructor(options);
      expect(behaviorWithConstructor.constructorArguments[0]).toBe(options);
    });

    it('will set reference to view', function() {
      var view = new TorsoView();
      var behaviorCreatedWithView = new TorsoBehavior({ alias: 'foo', view: view});
      expect(behaviorCreatedWithView.view).toBeDefined();
      expect(behaviorCreatedWithView.view).toEqual(view);
    });

    it('will have its alias set on the instance', function() {
      var view = new (TorsoView.extend({
        behaviors: {
          behaviorAlias1: {
            behavior: TorsoBehavior
          },
          behaviorAlias2: {
            behavior: TorsoBehavior
          }
        }
      }))();
      expect(view.getBehavior('behaviorAlias1').alias).toBe('behaviorAlias1');
      expect(view.getBehavior('behaviorAlias2').alias).toBe('behaviorAlias2');
    });
  });

  describe('with a prepare method', function() {
    var BehaviorClassWithPrepare = TorsoBehavior.extend({
      context: 'behavior',
      prepare: function() {
        return {
          from: 'behavior',
          context: this.context
        }
      }
    });

    it('can add to the view\'s prepare context as a property that matches the behavior\'s alias', function() {
      var view = new (TorsoView.extend({
        behaviors: {
          behaviorAlias: {
            behavior: BehaviorClassWithPrepare
          }
        }
      }))();
      expect(view.prepare().behaviorAlias).toBeDefined();
      expect(view.prepare().behaviorAlias.from).toBe('behavior');
    });

    it('can combine the prepare results from two behaviors on the same view', function() {
      var view = new (TorsoView.extend({
        behaviors: {
          behaviorAlias1: {
            behavior: BehaviorClassWithPrepare
          },
          behaviorAlias2: {
            behavior: BehaviorClassWithPrepare
          }
        }
      }))();
      expect(view.prepare().behaviorAlias1).toBeDefined();
      expect(view.prepare().behaviorAlias1.from).toBe('behavior');
      expect(view.prepare().behaviorAlias2).toBeDefined();
      expect(view.prepare().behaviorAlias2.from).toBe('behavior');
    });

    it('will run the view\'s prepare using the view as the context', function() {
      var view = new (TorsoView.extend({
        context: 'view',
        behaviors: {
          behaviorAlias: {
            behavior: BehaviorClassWithPrepare
          }
        },
        prepare: function() {
          return {
            context: this.context
          };
        }
      }))();
      expect(view.prepare().context).toBe('view');
    });

    it('will run the behavior\'s prepare using the behavior as the context', function() {
      var view = new (TorsoView.extend({
        context: 'view',
        behaviors: {
          behaviorAlias: {
            behavior: BehaviorClassWithPrepare
          }
        },
        prepare: function() {
          return {
            context: this.context
          };
        }
      }))();
      expect(view.prepare().behaviorAlias).toBeDefined();
      expect(view.prepare().behaviorAlias.context).toBe('behavior');
    });
  });

  describe('with local data', function() {
    var BehaviorClassWithData = TorsoBehavior.extend({
      initialize: function() {
        this.set('localData', 'hello');
      }
    });

    it('will have the data added to the view\'s prepare', function() {
      var view = new (TorsoView.extend({
        behaviors: {
          behaviorAlias: {
            behavior: BehaviorClassWithData
          }
        }
      }))();
      expect(view.prepare().behaviorAlias).toBeDefined();
      expect(view.prepare().behaviorAlias.localData).toBe('hello');
    });

    it('will have the data added to the view\'s prepare from two behaviors', function() {
      var view = new (TorsoView.extend({
        behaviors: {
          behaviorAlias1: {
            behavior: BehaviorClassWithData
          },
          behaviorAlias2: {
            behavior: BehaviorClassWithData
          }
        }
      }))();
      expect(view.prepare().behaviorAlias1).toBeDefined();
      expect(view.prepare().behaviorAlias1.localData).toBe('hello');
      expect(view.prepare().behaviorAlias2).toBeDefined();
      expect(view.prepare().behaviorAlias2.localData).toBe('hello');
    })
  });

  describe('with local data and prepare', function() {
    var BehaviorClassWithDataAndPrepare = TorsoBehavior.extend({
      initialize: function() {
        this.set('localData', 'hello');
        this.set('from', 'data');
      },
      prepare: function() {
        return {
          from: 'prepare',
          prepareData: 'anything'
        }
      }
    });

    it('will have the data and prepare added to the view\'s prepare', function() {
      var view = new (TorsoView.extend({
        behaviors: {
          behaviorAlias: {
            behavior: BehaviorClassWithDataAndPrepare
          }
        }
      }))();
      expect(view.prepare().behaviorAlias).toBeDefined();
      expect(view.prepare().behaviorAlias.localData).toBe('hello');
      expect(view.prepare().behaviorAlias.prepareData).toBe('anything');
    });

    it('will overwrite the behavior\'s data with results from the behavior\'s prepare', function() {
      var view = new (TorsoView.extend({
        behaviors: {
          behaviorAlias: {
            behavior: BehaviorClassWithDataAndPrepare
          }
        }
      }))();
      expect(view.prepare().behaviorAlias).toBeDefined();
      expect(view.prepare().behaviorAlias.from).toBe('prepare');
    });

    it('will have the data added to the view\'s prepare from two behaviors', function() {
      var view = new (TorsoView.extend({
        behaviors: {
          behaviorAlias1: {
            behavior: BehaviorClassWithDataAndPrepare
          },
          behaviorAlias2: {
            behavior: BehaviorClassWithDataAndPrepare
          }
        }
      }))();
      expect(view.prepare().behaviorAlias1).toBeDefined();
      expect(view.prepare().behaviorAlias1.localData).toBe('hello');
      expect(view.prepare().behaviorAlias1.prepareData).toBe('anything');
      expect(view.prepare().behaviorAlias2).toBeDefined();
      expect(view.prepare().behaviorAlias2.localData).toBe('hello');
      expect(view.prepare().behaviorAlias2.prepareData).toBe('anything');
    })
  });

  describe('using the mixin field', function() {

    it('will add to the view\'s public API', function() {
      var BehaviorWithMixin = TorsoBehavior.extend({
        addToFoo: function() {
          this.set('foo', this.has('foo') ? this.get('foo') + 1 : 1);
        },

        mixin: {
          addAndGetFoo: function() {
            this.addToFoo();
            return this.get('foo');
          }
        }
      });
      var ViewWithMixinBehavior = TorsoView.extend({
        behaviors: {
          foo: {
            behavior: BehaviorWithMixin
          }
        }
      });
      var view = new ViewWithMixinBehavior();
      expect(view.addAndGetFoo).toBeDefined();
      expect(view.addToFoo).not.toBeDefined();
      expect(view.addAndGetFoo()).toBe(1);
      expect(view.addAndGetFoo()).toBe(2);
    });

    it('will not override a view\'s method', function() {
      var BehaviorWithMixin = TorsoBehavior.extend({
        mixin: {
          getFoo: function() {
            return 'behavior-foo';
          }
        }
      });
      var ViewWithMixinBehavior = TorsoView.extend({
        behaviors: {
          foo: {
            behavior: BehaviorWithMixin
          }
        },

        initialize: function() {
          this.set('foo', 'view-foo');
        },

        getFoo: function() {
          return this.get('foo');
        }
      });
      var view = new ViewWithMixinBehavior();
      expect(view.getFoo).toBeDefined();
      expect(view.getFoo()).toBe('view-foo');
    });
  });

  it('A view can reference its behavior using an alias', function() {
    var viewWithBehavior = new ViewWithBehavior();
    var behaviorInView = viewWithBehavior.getBehavior('torsoBehavior');
    expect(behaviorInView).toBeDefined();
  });

  it('A view can reference its behavior using an alias when the simplified syntax is used', function() {
      var viewWithSimplifiedBehavior = new ViewWithSimplifiedBehavior();
      var behaviorInView = viewWithSimplifiedBehavior.getBehavior('torsoBehavior');
      expect(behaviorInView).toBeDefined();
  });

  it('are not static fields on view, i.e. they are instantiated per view instance', function() {
    var firstViewWithBehavior = new ViewWithBehavior();
    var secondViewWithBehavior = new ViewWithBehavior();

    var firstBehavior = firstViewWithBehavior.getBehavior('torsoBehavior');
    var secondBehavior = secondViewWithBehavior.getBehavior('torsoBehavior');

    expect(firstBehavior).not.toBe(secondBehavior);
  });

  it('are not static fields on view when the simplified syntax is used, i.e. they are instantiated per view instance', function() {
      var firstViewWithSimplifiedBehavior = new ViewWithSimplifiedBehavior();
      var secondViewWithSimplifiedBehavior = new ViewWithSimplifiedBehavior();

      var firstBehavior = firstViewWithSimplifiedBehavior.getBehavior('torsoBehavior');
      var secondBehavior = secondViewWithSimplifiedBehavior.getBehavior('torsoBehavior');

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

  it('A view can have multiple behaviors distinguished by alias when the simplified syntax is used', function() {
      var ViewWithTwoSimplifiedBehaviors = TorsoView.extend({
          behaviors: {
              firstBehavior: TorsoBehavior,
              secondBehavior: TorsoBehavior
          }
      });
      var viewWithTwoSimplifiedBehaviors = new ViewWithTwoSimplifiedBehaviors();
      var firstBehavior = viewWithTwoSimplifiedBehaviors.getBehavior('firstBehavior');
      expect(firstBehavior).toBeDefined();
      var secondBehavior = viewWithTwoSimplifiedBehaviors.getBehavior('secondBehavior');
      expect(secondBehavior).toBeDefined();
      expect(firstBehavior).not.toBe(secondBehavior);
  });

  it('instantiated as part of a view has a reference to its containing view', function() {
    var viewWithBehavior = new ViewWithBehavior();
    var behaviorInView = viewWithBehavior.getBehavior('torsoBehavior');
    expect(behaviorInView.view).toBeDefined();
    expect(behaviorInView.view).toBe(viewWithBehavior);
  });

  it('instantiated as part of a view has a reference to its containing view when the simplified syntax is used', function() {
      var viewWithSimplifiedBehavior = new ViewWithSimplifiedBehavior();
      var behaviorInView = viewWithSimplifiedBehavior.getBehavior('torsoBehavior');
      expect(behaviorInView.view).toBeDefined();
      expect(behaviorInView.view).toBe(viewWithSimplifiedBehavior);
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

  it('behavior options defined in the view are passed to the behavior in its "initialize"', function() {
    var ViewWithBehaviorWithInitialize = TorsoView.extend({
      behaviors: {
        behaviorRecordingInitializeArguments: {
          behavior: BehaviorRecordingInitializeArguments,
          propertyKey: 'propertyValue'
        }
      }
    });
    var viewWithBehaviorWithInitialize = new ViewWithBehaviorWithInitialize();

    var behaviorRecordingInitializeArguments = viewWithBehaviorWithInitialize.getBehavior('behaviorRecordingInitializeArguments');
    expect(behaviorRecordingInitializeArguments.initializeArguments).toBeDefined();
    var recordedBehaviorOptions = behaviorRecordingInitializeArguments.initializeArguments[0];
    expect(_.isMatch(recordedBehaviorOptions, {propertyKey: 'propertyValue'})).toBe(true);
  });

  it('view options are passed to behavior initialize as second argument', function() {
    var viewOptions = {propertyKey: 'propertyValue'};

    var ViewWithBehavior = TorsoView.extend({
      behaviors: {
        behaviorRecordingInitializeArguments: {
          behavior: BehaviorRecordingInitializeArguments
        }
      }
    });

    var viewWithBehavior = new ViewWithBehavior(viewOptions);
    var behaviorRecordingInitializeArguments = viewWithBehavior.getBehavior('behaviorRecordingInitializeArguments');
    expect(behaviorRecordingInitializeArguments.initializeArguments).toBeDefined();
    var recordedViewOptions = behaviorRecordingInitializeArguments.initializeArguments[1];
    expect(_.isMatch(recordedViewOptions, viewOptions)).toBe(true);
  });

  it('view options are passed to behavior initialize as second argument when the simplified syntax is used', function() {
      var viewOptions = {propertyKey: 'propertyValue'};

      var ViewWithSimplifiedBehavior = TorsoView.extend({
          behaviors: {
              behaviorRecordingInitializeArguments: BehaviorRecordingInitializeArguments
          }
      });

      var viewWithSimplifiedBehavior = new ViewWithSimplifiedBehavior(viewOptions);
      var behaviorRecordingInitializeArguments = viewWithSimplifiedBehavior.getBehavior('behaviorRecordingInitializeArguments');
      expect(behaviorRecordingInitializeArguments.initializeArguments).toBeDefined();
      var recordedViewOptions = behaviorRecordingInitializeArguments.initializeArguments[1];
      expect(_.isMatch(recordedViewOptions, viewOptions)).toBe(true);
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
      var BehaviorTrackingPrerender = TorsoBehavior.extend({
        prerender: function() {
          methodsCalled.push('behavior:prerender');
        }
      });

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
      var BehaviorTrackingAttached = TorsoBehavior.extend({
        _attached: function() {
          methodsCalled.push('behavior:_attached');
        }
      });
      var ViewTrackingAttached = TorsoView.extend({
        behaviors: {
          behaviorTrackingAttached: {
            behavior: BehaviorTrackingAttached
          }
        },
        _attached: function() {
          methodsCalled.push('view:_attached');
        }
      });
      var viewTrackingAttached = new ViewTrackingAttached();

      viewTrackingAttached.attachTo(this.$app);
      expect(methodsCalled[0]).toBe('behavior:_attached');
      expect(methodsCalled[1]).toBe('view:_attached');
    });

    it('_detached before view._detached', function() {
      var methodsCalled = [];
      var BehaviorTrackingDetached = TorsoBehavior.extend({
        _detached: function() {
          methodsCalled.push('behavior:_detached');
        }
      });
      var ViewTrackingDetached = TorsoView.extend({
        behaviors: {
          behaviorTrackingDetached: {
            behavior: BehaviorTrackingDetached
          }
        },
        _detached: function() {
          methodsCalled.push('view:_detached');
        }
      });

      var viewTrackingDetached = new ViewTrackingDetached();

      viewTrackingDetached.attachTo(this.$app);
      viewTrackingDetached.detach();

      expect(methodsCalled[0]).toBe('behavior:_detached');
      expect(methodsCalled[1]).toBe('view:_detached');
    });

    it('_activate before view._activate', function() {
      var methodsCalled = [];
      var BehaviorTrackingActivate = TorsoBehavior.extend({
        _activate: function() {
          methodsCalled.push('behavior:_activate');
        }
      });
      var ViewTrackingActivate = TorsoView.extend({
        behaviors: {
          behaviorTrackingActivate: {
            behavior: BehaviorTrackingActivate
          }
        },
        _activate: function() {
          methodsCalled.push('view:_activate');
        }
      });

      // Views are activated upon instantiation
      var viewTrackingActivate = new ViewTrackingActivate();

      expect(methodsCalled[0]).toBe('behavior:_activate');
      expect(methodsCalled[1]).toBe('view:_activate');
    });

    it('_deactivate before view._deactivate', function() {
      var methodsCalled = [];
      var BehaviorTrackingDeactivate = TorsoBehavior.extend({
        _deactivate: function() {
          methodsCalled.push('behavior:_deactivate');
        }
      });
      var ViewTrackingDeactivate = TorsoView.extend({
        behaviors: {
          behaviorTrackingDeactivate: {
            behavior: BehaviorTrackingDeactivate
          }
        },
        _deactivate: function() {
          methodsCalled.push('view:_deactivate');
        }
      });

      var viewTrackingDeactivate = new ViewTrackingDeactivate();
      viewTrackingDeactivate.deactivate();

      expect(methodsCalled[0]).toBe('behavior:_deactivate');
      expect(methodsCalled[1]).toBe('view:_deactivate');
    });

    it('_dispose before view._dispose', function() {
      var methodsCalled = [];
      var BehaviorTrackingDispose = TorsoBehavior.extend({
        _dispose: function() {
          methodsCalled.push('behavior:_dispose');
        }
      });
      var ViewTrackingDispose = TorsoView.extend({
        behaviors: {
          behaviorTrackingDispose: {
            behavior: BehaviorTrackingDispose
          }
        },
        _dispose: function() {
          methodsCalled.push('view:_dispose');
        }
      });

      var viewTrackingDispose = new ViewTrackingDispose();
      viewTrackingDispose.dispose();

      expect(methodsCalled[0]).toBe('behavior:_dispose');
      expect(methodsCalled[1]).toBe('view:_dispose');
    });

    it('if view has multiple behaviors, lifecycle methods run in order of behavior definition', function() {
      var methodsCalled = [];
      var BehaviorOneTrackingAttached = TorsoBehavior.extend({
        _attached: function() {
          methodsCalled.push('behaviorOne:_attached');
        }
      });
      var BehaviorTwoTrackingAttached = TorsoBehavior.extend({
        _attached: function() {
          methodsCalled.push('behaviorTwo:_attached');
        }
      });
      var ViewWithBehaviorOneFirst = TorsoView.extend({
        behaviors: {
          one: {
            behavior: BehaviorOneTrackingAttached
          },
          two: {
            behavior: BehaviorTwoTrackingAttached
          }
        }
      });
      var viewWithBehaviorOneFirst = new ViewWithBehaviorOneFirst();
      viewWithBehaviorOneFirst.attachTo(this.$app);

      expect(methodsCalled[0]).toBe('behaviorOne:_attached');
      expect(methodsCalled[1]).toBe('behaviorTwo:_attached');
      viewWithBehaviorOneFirst.detach();

      methodsCalled = [];
      var ViewWithBehaviorTwoFirst = TorsoView.extend({
        behaviors: {
          two: {
            behavior: BehaviorTwoTrackingAttached
          },
          one: {
            behavior: BehaviorOneTrackingAttached
          }
        }
      });
      var viewWithBehaviorTwoFirst = new ViewWithBehaviorTwoFirst();
      viewWithBehaviorTwoFirst.attachTo(this.$app);
      expect(methodsCalled[0]).toBe('behaviorTwo:_attached');
      expect(methodsCalled[1]).toBe('behaviorOne:_attached');
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

    it('if duplicate events are defined in view and behavior event hash, both events run', function() {
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
      expect(behaviorWithClickEvent.onClick).toHaveBeenCalled();
    });

    it('if we have multiple behaviors with the same event then both event callbacks will run', function() {
      var SecondBehaviorWithClickEvent = TorsoBehavior.extend({
        events:{
          'click':'onClick'
        },
        onClick: jasmine.createSpy('onClick')
      });

      var ViewWithTwoBehaviors = TorsoView.extend({
        behaviors: {
          firstBehavior: {
            behavior: this.BehaviorWithClickEvent
          },
          secondBehavior: {
            behavior: SecondBehaviorWithClickEvent
          }
        }
      });
      var viewWithTwoBehaviors = new ViewWithTwoBehaviors();
      viewWithTwoBehaviors.attachTo(this.$app);
      viewWithTwoBehaviors.$el.click();
      var firstBehavior = viewWithTwoBehaviors.getBehavior('firstBehavior');
      var secondBehavior = viewWithTwoBehaviors.getBehavior('secondBehavior');

      expect(firstBehavior.onClick).toHaveBeenCalled();
      expect(secondBehavior.onClick).toHaveBeenCalled();
    });
  });

});





