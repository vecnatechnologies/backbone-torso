(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('doc', ['clean'], function () {
    return gulp.src(config.app + '/**/*.js')
      .pipe($.yuidoc())
      .pipe(gulp.dest(config.docs))
  });

})();
