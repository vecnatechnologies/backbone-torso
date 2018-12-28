(function() {
  'use strict';

  var gulp = require('gulp');

  gulp.task('prepublish', gulp.series('bundle'));

})();
