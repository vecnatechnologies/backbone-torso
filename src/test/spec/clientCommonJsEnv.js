var rootPath = '../../..',
  distPath = rootPath + '/dist',
  testPath = distPath + '/test',
  jsdom = require('jsdom'),
  Promise = require('promise');

/**
 * @method [Anonymous]
 * @return a promise that resolves when the environment is set up.
 * The promise resolves with a window parameter and a routes parameter. The window is the virtual dom window
 * and the routes is a map from unique key to mockjax entry
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
        //jsdom.getVirtualConsole(window).sendTo(console); /* uncomment to see window's console */

        if (error) {
          console.log("Error loading environment: ");
          console.log(error);
          console.log();
          reject(error)
        }

        resolve({
          window: window
        });
      }
    });
  });
};
