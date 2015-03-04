(function() {
  'use strict';

  var gulp = require('gulp'),
      path = require('path'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('test-vendor-commonJs', ['clean'], function() {
    return gulp.src([config.app + '/**/*.js'])
               .pipe($.tap(function (file, through) {
                  file.contents = Buffer.concat([
                    new Buffer('require("./' + path.relative(config.app, file.path) + '");')
                  ]);
                }))
               .pipe($.browserify({
                  transform: ['requireify']
                }))
               .pipe(gulp.dest(config.testEnv + '/browserified/'));
  });

})();
