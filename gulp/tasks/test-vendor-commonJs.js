(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('test-vendor-commonJs', ['copy-js', 'move-test'], function() {
    return gulp.src([config.testSrc + '/setupCommonJs.js'])
               .pipe($.browserify({ transform: ['requireify']}))
               .pipe($.rename('testCommonJsEnv.js'))
               .pipe(gulp.dest(config.testEnv));
  });

})();
