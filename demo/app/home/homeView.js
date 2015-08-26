var Torso = require('torso');

/* PERSPECTIVE VIEW
  This is a perspective view. It acts kind of like a web page in
  that the router will move from one perspective view to another
  based on unique urls.

  Theres nothing special about a view being used as a perspective
  except the router is responsible for attaching this view to the DOM.
*/
module.exports = new (Torso.View.extend({
  template: require('./home-template.hbs')

  /* THAT'S IT
   You don't need any extra boilerplate code to get this view to render
   properly. You just need a template so the view will generate some DOM
  */

}))();
/* ONLY ONE
  Typically a perspective view is only instantiated once. You can
  see it is instantiated and immediately returned.
*/
