(function() {
  'use strict';

  var gulp = require('gulp'),
      path = require('path'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      testVendorCommonJs = function() {
        return gulp.src(config.appSrc)
                   .pipe($.tap(function (file, through) {
                      file.contents = Buffer.concat([
                        new Buffer('require("./' + path.relative(config.app, file.path) + '");')
                      ]);
                    }))
                   .pipe($.browserify({
                      transform: ['requireify']
                    }))
                   .pipe(gulp.dest(config.testEnv + '/browserified/'));
      };

  gulp.task('test-vendor-commonJs', testVendorCommonJs);
  gulp.task('test-vendor-commonJs:clean', ['clean'], testVendorCommonJs);

})();
