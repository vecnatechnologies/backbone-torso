## Modules

<dl>
<dt><a href="#module_modules/torso">modules/torso</a></dt>
<dd><p>Module containing all dependencies that exports a single object with everything attached (same format as the global).</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#View">View</a> ⇐ <code><a href="#external_Backbone-View">Backbone-View</a></code></dt>
<dd></dd>
<dt><a href="#Behavior">Behavior</a></dt>
<dd></dd>
</dl>

## External

<dl>
<dt><a href="#external_Backbone-View">Backbone-View</a></dt>
<dd><p>The backbone View reference</p>
</dd>
<dt><a href="#external_Backbone">Backbone</a></dt>
<dd><p>The backbone View reference</p>
</dd>
</dl>

<a name="module_modules/torso"></a>

## modules/torso
Module containing all dependencies that exports a single object with everything attached (same format as the global).

**Author**: jyoung@vecna.com  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Behavior | [<code>Behavior</code>](#Behavior) | The [Behavior](#Behavior) prototype. |
| behaviors | <code>Object</code> | Collection of behaviors that ship with Torso. |
| behaviors.DataBehavior | <code>DataBehavior</code> | The [DataBehavior](DataBehavior) prototype. |
| Cell | <code>Cell</code> | The [Cell](Cell) prototype. |
| Collection | <code>Collection</code> | The [Collection](Collection) prototype. |
| Events | <code>Events</code> | The [Events](Events) prototype. |
| Mixins | <code>Object</code> | Collection of mixins that are used by Torso. |
| Mixins.loading | <code>loadingMixin</code> | The [loadingMixin](loadingMixin). |
| Mixins.cache | <code>cacheMixin</code> | The [cacheMixin](cacheMixin). |
| Mixins.polling | <code>pollingMixin</code> | The [pollingMixin](pollingMixin). |
| Mixins.validation | <code>validation.mixin</code> | The [validation.mixin](validation.mixin). |
| Mixins.cell | <code>cellMixin</code> | The [cellMixin](cellMixin). |
| Model | <code>Model</code> | The [Model](Model) prototype. |
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

<a name="View"></a>

## View ⇐ [<code>Backbone-View</code>](#external_Backbone-View)
**Kind**: global class  
**Extends**: [<code>Backbone-View</code>](#external_Backbone-View)  
**See**: <a href="../annotated/modules/View.html">View Annotated Source</a>  
**Author**: ariel.wexler@vecna.com, kent.willis@vecna.com  

* [View](#View) ⇐ [<code>Backbone-View</code>](#external_Backbone-View)
    * [new View()](#new_View_new)
    * _instance_
        * [.viewState](#View+viewState) : <code>ViewStateCell</code>
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
    * _inner_
        * [~ViewStateCell](#View..ViewStateCell) ⇐ <code>NestedCell</code>
            * [new ViewStateCell(attrs, opts)](#new_View..ViewStateCell_new)
            * [.trigger()](#View..ViewStateCell+trigger)

<a name="new_View_new"></a>

### new View()
Overrides constructor to create needed fields and invoke activate/render after initialization

Generic View that deals with:
- Creation of private collections
- Lifecycle of a view

<a name="View+viewState"></a>

### view.viewState : <code>ViewStateCell</code>
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

<a name="View..ViewStateCell"></a>

### View~ViewStateCell ⇐ <code>NestedCell</code>
**Kind**: inner class of [<code>View</code>](#View)  
**Extends**: <code>NestedCell</code>  

* [~ViewStateCell](#View..ViewStateCell) ⇐ <code>NestedCell</code>
    * [new ViewStateCell(attrs, opts)](#new_View..ViewStateCell_new)
    * [.trigger()](#View..ViewStateCell+trigger)

<a name="new_View..ViewStateCell_new"></a>

#### new ViewStateCell(attrs, opts)
ViewStateCell is a NestedCell that holds view state data and can trigger
change events. These changes events will propogate up and trigger on the view
as well.


| Param | Type | Description |
| --- | --- | --- |
| attrs | <code>Object</code> | the initial values to set on the cell - inherited from [NestedCell](NestedCell). |
| opts | <code>Object</code> | options for the cell. |
| opts.view | [<code>Backbone-View</code>](#external_Backbone-View) | the view that these options are tied to. |

<a name="View..ViewStateCell+trigger"></a>

#### viewStateCell.trigger()
Retrigger view state change events on the view as well.

**Kind**: instance method of [<code>ViewStateCell</code>](#View..ViewStateCell)  
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
| behaviorOptions.view | <code>Backbone.View</code> | that Behavior is attached to |
| behaviorOptions.alias | <code>Backbone.View</code> | the alias for the behavior in this view. |
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
<a name="external_Backbone-View"></a>

## Backbone-View
The backbone View reference

**Kind**: global external  
**See**: [Backbone.View](http://backbonejs.org/#View)  
<a name="external_Backbone"></a>

## Backbone
The backbone View reference

**Kind**: global external  
**See**: [Backbone](http://backbonejs.org/)  
**Properties**

| Name | Type |
| --- | --- |
| View | [<code>Backbone-View</code>](#external_Backbone-View) | 

