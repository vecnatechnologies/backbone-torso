// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

describe('A Form Model during the conversion to and from a View/Template', function() {

  it('will have a single form attribute per DOM form field');

  it('updates to the DOM form field will update the corresponding form attribute');

  it('validation report from the form models validate function will correctly be reflected in the DOM');

  it('validation will be triggered at the correct times during DOM interaction');

  it('updates to the form model will update the DOM correctly and immiedately');

  it('will allow the View access to the validation report');

  it('all text will be shown in proper i18n');

  it('will block incorrect inputs based on validation rules provided by the form model');

  it('has failure messages that are be configurable in the length of visability');

})