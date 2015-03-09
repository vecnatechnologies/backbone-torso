(function() {
  'use strict';

  var gulp = require('gulp'),
      path = require('path'),
      $ = require('gulp-load-plugins')(),
      del = require('del'),
      paths = require('../../paths'),
      templatesCacheName = 'templates',
      lazypipe = require('lazypipe'),
      buildTestTemplatesPipe = lazypipe()
        .pipe($.cached, templatesCacheName)
        .pipe($.handlebars)
        .pipe($.wrap, 'var Handlebars = require("handlebars");\n module.exports = Handlebars.template(<%= contents %>);')
        .pipe(gulp.dest, paths.testTemplatesDest);

  gulp.task('test-templates', function() {
    return gulp.src(paths.testTemplatesSrc)
      .pipe(buildTestTemplatesPipe());
  });

  gulp.task('test-templates:watch', ['test-templates'], function () {
    var watcher = gulp.watch(paths.testTemplatesSrc, ['test-templates']);
    watcher.on('change', function (event) {
      var compiledTemplatePath = paths.testTemplatesDest + '/' + path.basename(event.path, '.hbs') + '.js';
      if (event.type === 'deleted') {
        delete $.cached.caches[templatesCacheName][event.path];
        del(compiledTemplatePath, function() {
          $.util.log($.util.colors.red("Handlebars template removed: " + compiledTemplatePath));
        })
      }
    });
  });

  module.exports = buildTestTemplatesPipe;
})();
