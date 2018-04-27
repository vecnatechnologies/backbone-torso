var _ = require('underscore');
jQuery = $ = require('jquery');
require('jquery-mockjax')($, window);


// See https://github.com/jakerella/jquery-mockjax#logging for details about logging level.
// Set to Error (0) because info logs every request which is way to chatty for our jasmine tests.
// Change to 2 or higher for more verbose logging from mockjax.
$.mockjaxSettings.logging = 0;

module.exports = function() {
  var routes = {};
  $.mockjax.clear();

  // Adds a route for: a GET to /tests. Will return new static data
  routes['/tests|get'] = $.mockjax({
    url: '/tests',
    dataType: 'json',
    type: 'get',
    responseTime: 200,
    response: function() {
      this.responseText = {
        foo: 555,
        bar: 'real',
        obj: {
          a: 99,
          b: 'new val',
          c: {
            d: false
          }
        }
      };
    }
  });

  // Adds a route for: a POST to /tests. Will echo the request data
  routes['/tests|post'] = $.mockjax({
    url: '/tests',
    dataType: 'json',
    type: 'post',
    responseTime: 100,
    response: function(settings) {
      this.responseText = settings.data;
    }
  });

  // Adds a route for: a POST to /test2. Will echo the request data
  routes['/test2|post'] = $.mockjax({
    url: '/test2',
    dataType: 'json',
    type: 'post',
    responseTime: 100,
    response: function(settings) {
      this.responseText = settings.data;
    }
  });

  routes['/unified|post'] = $.mockjax({
    url: '/unified',
    dataType: 'json',
    type: 'post',
    responseTime: 100,
    response: function(settings) {
      this.responseText = settings.data;
    }
  });

  routes['/myModel/ids|get'] = $.mockjax({
    url: '/myModel/ids',
    type: 'GET',
    responseTime: 100,
    response: function(settings) {
      var models = [],
          data = settings.data.ids.split(',');
      for (var i = 0; i < data.length; i++) {
        models.push({
          id: data[i],
          count: i
        });
      }
      this.responseText = models;
    }
  });

  routes['/myModel/ids|post'] = $.mockjax({
    url: '/myModel/ids',
    type: 'POST',
    dataType: 'json',
    responseTime: 100,
    response: function(settings) {
      var models = [],
          data = _.isString(settings.data) ? JSON.parse(settings.data) : settings.data;
      for (var i = 0; i < data.length; i++) {
        models.push({
          id: data[i],
          count: i
        });
      }
      this.responseText = models;
    }
  });

  routes['/error|post'] = $.mockjax({
    url: '/error',
    type: 'POST',
    dataType: 'json',
    responseTime: 100,
    status: 500,
    responseText: "An error occurred"
  });

  return routes;
};
