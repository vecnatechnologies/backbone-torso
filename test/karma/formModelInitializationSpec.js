var spyOnBackbone = require('./helpers/spyOnBackbone');
var _ = require('underscore');
var FormModel = require('../../modules/FormModel');
var TestModel = require('./helpers/TestModel');
var TestModel2 = require('./helpers/TestModel2');

describe('A Form Model during initialization', function() {
  var testModel, testModel2;

  beforeEach(function() {
    testModel = new TestModel();
    testModel2 = new TestModel2();
  });

  it('can be initialized without an object model', function() {
    var emptyFormModel = new FormModel();
    expect(emptyFormModel).toBeDefined();
  });

  it('can be passed initial values', function() {
    var formModel = new FormModel(null, {
      mapping: {
        testModel: true,
      },
      models: {
        testModel: testModel
      }
    });
    expect(formModel.get('foo')).toBe(123);
    expect(formModel.get('bar')).toBe('test');
    formModel = new FormModel({}, {
      mapping: {
        testModel: true,
      },
      models: {
        testModel: testModel
      }
    });
    expect(formModel.get('foo')).toBe(123);
    expect(formModel.get('bar')).toBe('test');
    formModel = new FormModel({foo: 555}, {
      mapping: {
        testModel: true,
      },
      models: {
        testModel: testModel
      }
    });
    expect(formModel.get('foo')).toBe(555);
    expect(formModel.get('bar')).toBe('test');
  });

  it('can be extended and reused', function() {
    var simpleForm, SimpleForm, formModel2, myProfileFormModel,
      MyProfileFormModel = FormModel.extend({
        mapping: {
          testModel: 'foo',
          testModel2: 'baz',
          barBazTaz: {
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
              models.testModel.set('color', this.get('primary') + ' ' + this.get('secondary'));
            }
          }
        },
        models: {
          testModel: testModel
        }
      });
    myProfileFormModel = new MyProfileFormModel();
    expect(_.size(myProfileFormModel.getTrackedModels())).toBe(1);
    expect(_.size(myProfileFormModel.getMappings())).toBe(4);
    myProfileFormModel.trackModel('testModel', testModel);
    myProfileFormModel.trackModel('testModel2', testModel2);
    expect(_.size(myProfileFormModel.getTrackedModels())).toBe(2);
    expect(_.size(myProfileFormModel.getMappings())).toBe(4);

    formModel2 = new MyProfileFormModel({}, {
      mapping: {
        testModel: 'foo',
        testModel2: 'baz'
      }
    });
    expect(_.size(formModel2.getTrackedModels())).toBe(1);
    expect(_.size(formModel2.getMappings())).toBe(2);
    formModel2.trackModel('testModel', testModel);
    expect(_.size(formModel2.getTrackedModels())).toBe(1);
    expect(_.size(formModel2.getMappings())).toBe(2);
    formModel2.setTrackedModel('testModel2', testModel2);
    expect(_.size(formModel2.getTrackedModels())).toBe(2);
    expect(_.size(formModel2.getMappings())).toBe(2);

    formModel2 = new MyProfileFormModel({}, {
      mapping: _.extend({}, MyProfileFormModel.prototype.mapping, {
        test: {
          testModel2: 'raz',
          pull: function(models) {
            this.set('raz', models.testModel2.raz + 1);
          }
        }
      })
    });
    expect(_.size(formModel2.getTrackedModels())).toBe(1);
    expect(_.size(formModel2.getMappings())).toBe(5);
    formModel2.trackModel('testModel', testModel);
    formModel2.trackModel('testModel2', testModel2);
    expect(formModel2.get('raz')).not.toBeDefined();
    testModel2.set('raz', 4);
    testModel2.set('foo', 123);
    formModel2.pull();
    expect(formModel2.get('raz')).toBe(5);
    expect(formModel2.get('foo')).toBe(123);
  });

  it('can use nested backbone correctly', function() {
    expect(testModel.has('obj.a')).toBe(true);
  });
});
