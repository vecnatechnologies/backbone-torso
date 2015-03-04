(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      doc = function () {
        return gulp.src(config.app + '/**/*.js')
          .pipe($.yuidoc())
          .pipe(gulp.dest(config.docs))
      };

  gulp.task('doc', doc);
  gulp.task('doc:clean', ['clean'], doc);

})();
