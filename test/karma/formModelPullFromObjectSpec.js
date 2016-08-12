var spyOnBackbone = require('./helpers/spyOnBackbone');
var _ = require('underscore');
var FormModel = require('../../modules/FormModel');
var TestModel = require('./helpers/TestModel');
var TestModel2 = require('./helpers/TestModel2');

// Helper function to trim whitespace from a string.
function trim(s) { 
  return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
}

describe('A Form Model when it pulls from object models', function() {
  var testModel, testModel2, testFormModel;

  beforeEach(function() {
    testModel = new TestModel();
    testModel2 = new TestModel2();
  });

  //********** Pull ************//

  it('can pull simple, one-depth attributes from an Object Model', function() {
    var testFormModel = new FormModel({}, {
      mapping: {
        testModel: true,
      },
      models: {
        testModel: testModel
      }
    });
    expect(testFormModel.get('foo')).toBe(123);
    expect(testFormModel.get('bar')).toBe('test');
  });

  it('can pull simple, one-depth attributes from an Object Model and compute another value', function() {
    var computedFormModel;
    expect(testModel.get('foo')).toBe(123);
    computedFormModel = new FormModel({}, {
      mapping: {
        myFoo: {
          testModel: 'foo',
          pull: function(models) {
            this.set('myFoo', -models.testModel.foo);
          }
        }
      },
      models: {
        testModel: testModel
      }
    });
    expect(computedFormModel.get('myFoo')).toBe(-123);
  });

  it('can pull simple, one-depth attributes from an Object Model using computed aliases', function() {
    var computedFormModel;
    expect(testModel.get('foo')).toBe(123);
    computedFormModel = new FormModel({}, {
      mapping: {
        myFoo: {
          testModel: 'foo'
        }
      },
      models: {
        testModel: testModel
      }
    });
    expect(computedFormModel.get('foo')).toBe(123);
  });

  it('can pull only select simple, one-depth attributes from an Object Model', function() {
    var fewFieldFormModel = new FormModel({}, {
      mapping: {
        testModel: 'foo',
      },
      models: {
        testModel: testModel
      }
    });
    expect(fewFieldFormModel.get('foo')).toBe(123);
    expect(fewFieldFormModel.get('bar')).not.toBe('test');
  });

  it('can pull nested attributes from an Object Model', function() {
    var testFormModel2,
      testFormModel = new FormModel({}, {
        mapping: {
          testModel: true,
        },
        models: {
          testModel: testModel
        }
      });
    expect(testFormModel.get('obj').c.d).toBe(true);
    testFormModel2 = new FormModel({}, {
      mapping: {
        testModel2: true,
      },
      models: {
        testModel2: testModel2
      }
    });
    expect(testFormModel2.get('ingredients[0].name')).toBe('flour');
    expect(testFormModel2.get('ingredients[1].name')).toBe('dye');
    expect(testFormModel2.get('ingredients[2].name')).toBe('sugar');
  });

  it('can pull only select nested attributes from an Object Model', function() {
    var doubleNestedFormModel, testFormModel2,
      fewFieldFormModel = new FormModel({}, {
        mapping: {
          testModel: 'obj.a obj.b'
        },
        models: {
          testModel: testModel
        }
      });
    expect(fewFieldFormModel.get('obj').a).toBe(1);
    expect(fewFieldFormModel.get('obj').b).toBe('b value');
    expect(fewFieldFormModel.get('obj').c).not.toBeDefined();

    doubleNestedFormModel = new FormModel({}, {
      mapping: {
        testModel: 'obj.c.d'
      },
      models: {
        testModel: testModel
      }
    });
    expect(doubleNestedFormModel.get('obj').a).not.toBeDefined();
    expect(doubleNestedFormModel.get('obj').b).not.toBeDefined();
    expect(doubleNestedFormModel.get('obj').c.d).toBe(true);

    testFormModel2 = new FormModel({}, {
      mapping: {
        testModel2: 'ingredients[0] ingredients[1]'
      },
      models: {
        testModel2: testModel2
      }
    });
    expect(testFormModel2.get('ingredients[0].name')).toBe('flour');
    expect(testFormModel2.get('ingredients[1].name')).toBe('dye');
    expect(testFormModel2.get('ingredients[2].name')).not.toBeDefined();
  });

  it('can pull simple, one-depth attributes from multiple Object Models', function() {
    var combinedFormModel = new FormModel({}, {
      mapping: {
        testModel: true,
        testModel2: true
      },
      models: {
        testModel: testModel,
        testModel2: testModel2
      }
    });
    expect(combinedFormModel.get('foo')).toBe(123);
    expect(combinedFormModel.get('bar')).toBe('test');
    expect(combinedFormModel.get('pieces')).toBe(5);
    expect(combinedFormModel.get('color')).toBe('red');
  });

  it('can pull only select simple, one-depth attributes from multiple Object Models', function() {
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
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('pieces')).not.toBeDefined();
    expect(combinedFormModel.get('color')).toBe('red');
  });

  it('can pull nested attributes from multiple Object Models', function() {
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
    expect(combinedFormModel.get('obj').a).toBe(1);
    expect(combinedFormModel.get('obj').b).toBe('b value');
    expect(combinedFormModel.get('obj').c).not.toBeDefined();
    expect(combinedFormModel.get('ingredients[0].name')).toBe('flour');
    expect(combinedFormModel.get('ingredients[1].name')).toBe('dye');
    expect(combinedFormModel.get('ingredients[2].name')).not.toBeDefined();
  });

  it('can pull an object from the attributes of an Object Model', function() {
    var combinedFormModel = new FormModel({}, {
      mapping: {
        testModel: 'obj'
      },
      models: {
        testModel: testModel
      }
    });
    expect(combinedFormModel.get('obj').a).toBe(1);
    expect(combinedFormModel.get('obj').b).toBe('b value');
    expect(combinedFormModel.get('obj').c.d).toBe(true)
  });

  it('can combine attributes from an Object Model into a single form attribute', function() {
    var combinedFormModel = new FormModel({}, {
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
    expect(combinedFormModel.get('foo')).not.toBeDefined();
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('fooBar')).toBe('123 test');
  });

  it('can perform an asymmetrical operation on pull', function() {
    testModel.set('bar', ' test ');
    var combinedFormModel = new FormModel({}, {
      mapping: {
        fooTrim: {
          testModel: 'bar',
          pull: function(models) {
            var trimmedBar = trim(models.testModel.bar);
            this.set('bar', trimmedBar);
          }
        }
      },
      models: {
        testModel: testModel
      }
    });
    expect(testModel.get('bar')).toBe(' test ');
    expect(combinedFormModel.get('bar')).toBe('test');
    combinedFormModel.set('bar', ' new ');
    combinedFormModel.push();
    expect(testModel.get('bar')).toBe(' new ');
  });

  it('can combine attributes from multiple Object Models into a single form attribute', function() {
    var combinedFormModel = new FormModel({}, {
      mapping: {
        testModel: 'foo',
        testModel2: 'pieces',
        colorBar: {
          testModel: 'bar',
          testModel2: 'color',
          pull: function(models) {
            this.set('colorBar', models.testModel2.color + ' ' + models.testModel.bar);
          }
        }
      },
      models: {
        testModel: testModel,
        testModel2: testModel2
      }
    });
    expect(combinedFormModel.get('foo')).toBe(123);
    expect(combinedFormModel.get('bar')).not.toBeDefined();
    expect(combinedFormModel.get('pieces')).toBe(5);
    expect(combinedFormModel.get('color')).not.toBeDefined();
    expect(combinedFormModel.get('colorBar')).toBe('red test');
  });

  describe('during a manual, one time pull from it\'s object models', function() {
    it('can pull non-object fields from a single model', function() {
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
        testFormModel = new FormModel({}, {
          mapping: {
            testModel: true
          },
          models: {
            testModel: testModel
          }
        });
      expect(testFormModel.get('obj').c.d).toBe(true);
      testModel.set('obj.c.d', false);
      expect(testFormModel.get('obj').c.d).toBe(true);
      testFormModel.pull();
      expect(testFormModel.get('obj').c.d).toBe(false);

      testFormModel2 = new FormModel({}, {
        mapping: {
          testModel2: true
        },
        models: {
          testModel2: testModel2
        }
      });
      expect(testFormModel2.get('ingredients[1].name')).toBe('dye');
      testModel2.set('ingredients[1].name', 'food coloring');
      expect(testFormModel2.get('ingredients[1].name')).toBe('dye');
      testFormModel2.pull();
      expect(testFormModel2.get('ingredients[1].name')).toBe('food coloring');
    });

    it('can pull when a form model is only listening to a subset of non-object attributes', function(){
      var fewFieldFormModel = new FormModel({}, {
        mapping: {
          testModel: 'foo',
        },
        models: {
          testModel: testModel
        }
      });
      expect(fewFieldFormModel.get('foo')).toBe(123);
      expect(fewFieldFormModel.get('bar')).not.toBeDefined();
      testModel.set('foo', 555);
      expect(fewFieldFormModel.get('foo')).toBe(123);
      fewFieldFormModel.pull();
      expect(fewFieldFormModel.get('foo')).toBe(555);
      expect(fewFieldFormModel.get('bar')).not.toBeDefined();
    });

    it('can pull non-object attributes from multiple object models', function() {
      var combinedFormModel = new FormModel({}, {
        mapping: {
          testModel: true,
          testModel2: true
        },
        models: {
          testModel: testModel,
          testModel2: testModel2
        }
      });
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
        mapping: {
          myFoo: {
            testModel: 'foo',
            pull: function(models) {
              this.set('myFoo', -models.testModel.foo);
            }
          }
        },
        models: {
          testModel: testModel
        }
      });
      expect(computedFormModel.get('myFoo')).toBe(-123);
      testModel.set('foo', 555);
      expect(computedFormModel.get('myFoo')).toBe(-123);
      computedFormModel.pull();
      expect(computedFormModel.get('myFoo')).toBe(-555);
    });

    it('can pull nested attributes from multiple Object Models', function() {
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
        mapping: {
          testModel: 'foo',
          testModel2: 'pieces',
          colorBar: {
            testModel: 'bar',
            testModel2: 'color',
            pull: function(models) {
              this.set('colorBar', models.testModel2.color + ' ' + models.testModel.bar);
            }
          }
        },
        models: {
          testModel: testModel,
          testModel2: testModel2
        }
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
