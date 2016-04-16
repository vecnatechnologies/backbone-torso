var spyOnBackbone = require('./helpers/spyOnBackbone');
var _ = require('underscore');
var FormModel = require('../../modules/FormModel');
var TestModel = require('./helpers/TestModel');
var TestModel2 = require('./helpers/TestModel2');

describe('A Form Model when it pushes new data to Object Models', function() {

  var testModel, testModel2, testFormModel;

  beforeEach(function() {
    testModel = new TestModel();
    testModel2 = new TestModel2();
  });

  //********** Push ************//

  it('can push simple, one-depth attributes to an Object Model', function() {
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
    testFormModel.push();
    expect(testModel.get('foo')).toBe(555);
    expect(testFormModel.get('foo')).toBe(555);
    testFormModel.set('bar', 'new value');
    expect(testModel.get('bar')).toBe('test');
    testFormModel.push();
    expect(testModel.get('bar')).toBe('new value');
    expect(testFormModel.get('bar')).toBe('new value');
  });

  it('can push to nested attributes of an Object Model', function() {
    var testFormModel = new FormModel({}, {
      mapping: {
        testModel: true
      },
      models: {
        testModel: testModel
      }
    });
    testFormModel.set('obj.c.d', false);
    expect(testModel.get('obj.c.d')).toBe(true);
    testFormModel.push();
    expect(testModel.get('obj.c.d')).toBe(false);
    expect(testFormModel.get('obj.c.d')).toBe(false);
  });

  it('can push simple, one-depth attributes to multiple Object Models', function() {
    var combinedFormModel = new FormModel({}, {
      mapping: {
        testModel: 'foo',
        testModel2: 'color'
      },
      models: {
        testModel: testModel,
        testModel2: testModel2
      }
    });
    expect(combinedFormModel.get('foo')).toBe(123);
    expect(testModel.get('foo')).toBe(123);
    combinedFormModel.set('foo', 555);
    expect(testModel.get('foo')).toBe(123);
    expect(combinedFormModel.get('foo')).toBe(555);
    combinedFormModel.push();
    expect(testModel.get('foo')).toBe(555);
    expect(combinedFormModel.get('foo')).toBe(555);

    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('obj')).not.toBeDefined();

    expect(testModel2.get('color')).toBe('red');
    expect(combinedFormModel.get('color')).toBe('red');
    combinedFormModel.set('color', 'blue');
    expect(testModel2.get('color')).toBe('red');
    expect(combinedFormModel.get('color')).toBe('blue');
    combinedFormModel.push();
    expect(testModel2.get('color')).toBe('blue');
    expect(combinedFormModel.get('color')).toBe('blue');

    expect(combinedFormModel.get('pieces')).not.toBeDefined();
    expect(combinedFormModel.get('ingredients')).not.toBeDefined();
  });

  it('can push to nested attributes of multiple Object Models', function() {
    var combinedFormModel = new FormModel({}, {
      mapping: {
        testModel: 'obj.a obj.b',
        testModel2: 'ingredients[0] ingredients[1]'
      },
      models: {
        testModel: testModel,
        testModel2: testModel2
      }
    });
    expect(combinedFormModel.get('obj.a')).toBe(1);
    expect(testModel.get('obj.a')).toBe(1);
    combinedFormModel.set('obj.a', 100);
    expect(testModel.get('obj.a')).toBe(1);
    expect(combinedFormModel.get('obj.a')).toBe(100);
    combinedFormModel.push();
    expect(testModel.get('obj.a')).toBe(100);
    expect(combinedFormModel.get('obj.a')).toBe(100);

    expect(combinedFormModel.get('obj').c).not.toBeDefined();

    expect(testModel2.get('ingredients[0].name')).toBe('flour');
    expect(combinedFormModel.get('ingredients[0].name')).toBe('flour');
    combinedFormModel.set('ingredients[0].name', 'chocolate');
    expect(testModel2.get('ingredients[0].name')).toBe('flour');
    expect(combinedFormModel.get('ingredients[0].name')).toBe('chocolate');
    combinedFormModel.push();
    expect(testModel2.get('ingredients[0].name')).toBe('chocolate');
    expect(combinedFormModel.get('ingredients[0].name')).toBe('chocolate');

    expect(combinedFormModel.get('ingredients[2]')).not.toBeDefined();
  });

  it('can separate a single form attribute and push many parts to an Object Model', function() {
    var combinedFormModel = new FormModel({}, {
      mapping: {
        fooBar: {
          testModel: 'foo bar',
          pull: function(models) {
            this.set('fooBar', models.testModel.foo + ' ' + models.testModel.bar);
          },
          push: function(models) {
            var fooBar = this.get('fooBar').split(/[ ]+/);
            models.testModel.set('foo', parseInt(fooBar[0], 10));
            models.testModel.set('bar', fooBar[1]);
          }
        }
      },
      models: {
        testModel: testModel
      }
    });
    expect(testModel.get('foo')).toBe(123);
    expect(testModel.get('bar')).toBe('test');
    expect(combinedFormModel.get('foo')).not.toBeDefined();
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('fooBar')).toBe('123 test');
    combinedFormModel.set('fooBar', '555 new');
    combinedFormModel.push();
    expect(testModel.get('foo')).toBe(555);
    expect(testModel.get('bar')).toBe('new');
  });

  it('can separate a single form attribute and push many parts to multiple Object Models', function() {
    var combinedFormModel = new FormModel({}, {
      mapping: {
        fooBar: {
          testModel: 'bar',
          testModel2: 'color',
          pull: function(models) {
            this.set('colorBar', models.testModel2.color + ' ' + models.testModel.bar);
          },
          push: function(models) {
            var fooBar = this.get('colorBar').split(/[ ]+/);
            models.testModel.set('bar', fooBar[1]);
            models.testModel2.set('color', fooBar[0]);
          }
        }
      },
      models: {
        testModel: testModel,
        testModel2: testModel2
      }
    });
    expect(testModel2.get('color')).toBe('red');
    expect(testModel.get('bar')).toBe('test');
    expect(combinedFormModel.get('color')).not.toBeDefined();
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('colorBar')).toBe('red test');
    combinedFormModel.set('colorBar', 'blue new');
    combinedFormModel.push();
    expect(testModel2.get('color')).toBe('blue');
    expect(testModel.get('bar')).toBe('new');
  });

  it('can aggregate many form attributes and push a single attribute to an Object Model', function() {
    var combinedFormModel;
    testModel.set('bar', 'test value')
    combinedFormModel = new FormModel({}, {
      mapping: {
        fooBar: {
          testModel: 'bar',
          pull: function(models) {
            var bazTaz = models.testModel.bar.split(/[ ]+/);
            this.set('baz', bazTaz[0]);
            this.set('taz', bazTaz[1]);
          },
          push: function(models) {
            models.testModel.set('bar', this.get('baz') + ' ' + this.get('taz'));
          }
        }
      },
      models: {
        testModel: testModel
      }
    });
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('baz')).toBe('test');
    expect(combinedFormModel.get('taz')).toBe('value');
    combinedFormModel.set('baz', 'new');
    combinedFormModel.set('taz', 'stuff');
    combinedFormModel.push();
    expect(testModel.get('bar')).toBe('new stuff');
  });

  it('can aggregate many form attributes into a single attribute and do this for multiple Object Models', function() {
    var combinedFormModel;
    testModel.set('bar', 'test value')
    testModel2.set('color', 'red blue')
    combinedFormModel = new FormModel({}, {
      mapping: {
        fooBar: {
          testModel: 'bar',
          pull: function(models) {
            var bazTaz = models.testModel.bar.split(/[ ]+/);
            this.set('baz', bazTaz[0]);
            this.set('taz', bazTaz[1]);
          },
          push: function(models) {
            models.testModel.set('bar', this.get('baz') + ' ' + this.get('taz'));
          }
        },
        color: {
          testModel2: 'color',
          pull: function(models) {
            var colors = models.testModel2.color.split(/[ ]+/);
            this.set('primary', colors[0]);
            this.set('secondary', colors[1]);
          },
          push: function(models) {
            models.testModel2.set('color', this.get('primary') + ' ' + this.get('secondary'));
          }
        }
      },
      models: {
        testModel: testModel,
        testModel2: testModel2
      }
    });
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('baz')).toBe('test');
    expect(combinedFormModel.get('taz')).toBe('value');
    combinedFormModel.set('baz', 'new');
    combinedFormModel.set('taz', 'stuff');
    combinedFormModel.push();
    expect(testModel.get('bar')).toBe('new stuff');

    expect(combinedFormModel.get('color')).not.toBeDefined();
    expect(combinedFormModel.get('primary')).toBe('red');
    expect(combinedFormModel.get('secondary')).toBe('blue');
    combinedFormModel.set('primary', 'green');
    combinedFormModel.set('secondary', 'yellow');
    combinedFormModel.push();
    expect(testModel2.get('color')).toBe('green yellow');
  });

  it('can, when triggered to do so, update when new data is fetched on an object model', function(done) {
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
    testFormModel.startUpdating();
    testModel.fetch({
      success: function() {
        expect(testFormModel.get('foo')).toBe(555);
        expect(testFormModel.get('bar')).toBe('real');
        testFormModel.stopUpdating();
        done();
     }
    });
  })

  it('can push data to the correct model when tracking multiple objects', function() {
    var testFormModel = new FormModel({}, {
      mapping: {
        testModel: true,
        testModel2: 'pieces'
      },
      models: {
        testModel: testModel,
        testModel2: testModel2
      }
    });
    testFormModel.set('foo', 555);
    testFormModel.push();
    expect(testModel2.get('foo')).not.toBeDefined();
    expect(testModel.get('pieces')).not.toBeDefined();
    expect(testModel.get('foo')).toBe(555);
  });
});