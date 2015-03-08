(function() {
  'use strict';

  var gulp = require('gulp'),
      del = require('del'),
      paths = require('../../paths');

  gulp.task('clean', function(callback) {
    del([paths.bundleDest + '/torso-bundle*.js',
         paths.docsDest,
         paths.testSandbox],
        callback);
  });

})();
