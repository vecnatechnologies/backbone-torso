(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('uglify', ['bundle', 'copy'], function () {
    return gulp.src(config.dist + '/**/*.js')
      .pipe($.uglify())
      .pipe(gulp.dest(config.uglify))
  });

})();
