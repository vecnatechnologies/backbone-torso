var karmaConf = require('./karma.conf');

// Dev-specific Karma config
module.exports = function(config) {
  karmaConf(config);
  config.set({
    singleRun: false,
    browsers: ['PhantomJS', 'Chrome', 'Firefox']
  });
};
