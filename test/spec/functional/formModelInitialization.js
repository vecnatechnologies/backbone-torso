var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe('A Form Model during initialization', function() {
  var FormModel, TestModel, testModel, TestModel2, testModel2, env, _;

  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      _ = env.window._;
      FormModel = env.window.Torso.FormModel;
      TestModel = require(testSrcPath + '/TestModel')(env.window.Torso.NestedModel),
      TestModel2 = require(testSrcPath + '/TestModel2')(env.window.Torso.NestedModel),
      testModel = new TestModel();
      testModel2 = new TestModel2();
      done();
    });
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
        }
      });
    myProfileFormModel = new MyProfileFormModel();
    expect(_.size(myProfileFormModel.getModels())).toBe(0);
    expect(_.size(myProfileFormModel.getMappings())).toBe(4);
    myProfileFormModel.setModel('testModel', testModel);
    myProfileFormModel.setModel('testModel2', testModel2);
    expect(_.size(myProfileFormModel.getModels())).toBe(2);
    expect(_.size(myProfileFormModel.getMappings())).toBe(4);

    formModel2 = new MyProfileFormModel({}, {
      mapping: {
        testModel: 'foo'
      }
    });
    expect(_.size(formModel2.getModels())).toBe(0);
    expect(_.size(formModel2.getMappings())).toBe(1);
    formModel2.setModel('testModel', testModel);
    expect(_.size(formModel2.getModels())).toBe(1);
    expect(_.size(formModel2.getMappings())).toBe(1);

    formModel2 = new MyProfileFormModel({}, {
      mapping: _.extend({}, MyProfileFormModel.prototype.mapping, {
        test: {
          testModel: 'raz',
          pull: function(models) {
            this.set('raz', models.testModel.raz + 1);
          }
        }
      })
    });
    expect(_.size(formModel2.getModels())).toBe(0);
    expect(_.size(formModel2.getMappings())).toBe(5);
    formModel2.setModel('testModel', testModel);
    formModel2.setModel('testModel2', testModel2);
    expect(formModel2.get('raz')).not.toBeDefined();
    testModel.set('raz', 4);
    testModel.set('foo', 123);
    formModel2.pull();
    expect(formModel2.get('raz')).toBe(5);
    expect(formModel2.get('foo')).toBe(123);
  });

  it('can use nested backbone correctly', function() {
    expect(testModel.has('obj.a')).toBe(true);
  });
});