$(window).ready(function() {
  var demoAreas = $('.demo-area');
  demoAreas.each(function(index, elem) {
    var $elem = $(elem);
    var forDemo = $elem.attr('for');
    if (forDemo) {
      var template = Handlebars.compile($('[for="' + forDemo + '"].html').text());
      var jsCode = $('[for="' + forDemo + '"].javascript').text();
      var func = new Function('compiledTemplate', '$container', jsCode);
      func(template, $elem);
    }
  });
});