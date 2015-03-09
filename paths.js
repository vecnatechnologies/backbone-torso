(function() {
  'use strict';

  var modules = './modules',
      test = './test',
      testSandbox = './testSandbox',
      testBrowserifiedDest = testSandbox + '/browserified',
      testSource = test + '/source',
      testSpec = test + '/spec',
      testImport = testSpec + '/import',
      testFunctional = testSpec + '/functional',
      allJsExtension = '/**/*.js',
      allHandlebarsExtension = '/**/*.hbs',
      testEnvFile = 'testEnv.js';

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
    bundleDest: './',
    docsDest: './docs/js',
    testSandbox: testSandbox,
    testTemplatesDest: testSandbox + '/templates',
    testBrowserifiedDest: testBrowserifiedDest,
    testBrowserifiedDestSrc: testBrowserifiedDest + allJsExtension,
    testGlobalsEnv: testSandbox + testEnvFile,
    testGlobalsEnvFile: testEnvFile
  };
})();
