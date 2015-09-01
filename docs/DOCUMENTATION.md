#Torso Documentation

##Cell

When using Backbone, models are typically used ubiquitously throughout an application for various purposes. They are used to communicate data from the server and client app using the ```save()``` and ```fetch()``` methods. They are also used when the programmer wants to just store state, add some methods around it and emit or listen to events. Co-opting one class to perform different roles can lead to confusion in your application. Calling ```save()``` on a model whose job is to just store some transient application state will result in errors. But it was a model, why shouldn't it be able to save? Torso reserves the word and concept of a model to a front end representation of a server-side object with the ability to persist. A cell's function is to store data, provide an API around the data, and communicate with the application through events. They become the building block for most objects in an application. Torso uses them as a base for services and a view's state.


##Service

Most of what Backbone developers focus on is the interaction between a user and the application data. A view can handle user interactions and update the models and a view can update the DOM when it finds changes in models. A view's main purpose is to provide the logic in a specific model-to-DOM connection. However, a view is limited in its scope to specific pieces of DOM (e.g. a widget) and the interactions it provides (e.g. a widget's buttons). A service provides functionality that needs to exist regardless of where the user is in the application. Use a service when you want to perform a certain action but don't want to tie that action to a widget, webpage (perspective) or any other block of DOM.

A underlying implementation of a service is merely a cell. However, the distinction is useful. Appropriately named objects in your application speak to its purpose and API. Being a cell, a service includes the ability to store state, add an API, and listen to and emit events.

Services are usually invoked by views or by events given off by models or views. They are typically independent of any one view or model.

##Models

Torso doesn't make many updates to Backbone's Model object. NestedModel is an option if you would like to listen to and trigger events on nested model properties. Torso also adds a simple API for polling updates at an regular interval. Other than that, the only real distinction Torso makes for models is that they provide an ability connect with the server through ```save()``` and ```fetch()```. If you are using a model to store transient application state with no connection to the server, consider using a cell.

Typically, Backbone developers have a particularly challenging job of dealing with relationships between models. What if one “object” owns or refers to another? What if one model is really just a massive tree containing other models? The Torso recommendation is to use “flat models” and utilize Torso's caches. Let's start with our goals:

1. Prevent existence of duplicate instances of the same model.
	>Reasons: Consistency across the application. Prevent stale data overriding newer data

2. Prevent duplicate saves and fetches for the same model across the application.
	>Reason: Reduce unnecessary hits to bandwidth

3. Reserve the ability to save pieces of a large data structure.
	>Reason: WYSIWIG – easier to make small, quick changes

4. Maintain transactional changes as well.
	>Reason: Need to be able to roll back one model if another fails to update

