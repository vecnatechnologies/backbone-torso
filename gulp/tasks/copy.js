(function() {
  'use strict';

  var gulp = require('gulp'),
      config = require('../config');

  gulp.task('copy', ['clean'], function () {
    return gulp.src([config.app + '/**/*.js'])
      .pipe(gulp.dest(config.dist));
  });
})();
