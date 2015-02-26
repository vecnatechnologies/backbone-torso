var targetPath = '../../../target',
  testPath = targetPath + '/test',
  spyOnBackbone = require('./backboneSpy');

describe("A Form Model's Validation", function() {
  var FormModel, env, $, _;

  /**
   * Set up virtual dom and dependencies
   */
  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      FormModel = env.window.WebCore.Models.Form;
      done();
    });
  });

  it("can validate using custom functions", function() {
    var formModel = new FormModel({
      A: 0
    }, {
      validation: {
        A: function() {
          return (this.get('A') === 10) ? false : 'A must be Ten';
        }
      }
    });

    formModel.validate();
    expect(formModel.isValid('A')).toBe(false);

    formModel.set('A', 10);
    formModel.validate();
    expect(formModel.isValid('A')).toBe(true);
  });

  it("can generate errors for dependent fields", function() {
    var errors, formModel;

    formModel = new FormModel({
      A: 0,
      B: 0
    }, {
      validation: {
        isTen: function() {
          return (this.get('A') + this.get('B') === 10) ? false : 'A + B do not make Ten';
        }
      }
    });

    errors = formModel.validate();
    expect(errors).toBeDefined();
    expect(errors.isTen).toBe('A + B do not make Ten');

    formModel.set('A', 3);
    formModel.set('B', 7);
    errors = formModel.validate();
    expect(errors).not.toBeDefined();
  });

  it("can override error messages", function() {
    var formModel = new FormModel({
      email: 'potato@fake',
    }, {
      validation: {
        email: {
          pattern: 'email',
          msg: 'Don\'t be playin\''
        }
      }
    });

    var errors = formModel.validate();
    expect(errors).toBeDefined();
    expect(errors.email).toBe('Don\'t be playin\'');

    formModel.set('email', 'potato@real.org');
    var errors = formModel.validate();
    expect(errors).toBeUndefined();
  });

  it("can specify messages for different types of errors", function() {
    var formModel = new FormModel({
      email: '',
    }, {
      validation: {
        email: [{
          required: true,
          msg: 'required'
        },{
          pattern: 'email',
          msg: 'invalid'
        }]
      }
    });

    var errors = formModel.validate();
    expect(errors).toBeDefined();
    expect(errors.email).toBe('required');

    formModel.set('email', 'badValue');
    var errors = formModel.validate();
    expect(errors).toBeDefined();
    expect(errors.email).toBe('invalid');
  });

  it("can prevalidate without a value passed in", function() {
    var formModel = new FormModel({
      email: '',
    }, {
      validation: {
        email: [{
          required: true,
          msg: 'required'
        },{
          pattern: 'email',
          msg: 'invalid'
        }]
      }
    });

    var errors = formModel.preValidate('email');
    expect(errors).toBeDefined();
    expect(errors).toBe('required');

    formModel.set('email', 'badValue');
    errors = formModel.preValidate('email');
    expect(errors).toBeDefined();
    expect(errors).toBe('invalid');

    errors = formModel.preValidate('email', '');
    expect(errors).toBeDefined();
    expect(errors).toBe('required');
  });

  it('can validate using a built-in function with ability to format', function() {
    var formModel = new FormModel({
      email: '',
    }, {
      validation: {
        email: [{
          required: true,
          msgKey: 'my.i18n.key'
        }]
      }
    });
    var errors = formModel.validate();
    expect(errors.email).toBe('my.i18n.key');
  });


  describe('during multifield validation', function() {
    describe('at a form level', function() {
      // normal fields validating
      xit('validate using two attributes and produce form-level error', function() {

      });
    });

    describe('at a field level', function() {
      // normal fields validating
      xit('validate using two attributes and produce an error for one of the fields', function() {

      });
    });
  });
});
