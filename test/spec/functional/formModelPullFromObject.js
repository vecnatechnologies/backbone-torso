// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A Form Model when it pulls from object models', function() {

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

  //********** Pull ************//

  it('can pull simple, one-depth attributes from an Object Model', function() {
    var testFormModel = new FormModel({}, {model: testModel});
    expect(testFormModel.get('foo')).toBe(123);
    expect(testFormModel.get('bar')).toBe('test');
  });

  it('can pull simple, one-depth attributes from an Object Model and compute another value', function() {
    var computedFormModel;
    expect(testModel.get('foo')).toBe(123);
    computedFormModel = new FormModel({}, {
      computed: [{
        models: [{model: testModel, fields: ['foo']}],
        pull: function(foo) {
          this.set('myFoo', -foo);
        }
      }]
    });
    expect(computedFormModel.get('myFoo')).toBe(-123);
  });

  it('can pull only select simple, one-depth attributes from an Object Model', function() {
    var fewFieldFormModel = new FormModel({}, {model: testModel, fields: ['foo']});
    expect(fewFieldFormModel.get('foo')).toBe(123);
    expect(fewFieldFormModel.get('bar')).not.toBe('test');
  });

  it('can pull nested attributes from an Object Model', function() {
    var testFormModel2,
      testFormModel = new FormModel({}, {model: testModel});
    expect(testFormModel.get('obj').c.d).toBe(true);
    testFormModel2 = new FormModel({}, {model: testModel2});
    expect(testFormModel2.get('ingredients[0].name')).toBe('flour');
    expect(testFormModel2.get('ingredients[1].name')).toBe('dye');
    expect(testFormModel2.get('ingredients[2].name')).toBe('sugar');
  });

  it('can pull only select nested attributes from an Object Model', function() {
    var doubleNestedFormModel, testFormModel2,
      fewFieldFormModel = new FormModel({}, {model: testModel, fields: ['obj.a', 'obj.b']});
    expect(fewFieldFormModel.get('obj').a).toBe(1);
    expect(fewFieldFormModel.get('obj').b).toBe('b value');
    expect(fewFieldFormModel.get('obj').c).not.toBeDefined();

    doubleNestedFormModel = new FormModel({}, {model: testModel, fields: ['obj.c.d']});
    expect(doubleNestedFormModel.get('obj').a).not.toBeDefined();
    expect(doubleNestedFormModel.get('obj').b).not.toBeDefined();
    expect(doubleNestedFormModel.get('obj').c.d).toBe(true);

    testFormModel2 = new FormModel({}, {model: testModel2, fields: ['ingredients[0]', 'ingredients[1]']});
    expect(testFormModel2.get('ingredients[0].name')).toBe('flour');
    expect(testFormModel2.get('ingredients[1].name')).toBe('dye');
    expect(testFormModel2.get('ingredients[2].name')).not.toBeDefined();
  });

  it('can pull simple, one-depth attributes from multiple Object Models', function() {
    var combinedFormModel = new FormModel({}, {models: [{model: testModel}, {model: testModel2}]});
    expect(combinedFormModel.get('foo')).toBe(123);
    expect(combinedFormModel.get('bar')).toBe('test');
    expect(combinedFormModel.get('pieces')).toBe(5);
    expect(combinedFormModel.get('color')).toBe('red');
  });

  it('can pull only select simple, one-depth attributes from multiple Object Models', function() {
    var combinedFormModel = new FormModel({}, {models: [{model: testModel, fields: ['foo']}, {model: testModel2, fields: ['color']}]});
    expect(combinedFormModel.get('foo')).toBe(123);
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('pieces')).not.toBeDefined();
    expect(combinedFormModel.get('color')).toBe('red');
  });

  it('can pull nested attributes from multiple Object Models', function() {
    var combinedFormModel = new FormModel({}, {models: [{model: testModel, fields: ['obj.a', 'obj.b']},
                                                         {model: testModel2, fields: ['ingredients[0]', 'ingredients[1]']}]});
    expect(combinedFormModel.get('obj').a).toBe(1);
    expect(combinedFormModel.get('obj').b).toBe('b value');
    expect(combinedFormModel.get('obj').c).not.toBeDefined();
    expect(combinedFormModel.get('ingredients[0].name')).toBe('flour');
    expect(combinedFormModel.get('ingredients[1].name')).toBe('dye');
    expect(combinedFormModel.get('ingredients[2].name')).not.toBeDefined();
  });

  it('can pull an object from the attributes of an Object Model', function() {
    var combinedFormModel = new FormModel({}, {models: [{model: testModel, fields: ['obj']}]});
    expect(combinedFormModel.get('obj').a).toBe(1);
    expect(combinedFormModel.get('obj').b).toBe('b value');
    expect(combinedFormModel.get('obj').c.d).toBe(true)
  });

  it('can combine attributes from an Object Model into a single form attribute', function() {
    var combinedFormModel = new FormModel({}, {
      computed: [{
        models: [{model: testModel, fields: ['foo', 'bar']}],
        pull: function(foo, bar) {
          this.set('fooBar', foo + ' ' + bar);
        }
      }]
    });
    expect(combinedFormModel.get('foo')).not.toBeDefined();
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('fooBar')).toBe('123 test');
  });

  it('can combine attributes from multiple Object Models into a single form attribute', function() {
    var combinedFormModel = new FormModel({}, {
      models: [{model: testModel, fields: ['foo']}, {model: testModel2, fields: ['pieces']}],
      computed: [{
        models: [{model: testModel, fields: ['bar']}, {model: testModel2, fields: ['color']}],
        pull: function(bar, color) {
          this.set('colorBar', color + ' ' + bar);
        }
      }]
    });
    expect(combinedFormModel.get('foo')).toBe(123);
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('pieces')).toBe(5);
    expect(combinedFormModel.get('color')).not.toBeDefined();
    expect(combinedFormModel.get('colorBar')).toBe('red test');
  });

  describe('during a manual, one time pull from it\'s object models', function() {
    it('can pull non-object fields from a single model', function() {
      var testFormModel = new FormModel({}, {model: testModel});
      expect(testFormModel.get('foo')).toBe(123);
      expect(testFormModel.get('bar')).toBe('test');
      testModel.set('foo', 555);
      testModel.set('bar', 'new value');
      expect(testFormModel.get('foo')).toBe(123);
      expect(testFormModel.get('bar')).toBe('test');
      testFormModel.pull();
      expect(testFormModel.get('foo')).toBe(555);
      expect(testFormModel.get('bar')).toBe('new value');
    });

    it('can pull object fields from a single model', function() {
      var testFormModel2,
        testFormModel = new FormModel({}, {model: testModel});
      expect(testFormModel.get('obj').c.d).toBe(true);
      testModel.set('obj.c.d', false);
      expect(testFormModel.get('obj').c.d).toBe(true);
      testFormModel.pull();
      expect(testFormModel.get('obj').c.d).toBe(false);


      testFormModel2 = new FormModel({}, {model: testModel2});
      expect(testFormModel2.get('ingredients[1].name')).toBe('dye');
      testModel2.set('ingredients[1].name', 'food coloring');
      expect(testFormModel2.get('ingredients[1].name')).toBe('dye');
      testFormModel2.pull();
      expect(testFormModel2.get('ingredients[1].name')).toBe('food coloring');
    });

    it('can pull when a form model is only listening to a subset of non-object attributes', function(){
      var fewFieldFormModel = new FormModel({}, {model: testModel, fields: ['foo']});
      expect(fewFieldFormModel.get('foo')).toBe(123);
      expect(fewFieldFormModel.get('bar')).not.toBeDefined();
      testModel.set('foo', 555);
      expect(fewFieldFormModel.get('foo')).toBe(123);
      fewFieldFormModel.pull();
      expect(fewFieldFormModel.get('foo')).toBe(555);
      expect(fewFieldFormModel.get('bar')).not.toBeDefined();
    });

    it('can pull non-object attributes from multiple object models', function() {
      var combinedFormModel = new FormModel({}, {models: [{model: testModel}, {model: testModel2}]});
      expect(combinedFormModel.get('foo')).toBe(123);
      expect(combinedFormModel.get('bar')).toBe('test');
      expect(combinedFormModel.get('pieces')).toBe(5);
      expect(combinedFormModel.get('color')).toBe('red');
      testModel.set('foo', 555);
      testModel2.set('color', 'blue');
      expect(combinedFormModel.get('foo')).toBe(123);
      expect(combinedFormModel.get('bar')).toBe('test');
      expect(combinedFormModel.get('pieces')).toBe(5);
      expect(combinedFormModel.get('color')).toBe('red');
      combinedFormModel.pull();
      expect(combinedFormModel.get('foo')).toBe(555);
      expect(combinedFormModel.get('bar')).toBe('test');
      expect(combinedFormModel.get('pieces')).toBe(5);
      expect(combinedFormModel.get('color')).toBe('blue');
    });

    it('can pull non-object attributes from an Object Model and compute another value', function() {
      var computedFormModel;
      expect(testModel.get('foo')).toBe(123);
      computedFormModel = new FormModel({}, {
        computed: [{
          models: [{model: testModel, fields: ['foo']}],
          pull: function(foo) {
            this.set('myFoo', -foo);
          }
        }]
      });
      expect(computedFormModel.get('myFoo')).toBe(-123);
      testModel.set('foo', 555);
      expect(computedFormModel.get('myFoo')).toBe(-123);
      computedFormModel.pull();
      expect(computedFormModel.get('myFoo')).toBe(-555);
    });

    it('can pull nested attributes from multiple Object Models', function() {
      var combinedFormModel = new FormModel({}, {models: [{model: testModel, fields: ['obj.a', 'obj.b']},
                                                           {model: testModel2, fields: ['ingredients[0]', 'ingredients[1]']}]});
      expect(combinedFormModel.get('obj').a).toBe(1);
      expect(combinedFormModel.get('obj').b).toBe('b value');
      expect(combinedFormModel.get('obj').c).not.toBeDefined();
      expect(combinedFormModel.get('ingredients[0].name')).toBe('flour');
      expect(combinedFormModel.get('ingredients[1].name')).toBe('dye');
      expect(combinedFormModel.get('ingredients[2].name')).not.toBeDefined();
      testModel.set('obj.a', 100);
      testModel2.set('ingredients[1].name', 'food coloring');
      expect(combinedFormModel.get('obj').a).toBe(1);
      expect(combinedFormModel.get('obj').b).toBe('b value');
      expect(combinedFormModel.get('obj').c).not.toBeDefined();
      expect(combinedFormModel.get('ingredients[0].name')).toBe('flour');
      expect(combinedFormModel.get('ingredients[1].name')).toBe('dye');
      expect(combinedFormModel.get('ingredients[2].name')).not.toBeDefined();
      combinedFormModel.pull();
      expect(combinedFormModel.get('obj').a).toBe(100);
      expect(combinedFormModel.get('obj').b).toBe('b value');
      expect(combinedFormModel.get('obj').c).not.toBeDefined();
      expect(combinedFormModel.get('ingredients[0].name')).toBe('flour');
      expect(combinedFormModel.get('ingredients[1].name')).toBe('food coloring');
      expect(combinedFormModel.get('ingredients[2].name')).not.toBeDefined();
    });

    it('can combine attributes from an Object Model into a single form attribute', function() {
      var combinedFormModel = new FormModel({}, {
        computed: [{
          models: [{model: testModel, fields: ['foo', 'bar']}],
          pull: function(foo, bar) {
            this.set('fooBar', foo + ' ' + bar);
          }
        }]
      });
      expect(combinedFormModel.get('foo')).not.toBeDefined();
      expect(combinedFormModel.get('bar')).not.toBeDefined();
      expect(combinedFormModel.get('fooBar')).toBe('123 test');
      testModel.set('bar', 'new value');
      expect(combinedFormModel.get('foo')).not.toBeDefined();
      expect(combinedFormModel.get('bar')).not.toBeDefined();
      expect(combinedFormModel.get('fooBar')).toBe('123 test');
      combinedFormModel.pull();
      expect(combinedFormModel.get('foo')).not.toBeDefined();
      expect(combinedFormModel.get('bar')).not.toBeDefined();
      expect(combinedFormModel.get('fooBar')).toBe('123 new value');
    });

    it('can combine attributes from multiple Object Models into a single form attribute', function() {
      var combinedFormModel = new FormModel({}, {
        models: [{model: testModel, fields: ['foo']}, {model: testModel2, fields: ['pieces']}],
        computed: [{
          models: [{model: testModel, fields: ['bar']}, {model: testModel2, fields: ['color']}],
          pull: function(bar, color) {
            this.set('colorBar', color + ' ' + bar);
          }
        }]
      });
      expect(combinedFormModel.get('foo')).toBe(123);
      expect(combinedFormModel.get('bar')).not.toBeDefined();
      expect(combinedFormModel.get('pieces')).toBe(5);
      expect(combinedFormModel.get('color')).not.toBeDefined();
      expect(combinedFormModel.get('colorBar')).toBe('red test');
      testModel.set('bar', 'new value');
      testModel2.set('pieces', 10);
      testModel2.set('color', 'blue');
      expect(combinedFormModel.get('foo')).toBe(123);
      expect(combinedFormModel.get('bar')).not.toBeDefined();
      expect(combinedFormModel.get('pieces')).toBe(5);
      expect(combinedFormModel.get('color')).not.toBeDefined();
      expect(combinedFormModel.get('colorBar')).toBe('red test');
      combinedFormModel.pull();
      expect(combinedFormModel.get('foo')).toBe(123);
      expect(combinedFormModel.get('bar')).not.toBeDefined();
      expect(combinedFormModel.get('pieces')).toBe(10);
      expect(combinedFormModel.get('color')).not.toBeDefined();
      expect(combinedFormModel.get('colorBar')).toBe('blue new value');
    });
  });
});