(function() {
  'use strict';

  var _ = require('underscore'),
      gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      merge = require('merge-stream'),
      paths = require('../../paths'),
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
          if (argv['test-folder'] || argv['test']) {
            testPath.folder = argv['test-folder'] ? paths.testSpec + '/' + argv['test-folder'] : undefined;
            testPath.test = argv.test;
          }
          // If either test or folder are not specified then use the defaults (all tests in the functional spec folder).
          testSources.push((testPath.folder || paths.testFunctional) + '/**/' + (testPath.test || '*') + '.js')
        }
        return gulp.src(testSources)
          .pipe(testPipe());
      };

  module.exports = test;

})();
