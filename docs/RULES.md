# What are the Torso standards?

## First Rule Set: DOM and Application

Let's start with some basics about a web page. There's two main components: DOM and Application. The first rule of Torso is to keep these separate. Always try to reduce the number of and depth of the ties between the two. Keep a clean separation and a good API between them. The only connection between the two should be that our Templates should generate DOM and that a View listens for changes in DOM through events. Re-rendering is the key to reflecting change in application state.

### Don't create DOM in the View
I know jQuery allows you to create DOM elements, but don't do it. Use your Template to generate the HTML. Don't store application state in DOM. The View should be able to render itself new HTML that represents the state of the View at almost any time. If you are reading from a multiselect option, consider keeping the selected values in the view as a field and updating that field when more options are added. You can re-render that multiselect again if needed to because you've captured the state and stored it in the application not the DOM.

### Try not to manipulate DOM from View
Some of the most basic uses of Backbone Views involve listening to a user event and showing and hiding elements, adding a new element or removing elements. Most of the examples on the web are to use jQuery to update the DOM. In Torso, we would change the state of the View and call render again. This may seem excessive, but it is at the heart of most of the standards of Torso. You will find it provides us a clear API between the View, the Template, and the DOM. There may be cases where this isn't possible (animations, external javascript widget initializations, etc.) and this is okay, but remember to keep this to a minimum. Also, Torso uses a DOM hotswapping technique that speeds up rendering small changes.

## Second Rule Set: Views

Managing a bunch of moving parts is always difficult, just ask an aspiring juggler. A gaggle of Views all vying for things like ownership of the DOM, event callbacks, and other such View-doings, can get complicated. That's why it's important to have a clear understanding about the roles and responsibilities for any given view. We need to know that any view will be able to perform certain tasks when they're supposed to. A render call generates a DOM fragment within its `this.$el`. The render method must be able to create a DOM fragment that represents the state of the View and attach it to the View's `this.$el`. This allows parents to manipulate where the generated content goes with respect to the page.

### A render method does not take arguments
The render method on a view is ALWAYS a public method that can be invoked by any outside entity. The render method is responsible to express the state of the View in terms of a DOM fragment. This by de facto means that no arguments can be taken, because any arguments needed to change the DOM should have been expressed as changes in the state of the View.

### A View renders its DOM fragment before being attached to the DOM
By default a View should call render during its initialization or always use Torso's `attachChildView` (called by `injectView`) when attaching a child view which will render the view before attaching it to the DOM. This saves everyone including the parent View effort of knowing whether a child View has rendered or having to invoke it manually. Note, that rendering as early as initialization is typically okay because rendering just expresses the state of the View and because it's only a fragment and not connected to the DOM yet. If the child View isn't ready (maybe data from the server hasn't arrived yet), then the Template should know that via the state of the View and the HTML should express this via a loading message.

### A render method does not change state of the Application
Because a render method is a call to express the View state as a DOM fragment, changing state of anything but the DOM fragment is against the contract. Think of it as a challenge to the View to be true to itself in the DOM. This also allows outside components to invoke a render call with confidence that things won't change under them.

### A View isn't responsible for setting the DOM element it is rendering into.
A View does not have to know where it is on the page. It's sole responsibility is to generate a DOM fragment that represents the state of the View. Its parent is responsible for placing the View's DOM fragment into position.

### A parent View that owns a child View is responsible for binding the child View's DOM fragment to the parent's DOM fragment
Because Views only generate DOM fragments, it's the responsibility of the owner of that View to place that fragment within the proper context of the page. If the View was created by a parent View, then it should bind the child's DOM fragment to its own DOM fragment. This allows an entire page's worth of DOM to be generated, disposed, or detached through a tree of Views.

