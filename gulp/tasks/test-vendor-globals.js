(function() {
  'use strict';

  var gulp = require('gulp');
  var gulpUtil = require('gulp-util');
  var $ = require('gulp-load-plugins')();
  var paths = require('../../paths');
  var lazypipe = require('lazypipe');
  var bundleFile = paths.bundleDest + '/torso-bundle.js';
  var test = require('./test-import');

  function testVendorGlobals() {
    return gulp.src(['node_modules/jquery/dist/jquery.js',
                     'node_modules/underscore/underscore.js',
                     'node_modules/backbone/backbone.js',
                     'node_modules/backbone-nested/backbone-nested.js',
                     'node_modules/backbone.stickit/backbone.stickit.js',
                     'node_modules/handlebars/dist/handlebars.js',
                     'node_modules/jquery-mockjax/dist/jquery.mockjax.js',
                     bundleFile])
      .pipe($.concatUtil(paths.testGlobalsEnvFile))
      .pipe(gulp.dest(paths.testSandbox));
  }

  gulp.task('test-vendor-globals', gulp.series('bundle', testVendorGlobals));
  gulp.task('test-vendor-globals:watch', gulp.series(gulp.parallel('bundle:watch', 'test-vendor-globals'), function() {
    gulp.watch(bundleFile, ['test-vendor-globals']);
    gulp.watch([paths.testGlobalsEnv], test.bind(this, []));
    gulp.watch([paths.testGlobalsEnv, paths.testImport + '/globalImports.js'],
               test.bind(this, [{ folder: paths.testImport, test: 'globalImports' }]));
  }));

})();
