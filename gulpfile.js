(function() {
  'use strict';

  var buildPaths, onError,
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    $ = require('gulp-load-plugins')(),
    SpecReporter = require('jasmine-spec-reporter'),
    argv = require('minimist')(process.argv.slice(3));

  buildPaths = {
    markup: 'markup',
    javascript: 'javascripts',
    dist: 'dist'
  };

  onError = function(err) {
    $.util.log($.util.colors.red(err.message));
    this.emit('end');
  };

  gulp.task('templates', function() {
    return gulp.src(buildPaths.markup + '/**/*.+(hbs|html)')
      .pipe($.handlebars().on('error', onError))
      .pipe($.wrap('Handlebars.template(<%= contents %>)'))
      .pipe($.declare({
        namespace: 'Templates',
        noRedeclare: true, // Avoid duplicate declarations
        processName: function(filePath) {
          var cleanPath = filePath.replace(/markup(\/|\\)/g, '');
          return $.declare.processNameByPath(cleanPath);
        }
      }))
      .pipe($.addSrc.prepend('node_modules/handlebars/dist/handlebars.min.js'))
      .pipe($.concatUtil('templates.js'))
      .pipe(gulp.dest(buildPaths.dist));
  });

  gulp.task('js-deps', function() {
    var deps = ['node_modules/underscore/underscore-min.js',
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/backbone/backbone-min.js',
                'node_modules/backbone-nested/backbone-nested.js',
                'node_modules/backbone.stickit/backbone.stickit.js',
                buildPaths.javascript + '/i18n.js',
                buildPaths.javascript + '/torso.js',
                buildPaths.javascript + '/highlight.js',
                buildPaths.javascript + '/core-view.js',
                buildPaths.javascript + '/main.js'];
    return gulp.src(deps)
      .pipe($.concatUtil('app.js'))
      .pipe(gulp.dest(buildPaths.dist));
  });

  gulp.task('clean-dist', function() {
    return gulp.src('dist', {read: false})
        .pipe($.clean());
  });

  // Watch and perform minimum build
  gulp.task('watch', function() {
    runSequence('build', function() {
      gulp.watch(buildPaths.javascript + '/**/*.js', ['js-deps']);
      gulp.watch(buildPaths.markup + '/**/*.+(hbs|html)', ['templates']);
    });
  });

  // gulp build (full project)
  gulp.task('build', function(callback) {
    runSequence('clean-dist', ['templates', 'js-deps'], callback);
  });

  // Default to build all
  gulp.task('default', ['build']);
})();
