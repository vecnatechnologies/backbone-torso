(function() {
  'use strict';

  var gulp = require('gulp');

  gulp.task('develop', ['build', 'watch']);
  gulp.task('develop:clean', ['build:clean', 'watch']);

})();
