var gulp = require('gulp'),
    brec = require('brec-tables'),
    buildProcess = require('quick-sip')(gulp, {
      browserify: {
        transforms: [
          {transform: 'aliasify', options: {global: true}},
          'hbsfy'
        ]
      },
      styles: {
        includes: [brec.base.sass, brec.tables.sass]
      },
      copy: {
        excludes: 'js|hbs|scss'
      }
    });