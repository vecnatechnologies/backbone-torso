describe('TemplateRenderer.hotswap', function() {
  var env, $, templateRenderer;

  beforeEach(function(done) {
    require('./clientEnv')().done(function(environment){
      env = environment;
      templateRenderer = env.window.Torso.Utils.templateRenderer;
      $ = env.window.$;
      done();
    });
  });

  describe('when replacing DOM elements', function() {
    function validateDOMReplacement(oldHTML, newHTML) {
      var oldContent = $(oldHTML).get(0),
          newContent = $(newHTML).get(0),
          $container = $('<div>').append(oldContent);
      $container.append(oldContent);
      templateRenderer.hotswap(oldContent, newContent);
      expect($container.html()).toBe(newHTML);
    }

    it('can update a simple Element Node', function() {
      validateDOMReplacement('<h1>hello</h1>', '<h1>HELLO</h1>');
    });

    it('can update a nested Element Node', function() {
      validateDOMReplacement('<div><h1>hello</h1></div>', '<div><h1>HELLO</h1></div>');
    });

    it('can add attributes', function() {
      validateDOMReplacement('<div></div>', '<div class="error"></div>');
    });

    it('can remove attributes', function() {
      validateDOMReplacement('<div class="error"></div>', '<div></div>');
    });

    it('can add child elements', function() {
      validateDOMReplacement('<ul></ul>', '<ul><li>Test</li></ul>');
    });

    it('can remove child elements', function() {
      validateDOMReplacement('<ul><li>Test</li></ul>', '<ul></ul>');
    });

    it('can update a Text Node', function() {
      validateDOMReplacement('<div><span class="alert">ERROR!</span> Name is required</div>',
                           '<div><span class="alert">ERROR!</span> Invalid email</div>');
    });

    it('can update a Comment Node', function() {
      validateDOMReplacement('<div><!-- foo --></div>', '<div><!-- bar --></div>');
    });
  });

  it('does not replace Element nodes with the same tagName and with the same number of siblings', function() {
    var oldContent = createListElement('A','B'),
        newContent = createListElement('A','B'),
        oldListItemElement = $(oldContent).children().get(0),
        $container = $('<div>').append(oldContent);
    templateRenderer.hotswap(oldContent, newContent);
    expect($container.find('ul').get(0)).toBe(oldContent);
    expect($container.find('ul').children().get(0)).toBe(oldListItemElement);
  });

  it('replaces Element nodes if the tagName changes', function() {
    var oldContent = $('<p>Test</p>').get(0),
        newContent = $('<h1>Test</h1>').get(0),
        $container = $('<div>').append(oldContent);
    templateRenderer.hotswap(oldContent, newContent);
    expect($container.children().get(0)).not.toBe(oldContent);
  });

  it('replaces Element nodes if the number of sibling nodes changes', function() {
    var oldContent = createListElement('A','B'),
        newContent = createListElement('A','B','C'),
        oldListItem = $(oldContent).children().get(0),
        $container = $('<div>').append(oldContent);
    templateRenderer.hotswap(oldContent, newContent);
    expect($container.find('ul').children().get(0)).not.toBe(oldListItem);
  });

  it('does not update any elements matching the selectors passed in the ignoreElements argument', function() {
    var oldContent = $('<div><h1>Foo</h1><p class="author">John</p></div>').get(0),
        newContent = $('<div><h1>Bar</h1><p class="author">Jane</p></div>').get(0),
        ignoreElements = ['.author'],
        expectedHTML = '<div><h1>Bar</h1><p class="author">John</p></div>',
        $container = $('<div>').append(oldContent);
    templateRenderer.hotswap(oldContent, newContent, ignoreElements);
    expect($container.html()).toBe(expectedHTML);
  });

  /*
   * Create a <ul> with the String arguments as <li>
   * @return {Element} the <ul> DOM element
   */
  function createListElement() {
    var args = Array.prototype.slice.call(arguments),
        list = $('<ul>');
    args.forEach(function(listItem) {
      var $listItem = $('<li>').text(listItem);
      list.append($listItem);
    });
    return list.get(0);
  }
});