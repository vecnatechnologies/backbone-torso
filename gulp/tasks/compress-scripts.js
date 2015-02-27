(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('../config');

  gulp.task('compressed-scripts', function () {
    return gulp.src([config.app + '/torso.js', config.app + '/utils/**/*.js', config.app + '/backbone/mixins/**/*.js'])
      .pipe($.concatUtil('torso.js'))
      .pipe($.concatUtil.header('' +
        '(function(root, factory) {\n' +
        '  if (typeof define === "function" && define.amd) {\n' +
        '    define(["underscore", "jquery", "backbone", "backbone-nested", "backbone-stickit", "backbone-validation"],\n' +
        '           function(_, $, Backbone) {\n' +
        '      return factory(root, _, $, Backbone);\n' +
        '    });\n' +
        '  } else if (typeof exports === "object") {\n' +
        '      require("backbone-nested");\n' +
        '      require("backbone-stickit");\n' +
        '      require("backbone-validation");\n' +
        '      module.exports = factory(root, require("underscore"), require("jquery"), require("backbone"));\n' +
        '  } else {\n' +
        '    root.Torso = factory(root, root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Backbone);\n' +
        '  };\n' +
        '}(this, function(root, _, $, Backbone) {\n' +
        '  "use strict;"\n'))
      .pipe($.concatUtil.footer('\n' +
        '  return Torso;\n' +
        '}));\n'))
      //.pipe($.uglify())
      .pipe(gulp.dest(config.dist));
  });

})();
