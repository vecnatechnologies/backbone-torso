var spyOnBackbone = require('../spec/functional/backboneSpy');

/**
 * Creates a view class that has various events it's listening to
 * with spies on the callbacks.
 * @param window {window} the window object
 */
module.exports = function(window) {
  Handlebars = window.Handlebars;
  var TransitionableChildView = window.Torso.View.extend({
    template: Handlebars.compile('<div class="transition-child">{{view.index}}</div>'),
    initialize: function(args) {
      args = args || {};
      this.set('index', args.index);
    },
    transitionIn: function(attach, done, options) {
      var view = this;
      var transitionTime = options.transitionTime || 500;
      view.set('transitioning-in', true);
      setTimeout(function() {
        attach();
        view.set('transitioning-in', false);
        done();
      }, transitionTime);
    },
    transitionOut: function(done, options) {
      var view = this;
      var transitionTime = options.transitionTime || 500;
      view.set('transitioning-out', true);
      setTimeout(function() {
        view.detach();
        view.set('transitioning-out', false);
        done();
      }, transitionTime);
    }
  });
  return TransitionableChildView;
};