### Any events, intervals, child views and owned collections need to be handled on dispose
Knowing what things to explicitly handle in a dispose method is key to making sure you don't introduce chaos when it comes to event handling and memory management. Remember to remove any event bindings the view has created with the events hash and any explicit listenTo's added during instantiation. A parent view that has created a child view during its instantiation, must be in charge of removing any children. Calling dispose on children views is an important part of memory and event management. Torso Views do a lot of this work for you in the default [dispose](https://github.com/vecnatechnologies/backbone-torso/blob/master/modules/View.js#L233) method including disposing of tracked child views (ones that you have used `injectView` on), deactivating all views, and stopping the event bindings. All other clean up should be written in `_dispose` callback. For understanding dispose and the life cycle of views, read more [here](https://github.com/vecnatechnologies/backbone-torso/blob/master/docs/DOCUMENTATION.md#views).

### Inter-View communication happens through events (usually)
Views can have a few ways of communicating with one another. The options are a direct invocation on the other view, view-scoped event messages, global event messages with domain namespace, and global event messages with widget namespace and if need be the widget's globally unique id. The term **widget** here is used to refer to a view and its children that acts as an identifiably unique and independent UI component (think facebook wall). Also, the term **global event** refers to a bus that can be created by requiring Torso's Events module. When deciding which of these methods to use follow these rules to help make the decision:

**Parent to Child**

A parent who directly owns a child view can make a direct invocation on the child view. If the parent wants to communicate to a grandchild view, it is recommended to publish a widget-namespaced global message.

**Child to Parent**

The child should publish a view-scoped message (e.g. `this.trigger('foo')`). If there is concern that it needs to reach a grandparent, the message should be published as a global message under the widget namespace.

**Widget to Widget**

Use a global message using a domain namespace. This could be something like "Notifications" or "Appointments" which multiple widgets may care about.

**Sibling Views**

If the siblings exist within a widget, use the widget namespace and the payload of the triggered event should contain enough information for a sibling view to determine if it is responsible to react (if needed).

Event names should always be **Action-based**. It should explain that something happened, not that someone should do something. Examples of action-based event names would be: 'selected-options-updated', 'widget-initialized', or 'new-selection-made'. If it's widget scoped, consider using this naming convention using a colon to separate the widget name and the action: 'LocationWidget:new-location-selected' or 'TaskWidget:task-deleted'. Always make it action based and **never reaction-based**. Expecting a reaction is going against the publisher/subscriber agreement of the event framework. Examples of poor event names: 'parent-rerender', 'all-children-should-reinitialize', 'widget-needs-flush'.

### A View renders the state of the view by way of a prepare method
A render method should always call `this.prepare()` to generate the JSON object that represents the view's state. Create a prepare method for your view to handle this responsibility. Torso's render method will automatically call prepare for you and the default prepare method puts the model (if there is one) and the viewState on to the context.

### A View does not dictate HTML specifications as part of the View's state
Template should read state provided and enumerate all DOM elements required. What this means is that even if it feels like it will save writing lots of code by specifying classes, image urls, anchor urls, etc. inside the prepare method, let the Template list these out instead. Let the Template handle generating DOM and let the View handle the state. It should be clear that DOM related content is in the template and application state is inside the view.

### By default, changes to the DOM fragment should happen via a re-render
Re-rendering happens often in order for the DOM to represent the state of the View as it changes. In order to facilitate so many render calls, the TemplateRenderer from Torso allows a View to pinpoint small changes and only update those. Also, the [feedback](https://github.com/vecnatechnologies/backbone-torso/blob/master/docs/DOCUMENTATION.md#feedback) module inside the Torso View allows you to make spot changes with a high level of control. It uses jQuery to make spot changes, but then stores these changes as view state to be reapplied after a render.

### A View listens to other models or collections, it does not create "on" callbacks on them.
A view should only have to manage its own event callbacks not other objects'. Adding an "on" callback is changing an attribute of that model or collection and is more difficult to manage later. Use: `this.listenTo()` not `this.model.on()`.

## Third Rule Set: Collections and Models

Collection and Models make up the "Model" in the MVC or MV* or the MV-whatever-backbone-is. There is no Hibernate 1st level cache, or transactions, or pretty much anything keeping your application from messing up handling lots of shifting data. These rules are meant to help you keep tabs on your data.

### One instance of a model for the entire application
With lots of Views running amok within a Perspective, keeping consistent state of your Model layer is tough. One View updating an AppointmentModel may have problems if another View has a different copy of that AppointmentModel. Always keep only one instance of a given model per application. This usually means requiring a "cache" collection somewhere that holds models of a given type around in case a View or multiple Views need it. It also means if you go rogue and create a model within a View and call fetch, it's dangerous if you plan on updating it. Go through your "cache"!

### If it goes to the server, it's a model, otherwise it's a cell
Cell's are event-firing, state-containing objects, similar to models. Models, however, are cells that are server-backed that have methods like sync, fetch, and save. If it's not going to the server, it's a cell. Use them instead.

### If possible, your REST services should return Flat DTO's
All your models should be "flat", meaning they don't nest other models. That's not to say you can't have a model that contains another object, but that object has to be totally owned by the model. As in, it doesn't have a service that can retrieve or update them. This is to keep proper separation of concerns. The whole concept of a having one reference to a model in your application (and therefore consistent states across many views), is broken if a Robot model has a Task model but a User model has a different reference to the same Task model. In that case, any updates to the Task model will not be reflected in one of the RobotView or the UserView.

### Render-what-you-got
Think for a moment if you can break a large View into a few subviews each responsible for rendering smaller pieces. It's much faster for you to render the view concerning the model you already have, and let a subview begin to fetch a related model and display it when the information arrives from the server. In the mean time, the subview can show a loading symbol as it retrieves the information. This practice is much preferred over fetching everything at once and waiting for it all to return.

### Views have their own Collection instance
For a given type of model, you can create a copy of a "cache" collection by creating a new instance of a it (with Torso it becomes a Requester Collection). This allows you to set filter or sort settings on the collection without affecting other views who deal with that type of model. Torso provides an easy way to do this.

## Fourth Rule Set: Routers
Routers function as a way to move from one [Perspective](https://github.com/vecnatechnologies/backbone-torso/blob/master/docs/DOCUMENTATION.md#perspectives) to another. Request variables can be pulled off the URL to customize the widgets in the Perspective. There currently are not many rules pertaining to routers. If anything it's that it should focus on changes to Perspective and nothing lower.

## Fifth Rule Set: Templates
There's an on-going debate among the greybeards of templating languages whether to include "logic" into the lexicon. You can see a little bit [here](http://stackoverflow.com/questions/3896730/whats-the-advantage-of-logic-less-template-such-as-mustache) about mustache.js (a handlebars predecessor) forcing coders to create templates without any logic at all. Let's get something straight: we don't have to be scared of logic. The word "logic" has lots of baggage but the reason people are scared of it comes partly because of JSP's. JSP is a templating language that can be used somewhat like Handlebars but because it runs on the server, it also allows programmers to embed something called scriplets into the page. These scriplets allowed coders to embed Java code and even SQL commands inside the template. This led to terrible separation of the Views from the Control logic and even Business logic. This was understandably frowned upon and people started to think providing this type of business logic inside the templates should not be allowed. Well, as with anything, people can overreact. Some started to merge the terms "business logic" with "display logic" into "logic". So we're on the same page, "display logic" consists of block controls like "if", "for each", or even "format". Logicless templates are void of all "logic" - both business logic and display logic. As the Russians say, 'To shoot a cannon into sparrows.' - only slightly overkill.

### No Handlebar Helpers should perform business logic (or any logic that the View should be performing)
Handlebars.js has some display logic built in - the standard control keywords. It also provides for coders to create fancier custom display logic with Handlebar Helpers. With great power comes great responsibility. It is on us to keep all business logic out of templates even if Helpers could do it. Don't make Handlebar Helpers the scriplets of the front end world.