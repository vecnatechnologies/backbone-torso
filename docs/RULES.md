# What are the Torso standards?

## First Rule Set: DOM and Application

Let's start with some basics about a web page. There's two main components: DOM and Application. The first rule of Torso is to keep these separate. Always try to reduce the number of and depth of the ties between the two. Keep a clean separation and a good API between them. The only connection between the two should be that our Templates should generate DOM and that a View listens for changes in DOM through events. Re-rendering is the key to reflecting change in application state.

### Don't create DOM in the View
jQuery allows you to create DOM elements. Don't do it -- always use your Template to generate the HTML. Don't store application state in DOM. The View should be able to render itself new HTML that represents the state of the View at almost any time. If you are reading from a multiselect option, consider keeping the selected values in the view as a field and updating that field when more options are added. You can re-render that multiselect at any time, because you've captured the state and stored it in the application rather than the DOM.

### Try not to manipulate DOM from the View
Some of the most basic uses of Backbone Views involve listening to a user event and showing and hiding elements, adding a new element, or removing elements. Most of the examples on the web use jQuery to update the DOM. In Torso, we would change the state of the View and call render again. This may seem excessive, but it is at the heart of most of the standards of Torso. It provides us a clear API between the View, the Template, and the DOM. There may be cases where this isn't possible (animations, external javascript widget initializations, etc.) and this is okay, but remember to keep this to a minimum. Also, Torso uses a DOM hotswapping technique that speeds up rendering small changes.

## Second Rule Set: Views

Managing a bunch of moving parts is always difficult -- just ask an aspiring juggler. A gaggle of Views all vying for ownership of the DOM, event callbacks, and other such View-doings, can get complicated. That's why it's important to have a clear understanding of the roles and responsibilities for any given View. We need to know that any View will be able to perform certain tasks when it's supposed to. A render call generates a DOM fragment within its `this.$el`. The render method must be able to create a DOM fragment that represents the state of the View and attach it to the View's `this.$el`. This allows parents to manipulate where the generated content goes with respect to the page.

### The render method does not take arguments
The render method on a view is **always** a public method that can be invoked by any outside entity. The render method is responsible for expressing the state of the View in terms of a DOM fragment. This means that it should take no arguments, because any arguments needed to change the DOM should have been expressed as changes in the state of the View.

