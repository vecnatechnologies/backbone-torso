var gulp = require('gulp'),
    buildProcess = require('quick-sip')(gulp, {
      browserify: {
        transforms: [
          {transform: 'aliasify', options: {global: true}},
          'hbsfy'
        ]
      },
      copy: {
        excludes: 'js|hbs|scss'
      }
    });
