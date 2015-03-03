(function() {
  'use strict';

  var gulp = require('gulp');

  gulp.task('test-vendor', ['copy-js', 'move-test', 'test-vendor-globals', 'test-vendor-commonJs']);

})();
