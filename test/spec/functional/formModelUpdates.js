// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A Form Model, as object models are updated,', function() {

  var testModel, testModel2, testFormModel, TestModel, TestModel2, FormModel, env;

  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      TestModel = require(testSrcPath + '/TestModel')(env.window.Torso.NestedModel),
      TestModel2 = require(testSrcPath + '/TestModel2')(env.window.Torso.NestedModel),
      FormModel = env.window.Torso.FormModel;
      testModel = new TestModel();
      testModel2 = new TestModel2();
      done();
    });
  });

  //********** Updates ***********//

  describe('when new data arrives from one or more object models', function() {
    it('can, if triggered to do so, be updated', function() {
      var testFormModel = new FormModel({}, {
        mapping: {
          testModel: true
        },
        models: {
          testModel: testModel
        }
      });
      expect(testFormModel.get('foo')).toBe(123);
      expect(testFormModel.get('bar')).toBe('test');
      expect(testFormModel.get('obj.a')).toBe(1);
      expect(testFormModel.get('obj.c.d')).toBe(true);
      testFormModel.startUpdating();
      testModel.set('foo', 555);
      expect(testFormModel.get('foo')).toBe(555);
      expect(testModel.get('foo')).toBe(555);
      testModel.set('bar', 'new value');
      expect(testFormModel.get('bar')).toBe('new value');
      expect(testModel.get('bar')).toBe('new value');
      testModel.set('obj.a', 10);
      expect(testFormModel.get('obj.a')).toBe(10);
      expect(testModel.get('obj.a')).toBe(10);
      testModel.set('obj.c.d', false);
      expect(testFormModel.get('obj.c.d')).toBe(false);
      expect(testModel.get('obj.c.d')).toBe(false);
      testFormModel.stopUpdating();
    });

    it('can, if triggered to do so, update only subset of fields', function() {
      var fewFieldFormModel;
      testModel.set('foo', 555);
      fewFieldFormModel = new FormModel({}, {
        mapping: {
          testModel: 'foo'
        },
        models: {
          testModel: testModel
        }
      });
      fewFieldFormModel.startUpdating();
      expect(fewFieldFormModel.get('foo')).toBe(555);
      expect(testModel.get('foo')).toBe(555);
      testModel.set('foo', 1000);
      expect(fewFieldFormModel.get('foo')).toBe(1000);
      fewFieldFormModel.stopUpdating();
    });

    it('can, if triggered to do so, update computed fields', function() {
      var combinedFormModel;
      testModel.set('foo', 123);
      testModel.set('bar', 'test');
      expect(testModel.get('foo')).toBe(123);
      expect(testModel.get('bar')).toBe('test');
      combinedFormModel = new FormModel({}, {
        mapping: {
          fooBar: {
            testModel: 'foo bar',
            pull: function(models) {
              this.set('fooBar', models.testModel.foo + ' ' + models.testModel.bar);
            }
          }
        },
        models: {
          testModel: testModel
        }
      });
      expect(combinedFormModel.get('fooBar')).toBe('123 test');
      testModel.set('bar', 'should not change');
      expect(combinedFormModel.get('fooBar')).toBe('123 test');
      combinedFormModel.startUpdating();
      testModel.set('bar', 'new value');
      expect(combinedFormModel.get('fooBar')).toBe('123 new value');
    });

    it('can, if triggered to do so, update nested fields', function() {
      var testFormModel = new FormModel({}, {
        mapping: {
          testModel: true
        },
        models: {
          testModel: testModel
        }
      });
      expect(testFormModel.get('obj.c.d')).toBe(true);
      expect(testFormModel.get('obj').c.d).toBe(true);
      testFormModel.startUpdating();
      testModel.set('obj.c.d', false);
      expect(testFormModel.get('obj.c.d')).toBe(false);
      expect(testFormModel.get('obj').c.d).toBe(false);
      testFormModel.stopUpdating();
    });

    it('can, if triggered to do so, update nested fields when only listening to subset of fields', function() {
      var testFormModel = new FormModel({}, {
        mapping: {
          testModel: 'obj.c'
        },
        models: {
          testModel: testModel
        }
      });
      expect(testFormModel.get('obj.c.d')).toBe(true);
      testFormModel.startUpdating();
      testModel.set('obj.c.d', false);
      expect(testFormModel.get('obj.c.d')).toBe(false);
      testFormModel.stopUpdating();
      testModel.set('obj.c.d', true);
      expect(testFormModel.get('obj.c.d')).toBe(false);

      testFormModel = new FormModel({}, {model: testModel,
        mapping: {
          testModel: 'obj.c.d'
        },
        models: {
          testModel: testModel
        }
      });
      expect(testFormModel.get('obj.c.d')).toBe(true);
      testFormModel.startUpdating();
      testModel.set('obj.c', {d: false});
      expect(testFormModel.get('obj.c.d')).toBe(false);
      testFormModel.stopUpdating();
      testModel.set('obj.c', {d: true});
      expect(testFormModel.get('obj.c.d')).toBe(false);
    });
  });


  it('can, if triggered to do so, stop being updated when new data arrives from the Object Model', function() {
    var fewFieldFormModel,
      testFormModel = new FormModel({}, {
        mapping: {
          testModel: true
        },
        models: {
          testModel: testModel
        }
      });
    testFormModel.startUpdating();
    testFormModel.stopUpdating();

    testModel.set('foo', 555);
    expect(testFormModel.get('foo')).toBe(123);
    expect(testModel.get('foo')).toBe(555);
    testModel.set('bar', 'new value');
    expect(testFormModel.get('bar')).toBe('test');
    expect(testModel.get('bar')).toBe('new value');
    testModel.set('obj.a', 10);
    expect(testFormModel.get('obj.a')).toBe(1);
    expect(testModel.get('obj.a')).toBe(10);
    testModel.set('obj.c.d', false);
    expect(testFormModel.get('obj.c.d')).toBe(true);
    expect(testModel.get('obj.c.d')).toBe(false);

    fewFieldFormModel = new FormModel({}, {
        mapping: {
          testModel: 'foo'
        },
        models: {
          testModel: testModel
        }
      });
    fewFieldFormModel.startUpdating();
    fewFieldFormModel.stopUpdating();
    expect(fewFieldFormModel.get('foo')).toBe(555);
    expect(testModel.get('foo')).toBe(555);
    testModel.set('foo', 1000);
    expect(fewFieldFormModel.get('foo')).toBe(555);

  });

  it('can toggle being updated when new data arrives from the Object Model', function() {
    var testFormModel = new FormModel({}, {
        mapping: {
          testModel: true
        },
        models: {
          testModel: testModel
        }
      });
    testFormModel.startUpdating();
    testFormModel.stopUpdating();
    testModel.set('foo', 555);
    expect(testFormModel.get('foo')).toBe(123);
    expect(testModel.get('foo')).toBe(555);
    testFormModel.startUpdating();
    testModel.set('foo', 1000);
    expect(testFormModel.get('foo')).toBe(1000);
    expect(testModel.get('foo')).toBe(1000);
    testFormModel.stopUpdating();
  });

  it('does not automatically update when new data arrives from the Object Model', function() {
    var fewFieldFormModel,
      testFormModel = new FormModel({}, {
        mapping: {
          testModel: true
        },
        models: {
          testModel: testModel
        }
      });
    testModel.set('foo', 555);
    expect(testFormModel.get('foo')).toBe(123);
    expect(testModel.get('foo')).toBe(555);
    testModel.set('bar', 'new value');
    expect(testFormModel.get('bar')).toBe('test');
    expect(testModel.get('bar')).toBe('new value');
    testModel.set('obj.a', 10);
    expect(testFormModel.get('obj.a')).toBe(1);
    expect(testModel.get('obj.a')).toBe(10);
    testModel.set('obj.c.d', false);
    expect(testFormModel.get('obj.c.d')).toBe(true);
    expect(testModel.get('obj.c.d')).toBe(false);

    fewFieldFormModel = new FormModel({}, {
        mapping: {
          testModel: 'foo'
        },
        models: {
          testModel: testModel
        }
      });
    expect(fewFieldFormModel.get('foo')).toBe(555);
    expect(testModel.get('foo')).toBe(555);
    testModel.set('foo', 1000);
    expect(fewFieldFormModel.get('foo')).toBe(555);
  });

  it('updates to the Form Model do not automatically affect the Object Model(s) without explicit call to save', function() {
    var testFormModel = new FormModel({}, {
        mapping: {
          testModel: true
        },
        models: {
          testModel: testModel
        }
      });
    testFormModel.set('foo', 555);
    expect(testModel.get('foo')).toBe(123);
    expect(testFormModel.get('foo')).toBe(555);
    testFormModel.set('bar', 'new value');
    expect(testModel.get('bar')).toBe('test');
    expect(testFormModel.get('bar')).toBe('new value');
    testFormModel.set('obj.a', 10);
    expect(testModel.get('obj.a')).toBe(1);
    expect(testFormModel.get('obj.a')).toBe(10);
    testFormModel.set('obj.c.d', false);
    expect(testModel.get('obj.c.d')).toBe(true);
    expect(testFormModel.get('obj.c.d')).toBe(false);
  });
});