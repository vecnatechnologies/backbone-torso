(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      paths = require('../../paths'),
      lazypipe = require('lazypipe'),
      bundleFile = paths.bundleDest + '/torso-bundle.js',
      test = require('./test'),
      testVendorGlobalsPipe = lazypipe()
        .pipe(gulp.src, ['node_modules/jquery/dist/jquery.js',
                         'node_modules/underscore/underscore.js',
                         'node_modules/backbone/backbone.js',
                         'node_modules/backbone-nested/backbone-nested.js',
                         'node_modules/backbone.stickit/backbone.stickit.js',
                         'node_modules/handlebars/dist/handlebars.js',
                         'node_modules/jquery-mockjax/jquery.mockjax.js',
                         bundleFile])
        .pipe($.concatUtil, paths.testGlobalsEnvFile)
        .pipe(gulp.dest, paths.testSandbox);

  gulp.task('test-vendor-globals', ['bundle'], testVendorGlobalsPipe);
  gulp.task('test-vendor-globals:watch', ['bundle:watch', 'test-vendor-globals'], function() {
    gulp.watch(bundleFile, ['test-vendor-globals']);
    gulp.watch([paths.testGlobalsEnv], test);
    gulp.watch([paths.testGlobalsEnv, paths.testImport + '/globalImports.js'],
               test.bind(this, [{ folder: paths.testImport, test: 'globalImports' }]));
  });

  module.exports = testVendorGlobalsPipe;

})();
