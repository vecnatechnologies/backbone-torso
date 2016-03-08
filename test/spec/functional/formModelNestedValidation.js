// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

var Handlebars = require('handlebars'),
    spyOnBackbone = require('./backboneSpy');

describe('A Form Model\'s Validation of nested attributes', function() {
  var FormModel, FormView, env, $, _;

  // Set up virtual dom and dependencies
  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      _ = env.window._;
      $ = env.window.$;
      FormModel = env.window.Torso.FormModel;
      FormView = env.window.Torso.FormView;
      done();
    });
  });

  describe('during multifield validation', function() {
    describe('at a form level', function() {
      xit('can validate using two nested attributes and produce a form level error', function() {

      });

      xit('can validate using two "specific" array attributes and produce a form level error', function() {

      });

      describe('during "open" array notation validation', function() {
        xit('can validate using a single "open" array notation produce a form level error', function() {

        });

        xit('can validate using two attributes using "open" array notation and produce a form level error', function() {

        });
      });
    });

    describe('at a field level', function() {
      xit('can validate using two nested attributes and produce a field level error', function() {
        var nestedFormModel = new FormModel({
          foo: {
            bar: 2
          },
          baz: {
            taz: 6
          }
        }, {
          validation: {
            'barTaz': {
              inlineFn: function(value, attr, model, computed, indices) {
                return (model.get('foo.bar') + model.get('baz.taz') > 10) ? '' : 'Not greater than 10';
              }
            }
          }
        });
      });

      xit('can validate using two "specific" array attributes and produce a field level error', function() {
        var nestedFormModel = new FormModel({
          foo: [2],
          baz: [6]
        }, {
          validation: {
            'barTaz': {
              inlineFn: function(value, attr, model, computed, indices) {
                return (model.get('foo[0]') + model.get('baz[0]') > 10) ? '' : 'Not greater than 10';
              }
            }
          }
        });
      });

      describe('during "open" array notation validation', function() {
        xit('can validate using a single "open" array notation produce a field level error', function() {

        });

        xit('can validate using two attributes using "open" array notation and produce a field level error', function() {

        });
      });
    });
  });

  describe('during "open" array notation validation', function() {
    //produce validation elements
    it('can validate single elements inside an array marked with "open" array attribute (ex. foo[])', function() {
      var nestedFormModel = new FormModel({
        foo: [1, 2, 3]
      }, {
        validation: {
          'foo[]': {
            inlineFn: function(value, attr, model, computed, indices) {
              return value;
            }
          }
        }
      });
      expect(nestedFormModel.isValid('foo[1]')).toBe(false);
      expect(nestedFormModel.preValidate('foo[1]')).toBe(2);
      expect(nestedFormModel.preValidate('foo[1]', 3)).toBe(3);
      var errors = nestedFormModel.validate();
      expect(errors['foo[]'].length).toBe(3);
      expect(errors['foo[]'][0]).toBe(1);
      expect(errors['foo[]'][1]).toBe(2);
      expect(errors['foo[]'][2]).toBe(3);
      nestedFormModel.set('foo[1]', '');
      expect(nestedFormModel.isValid('foo[1]')).toBe(true);
    });

    it('can validate a double "open" array attribute (ex. foo[][])', function() {
      var nestedFormModel = new FormModel({
        foo: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      }, {
        validation: {
          'foo[][]': {
            inlineFn: function(value, attr, model, computed, indices) {
              return value;
            }
          }
        }
      });
      expect(nestedFormModel.isValid('foo[1][2]')).toBe(false);
      expect(nestedFormModel.preValidate('foo[1][2]')).toBe(6);
      expect(nestedFormModel.preValidate('foo[1][2]', 3)).toBe(3);
      var errors = nestedFormModel.validate();
      expect(errors['foo[][]'].length).toBe(3);
      expect(errors['foo[][]'][0].length).toBe(3);
      expect(errors['foo[][]'][1].length).toBe(3);
      expect(errors['foo[][]'][2].length).toBe(3);
      expect(errors['foo[][]'][0][0]).toBe(1);
      expect(errors['foo[][]'][1][0]).toBe(4);
      expect(errors['foo[][]'][2][0]).toBe(7);
      nestedFormModel.set('foo[1][2]', false);
      expect(nestedFormModel.isValid('foo[1][2]')).toBe(true);
    });

    it('can validate a nested "open" array attr (ex. foo.bar[])', function() {
      var nestedFormModel = new FormModel({
        foo: {
          bar: [1, 2, 3]
        }
      }, {
        validation: {
          'foo.bar[]': {
            inlineFn: function(value, attr, model, computed, indices) {
              return value;
            }
          }
        }
      });
      expect(nestedFormModel.isValid('foo.bar[1]')).toBe(false);
      expect(nestedFormModel.preValidate('foo.bar[1]')).toBe(2);
      expect(nestedFormModel.preValidate('foo.bar[1]', 3)).toBe(3);
      var errors = nestedFormModel.validate();
      expect(errors['foo.bar[]'].length).toBe(3);
      expect(errors['foo.bar[]'][0]).toBe(1);
      expect(errors['foo.bar[]'][1]).toBe(2);
      expect(errors['foo.bar[]'][2]).toBe(3);
      nestedFormModel.set('foo.bar[1]', '');
      expect(nestedFormModel.isValid('foo.bar[1]')).toBe(true);
    });

    it('can validate a nested attribute under a "open" array (ex. when mapping foo[].bar)', function() {
      var nestedFormModel = new FormModel({
        foo: [{bar: 1}, {bar: 4}, {bar: 7}, {bar: false}]
      }, {
        validation: {
          'foo[].bar': {
            inlineFn: function(value, attr, model, computed, indices) {
              return value;
            }
          }
        }
      });
      expect(nestedFormModel.isValid('foo[0].bar')).toBe(false);
      expect(nestedFormModel.isValid('foo[3].bar')).toBe(true);
      expect(nestedFormModel.preValidate('foo[1].bar')).toBe(4);
      expect(nestedFormModel.preValidate('foo[1].bar', 2)).toBe(2);
      var errors = nestedFormModel.validate();
      expect(errors['foo[].bar'].length).toBe(4);
      expect(errors['foo[].bar'][0]).toBe(1);
      expect(errors['foo[].bar'][1]).toBe(4);
      expect(errors['foo[].bar'][2]).toBe(7);
    });

    it('can validate elements in a "open" array (ex. foo[]) with index information', function() {
      var nestedFormModel = new FormModel({
        foo: [1, 2, 3]
      }, {
        validation: {
          'foo[]': {
            inlineFn: function(value, attr, model, computed, indices) {
              return indices[0] === 1 ? 'Boo' : '';
            }
          }
        }
      });
      expect(nestedFormModel.isValid('foo[0]')).toBe(true);
      expect(nestedFormModel.isValid('foo[1]')).toBe(false);
      expect(nestedFormModel.isValid('foo[2]')).toBe(true);
      expect(nestedFormModel.preValidate('foo[1]', 'Not Used')).toBe('Boo');
      expect(nestedFormModel.preValidate('foo[2]', 'Not Used')).toBe('');
      expect(nestedFormModel.preValidate('foo[1]')).toBe('Boo');
      expect(nestedFormModel.preValidate('foo[2]')).toBe('');
      var errors = nestedFormModel.validate();
      expect(errors['foo[]'].length).toBe(3);
      expect(errors['foo[]'][0]).toBe('');
      expect(errors['foo[]'][1]).toBe('Boo');
      expect(errors['foo[]'][2]).toBe('');
    });

    it('can validate elements in a double "open" array (ex. foo[][]) with index information', function() {
      var nestedFormModel = new FormModel({
        foo: [[1], [2], [3]]
      }, {
        validation: {
          'foo[][]': {
            inlineFn: function(value, attr, model, computed, indices) {
              return (indices[0] === 1 && indices[1] === 0) ? 'Boo' : '';
            }
          }
        }
      });
      expect(nestedFormModel.isValid('foo[0][0]')).toBe(true);
      expect(nestedFormModel.isValid('foo[1][0]')).toBe(false);
      expect(nestedFormModel.isValid('foo[2][0]')).toBe(true);
      expect(nestedFormModel.preValidate('foo[1][0]')).toBe('Boo');
      expect(nestedFormModel.preValidate('foo[2][0]')).toBe('');
      expect(nestedFormModel.preValidate('foo[2][0]', 'Not Used')).toBe('');
      expect(nestedFormModel.preValidate('foo[1][0]', 'Not Used')).toBe('Boo');
      var errors = nestedFormModel.validate();
      expect(errors['foo[][]'].length).toBe(3);
      expect(errors['foo[][]'][0][0]).toBe('');
      expect(errors['foo[][]'][1][0]).toBe('Boo');
      expect(errors['foo[][]'][2][0]).toBe('');
    });
  });

  it('can validate with a "open" array and return no errors if there are no errors in every element', function() {
    var nestedFormModel = new FormModel({
        foo: [1, 2, 3]
      }, {
        validation: {
          'foo[]': {
            inlineFn: function(value, attr, model, computed, indices) {
              return false;
            }
          }
        }
      });
    var errors = nestedFormModel.validate();
    expect(_.isEmpty(errors)).toBe(true);
  });

  it('can validate with a built-in function using an "open" array', function() {
    var nestedFormModel = new FormModel({
        foo: ['1', '', '3']
      }, {
        validation: {
          'foo[]': {
            inlineFn: function(value, attr, model, computed, indices) {
              return '';
            },
            required: true
          }
        }
      });
    var errors = nestedFormModel.validate();
    expect(errors['foo[]'][0]).toBe('');
    expect(errors['foo[]'][1]).toBe('Foo[ 1] is required');
    expect(errors['foo[]'][2]).toBe('');
  });

  it('can validate a nested attribute (ex. foo.bar)', function() {
    var nestedFormModel = new FormModel({
      foo: {
        bar: 1
      }
    }, {
      validation: {
        'foo.bar': {
          inlineFn: function(value, attr, model, computed, indices) {
            return value;
          }
        }
      }
    });
    expect(nestedFormModel.isValid('foo.bar')).toBe(false);
    expect(nestedFormModel.preValidate('foo.bar')).toBe(1);
    expect(nestedFormModel.preValidate('foo.bar', 3)).toBe(3);
    var errors = nestedFormModel.validate();
    expect(errors['foo.bar']).toBe(1);
    nestedFormModel.set('foo.bar', '');
    expect(nestedFormModel.isValid('foo.bar')).toBe(true);
  });

  it('can validate a multi-nested attribute (ex. foo.bar.baz)', function() {
    var nestedFormModel = new FormModel({
      foo: {
        bar: {
          baz: 6
        }
      }
    }, {
      validation: {
        'foo.bar.baz': {
          inlineFn: function(value, attr, model, computed, indices) {
            return value;
          }
        }
      }
    });
    expect(nestedFormModel.isValid('foo.bar.baz')).toBe(false);
    expect(nestedFormModel.preValidate('foo.bar.baz')).toBe(6);
    expect(nestedFormModel.preValidate('foo.bar.baz', 3)).toBe(3);
    var errors = nestedFormModel.validate();
    expect(errors['foo.bar.baz']).toBe(6);
    nestedFormModel.set('foo.bar.baz', '');
    expect(nestedFormModel.isValid('foo.bar.baz')).toBe(true);
  });

  it('can validate nested properties while passing in attributes to validate function (ex. foo.bar.baz)', function() {
    var nestedFormModel = new FormModel({
      foo: {
        bar: {
          baz: 6,
          taz: 10,
          raz: 100
        }
      }
    }, {
      validation: {
        'foo.bar.baz': {
          inlineFn: function(value, attr, model, computed, indices) {
            return value;
          }
        },
        'foo.bar.taz': {
          inlineFn: function(value, attr, model, computed, indices) {
            return value;
          }
        }
      }
    });
    var errors = nestedFormModel.validate({'foo.bar.baz': 2});
    expect(errors['foo.bar.baz']).toBe(2);
    expect(errors['foo.bar.taz']).toBe(10);

    var valid = nestedFormModel.set('foo.bar.baz', 11, {validate: true});
    expect(valid).toBe(false);
    nestedFormModel.set('foo.bar.baz', '');
    valid = nestedFormModel.set('foo.bar.taz', '', {validate: true});
    expect(valid).toBe(nestedFormModel);
  });
});
