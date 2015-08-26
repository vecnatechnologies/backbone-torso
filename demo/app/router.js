var Torso = require('backbone-torso'),
    $ = require('jquery');

/* THE ROUTER
  There is nothing different code-wise between a normal Backbone router and
  a torso router. This Demo router shows you how a router interacts with
  torso views acting as perspectives.
*/
module.exports = new (Torso.Router.extend({
  current: null,
  // Routes map urls to router methods. The base url will trigger index method
  routes: {
    '': 'index'
  },

  /**
   * The router method will start listening to and keep a history of URL changes.
   * To tell the router to begin binding perspectives to the DOM, you have to start
   * the Torso history.
   * @method start
   */
  start: function() {
    Torso.history.stop();
    this._bindRoutes();
    Torso.history.start();
  },

  /**
   * The starting url, will swith perspectives to the home view.
   */
  index: function() {
    this.switchPerspective(require('./home/homeView'));
  },

  /* CHANGING PERSPECTIVES
    The router's main job is to switches the current perspective with another.
    This simulates the same effect of changing web pages if done correctly.
    This method will detach any existing perspective view from the DOM and
    replace the element with class name 'app' with the new perspective view's
    DOM element.
  */
  switchPerspective: function(nextPerspective) {
    if (this.current) {
      this.current.detach();
    }

    this.current = nextPerspective;
    // Torso View's attach method will fire all of the needed behind-the-scenes
    // code to make sure your view is ready to be used after it is attached to the DOM.
    this.current.attach($('.app'));
  }
}))();