### A View renders its DOM fragment before being attached to the DOM
By default a View should call render before being inserted into the DOM. If you use Torso's built-in API for attaching views (`attachView` for tracked/child views and `attachTo` when directly attaching a view to the DOM), Torso will invoke render on the view before it is attached. This saves everyone including the parent View effort of knowing whether a child View has rendered or having to invoke it manually. Because a Torso view should always be ready to express its state as DOM, the parent views should feel confident calling render on a tracked/child view at any point. Note: If the child View isn't ready (maybe data from the server hasn't arrived yet), then the Template should know that via the state of the View and the HTML should express this via a loading message.

### The rendering process does not change state of the Application
The rendering process is the methods that make up the `render` call and include `prerender`, `updateDOM`, `prepare`, `attachTrackedViews`, and `postrender`. It is important not to change the state of the Application in any of these methods. Because the render method is a call to express the View state as a DOM fragment, changing state of anything but the DOM fragment is against the contract. Think of it as a challenge to the View to be true to itself in the DOM. This also allows outside components to invoke a render call with confidence that there will be no unexpected changes to state.

### A View isn't responsible for setting the DOM element it is rendering into.
A View does not have to know where it is on the page. Its sole responsibility is to generate a DOM fragment that represents the state of the View. Its parent is responsible for placing the View's DOM fragment into position.

### A parent View that owns a child View is responsible for binding the child View's DOM fragment to the parent's DOM fragment
Because Views only generate DOM fragments, it's the responsibility of the View's owner to place that fragment within the proper context of the page. If the View was created by a parent View, then it should bind the child's DOM fragment to its own DOM fragment. This allows an entire page of DOM to be generated, disposed, or detached through a tree of Views.

### Any events, intervals, child Views and owned collections need to be handled on dispose
Knowing what things to explicitly handle in a dispose method is key to making sure you don't introduce chaos when it comes to event handling and memory management. By calling  [dispose](https://github.com/vecnatechnologies/backbone-torso/blob/master/modules/View.js#L233) on a Torso View, it will detach and destroy the view's DOM, stop listening to any events (both DOM events and Backbone events), deactivate all tracked views, and dispose all child views. You should add any extra dispose logic in `_dispose` which may include removing ongoing processes like timer tasks created with `setInterval`. While child views will be removed automatically, other objects like requester/private collections will need to be removed directly in `_dispose` (e.g. `myPrivateCollection.requesterDispose()`). By attaching a view using `attachView`, the parent will register this view as a child and will dispose of it during the parent's dispose method. However, if you initialize a view and never attach it, you should dispose of this view directly in `_dispose`. For understanding dispose and the life cycle of Views, read more [here](https://github.com/vecnatechnologies/backbone-torso/blob/master/docs/DOCUMENTATION.md#views).


### Inter-View communication happens through events (usually)
Views have a few ways of communicating with one another. The options are: a direct invocation on the other View, View-scoped event messages, global event messages with domain namespace, and global event messages with widget namespace (with the widget's globally unique id if need be). The term **widget** here is used to refer to a View, including its children, that acts as an identifiably unique and independent UI component (think facebook wall). Also, the term **global event** refers to a bus that can be created by requiring Torso's Events module. When deciding which of these methods to use, follow these rules to help make the decision:

**Parent to Child**

A parent who directly owns a child View can make a direct invocation on the child View. If the parent wants to communicate to a grandchild View, it is recommended to publish a widget-namespaced global message.

**Child to Parent**

The child should publish a View-scoped message (e.g. `this.trigger('foo')`). If there is concern that it needs to reach a grandparent, the message should be published as a global message under the widget namespace.

**Widget to Widget**

Use a global message using a domain namespace. This could be something like "Notifications" or "Appointments", which multiple widgets may care about.

**Sibling Views**

If the siblings exist within a widget, use the widget namespace. The payload of the triggered event should contain enough information for a sibling View to determine if it is responsible to react (if needed).

Event names should always be **Action-based**. The name should explain that something happened, not that someone should do something. Examples of action-based event names would be: 'selected-options-updated', 'widget-initialized', or 'new-selection-made'. If it's widget scoped, consider using this naming convention using a colon to separate the widget name and the action: 'LocationWidget:new-location-selected' or 'TaskWidget:task-deleted'. Always make it action-based and **never reaction-based**. Expecting a reaction is going against the publisher/subscriber agreement of the event framework. Examples of poor event names: 'parent-rerender', 'all-children-should-reinitialize', 'widget-needs-flush'.

### A View renders the state of the View by way of a prepare method
The Torso `render` method updates the DOM using a method called `updateDOM` which in turn calls `this.prepare()` to generate a JSON object that represents the View's state. In the `prepare` method, the view's state (any values set by `this.set()`) and a view's model (if one exists) will be automatically added by Torso. If you'd like to add more to this context, return an object from a `_prepare` method, or specify a `prepareFields` field in your view. Torso's render method will automatically call prepare for you and combine your custom context with the default one. This context can be used by a template engine like Handlebars to generate the DOM.

### A View does not dictate HTML specifications as part of the View's state
The Template should read the state provided and enumerate all DOM elements required. What this means is that even if it feels like it will save writing lots of code by specifying classes, image urls, anchor urls, etc. inside the `prepare` method, let the Template list these out instead. Let the Template handle generating DOM and let the View handle the state. It should be clear that DOM-related content is in the Template and application state is in the View.

### By default, changes to the DOM fragment should happen via a re-render
Re-rendering happens often in order for the DOM to represent the state of the View as it changes. In order to facilitate so many render calls, the TemplateRenderer from Torso allows a View to pinpoint small changes and only update those. Also, the [feedback](https://github.com/vecnatechnologies/backbone-torso/blob/master/docs/DOCUMENTATION.md#feedback) module inside the Torso View allows you to make spot changes with a high level of control. It uses jQuery to make spot changes, but then stores these changes as View state to be reapplied after a render. The default implementation of `updateDOM` uses TemplateRenderer.

### A View listens to other models or collections, it does not create "on" callbacks on them
A View should only have to manage its own event callbacks, not those of other objects. Adding an "on" callback to other models, collections, and views is changing an attribute of that object and is more difficult to manage later. Use: `this.listenTo()`, not `this.model.on()`.

## Third Rule Set: Collections and Models

Collection and Models make up the "Model" in the MVC or MV* or the MV-whatever-backbone-is. There is no Hibernate 1st level cache, or transactions, or pretty much anything keeping your application from messing up handling lots of shifting data. These rules are meant to help you keep tabs on your data.

### One instance of a Model for the entire application
With lots of Views running amok within a Perspective, keeping consistent state in your Model layer is tough. One View updating an AppointmentModel may have problems if another View has a different copy of that AppointmentModel. Always keep only one instance of a given Model per application. This usually means requiring a "cache" collection somewhere that holds Models of a given type around in case a View or multiple Views need it. It also means if you go rogue and create a Model within a View and call fetch, it's dangerous if you plan on updating it. Go through your "cache"!

### If it goes to the server, it's a Model, otherwise it's a Cell
Cells are event-firing, state-containing objects, similar to Models. Models, however, are Cells that are server-backed that have methods like sync, fetch, and save. If it's not going to the server, it's a Cell. Use them instead.

### If possible, your REST services should return flat DTO's
All your Models should be "flat", meaning they don't nest other Models. If a Model that contains another object, that object has to be totally owned by the Model -- meaning it doesn't have a service that can retrieve or update it. This is to keep proper separation of concerns. The whole concept of a having one reference to a Model in your application (and therefore consistent states across many Views), is broken if a Robot Model has a Task Model, but a User Model has a different reference to the same Task Model. In that case, any updates to the Task Model will not be reflected in one of the RobotView or the UserView. If you need to grab many objects at once, consider making a separate "full" call to seed your caches.

### Render-what-you-got
Think for a moment if you can break a large View into a few subviews, each responsible for rendering smaller pieces. It's much faster for you to render the View that requires the Model you already have, and let a subview begin to fetch a related Model and display it when the information arrives from the server. In the mean time, the subview can show a loading symbol as it retrieves the information. This practice is much preferred over fetching everything at once and waiting for it all to return.

### Views have their own Collection instance
For a given type of Model, you can create a copy of a "cache" Collection by creating a new instance of it (with Torso it becomes a Requester Collection). This allows you to set filter or sort settings on the collection without affecting other Views who deal with that type of Model. Torso provides an easy way to do this.

## Fourth Rule Set: Routers
Routers function as a way to move from one [Perspective](https://github.com/vecnatechnologies/backbone-torso/blob/master/docs/DOCUMENTATION.md#perspectives) to another. Request variables can be pulled off the URL to customize the widgets in the Perspective. The Router should focus on changes to Perspective and nothing lower.

## Fifth Rule Set: Templates
There's an on-going debate around logic in templates. You can see a little bit [here](http://stackoverflow.com/questions/3896730/whats-the-advantage-of-logic-less-template-such-as-mustache) about mustache.js (a handlebars predecessor) forcing coders to create templates without any logic at all. The word "logic" has lots of baggage, but some of the opposition comes from poor use of JSP's. JSP is a templating language that can be used somewhat like Handlebars, but because it runs on the server, it also allows programmers to embed something called scriplets in the page. These scriplets allowed coders to embed Java code and even SQL commands inside the template. This led to a terrible lack of separation between view, control logic, and business logic. This was understandably frowned upon and people started to think providing this type of business logic inside the templates should not be allowed. Some started to merge the terms "business logic" and "display logic" into "logic". In this documentation, "display logic" refers to block controls like "if", "for each", and "format", while "business logic" refers to making decisions about View state based on business rules and model data. Logicless templates are void of all "logic" -- both business logic and display logic.

### No Handlebar Helpers should perform business logic (or any logic that the View should be performing)
Handlebars.js has some display logic built in -- the standard control keywords. It also allows coders to create fancier custom display logic with Handlebar Helpers. With great power comes great responsibility. It is on us to keep all business logic out of templates even if Helpers could do it. Don't make Handlebar Helpers the scriplets of the front-end world. The View is responsible for applying any business rules, updating the View state, and re-rendering. The Template is responsible for displaying whatever that state is.
