(function() {
  'use strict';

  var buildPaths, onError,
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    SpecReporter = require('jasmine-spec-reporter'),
    argv = require('minimist')(process.argv.slice(3));

  buildPaths = {
    app: 'src/main/javascript',
    test: 'src/test/spec',
    testSrc: 'src/test/source',
    testEnv: 'dist/test',
    dist: 'dist/compressed',
    docs: 'dist/jsdocs'
  };

  onError = function(err) {
    $.util.log($.util.colors.red(err.message));
    this.emit('end');
  };

  gulp.task('compressed-scripts', function () {
    return gulp.src(buildPaths.app + '/**/*.js')
      .pipe($.concatUtil('torso.js'))
      .pipe($.concatUtil.header('(function(root, factory) {\n' +
          'if (typeof define === "function" && define.amd) {\n' +
            'define(["underscore", "jquery", "backbone", "handlebars", "backbone-nested", "backbone-stickit", "backbone-validation"], function(_, $, Backbone, Handlebars) {\n' +
              'return factory(root, {}, _, $, Backbone, Handlebars);\n' +
            '});\n' +
          '} else if (typeof exports === "object") {\n' +
              'require("backbone-nested");' +
              'require("backbone-epoxy");' +
              'require("backbone-validation");' +
              'module.exports = factory(root, {}, require("underscore"), null, require("backbone"), require("handlebars"));\n' +
          '} else {\n' +
            'root.Torso = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Backbone, root.Handlebars);\n' +
          '};\n' +
        '}(this, function(root, Torso, _, $, Backbone, Handlebars) {\n' +
          '"use strict;"\n'))
      .pipe($.concatUtil.footer('\nreturn Torso;\n}));\n'))
      //.pipe($.uglify())
      .pipe(gulp.dest(buildPaths.dist));
  });

  gulp.task('yuidoc', function () {
    return gulp.src(buildPaths.app + '/**/*.js')
      .pipe($.yuidoc())
      .pipe(gulp.dest(buildPaths.docs))
  });

  gulp.task('test-vendor', ['compressed-scripts', 'move-test'], function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js',
                     'node_modules/underscore/underscore-min.js',
                     'node_modules/backbone/backbone-min.js',
                     'node_modules/backbone-nested/backbone-nested.js',
                     'node_modules/backbone.stickit/backbone.stickit.js',
                     'node_modules/handlebars/dist/handlebars.js',
                     'node_modules/jquery-mockjax/jquery.mockjax.js',
                     buildPaths.dist + '/torso.js'])
               .pipe($.concatUtil('testEnv.js'))
               .pipe(gulp.dest(buildPaths.testEnv));
  });

  gulp.task('move-test', function() {
    return gulp.src(buildPaths.testSrc + '/**/*.js')
      .pipe(gulp.dest(buildPaths.testEnv));
  });

  gulp.task('templates', function(){
    return gulp.src(buildPaths.testSrc + '/**/*.hbs')
      .pipe($.handlebars())
      .pipe($.wrap('var Handlebars = require("handlebars"); module.exports = Handlebars.template(<%= contents %>);'))
      .pipe(gulp.dest(buildPaths.testEnv));
  });

  gulp.task('test', ['compressed-scripts', 'move-test', 'templates', 'test-vendor'], function() {
    var testFile = argv.file || '*';
    return gulp.src([buildPaths.test + '/**/' + testFile + '.js'])
      .pipe($.jasmine({
        reporter: new SpecReporter({
          displayStacktrace: true,
          displaySpecDuration: true
        })
    }));
  });

  gulp.task('build', ['compressed-scripts', 'yuidoc', 'move-test', 'test-vendor', 'templates', 'test']);

})();
