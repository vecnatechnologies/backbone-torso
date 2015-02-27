(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('copy-js', function () {
    return gulp.src([config.app + '/backbone/**/*.js'])
      .pipe(gulp.dest(config.dist + '/backbone'));
  });

})();
