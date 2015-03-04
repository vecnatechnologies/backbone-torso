var rootPath = '../../..',
    distPath = rootPath + '/dist',
    testPath = distPath + '/test',
    jsdom = require('jsdom'),
    Promise = require('promise'),
    argv = require('minimist')(process.argv);

/**
 * @method [Anonymous]
 * @return a promise that resolves when the environment is set up.
 * The promise resolves with the window parameter. The window is the virtual dom window.
 */
module.exports = function(testImport) {
  return new Promise(function(resolve, reject) {
    jsdom.env({
      html: '<html><body></body></html>',
      scripts: [__dirname + '/' + testPath + '/browserified' + testImport + '.js'],
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
          console.log("Error loading environment: ");
          console.log(error);
          console.log();
          reject(error)
        }

        resolve(window);
      }
    });
  });
};
