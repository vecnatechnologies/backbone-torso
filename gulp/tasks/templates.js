(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('templates', function(){
    return gulp.src(config.testSrc + '/**/*.hbs')
      .pipe($.handlebars())
      .pipe($.wrap('var Handlebars = require("handlebars"); module.exports = Handlebars.template(<%= contents %>);'))
      .pipe(gulp.dest(config.testEnv));
  });

})();
