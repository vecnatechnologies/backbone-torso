(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('clean', function () {
    return gulp.src(config.dest)
      .pipe($.clean());
  });

})();
