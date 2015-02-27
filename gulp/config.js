(function() {
  'use strict';

  var dest = "./dist",
      src = './src',
      srcTest = src + '/test';

  module.exports = {
    app: src + '/main/javascript',
    test: srcTest + '/spec',
    testSrc: srcTest + '/source',
    testEnv: dest + '/test',
    dist: dest + '/compressed',
    docs: dest + '/jsdocs'
  };

})();
