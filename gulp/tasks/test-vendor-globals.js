(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      testVendorGlobals = function() {
        return gulp.src(['node_modules/jquery/dist/jquery.min.js',
                         'node_modules/underscore/underscore-min.js',
                         'node_modules/backbone/backbone-min.js',
                         'node_modules/backbone-nested/backbone-nested.js',
                         'node_modules/backbone.stickit/backbone.stickit.js',
                         'node_modules/handlebars/dist/handlebars.js',
                         'node_modules/jquery-mockjax/jquery.mockjax.js',
                         config.dist + '/torso-bundle.js'])
                   .pipe($.concatUtil('testEnv.js'))
                   .pipe(gulp.dest(config.testEnv));
      };

  gulp.task('test-vendor-globals', ['bundle'], testVendorGlobals);
  gulp.task('test-vendor-globals:clean', ['clean', 'bundle:clean'], testVendorGlobals);

})();