How to make “flat models”: replace any reference to another model with a foreign key like an id. A model should only have basic properties and references to other models (could be an array of ids if it's a many relationship). How do you reconstruct the referenced model? You ask the corresponding cache for that model. You can even create a method on the first model that automatically grabs the referenced model from the cache. To request a model from a cache, you'll need to create a requester collection (see section about Collections)

While this is the recommended practice, Torso does not have tests for model's creating requester collections.

By doing this we hit our first goal because there is only one instance of any model, the one sitting in the cache. We get our second goal because any save/fetch happens on the single instance of the model and any fetches/saves can be controlled by the cache itself. Saving each model separately allows you to make small quick changes and satisfying our third goal. Lastly, creating transactions will require a bit of work as each model can save by itself. Look at Form Models for more on this.

##Nested Properties

Because models, cells, and services all store state using Backbone's Model property infrastructure, they all fall prey to its limitations. Most notably its inability to listen to or trigger events on property changes that occur within an array or object. Torso includes the backbone-nested (https://github.com/afeld/backbone-nested) model provided by github user afeld. This nested model fixes this problem but at a performance price. Nested property listening is very convenient when needed, but if you expect to update the properties with high frequency, this can be costly. Torso offers the choice between a nested version and a non-nested version of both model and a cell. Currently, there is not nested service option, but extending NestedCell, will get you what you want (as a service is a simple extension of cell).

##Views

A view is responsible for connecting a piece of DOM to some data in the application. A standalone view that controls a div is pretty straight-forward and many examples of how to use Backbone show this use-case. However, the more complicated an application gets, the more you have to figure out how views connect to one another.

Views are often self-delegating. Often a view will decide to transition to another view or delegate part of its data-to-DOM relationship to another view. A router can help when the user transitions between two top-level views (read more in the Perspective section), but typically a view has to figure out how to interact with other views.

A view has the power to create/dispose, activate/deactivate, and attach/detach any other view. These actions are the phase changes in the life cycle of a view. While not disposed, a view can be in three states: 

  1. Activated and attached – in use and can be interacted with.
  2. Activated and detached – in use but not visible. 
  3. Deactivated and detached – dormant. 

You can also dispose of a view if you are sure you no longer need it. Most often, deactivating and detached is preferable as it will save the view state if it's needed again.

Initializing a view will do a few things: generate the container DOM element, set up the initial state of the view, and by default it will be activated. A view can be initialized without also being activated by passing in ```{noActivate: true}```. If the view is activated, the callback ```_activate``` is invoked. Override this method to setup listeners or intervals that should happen even if the view is detached from the DOM.

You can put listeners and intervals in the initialize method of your view if you want them to continue to happen even if the view is dormant. NOTE: any setup you do in ```initialize``` or ```_activate``` should be removed in the ```_dispose``` or ```_deactivate``` callbacks. The notable exception is that dispose will automatically remove all listeners in the view.

After being created, the view doesn't have any DOM but its auto-generated container element. Creating new DOM comes from the render method. Its sole purpose is to make sure that the view's DOM fragment is exactly correct. It's not responsible for putting the view's DOM fragment on the DOM tree – that's what attach is for. Torso provides a templateRender function on the view that attempts to intelligently swap any updates into the current DOM fragment without regenerating it from scratch. It requires a “template” object that can take an object as a context and produces a string representation of the DOM. Typically Handlebars.js is used to achieve this.

Views should never update DOM directly (e.g. grab elements using jQuery and change the element directly). Views should always change its state and re-render. Updating the DOM directly will cause the DOM to become unsynced on the next render. In a torso application, render can be invoked at any time by any other player in the application (e.g. other views, services, etc.). Thus, you need to make sure that the template can regenerate the DOM at any point in its life.

Are you using jQuery plugins? These can be problematic as they typically don't follow the pattern of being able to re-render at any point. Torso views have ```plug()``` and ```unplug()``` methods that you can override that should be called before and after the render method. The purpose is to be able to tear down and bring back the plugin after the underlying DOM elements have changed. This usually only works if the plugin can report its current state upon unplugging and passing the state back the plugin during the plug method. [should plug and unplug be run even if the view is not attached?]

The render method is also the place to inject child views. Calling ```injectView``` and passing it the name of an injection site and the view to be injected, will register the view as a child view and attach the child view at the injection site. Injection sites are created by adding the element attribute ```“inject=NameOfSite”``` to any element in your view's DOM fragment. Once the injected view has been registered as a child view, any call to activate, deactivate or dispose on the parent view will also be called on the child view.

If you override the render method make sure to use the templateRender and call unplug and plug around it if needed. Also, always make sure to call ```delegateEvents()``` after everything is done to bind events to new DOM elements. Finally, inject any child views – don't worry about whether they're attached or not, because templateRender will detach all child views first in order to do an accurate DOM hotswap.

It's important to know that a child view does not have a reference to the parent view and therefore can be moved very easily between parents. This is useful for views that function like widgets and need to be portable between perspectives.

###Communication

Determining how your views will play well together is based on the relationship between any two views. A parent to child relationship is straightforward when the parent wants to interact with a child view. Because it has a direct reference, the parent can invoke methods and set fields on the child view. Child views, however, do not have direct access to its parent view. This was a design decision to increase the portability of the child view. There's nothing stopping a developer from creating a reference to a parent, but it's not done by default by Torso. Instead, the recommended child-to-parent communication is performed by triggering events on the child view. Any parent view (or service, etc.) can listen to these events and react appropriately.

There are certainly times where a view (or model, service, etc.) might want to broadcast to the application as a whole and let other components decide to subscribe to these broadcasts. Torso recommends creating an application-level event bus to publish these types of messages. Creating an event bus is as easy as creating an empty module that extends ```Torso.Events```. Require this module and start listening or triggering events on it.

It's recommended to name events as verbs of what just happened (e.g. submit-button-clicked) and let other components decide how to react. It's also recommended to add the triggering view (or model, service) as part of the event payload. This information can be used to determine the origin of the event, which now became hidden by going through an application-level event bus. In some cases, it makes sense to prefix the triggered name with the origin of the event in order to give granularity to who might want to receive the event.


###Perspectives

Single page applications are markedly different from the conventional html-based request-response dialogue of early days web sites. Now that the frontend application is producing the DOM, there isn't the natural distinction from one page to another. The frontend app could follow the same behavior by generating “web page”-like views and simulate a normal website user flow. These “web page” views are given the name “perspective” in Torso. This helps developers create a distinction between an actual web page created by the server and a Torso-generated web page. Typically the Torso router is responsible for moving between perspective views. Perspectives are often parents to many child views that help form the page.


###Feedback

Noted earlier, views should change their internal state and rerender if they want to make DOM updates. This prevents lost DOM changes and allows the view to regenerate the appropriate DOM on demand. There are times, however, where you may want it makes sense to make point changes. This is especially true when a user is working on a form and you want to show validation errors, etc. Updating the DOM underneath the user can be tricky in this case. Torso Views provide a “feedback” mechanism to help in these cases.

The feedback field on a view is an array of “when-then-to”s or sometimes shortened to when-then's. Unsurprisingly enough, each when-then has three fields: a when, a then, and a to. 

The “When” is a map that determines the timing of the feedback. An entry can take 3 forms: 

  1) Standard DOM events – very similar to the events field on a Backbone view. The key is the DOM jQuery selector and the value is an array of event types (e.g. 'click', 'hover', etc). 
  
