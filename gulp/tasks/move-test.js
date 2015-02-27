(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('move-test', function() {
    return gulp.src(config.testSrc + '/**/*.js')
      .pipe(gulp.dest(config.testEnv));
  });

})();
