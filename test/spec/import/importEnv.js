// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

var jsdom = require('jsdom');
var Promise = require('promise');
var argv = require('minimist')(process.argv);

/**
 * @method [Anonymous]
 * @return a promise that resolves when the environment is set up.
 * The promise resolves as a window object. The window is the virtual dom window.
 */
module.exports = function(envImport) {
  return new Promise(function(resolve, reject) {
    jsdom.env({
      html: '<html><body></body></html>',
      scripts: [__dirname + '/../../../testSandbox/' + envImport + '.js'],
      features: {
        FetchExternalResources   : ['script'],
        ProcessExternalResources : ['script'],
        MutationEvents           : '2.0',
        QuerySelector            : false
      },
      done: function(error, window) {
        if (argv.v) {
          jsdom.getVirtualConsole(window).sendTo(console);
        }

        if (error) {
          console.log("Error loading import testing environment: ");
          console.log(error);
          console.log();
          reject(error)
        }

        resolve(window);
      }
    });
  });
};
