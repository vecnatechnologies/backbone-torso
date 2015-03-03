(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      SpecReporter = require('jasmine-spec-reporter'),
      argv = require('minimist')(process.argv);

  gulp.task('test', ['copy-js', 'move-test', 'templates', 'test-vendor'], function() {
    var testFile = argv.test || '*';
    return gulp.src([config.test + '/**/' + testFile + '.js'])
      .pipe($.jasmine({
        reporter: new SpecReporter({
          displayStacktrace: true,
          displaySpecDuration: true
        })
    }));
  });
})();
