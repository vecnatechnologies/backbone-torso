(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      paths = require('../../paths'),
      lazypipe = require('lazypipe'),
      bundlePipe = lazypipe()
        .pipe($.jshint)
        .pipe($.jshint.reporter, 'jshint-stylish', { verbose: true })
        .pipe($.jshint.reporter, 'fail')
        .pipe($.concatUtil, 'torso-bundle.js')
        .pipe(gulp.dest, paths.bundleDest)
        .pipe($.rename, { extname: '.min.js' })
        .pipe($.uglify)
        .pipe(gulp.dest, paths.bundleDest);

  gulp.task('bundle', function() {
    return gulp.src([paths.modules + '/guidManager.js',
                     paths.modules + '/handlebarsUtils.js',
                     paths.modules + '/stickitUtils.js',
                     paths.modules + '/templateRenderer.js',
                     paths.modules + '/collectionLoadingMixin.js',
                     paths.modules + '/pollingMixin.js',
                     paths.modules + '/collectionRegistrationMixin.js',
                     paths.modules + '/cellPersistenceRemovalMixin.js',
                     paths.modules + '/Cell.js',
                     paths.modules + '/ServiceCell.js',
                     paths.modules + '/Router.js',
                     paths.modules + '/Events.js',
                     paths.modules + '/Collection.js',
                     paths.modules + '/Model.js',
                     paths.modules + '/NestedModel.js',
                     paths.modules + '/NestedCell.js',
                     paths.modules + '/validation.js',
                     paths.modules + '/FormModel.js',
                     paths.modules + '/View.js',
                     paths.modules + '/ListView.js',
                     paths.modules + '/FormView.js'])
      .pipe(bundlePipe());
  });
  gulp.task('bundle:watch', ['bundle'], function() {
    gulp.watch(paths.modulesSrc, ['bundle']);
  });

  module.exports = bundlePipe;

})();
