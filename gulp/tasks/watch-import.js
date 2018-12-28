(function() {
  'use strict';

  var gulp = require('gulp');

  gulp.task('watch-import', gulp.series('test-import:watch'));

})();
