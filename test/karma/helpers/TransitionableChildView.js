var TorsoView = require('../../../modules/View');
var _ = require('underscore');
var Handlebars = require('handlebars');

module.exports = TorsoView.extend({
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