var Handlebars = require('hbsfy/runtime');
require('../../modules/handlebarsUtils')(Handlebars);

describe('handlebarsUtils spec: ', function() {
  describe('the "labelFor" helper', function() {
    it('generates a compliant "for" attribute', function() {
      var output = Handlebars.helpers.labelFor('fieldName', {hash: {value:"suffix"}});
      expect(output.string).toEqual('for="field-name-suffix"');
    });

    it('generates a compliant "for" attribute for foo[x] where "x" is a number', function() {
      var output = Handlebars.helpers.labelFor('fieldName[x].sub', {hash: {value:"demo", x: 123}});
      expect(output.string).toEqual('for="field-name-123_sub-demo"');
    });

    it('generates a compliant "for" attribute for foo[bar] where "bar" is a string', function() {
      var output = Handlebars.helpers.labelFor('fieldName[bar].sub', {hash: {value:"demo", bar: "abc"}});
      expect(output.string).toEqual('for="field-name_abc_sub-demo"');
    });
  });

  describe('the "bindModel" helper', function() {
    it('generates compliant "data-model", "data-feedback", "name", and "id" attributes', function() {
      var output = Handlebars.helpers.bindModel('fieldName', {hash: {value:"suffix"}});
      expect(output.string).toEqual('data-model="fieldName" data-feedback="fieldName" name="field-name" id="field-name-suffix" value="suffix"');
    });

    it('generates compliant "data-model", "data-feedback", "name", and "id" attributes for foo[x] where "x" is a number', function() {
      var output = Handlebars.helpers.bindModel('fieldName[x].sub', {hash: {value:"demo", x: 123}});
      expect(output.string).toEqual('data-model="fieldName[123].sub" data-feedback="fieldName[123].sub" name="field-name-123_sub" id="field-name-123_sub-demo" value="demo"');
    });

    it('generates compliant "data-model", "data-feedback", "name", and "id" attributes for foo[bar] where "bar" is a string', function() {
      var output = Handlebars.helpers.bindModel('fieldName[bar].sub', {hash: {value:"demo", bar: "abc"}});
      expect(output.string).toEqual('data-model="fieldName.abc.sub" data-feedback="fieldName[abc].sub" name="field-name_abc_sub" id="field-name_abc_sub-demo" value="demo"');
    });

    it('does not generate a "value" attribute when "noValueAttr" is set to true', function() {
      var output = Handlebars.helpers.bindModel('fieldName[bar].sub', {hash: {value:"demo", bar: "abc"}, noValueAttr: true});
      expect(output.string).toEqual('data-model="fieldName.abc.sub" data-feedback="fieldName[abc].sub" name="field-name_abc_sub" id="field-name_abc_sub-demo"');
    });
  });

  describe('the "feedback" helper', function() {
    it('generates a "data-feedback" attribute', function() {
      var output = Handlebars.helpers.feedback('fieldName', {hash: {value:"suffix"}});
      expect(output.string).toEqual('data-feedback="fieldName"');
    });

    it('generates a "data-feedback" attribute for foo[x] where "x" is a number', function() {
      var output = Handlebars.helpers.feedback('fieldName[x].sub', {hash: {value:"demo", x: 123}});
      expect(output.string).toEqual('data-feedback="fieldName[123].sub"');
    });

    it('generates a "data-feedback" attribute for foo[bar] where "bar" is a string', function() {
      var output = Handlebars.helpers.feedback('fieldName[bar].sub', {hash: {value:"demo", bar: "abc"}});
      expect(output.string).toEqual('data-feedback="fieldName[abc].sub"');
    });
  });

  describe('the "formAttr" helper', function() {
    it('generates valid form attributes for foo[x] where "x" is a number', function() {
      var output = Handlebars.helpers.formAttr('fieldName[x].sub', 'id, for', {hash: {value:"demo", x: 123}});
      expect(output.string).toEqual('id="field-name-123_sub-demo" for="field-name-123_sub-demo" value="demo"');
    });

    it('generates valid form attributes for foo[bar].abc where "bar" is a string', function() {
      var output = Handlebars.helpers.formAttr('fieldName[bar].sub', 'id, for', {hash: {value:"demo", bar: "abc"}});
      expect(output.string).toEqual('id="field-name_abc_sub-demo" for="field-name_abc_sub-demo" value="demo"');
    });
  });

  describe('the "dasherize" helper', function() {
    it('replaces camelCase with "-" and "." with "_"', function() {
      var output = Handlebars.helpers.dasherize('fieldName[x].sub');
      expect(output).toEqual('field-name[x]_sub');
    });
  });

  describe('the "injectFieldIndices" helper', function() {
    it('recognizes the variable "[x]" where "x" is a number, and replaces "x" with the value of the "x" using array notation', function() {
      var output = Handlebars.helpers.injectFieldIndices('test[x]-thisIsRegular-y', {x:123, y: 456});
      expect(output).toEqual('test[123]-thisIsRegular-y');
    });

    it('recognizes the variable "[bar]" where "bar" is a string, and replaces "bar" with the value of the "bar" using object notation', function() {
      var output = Handlebars.helpers.injectFieldIndices('foo[bar]', {bar:'abc'});
      expect(output).toEqual('foo.abc');
    });

    it('recognizes the variable "[bar]" where "bar" is a string, and replaces "bar" with the value of the "bar" using array notation when forceArrayNotation is set to true', function() {
      var output = Handlebars.helpers.injectFieldIndices('foo[bar]', {bar:'abc'}, {forceArrayNotation: true});
      expect(output).toEqual('foo[abc]');
    });
  });
})