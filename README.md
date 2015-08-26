# backbone-torso
A holistic approach to Backbone applications.

[Backbone](http://www.backbonejs.org) provides many convenient tools for building Single Page Applications (SPAs) out of the box, and we absolutely love using it!  However, Backbone only gives us the bare bones (excuse the overused pun) of what you need to build a complex front end application. Torso gives you the blueprints and some extra tools to build something quickly that scales well. Torso was first created by [Vecna](http://www.vecna.com) employees that needed to build robotics and health care applications that have intense feature sets and large user bases.

### Check out the Live Torso Demo
Play with the [Live Demo](https://cdn.rawgit.com/vecnatechnologies/backbone-torso/master/demo/dist/index.html)

### Getting started  
If you're new to torso, check out the [torso handbook](http://vecnatechnologies.github.io/backbone-torso/) (IN PROGRESS).

Checkout the github [documentation](/docs/DOCUMENTATION.md) - it's long but up to date and worth it.

If you want to jump right in,
Torso has a [yeoman](http://www.yeoman.io) [torso generator](https://github.com/vecnatechnologies/generator-torso-brec) to get you off to a fast start.
#### Install yeoman
> npm install -g yo

#### Install generator-torso-brec
> npm install -g generator-torso-brec

#### Create a new project
> cd path/to/project  
> yo torso-brec

### What's in it?  
The yeoman generator will have created a simple application. You can open the dist/index.html to see the "hello world". Before you start building more views, you'll need to familiarize yourself with torso's [philosophy](http://vecnatechnologies.github.io/backbone-torso/#philosophy) and [recipies](http://vecnatechnologies.github.io/backbone-torso/#recipes).

First, the [handbook](http://vecnatechnologies.github.io/backbone-torso) (handbook is IN PROGRESS) will equip you with a set of rules on how to create small components with clear interfaces that still work well when things get complicated. After that, Torso has many choose-what-you-want [modules](http://vecnatechnologies.github.io/backbone-torso/#modules). These additions to Backbone's base building blocks include form handling, data validation tools, polling caches, sub-view management, and more. Torso simplifies the design process and eases the nightmare of building complicated web apps.

### Philosophy  
You might have heard "convention over configuration" as a way to hide framework implementation and reduce code. Typically, if you have desires to do something that lies just over the edge of convention approaching the unconventional, those frameworks are a headache to get working. Torso is a how-to for "configuration using convention". The goal of Torso is to define some abstractions, rules of thumb, and conventions that sit on top of an unopinionated framework like Backbone, that allows us to move quickly through the easy bits and flexibility to handle the edge cases. Think of Torso as more of a practiced martial art than a weapon to wield.
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
A Torso view's render methods never take arguments, can be called at any time, and never change the state of the application. We'll explain how to make this possible and other rules in the [recipes](http://vecnatechnologies.github.io/backbone-torso/#recipes) section of the torso site.

### Want to help out?
Check out the [dev page](/docs/DEVELOPMENT.md).

## Credits
Originally developed by [Vecna Technologies, Inc.](http://www.vecna.com/) and open sourced as part of its community service program. See the LICENSE file for more details.
Vecna Technologies encourages employees to give 10% of their paid working time to community service projects.
To learn more about Vecna Technologies, its products and community service programs, please visit http://www.vecna.com.
