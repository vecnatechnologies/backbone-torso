(function() {
  'use strict';

  var gulp = require('gulp'),
      config = require('../config'),
      test = require('./test');

  gulp.task('src-watch', function() {
    gulp.watch(config.appSrc, ['test-rebuild-src']);
  });
})();
