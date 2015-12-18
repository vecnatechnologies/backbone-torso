# backbone-torso
A holistic approach to Backbone applications.

[Backbone](http://www.backbonejs.org) provides many convenient tools for building Single Page Applications (SPAs) out of the box, and we absolutely love using it!  However, Backbone only gives us the bare bones (excuse the overused pun) of what you need to build a complex front end application. Torso gives you the blueprints and some extra tools to build something quickly that scales well. Torso was first created by [Vecna](http://www.vecna.com) employees that needed to build robotics and health care applications that have intense feature sets and large user bases.

### What is Torso?
Torso is a 2-part project. The first is the [guidelines](/docs/RULES.md) on how to use any Backbone (including Torso) applications. These come from hard-fought lessons building large-scale Backbone webapps. The seconds is a set of Backbone [modules](http://vecnatechnologies.github.io/backbone-torso/#modules) that you can bring in all at once, or use pick-and-choose style that fill functionality holes in Backbone. These additions to Backbone's base building blocks include form handling, two-way binding, smart rerendering, data validation tools, polling caches, sub-view management, and more.

Besides the guidelines and modules, we've also created [documentation](/docs/DOCUMENTATION.md) explaining the concepts of a Torso-backed Backbone application and the modules that were added. Also, a list of the added modules and their API is found [here](/docs/API.md).

### Play with Torso Live:
Check out a basic RequireBin setup [Here](http://requirebin.com/?gist=889b60ab18d9194ccca7) using Torso.

You can also look at a torso application setup [Here](https://cdn.rawgit.com/vecnatechnologies/backbone-torso/master/demo/dist/index.html). It's not particularly functional at the moment, but if you inspect the source code, you'll see a standard torso application setup with detailed comments.


### Getting started  
If you want to jump right in,
Torso has a [yeoman](http://www.yeoman.io) [torso generator](https://github.com/vecnatechnologies/generator-torso) to get you off to a fast start.
#### Install yeoman
> npm install -g yo

#### Install generator-torso
> npm install -g generator-torso

#### Create a new project
> cd path/to/project  
> yo torso `<name of project>`

#### What's in it?  
The yeoman generator will have created a simple application. You can open the browser at `localhost:3000` if gulp watch is on or open `file:///<path to project>/dist/index.html` to see the "hello world". Try adding another perspective view by using `yo torso:pod demo` and adding an entry in the router. Now, you should be able to switch between "web pages" by adding and removing "#demo" from the url.

### What does Torso look like?

**2-way bindings for forms**:

form-template.hbs
```
// The HTML form for a name field. Just add a data-model attribute to an input or select tag
<form>
  <label for="name">Name</label>
  <input name="name" type="text" data-model="name"></input>
  <button id="submit">Submit</button>
</form>
```

MyFormView.js
```
Torso.FormView.extend({
  template: require('./form-template.hbs'),

  events: {
    'click #submit': 'submit'
  },

  initialize: function(personModel) {
    Torso.FormView.prototype.initialize.call(this);
    this.personModel = personModel;
    // The form view's model can act as the mediator between the html form and another model.
    this.model.addModel({model: this.personModel, fields: ['name']});
  },

  submit: function() {
    console.log(this.personModel.toJSON()); // {}
    this.model.push();
    console.log(this.personModel.toJSON()); // {name: 'text from your input'}
  }
})
```

**Feedback**

feedback-template.hbs
```
<input type="text" class="my-input"></input>
<div data-feedback="input-feedback"></div>
// Just add a data-feedback attribute to re-render that element at times you choose
```

MyView.js
```
Torso.View.extend({
  template: require('./feedback-template.hbs'),
  feedback: [{
    when: {
      '.my-input': ['keyup']
    },
    then: function(event) {
      return {
        text: 'You wrote: ' + this.$el.find('.my-input').val()
      };
    },
    to: 'input-feedback'
  }]
})
```

**Rendering**

my-template.hbs
```
<div class="{{view.color}}">
  {{index}}: {{model.name}}
</div>
```

MyView.js
```
Torso.View.extend({
  template: require('./my-template.hbs'),

  initialize: function() {
    this.model = new Torso.Model({name: 'Bob'});
    this.viewState.set('color', 'blue');
    // because viewState is a cell you can also do:
    // this.listenTo(this.viewState, 'change:color', this.render);
  },

  prepare: function() {
    var context = Torso.View.prototype.prepare.call(this);
    console.log(context); // {model: {name: 'Bob'}, view: {color: 'blue'}}
    context.index = 1;
    return context;
  }

  // if you only need model and viewState, no need to override prepare
})
```


**Child View**

parent-view-template.hbs
```
<div>I'm a parent</div>
<div inject="my-child-view"></div>
```

ParentView.js
```
Torso.View.extend({
  template: require('./parent-view-template.hbs'),

  initialize: function() {
    this.childView = new ChildView();
  },

  render: function() {
    Torso.View.prototype.render.call(this);
    this.injectView('my-child-view', this.childView);
  }
})
```

### Philosophy
You might have heard "convention over configuration" as a way to hide framework implementation and reduce code. Typically, if you have desires to do something that lies just over the edge of convention approaching the unconventional, those frameworks are a headache to get working. Torso is a how-to for "configuration using convention". The goal of Torso is to define some abstractions, [rules of thumb](/docs/RULES.md), and conventions that sit on top of an unopinionated framework like Backbone, that allows us to move quickly through the easy bits and flexibility to handle the edge cases. Think of Torso as more of a practiced martial art than a weapon to wield.
To see this, let's examine a simple Backbone View:
``` js
var basicView = Backbone.View.extend({
  events: {
    'click .list-item': 'handler'
  },
  initialize: function() {...},
  render: function() {...},
  handler: function() {...}
});
```
Backbone offers an easy jumping off point, but there are many unanswered questions.
* What happens when you add event listeners or timers that need to be removed after the view is done?
* Should the render method take arguments?
* Does calling render change the state of the application?
* When can I call render on this view?
* Is there any way to keep the functionality of the view going but not have it be part of the DOM?

So many questions, each one can break functionality if they are inconsistent within your app. With Torso, we lay down the laws that answer questions just like these and keep your application consistent.
A Torso view's render methods never take arguments, can be called at any time, and never change the state of the application. We'll explain how to make this possible and other rules [here](/docs/RULES.md)

### Want to help out?
Check out the [dev page](/docs/DEVELOPMENT.md).

## Credits
Originally developed by [Vecna Technologies, Inc.](http://www.vecna.com/) and open sourced as part of its community service program. See the LICENSE file for more details.
Vecna Technologies encourages employees to give 10% of their paid working time to community service projects.
To learn more about Vecna Technologies, its products and community service programs, please visit http://www.vecna.com.
