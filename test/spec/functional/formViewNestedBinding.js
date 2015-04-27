var testSrcPath = '../../source',
    spyOnBackbone = require('./backboneSpy');

describe("A Form View's nested two-way binding", function() {
  var model, view, NestedExampleFormModel, NestedExampleFormView,
      init, $, _, env;

  /**
   * Sets up test view
   */
   beforeEach(function(done) {
    require('./clientEnv')().done(function(environment) {
      env = environment;
      $ = env.window.$;
      _ = env.window._;

      /* Example Form Model */
      NestedExampleFormModel = require(testSrcPath + '/NestedExampleFormModel')(env.window.Torso.FormModel, _);

      /* Example form view */
      NestedExampleFormView = require(testSrcPath + '/NestedExampleFormView')(env.window.Torso.FormView, _);

      /* Create basic model and view */
      model = new NestedExampleFormModel();
      view = new NestedExampleFormView({
        model: model
      });
      $('body').append(view.$el);

      done();
    });
  });

  afterEach(function() {
   view.dispose();
  });



/**
validations on foo and bar but binding on foo, bar, baz
validations on foo, bar, customFormLevel but binding on foo, bar
validations on foo, bar and bindings on foo, bar


FOR ARRAYS:
validations on foo[] and bar but binding on foo[], bar, baz

validations on foo[], bar, customFormLevel but binding on foo[], bar

validations on foo[], bar and bindings on foo[], bar
**/



  /******** PREFILLING FormView from FormModel ********/

  xit('can prefill DOM text input that correspond to FormModel "specific" array attribute (ex. foo[1]) ', function() {

  });

  xit('can prefill DOM text input that correspond to FormModel nested attribute (ex. foo.bar)', function() {

  });

  xit('can prefill DOM text input that correspond to FormModel multi-nested attribute (ex. foo.bar.baz)', function() {

  });

  xit('can prefill ALL DOM text inputs that correspond to FormModel "open" array attribute (ex. foo[])', function() {

  });

  xit('can prefill ALL DOM text inputs that correspond to FormModel double "open" array attribute (ex. foo[][])', function() {

  });

  xit('can prefill ALL DOM text inputs that correspond to FormModel "open" array attr under "specific" array attr (ex. foo[2][])', function() {

  });

  xit('can prefill ALL DOM text inputs that correspond to FormModel nested "specific" array attr under "open" array attr (ex. foo[].bar[1])', function() {

  });

  xit('can prefill ALL DOM text inputs that correspond to FormModel nested "open" array attr (ex. foo.bar[])', function() {

  });

  xit('can prefill DOM text input that correspond to FormModel nested attr under "specific" array attr (ex. foo[1].bar)', function() {

  });

  xit('can prefill ALL DOM text input that corresponds to FormModel nested attribute under a "open" array (ex. when mapping foo[].bar)', function() {

  });

  xit('can prefill DOM text input that correspond to FormModel "specific" array entry under a nested attr (ex. foo.bar[1])', function() {

  });

  xit('can prefill DOM text input that correspond to FormModel double "specific" array entry (ex. foo[0][1])', function() {

  });

  /******** UPDATING from FormModel to FormView ********/

  xit("can update DOM text input on change of FormModel array attribute (ex. foo[1]) ", function() {
    expect(view.$el.find('[id="user-addrs[0].street"]').val()).toBe('4 bumble rd.');
    model.set('userAddrs[0]', {
      street: '123 nectar st.',
      state: 'Beetown'
    });
    expect(view.$el.find('[id="user-addrs[0].street"]').val()).toBe('123 nectar st.');
  });

  xit('can update DOM text input on change of FormModel "specific" array attribute (ex. foo[1]) ', function() {

  });

  xit('can update DOM text input on change of FormModel nested attribute (ex. foo.bar)', function() {

  });

  xit('can update DOM text input on change of FormModel multi-nested attribute (ex. foo.bar.baz)', function() {

  });

  xit('can update ALL DOM text inputs on change of FormModel "open" array attribute (ex. foo[])', function() {

  });

  xit('can update ALL DOM text inputs on change of FormModel double "open" array attribute (ex. foo[][])', function() {

  });

  xit('can update ALL DOM text inputs on change of FormModel "open" array attr under "specific" array attr (ex. foo[2][])', function() {

  });

  xit('can update ALL DOM text inputs on change of FormModel nested "specific" array attr under "open" array attr (ex. foo[].bar[1])', function() {

  });

  xit('can update ALL DOM text inputs on change of FormModel nested "open" array attr (ex. foo.bar[])', function() {

  });

  xit('can update DOM text input on change of FormModel nested attr under "specific" array attr (ex. foo[1].bar)', function() {

  });

  xit('can update ALL DOM text inputs on change of FormModel nested attribute under a "open" array (ex. when mapping foo[].bar)', function() {

  });

  xit('can update DOM text input on change of FormModel "specific" array entry under a nested attr (ex. foo.bar[1])', function() {

  });

  xit('can update DOM text input on change of FormModel double "specific" array entry (ex. foo[0][1])', function() {

  });

  /******** PULLING from FormModel to FormView ********/

  xit("can update model's array attributes on change of DOM text inputs", function() {
    expect(model.get('ranking')).toBe('');
    view.$el.find('#ranking').val('cadet').change();
    expect(model.get('ranking')).toBe('cadet');
  });

});
