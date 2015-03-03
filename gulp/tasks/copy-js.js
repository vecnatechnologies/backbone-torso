(function() {
  'use strict';

  var gulp = require('gulp'),
      config = require('../config');

  gulp.task('copy-js', function () {
    return gulp.src([config.app + '/**/*.js'])
      .pipe(gulp.dest(config.dist));
  });
})();
