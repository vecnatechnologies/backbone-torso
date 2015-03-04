(function() {
  'use strict';

  var gulp = require('gulp');

  gulp.task('build', ['uglify', 'doc', 'test']);
  gulp.task('build:clean', ['uglify:clean', 'doc:clean', 'test:clean']);

})();
