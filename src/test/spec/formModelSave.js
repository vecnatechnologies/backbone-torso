var targetPath = '../../../target',
  testPath = targetPath + '/test',
  spyOnBackbone = require('./backboneSpy');

describe('A Form Model saving', function() {

  var testModel, testModel2, testFormModel, TestModel, TestModel2, FormModel, env;

  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      TestModel = require(testPath + '/TestModel')(env.window.WebCore),
      TestModel2 = require(testPath + '/TestModel2')(env.window.WebCore),
      FormModel = env.window.WebCore.Models.Form;
      testModel = new TestModel();
      testModel2 = new TestModel2();
      done();
    });
  });

  //********** Save *********/

  it('can save to a single object model by pushing changes to object model and calling save on the object model', function(done) {
    var testFormModel = new FormModel({}, {model: testModel});
    expect(testFormModel.get('foo')).toBe(123);
    expect(testFormModel.get('bar')).toBe('test');
    expect(testModel.get('foo')).toBe(123);
    expect(testModel.get('bar')).toBe('test');
    testFormModel.set('foo', 444);
    testFormModel.set('bar', 'new value');
    testFormModel.save().then(function() {
      expect(testModel.get('foo')).toBe(444);
      expect(testModel.get('bar')).toBe('new value');
      done();
    });
  });

  it('can save to multiple object models by pushing changes to the object models and calling save on them', function(done) {
    var anotherTestModel = new TestModel(),
      testFormModel = new FormModel({}, {models: [{model: testModel, fields: ['foo']}, {model: anotherTestModel, fields: ['bar']}]});
    expect(testFormModel.get('foo')).toBe(123);
    expect(testFormModel.get('bar')).toBe('test');
    expect(testModel.get('foo')).toBe(123);
    expect(testModel.get('bar')).toBe('test');
    testFormModel.set('foo', 444);
    testFormModel.set('bar', 'new value');
    testFormModel.save().then(function() {
      expect(testModel.get('foo')).toBe(444);
      expect(anotherTestModel.get('bar')).toBe('new value');
      done();
    });
  });

  it('can identify and warn when there were changes in the object model since last pull', function(done) {
    var anotherTestModel = new TestModel(),
      testFormModel = new FormModel({}, {models: [{model: testModel, fields: ['foo']}, {model: anotherTestModel, fields: ['bar']}]});
    expect(testFormModel.get('foo')).toBe(123);
    expect(testFormModel._cache[testModel.cid]).toBe('{"foo":123}');
    testModel.set('foo', 555);
    try {
      testFormModel.save({force: false});
      console.log('Save should have thrown an exception')
      expect(true).toBe(false);
      done();
    } catch (err) {
      expect(err.name).toBe('Stale data');
      expect(err.staleModels[0]).toBe(testModel);
      done();
    }
  });

  it('can identify only the fields that changed when warning that the object model was updated since last pull', function(done) {
    var anotherTestModel = new TestModel(),
      testFormModel = new FormModel({}, {model: testModel, fields: ['foo']});
    testModel.set('bar', 555);
    try {
      testFormModel.save({force: false});
      expect(true).toBe(true);
      done();
    } catch (err) {
      console.log('Save should not have thrown exception ');
      expect(true).toBe(false);
      done();
    }
  });

  it('can consume response from failed server-side save from the object model', function(done) {
    var testFormModel;
    env.window.$.mockjax.clear(env.routes['/tests|post']);
    env.window.$.mockjax({
      url: '/tests',
      dataType: 'json',
      type: 'post',
      status: 404,
      responseTime: 100,
      response: function() {
        this.responseText = {
          'stackTrace':[{}],
          'response':{
            'status':404,
            'metadata':{},
            'statusInfo':{'statusCode':404,'reasonPhrase':'Not Found','family':'CLIENT_ERROR'},
            'links':[],
            'stringHeaders':{},
            'allowedMethods':[],
            'length':-1,
            'headers':{},
            'cookies':{}
          },
          'generalReasons':
            [{'messageKey':'failure.to.submit.form.correctly',
              'params':[]
            }],
          'specificReasons': {
              'foo': [{'messageKey':'not.a.number',
                       'params':[]
                      }],
          },
          'status':'NOT_FOUND',
          'message':'HTTP 404 Not Found',
          'localizedMessage':'HTTP 404 Not Found',
          'suppressed':[]
        };
      }
    });

    testFormModel = new FormModel({}, {model: testModel});
    expect(testFormModel.get('foo')).toBe(123);
    expect(testFormModel.get('bar')).toBe('test');
    expect(testModel.get('foo')).toBe(123);
    expect(testModel.get('bar')).toBe('test');
    testFormModel.set('foo', 444);
    testFormModel.set('bar', 'new value');
    testFormModel.save().done(function(responses) {
      expect(true).toBe(false);
      done();
    }).fail(function(responses) {
      var testModelResponse = responses[testModel.cid],
        jqXHR = testModelResponse.response[0],
        textStatus = testModelResponse.response[1],
        errorThrown = testModelResponse.response[2];
      expect(testModelResponse.success).toBe(false);
      expect(jqXHR.responseJSON.generalReasons.length).toBe(1);
      expect(jqXHR.responseJSON.generalReasons[0].messageKey).toBe('failure.to.submit.form.correctly');
      expect(jqXHR.responseJSON.generalReasons[0].params).toBeDefined();
      expect(jqXHR.responseJSON.generalReasons[0].params.length).toBe(0);
      expect(jqXHR.responseJSON.specificReasons.foo).toBeDefined();
      expect(jqXHR.responseJSON.specificReasons.foo[0].messageKey).toBe('not.a.number');
      expect(jqXHR.responseJSON.specificReasons.foo[0].params).toBeDefined();
      expect(jqXHR.responseJSON.specificReasons.foo[0].params.length).toBe(0);
      done();
    });
  });

  it('can reset the the object models after save failures', function(done) {
    var testFormModel;
    env.window.$.mockjax.clear(env.routes['/tests|post']);
    env.window.$.mockjax({
      url: '/tests',
      dataType: 'json',
      type: 'post',
      status: 404,
      responseTime: 100,
      response: function() {
        this.responseText = {
          'response':{
            'status':404,
            'statusInfo':{'statusCode':404,'reasonPhrase':'Not Found','family':'CLIENT_ERROR'},
          }
        };
      }
    });

    testFormModel = new FormModel({}, {model: testModel});
    expect(testFormModel.get('foo')).toBe(123);
    expect(testFormModel.get('bar')).toBe('test');
    expect(testModel.get('foo')).toBe(123);
    expect(testModel.get('bar')).toBe('test');
    testFormModel.set('foo', 444);
    testFormModel.set('bar', 'new value');
    testFormModel.save().done(function(responses) {
      console.log('Should have failed the save');
      expect(true).toBe(false);
      done();
    }).fail(function(responses) {
      expect(testModel.get('foo')).toBe(123);
      expect(testModel.get('bar')).toBe('test');
      done();
    });
  });

  it('can return the responses when saving to multiple object models', function(done) {
    var anotherTestModel = new TestModel(),
      testFormModel = new FormModel({}, {models: [{model: testModel, fields: ['foo']}, {model: anotherTestModel, fields: ['bar']}]});
    testFormModel.set('foo', 444);
    testFormModel.set('bar', 'new value');
    testFormModel.save().done(function(responses) {
      var testModelResponse = responses[testModel.cid],
        data = testModelResponse.response[0],
        textStatus = testModelResponse.response[1],
        jqXHR = testModelResponse.response[2],
        anotherResponse = responses[anotherTestModel.cid];
      expect(env.window._.size(responses)).toBe(2);
      expect(testModelResponse.success).toBe(true);
      expect(data.foo).toBe(444);
      expect(data.bar).toBe('test');
      expect(textStatus).toBe('success');
      expect(anotherResponse.success).toBe(true);
      expect(anotherResponse.response[0].foo).toBe(123);
      expect(anotherResponse.response[0].bar).toBe('new value');
      expect(anotherResponse.response[1]).toBe('success');
      done();
    }).fail(function(responses) {
      console.log('Should not have failed the save');
      expect(true).toBe(false);
      done();
    });
  });

  it('can return the responses when saving to multiple object models and failing', function(done) {
    var testModel2 = new TestModel2(),
      testFormModel = new FormModel({}, {models: [{model: testModel, fields: ['foo']}, {model: testModel2, fields: ['pieces']}]});
    env.window.$.mockjax.clear(env.routes['/tests|post']);
    env.window.$.mockjax({
      url: '/tests',
      dataType: 'json',
      type: 'post',
      status: 404,
      responseTime: 100,
      response: function() {
        this.responseText = {
          'error': '404'
        };
      }
    });
    testFormModel.set('foo', 444);
    testFormModel.set('pieces', 4);
    testFormModel.save().done(function(responses) {
      console.log('Should not have succeeded the save');
      expect(true).toBe(false);
      done();
    }).fail(function(responses) {
      var testModelResponse = responses[testModel.cid],
        jqXHR = testModelResponse.response[0],
        textStatus = testModelResponse.response[1],
        errorThrown = testModelResponse.response[2],
        testModel2Response = responses[testModel2.cid];
      expect(env.window._.size(responses)).toBe(2);
      expect(testModelResponse.success).toBe(false);
      expect(jqXHR.responseJSON.error).toBe('404');
      expect(textStatus).toBe('error');
      expect(errorThrown).toBe('OK');
      expect(testModel2Response.success).toBe(true);
      expect(testModel2Response.response[0].pieces).toBe(4);
      expect(testModel2Response.response[0].color).toBe('red');
      expect(testModel2Response.response[1]).toBe('success');
      done();
    });
  });

  //*********** Cache *************//

  it('can cache the most recent pulls from the object models to compare against', function() {
    var anotherTestModel = new TestModel(),
      testFormModel = new FormModel({}, {models: [{model: testModel, fields: ['foo']}, {model: anotherTestModel, fields: ['bar']}]});
    expect(testFormModel.get('foo')).toBe(123);
    expect(testFormModel._cache[testModel.cid]).toBe('{"foo":123}');
    testFormModel.startUpdating();
    testModel.set('foo', 555);
    expect(testFormModel._cache[testModel.cid]).toBe('{"foo":555}');
    testFormModel.stopUpdating();
  });

  it('can cache the most recent pulls from the object models used in a computed value', function() {
    var combinedFormModel = new FormModel({}, {
      computed: [{
        models: [{model: testModel, fields: ['bar']}],
        pull: function(bar) {
          this.set('baz', bar);
        }
      }]
    });
    expect(combinedFormModel.get('baz')).toBe('test');
    expect(combinedFormModel._cache[testModel.cid]).toBe('{"bar":"test"}');
    combinedFormModel.startUpdating();
    testModel.set('bar', 'new value');
    expect(combinedFormModel._cache[testModel.cid]).toBe('{"bar":"new value"}');
    combinedFormModel.stopUpdating();
  });
});