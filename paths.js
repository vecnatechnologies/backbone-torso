(function() {
  'use strict';

  var modules = './modules';
  var test = './test';
  var testSandbox = './testSandbox';
  var testBrowserifiedDest = testSandbox + '/browserified';
  var testSource = test + '/source';
  var testSpec = test + '/spec';
  var testImport = testSpec + '/import';
  var testFunctional = testSpec + '/functional';
  var allJsExtension = '/**/*.js';
  var allHandlebarsExtension = '/**/*.hbs';
  var testEnvFile = 'testEnv.js';

  module.exports = {
    gulpSrc: './gulp' + allJsExtension,
    modules: modules,
    modulesSrc: modules + allJsExtension,
    testSrc: test + allJsExtension,
    testSpec: testSpec,
    testFunctional: testFunctional,
    testFunctionalSrc: testFunctional + allJsExtension,
    testImport: testImport,
    testImportSrc: testImport + allJsExtension,
    testSpecSrc: testSpec + allJsExtension,
    testSourceSrc: testSource + allJsExtension,
    testTemplatesSrc: testSource + allHandlebarsExtension,
    bundleDest: '.',
    docsApiDest: './docs/api',
    docsApiMdDest: './docs/apimd',
    docsAnnotatedDest: './docs/annotated',
    testSandbox: testSandbox,
    testTemplatesDest: testSandbox + '/templates',
    testBrowserifiedDest: testBrowserifiedDest,
    testBrowserifiedDestSrc: testBrowserifiedDest + allJsExtension,
    testGlobalsEnv: testSandbox + testEnvFile,
    testGlobalsEnvFile: testEnvFile
  };
})();
