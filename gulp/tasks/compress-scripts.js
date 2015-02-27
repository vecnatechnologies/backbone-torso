(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('compressed-scripts', function () {
    return gulp.src(config.app + '/**/*.js')
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
      .pipe(gulp.dest(config.dist));
  });

})();
