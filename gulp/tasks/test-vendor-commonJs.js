(function() {
  'use strict';

  var _ = require('underscore'),
      fs = require('fs'),
      gulp = require('gulp'),
      path = require('path'),
      $ = require('gulp-load-plugins')(),
      merge = require('merge-stream'),
      sourcemaps = require('gulp-sourcemaps'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      watchify = require('watchify'),
      browserify = require('browserify'),
      requireify = require('requireify'),
      paths = require('../../paths'),
      test = require('./test'),
      tasks = [],
      bundleAll = function(options, callback) {
        var mergedTasks, tasks,
          handleFile = function(file) {
            var bundler,
                filename = this.dir + '/' + file;
            options = options || {};
            if (_.last(file, 3).join('') != '.js') {
              return fs.readdirSync(filename).map(_.bind(handleFile, {dir: filename}));
            }
            if (options.watch) {
              bundler = watchify(browserify(filename, watchify.args));
              bundler.on('update', function() {
                return bundle(bundler, filename, options.test)
              });
            } else {
              bundler = browserify(filename);
            }
            bundler.transform(requireify);
            bundler.on('log', $.util.log); // output build logs to terminal
            bundler.on('error', function() {
              var args = Array.prototype.slice.call(arguments);

              // Send error to notification center with gulp-notify
              $.notify.onError({
                title: "Compile Error",
                message: "<%= error %>"
              }).apply(this, args);
              $.util.log($.util.colors.red("Browserify failed: " + filename));
              tasks = _.without(tasks, filename);
              // Keep gulp from hanging on this task
              this.emit('end');
            });
            return bundle(bundler, filename, options.test)
          };
        tasks = fs.readdirSync(paths.modules).map(_.bind(handleFile, {dir: paths.modules}));
        mergedTasks = merge(tasks);
        if (!options.watch) {
          return mergedTasks;
        } else {
          callback();
        }
      },
      bundle = function(bundler, filename, runTest) {
        $.util.log("Adding browserify task for " + filename);
        tasks.push(filename);
        $.util.log("Executing " + tasks.length + " browserify tasks.", tasks);
        return bundler.bundle()
          .on('end', function() {
            $.util.log("Browserifying complete for: " + filename);
            tasks = _.without(tasks, filename);
            $.util.log("Browserifying waiting for " + tasks.length + " tasks to complete.", tasks);
            if (tasks.length <= 0) {
              $.util.log($.util.colors.green("Browserifying complete."));
              if (runTest) {
                test([{ folder: paths.testImport, test: 'commonJsImports' }]);
              }
            }
          })
          .pipe(source(filename))
          .pipe(buffer())
          .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
          .pipe(sourcemaps.write('./')) // writes .map file
          .pipe(gulp.dest(paths.testBrowserifiedDest));
      }

  gulp.task('test-vendor-commonJs', bundleAll.bind(this, {}));
  gulp.task('test-vendor-commonJs:test', bundleAll.bind(this, { test: true }));
  gulp.task('test-vendor-commonJs:watch', bundleAll.bind(this, { watch: true, test: true }));

  module.exports = bundleAll;
})();
