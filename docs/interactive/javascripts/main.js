var app;
$(window).ready(function() {
  Handlebars.registerHelper("equal",function(a, b, options) {
    if (a === b) {
      return options.fn();
    } else {
      return options.inverse();
    }
  });

  // Main app router
  var AppRouter = Backbone.Router.extend({
    currentPerspective: null,
    path: '',

    routes: {
      '*path': 'pathParser'
    },

    dispose: function() {
      if (this.currentPerspective) {
        this.currentPerspective.dispose();
      }
    },

    pathParser: function(originalPath) {
      this.path = originalPath;
      var template = this.getPathTemplate();
      this.dispose();
      this.currentPerspective = new CoreView({
        template: template,
        path: originalPath
      });
      $('body').append(this.currentPerspective.$el);
      this.render();
    },

    render: function() {
      this.currentPerspective.render();
      this.highlightCode();
      this.generateDemos();
      this.makeCodeBlocksTogglable();
    },

    getPathTemplate: function() {
      var path = this.path;
      if (!path) {
        template = Templates.index;
      } else {
        try {
          template = Templates;
          while (path.indexOf('.') !== -1) {
            var idx = path.indexOf('.');
            template = template[path.substring(0, idx)];
            path = path.substring(idx + 1);
          }
          template = template[path];
        } catch (e) {
          template = null;
        }
        if (!template) {
          template = Templates.error404;
        }
      }
      return template;
    },

    highlightCode: function() {
      $('code').each(function(i, block) {
        $(block).text($(block).find('script[type="text/code"]').text().trim());
        hljs.highlightBlock(block);
      });
    },

    generateDemos: function() {
      var demoAreas = $('.demo-area');
      demoAreas.each(function(index, elem) {
        var $elem = $(elem);
        var forDemo = $elem.attr('for');
        if (forDemo) {
          var template = Handlebars.compile($('code[for="' + forDemo + '"].html').text());
          var jsCode = $('code[for="' + forDemo + '"].javascript').text();
          var func = new Function('compiledTemplate', '$container', jsCode);
          func(template, $elem);
        }
      });
    },

    makeCodeBlocksTogglable: function() {
      $('div + pre code').each(function(i, block) {
        var $block = $(block);
        var $bar = $block.parent().prev();
        if ($bar.hasClass('closed')) {
          $block.toggle();
        }
        $bar.click(function(elem) {
          $block.slideToggle(function(){
            if ($block.css('display') === 'none') {
              $bar.addClass('closed');
            } else {
              $bar.removeClass('closed');
            }
          });
        });
      });
    }
  });
  app = new AppRouter();
  Backbone.history.start();
});