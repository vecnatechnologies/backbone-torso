var CoreView = Torso.View.extend({
  initialize: function(args) {
    args = args || {};
    this.template = args.template || function() {return '';};
    this.path = args.path;
  },

  prepare: function() {
    var trail = [];
    if (this.path) {
      // Construct breadcrumb
      var steps = this.path.split('\.');
      var compound = '#';
      for (var i = 0; i < steps.length; i++) {
        if (i !== 0) {
          compound += '.';
        }
        compound += steps[i];
        trail.push({
          name: steps[i],
          route: compound
        });
      }

      // Construct topic list
      var children = _.difference(Object.keys(app.getPathTemplate()),
                                  ['_setup','isTop','_child']);
      var topics = [];
      for (var i = 0; i < children.length; i++) {
        topics.push({
          route: '#' + this.path + '.' + children[i],
          name: children[i],
        })
      }
    }
    return {
      trail: trail,
      topics: topics
    };
  },

  render: function() {
    var context = this.prepare();
    this.$el.html(Templates.decorators.header(context));
    this.$el.find('#main_content').append(this.template(context));
    this.$el.append(Templates.decorators.footer());
    this.delegateEvents();
  }
});