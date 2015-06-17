(function() {
  'use strict';

  var gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      paths = require('../../paths'),
      lazypipe = require('lazypipe'),
      _ = require('underscore'),
      dir = require('node-dir'),
      path = require('path'),
      bundlePipe = lazypipe()
        .pipe($.jshint)
        .pipe($.jshint.reporter, 'jshint-stylish', { verbose: true })
        .pipe($.jshint.reporter, 'fail')
        .pipe($.concatUtil, 'torso-bundle.js')
        .pipe(gulp.dest, paths.bundleDest)
        .pipe($.rename, { extname: '.min.js' })
        .pipe($.uglify)
        .pipe(gulp.dest, paths.bundleDest);

  gulp.task('bundle', function() {
    var dependencies = {
      'Cell'       : ['cellPersistenceRemovalMixin'],
      'Collection' : ['pollingMixin', 'collectionRegistrationMixin', 'collectionLoadingMixin'],
      'validation' : ['pollingMixin', 'NestedModel'],
      'Model'      : ['pollingMixin'],
      'NestedCell' : ['cellPersistenceRemovalMixin'],
      'NestedModel': ['pollingMixin'],
      'FormModel'  : ['pollingMixin', 'NestedModel', 'validation'],
      'ServiceCell': ['cellPersistenceRemovalMixin', 'Cell'],
      'View'       : ['Cell', 'cellPersistenceRemovalMixin', 'templateRenderer'],
      'FormView'   : ['Cell', 'cellPersistenceRemovalMixin', 'templateRenderer', 'View',
                      'pollingMixin', 'NestedModel', 'validation', 'FormModel'],
      'ListView'   : ['Cell', 'cellPersistenceRemovalMixin', 'templateRenderer', 'View']
    };
    var dontInclude = ['torso'];
    var fileList = [];
    dir.files(__dirname + '/../../modules', function(err, files) {
      if (err) throw err;
      files = _.map(files, function(filePath) {
        return path.basename(filePath, '.js');
      });
      files = _.filter(files, function(file) {
        return !_.contains(dontInclude, file);
      });
      var count = 0;
      var threshold = 10;
      while (!_.isEmpty(dependencies) && count <= threshold) {
        _.each(files, function(file) {
          if (!_.has(dependencies, file)) {
            fileList.push(file);
            _.each(dependencies, function(deps, key) {
              if (_.contains(deps, file)) {
                dependencies[key] = _.without(deps, file);
              }
            });
            files = _.without(files, file);
          }
        });
        dependencies = _.omit(dependencies, _.isEmpty);
        count++;
      }
      if (count >= threshold) {
        throw new Error('Bundle dependency list could not be created within the depth threshold');
      }
      return gulp.src(fileList)
        .pipe(bundlePipe());
    });
  });
  gulp.task('bundle:watch', ['bundle'], function() {
    gulp.watch(paths.modulesSrc, ['bundle']);
  });

  module.exports = bundlePipe;

})();
