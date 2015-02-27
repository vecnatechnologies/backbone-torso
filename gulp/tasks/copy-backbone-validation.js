(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('copy-backbone-validation', function () {
    return gulp.src([config.app + '/backbone-validation.js'])
      .pipe(gulp.dest(config.dist));
  });

})();
