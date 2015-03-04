(function() {
  'use strict';

  var gulp = require('gulp'),
      config = require('../config'),
      test = require('./test');

  gulp.task('test-watch', function() {
    gulp.watch(config.testAll, ['test-rebuild-tests']);
  });
})();
