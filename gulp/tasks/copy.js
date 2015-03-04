(function() {
  'use strict';

  var gulp = require('gulp'),
      config = require('../config'),
      copy = function () {
        return gulp.src(config.appSrc)
          .pipe(gulp.dest(config.dist));
      };

  gulp.task('copy', copy);
  gulp.task('copy:clean', ['clean'], copy);
})();
