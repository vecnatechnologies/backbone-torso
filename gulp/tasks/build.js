(function() {
  'use strict';

  var gulp = require('gulp');

  gulp.task('build', ['copy-js', 'yuidoc', 'move-test', 'test-vendor', 'templates', 'test']);

})();
