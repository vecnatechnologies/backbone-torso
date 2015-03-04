(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      SpecReporter = require('jasmine-spec-reporter'),
      argv = require('minimist')(process.argv),
      test = function() {
        var testFile = argv.test || '*';
        return gulp.src([config.test + '/**/' + testFile + '.js'])
          .pipe($.jasmine({
            reporter: new SpecReporter({
              displayStacktrace: true,
              displaySpecDuration: true
            })
        }));
      };

  gulp.task('test', ['test-copy', 'test-templates', 'test-vendor-commonJs', 'test-vendor-globals'], test);
  gulp.task('test:clean', ['test-copy:clean', 'test-templates:clean', 'test-vendor-commonJs:clean', 'test-vendor-globals:clean'], test);

  gulp.task('test-rebuild-tests', ['test-copy', 'test-templates'], test);
  gulp.task('test-rebuild-src', ['test-vendor-commonJs', 'test-vendor-globals'], test);

})();
