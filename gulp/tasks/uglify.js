(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      uglify = function () {
        return gulp.src(config.dist + '/**/*.js')
          .pipe($.uglify())
          .pipe(gulp.dest(config.uglify))
      };

  gulp.task('uglify', ['bundle', 'copy'], uglify);
  gulp.task('uglify:clean', ['bundle:clean', 'copy:clean'], uglify);

})();
