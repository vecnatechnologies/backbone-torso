(function() {
  'use strict';

  var _ = require('underscore'),
      gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      merge = require('merge-stream'),
      paths = require('../../paths'),
      globalImportsTest = 'globalImports',
      commonJsImportsTest = 'commonJsImports',
      SpecReporter = require('jasmine-spec-reporter'),
      argv = require('minimist')(process.argv),
      lazypipe = require('lazypipe'),
      testPipe = lazypipe()
        .pipe($.jasmine, {
          reporter: new SpecReporter({
            displayStacktrace: true,
            displaySpecDuration: true
          })
        }),
      test = function(testPaths, callback) {
        var testIndex, testPath, testSources = [];
        testPaths = testPaths || [];
        if (testPaths.length <= 0) {
          testPaths.push({});
        }
        // Convert each test configuration to a source path.
        for (testIndex = 0; testIndex < testPaths.length; testIndex++) {
          testPath = _.extend({}, testPaths[testIndex]);
          // Override all tests to only run the ones specified in the command line.
          if (argv['test-folder']) {
            testPath.folder = paths.testSpec + '/' + argv['test-folder'];
          }
          if (argv['test']) { 
            testPath.test = argv.test;
          }
          // If either test or folder are not specified then use the defaults (all tests in the functional spec folder).
          testSources.push((testPath.folder || paths.testFunctional) + '/**/' + (testPath.test || '*') + '.js')
        }
        return gulp.src(testSources)
          .pipe(testPipe());
      };

  // the advantage of these tasks is that they have minimal dependencies for their tests, so global based stuff doesn't run browserify.
  gulp.task('test:functional', ['test-templates', 'test-vendor-globals'], test);
  gulp.task('test:globalImports', ['test-templates', 'test-vendor-globals'],
    test.bind(this, [{ folder: paths.testImport, test: globalImportsTest }]));
  gulp.task('test:commonJsImports', ['test-vendor-commonJs:test']);

  // test is subtly different than running the 3 tasks above since it runs all of the tests in 2 runs of jasmine instead of 3.
  // CommonJsImport test is special and test-vendor-commonJs manages when to run it.
  gulp.task('test', ['test-templates', 'test-vendor-globals', 'test-vendor-commonJs'],
    test.bind(this, [{ folder: paths.testImport }, {}]));

  // test:watch is sufficient parallelized that individual commands for each test type doesn't make sense.
  gulp.task('test:watch', ['test-templates:watch', 'test-vendor-commonJs:watch', 'test-vendor-globals:watch'], function() {
    test([{ folder: paths.testImport, test: globalImportsTest }, {}]);
    gulp.watch([paths.testFunctionalSrc, paths.testSourceSrc], test);
  });

  module.exports = test;

})();
