(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('test-copy', ['clean'], function() {
    return gulp.src(config.testSrc + '/**/*.js')
      .pipe(gulp.dest(config.testEnv));
  });

})();
