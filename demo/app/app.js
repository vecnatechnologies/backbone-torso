var $ = require('jquery');

// Expose some globals
window.$ = $;
window.jQuery = $;

require('brec-base/js/alerts');

/* START IT UP
  You'll need to start your application to get things going.
  While this file isn't part of Torso, it does show how to start
  your new Torso application. You just need to grab your router
  and call start().
*/
$(window).ready(function () {
  /**
   * The application router object
   */
  require('./router').start();
});

/* THE SEED FILE
  This file is what you would use to seed a CommonJS-style or
  AMD-style module organizer like Browserify or Require.js
*/