Example: ```{'.foo': ['click']}```

  2) View events – trigger the feedback when the view triggers an event. Use the key 'on' and the value is an array of event names to listen to. 
  
Example: ```{'on': ['submit', 'my-button-clicked']}```

  3) Short hand for data-model attribute value – useful when using a form view. Add a “@” in front a form model property name, and this when-then listen to the bound element.
  
Example: ```{'@myFormProperty': ['keyup']}``` (would listen to element with data-model=”myFormProperty”)

The “Then” is a function that will perform some manipulations on the DOM. It should NOT modify the DOM directly, instead it returns an set of directives to make against the DOM. The view will take the returned object and iterate over the entries and perform the directives. For each entry it will use the key as a jQuery command ('text', 'show', 'hide', 'html', etc.) to be performed on the “to” element, or if the key starts with an “_” it will use a corresponding view method (omitting the first “_”). The value of the entry will be used as the arguments to the invoking method. If you pass in an array, it will assume that it is an array of arguments. [can't just pass in a single array, huh?] The “then” function will accept as an argument the event (either a DOM event or view event) that triggered it. It also accepts an index map which you will learn later under the array/nested notation section of feedback.

The “To” will tell the view which element should be modified by the “Then”. It can be an array of strings or a single string. Either way, each string should correspond to the value of the “data-feedback” attribute. If you “to” is ```myFeedbackTarget``` then it will modify any element or elements that have ```data-feedback='myFeedbackTarget'```

The reason for the when-then's is to be able to handle on-the-fly DOM manipulations. Because the changes were captured as directives (and stored inside a cell), on future render calls, these changes can be reapplied after rerendering.
Admittedly, it would be better if there was a React-like mechanism of calling render and it only makes spot changes where necessary. And to be fair, Torso has a templateRenderer module that attempts to do this. While Torso's templateRenderer does a great job of comparing the newly created DOM to existing DOM, it can be costly if you are invoking it on every keyup while the use is typing in a form. Thus, feedback solves that problem and gives a useful API to control real-time interactions with the user.

Another nice feature of the feedback module in Torso views, is that it can handle array notation and object notation. It uses backbone-nested-like syntax and lets a developer decide with great specificity which element to trigger changes on and when. Object notation are simple to handle: when: ```{'@car.color': ['change']}``` will invoke the “then” function if the model nested property 'color' is updated. For arrays, we have to get a little more tricky. Assigning variable names to any array index in a “when” lets us reference them later in a “then” or “to”.
Example: 
```
        { 
            when: {'@cars[x].passengers[y]': ['change']},
             then: function(event, indexMap) {
                return {text: 'Feedback for: ' + this.model.get('cars[' + indexMap.x + '].passengers[' + 'indexMap.y + ']')}
             to: 'my-feedback-for-car[x]-and-passenger[y]'
           }
```
You can see that if a change is made on any passenger from any car, we'll invoke the “then” function and pass in the indices of the changed property for x and y as an indexMap. Finally, the resulting “then” directives will be made against an element found using the “to” mapping. One or many elements will be found with the value of the data-feedback attribute that matches the x and y indices.

You can replace a variable assignment in the “when” or the “to” with a specific numeric value as well. Changing a “when” or “to” from [x] → [0] would make it so that the when-then would only listen to the first car or only update the first car respectively.

While you should always assign variable names to the indices in a “when”, a “to” can capture many indices by using open array notation, “[]”. Using a [] will mean that any invocation of a “then” will occur against all elements with indices 0-n. ```'my-feedback-for-car[]-and-passenger[y]' ```will push any “then” directives to all cars but limited to only the specific passenger index that was triggered by the capturing “when”. Likewise, ```'my-feedback-for-car[]-and-passenger[]'``` will push any “then” directives to all elements that match the pattern: ```'my-feedback-for-car[*]-and-passenger[*]'```.

On the “to” field, you have freedom of where you put index variables and when you choose an open array notation. You can get your desired effect by playing with the index assignments.

Summary:
>When: when to trigger a “then”.

>Then: generate directives to perform on one or more elements

>To: the elements to be updated.


##Collections

A Backbone collection is an ordered set of models (http://backbonejs.org/#Collection). It offers built-in triggered events when the set is modified. It also offers an API to query the models as well. What Torso adds is a way to use collections to meet the new needs of a single page application.

As perspectives come in and out each using various widgets and child views, they typically display and modify models. These views with the addition of application-level services create many places that a single model can be used and modified. For example, we have a view that is showing a model, let's say a person model, and a service, let's say a usage-tracker service, that is also using and modifying the same person model. The service is updating the person's usage data every 5 seconds. Now the view wants to update the person. Whatever the usage data was when the view fetched that person will override the most recent usage data sent by the service. Syncing models across the components that use them is difficult, unless you only use one instance.

For this, Torso introduces a Cache. A Cache is a collection that acts as an application-level store of models for a given type of resource. The goal of a cache is to maintain one instance of any model for the entire frontend application. Typically, this is done by creating a cache per resource type and any component of the app that wants to access and modify a model must first pull it from the cache. If the cache does not have that model, it will fetch it from the server. There is an enhancement request in Torso to allow views, services, and other models to directly request a model from the cache. For now, requester collections are the mechanism to allow components to interact with a cache.

A requester collection is generated from an existing cache using the method ```generatePrivateCollection()```. This private requester collection is an entirely new collection that has the same custom API as the cache it was made from has minus the cache-specific methods and adds requester-specific methods. The method at the heart of a requester collection is ```trackIds(ids)```. Passing in an array of ids to this method will signal to the requester collection to start registering those ids to its parent cache. Any fetching done by the cache will include these ids. When the cache fetch is complete, any updates in the models will be added to the requester collection automatically. The requester collection and the cache collection both contain the same instance of the model and satisfying our goal of having one instance for the application. It also conveniently solves another problem of repetitive fetching. If each view or service had to fetch the same model, you would get duplicate requests. By going through the cache, any fetches will update all requester collections. Adding in automatic polling of a cache (explained later), your views and services rarely have to ask the cache to be updated.

When a view tracks a new set of ids, the cache will see if any views are tracking that rejected ids. If not, the cache will remove that model from the cache. This avoids some memory issues experienced by a single page application running for a long period of time.

For a cache to work properly there must be a RESTful endpoint that it can hit that accepts a list of ids and returns a list of models. The default is a POST of the ids to a url: ```collection.url + '/ids'```.

A cache can continually poll for new updates using the method ```startPolling(pollInterval)``` where ```pollInterval``` is the period of the polling in milliseconds. Stopping the polling is as easy as calling ```stopPolling()```.

A cache will trigger the event ```'load-begin'``` if a fetch is invoked. It will trigger a follow-up ```'load-complete'``` when the complete is finished regardless if it was successful or not. Immediately after a cache triggers a ```'load-begin'```, any requester collections created from that cache will trigger ```'cache-load-begin'```. When the cache  emits a ```'load-complete'```, the requester collections will follow-up with a ```'cache-load-begin'```. Depending on the order of the listeners and when the requester collection was made, you could experience different ordering of the events. Typically, the order is: load-begin -> cache-load-begin -> FETCHING -> cache-load-complete -> load-complete.
  

##Forms

HTML forms make up a much of the web ecosystem, and doing it right is difficult. A couple big questions come up quickly. How do I map a model to an HTML form? How do you handle frontend validation and server validation? How do you deal with data integrity (i.e. rolling back model changes if the server fails)?

Torso addresses these concerns with two objects: a Form Model and a Form View. First, regardless of how a developer sets up the application and view hierarchies, a Form Model/View pair is supposed to be one-to-one with an HTML form. You can think of it as the javascript representation of the form. Therefore, the view is responsible for rendering the form DOM and the model is responsible for mirroring the form data. Connecting the form view to the application is easy, just have it be a child view to some parent perspective or widget. Connecting the form model to an object model can also be done – even multiple models. 

A form models goal is to pull in data from one or many object models, allow the user to update and dirty up the data and finally, when saved, push back the new updates to the object model(s).

A form model provides two methods: ```addModel``` and ```addComputed```. The method ```addModel``` allows you to have the form model track some or all of that model's fields. The form model can pull the object model's fields at any time and can even ```startUpdating()``` which will keep the form model up-to-date in real time. Live updating can be useful if the form is in a “read-only” state – you don't usually want the form updating while a user is using it.

The method ```addComputed``` allows the form model to track a set of fields across one or more object models and transform them as they enter the form model. Likewise when the form model pushes back to the object model(s), a reverse transform can take place. This is useful if you'd like to go from dollars to cents, or 3-field SSN to one, etc.

Calling save on a form model can do one of two things. It will either push all updates to the object model(s) immediately and call save on each one and return a promise. The form model will wait to see if all saves have been successful and resolve the promise. If any object model save fails, the default behavior is to rollback the updates to all tracked object models and re-save them. This process can be error-prone and can lead to stale data being saved or object models becoming out of sync. Instead, if the form model itself contains a url, all the form model data will be passed to the endpoint specified by the form model url. If this save is successful, the form model will push the updates to the object model. This method is preferable as it provides for cross-model transactional updates, but costs the server another endpoint – typically one per form.

So how does the form model get updates from the user? It is two-way bound the form DOM by the form view. Torso uses backbone.stickit (https://github.com/NYTimes/backbone.stickit) as its two-way binding library. Adding bindings between your form model and form DOM is really easy. Adding a data-model attribute to any input field will bind that input to the property specified by the attribute. Example: Adding ```data-model=”age”``` to a text input will bind whatever the user enters into that input with ```formView.model.get('age')```. Likewise, if the developer invokes: ```formView.model.set('age', 15)``` will update the text in the input to be 15. This works with all standard html form field types. Note: select options will be destroyed and recreated as the model updates, which means that classes and other DOM attributes will be lost.

Please note that while feedback when-then's can refer to elements using variable names or open array notations, each DOM element created by your view should be specific. Example: ```data-model=”cars[0].passenger[1]“```

Torso provides Handlebars helpers to easily add the attributes on an input field. It can deal camelCase conversion, index replacement, and duplicate attribute values while making sure to create valid HTML attribute values. An example of using the formAttr helper: 

```
  {{formAttr 'firstName[x].sub' 'id, for' value='demo' x=123}} 
  Generates: id="first-name-123_sub-demo" for="first-name-123_sub"
```


###Validation

Handling validation for a form is a challenge. When to invoke the validation, how often, and where to put the validation errors are all common questions. Luckily, with a view's ability to perform feedback, we can have all the control we need to get our desired behavior. Want a validation error to pop up next to an input if they enter more than 5 letters? Add a feedback entry that looks like:

```
  {
    when: {
      '@myField': ['keyup']
    },
    then: function(event) {
      return {
        text: this.model.get('myField').length > 5 ? '5 or less characters please' : ''
      }
    },
    to: 'my-field-validation-location'
  }
```

You can use the form model's ability to predefine validation rules as well. Torso uses Backbone.validation (https://github.com/thedersen/backbone.validation) as a base and has made updates to it to handle array/object notation as well as takes into account the specifics of the form model. 

For more details on form model validation specifications, checkout http://vecnatechnologies.github.io/backbone-torso/#recipes.forms

Now that you have added form model validation rules your feedback entry would look like:

```
  {
    when: {
      '@myField': ['keyup']
    },
    then: function(event) {
      return {
        text: this.model.isValid('myField') === 'too.long' ? '5 or less characters please' : ''
      }
    },
    to: 'my-field-validation-location'
  }
```
  
[Todo: Handling server-side validation errors]

##Router

Torso uses the basic Backbone router. Nothing new or fancy was added. However, we do have a recommended router recipe you can follow which can be found https://github.com/vecnatechnologies/generator-torso-brec. It just adds a method that helps switch between perspectives:

```
  /**
   * Switches the current perspective to be the given perspective.
   */
  switchPerspective: function(nextPerspective) {
    if (this.current) {
      this.current.detach();
    }

    this.current = nextPerspective;
    this.current.attach($('.app'));
  }
```

Using this method is as simple as: ```this.switchPerspective(myNewPerspective);``` This should allow you to properly detatch existing DOM and attach the new DOM. You may need to deal with deativating the current perspective as well, if needed.


##UMD

The Torso codebase is made up of modules that provide various pieces of functionality. Each of these modules is wrapped in a UMD (see http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) header, so they can be brought in individually through CommonJS, AMD, or globally. If you would rather import all of the modules and save yourself some hassle, you can use the “torso.js”  module found at backbone-torso/modules/torso.js. This includes all the modules under a single namespace and is what is returned by default when you require('backbone-torso'). If you are using globals, you will have to import each module before creating the namespace with torso.js. For ease, we've created a single file that bundles together all the modules in the right order and created the namespace 'Torso'. This can be found at backbone-torso/torso-bundle.js or backbone-torso/torso-bundle.min.js


##Torso Configuration

Torso comes with a module named: "configure.js". It makes sure that its dependencies (namely backbone and jquery) are set up correctly. More explicitly, it grabs backbone and jquery and set backbone's $ to jquery or root's $. This module gets brought in with the torso bundle and runs automatically in browserify and require.js.

```
require("backbone-torso");
```

If you are just bringing in a subset of torso modules, make sure to include this module.

```
require('backbone-torso/modules/configure');
```

When using Torso in a global namespace (without browserify or require.js) and you are using the torso bundle, you don't have to do anything because configure will run automatically as long as jquery and backbone were already imported on the page.
While using Torso in a global namespace without torso bundle, you just have to import that "configure" module on to your page after bringing in jquery and backbone:

```
<script src="backbone-torso/modules/configure">
```
