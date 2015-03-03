(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('test-vendor-globals', ['copy-js', 'move-test'], function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js',
                     'node_modules/underscore/underscore-min.js',
                     'node_modules/backbone/backbone-min.js',
                     'node_modules/backbone-nested/backbone-nested.js',
                     'node_modules/backbone.stickit/backbone.stickit.js',
                     'node_modules/handlebars/dist/handlebars.js',
                     'node_modules/jquery-mockjax/jquery.mockjax.js',
                     config.dist + '/torso.js',
                     config.dist + '/backbone/models/TorsoFormModel.js',
                     config.dist + '/backbone/models/TorsoNestedModel.js',
                     config.dist + '/backbone/views/TorsoFormView.js'])
               .pipe($.concatUtil('testEnv.js'))
               .pipe(gulp.dest(config.testEnv));
  });

})();
