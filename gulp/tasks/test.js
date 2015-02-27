(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      SpecReporter = require('jasmine-spec-reporter'),
      argv = require('minimist')(process.argv.slice(3));

  gulp.task('test', ['compressed-scripts', 'move-test', 'templates', 'test-vendor'], function() {
    var testFile = argv.file || '*';
    return gulp.src([config.test + '/**/' + testFile + '.js'])
      .pipe($.jasmine({
        reporter: new SpecReporter({
          displayStacktrace: true,
          displaySpecDuration: true
        })
    }));
  });
})();
