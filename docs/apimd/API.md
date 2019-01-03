## Classes

<dl>
<dt><a href="#ViewStateCell">ViewStateCell</a> ⇐ <code>NestedCell</code></dt>
<dd></dd>
<dt><a href="#View">View</a> ⇐ <code><a href="#external_Backbone-View">Backbone-View</a></code></dt>
<dd></dd>
<dt><a href="#Model">Model</a> ⇐ <code><a href="#external_Backbone-Model">Backbone-Model</a></code></dt>
<dd></dd>
<dt><a href="#Collection">Collection</a> ⇐ <code><a href="#external_Backbone-Collection">Backbone-Collection</a></code></dt>
<dd></dd>
<dt><a href="#DataBehavior">DataBehavior</a> ⇐ <code><a href="#Behavior">Behavior</a></code></dt>
<dd></dd>
<dt><a href="#Behavior">Behavior</a></dt>
<dd></dd>
<dt><a href="#Cell">Cell</a> ⇐ <code><a href="#external_Backbone-Model">Backbone-Model</a></code></dt>
<dd></dd>
<dt><a href="#PrivateCollection">PrivateCollection</a> ⇐ <code><a href="#Collection">Collection</a></code></dt>
<dd></dd>
</dl>

## Mixins

<dl>
<dt><a href="#cellMixin">cellMixin</a></dt>
<dd><p>An non-persistable object that can listen to and emit events like a models.</p>
</dd>
<dt><a href="#cacheMixin">cacheMixin</a></dt>
<dd><p>Custom additions to the Backbone Collection object.</p>
<ul>
<li>safe disposal methods for memory + event management</li>
<li>special functional overrides to support ID registration for different views</li>
</ul>
</dd>
</dl>

## Members

