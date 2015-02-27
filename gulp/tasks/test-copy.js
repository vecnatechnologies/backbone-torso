(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      testCopy = function() {
        return gulp.src(config.testSrc + '/**/*.js')
          .pipe(gulp.dest(config.testEnv));
      };

  gulp.task('test-copy', testCopy);
  gulp.task('test-copy:clean', ['clean'], testCopy);

})();
