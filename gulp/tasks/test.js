(function() {
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var paths = require('../../paths');
  var test = require('./test-import');
  var globalImportsTest = 'globalImports';
  var commonJsImportsTest = 'commonJsImports';


  // the advantage of these tasks is that they have minimal dependencies for their tests, so global based stuff doesn't run browserify.
  gulp.task('test:globalImports', gulp.series('test-vendor-globals',
    test.bind(this, [{ folder: paths.testImport, test: globalImportsTest }])));
  gulp.task('test:commonJsImports', gulp.series('test-vendor-commonJs:test'));

  // test is subtly different than running the 3 tasks above since it runs all of the tests in 2 runs of jasmine instead of 3.
  // CommonJsImport test is special and test-vendor-commonJs manages when to run it.
  gulp.task('test-import', gulp.series(gulp.parallel('test-vendor-globals', 'test-vendor-commonJs'),
    test.bind(this, [{ folder: paths.testImport }, {}])));

  // test:watch is sufficient parallelized that individual commands for each test type doesn't make sense.
  gulp.task('test-import:watch', gulp.series(gulp.parallel('test-vendor-commonJs:watch', 'test-vendor-globals:watch'), function() {
    test([{ folder: paths.testImport, test: globalImportsTest }, {}]);
    gulp.watch([paths.testFunctionalSrc, paths.testSourceSrc], test.bind(this, []));
  }));

})();
