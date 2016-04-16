var FormView = require('../../modules/FormView');
var FormModel = require('../../modules/FormModel');
var _ = require('underscore');
var $ = require('jquery');
var TestModel = require('./helpers/TestModel');
var TestModel2 = require('./helpers/TestModel2');
var spyOnBackbone = require('./helpers/spyOnBackbone');
var setupInjectionSite = require('./helpers/setupInjectionSite');

describe('A Form View saving', function() {
  var testModel, testModel2, testFormModel, routes;

  setupInjectionSite.apply(this);

  beforeEach(function() {
    routes = require('./helpers/mockjax')();
    testModel = new TestModel();
  });

  //********** Save *********/

  it('can consume response from failed server-side save from the object model and update view', function(done) {

    var testFormModel, View, view;
    $.mockjax.clear(routes['/tests|post']);
    $.mockjax({
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
              'fullName': [{'messageKey':'not.a.name',
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

    testFormModel = new FormModel({}, {
      mapping: {
        testModel: true
      },
      models: {
        testModel: testModel
      }
    });
    View = FormView.extend({
      template: require('./helpers/save-errors-template.hbs'),
      events: {
        'click .submit': 'submit'
      },
      submit: function(evt) {
        var self = this;
        testFormModel.save().done(function(responses) {
          console.log('Save did not invoke fail');
          expect(true).toBe(false);
          done();
        }).fail(function(responses) {
          var testModelResponse = responses[testModel.cid],
            jqXHR = testModelResponse.response[0],
            textStatus = testModelResponse.response[1],
            errorThrown = testModelResponse.response[2];
          self.handleServerResponse(jqXHR.responseJSON.generalReasons, jqXHR.responseJSON.specificReasons);
          //self.handleServerResponse(jqXHR.responseJSON.generalReasons, jqXHR.responseJSON.specificReasons, function(error) {return $.i18n(error.messageKey, error.params) });
          done();
        });
      },
      handleServerResponse: function(generalFeedback, fieldFeedback, formatter) {
        formatter = formatter || function(error) { return error; }
        _.each(generalFeedback, function(error) {
          this._errors.push(formatter(error));
        }, this);
        _.each(fieldFeedback, function(errors, field) {
          _.each(errors, function(error) {
            this.model.set(field, {text: formatter(error)});
          }, this);
        }, this);
        this.render();
      }
    });
    view = new View({
      model: testFormModel
    });
    view.attachTo(this.$app);
    view.$el.find('.submit').click();
  });

  describe('if the initialize method adds a persisted model with fields and contains a render method', function() {
    it('will initialize with no errors', function() {

      var InitializedFormView = FormView.extend({
        template: '<input type="text" data-model="category" id="category"/>',
        initialize: function(options) {
          this.persistedModel = new TestModel();

          this.model.setMapping('persistedModel', 'category', this.persistedModel);

          this.render();
        }
      });

      var initializedFormView = new InitializedFormView();
      expect(initializedFormView).toBeDefined();
    });
  });
});