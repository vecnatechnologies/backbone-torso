(function() {
  'use strict';

  var gulp = require('gulp');

  gulp.task('build', ['compressed-scripts', 'yuidoc', 'move-test', 'test-vendor', 'templates', 'test']);

})();