<dl>
<dt><a href="#cache">cache</a></dt>
<dd><p>The torso collection that is acting as a cache used to create the private collections.
This property/option is required.  Instantiation will fail if it is not set.</p>
</dd>
<dt><a href="#renderOnFetch">renderOnFetch</a></dt>
<dd><p>Adds a listener on the Behavior for the <code>fetched</code> event that triggers a render on the view.
true - A listener is added to the behavior that re-renders the view when a &#39;fetched&#39; event is triggered.
false (default) - no listeners are added.</p>
</dd>
<dt><a href="#skipInitialLoad">skipInitialLoad</a></dt>
<dd><p>Skip triggering a load of this data behavior when the view completes initializing.
true - no load after the view is initialized.
false (default) - trigger a .retrieve() on this data behavior when the view completes initialization.</p>
</dd>
<dt><a href="#returnSingleResult">returnSingleResult</a></dt>
<dd><p>Determines the result of <code>view.getBehavior(&#39;thisBehaviorAlias&#39;).toJSON()</code>.
true - a single model result is returned.
false (default) - an array of model results are returned.</p>
</dd>
<dt><a href="#alwaysFetch">alwaysFetch</a></dt>
<dd><p>Determines whether <code>pull()</code> or <code>fetch()</code> is called when using <code>retrieve()</code>.
true - Use fetch() by default on the private collection.
false (default) - Use pull() by default on the private collection.
True will query the server more often, but will provide more up-to-date data.
False will only query the server if the model hasn&#39;t already been retrieved.
This property will be ignored if <code>fetch()</code> or <code>pull()</code> is called directly.</p>
</dd>
<dt><a href="#ids">ids</a></dt>
<dd><p>Duck-typed property that identifies the ids to use. id or ids is required (either by behavior options or as properties).</p>
<ul>
<li>{string|number} - the id to use directly (equivalent to an array of a single id).</li>
<li>{string[]|number[]} - the ids to use directly.</li>
<li>{Object} - more complex configuration that identifies a model-like object that fires a change event and the<pre><code>       property on that object to use. The object can fire the change event for the given property
       and have a .get(&#39;propertyName&#39;) method, or it can define the property directly on the idContainer.
       Only one property can be identified as supplying the id for this data model.
       If the identified object does not fire a change event then the id(s) will never be refreshed for this behavior.
       The idContainer can also fire a &#39;fetched:ids&#39; event on itself to signal to this data behavior that the ids
       have been fetched for the first time.  Then a &#39;change:&lt;propertyName&gt;&#39; event can be used to notify this
       data behavior that the property has been modified.
</code></pre><ul>
<li>property {string} - the name of the property that defines the ids. The root object is assumed to be the view unless<pre><code>                idContainer is defined. The idContainer is the object that fires a change event for the given property name.
                Uses the view or the idContainer as the root to get the identified property (i.e. &#39;viewState.&#39;, &#39;model.&#39;, etc).
                Will get the property before the first &#39;.&#39; from the view and if it is an object will try to use a
                .get(&#39;&lt;propertyName&gt;&#39;) on it and set a &#39;change:&lt;propertyName&gt;&#39; listener on it.
                If it is a string/number or array of string/number, then it will use that as the ids.
                Triggering a &#39;id-container-updated&#39; event on the behavior will cause it to stop listing to the
                old idContainer and start listening to the new one defined by this property.
</code></pre></li>
<li>idContainer {Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change<pre><code>                events and has a .get(&#39;propertyName&#39;) function. It isn&#39;t required to fire events -
                the change event is only required if it needs to re-fetch when the id property value changes.
</code></pre>Examples:<ul>
<li>{ property: &#39;_patientId&#39; }</li>
<li>{ property: &#39;viewState.appointmentId&#39; }</li>
<li>{ property: &#39;model.type&#39; }</li>
<li>{ property: &#39;behaviors.demographics.data.appointments&#39; }</li>
<li>{ property: &#39;id&#39;, idContainer: userService }</li>
<li>{ property: &#39;username&#39;, idContainer: function() { application.getCurrentUser() } }</li>
</ul>
</li>
</ul>
</li>
<li><p>{Function(cache)} - expected to return the ids (either array, jquery deferred that resolves to the ids or single primitive)</p>
<pre><code>                to track with the private collection. Cache is passed in as the first argument so that the behavior
                can be defined and the cache can be overridden later.
                &#39;this&#39; is the behavior (from which you can get the view if needed).
                What was criteria should use this instead:

function(cache) {
  var thisBehaviorInstance = this;
  var view = this.view;
  var criteria = { ... some criteria ... };
  return cache.fetchIdsByCriteria(criteria);
}
</code></pre></li>
</ul>
</dd>
<dt><a href="#updateEvents">updateEvents</a></dt>
<dd><p>cause this behavior to re-calculate its ids and refetch them from the server if the given events are triggered
(space separated if string, single item is equivalent to array of single item).</p>
<ul>
<li>&#39;view:eventName&#39; - arbitrary event triggered on the view (eventName can be a change:propertyName event).</li>
<li>&#39;viewState:eventName&#39; - arbitrary event triggered on the viewState (eventName can be a change:propertyName event).</li>
<li>&#39;model:eventName&#39; - arbitrary even triggered on the view&#39;s model (eventName can be a change:propertyName event).</li>
<li>&#39;this:eventName&#39; - arbitrary event triggered by this behavior (eventName can be a change:propertyName event).</li>
<li>&#39;behaviorAlias:eventName&#39; - arbitrary event triggered by another data behavior on this view (eventName can be a change:propertyName event).</li>
<li>&#39;behaviorAlias.data:eventName&#39; - arbitrary event triggered by the data of another DataBehavior on this view (eventName can be a change:propertyName event).</li>
<li>{ &#39;<eventName>&#39;: &lt; object (or function returning an object) that the event is triggered on &gt; } - arbitrary (&#39;<eventName>&#39;) triggered on the supplied object.</li>
</ul>
</dd>
<dt><a href="#data">data</a></dt>
<dd><p>Object that manages interaction with the data.  Contains the privateCollection, proxies all events from the privateCollection,
and has get(&#39;...&#39;) and .toJSON() methods that access the private collection data.</p>
</dd>
<dt><a href="#FETCHED_STATUSES">FETCHED_STATUSES</a></dt>
<dd><p>The possible fetched statuses.  This is the status value of the fetched event payload.</p>
</dd>
<dt><a href="#parentBehavior">parentBehavior</a></dt>
<dd><p>The dataBehavior instance that owns this data object.</p>
</dd>
<dt><a href="#privateCollection">privateCollection</a></dt>
<dd><p>The private collection that this data object manages.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#torso">torso</a></dt>
<dd><p>Module containing all dependencies that exports a single object with everything attached (same format as the global).</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#constructor">constructor([behaviorState], behaviorOptions, [viewOptions])</a></dt>
<dd></dd>
<dt><a href="#retrieve">retrieve()</a> ⇒ <code>$.Deferred.Promise</code></dt>
<dd><p>Retrieves the ids for this data object and passes them off to the private collection to track and then does a
pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).</p>
</dd>
<dt><a href="#pull">pull()</a> ⇒ <code>$.Deferred.Promise</code></dt>
<dd><p>Retrieves the ids for this data object and passes them off to the private collection&#39;s trackAndPull() method.</p>
</dd>
<dt><a href="#fetch">fetch()</a> ⇒ <code>$.Deferred.Promise</code></dt>
<dd><p>Retrieves the ids for this data object and passes them off to the private collection&#39;s trackAndFetch() method.</p>
</dd>
<dt><a href="#prepare">prepare()</a></dt>
<dd><p>Adds the toJSON of the data represented by this behavior to the context.</p>
</dd>
<dt><a href="#isLoading">isLoading()</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the behavior is loading objects or ids.</p>
</dd>
<dt><a href="#isLoadingIds">isLoadingIds()</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the behavior is loading ids.</p>
</dd>
<dt><a href="#isLoadingObjects">isLoadingObjects()</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the behavior is loading objects.</p>
</dd>
<dt><a href="#listenToIdsPropertyChangeEvent">listenToIdsPropertyChangeEvent()</a></dt>
<dd><p>Listens for the change event on the ids property and, if triggered, re-fetches the data based on the new ids.</p>
</dd>
<dt><a href="#stopListeningToIdsPropertyChangeEvent">stopListeningToIdsPropertyChangeEvent()</a></dt>
<dd><p>Removes the listener added by listenToIdsPropertyChangeEvent().</p>
</dd>
<dt><a href="#retrieveOncePromise">retrieveOncePromise()</a> ⇒ <code>jQuery.Promise</code></dt>
<dd><p>This is a good way to have something be called after at least one retrieve (pull or fetch) has completed.
This is especially useful if you don&#39;t care if the fetch has already happen you just want to do something once
the data is loaded.</p>
<p>This can also be done purely by listening for the &#39;fetched&#39; event, but you might miss the event if it is fired
before you start listening.  This gives a structure for handling that case so that your methods are called
if the event is fired and if it is not fired.</p>
<p>This also gives the ability to distinguish between a successful and failed fetch easily using the promises
resolve/reject handlers.</p>
<p>Usage:</p>
<p>someDataBehavior.retrieveOncePromise()
  .then(view.doSomethingWithTheData, view.handleFiledFetch);</p>
</dd>
<dt><a href="#initialize">initialize(options)</a></dt>
<dd><p>Instantiates the data objects and binds it to this behavior instance.</p>
</dd>
<dt><a href="#isLoading">isLoading()</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if behavior is loading ids or objects.</p>
</dd>
<dt><a href="#isLoadingIds">isLoadingIds()</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the behavior is loading ids.</p>
</dd>
<dt><a href="#isLoadingObjects">isLoadingObjects()</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the behavior is loading objects.</p>
</dd>
<dt><a href="#toJSON">toJSON()</a> ⇒ <code>Object</code> | <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Get the full data object contents.  Either an array if returnSingleResult is false or a single object if it is true.</p>
</dd>
<dt><a href="#get">get([propertyName])</a> ⇒ <code>Object</code> | <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Get the full data object contents (either an array of model attributes or a single model attribute based on the
value of propertyName) or the value of a specific property if a single result is expected.</p>
<p>If returnSingleResult is true then this will return the given property from the model (if that model exists).
If returnSingleResult is false then this will return an array containing that property from all of the retrieved models.</p>
</dd>
<dt><a href="#getModel">getModel(modelId)</a> ⇒ <code>Backbone.Model</code></dt>
<dd></dd>
<dt><a href="#getModels">getModels()</a> ⇒ <code>Array.&lt;Backbone.Model&gt;</code></dt>
<dd></dd>
<dt><a href="#activate">activate()</a></dt>
<dd><p>Adds the listeners to the private collection.</p>
</dd>
<dt><a href="#deactivate">deactivate()</a></dt>
<dd><p>Removes the listeners on the private collection.</p>
</dd>
<dt><a href="#dispose">dispose()</a></dt>
<dd><p>Dispose of the data events.</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_Backbone">Backbone</a></dt>
<dd><p>The backbone View reference</p>
</dd>
<dt><a href="#external_Backbone-View">Backbone-View</a></dt>
<dd><p>The backbone View reference</p>
</dd>
<dt><a href="#external_Backbone-Model">Backbone-Model</a></dt>
<dd><p>The backbone Model reference</p>
</dd>
<dt><a href="#external_Backbone-Collection">Backbone-Collection</a></dt>
<dd><p>The backbone Collection reference</p>
</dd>
</dl>

<a name="ViewStateCell"></a>

## ViewStateCell ⇐ <code>NestedCell</code>
**Kind**: global class  
**Extends**: <code>NestedCell</code>  
**See**: <a href="../annotated/modules/View.html">View Annotated Source</a>  

* [ViewStateCell](#ViewStateCell) ⇐ <code>NestedCell</code>
    * [new ViewStateCell(attrs, opts)](#new_ViewStateCell_new)
    * [.trigger()](#ViewStateCell+trigger)

<a name="new_ViewStateCell_new"></a>

### new ViewStateCell(attrs, opts)
ViewStateCell is a NestedCell that holds view state data and can trigger
change events. These change events will propogate up and trigger on the view
as well.


| Param | Type | Description |
| --- | --- | --- |
| attrs | <code>Object</code> | the initial values to set on the cell - inherited from [NestedCell](NestedCell). |
| opts | <code>Object</code> | options for the cell. |
| opts.view | [<code>Backbone-View</code>](#external_Backbone-View) | the view that these options are tied to. |

<a name="ViewStateCell+trigger"></a>

### viewStateCell.trigger()
Retrigger view state change events on the view as well.

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
<a name="View"></a>

## View ⇐ [<code>Backbone-View</code>](#external_Backbone-View)
**Kind**: global class  
**Extends**: [<code>Backbone-View</code>](#external_Backbone-View)  
**See**: <a href="../annotated/modules/View.html">View Annotated Source</a>  
**Author**: ariel.wexler@vecna.com, kent.willis@vecna.com  

* [View](#View) ⇐ [<code>Backbone-View</code>](#external_Backbone-View)
    * [new View()](#new_View_new)
    * [.viewState](#View+viewState) : [<code>ViewStateCell</code>](#ViewStateCell)
    * [.prerender](#View+prerender) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [.postrender](#View+postrender) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [.attachTrackedViews](#View+attachTrackedViews) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [._attached](#View+_attached)
    * [._detached](#View+_detached)
    * [._activate](#View+_activate)
    * [._deactivate](#View+_deactivate)
    * [._dispose](#View+_dispose)
    * [.get()](#View+get)
    * [.set()](#View+set)
    * [.has()](#View+has)
    * [.unset()](#View+unset)
    * [.toJSON()](#View+toJSON)
    * [.getBehavior(alias)](#View+getBehavior) ⇒ <code>Torso.Behavior</code>
    * [.prepare()](#View+prepare) ⇒ <code>Object</code>
    * [._prepare(context)](#View+_prepare) ⇒ <code>Object</code>
    * [.render()](#View+render) ⇒ <code>Promise</code>
    * [.updateDOM()](#View+updateDOM)
    * [.updateClassName(newClassName)](#View+updateClassName)
    * [.templateRender()](#View+templateRender)
    * [.delegateEvents()](#View+delegateEvents)
    * [.undelegateEvents()](#View+undelegateEvents)
    * [.attachTo([$el], [options])](#View+attachTo) ⇒ <code>Promise</code>
    * [.attachView($el, view, [options])](#View+attachView) ⇒ <code>Promise</code>
    * [.isAttachedToParent()](#View+isAttachedToParent) ⇒ <code>boolean</code>
    * [.isAttached()](#View+isAttached) ⇒ <code>boolean</code>
    * [.detach()](#View+detach)
    * [.detachTrackedViews([options])](#View+detachTrackedViews)
    * [.activate()](#View+activate)
    * [.isActive()](#View+isActive) ⇒ <code>boolean</code>
    * [.deactivate()](#View+deactivate)
    * [.dispose()](#View+dispose)
    * [.isDisposed()](#View+isDisposed) ⇒ <code>boolean</code>
    * [.hasTrackedViews([options])](#View+hasTrackedViews) ⇒ <code>boolean</code>
    * [.getTrackedViews([options])](#View+getTrackedViews) ⇒ [<code>List.&lt;View&gt;</code>](#View)
    * [.getTrackedView(viewCID)](#View+getTrackedView) ⇒
    * [.registerTrackedView(view, [options])](#View+registerTrackedView) ⇒ [<code>View</code>](#View)
    * [.unregisterTrackedView(view)](#View+unregisterTrackedView) ⇒ [<code>View</code>](#View)
    * [.unregisterTrackedViews([options])](#View+unregisterTrackedViews) ⇒ [<code>View</code>](#View)
    * [.transitionOut(done, options)](#View+transitionOut)
    * [.transitionIn(attach, done, options)](#View+transitionIn)
    * [.invokeFeedback(to, [evt], [indexMap])](#View+invokeFeedback)

<a name="new_View_new"></a>

### new View()
Overrides constructor to create needed fields and invoke activate/render after initialization

Generic View that deals with:
- Creation of private collections
- Lifecycle of a view

<a name="View+viewState"></a>

### view.viewState : [<code>ViewStateCell</code>](#ViewStateCell)
Cell that can be used to save state for rendering the view.

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+prerender"></a>

### view.prerender ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
Hook during render that is invoked before any DOM rendering is performed.
This method can be overwritten as usual OR extended using <baseClass>.prototype.prerender.apply(this, arguments);
NOTE: if you require the view to be detached from the DOM, consider using _detach callback

**Kind**: instance property of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - you can optionally return one or more promises that when all are resolved, prerender is finished. Note: render logic will not wait until promises are resolved.  
<a name="View+postrender"></a>

### view.postrender ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
Hook during render that is invoked after all DOM rendering is done and tracked views attached.
This method can be overwritten as usual OR extended using <baseClass>.prototype.postrender.apply(this, arguments);
NOTE: if you require the view to be attached to the DOM, consider using _attach callback

**Kind**: instance property of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - you can optionally return one or more promises that when all are resolved, postrender is finished. Note: render logic will not wait until promises are resolved.  
<a name="View+attachTrackedViews"></a>

### view.attachTrackedViews ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
Hook to attach all your tracked views. This hook will be called after all DOM rendering is done so injection sites should be available.
This method can be overwritten as usual OR extended using <baseClass>.prototype.attachTrackedViews.apply(this, arguments);

**Kind**: instance property of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - you can optionally return one or more promises that when all are resolved, all tracked views are attached. Useful when using this.attachView with useTransition=true.  
<a name="View+_attached"></a>

### view.\_attached
Method to be invoked when the view is fully attached to the DOM (NOT just the parent). Use this method to manipulate the view
after the DOM has been attached to the document. The default implementation is a no-op.

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+_detached"></a>

### view.\_detached
Method to be invoked when the view is detached from the DOM (NOT just the parent). Use this method to clean up state
after the view has been removed from the document. The default implementation is a no-op.

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+_activate"></a>

### view.\_activate
Method to be invoked when activate is called. Use this method to turn on any
custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+_deactivate"></a>

### view.\_deactivate
Method to be invoked when deactivate is called. Use this method to turn off any
custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+_dispose"></a>

### view.\_dispose
Method to be invoked when dispose is called. By default calling dispose will remove the
view's element, its on's, listenTo's, and any registered children.
Override this method to destruct any extra

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+get"></a>

### view.get()
Alias to this.viewState.get()

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+set"></a>

### view.set()
Alias to this.viewState.set()

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+has"></a>

### view.has()
Alias to this.viewState.has()

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+unset"></a>

### view.unset()
Alias to this.viewState.unset()

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+toJSON"></a>

### view.toJSON()
Alias to this.viewState.toJSON()

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+getBehavior"></a>

### view.getBehavior(alias) ⇒ <code>Torso.Behavior</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Torso.Behavior</code> - the behavior instance if one exists with that alias  

| Param | Type | Description |
| --- | --- | --- |
| alias | <code>string</code> | the name/alias of the behavior |

<a name="View+prepare"></a>

### view.prepare() ⇒ <code>Object</code>
prepareFields can be used to augment the default render method contents.
See __getPrepareFieldsContext() for more details on how to configure them.

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Object</code> - context for a render method. Defaults to:
   {view: this.viewState.toJSON(), model: this.model.toJSON()}  
<a name="View+_prepare"></a>

### view.\_prepare(context) ⇒ <code>Object</code>
Extension point to augment the template context with custom content.

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Object</code> - [Optional] If you return an object, it will be merged with the context  

| Param | Description |
| --- | --- |
| context | the context you can modify |

<a name="View+render"></a>

### view.render() ⇒ <code>Promise</code>
Rebuilds the html for this view's element. Should be able to be called at any time.
Defaults to using this.templateRender. Assumes that this.template is a javascript
function that accepted a single JSON context.
The render method returns a promise that resolves when rendering is complete. Typically render
is synchronous and the rendering is complete upon completion of the method. However, when utilizing
transitions/animations, the render process can be asynchronous and the promise is useful to know when it has finished.

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> - a promise that when resolved signifies that the rendering process is complete.  
<a name="View+updateDOM"></a>

### view.updateDOM()
Produces and sets this view's elements DOM. Used during the rendering process. Override if you have custom DOM update logic.
Defaults to using the stanrdard: this.templateRender(this.$el, this.template, this.prepare(), templateRendererOptions);
this.templateRendererOptions is an object or function defined on the view that is passed into the renderer.
Examples include: views with no template or multiple templates, or if you wish to use a different rendering engine than the templateRenderer or wish to pass options to it.

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+updateClassName"></a>

### view.updateClassName(newClassName)
Updates this view element's class attribute with the value provided.
If no value provided, removes the class attribute of this view element.

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Description |
| --- | --- | --- |
| newClassName | <code>string</code> | the new value of the class attribute |

<a name="View+templateRender"></a>

### view.templateRender()
Hotswap rendering system reroute method.
See Torso.templateRenderer#render for params

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+delegateEvents"></a>

### view.delegateEvents()
Overrides the base delegateEvents
Binds DOM events with the view using events hash while also adding feedback event bindings

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+undelegateEvents"></a>

### view.undelegateEvents()
Overrides undelegateEvents
Unbinds DOM events from the view.

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+attachTo"></a>

### view.attachTo([$el], [options]) ⇒ <code>Promise</code>
If detached, will replace the element passed in with this view's element and activate the view.

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> - promise that when resolved, the attach process is complete. Normally this method is synchronous. Transition effects can
                  make it asynchronous.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [$el] | <code>jQuery</code> |  | the element to attach to. This element will be replaced with this view.                       If options.replaceMethod is provided, then this parameter is ignored. |
| [options] | <code>Object</code> |  | optional options |
| [options.replaceMethod] | <code>Fucntion</code> |  | if given, this view will invoke replaceMethod function                                             in order to attach the view's DOM to the parent instead of calling $el.replaceWith |
| [options.discardInjectionSite] | <code>Booleon</code> | <code>false</code> | if set to true, the injection site is not saved. |

<a name="View+attachView"></a>

### view.attachView($el, view, [options]) ⇒ <code>Promise</code>
Registers the view as a tracked view (defaulting as a child view), then calls view.attachTo with the element argument
The element argument can be a String that references an element with the corresponding "inject" attribute.
When using attachView with options.useTransition:
  Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view
  previously had another view at this injections site, this previous view will be removed with that view's transitionOut.
  If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even
  though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.
  If the previous view is the same as the new view, it is injected normally without transitioning in.
  The previous view must has used an injection site with the standard "inject=<name of injection site>" attribute to be found.
  When the transitionIn and transitionOut methods are invoked on the new and previous views, the options parameter will be passed on to them. Other fields
  will be added to the options parameter to allow better handling of the transitions. These include:
  {
    newView: the new view
    previousView: the previous view (can be undefined)
    parentView: the parent view transitioning in or out the tracked view
  }

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> - resolved when all transitions are complete. No payload is provided upon resolution. If no transitions, then returns a resolved promise.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| $el | <code>jQuery</code> \| <code>string</code> |  | the element to attach to OR the name of the injection site. The element with the attribute "inject=<name of injection site>" will be used. |
| view | [<code>View</code>](#View) |  | The instantiated view object to be attached |
| [options] | <code>Object</code> |  | optionals options object. If using transitions, this options object will be passed on to the transitionIn and transitionOut methods as well. |
| [options.noActivate] | <code>boolean</code> | <code>false</code> | if set to true, the view will not be activated upon attaching. |
| [options.shared] | <code>boolean</code> | <code>false</code> | if set to true, the view will be treated as a shared view and not disposed during parent view disposing. |
| [options.useTransition] | <code>boolean</code> | <code>false</code> | if set to true, this method will delegate attach logic to this.__transitionNewViewIntoSite |
| [options.addBefore] | <code>boolean</code> | <code>false</code> | if true, and options.useTransition is true, the new view's element will be added before the previous view's element. Defaults to after. |
| [options.previousView] | [<code>View</code>](#View) |  | if using options.useTransition, then you can explicitly define the view that should be transitioned out.                                        If using transitions and no previousView is provided, it will look to see if a view already is at this injection site and uses that by default. |

<a name="View+isAttachedToParent"></a>

### view.isAttachedToParent() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - true if the view is attached to a parent  
<a name="View+isAttached"></a>

### view.isAttached() ⇒ <code>boolean</code>
NOTE: depends on a global variable "document"

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - true if the view is attached to the DOM  
<a name="View+detach"></a>

### view.detach()
If attached, will detach the view from the DOM.
This method will only separate this view from the DOM it was attached to, but it WILL invoke the _detach
callback on each tracked view recursively.

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+detachTrackedViews"></a>

### view.detachTrackedViews([options])
Detach all tracked views or a subset of them based on the options parameter.
NOTE: this is not recursive - it will not separate the entire view tree.

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional options. |
| [options.shared] | <code>boolean</code> | <code>false</code> | If true, detach only the shared views. These are views not owned by this parent. As compared to a child view                                           which are disposed when the parent is disposed. |
| [options.child] | <code>boolean</code> | <code>false</code> | If true, detach only child views. These are views that are owned by the parent and dispose of them if the parent is disposed. |

<a name="View+activate"></a>

### view.activate()
Resets listeners and events in order for the view to be reattached to the visible DOM

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+isActive"></a>

### view.isActive() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - true if the view is active  
<a name="View+deactivate"></a>

### view.deactivate()
Maintains view state and DOM but prevents view from becoming a zombie by removing listeners
and events that may affect user experience. Recursively invokes deactivate on child views

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+dispose"></a>

### view.dispose()
Removes all listeners, disposes children views, stops listening to events, removes DOM.
After dispose is called, the view can be safely garbage collected. Called while
recursively removing views from the hierarchy.

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+isDisposed"></a>

### view.isDisposed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - true if the view was disposed  
<a name="View+hasTrackedViews"></a>

### view.hasTrackedViews([options]) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - true if this view has tracked views (limited by the options parameter)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional options. |
| [options.shared] | <code>boolean</code> | <code>false</code> | If true, only check the shared views. These are views not owned by this parent. As compared to a child view                                           which are disposed when the parent is disposed. |
| [options.child] | <code>boolean</code> | <code>false</code> | If true, only check the child views. These are views that are owned by the parent and dispose of them if the parent is disposed. |

<a name="View+getTrackedViews"></a>

### view.getTrackedViews([options]) ⇒ [<code>List.&lt;View&gt;</code>](#View)
Returns all tracked views, both child views and shared views.

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>List.&lt;View&gt;</code>](#View) - all tracked views (filtered by options parameter)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional options. |
| [options.shared] | <code>boolean</code> | <code>false</code> | If true, get only the shared views. These are views not owned by this parent. As compared to a child view                                           which are disposed when the parent is disposed. |
| [options.child] | <code>boolean</code> | <code>false</code> | If true, get only child views. These are views that are owned by the parent and dispose of them if the parent is disposed. |

<a name="View+getTrackedView"></a>

### view.getTrackedView(viewCID) ⇒
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: the view with the given cid.  Will look in both shared and child views.  

| Param | Type | Description |
| --- | --- | --- |
| viewCID | <code>string</code> | the cid of the view |

<a name="View+registerTrackedView"></a>

### view.registerTrackedView(view, [options]) ⇒ [<code>View</code>](#View)
Binds the view as a tracked view - any recursive calls like activate, deactivate, or dispose will
be done to the tracked view as well.  Except dispose for shared views. This method defaults to register the
view as a child view unless specified by options.shared.

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>View</code>](#View) - the tracked view  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| view | [<code>View</code>](#View) |  | the tracked view |
| [options] | <code>Object</code> | <code>{}</code> | Optional options. |
| [options.shared] | <code>boolean</code> | <code>false</code> | If true, registers view as a shared view. These are views not owned by this parent. As compared to a child view                                           which are disposed when the parent is disposed. If false, registers view as a child view which are disposed when the parent is disposed. |

<a name="View+unregisterTrackedView"></a>

### view.unregisterTrackedView(view) ⇒ [<code>View</code>](#View)
Unbinds the tracked view - no recursive calls will be made to this shared view

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>View</code>](#View) - the tracked view  

| Param | Type | Description |
| --- | --- | --- |
| view | [<code>View</code>](#View) | the shared view |

<a name="View+unregisterTrackedViews"></a>

### view.unregisterTrackedViews([options]) ⇒ [<code>View</code>](#View)
Unbinds all tracked view - no recursive calls will be made to this shared view
You can limit the types of views that will be unregistered by using the options parameter.

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>View</code>](#View) - the tracked view  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional options. |
| [options.shared] | <code>boolean</code> | <code>false</code> | If true, unregister only the shared views. These are views not owned by this parent. As compared to a child view                                           which are disposed when the parent is disposed. |
| [options.child] | <code>boolean</code> | <code>false</code> | If true, unregister only child views. These are views that are owned by the parent and dispose of them if the parent is disposed. |

<a name="View+transitionOut"></a>

### view.transitionOut(done, options)
Override to provide your own transition out logic. Default logic is to just detach from the page.
The method is passed a callback that should be invoked when the transition out has fully completed.

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Description |
| --- | --- | --- |
| done | <code>function</code> | callback that MUST be invoked when the transition is complete. |
| options |  | optionals options object |
| options.currentView | [<code>View</code>](#View) | the view that is being transitioned in. |
| options.previousView | [<code>View</code>](#View) | the view that is being transitioned out. Typically this view. |
| options.parentView | [<code>View</code>](#View) | the view that is invoking the transition. |

<a name="View+transitionIn"></a>

### view.transitionIn(attach, done, options)
Override to provide your own transition in logic. Default logic is to just attach to the page.
The method is passed a callback that should be invoked when the transition in has fully completed.

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Description |
| --- | --- | --- |
| attach | <code>function</code> | callback to be invoked when you want this view to be attached to the dom.                                 If you are trying to transition in a tracked view, consider using this.transitionInView() |
| done | <code>function</code> | callback that MUST be invoked when the transition is complete. |
| options |  | optionals options object |
| options.currentView | [<code>View</code>](#View) | the view that is being transitioned in. |
| options.previousView | [<code>View</code>](#View) | the view that is being transitioned out. Typically this view. |
| options.parentView | [<code>View</code>](#View) | the view that is invoking the transition. |

<a name="View+invokeFeedback"></a>

### view.invokeFeedback(to, [evt], [indexMap])
Invokes a feedback entry's "then" method

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | the "to" field corresponding to the feedback entry to be invoked. |
| [evt] | <code>Event</code> | the event to be passed to the "then" method |
| [indexMap] | <code>Object</code> | a map from index variable name to index value. Needed for "to" fields with array notation. |

<a name="Model"></a>

## Model ⇐ [<code>Backbone-Model</code>](#external_Backbone-Model)
**Kind**: global class  
**Extends**: [<code>Backbone-Model</code>](#external_Backbone-Model)  
**Mixes**: <code>pollingMixin</code>, <code>modelMixin</code>  
**See**: <a href="../annotated/modules/Model.html">Model Annotated Source</a>  
**Author**: kent.willis@vecna.com  
<a name="new_Model_new"></a>

### new Model(attributes, [options])
Generic Model


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes | <code>Object</code> |  | the initial attributes to use for this model. |
| [options] | <code>Object</code> | <code>{}</code> | the options for setting up this model. |
| [options.register] | <code>boolean</code> | <code>false</code> | whether to register this model in the app-level registry.                                             By default this will NOT add it to the registry unless set to true because                                             we have not mechanism that will make sure the models get removed from the registry                                             at the appropriate times. |

<a name="Collection"></a>

## Collection ⇐ [<code>Backbone-Collection</code>](#external_Backbone-Collection)
**Kind**: global class  
**Extends**: [<code>Backbone-Collection</code>](#external_Backbone-Collection)  
**Mixes**: <code>pollingMixin</code>, <code>loadingMixin</code>, [<code>cacheMixin</code>](#cacheMixin)  
**See**: <a href="../annotated/modules/Collection.html">Collection Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [Collection](#Collection) ⇐ [<code>Backbone-Collection</code>](#external_Backbone-Collection)
    * [new Collection()](#new_Collection_new)
    * [.filterDefault()](#Collection+filterDefault) ⇒ [<code>Collection</code>](#Collection)
    * [.dispose()](#Collection+dispose)
    * [.getRequesterIds(the)](#Collection+getRequesterIds) ⇒ <code>Array</code>
    * [.getRequesterIdsAsDictionary(guid)](#Collection+getRequesterIdsAsDictionary) ⇒ <code>Object</code>
    * [.removeRequester(guid)](#Collection+removeRequester)
    * [.getRequesters()](#Collection+getRequesters) ⇒ <code>Array</code>
    * [.getAllRequestedIds()](#Collection+getAllRequestedIds) ⇒ <code>Array</code>
    * [.createPrivateCollection(guid)](#Collection+createPrivateCollection) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
    * [.registerIds(newIds, guid)](#Collection+registerIds)
    * [.fetch(options)](#Collection+fetch)
    * [.fetchByIds([options])](#Collection+fetchByIds) ⇒ <code>Promise</code>
    * [.constructor([options])](#Collection+constructor)

<a name="new_Collection_new"></a>

### new Collection()
Generic Collection

<a name="Collection+filterDefault"></a>

### collection.filterDefault() ⇒ [<code>Collection</code>](#Collection)
The default filter.  Always returns itself.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: [<code>Collection</code>](#Collection) - a new instance of this collection  
<a name="Collection+dispose"></a>

### collection.dispose()
Will abolish all listeners and events that are hooked
to this collection.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
<a name="Collection+getRequesterIds"></a>

### collection.getRequesterIds(the) ⇒ <code>Array</code>
**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getRequesterIds</code>](#cacheMixin.getRequesterIds)  
**Returns**: <code>Array</code> - an array of the ids the requester with the guid has requested  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>string</code> | global unique id of the requester |

<a name="Collection+getRequesterIdsAsDictionary"></a>

### collection.getRequesterIdsAsDictionary(guid) ⇒ <code>Object</code>
This method is used for quick look up of a certain id within the list of requested ids

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getRequesterIdsAsDictionary</code>](#cacheMixin.getRequesterIdsAsDictionary)  
**Returns**: <code>Object</code> - an dictionary of id -> id of the requester ids for a given requester.  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | the global unique id of the requester |

<a name="Collection+removeRequester"></a>

### collection.removeRequester(guid)
Removes a requester from this cache. No longer receives updates

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>removeRequester</code>](#cacheMixin.removeRequester)  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | the global unique id of the requester |

<a name="Collection+getRequesters"></a>

### collection.getRequesters() ⇒ <code>Array</code>
NOTE: this methods returns only the guids for requester collections that are currently tracking ids
TODO: should this return just the knownPrivateCollections

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getRequesters</code>](#cacheMixin.getRequesters)  
**Returns**: <code>Array</code> - an array of the all requesters in the form of their GUID's  
<a name="Collection+getAllRequestedIds"></a>

### collection.getAllRequestedIds() ⇒ <code>Array</code>
Return the list of Ids requested by this collection

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getAllRequestedIds</code>](#cacheMixin.getAllRequestedIds)  
**Returns**: <code>Array</code> - the corresponding requested Ids  
<a name="Collection+createPrivateCollection"></a>

### collection.createPrivateCollection(guid) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
Used to return a collection of desired models given the requester object.
Binds a custom "resized" event to the private collections.
Overrides the fetch method to call the parent collection's fetchByIds method.
Overrides the registerIds method to redirect to its parent collection.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>createPrivateCollection</code>](#cacheMixin.createPrivateCollection)  
**Returns**: [<code>PrivateCollection</code>](#PrivateCollection) - an new empty collection of the same type as "this"  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | Identifier for the requesting view |

<a name="Collection+registerIds"></a>

### collection.registerIds(newIds, guid)
Registers a list of Ids that a particular object cares about and pushes
any cached models its way.

This method intelligently updates the "_requestedIds" field to contain all unique
requests for Ids to be fetched.  Furthermore, the "polledFetch" method
is overriden such that it no longer routes through Backbone's fetch all,
but rather a custom "fetchByIds" method.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>registerIds</code>](#cacheMixin.registerIds)  

| Param | Type | Description |
| --- | --- | --- |
| newIds | <code>Array</code> | New ids to register under the requester |
| guid | <code>string</code> | The GUID of the object that wants the ids |

<a name="Collection+fetch"></a>

### collection.fetch(options)
Overrides the base fetch call if this.fetchUsingTrackedIds is true
Calling fetch from the cache will fetch the tracked ids if fetchUsingTrackedIds is set to true, otherwise
it will pass through to the default fetch.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>fetch</code>](#cacheMixin.fetch)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Collection+fetchByIds"></a>

### collection.fetchByIds([options]) ⇒ <code>Promise</code>
A custom fetch operation to only fetch the requested Ids.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>fetchByIds</code>](#cacheMixin.fetchByIds)  
**Returns**: <code>Promise</code> - the promise of the fetch  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] |  |  | argument options |
| [options.idsToFetch] | <code>Array</code> | <code>collection.collectionTrackedIds</code> | A list of request Ids, will default to current tracked ids |
| [options.setOptions] | <code>Object</code> |  | if a set is made, then the setOptions will be passed into the set method |

<a name="Collection+constructor"></a>

### collection.constructor([options])
The constructor constructor / initialize method for collections.
Allocate new memory for the local references if they
were null when this method was called.

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>constructor</code>](#cacheMixin.constructor)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | optional options object |
| [options.fetchHttpAction] | <code>string</code> | <code>&quot;&#x27;POST&#x27;&quot;</code> | http action used to get objects by ids |
| [options.getByIdsUrl] | <code>string</code> | <code>&quot;&#x27;/ids&#x27;&quot;</code> | path appended to collection.url to get objects by a list of ids |
| [options.fetchUsingTrackedIds] | <code>boolean</code> | <code>true</code> | if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids                                                       but will rather call the default fetch method. |

<a name="DataBehavior"></a>

## DataBehavior ⇐ [<code>Behavior</code>](#Behavior)
**Kind**: global class  
**Extends**: [<code>Behavior</code>](#Behavior)  
**See**

- <a href="../annotated/modules/Collection.html">Collection Annotated Source</a>
- <a href="../modules/behaviors/DATA_BEHAVIOR.html">Detailed docs</a> for more in-depth documentation and details.

**Author**: jyoung@vecna.com  

* [DataBehavior](#DataBehavior) ⇐ [<code>Behavior</code>](#Behavior)
    * [new DataBehavior()](#new_DataBehavior_new)
    * [.alias](#Behavior+alias) : <code>string</code>
    * [.cidPrefix](#Behavior+cidPrefix) : <code>string</code>
    * [.mixin](#Behavior+mixin) : <code>Object</code>
    * [.prepare()](#Behavior+prepare) ⇒ <code>Object</code>
    * [._dispose()](#Behavior+_dispose)
    * [.isDisposed()](#Behavior+isDisposed) ⇒ <code>boolean</code>

<a name="new_DataBehavior_new"></a>

### new DataBehavior()
This behavior implements simplified interaction with data sources (i.e. TorsoCollection).
This behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.
This behavior also manages dependencies between data and other objects to allow intelligent re-fetching when data changes.

<a name="Behavior+alias"></a>

### dataBehavior.alias : <code>string</code>
Unique name of the behavior instance w/in a view.  More human readable than the cid.

**Kind**: instance property of [<code>DataBehavior</code>](#DataBehavior)  
<a name="Behavior+cidPrefix"></a>

### dataBehavior.cidPrefix : <code>string</code>
cidPrefix of Behaviors

**Kind**: instance property of [<code>DataBehavior</code>](#DataBehavior)  
<a name="Behavior+mixin"></a>

### dataBehavior.mixin : <code>Object</code>
Add functions to be added to the view's public API. They will be behavior-scoped.

**Kind**: instance property of [<code>DataBehavior</code>](#DataBehavior)  
<a name="Behavior+prepare"></a>

### dataBehavior.prepare() ⇒ <code>Object</code>
The behavior's prepare result will be combined with the view's prepare with the behavior's alias as the namespace.
effectively: { [behaviorName]: behavior.prepare() } will be combined with the view's prepare result.

**Kind**: instance method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>Object</code> - a prepare context suitable to being added to the view's prepare result.  
<a name="Behavior+_dispose"></a>

### dataBehavior.\_dispose()
Method to be invoked when dispose is called. By default calling dispose will remove the
behavior's on's and listenTo's.
Override this method to destruct any extra

**Kind**: instance method of [<code>DataBehavior</code>](#DataBehavior)  
<a name="Behavior+isDisposed"></a>

### dataBehavior.isDisposed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>boolean</code> - true if the view was disposed  
<a name="Behavior"></a>

## Behavior
**Kind**: global class  
**See**: <a href="../annotated/modules/Behavior.html">Behavior Annotated Source</a>  
**Author**: deena.wang@vecna.com  

* [Behavior](#Behavior)
    * [new Behavior(behaviorAttributes, behaviorOptions, [viewOptions])](#new_Behavior_new)
    * [.alias](#Behavior+alias) : <code>string</code>
    * [.cidPrefix](#Behavior+cidPrefix) : <code>string</code>
    * [.mixin](#Behavior+mixin) : <code>Object</code>
    * [.prepare()](#Behavior+prepare) ⇒ <code>Object</code>
    * [._dispose()](#Behavior+_dispose)
    * [.isDisposed()](#Behavior+isDisposed) ⇒ <code>boolean</code>

<a name="new_Behavior_new"></a>

### new Behavior(behaviorAttributes, behaviorOptions, [viewOptions])
Allows abstraction of common view logic into separate object


| Param | Type | Description |
| --- | --- | --- |
| behaviorAttributes | <code>Object</code> | the initial value of the behavior's attributes. |
| behaviorOptions | <code>Object</code> |  |
| behaviorOptions.view | [<code>Backbone-View</code>](#external_Backbone-View) | that Behavior is attached to |
| behaviorOptions.alias | <code>string</code> | the alias for the behavior in this view. |
| [viewOptions] | <code>Object</code> | options passed to View's initialize |

<a name="Behavior+alias"></a>

### behavior.alias : <code>string</code>
Unique name of the behavior instance w/in a view.  More human readable than the cid.

**Kind**: instance property of [<code>Behavior</code>](#Behavior)  
<a name="Behavior+cidPrefix"></a>

### behavior.cidPrefix : <code>string</code>
cidPrefix of Behaviors

**Kind**: instance property of [<code>Behavior</code>](#Behavior)  
<a name="Behavior+mixin"></a>

### behavior.mixin : <code>Object</code>
Add functions to be added to the view's public API. They will be behavior-scoped.

**Kind**: instance property of [<code>Behavior</code>](#Behavior)  
<a name="Behavior+prepare"></a>

### behavior.prepare() ⇒ <code>Object</code>
The behavior's prepare result will be combined with the view's prepare with the behavior's alias as the namespace.
effectively: { [behaviorName]: behavior.prepare() } will be combined with the view's prepare result.

**Kind**: instance method of [<code>Behavior</code>](#Behavior)  
**Returns**: <code>Object</code> - a prepare context suitable to being added to the view's prepare result.  
<a name="Behavior+_dispose"></a>

### behavior.\_dispose()
Method to be invoked when dispose is called. By default calling dispose will remove the
behavior's on's and listenTo's.
Override this method to destruct any extra

**Kind**: instance method of [<code>Behavior</code>](#Behavior)  
<a name="Behavior+isDisposed"></a>

### behavior.isDisposed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Behavior</code>](#Behavior)  
**Returns**: <code>boolean</code> - true if the view was disposed  
<a name="Cell"></a>

## Cell ⇐ [<code>Backbone-Model</code>](#external_Backbone-Model)
**Kind**: global class  
**Extends**: [<code>Backbone-Model</code>](#external_Backbone-Model)  
**Mixes**: [<code>cellMixin</code>](#cellMixin)  
**See**: <a href="../annotated/modules/Cell.html">Cell Annotated Source</a>  
**Author**: ariel.wexler@vecna.com, kent.willis@vecna.com  

* [Cell](#Cell) ⇐ [<code>Backbone-Model</code>](#external_Backbone-Model)
    * [new Cell(attributes, [options])](#new_Cell_new)
    * [.isModelCompatible](#Cell+isModelCompatible)
    * [.save()](#Cell+save)
    * [.fetch()](#Cell+fetch)
    * [.sync()](#Cell+sync)
    * [.url()](#Cell+url)

<a name="new_Cell_new"></a>

### new Cell(attributes, [options])
An non-persistable object that can listen to and emit events like a models.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes | <code>Object</code> |  | the initial attributes to use for this cell. |
| [options] | <code>Object</code> | <code>{}</code> | the options for setting up this cell. |
| [options.register] | <code>boolean</code> | <code>false</code> | whether to register this cell in the app-level registry.                                             By default this will NOT add it to the registry unless set to true because                                             we have not mechanism that will make sure the cells get removed from the registry                                             at the appropriate times. |

<a name="Cell+isModelCompatible"></a>

### cell.isModelCompatible
Whether a cell can pass as a model or not.
If true, the cell will not fail is persisted functions are invoked
If false, the cell will throw exceptions if persisted function are invoked

**Kind**: instance property of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>isModelCompatible</code>](#cellMixin.isModelCompatible)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| isModelCompatible | <code>boolean</code> | 

<a name="Cell+save"></a>

### cell.save()
Override and disable the save function

**Kind**: instance method of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>save</code>](#cellMixin.save)  
<a name="Cell+fetch"></a>

### cell.fetch()
Override and disable the fetch function

**Kind**: instance method of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>fetch</code>](#cellMixin.fetch)  
<a name="Cell+sync"></a>

### cell.sync()
Override and disable the sync function

**Kind**: instance method of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>sync</code>](#cellMixin.sync)  
<a name="Cell+url"></a>

### cell.url()
Override and disable the url

**Kind**: instance method of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>url</code>](#cellMixin.url)  
<a name="PrivateCollection"></a>

## PrivateCollection ⇐ [<code>Collection</code>](#Collection)
**Kind**: global class  
**Extends**: [<code>Collection</code>](#Collection)  

* [PrivateCollection](#PrivateCollection) ⇐ [<code>Collection</code>](#Collection)
    * [new PrivateCollection(parent, guid)](#new_PrivateCollection_new)
    * [.getTrackedIds()](#PrivateCollection+getTrackedIds) ⇒ <code>Array</code>
    * [.fetch([options])](#PrivateCollection+fetch) ⇒ <code>Promise</code>
    * [.fetchByIds(ids, [options])](#PrivateCollection+fetchByIds) ⇒ <code>Promise</code>
    * [.trackIds(ids)](#PrivateCollection+trackIds)
    * [.addModelAndTrack(model)](#PrivateCollection+addModelAndTrack)
    * [.trackNewId(id)](#PrivateCollection+trackNewId)
    * [.trackAndFetch()](#PrivateCollection+trackAndFetch) ⇒
    * [.pull([options])](#PrivateCollection+pull) ⇒ <code>Promise</code>
    * [.trackAndPull()](#PrivateCollection+trackAndPull) ⇒
    * [.requesterDispose()](#PrivateCollection+requesterDispose)
    * [.remove(modelIdentifier)](#PrivateCollection+remove)
    * [.filterDefault()](#Collection+filterDefault) ⇒ [<code>Collection</code>](#Collection)
    * [.dispose()](#Collection+dispose)
    * [.getRequesterIds(the)](#Collection+getRequesterIds) ⇒ <code>Array</code>
    * [.getRequesterIdsAsDictionary(guid)](#Collection+getRequesterIdsAsDictionary) ⇒ <code>Object</code>
    * [.removeRequester(guid)](#Collection+removeRequester)
    * [.getRequesters()](#Collection+getRequesters) ⇒ <code>Array</code>
    * [.getAllRequestedIds()](#Collection+getAllRequestedIds) ⇒ <code>Array</code>
    * [.createPrivateCollection(guid)](#Collection+createPrivateCollection) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
    * [.registerIds(newIds, guid)](#Collection+registerIds)
    * [.constructor([options])](#Collection+constructor)

<a name="new_PrivateCollection_new"></a>

### new PrivateCollection(parent, guid)
Returns a new class of collection that inherits from the parent but not the cacheMixin
and adds a requesterMixin that connects this cache to it's parent


| Param | Type | Description |
| --- | --- | --- |
| parent | [<code>Backbone-Collection</code>](#external_Backbone-Collection) | the parent of the private collection |
| guid | <code>string</code> | the unique code of the owner of this private collection |

<a name="PrivateCollection+getTrackedIds"></a>

### privateCollection.getTrackedIds() ⇒ <code>Array</code>
**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: <code>Array</code> - array of ids that this collection is tracking  
<a name="PrivateCollection+fetch"></a>

### privateCollection.fetch([options]) ⇒ <code>Promise</code>
Will force the cache to fetch just the registered ids of this collection

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Overrides**: [<code>fetch</code>](#Collection+fetch)  
**Returns**: <code>Promise</code> - promise that will resolve when the fetch is complete  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] |  |  | argument options |
| [options.idsToFetch] | <code>Array</code> | <code>collectionTrackedIds</code> | A list of request Ids, will default to current tracked ids |
| [options.setOptions] | <code>Object</code> |  | if a set is made, then the setOptions will be passed into the set method |

<a name="PrivateCollection+fetchByIds"></a>

### privateCollection.fetchByIds(ids, [options]) ⇒ <code>Promise</code>
Will force the cache to fetch a subset of this collection's tracked ids

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Overrides**: [<code>fetchByIds</code>](#Collection+fetchByIds)  
**Returns**: <code>Promise</code> - promise that will resolve when the fetch is complete  

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>Array</code> | array of model ids |
| [options] | <code>Object</code> | if given, will pass the options argument to this.fetch. Note, will not affect options.idsToFetch |

<a name="PrivateCollection+trackIds"></a>

### privateCollection.trackIds(ids)
Pass a list of ids to begin tracking. This will reset any previous list of ids being tracked.
Overrides the Id registration system to route via the parent collection

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  

| Param | Description |
| --- | --- |
| ids | The list of ids that this collection wants to track |

<a name="PrivateCollection+addModelAndTrack"></a>

### privateCollection.addModelAndTrack(model)
Adds a new model to the requester collection and tracks the model.id

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  

| Param | Type | Description |
| --- | --- | --- |
| model | [<code>Backbone-Model</code>](#external_Backbone-Model) | the model to be added |

<a name="PrivateCollection+trackNewId"></a>

### privateCollection.trackNewId(id)
Tracks a new id

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> \| <code>Number</code> | the id attribute of the model |

<a name="PrivateCollection+trackAndFetch"></a>

### privateCollection.trackAndFetch() ⇒
Will begin tracking the new ids and then ask the cache to fetch them
This will reset any previous list of ids being tracked.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: the promise of the fetch by ids  
<a name="PrivateCollection+pull"></a>

### privateCollection.pull([options]) ⇒ <code>Promise</code>
Will force the cache to fetch any of this collection's tracked models that are not in the cache
while not fetching models that are already in the cache. Useful when you want the effeciency of
pulling models from the cache and don't need all the models to be up-to-date.

If the ids being fetched are already being fetched by the cache, then they will not be re-fetched.

The resulting promise is resolved when ALL items in the process of being fetched have completed.
The promise will resolve to a unified data property that is a combination of the completion of all of the fetches.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: <code>Promise</code> - promise that will resolve when the fetch is complete with all of the data that was fetched from the server.
                  Will only resolve once all ids have attempted to be fetched from the server.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | if given, will pass the options argument to this.fetch. Note, will not affect options.idsToFetch |

<a name="PrivateCollection+trackAndPull"></a>

### privateCollection.trackAndPull() ⇒
Will register the new ids and then pull in any models not stored in the cache. See this.pull() for
the difference between pull and fetch.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: the promise of the fetch by ids  
<a name="PrivateCollection+requesterDispose"></a>

### privateCollection.requesterDispose()
Handles the disposing of this collection as it relates to a requester collection.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
<a name="PrivateCollection+remove"></a>

### privateCollection.remove(modelIdentifier)
In addition to removing the model from the collection also remove it from the list of tracked ids.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  

| Param | Type | Description |
| --- | --- | --- |
| modelIdentifier | <code>\*</code> | same duck-typing as Backbone.Collection.get():                              by id, cid, model object with id or cid properties,                              or an attributes object that is transformed through modelId |

<a name="Collection+filterDefault"></a>

### privateCollection.filterDefault() ⇒ [<code>Collection</code>](#Collection)
The default filter.  Always returns itself.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: [<code>Collection</code>](#Collection) - a new instance of this collection  
<a name="Collection+dispose"></a>

### privateCollection.dispose()
Will abolish all listeners and events that are hooked
to this collection.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
<a name="Collection+getRequesterIds"></a>

### privateCollection.getRequesterIds(the) ⇒ <code>Array</code>
**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getRequesterIds</code>](#cacheMixin.getRequesterIds)  
**Returns**: <code>Array</code> - an array of the ids the requester with the guid has requested  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>string</code> | global unique id of the requester |

<a name="Collection+getRequesterIdsAsDictionary"></a>

### privateCollection.getRequesterIdsAsDictionary(guid) ⇒ <code>Object</code>
This method is used for quick look up of a certain id within the list of requested ids

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getRequesterIdsAsDictionary</code>](#cacheMixin.getRequesterIdsAsDictionary)  
**Returns**: <code>Object</code> - an dictionary of id -> id of the requester ids for a given requester.  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | the global unique id of the requester |

<a name="Collection+removeRequester"></a>

### privateCollection.removeRequester(guid)
Removes a requester from this cache. No longer receives updates

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>removeRequester</code>](#cacheMixin.removeRequester)  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | the global unique id of the requester |

<a name="Collection+getRequesters"></a>

### privateCollection.getRequesters() ⇒ <code>Array</code>
NOTE: this methods returns only the guids for requester collections that are currently tracking ids
TODO: should this return just the knownPrivateCollections

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getRequesters</code>](#cacheMixin.getRequesters)  
**Returns**: <code>Array</code> - an array of the all requesters in the form of their GUID's  
<a name="Collection+getAllRequestedIds"></a>

### privateCollection.getAllRequestedIds() ⇒ <code>Array</code>
Return the list of Ids requested by this collection

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getAllRequestedIds</code>](#cacheMixin.getAllRequestedIds)  
**Returns**: <code>Array</code> - the corresponding requested Ids  
<a name="Collection+createPrivateCollection"></a>

### privateCollection.createPrivateCollection(guid) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
Used to return a collection of desired models given the requester object.
Binds a custom "resized" event to the private collections.
Overrides the fetch method to call the parent collection's fetchByIds method.
Overrides the registerIds method to redirect to its parent collection.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>createPrivateCollection</code>](#cacheMixin.createPrivateCollection)  
**Returns**: [<code>PrivateCollection</code>](#PrivateCollection) - an new empty collection of the same type as "this"  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | Identifier for the requesting view |

<a name="Collection+registerIds"></a>

### privateCollection.registerIds(newIds, guid)
Registers a list of Ids that a particular object cares about and pushes
any cached models its way.

This method intelligently updates the "_requestedIds" field to contain all unique
requests for Ids to be fetched.  Furthermore, the "polledFetch" method
is overriden such that it no longer routes through Backbone's fetch all,
but rather a custom "fetchByIds" method.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>registerIds</code>](#cacheMixin.registerIds)  

| Param | Type | Description |
| --- | --- | --- |
| newIds | <code>Array</code> | New ids to register under the requester |
| guid | <code>string</code> | The GUID of the object that wants the ids |

<a name="Collection+constructor"></a>

### privateCollection.constructor([options])
The constructor constructor / initialize method for collections.
Allocate new memory for the local references if they
were null when this method was called.

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>constructor</code>](#cacheMixin.constructor)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | optional options object |
| [options.fetchHttpAction] | <code>string</code> | <code>&quot;&#x27;POST&#x27;&quot;</code> | http action used to get objects by ids |
| [options.getByIdsUrl] | <code>string</code> | <code>&quot;&#x27;/ids&#x27;&quot;</code> | path appended to collection.url to get objects by a list of ids |
| [options.fetchUsingTrackedIds] | <code>boolean</code> | <code>true</code> | if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids                                                       but will rather call the default fetch method. |

<a name="cellMixin"></a>

## cellMixin
An non-persistable object that can listen to and emit events like a models.

**Kind**: global mixin  
**Author**: kent.willis@vecna.com  

* [cellMixin](#cellMixin)
    * [.isModelCompatible](#cellMixin.isModelCompatible)
    * [.save()](#cellMixin.save)
    * [.fetch()](#cellMixin.fetch)
    * [.sync()](#cellMixin.sync)
    * [.url()](#cellMixin.url)

<a name="cellMixin.isModelCompatible"></a>

### cellMixin.isModelCompatible
Whether a cell can pass as a model or not.
If true, the cell will not fail is persisted functions are invoked
If false, the cell will throw exceptions if persisted function are invoked

**Kind**: static property of [<code>cellMixin</code>](#cellMixin)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| isModelCompatible | <code>boolean</code> | 

<a name="cellMixin.save"></a>

### cellMixin.save()
Override and disable the save function

**Kind**: static method of [<code>cellMixin</code>](#cellMixin)  
<a name="cellMixin.fetch"></a>

### cellMixin.fetch()
Override and disable the fetch function

**Kind**: static method of [<code>cellMixin</code>](#cellMixin)  
<a name="cellMixin.sync"></a>

### cellMixin.sync()
Override and disable the sync function

**Kind**: static method of [<code>cellMixin</code>](#cellMixin)  
<a name="cellMixin.url"></a>

### cellMixin.url()
Override and disable the url

**Kind**: static method of [<code>cellMixin</code>](#cellMixin)  
<a name="cacheMixin"></a>

## cacheMixin
Custom additions to the Backbone Collection object.
- safe disposal methods for memory + event management
- special functional overrides to support ID registration for different views

**Kind**: global mixin  
**Author**: ariel.wexler@vecna.com, kent.willis@vecna.com  

* [cacheMixin](#cacheMixin)
    * [.getRequesterIds(the)](#cacheMixin.getRequesterIds) ⇒ <code>Array</code>
    * [.getRequesterIdsAsDictionary(guid)](#cacheMixin.getRequesterIdsAsDictionary) ⇒ <code>Object</code>
    * [.removeRequester(guid)](#cacheMixin.removeRequester)
    * [.getRequesters()](#cacheMixin.getRequesters) ⇒ <code>Array</code>
    * [.getAllRequestedIds()](#cacheMixin.getAllRequestedIds) ⇒ <code>Array</code>
    * [.createPrivateCollection(guid)](#cacheMixin.createPrivateCollection) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
    * [.registerIds(newIds, guid)](#cacheMixin.registerIds)
    * [.fetch(options)](#cacheMixin.fetch)
    * [.fetchByIds([options])](#cacheMixin.fetchByIds) ⇒ <code>Promise</code>
    * [.constructor([options])](#cacheMixin.constructor)

<a name="cacheMixin.getRequesterIds"></a>

### cacheMixin.getRequesterIds(the) ⇒ <code>Array</code>
**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Array</code> - an array of the ids the requester with the guid has requested  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>string</code> | global unique id of the requester |

<a name="cacheMixin.getRequesterIdsAsDictionary"></a>

### cacheMixin.getRequesterIdsAsDictionary(guid) ⇒ <code>Object</code>
This method is used for quick look up of a certain id within the list of requested ids

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Object</code> - an dictionary of id -> id of the requester ids for a given requester.  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | the global unique id of the requester |

<a name="cacheMixin.removeRequester"></a>

### cacheMixin.removeRequester(guid)
Removes a requester from this cache. No longer receives updates

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | the global unique id of the requester |

<a name="cacheMixin.getRequesters"></a>

### cacheMixin.getRequesters() ⇒ <code>Array</code>
NOTE: this methods returns only the guids for requester collections that are currently tracking ids
TODO: should this return just the knownPrivateCollections

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Array</code> - an array of the all requesters in the form of their GUID's  
<a name="cacheMixin.getAllRequestedIds"></a>

### cacheMixin.getAllRequestedIds() ⇒ <code>Array</code>
Return the list of Ids requested by this collection

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Array</code> - the corresponding requested Ids  
<a name="cacheMixin.createPrivateCollection"></a>

### cacheMixin.createPrivateCollection(guid) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
Used to return a collection of desired models given the requester object.
Binds a custom "resized" event to the private collections.
Overrides the fetch method to call the parent collection's fetchByIds method.
Overrides the registerIds method to redirect to its parent collection.

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: [<code>PrivateCollection</code>](#PrivateCollection) - an new empty collection of the same type as "this"  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | Identifier for the requesting view |

<a name="cacheMixin.registerIds"></a>

### cacheMixin.registerIds(newIds, guid)
Registers a list of Ids that a particular object cares about and pushes
any cached models its way.

This method intelligently updates the "_requestedIds" field to contain all unique
requests for Ids to be fetched.  Furthermore, the "polledFetch" method
is overriden such that it no longer routes through Backbone's fetch all,
but rather a custom "fetchByIds" method.

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  

| Param | Type | Description |
| --- | --- | --- |
| newIds | <code>Array</code> | New ids to register under the requester |
| guid | <code>string</code> | The GUID of the object that wants the ids |

<a name="cacheMixin.fetch"></a>

### cacheMixin.fetch(options)
Overrides the base fetch call if this.fetchUsingTrackedIds is true
Calling fetch from the cache will fetch the tracked ids if fetchUsingTrackedIds is set to true, otherwise
it will pass through to the default fetch.

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="cacheMixin.fetchByIds"></a>

### cacheMixin.fetchByIds([options]) ⇒ <code>Promise</code>
A custom fetch operation to only fetch the requested Ids.

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Promise</code> - the promise of the fetch  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] |  |  | argument options |
| [options.idsToFetch] | <code>Array</code> | <code>collection.collectionTrackedIds</code> | A list of request Ids, will default to current tracked ids |
| [options.setOptions] | <code>Object</code> |  | if a set is made, then the setOptions will be passed into the set method |

<a name="cacheMixin.constructor"></a>

### cacheMixin.constructor([options])
The constructor constructor / initialize method for collections.
Allocate new memory for the local references if they
were null when this method was called.

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | optional options object |
| [options.fetchHttpAction] | <code>string</code> | <code>&quot;&#x27;POST&#x27;&quot;</code> | http action used to get objects by ids |
| [options.getByIdsUrl] | <code>string</code> | <code>&quot;&#x27;/ids&#x27;&quot;</code> | path appended to collection.url to get objects by a list of ids |
| [options.fetchUsingTrackedIds] | <code>boolean</code> | <code>true</code> | if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids                                                       but will rather call the default fetch method. |

<a name="cache"></a>

## cache
The torso collection that is acting as a cache used to create the private collections.
This property/option is required.  Instantiation will fail if it is not set.

**Kind**: global variable  
**Properties**

| Name | Type |
| --- | --- |
| cache | [<code>Collection</code>](#Collection) | 

<a name="renderOnFetch"></a>

## renderOnFetch
Adds a listener on the Behavior for the `fetched` event that triggers a render on the view.
true - A listener is added to the behavior that re-renders the view when a 'fetched' event is triggered.
false (default) - no listeners are added.

**Kind**: global variable  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| renderOnFetch | <code>boolean</code> | 

<a name="skipInitialLoad"></a>

## skipInitialLoad
Skip triggering a load of this data behavior when the view completes initializing.
true - no load after the view is initialized.
false (default) - trigger a .retrieve() on this data behavior when the view completes initialization.

**Kind**: global variable  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| skipInitialLoad | <code>boolean</code> | 

<a name="returnSingleResult"></a>

## returnSingleResult
Determines the result of `view.getBehavior('thisBehaviorAlias').toJSON()`.
true - a single model result is returned.
false (default) - an array of model results are returned.

**Kind**: global variable  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| returnSingleResult | <code>boolean</code> | 

<a name="alwaysFetch"></a>

## alwaysFetch
Determines whether `pull()` or `fetch()` is called when using `retrieve()`.
true - Use fetch() by default on the private collection.
false (default) - Use pull() by default on the private collection.
True will query the server more often, but will provide more up-to-date data.
False will only query the server if the model hasn't already been retrieved.
This property will be ignored if `fetch()` or `pull()` is called directly.

**Kind**: global variable  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| alwaysFetch | <code>boolean</code> | 

<a name="ids"></a>

## ids
Duck-typed property that identifies the ids to use. id or ids is required (either by behavior options or as properties).
  - {string|number} - the id to use directly (equivalent to an array of a single id).
  - {string[]|number[]} - the ids to use directly.
  - {Object} - more complex configuration that identifies a model-like object that fires a change event and the
               property on that object to use. The object can fire the change event for the given property
               and have a .get('propertyName') method, or it can define the property directly on the idContainer.
               Only one property can be identified as supplying the id for this data model.
               If the identified object does not fire a change event then the id(s) will never be refreshed for this behavior.
               The idContainer can also fire a 'fetched:ids' event on itself to signal to this data behavior that the ids
               have been fetched for the first time.  Then a 'change:<propertyName>' event can be used to notify this
               data behavior that the property has been modified.
    - property {string} - the name of the property that defines the ids. The root object is assumed to be the view unless
                          idContainer is defined. The idContainer is the object that fires a change event for the given property name.
                          Uses the view or the idContainer as the root to get the identified property (i.e. 'viewState.', 'model.', etc).
                          Will get the property before the first '.' from the view and if it is an object will try to use a
                          .get('<propertyName>') on it and set a 'change:<propertyName>' listener on it.
                          If it is a string/number or array of string/number, then it will use that as the ids.
                          Triggering a 'id-container-updated' event on the behavior will cause it to stop listing to the
                          old idContainer and start listening to the new one defined by this property.
    - idContainer {Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change
                          events and has a .get('propertyName') function. It isn't required to fire events -
                          the change event is only required if it needs to re-fetch when the id property value changes.
    Examples:
      - { property: '_patientId' }
      - { property: 'viewState.appointmentId' }
      - { property: 'model.type' }
      - { property: 'behaviors.demographics.data.appointments' }
      - { property: 'id', idContainer: userService }
      - { property: 'username', idContainer: function() { application.getCurrentUser() } }
  - {Function(cache)} - expected to return the ids (either array, jquery deferred that resolves to the ids or single primitive)
                        to track with the private collection. Cache is passed in as the first argument so that the behavior
                        can be defined and the cache can be overridden later.
                        'this' is the behavior (from which you can get the view if needed).
                        What was criteria should use this instead:

        function(cache) {
          var thisBehaviorInstance = this;
          var view = this.view;
          var criteria = { ... some criteria ... };
          return cache.fetchIdsByCriteria(criteria);
        }

**Kind**: global variable  
**Properties**

| Name | Type |
| --- | --- |
| ids | <code>string</code> \| <code>number</code> \| <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code> \| <code>function</code> | 

<a name="updateEvents"></a>

## updateEvents
cause this behavior to re-calculate its ids and refetch them from the server if the given events are triggered
(space separated if string, single item is equivalent to array of single item).
  - 'view:eventName' - arbitrary event triggered on the view (eventName can be a change:propertyName event).
  - 'viewState:eventName' - arbitrary event triggered on the viewState (eventName can be a change:propertyName event).
  - 'model:eventName' - arbitrary even triggered on the view's model (eventName can be a change:propertyName event).
  - 'this:eventName' - arbitrary event triggered by this behavior (eventName can be a change:propertyName event).
  - 'behaviorAlias:eventName' - arbitrary event triggered by another data behavior on this view (eventName can be a change:propertyName event).
  - 'behaviorAlias.data:eventName' - arbitrary event triggered by the data of another DataBehavior on this view (eventName can be a change:propertyName event).
  - { '<eventName>': < object (or function returning an object) that the event is triggered on > } - arbitrary ('<eventName>') triggered on the supplied object.

**Kind**: global variable  
**Properties**

| Name | Type |
| --- | --- |
| updateEvents | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>Object</code> \| <code>Array.&lt;Object&gt;</code> | 

<a name="data"></a>

## data
Object that manages interaction with the data.  Contains the privateCollection, proxies all events from the privateCollection,
and has get('...') and .toJSON() methods that access the private collection data.

**Kind**: global variable  
**Properties**

| Name | Type |
| --- | --- |
| data | <code>Torso.behaviors.DataBehavior.Data</code> | 

<a name="FETCHED_STATUSES"></a>

## FETCHED\_STATUSES
The possible fetched statuses.  This is the status value of the fetched event payload.

**Kind**: global variable  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| { | <code>Object</code> | SUCCESS: 'SUCCESS', FAILURE: 'FAILURE' } FETCHED_STATUSES |

<a name="parentBehavior"></a>

## parentBehavior
The dataBehavior instance that owns this data object.

**Kind**: global variable  
**Properties**

| Name | Type |
| --- | --- |
| parentBehavior | [<code>DataBehavior</code>](#DataBehavior) | 

<a name="privateCollection"></a>

## privateCollection
The private collection that this data object manages.

**Kind**: global variable  
**Properties**

| Name | Type |
| --- | --- |
| privateCollection | [<code>Collection</code>](#Collection) | 

<a name="torso"></a>

## torso
Module containing all dependencies that exports a single object with everything attached (same format as the global).

**Kind**: global constant  
**Author**: jyoung@vecna.com  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Behavior | [<code>Behavior</code>](#Behavior) | The [Behavior](#Behavior) prototype. |
| behaviors | <code>Object</code> | Collection of behaviors that ship with Torso. |
| behaviors.DataBehavior | [<code>DataBehavior</code>](#DataBehavior) | The [DataBehavior](#DataBehavior) prototype. |
| Cell | [<code>Cell</code>](#Cell) | The [Cell](#Cell) prototype. |
| Collection | [<code>Collection</code>](#Collection) | The [Collection](#Collection) prototype. |
| Events | <code>Events</code> | The [Events](Events) prototype. |
| Mixins | <code>Object</code> | Collection of mixins that are used by Torso. |
| Mixins.loading | <code>loadingMixin</code> | The [loadingMixin](loadingMixin). |
| Mixins.cache | [<code>cacheMixin</code>](#cacheMixin) | The [cacheMixin](#cacheMixin). |
| Mixins.polling | <code>pollingMixin</code> | The [pollingMixin](pollingMixin). |
| Mixins.validation | <code>validation.mixin</code> | The [validation.mixin](validation.mixin). |
| Mixins.cell | [<code>cellMixin</code>](#cellMixin) | The [cellMixin](#cellMixin). |
| Model | [<code>Model</code>](#Model) | The [Model](#Model) prototype. |
| NestedCell | <code>NestedCell</code> | The [NestedCell](NestedCell) prototype. |
| NestedModel | <code>NestedModel</code> | The [NestedModel](NestedModel) prototype. |
| FormModel | <code>FormModel</code> | The [FormModel](FormModel) prototype. |
| ServiceCell | <code>ServiceCell</code> | The [ServiceCell](ServiceCell) prototype. |
| Router | <code>Router</code> | The [Router](Router) prototype. |
| history | <code>history</code> | Convient access to backbone history. |
| registry | <code>registry</code> | The torso object registry. |
| Utils | <code>Utils</code> | Collection of utilities used by Torso. |
| Utils.loading | <code>templateRenderer</code> | Template renderer used by Torso. |
| Utils.loading | <code>handlebarsUtils</code> | Handlebars utilities used by Torso. |
| validation | <code>validation</code> | The [validation](validation) prototype. |
| View | [<code>View</code>](#View) | The [View](#View) prototype. |
| ListView | <code>ListView</code> | The [ListView](ListView) prototype. |
| FormView | <code>FormView</code> | The [FormView](FormView) prototype. |

<a name="constructor"></a>

## constructor([behaviorState], behaviorOptions, [viewOptions])
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [behaviorState] | <code>Object</code> |  | the initial state of the behavior. |
| behaviorOptions | <code>Object</code> |  |  |
| behaviorOptions.cache | [<code>Collection</code>](#Collection) |  | see cache property. |
| [behaviorOptions.renderOnFetch] | <code>boolean</code> | <code>false</code> | see renderOnFetch property. |
| [behaviorOptions.skipInitialLoad] | <code>boolean</code> | <code>false</code> | see skipInitialLoad property. |
| [behaviorOptions.returnSingleResult] | <code>boolean</code> | <code>false</code> | see returnSingleResult property. |
| [behaviorOptions.alwaysFetch] | <code>boolean</code> | <code>false</code> | see alwaysFetch property. |
| [behaviorOptions.id] | <code>string</code> \| <code>number</code> \| <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code> \| <code>function</code> | <code>&quot;behaviorOptions.ids&quot;</code> | see id property. |
| [behaviorOptions.ids] | <code>string</code> \| <code>number</code> \| <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code> \| <code>function</code> | <code>&quot;behaviorOptions.id&quot;</code> | see ids property. |
| [behaviorOptions.updateEvents] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>Object</code> \| <code>Array.&lt;Object&gt;</code> |  | see updateEvents property. |
| [viewOptions] | <code>Object</code> |  | options passed to View's initialize |

<a name="retrieve"></a>

## retrieve() ⇒ <code>$.Deferred.Promise</code>
Retrieves the ids for this data object and passes them off to the private collection to track and then does a
pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).

**Kind**: global function  
**Returns**: <code>$.Deferred.Promise</code> - a jquery deferred promise that resolves to the retrieved models.  
<a name="pull"></a>

## pull() ⇒ <code>$.Deferred.Promise</code>
Retrieves the ids for this data object and passes them off to the private collection's trackAndPull() method.

**Kind**: global function  
**Returns**: <code>$.Deferred.Promise</code> - a jquery deferred promise that resolves to the retrieved models.  
<a name="fetch"></a>

## fetch() ⇒ <code>$.Deferred.Promise</code>
Retrieves the ids for this data object and passes them off to the private collection's trackAndFetch() method.

**Kind**: global function  
**Returns**: <code>$.Deferred.Promise</code> - a jquery deferred promise that resolves to the retrieved models.  
<a name="prepare"></a>

## prepare()
Adds the toJSON of the data represented by this behavior to the context.

**Kind**: global function  
<a name="isLoading"></a>

## isLoading() ⇒ <code>boolean</code>
Determine if the behavior is loading objects or ids.

**Kind**: global function  
**Returns**: <code>boolean</code> - true - the behavior is currently loading objects or ids.
                  false - the behavior is not currently loading objects or ids.  
<a name="isLoadingIds"></a>

## isLoadingIds() ⇒ <code>boolean</code>
Determine if the behavior is loading ids.

**Kind**: global function  
**Returns**: <code>boolean</code> - true - the behavior is currently loading ids.
                  false - the behavior is not currently loading ids.  
<a name="isLoadingObjects"></a>

## isLoadingObjects() ⇒ <code>boolean</code>
Determine if the behavior is loading objects.

**Kind**: global function  
**Returns**: <code>boolean</code> - true - the behavior is currently loading objects.
                  false - the behavior is not currently loading objects.  
<a name="listenToIdsPropertyChangeEvent"></a>

## listenToIdsPropertyChangeEvent()
Listens for the change event on the ids property and, if triggered, re-fetches the data based on the new ids.

**Kind**: global function  
<a name="stopListeningToIdsPropertyChangeEvent"></a>

## stopListeningToIdsPropertyChangeEvent()
Removes the listener added by listenToIdsPropertyChangeEvent().

**Kind**: global function  
<a name="retrieveOncePromise"></a>

## retrieveOncePromise() ⇒ <code>jQuery.Promise</code>
This is a good way to have something be called after at least one retrieve (pull or fetch) has completed.
This is especially useful if you don't care if the fetch has already happen you just want to do something once
the data is loaded.

This can also be done purely by listening for the 'fetched' event, but you might miss the event if it is fired
before you start listening.  This gives a structure for handling that case so that your methods are called
if the event is fired and if it is not fired.

This also gives the ability to distinguish between a successful and failed fetch easily using the promises
resolve/reject handlers.

Usage:

someDataBehavior.retrieveOncePromise()
  .then(view.doSomethingWithTheData, view.handleFiledFetch);

**Kind**: global function  
**Returns**: <code>jQuery.Promise</code> - that resolves when the data is successfully fetched and rejects when the fetch fails.  
<a name="initialize"></a>

## initialize(options)
Instantiates the data objects and binds it to this behavior instance.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | to pass to the initialize methods. |
| options.parentBehavior | [<code>DataBehavior</code>](#DataBehavior) | the data behavior instance that this Data object should be bound to. |
| options.privateCollection | [<code>Collection</code>](#Collection) | the private collection that this data represents. |

<a name="isLoading"></a>

## isLoading() ⇒ <code>boolean</code>
Determine if behavior is loading ids or objects.

**Kind**: global function  
**Returns**: <code>boolean</code> - true - the behavior is loading objects or ids.
                  false - the behavior is not loading objects or ids.  
<a name="isLoadingIds"></a>

## isLoadingIds() ⇒ <code>boolean</code>
Determine if the behavior is loading ids.

**Kind**: global function  
**Returns**: <code>boolean</code> - true - the behavior is currently loading ids.
                  false - the behavior is not currently loading ids.  
<a name="isLoadingObjects"></a>

## isLoadingObjects() ⇒ <code>boolean</code>
Determine if the behavior is loading objects.

**Kind**: global function  
**Returns**: <code>boolean</code> - true - the behavior is currently loading objects.
                  false - the behavior is not currently loading objects.  
<a name="toJSON"></a>

## toJSON() ⇒ <code>Object</code> \| <code>Array.&lt;Object&gt;</code>
Get the full data object contents.  Either an array if returnSingleResult is false or a single object if it is true.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array.&lt;Object&gt;</code> - containing the full contents of either the collection or model.  
<a name="get"></a>

## get([propertyName]) ⇒ <code>Object</code> \| <code>Array.&lt;Object&gt;</code>
Get the full data object contents (either an array of model attributes or a single model attribute based on the
value of propertyName) or the value of a specific property if a single result is expected.

If returnSingleResult is true then this will return the given property from the model (if that model exists).
If returnSingleResult is false then this will return an array containing that property from all of the retrieved models.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array.&lt;Object&gt;</code> - containing the full contents of either the collection or model.  

| Param | Type | Description |
| --- | --- | --- |
| [propertyName] | <code>string</code> | the property to get from the model(s). |

<a name="getModel"></a>

## getModel(modelId) ⇒ <code>Backbone.Model</code>
**Kind**: global function  
**Returns**: <code>Backbone.Model</code> - either the model with the given id or the only model on this behavior (if model id is undefined).  
**Throws**:

- an error if there are more than 1 result or the configuration of the behavior specifies returnSingleResult === false.


| Param | Type | Description |
| --- | --- | --- |
| modelId | <code>number</code> \| <code>string</code> | The id of the model to get from the collection. |

<a name="getModels"></a>

## getModels() ⇒ <code>Array.&lt;Backbone.Model&gt;</code>
**Kind**: global function  
**Returns**: <code>Array.&lt;Backbone.Model&gt;</code> - new array containing all the models in the data's private collection.  
<a name="activate"></a>

## activate()
Adds the listeners to the private collection.

**Kind**: global function  
<a name="deactivate"></a>

## deactivate()
Removes the listeners on the private collection.

**Kind**: global function  
<a name="dispose"></a>

## dispose()
Dispose of the data events.

**Kind**: global function  
<a name="external_Backbone"></a>

## Backbone
The backbone View reference

**Kind**: global external  
**See**: [Backbone](http://backbonejs.org/)  
**Properties**

| Name | Type |
| --- | --- |
| View | [<code>Backbone-View</code>](#external_Backbone-View) | 

<a name="external_Backbone-View"></a>

## Backbone-View
The backbone View reference

**Kind**: global external  
**See**: [Backbone.View](http://backbonejs.org/#View)  
<a name="external_Backbone-Model"></a>

## Backbone-Model
The backbone Model reference

**Kind**: global external  
**See**: [Backbone.Model](http://backbonejs.org/#Model)  
<a name="external_Backbone-Collection"></a>

## Backbone-Collection
The backbone Collection reference

**Kind**: global external  
**See**: [Backbone.Collection](http://backbonejs.org/#Collection)  
