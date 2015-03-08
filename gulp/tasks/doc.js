(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      del = require('del'),
      paths = require('../../paths'),
      lazypipe = require('lazypipe'),
      allDocSrc = [paths.modulesSrc, paths.testSrc, paths.testTemplatesSrc, paths.gulpSrc, './paths.js', './gulpfile.js'],
      docPipe = lazypipe()
        .pipe($.yuidoc)
        .pipe(gulp.dest, paths.docsDest);

  gulp.task('doc', function(callback) {
    del([paths.docsDest], function() {
      gulp.src(allDocSrc)
        .pipe(docPipe())
        .on('end', callback);
    });
  });

  gulp.task('doc:watch', ['doc'], function () {
    gulp.watch(allDocSrc, ['doc']);
  });

  module.exports = docPipe;

})();
