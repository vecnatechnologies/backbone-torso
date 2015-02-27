(function() {
  'use strict';

  var gulp = require('gulp'),
      path = require('path'),
      $ = require('gulp-load-plugins')(),
      config = require('../config'),
      bundle = function() {
        return gulp.src([config.app + config.importPaths.torsoGuidManagerPath + '.js',
                         config.app + config.importPaths.torsoHandlebarsUtilsPath + '.js',
                         config.app + config.importPaths.torsoStickitUtilsPath + '.js',
                         config.app + config.importPaths.torsoTemplateRendererPath + '.js',
                         config.app + config.importPaths.torsoCollectionLoadingMixinPath + '.js',
                         config.app + config.importPaths.torsoPollingMixinPath + '.js',
                         config.app + config.importPaths.torsoCollectionRegistrationMixinPath + '.js',
                         config.app + config.importPaths.torsoViewHierarchyMixinPath + '.js',
                         config.app + config.importPaths.torsoServicePath + '.js',
                         config.app + config.importPaths.torsoEventsPath + '.js',
                         config.app + config.importPaths.torsoCollectionPath + '.js',
                         config.app + config.importPaths.torsoModelPath + '.js',
                         config.app + config.importPaths.torsoNestedModelPath + '.js',
                         config.app + config.importPaths.torsoValidationPath + '.js',
                         config.app + config.importPaths.torsoFormModelPath + '.js',
                         config.app + config.importPaths.torsoViewPath + '.js',
                         config.app + config.importPaths.torsoListViewPath + '.js',
                         config.app + config.importPaths.torsoFormViewPath + '.js'])
                   .pipe($.concatUtil('torso-bundle.js'))
                   .pipe(gulp.dest(config.dist))
      };

  gulp.task('bundle', bundle);
  gulp.task('bundle:clean', ['clean'], bundle);

})();
