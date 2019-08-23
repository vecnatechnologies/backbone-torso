## Classes

<dl>
<dt><a href="#Behavior">Behavior</a></dt>
<dd></dd>
<dt><a href="#Cell">Cell</a> ⇐ <code><a href="#external_Backbone-Model">Backbone-Model</a></code></dt>
<dd></dd>
<dt><a href="#Collection">Collection</a> ⇐ <code><a href="#external_Backbone-Collection">Backbone-Collection</a></code></dt>
<dd></dd>
<dt><a href="#Events">Events</a> ⇐ <code><a href="#external_Backbone-Events">Backbone-Events</a></code></dt>
<dd></dd>
<dt><a href="#FormModel">FormModel</a> ⇐ <code><a href="#NestedModel">NestedModel</a></code></dt>
<dd></dd>
<dt><a href="#FormView">FormView</a> ⇐ <code><a href="#View">View</a></code></dt>
<dd></dd>
<dt><a href="#ListView">ListView</a> ⇐ <code><a href="#View">View</a></code></dt>
<dd></dd>
<dt><a href="#Model">Model</a> ⇐ <code><a href="#external_Backbone-Model">Backbone-Model</a></code></dt>
<dd></dd>
<dt><a href="#NestedCell">NestedCell</a> ⇐ <code><a href="#NestedModel">NestedModel</a></code></dt>
<dd></dd>
<dt><a href="#NestedModel">NestedModel</a> ⇐ <code><a href="#external_Backbone-NestedModel">Backbone-NestedModel</a></code></dt>
<dd></dd>
<dt><a href="#Router">Router</a> ⇐ <code><a href="#external_Backbone-Router">Backbone-Router</a></code></dt>
<dd></dd>
<dt><a href="#ServiceCell">ServiceCell</a> ⇐ <code><a href="#Cell">Cell</a></code></dt>
<dd></dd>
<dt><a href="#ViewStateCell">ViewStateCell</a> ⇐ <code><a href="#NestedCell">NestedCell</a></code></dt>
<dd></dd>
<dt><a href="#View">View</a> ⇐ <code><a href="#external_Backbone-View">Backbone-View</a></code></dt>
<dd></dd>
<dt><a href="#history">history</a> ⇐ <code><a href="#external_Backbone-History">Backbone-History</a></code></dt>
<dd></dd>
<dt><a href="#registry">registry</a> ⇐ <code><a href="#external_Backbone-Events">Backbone-Events</a></code></dt>
<dd></dd>
<dt><a href="#DataBehavior">DataBehavior</a> ⇐ <code><a href="#Behavior">Behavior</a></code></dt>
<dd></dd>
<dt><a href="#PrivateCollection">PrivateCollection</a> ⇐ <code><a href="#Collection">Collection</a></code></dt>
<dd></dd>
</dl>

## Mixins

<dl>
<dt><a href="#validationMixin">validationMixin</a></dt>
<dd><p>Contains the methods that are mixed in on the model when binding</p></dd>
<dt><a href="#cacheMixin">cacheMixin</a></dt>
<dd><p><p>Custom additions to the Backbone Collection object.</p></p>
<ul>
<li>safe disposal methods for memory + event management</li>
<li>special functional overrides to support ID registration for different views</li>
</ul></dd>
<dt><a href="#cellMixin">cellMixin</a></dt>
<dd><p>An non-persistable object that can listen to and emit events like a models.</p></dd>
<dt><a href="#loadingMixin">loadingMixin</a></dt>
<dd><p>Loading logic.</p></dd>
<dt><a href="#modelMixin">modelMixin</a></dt>
<dd><p>The base for a model</p></dd>
<dt><a href="#pollingMixin">pollingMixin</a></dt>
<dd><p>Periodic Polling Object to be mixed into Backbone Collections and Models.</p>
<p>The polling functionality should only be used for collections and for models that are not<br>part of any collections. It should not be used for a model that is a part of a collection.</p></dd>
</dl>

## Objects

<dl>
<dt><a href="#HandlebarsHelper">HandlebarsHelper</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#templateRenderer">templateRenderer</a> : <code>object</code></dt>
<dd><p>Static Template Engine.<br>All template renders should be piped through this method.</p></dd>
<dt><a href="#torso">torso</a> : <code>object</code></dt>
<dd><p>Module containing all dependencies that exports a single object with everything attached (same format as the global).</p></dd>
<dt><a href="#Validation">Validation</a> : <code>object</code></dt>
<dd><p>Validation object containing validation mixin.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#handlebarsUtils">handlebarsUtils(Handlebars)</a></dt>
<dd><p>Extensions to handlebars helpers.</p>
<p>Adds additonal helpers to <a href="#external_Handlebars">Handlebars</a></p></dd>
<dt><a href="#stickitUtils">stickitUtils()</a></dt>
<dd><p>Extensions to stickit handlers.</p></dd>
</dl>

## External

<dl>
<dt><a href="#external_Backbone-Collection">Backbone-Collection</a> ⇐ <code><a href="#external_Backbone-Events">Backbone-Events</a></code></dt>
<dd><p>The backbone Collection reference</p></dd>
<dt><a href="#external_Backbone-Events">Backbone-Events</a></dt>
<dd><p>The backbone Events reference</p></dd>
<dt><a href="#external_Backbone-Model">Backbone-Model</a> ⇐ <code><a href="#external_Backbone-Events">Backbone-Events</a></code></dt>
<dd><p>The backbone Model reference</p></dd>
<dt><a href="#external_Backbone-NestedModel">Backbone-NestedModel</a> ⇐ <code><a href="#external_Backbone-Model">Backbone-Model</a></code></dt>
<dd><p>The Backbone-Nested reference</p></dd>
<dt><a href="#external_Backbone-Router">Backbone-Router</a> ⇐ <code><a href="#external_Backbone-Events">Backbone-Events</a></code></dt>
<dd><p>The backbone Router reference</p></dd>
<dt><a href="#external_Backbone-View">Backbone-View</a> ⇐ <code><a href="#external_Backbone-Events">Backbone-Events</a></code></dt>
<dd><p>The backbone View reference</p></dd>
<dt><a href="#external_Handlebars">Handlebars</a></dt>
<dd><p>The handlebars reference</p></dd>
<dt><a href="#external_Handlebars-Template">Handlebars-Template</a></dt>
<dd><p>The handlebars Template reference</p></dd>
<dt><a href="#external_Backbone-History">Backbone-History</a> ⇐ <code><a href="#external_Backbone-Events">Backbone-Events</a></code></dt>
<dd><p>The backbone History reference</p></dd>
<dt><a href="#external_jQuery">jQuery</a></dt>
<dd><p>The jQuery reference</p></dd>
<dt><a href="#external_jQuery-Deferred">jQuery-Deferred</a></dt>
<dd><p>The jQuery Deferred reference</p></dd>
<dt><a href="#external_Backbone">Backbone</a></dt>
<dd><p>The backbone View reference</p></dd>
</dl>

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
<p>Allows abstraction of common view logic into separate object</p>


| Param | Type | Description |
| --- | --- | --- |
| behaviorAttributes | <code>Object</code> | <p>the initial value of the behavior's attributes.</p> |
| behaviorOptions | <code>Object</code> |  |
| behaviorOptions.view | [<code>Backbone-View</code>](#external_Backbone-View) | <p>that Behavior is attached to</p> |
| behaviorOptions.alias | <code>string</code> | <p>the alias for the behavior in this view.</p> |
| [viewOptions] | <code>Object</code> | <p>options passed to View's initialize</p> |

<a name="Behavior+alias"></a>

### behavior.alias : <code>string</code>
<p>Unique name of the behavior instance w/in a view.  More human readable than the cid.</p>

**Kind**: instance property of [<code>Behavior</code>](#Behavior)  
<a name="Behavior+cidPrefix"></a>

### behavior.cidPrefix : <code>string</code>
<p>cidPrefix of Behaviors</p>

**Kind**: instance property of [<code>Behavior</code>](#Behavior)  
<a name="Behavior+mixin"></a>

### behavior.mixin : <code>Object</code>
<p>Add functions to be added to the view's public API. They will be behavior-scoped.</p>

**Kind**: instance property of [<code>Behavior</code>](#Behavior)  
<a name="Behavior+prepare"></a>

### behavior.prepare() ⇒ <code>Object</code>
<p>The behavior's prepare result will be combined with the view's prepare with the behavior's alias as the namespace.<br>effectively: { [behaviorName]: behavior.prepare() } will be combined with the view's prepare result.</p>

**Kind**: instance method of [<code>Behavior</code>](#Behavior)  
**Returns**: <code>Object</code> - <p>a prepare context suitable to being added to the view's prepare result.</p>  
<a name="Behavior+_dispose"></a>

### behavior.\_dispose()
<p>Method to be invoked when dispose is called. By default calling dispose will remove the<br>behavior's on's and listenTo's.<br>Override this method to destruct any extra</p>

**Kind**: instance method of [<code>Behavior</code>](#Behavior)  
<a name="Behavior+isDisposed"></a>

### behavior.isDisposed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Behavior</code>](#Behavior)  
**Returns**: <code>boolean</code> - <p>true if the view was disposed</p>  
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
<p>An non-persistable object that can listen to and emit events like a models.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes | <code>Object</code> |  | <p>the initial attributes to use for this cell.</p> |
| [options] | <code>Object</code> | <code>{}</code> | <p>the options for setting up this cell.</p> |
| [options.register] | <code>boolean</code> | <code>false</code> | <p>whether to register this cell in the app-level registry.<br>                                            By default this will NOT add it to the registry unless set to true because<br>                                            we have not mechanism that will make sure the cells get removed from the registry<br>                                            at the appropriate times.</p> |

<a name="Cell+isModelCompatible"></a>

### cell.isModelCompatible
<p>Whether a cell can pass as a model or not.<br>If true, the cell will not fail is persisted functions are invoked<br>If false, the cell will throw exceptions if persisted function are invoked</p>

**Kind**: instance property of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>isModelCompatible</code>](#cellMixin.isModelCompatible)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| isModelCompatible | <code>boolean</code> | 

<a name="Cell+save"></a>

### cell.save()
<p>Override and disable the save function</p>

**Kind**: instance method of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>save</code>](#cellMixin.save)  
<a name="Cell+fetch"></a>

### cell.fetch()
<p>Override and disable the fetch function</p>

**Kind**: instance method of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>fetch</code>](#cellMixin.fetch)  
<a name="Cell+sync"></a>

### cell.sync()
<p>Override and disable the sync function</p>

**Kind**: instance method of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>sync</code>](#cellMixin.sync)  
<a name="Cell+url"></a>

### cell.url()
<p>Override and disable the url</p>

**Kind**: instance method of [<code>Cell</code>](#Cell)  
**Mixes**: [<code>url</code>](#cellMixin.url)  
<a name="Collection"></a>

## Collection ⇐ [<code>Backbone-Collection</code>](#external_Backbone-Collection)
**Kind**: global class  
**Extends**: [<code>Backbone-Collection</code>](#external_Backbone-Collection)  
**Mixes**: [<code>pollingMixin</code>](#pollingMixin), [<code>loadingMixin</code>](#loadingMixin), [<code>cacheMixin</code>](#cacheMixin)  
**See**: <a href="../annotated/modules/Collection.html">Collection Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [Collection](#Collection) ⇐ [<code>Backbone-Collection</code>](#external_Backbone-Collection)
    * [new Collection()](#new_Collection_new)
    * [.pollTimeoutId](#Collection+pollTimeoutId)
    * [.filterDefault()](#Collection+filterDefault) ⇒ [<code>Collection</code>](#Collection)
    * [.dispose()](#Collection+dispose)
    * [.isPolling()](#Collection+isPolling)
    * [.startPolling(pollInterval)](#Collection+startPolling)
    * [.stopPolling()](#Collection+stopPolling)
    * [.polledFetch()](#Collection+polledFetch)
    * [.constructor([options])](#Collection+constructor)
    * [.hasLoadedOnce()](#Collection+hasLoadedOnce) ⇒ <code>boolean</code>
    * [.isLoading()](#Collection+isLoading) ⇒ <code>boolean</code>
    * [.getLoadedOncePromise()](#Collection+getLoadedOncePromise) ⇒ <code>Promise</code>
    * [.fetch(options)](#Collection+fetch)
    * [.getRequesterIds(the)](#Collection+getRequesterIds) ⇒ <code>Array</code>
    * [.getRequesterIdsAsDictionary(guid)](#Collection+getRequesterIdsAsDictionary) ⇒ <code>Object</code>
    * [.removeRequester(guid)](#Collection+removeRequester)
    * [.getRequesters()](#Collection+getRequesters) ⇒ <code>Array</code>
    * [.getAllRequestedIds()](#Collection+getAllRequestedIds) ⇒ <code>Array</code>
    * [.createPrivateCollection(guid)](#Collection+createPrivateCollection) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
    * [.registerIds(newIds, guid)](#Collection+registerIds)
    * [.fetchByIds([fetchByIdsOptions])](#Collection+fetchByIds) ⇒ <code>Promise</code>

<a name="new_Collection_new"></a>

### new Collection()
<p>Generic Collection</p>

<a name="Collection+pollTimeoutId"></a>

### collection.pollTimeoutId
**Kind**: instance property of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>pollTimeoutId</code>](#pollingMixin.pollTimeoutId)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pollTimeoutId | <code>number</code> | <p>The id from when setTimeout was called to start polling.</p> |

<a name="Collection+filterDefault"></a>

### collection.filterDefault() ⇒ [<code>Collection</code>](#Collection)
<p>The default filter.  Always returns itself.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Returns**: [<code>Collection</code>](#Collection) - <p>a new instance of this collection</p>  
<a name="Collection+dispose"></a>

### collection.dispose()
<p>Will abolish all listeners and events that are hooked<br>to this collection.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
<a name="Collection+isPolling"></a>

### collection.isPolling()
<p>Returns true if the poll is active</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>isPolling</code>](#pollingMixin.isPolling)  
<a name="Collection+startPolling"></a>

### collection.startPolling(pollInterval)
<p>Starts polling Model/Collection by calling fetch every pollInterval.<br>Note: Each Model/Collection will only allow a singleton of polling to occur so<br>as not to have duplicate threads updating Model/Collection.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>startPolling</code>](#pollingMixin.startPolling)  

| Param | Type | Description |
| --- | --- | --- |
| pollInterval | <code>Integer</code> | <p>interval between each poll in ms.</p> |

<a name="Collection+stopPolling"></a>

### collection.stopPolling()
<p>Stops polling Model and clears all Timeouts.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>stopPolling</code>](#pollingMixin.stopPolling)  
<a name="Collection+polledFetch"></a>

### collection.polledFetch()
<p>By default, the polled fetching operation is routed directly<br>to backbone's fetch all.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>polledFetch</code>](#pollingMixin.polledFetch)  
<a name="Collection+constructor"></a>

### collection.constructor([options])
<p>The constructor constructor / initialize method for collections.<br>Allocate new memory for the local references if they<br>were null when this method was called.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>constructor</code>](#cacheMixin.constructor)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | <p>optional options object</p> |
| [options.fetchHttpAction] | <code>string</code> | <code>&quot;&#x27;POST&#x27;&quot;</code> | <p>http action used to get objects by ids</p> |
| [options.getByIdsUrl] | <code>string</code> | <code>&quot;&#x27;/ids&#x27;&quot;</code> | <p>path appended to collection.url to get objects by a list of ids</p> |
| [options.fetchUsingTrackedIds] | <code>boolean</code> | <code>true</code> | <p>if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids<br>                                                      but will rather call the default fetch method.</p> |

<a name="Collection+hasLoadedOnce"></a>

### collection.hasLoadedOnce() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>hasLoadedOnce</code>](#loadingMixin.hasLoadedOnce)  
**Returns**: <code>boolean</code> - <p>true if this model/collection has ever loaded from a fetch call</p>  
<a name="Collection+isLoading"></a>

### collection.isLoading() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>isLoading</code>](#loadingMixin.isLoading)  
**Returns**: <code>boolean</code> - <p>true if this model/collection is currently loading new values from the server</p>  
<a name="Collection+getLoadedOncePromise"></a>

### collection.getLoadedOncePromise() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getLoadedOncePromise</code>](#loadingMixin.getLoadedOncePromise)  
**Returns**: <code>Promise</code> - <p>a promise that will resolve when the model/collection has loaded for the first time</p>  
<a name="Collection+fetch"></a>

### collection.fetch(options)
<p>Overrides the base fetch call if this.fetchUsingTrackedIds is true<br>Calling fetch from the cache will fetch the tracked ids if fetchUsingTrackedIds is set to true, otherwise<br>it will pass through to the default fetch.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>fetch</code>](#cacheMixin.fetch)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="Collection+getRequesterIds"></a>

### collection.getRequesterIds(the) ⇒ <code>Array</code>
**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getRequesterIds</code>](#cacheMixin.getRequesterIds)  
**Returns**: <code>Array</code> - <p>an array of the ids the requester with the guid has requested</p>  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>string</code> | <p>global unique id of the requester</p> |

<a name="Collection+getRequesterIdsAsDictionary"></a>

### collection.getRequesterIdsAsDictionary(guid) ⇒ <code>Object</code>
<p>This method is used for quick look up of a certain id within the list of requested ids</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getRequesterIdsAsDictionary</code>](#cacheMixin.getRequesterIdsAsDictionary)  
**Returns**: <code>Object</code> - <p>an dictionary of id -&gt; id of the requester ids for a given requester.</p>  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>the global unique id of the requester</p> |

<a name="Collection+removeRequester"></a>

### collection.removeRequester(guid)
<p>Removes a requester from this cache. No longer receives updates</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>removeRequester</code>](#cacheMixin.removeRequester)  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>the global unique id of the requester</p> |

<a name="Collection+getRequesters"></a>

### collection.getRequesters() ⇒ <code>Array</code>
<p>NOTE: this methods returns only the guids for requester collections that are currently tracking ids<br>TODO: should this return just the knownPrivateCollections</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getRequesters</code>](#cacheMixin.getRequesters)  
**Returns**: <code>Array</code> - <p>an array of the all requesters in the form of their GUID's</p>  
<a name="Collection+getAllRequestedIds"></a>

### collection.getAllRequestedIds() ⇒ <code>Array</code>
<p>Return the list of Ids requested by this collection</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>getAllRequestedIds</code>](#cacheMixin.getAllRequestedIds)  
**Returns**: <code>Array</code> - <p>the corresponding requested Ids</p>  
<a name="Collection+createPrivateCollection"></a>

### collection.createPrivateCollection(guid) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
<p>Used to return a collection of desired models given the requester object.<br>Binds a custom &quot;resized&quot; event to the private collections.<br>Overrides the fetch method to call the parent collection's fetchByIds method.<br>Overrides the registerIds method to redirect to its parent collection.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>createPrivateCollection</code>](#cacheMixin.createPrivateCollection)  
**Returns**: [<code>PrivateCollection</code>](#PrivateCollection) - <p>an new empty collection of the same type as &quot;this&quot;</p>  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>Identifier for the requesting view</p> |

<a name="Collection+registerIds"></a>

### collection.registerIds(newIds, guid)
<p>Registers a list of Ids that a particular object cares about and pushes<br>any cached models its way.</p>
<p>This method intelligently updates the &quot;_requestedIds&quot; field to contain all unique<br>requests for Ids to be fetched.  Furthermore, the &quot;polledFetch&quot; method<br>is overriden such that it no longer routes through Backbone's fetch all,<br>but rather a custom &quot;fetchByIds&quot; method.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>registerIds</code>](#cacheMixin.registerIds)  

| Param | Type | Description |
| --- | --- | --- |
| newIds | <code>Array</code> | <p>New ids to register under the requester</p> |
| guid | <code>string</code> | <p>The GUID of the object that wants the ids</p> |

<a name="Collection+fetchByIds"></a>

### collection.fetchByIds([fetchByIdsOptions]) ⇒ <code>Promise</code>
<p>A custom fetch operation to only fetch the requested Ids.</p>

**Kind**: instance method of [<code>Collection</code>](#Collection)  
**Mixes**: [<code>fetchByIds</code>](#cacheMixin.fetchByIds)  
**Returns**: <code>Promise</code> - <p>the promise of the fetch</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fetchByIdsOptions] |  |  | <p>argument fetchByIdsOptions</p> |
| [fetchByIdsOptions.idsToFetch] | <code>Array</code> | <code>collection.collectionTrackedIds</code> | <p>A list of request Ids, will default to current tracked ids</p> |
| [fetchByIdsOptions.setOptions] | <code>Object</code> |  | <p>if a set is made, then the setOptions will be passed into the set method</p> |

<a name="Events"></a>

## Events ⇐ [<code>Backbone-Events</code>](#external_Backbone-Events)
**Kind**: global class  
**Extends**: [<code>Backbone-Events</code>](#external_Backbone-Events)  
**See**: <a href="../annotated/modules/Events.html">Events Annotated Source</a>  
**Author**: ariel.wexler@vecna.com, kent.willis@vecna.com  
<a name="new_Events_new"></a>

### new Events()
<p>Generic Events.</p>

<a name="FormModel"></a>

## FormModel ⇐ [<code>NestedModel</code>](#NestedModel)
**Kind**: global class  
**Extends**: [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>validationMixin</code>](#validationMixin)  
**See**: <a href="../annotated/modules/FormModel.html">FormModel Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [FormModel](#FormModel) ⇐ [<code>NestedModel</code>](#NestedModel)
    * [new FormModel()](#new_FormModel_new)
    * [.mapping](#FormModel+mapping) : <code>Object</code>
    * [.models](#FormModel+models) : <code>Object</code>
    * [.pollTimeoutId](#NestedModel+pollTimeoutId)
    * [.constructor([options])](#FormModel+constructor)
    * [.getMapping(alias)](#FormModel+getMapping) ⇒
    * [.getMappings()](#FormModel+getMappings) ⇒
    * [.setMapping(alias, mapping, [models], [copy])](#FormModel+setMapping)
    * [.setMappings(mappings, [models], [copy])](#FormModel+setMappings)
    * [.unsetMapping(aliasOrModel, [removeModelIfUntracked])](#FormModel+unsetMapping)
    * [.unsetMappings()](#FormModel+unsetMappings)
    * [.getTrackedModel(alias)](#FormModel+getTrackedModel) ⇒ [<code>Backbone-Model</code>](#external_Backbone-Model)
    * [.getTrackedModels()](#FormModel+getTrackedModels) ⇒
    * ~~[.setTrackedModel()](#FormModel+setTrackedModel)~~
    * [.trackModel(alias, model, [copy])](#FormModel+trackModel)
    * ~~[.setTrackedModels()](#FormModel+setTrackedModels)~~
    * [.trackModels(models, [copy])](#FormModel+trackModels)
    * ~~[.unsetTrackedModel()](#FormModel+unsetTrackedModel)~~
    * [.untrackModel(aliasOrModel)](#FormModel+untrackModel)
    * ~~[.unsetTrackedModels()](#FormModel+unsetTrackedModels)~~
    * [.untrackModels()](#FormModel+untrackModels)
    * [.push()](#FormModel+push)
    * [.pull()](#FormModel+pull)
    * [.save([options])](#FormModel+save) ⇒
    * [.isTrackingAnyObjectModel()](#FormModel+isTrackingAnyObjectModel) ⇒
    * [.isUpdating()](#FormModel+isUpdating) ⇒
    * [.startUpdating([pullFirst])](#FormModel+startUpdating)
    * [.stopUpdating()](#FormModel+stopUpdating)
    * [.resetUpdating()](#FormModel+resetUpdating)
    * [.isModelStale(model, [staleModels], [currentHashValues])](#FormModel+isModelStale) ⇒ <code>boolean</code>
    * [.checkIfModelsAreStale()](#FormModel+checkIfModelsAreStale) ⇒ <code>Array</code>
    * [.preValidate(attr, [value])](#FormModel+preValidate) ⇒ <code>undefined</code> \| <code>string</code> \| <code>Object</code>
    * [.isValid()](#FormModel+isValid)
    * [.validate()](#FormModel+validate)
    * [.isPolling()](#NestedModel+isPolling)
    * [.startPolling(pollInterval)](#NestedModel+startPolling)
    * [.stopPolling()](#NestedModel+stopPolling)
    * [.polledFetch()](#NestedModel+polledFetch)
    * [.dispose()](#NestedModel+dispose)
    * [._dispose()](#NestedModel+_dispose)

<a name="new_FormModel_new"></a>

### new FormModel()
<p>Generic Form Model</p>

<a name="FormModel+mapping"></a>

### formModel.mapping : <code>Object</code>
<p>Map from aliases (either model names or computed value names) to mappings.<br>Please refer to the documentation on the constructor about the form and options for this field.</p>

**Kind**: instance property of [<code>FormModel</code>](#FormModel)  
**Properties**

| Name |
| --- |
| mapping | 

<a name="FormModel+models"></a>

### formModel.models : <code>Object</code>
<p>Map from model aliases to model instances.<br>Please refer to the documentation on the constructor about the form and options for this field.</p>

**Kind**: instance property of [<code>FormModel</code>](#FormModel)  
**Properties**

| Name |
| --- |
| models | 

<a name="NestedModel+pollTimeoutId"></a>

### formModel.pollTimeoutId
**Kind**: instance property of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>pollTimeoutId</code>](#pollingMixin.pollTimeoutId)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pollTimeoutId | <code>number</code> | <p>The id from when setTimeout was called to start polling.</p> |

<a name="FormModel+constructor"></a>

### formModel.constructor([options])
<p>Constructor the form model. Can take in attributes to set initially. These will override any pulled values from object models<br>on initialization. On initialization the object model's values will be pulled once.<br>For the options, here are needed definitions:<br>mapping: {<br>  modelName: 'foo bar baz' // track a model by providing an alias for a name and a space seperated list of fields to track as a String<br>  modelName2: true          // to track all fields<br>  ...                      // can have many model mappings<br>  computedName: {<br>    modelName: 'taz raz',  // mappings for models that will be used for this computed mapping.<br>    ...                    // can have many model mappings for a computed<br>    pull: function(models) {}, // a callback that will be invoked when pulling data from the Object model. Passes in a map of model alias/name to shallow copies of fields being tracked on that model.<br>    push: function(models) {}  // a callback that will be invoked when pushing data to the Object model. Passes in a map of model alias/name to object model being tracked under that alias.<br>  }<br>},<br>models: {<br>  modelName: modelInstance,  // optionally, provide a set of model instance to model name (aliases) to start tracking<br>  modelName2: modelInstance2 // provide as many aliases to model instances as you'd like<br>}</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.mapping] | <code>Object</code> |  | <p>map from aliases (either model names or computed value names) to mappings.<br>    A model mapping can bind an alias to a space seperated list of fields to track as a String  r the boolean true if it is mapping all the<br>    fields. A computed mapping can bind an alias to a set of model mappings required for this computed value and both a pull and/or push method<br>    that are used to compute different values to or from object model(s).</p> |
| [options.models] | <code>Object</code> |  | <p>Because the options.mapping parameter only allows you to define the mappings to aliases, this options allows<br>    you to bind model instances to aliases. Setting model instances to aliases are required to actually begin pulling/pushing values.</p> |
| [options.startUpdating] | <code>boolean</code> | <code>false</code> | <p>set to true if you want to immediately set up listeners to update this form<br>    model as the object model updates. You can always toggle this state with startUpdating() and stopUpdating().</p> |
| [options.validation] | <code>Object</code> |  | <p>A Backbone.Validation plugin hash to dictate the validation rules</p> |
| [options.labels] | <code>Object</code> |  | <p>A Backbone.Validation plugin hash to dictate the attribute labels</p> |

<a name="FormModel+getMapping"></a>

### formModel.getMapping(alias) ⇒
**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: <p>the mapping config for that alias</p>  

| Param | Type | Description |
| --- | --- | --- |
| alias | <code>string</code> | <p>the alias of the mapping - either a model mapping or a computed mapping</p> |

<a name="FormModel+getMappings"></a>

### formModel.getMappings() ⇒
**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: <p>all the current mapping configs</p>  
<a name="FormModel+setMapping"></a>

### formModel.setMapping(alias, mapping, [models], [copy])
<p>Define or redefine how the form model pull/pushes or otherwise tracks properties between an object model(s).<br>Examples:<br>this.setMapping('modelAlias', true, optional model instance);<br>this.setMapping('modelAlias, 'foo bar baz', optional model instance);<br>this.setMapping('computedAlias', {<br>  model1: 'foo',<br>  model2: 'bar',<br>  push: function(models) {<br>    models.model1.set('foo', this.get('foobar')[0]);<br>    models.model2.set('bar', this.get('foobar')[1]);<br>  },<br>  pull: function(models) {<br>    this.set('foobar', [models.model1.foo, models.model2.bar]);<br>  },<br>}, optional model map)</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| alias | <code>string</code> |  | <p>the name for the mapping - either a model mapping or a computed mapping</p> |
| mapping | <code>string</code> \| <code>boolean</code> \| <code>Object</code> |  | <p>Provides the mapping for this alias. If trying to map to a model, then either provide<br> a space delimited list of fields to track as a String or the boolean true to track all the model's fields. If the mapping is for<br> a computed value, then provide a map from model alias to model mapping for all the fields needed for the computed and a pull method<br> if you want to change/combine/split object model properties before bringing them into the form model and a push method if you want to<br> change/combine/split form model properties before pushing them to the object models.</p> |
| [models] | <code>Object</code> \| [<code>Backbone-Model</code>](#external_Backbone-Model) |  | <p>Provides instances to use for this mapping. If mapping is a computed,<br>  provide a map from alias to model instance. If mapping is for a single model, just provide the model instance for that alias.</p> |
| [copy] |  | <code>false</code> | <p>if true, will pull values definined by this mapping after setting the mapping. Requires models to be passed in.</p> |

<a name="FormModel+setMappings"></a>

### formModel.setMappings(mappings, [models], [copy])
<p>Sets multiple mappings (both model mappings and computed value mappings) with one call.<br>Uses the same style of mapping syntax as the constructor. Please refer to the documentation on the constructor.<br>Here is an example:<br>this.setMappings({<br>  model1: 'foo bar',<br>  model2: 'baz',<br>  ssn: {<br>    model1: 'ssn',<br>    model2: 'lastssn'<br>    push: function(models) {},<br>    pull: function(models) {},<br>  }<br>}, optional model map)</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mappings | <code>Object</code> |  | <p>Uses the same style of mapping syntax as the constructor. Please refer to the documentation on the constructor.</p> |
| [models] | <code>Object</code> |  | <p>this parameter allows you to immediately bind model instances to aliases. Keys are aliases and values are external:Backbone-Models.</p> |
| [copy] |  | <code>false</code> | <p>if true, will pull values definined by this mapping after setting the mapping. Requires models to be passed in.</p> |

<a name="FormModel+unsetMapping"></a>

### formModel.unsetMapping(aliasOrModel, [removeModelIfUntracked])
<p>Remove a mapping (model or computed) by alias</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| aliasOrModel | <code>string</code> \| [<code>Backbone-Model</code>](#external_Backbone-Model) |  | <p>if a String is provided, it will unset the mapping with that alias.<br>  If a external:Backbone-Model is provided, it will remove the model mapping that was bound to that model.</p> |
| [removeModelIfUntracked] | <code>boolean</code> | <code>false</code> | <p>If true, after the mapping is removed, the model will also be unset but only if<br>  no other mappings reference it. Note, setting this to true will not remove any computed mappings that also use that model.</p> |

<a name="FormModel+unsetMappings"></a>

### formModel.unsetMappings()
<p>Removes all current mappings<br>Does NOT remove current model being tracked. Call this.untrackModels afterwards if you wish this behavior.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
<a name="FormModel+getTrackedModel"></a>

### formModel.getTrackedModel(alias) ⇒ [<code>Backbone-Model</code>](#external_Backbone-Model)
<p>Returns the object model currently bound to the given name/alias.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: [<code>Backbone-Model</code>](#external_Backbone-Model) - <p>the model currently bound to the alias</p>  

| Param | Type | Description |
| --- | --- | --- |
| alias | <code>string</code> | <p>the name/alias used by the mappings.</p> |

<a name="FormModel+getTrackedModels"></a>

### formModel.getTrackedModels() ⇒
<p>Returns all the currently tracked object models</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: <p>all the currently tracked object models</p>  
<a name="FormModel+setTrackedModel"></a>

### ~~formModel.setTrackedModel()~~
***Deprecated***

<p>Use [trackModel](#FormModel+trackModel) instead.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**See**: [trackModel](#FormModel+trackModel)  
<a name="FormModel+trackModel"></a>

### formModel.trackModel(alias, model, [copy])
<p>Update or create a binding between an object model and an alias.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| alias | <code>string</code> |  | <p>the alias/name to bind to.</p> |
| model | [<code>Backbone-Model</code>](#external_Backbone-Model) |  | <p>the model to be bound. Mappings referencing this alias will start applying to this model.</p> |
| [copy] | <code>boolean</code> | <code>false</code> | <p>if true, the form model will perform a pull on any mappings using this alias.</p> |

<a name="FormModel+setTrackedModels"></a>

### ~~formModel.setTrackedModels()~~
***Deprecated***

<p>Use [trackModels](#FormModel+trackModels) instead.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**See**: [trackModels](#FormModel+trackModels)  
<a name="FormModel+trackModels"></a>

### formModel.trackModels(models, [copy])
<p>Binds multiple models to their aliases.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| models | <code>Object.&lt;string, external:Backbone-Model&gt;</code> |  | <p>A map from alias/name to model to be bound to that alias.</p> |
| [copy] | <code>boolean</code> | <code>false</code> | <p>if true, the form model will perform a pull on any mapping using these models.</p> |

<a name="FormModel+unsetTrackedModel"></a>

### ~~formModel.unsetTrackedModel()~~
***Deprecated***

<p>Use [untrackModel](#FormModel+untrackModel) instead.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**See**: [untrackModel](#FormModel+untrackModel)  
<a name="FormModel+untrackModel"></a>

### formModel.untrackModel(aliasOrModel)
<p>Removes the binding between a model alias and a model instance. Effectively stops tracking that model.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  

| Param | Type | Description |
| --- | --- | --- |
| aliasOrModel | <code>string</code> \| [<code>Backbone-Model</code>](#external_Backbone-Model) | <p>If a string is given, it will unset the model using that alias. If a model instance<br>  is given, it will unbind whatever alias is currently bound to it.</p> |

<a name="FormModel+unsetTrackedModels"></a>

### ~~formModel.unsetTrackedModels()~~
***Deprecated***

<p>Use [untrackModels](#FormModel+untrackModels) instead.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**See**: [untrackModels](#FormModel+untrackModels)  
<a name="FormModel+untrackModels"></a>

### formModel.untrackModels()
<p>Removes all the bindings between model aliases and model instances. Effectively stops tracking the current models.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
<a name="FormModel+push"></a>

### formModel.push()
<p>Pushes values from this form model back to the object models it is tracking. This includes invoking the push callbacks from<br>computed values</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
<a name="FormModel+pull"></a>

### formModel.pull()
<p>Pulls the most recent values of every object model that this form model tracks including computed values<br>NOTE: using this method can override user-submitted data from an HTML form. Use caution.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
<a name="FormModel+save"></a>

### formModel.save([options]) ⇒
<p>If FormModel has a &quot;url&quot; property defined, it will invoke a save on the form model, and after successfully<br>saving, will perform a push.<br>If no &quot;url&quot; property is defined then the following behavior is used:<br>Pushes the form model values to the object models it is tracking and invokes save on each one. Returns a promise.<br>NOTE: if no url is specified and no models are being tracked, it will instead trigger a 'save-fail' event and reject the returned promise<br>with a payload that mimics a server response: {none: { success: false, response: [{ responseJSON: { generalReasons: [{messageKey: 'no.models.were.bound.to.form'}] }}] }}</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: <p>when using a &quot;url&quot;, a promise is returned for the save on this form model.<br>         If not using a &quot;url&quot;, a promise that will either resolve when all the models have successfully saved in which case the context returned<br>  is an array of the responses (order determined by first the array of models and then the array of models used by<br>  the computed values, normalized), or if any of the saves fail, the promise will be rejected with an array of responses.<br>  Note: the size of the failure array will always be one - the first model that failed. This is a side-effect of $.when</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  |  |
| [options.rollback] | <code>boolean</code> | <code>true</code> | <p>if true, when any object model fails to save, it will revert the object<br>    model attributes to the state they were before calling save. NOTE: if there are updates that happen<br>    to object models within the timing of this save method, the updates could be lost.</p> |
| [options.force] | <code>boolean</code> | <code>true</code> | <p>if false, the form model will check to see if an update has been made<br>    to any object models it is tracking since it's last pull. If any stale data is found, save with throw an exception<br>    with attributes: {name: 'Stale data', staleModels: [Array of model cid's]}</p> |

<a name="FormModel+isTrackingAnyObjectModel"></a>

### formModel.isTrackingAnyObjectModel() ⇒
**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: <p>true if this form model is backed by an Object model. That means that at least one object model was bound to an mapping alias.</p>  
<a name="FormModel+isUpdating"></a>

### formModel.isUpdating() ⇒
**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: <p>true if any updates to an object model will immediately copy new values into this form model.</p>  
<a name="FormModel+startUpdating"></a>

### formModel.startUpdating([pullFirst])
<p>Will add listeners that will automatically pull new updates from this form's object models.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [pullFirst] | <code>boolean</code> | <code>false</code> | <p>if true, the form model will pull most recent values then start listening</p> |

<a name="FormModel+stopUpdating"></a>

### formModel.stopUpdating()
<p>This will stop the form model from listening to its object models.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
<a name="FormModel+resetUpdating"></a>

### formModel.resetUpdating()
<p>If updating, it will reset the updating events to match the current mappings.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
<a name="FormModel+isModelStale"></a>

### formModel.isModelStale(model, [staleModels], [currentHashValues]) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: <code>boolean</code> - <p>true if the model passed in has been changed since the last pull from the object model.</p>  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>Backbone.Model</code> | <p>the backbone model that is being checked</p> |
| [staleModels] | <code>Object</code> | <p>a hash that will be updated to contain this model if it is stale in the form: cid -&gt; model.</p> |
| [currentHashValues] | <code>Object</code> | <p>If passed an object, it will look in this cache for the current value of the object model<br>  instead of calculating it. It should be key'ed by the model's cid</p> |

<a name="FormModel+checkIfModelsAreStale"></a>

### formModel.checkIfModelsAreStale() ⇒ <code>Array</code>
**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Returns**: <code>Array</code> - <p>an array of the object models that have been updated since the last pull from this form model</p>  
<a name="FormModel+preValidate"></a>

### formModel.preValidate(attr, [value]) ⇒ <code>undefined</code> \| <code>string</code> \| <code>Object</code>
<p>Check whether an attribute or a set of attributes are valid. It will default to use the model's current values but<br>you can pass in different values to use in the validation process instead.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>preValidate</code>](#validationMixin.preValidate)  
**Returns**: <code>undefined</code> \| <code>string</code> \| <code>Object</code> - <p>undefined if no errors, a validation exception if a single attribute, or an object with attribute name as key<br>and the error as the value</p>  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> \| <code>Object</code> \| <code>Array.&lt;string&gt;</code> | <p>Either the name of the attribute, an array containing many attribute names, or<br>on object with attribute name to values</p> |
| [value] | <code>Any</code> | <p>a value to use for the attribute value instead of using the model's value.</p> |

<a name="FormModel+isValid"></a>

### formModel.isValid()
<p>Check to see if an attribute, an array of attributes or the<br>entire model is valid. Passing true will force a validation<br>of the model.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>isValid</code>](#validationMixin.isValid)  
<a name="FormModel+validate"></a>

### formModel.validate()
<p>This is called by Backbone when it needs to perform validation.<br>You can call it manually without any parameters to validate the<br>entire model.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>validate</code>](#validationMixin.validate)  
<a name="NestedModel+isPolling"></a>

### formModel.isPolling()
<p>Returns true if the poll is active</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>isPolling</code>](#pollingMixin.isPolling)  
<a name="NestedModel+startPolling"></a>

### formModel.startPolling(pollInterval)
<p>Starts polling Model/Collection by calling fetch every pollInterval.<br>Note: Each Model/Collection will only allow a singleton of polling to occur so<br>as not to have duplicate threads updating Model/Collection.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>startPolling</code>](#pollingMixin.startPolling)  

| Param | Type | Description |
| --- | --- | --- |
| pollInterval | <code>Integer</code> | <p>interval between each poll in ms.</p> |

<a name="NestedModel+stopPolling"></a>

### formModel.stopPolling()
<p>Stops polling Model and clears all Timeouts.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>stopPolling</code>](#pollingMixin.stopPolling)  
<a name="NestedModel+polledFetch"></a>

### formModel.polledFetch()
<p>By default, the polled fetching operation is routed directly<br>to backbone's fetch all.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>polledFetch</code>](#pollingMixin.polledFetch)  
<a name="NestedModel+dispose"></a>

### formModel.dispose()
<p>Default dispose for model-like objects (Models, Cells, and ServiceCells).<br>Removes listeners and calls out to _dispose() for child specific dispose logic.<br>Triggers 2 events - &quot;before-dispose&quot; and &quot;after-dispose&quot;.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>dispose</code>](#modelMixin.dispose)  
<a name="NestedModel+_dispose"></a>

### formModel.\_dispose()
<p>Dispose hook meant to be used by prototypes that extend this one that need to provide their own dispose logic.</p>

**Kind**: instance method of [<code>FormModel</code>](#FormModel)  
**Mixes**: [<code>\_dispose</code>](#modelMixin._dispose)  
<a name="FormView"></a>

## FormView ⇐ [<code>View</code>](#View)
**Kind**: global class  
**Extends**: [<code>View</code>](#View)  
**See**: <a href="../annotated/modules/FormView.html">FormView Annotated Source</a>  
**Author**: ariel.wexler@vecna.com  

* [FormView](#FormView) ⇐ [<code>View</code>](#View)
    * [new FormView(args)](#new_FormView_new)
    * [.template](#FormView+template) : [<code>Handlebars-Template</code>](#external_Handlebars-Template)
    * [.events](#FormView+events) : <code>Object</code>
    * [.fields](#FormView+fields) : <code>Object</code>
    * [.bindings](#FormView+bindings) : <code>Object</code>
    * [.FormModelClass](#FormView+FormModelClass) : <code>FormModel.prototype</code>
    * [.viewState](#View+viewState) : [<code>ViewStateCell</code>](#ViewStateCell)
    * [.prerender](#View+prerender) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [.postrender](#View+postrender) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [.attachTrackedViews](#View+attachTrackedViews) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [._attached](#View+_attached)
    * [._detached](#View+_detached)
    * [._activate](#View+_activate)
    * [._deactivate](#View+_deactivate)
    * [._dispose](#View+_dispose)
    * [.prepare()](#FormView+prepare) ⇒ <code>Object</code>
    * [.delegateEvents()](#FormView+delegateEvents)
    * [.resetModelListeners(model, [stopListening])](#FormView+resetModelListeners)
    * [.valid()](#FormView+valid)
    * [.invalid()](#FormView+invalid)
    * [.deactivate()](#FormView+deactivate)
    * [.get()](#View+get)
    * [.set()](#View+set)
    * [.has()](#View+has)
    * [.unset()](#View+unset)
    * [.toJSON()](#View+toJSON)
    * [.getBehavior(alias)](#View+getBehavior) ⇒ <code>Torso.Behavior</code>
    * [._prepare(context)](#View+_prepare) ⇒ <code>Object</code>
    * [.render()](#View+render) ⇒ <code>Promise</code>
    * [.updateDOM()](#View+updateDOM)
    * [.updateClassName(newClassName)](#View+updateClassName)
    * [.templateRender()](#View+templateRender)
    * [.undelegateEvents()](#View+undelegateEvents)
    * [.attachTo([$el], [options])](#View+attachTo) ⇒ <code>Promise</code>
    * [.attachView($el, view, [options])](#View+attachView) ⇒ <code>Promise</code>
    * [.isAttachedToParent()](#View+isAttachedToParent) ⇒ <code>boolean</code>
    * [.isAttached()](#View+isAttached) ⇒ <code>boolean</code>
    * [.detach()](#View+detach)
    * [.detachTrackedViews([options])](#View+detachTrackedViews)
    * [.activate()](#View+activate)
    * [.isActive()](#View+isActive) ⇒ <code>boolean</code>
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

<a name="new_FormView_new"></a>

### new FormView(args)
<p>Generic Form View</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| args | <code>Object</code> |  | <p>options argument</p> |
| [args.model] | [<code>FormModel</code>](#FormModel) | <code>new this.FormModelClass()</code> | <p>a form model for binding that defaults to class-level<br>                                                                  model or instantiates a FormModelClass</p> |
| [args.FormModelClass] | <code>function</code> | <code>FormModel</code> | <p>the class (that extends [FormModel](#FormModel)) that will be used as the FormModel. Defaults to a class-level<br>                                                    definition or [FormModel](#FormModel) if none is provided</p> |
| [args.template] | [<code>Handlebars-Template</code>](#external_Handlebars-Template) |  | <p>overrides the template used by this view</p> |
| [args.events] | <code>Object</code> |  | <p>events hash: merge + override the events hash used by this view</p> |
| [args.fields] | <code>Object</code> |  | <p>field hash: merge + override automated two-way binding field hash used by this view</p> |
| [args.bindings] | <code>Object</code> |  | <p>binding hash: merge + override custom epoxy binding hash used by this view</p> |

<a name="FormView+template"></a>

### formView.template : [<code>Handlebars-Template</code>](#external_Handlebars-Template)
<p>Handlebars template for form</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="FormView+events"></a>

### formView.events : <code>Object</code>
<p>Backbone events hash</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="FormView+fields"></a>

### formView.fields : <code>Object</code>
<p>Two-way binding field customization</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="FormView+bindings"></a>

### formView.bindings : <code>Object</code>
<p>Stickit bindings hash</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="FormView+FormModelClass"></a>

### formView.FormModelClass : <code>FormModel.prototype</code>
<p>The class to be used when instantiating the form model</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="View+viewState"></a>

### formView.viewState : [<code>ViewStateCell</code>](#ViewStateCell)
<p>Cell that can be used to save state for rendering the view.</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="View+prerender"></a>

### formView.prerender ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook during render that is invoked before any DOM rendering is performed.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.prerender.apply(this, arguments);<br>NOTE: if you require the view to be detached from the DOM, consider using _detach callback</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, prerender is finished. Note: render logic will not wait until promises are resolved.</p>  
<a name="View+postrender"></a>

### formView.postrender ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook during render that is invoked after all DOM rendering is done and tracked views attached.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.postrender.apply(this, arguments);<br>NOTE: if you require the view to be attached to the DOM, consider using _attach callback</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, postrender is finished. Note: render logic will not wait until promises are resolved.</p>  
<a name="View+attachTrackedViews"></a>

### formView.attachTrackedViews ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook to attach all your tracked views. This hook will be called after all DOM rendering is done so injection sites should be available.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.attachTrackedViews.apply(this, arguments);</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, all tracked views are attached. Useful when using this.attachView with useTransition=true.</p>  
<a name="View+_attached"></a>

### formView.\_attached
<p>Method to be invoked when the view is fully attached to the DOM (NOT just the parent). Use this method to manipulate the view<br>after the DOM has been attached to the document. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="View+_detached"></a>

### formView.\_detached
<p>Method to be invoked when the view is detached from the DOM (NOT just the parent). Use this method to clean up state<br>after the view has been removed from the document. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="View+_activate"></a>

### formView.\_activate
<p>Method to be invoked when activate is called. Use this method to turn on any<br>custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="View+_deactivate"></a>

### formView.\_deactivate
<p>Method to be invoked when deactivate is called. Use this method to turn off any<br>custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="View+_dispose"></a>

### formView.\_dispose
<p>Method to be invoked when dispose is called. By default calling dispose will remove the<br>view's element, its on's, listenTo's, and any registered children.<br>Override this method to destruct any extra</p>

**Kind**: instance property of [<code>FormView</code>](#FormView)  
<a name="FormView+prepare"></a>

### formView.prepare() ⇒ <code>Object</code>
<p>Prepare the formview's default render context</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Overrides**: [<code>prepare</code>](#View+prepare)  
**Returns**: <code>Object</code> - <p>{Object.errors} A hash of field names mapped to error messages<br>        {Object.success} A boolean value of true if validation has succeeded</p>  
<a name="FormView+delegateEvents"></a>

### formView.delegateEvents()
<p>Override the delegate events and wrap our custom additions</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Overrides**: [<code>delegateEvents</code>](#View+delegateEvents)  
<a name="FormView+resetModelListeners"></a>

### formView.resetModelListeners(model, [stopListening])
<p>Resets the form model with the passed in model. Stops listening to current form model<br>and sets up listeners on the new one.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| model | <code>Torso.FormModel</code> |  | <p>the new form model</p> |
| [stopListening] | <code>boolean</code> | <code>false</code> | <p>if true, it will stop listening to the previous form model</p> |

<a name="FormView+valid"></a>

### formView.valid()
<p>Default method called on validation success.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="FormView+invalid"></a>

### formView.invalid()
<p>Default method called on validation failure.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="FormView+deactivate"></a>

### formView.deactivate()
<p>Deactivate callback that removes bindings and other resources<br>that shouldn't exist in a dactivated state</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Overrides**: [<code>deactivate</code>](#View+deactivate)  
<a name="View+get"></a>

### formView.get()
<p>Alias to this.viewState.get()</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+set"></a>

### formView.set()
<p>Alias to this.viewState.set()</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+has"></a>

### formView.has()
<p>Alias to this.viewState.has()</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+unset"></a>

### formView.unset()
<p>Alias to this.viewState.unset()</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+toJSON"></a>

### formView.toJSON()
<p>Alias to this.viewState.toJSON()</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+getBehavior"></a>

### formView.getBehavior(alias) ⇒ <code>Torso.Behavior</code>
**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>Torso.Behavior</code> - <p>the behavior instance if one exists with that alias</p>  

| Param | Type | Description |
| --- | --- | --- |
| alias | <code>string</code> | <p>the name/alias of the behavior</p> |

<a name="View+_prepare"></a>

### formView.\_prepare(context) ⇒ <code>Object</code>
<p>Extension point to augment the template context with custom content.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>Object</code> - <p>[Optional] If you return an object, it will be merged with the context</p>  

| Param | Description |
| --- | --- |
| context | <p>the context you can modify</p> |

<a name="View+render"></a>

### formView.render() ⇒ <code>Promise</code>
<p>Rebuilds the html for this view's element. Should be able to be called at any time.<br>Defaults to using this.templateRender. Assumes that this.template is a javascript<br>function that accepted a single JSON context.<br>The render method returns a promise that resolves when rendering is complete. Typically render<br>is synchronous and the rendering is complete upon completion of the method. However, when utilizing<br>transitions/animations, the render process can be asynchronous and the promise is useful to know when it has finished.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>Promise</code> - <p>a promise that when resolved signifies that the rendering process is complete.</p>  
<a name="View+updateDOM"></a>

### formView.updateDOM()
<p>Produces and sets this view's elements DOM. Used during the rendering process. Override if you have custom DOM update logic.<br>Defaults to using the stanrdard: this.templateRender(this.$el, this.template, this.prepare(), templateRendererOptions);<br>this.templateRendererOptions is an object or function defined on the view that is passed into the renderer.<br>Examples include: views with no template or multiple templates, or if you wish to use a different rendering engine than the templateRenderer or wish to pass options to it.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+updateClassName"></a>

### formView.updateClassName(newClassName)
<p>Updates this view element's class attribute with the value provided.<br>If no value provided, removes the class attribute of this view element.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  

| Param | Type | Description |
| --- | --- | --- |
| newClassName | <code>string</code> | <p>the new value of the class attribute</p> |

<a name="View+templateRender"></a>

### formView.templateRender()
<p>Hotswap rendering system reroute method.<br>See Torso.templateRenderer#render for params</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+undelegateEvents"></a>

### formView.undelegateEvents()
<p>Overrides undelegateEvents<br>Unbinds DOM events from the view.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+attachTo"></a>

### formView.attachTo([$el], [options]) ⇒ <code>Promise</code>
<p>If detached, will replace the element passed in with this view's element and activate the view.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>Promise</code> - <p>promise that when resolved, the attach process is complete. Normally this method is synchronous. Transition effects can<br>                  make it asynchronous.</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [$el] | [<code>jQuery</code>](#external_jQuery) |  | <p>the element to attach to. This element will be replaced with this view.<br>                      If options.replaceMethod is provided, then this parameter is ignored.</p> |
| [options] | <code>Object</code> |  | <p>optional options</p> |
| [options.replaceMethod] | <code>Fucntion</code> |  | <p>if given, this view will invoke replaceMethod function<br>                                            in order to attach the view's DOM to the parent instead of calling $el.replaceWith</p> |
| [options.discardInjectionSite] | <code>Booleon</code> | <code>false</code> | <p>if set to true, the injection site is not saved.</p> |

<a name="View+attachView"></a>

### formView.attachView($el, view, [options]) ⇒ <code>Promise</code>
<p>Registers the view as a tracked view (defaulting as a child view), then calls view.attachTo with the element argument<br>The element argument can be a String that references an element with the corresponding &quot;inject&quot; attribute.<br>When using attachView with options.useTransition:<br>  Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view<br>  previously had another view at this injections site, this previous view will be removed with that view's transitionOut.<br>  If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even<br>  though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.<br>  If the previous view is the same as the new view, it is injected normally without transitioning in.<br>  The previous view must has used an injection site with the standard &quot;inject=<name of injection site>&quot; attribute to be found.<br>  When the transitionIn and transitionOut methods are invoked on the new and previous views, the options parameter will be passed on to them. Other fields<br>  will be added to the options parameter to allow better handling of the transitions. These include:<br>  {<br>    newView: the new view<br>    previousView: the previous view (can be undefined)<br>    parentView: the parent view transitioning in or out the tracked view<br>  }</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>Promise</code> - <p>resolved when all transitions are complete. No payload is provided upon resolution. If no transitions, then returns a resolved promise.</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| $el | [<code>jQuery</code>](#external_jQuery) \| <code>string</code> |  | <p>the element to attach to OR the name of the injection site. The element with the attribute &quot;inject=<name of injection site>&quot; will be used.</p> |
| view | [<code>View</code>](#View) |  | <p>The instantiated view object to be attached</p> |
| [options] | <code>Object</code> |  | <p>optionals options object. If using transitions, this options object will be passed on to the transitionIn and transitionOut methods as well.</p> |
| [options.noActivate] | <code>boolean</code> | <code>false</code> | <p>if set to true, the view will not be activated upon attaching.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>if set to true, the view will be treated as a shared view and not disposed during parent view disposing.</p> |
| [options.useTransition] | <code>boolean</code> | <code>false</code> | <p>if set to true, this method will delegate attach logic to this.__transitionNewViewIntoSite</p> |
| [options.addBefore] | <code>boolean</code> | <code>false</code> | <p>if true, and options.useTransition is true, the new view's element will be added before the previous view's element. Defaults to after.</p> |
| [options.previousView] | [<code>View</code>](#View) |  | <p>if using options.useTransition, then you can explicitly define the view that should be transitioned out.<br>                                       If using transitions and no previousView is provided, it will look to see if a view already is at this injection site and uses that by default.</p> |

<a name="View+isAttachedToParent"></a>

### formView.isAttachedToParent() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>boolean</code> - <p>true if the view is attached to a parent</p>  
<a name="View+isAttached"></a>

### formView.isAttached() ⇒ <code>boolean</code>
<p>NOTE: depends on a global variable &quot;document&quot;</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>boolean</code> - <p>true if the view is attached to the DOM</p>  
<a name="View+detach"></a>

### formView.detach()
<p>If attached, will detach the view from the DOM.<br>This method will only separate this view from the DOM it was attached to, but it WILL invoke the _detach<br>callback on each tracked view recursively.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+detachTrackedViews"></a>

### formView.detachTrackedViews([options])
<p>Detach all tracked views or a subset of them based on the options parameter.<br>NOTE: this is not recursive - it will not separate the entire view tree.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, detach only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, detach only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+activate"></a>

### formView.activate()
<p>Resets listeners and events in order for the view to be reattached to the visible DOM</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+isActive"></a>

### formView.isActive() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>boolean</code> - <p>true if the view is active</p>  
<a name="View+dispose"></a>

### formView.dispose()
<p>Removes all listeners, disposes children views, stops listening to events, removes DOM.<br>After dispose is called, the view can be safely garbage collected. Called while<br>recursively removing views from the hierarchy.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
<a name="View+isDisposed"></a>

### formView.isDisposed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>boolean</code> - <p>true if the view was disposed</p>  
<a name="View+hasTrackedViews"></a>

### formView.hasTrackedViews([options]) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <code>boolean</code> - <p>true if this view has tracked views (limited by the options parameter)</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, only check the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, only check the child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+getTrackedViews"></a>

### formView.getTrackedViews([options]) ⇒ [<code>List.&lt;View&gt;</code>](#View)
<p>Returns all tracked views, both child views and shared views.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: [<code>List.&lt;View&gt;</code>](#View) - <p>all tracked views (filtered by options parameter)</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, get only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, get only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+getTrackedView"></a>

### formView.getTrackedView(viewCID) ⇒
**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: <p>the view with the given cid.  Will look in both shared and child views.</p>  

| Param | Type | Description |
| --- | --- | --- |
| viewCID | <code>string</code> | <p>the cid of the view</p> |

<a name="View+registerTrackedView"></a>

### formView.registerTrackedView(view, [options]) ⇒ [<code>View</code>](#View)
<p>Binds the view as a tracked view - any recursive calls like activate, deactivate, or dispose will<br>be done to the tracked view as well.  Except dispose for shared views. This method defaults to register the<br>view as a child view unless specified by options.shared.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| view | [<code>View</code>](#View) |  | <p>the tracked view</p> |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, registers view as a shared view. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed. If false, registers view as a child view which are disposed when the parent is disposed.</p> |

<a name="View+unregisterTrackedView"></a>

### formView.unregisterTrackedView(view) ⇒ [<code>View</code>](#View)
<p>Unbinds the tracked view - no recursive calls will be made to this shared view</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Description |
| --- | --- | --- |
| view | [<code>View</code>](#View) | <p>the shared view</p> |

<a name="View+unregisterTrackedViews"></a>

### formView.unregisterTrackedViews([options]) ⇒ [<code>View</code>](#View)
<p>Unbinds all tracked view - no recursive calls will be made to this shared view<br>You can limit the types of views that will be unregistered by using the options parameter.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, unregister only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, unregister only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+transitionOut"></a>

### formView.transitionOut(done, options)
<p>Override to provide your own transition out logic. Default logic is to just detach from the page.<br>The method is passed a callback that should be invoked when the transition out has fully completed.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  

| Param | Type | Description |
| --- | --- | --- |
| done | <code>function</code> | <p>callback that MUST be invoked when the transition is complete.</p> |
| options |  | <p>optionals options object</p> |
| options.currentView | [<code>View</code>](#View) | <p>the view that is being transitioned in.</p> |
| options.previousView | [<code>View</code>](#View) | <p>the view that is being transitioned out. Typically this view.</p> |
| options.parentView | [<code>View</code>](#View) | <p>the view that is invoking the transition.</p> |

<a name="View+transitionIn"></a>

### formView.transitionIn(attach, done, options)
<p>Override to provide your own transition in logic. Default logic is to just attach to the page.<br>The method is passed a callback that should be invoked when the transition in has fully completed.</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  

| Param | Type | Description |
| --- | --- | --- |
| attach | <code>function</code> | <p>callback to be invoked when you want this view to be attached to the dom.<br>                                If you are trying to transition in a tracked view, consider using this.transitionInView()</p> |
| done | <code>function</code> | <p>callback that MUST be invoked when the transition is complete.</p> |
| options |  | <p>optionals options object</p> |
| options.currentView | [<code>View</code>](#View) | <p>the view that is being transitioned in.</p> |
| options.previousView | [<code>View</code>](#View) | <p>the view that is being transitioned out. Typically this view.</p> |
| options.parentView | [<code>View</code>](#View) | <p>the view that is invoking the transition.</p> |

<a name="View+invokeFeedback"></a>

### formView.invokeFeedback(to, [evt], [indexMap])
<p>Invokes a feedback entry's &quot;then&quot; method</p>

**Kind**: instance method of [<code>FormView</code>](#FormView)  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | <p>the &quot;to&quot; field corresponding to the feedback entry to be invoked.</p> |
| [evt] | <code>Event</code> | <p>the event to be passed to the &quot;then&quot; method</p> |
| [indexMap] | <code>Object</code> | <p>a map from index variable name to index value. Needed for &quot;to&quot; fields with array notation.</p> |

<a name="ListView"></a>

## ListView ⇐ [<code>View</code>](#View)
**Kind**: global class  
**Extends**: [<code>View</code>](#View)  
**See**: <a href="../annotated/modules/ListView.html">ListView Annotated Source</a>  
**Author**: ariel.wexler@vecna.com, kent.willis@vecna.com  

* [ListView](#ListView) ⇐ [<code>View</code>](#View)
    * [new ListView()](#new_ListView_new)
    * [.collection](#ListView+collection) : [<code>Collection</code>](#Collection)
    * [.itemView](#ListView+itemView) : [<code>View</code>](#View) \| <code>function</code>
    * [.template](#ListView+template) : [<code>Handlebars-Template</code>](#external_Handlebars-Template)
    * [.emptyTemplate](#ListView+emptyTemplate) : [<code>Handlebars-Template</code>](#external_Handlebars-Template)
    * [.itemContainer](#ListView+itemContainer) : <code>String</code>
    * [.viewState](#View+viewState) : [<code>ViewStateCell</code>](#ViewStateCell)
    * [.prerender](#View+prerender) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [.postrender](#View+postrender) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [.attachTrackedViews](#View+attachTrackedViews) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * [._attached](#View+_attached)
    * [._detached](#View+_detached)
    * [._activate](#View+_activate)
    * [._deactivate](#View+_deactivate)
    * [._dispose](#View+_dispose)
    * [.constructor(args)](#ListView+constructor)
    * [.setCollection(collection, preventUpdate)](#ListView+setCollection)
    * [.renderChildViews()](#ListView+renderChildViews)
    * [.reorder()](#ListView+reorder)
    * [.prepareEmpty()](#ListView+prepareEmpty) ⇒
    * [.modelsToRender()](#ListView+modelsToRender)
    * [.update()](#ListView+update)
    * [.getItemViewFromModel(model)](#ListView+getItemViewFromModel) ⇒
    * [.hasItemViews()](#ListView+hasItemViews) ⇒ <code>boolean</code>
    * [.getItemViews()](#ListView+getItemViews) ⇒ [<code>Array.&lt;View&gt;</code>](#View)
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

<a name="new_ListView_new"></a>

### new ListView()
<p>A view that is backed by a collection that managers views per model in the collection.</p>

<a name="ListView+collection"></a>

### listView.collection : [<code>Collection</code>](#Collection)
<p>The collection that holds the models that this list view will track</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
**Properties**

| Name |
| --- |
| collection | 

<a name="ListView+itemView"></a>

### listView.itemView : [<code>View</code>](#View) \| <code>function</code>
<p>The item view class definition that will be instantiated for each model in the list.<br>itemView can also be a function that takes a model and returns a view class. This allows<br>for different view classes depending on the model.</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
**Properties**

| Name |
| --- |
| itemView | 

<a name="ListView+template"></a>

### listView.template : [<code>Handlebars-Template</code>](#external_Handlebars-Template)
<p>The template that allows a list view to hold it's own HTML like filter buttons, etc.</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
**Properties**

| Name |
| --- |
| template | 

<a name="ListView+emptyTemplate"></a>

### listView.emptyTemplate : [<code>Handlebars-Template</code>](#external_Handlebars-Template)
<p>If provided, this template that will be shown if the modelsToRender() method returns<br>an empty list. If an itemContainer is provided, the empty template will be rendered there.</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
**Properties**

| Name |
| --- |
| emptyTemplate | 

<a name="ListView+itemContainer"></a>

### listView.itemContainer : <code>String</code>
<p>(Required if 'template' is provided, ignored otherwise) name of injection site for list of item views</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
**Properties**

| Name |
| --- |
| itemContainer | 

<a name="View+viewState"></a>

### listView.viewState : [<code>ViewStateCell</code>](#ViewStateCell)
<p>Cell that can be used to save state for rendering the view.</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
<a name="View+prerender"></a>

### listView.prerender ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook during render that is invoked before any DOM rendering is performed.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.prerender.apply(this, arguments);<br>NOTE: if you require the view to be detached from the DOM, consider using _detach callback</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, prerender is finished. Note: render logic will not wait until promises are resolved.</p>  
<a name="View+postrender"></a>

### listView.postrender ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook during render that is invoked after all DOM rendering is done and tracked views attached.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.postrender.apply(this, arguments);<br>NOTE: if you require the view to be attached to the DOM, consider using _attach callback</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, postrender is finished. Note: render logic will not wait until promises are resolved.</p>  
<a name="View+attachTrackedViews"></a>

### listView.attachTrackedViews ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook to attach all your tracked views. This hook will be called after all DOM rendering is done so injection sites should be available.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.attachTrackedViews.apply(this, arguments);</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, all tracked views are attached. Useful when using this.attachView with useTransition=true.</p>  
<a name="View+_attached"></a>

### listView.\_attached
<p>Method to be invoked when the view is fully attached to the DOM (NOT just the parent). Use this method to manipulate the view<br>after the DOM has been attached to the document. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
<a name="View+_detached"></a>

### listView.\_detached
<p>Method to be invoked when the view is detached from the DOM (NOT just the parent). Use this method to clean up state<br>after the view has been removed from the document. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
<a name="View+_activate"></a>

### listView.\_activate
<p>Method to be invoked when activate is called. Use this method to turn on any<br>custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
<a name="View+_deactivate"></a>

### listView.\_deactivate
<p>Method to be invoked when deactivate is called. Use this method to turn off any<br>custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
<a name="View+_dispose"></a>

### listView.\_dispose
<p>Method to be invoked when dispose is called. By default calling dispose will remove the<br>view's element, its on's, listenTo's, and any registered children.<br>Override this method to destruct any extra</p>

**Kind**: instance property of [<code>ListView</code>](#ListView)  
<a name="ListView+constructor"></a>

### listView.constructor(args)
<p>Constructor for the list view object.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| args | <code>Object</code> |  | <p>options argument</p> |
| args.itemView | [<code>Backbone-View</code>](#external_Backbone-View) \| <code>function</code> |  | <p>the class definition of the item view. This view will be instantiated for every model returned by modelsToRender(). If a function is passed in, then for each model, this function will be invoked to find the appropriate view class. It takes the model as the only parameter.</p> |
| args.collection | [<code>Backbone-Collection</code>](#external_Backbone-Collection) |  | <p>The collection that will back this list view. A subclass of list view might provide a default collection. Can be private or public collection</p> |
| [args.itemContext] | <code>Object</code> \| <code>function</code> |  | <p>object or function that's passed to the item view's during initialization under the name &quot;context&quot;. Can be used by the item view during their prepare method.</p> |
| [args.template] | [<code>Handlebars-Template</code>](#external_Handlebars-Template) |  | <p>allows a list view to hold it's own HTML like filter buttons, etc.</p> |
| [args.itemContainer] | <code>string</code> |  | <p>(Required if 'template' is provided, ignored otherwise) name of injection site for list of item views</p> |
| [args.emptyTemplate] | [<code>Handlebars-Template</code>](#external_Handlebars-Template) |  | <p>if provided, this template will be shown if the modelsToRender() method returns an empty list. If a itemContainer is provided, the empty template will be rendered there.</p> |
| [args.modelsToRender] | <code>function</code> |  | <p>If provided, this function will override the modelsToRender() method with custom functionality.</p> |
| [args.renderWait] | <code>number</code> | <code>0</code> | <p>If provided, will collect any internally invoked renders (typically through collection events like reset) for a duration specified by renderWait in milliseconds and then calls a single render instead. Helps to remove unnecessary render calls when modifying the collection often.</p> |
| [args.modelId] | <code>string</code> | <code>&quot;&#x27;cid&#x27;&quot;</code> | <p>one of ('cid' or 'id'): model property used as identifier for a given model. This property is saved and used to find the corresponding view.</p> |
| [args.modelName] | <code>string</code> | <code>&quot;&#x27;model&#x27;&quot;</code> | <p>name of the model argument passed to the item view during initialization</p> |

<a name="ListView+setCollection"></a>

### listView.setCollection(collection, preventUpdate)
<p>Sets the collection from which this view generates item views.<br>This method will attach all necessary event listeners to the new collection to auto-generate item views<br>and has the option of removing listeners on a previous collection. It will immediately update child<br>views and re-render if it is necessary - this behavior can be prevented with preventUpdate argument</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  

| Param | Type | Description |
| --- | --- | --- |
| collection | [<code>Backbone-Collection</code>](#external_Backbone-Collection) | <p>the new collection that this list view should use.</p> |
| preventUpdate | <code>boolean</code> | <p>if true, the list view will not update the child views nor rerender.</p> |

<a name="ListView+renderChildViews"></a>

### listView.renderChildViews()
<p>Loops through children views and renders them</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="ListView+reorder"></a>

### listView.reorder()
<p>Takes existing item views and moves them into correct order defined by<br>this.modelsToRender(). NOTE: As this method doesn't generate or remove views,<br>this method takes advantage of jquery's ability to move elements already attached to the DOM.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="ListView+prepareEmpty"></a>

### listView.prepareEmpty() ⇒
<p>Override if you want a different context for your empty template. Defaults to this.prepare()</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <p>a context that can be used by the empty list template</p>  
<a name="ListView+modelsToRender"></a>

### listView.modelsToRender()
<p>Returns an array of which models should be rendered.<br>By default, all models in the input collection will be<br>shown.  Extensions of this class may override this<br>method to apply collection filters.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="ListView+update"></a>

### listView.update()
<p>Builds any new views, removes stale ones, and re-renders</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="ListView+getItemViewFromModel"></a>

### listView.getItemViewFromModel(model) ⇒
<p>Returns the view that corresponds to the model if one exists</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <p>the item view corresponding to the model</p>  

| Param | Type | Description |
| --- | --- | --- |
| model | [<code>Model</code>](#Model) | <p>the model</p> |

<a name="ListView+hasItemViews"></a>

### listView.hasItemViews() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>boolean</code> - <p>returns true if there exists any generated item views</p>  
<a name="ListView+getItemViews"></a>

### listView.getItemViews() ⇒ [<code>Array.&lt;View&gt;</code>](#View)
**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: [<code>Array.&lt;View&gt;</code>](#View) - <p>Returns unordered list of views generated by this list view</p>  
<a name="View+get"></a>

### listView.get()
<p>Alias to this.viewState.get()</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+set"></a>

### listView.set()
<p>Alias to this.viewState.set()</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+has"></a>

### listView.has()
<p>Alias to this.viewState.has()</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+unset"></a>

### listView.unset()
<p>Alias to this.viewState.unset()</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+toJSON"></a>

### listView.toJSON()
<p>Alias to this.viewState.toJSON()</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+getBehavior"></a>

### listView.getBehavior(alias) ⇒ <code>Torso.Behavior</code>
**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>Torso.Behavior</code> - <p>the behavior instance if one exists with that alias</p>  

| Param | Type | Description |
| --- | --- | --- |
| alias | <code>string</code> | <p>the name/alias of the behavior</p> |

<a name="View+prepare"></a>

### listView.prepare() ⇒ <code>Object</code>
<p>prepareFields can be used to augment the default render method contents.<br>See __getPrepareFieldsContext() for more details on how to configure them.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>Object</code> - <p>context for a render method. Defaults to:<br>   {view: this.viewState.toJSON(), model: this.model.toJSON()}</p>  
<a name="View+_prepare"></a>

### listView.\_prepare(context) ⇒ <code>Object</code>
<p>Extension point to augment the template context with custom content.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>Object</code> - <p>[Optional] If you return an object, it will be merged with the context</p>  

| Param | Description |
| --- | --- |
| context | <p>the context you can modify</p> |

<a name="View+render"></a>

### listView.render() ⇒ <code>Promise</code>
<p>Rebuilds the html for this view's element. Should be able to be called at any time.<br>Defaults to using this.templateRender. Assumes that this.template is a javascript<br>function that accepted a single JSON context.<br>The render method returns a promise that resolves when rendering is complete. Typically render<br>is synchronous and the rendering is complete upon completion of the method. However, when utilizing<br>transitions/animations, the render process can be asynchronous and the promise is useful to know when it has finished.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>Promise</code> - <p>a promise that when resolved signifies that the rendering process is complete.</p>  
<a name="View+updateDOM"></a>

### listView.updateDOM()
<p>Produces and sets this view's elements DOM. Used during the rendering process. Override if you have custom DOM update logic.<br>Defaults to using the stanrdard: this.templateRender(this.$el, this.template, this.prepare(), templateRendererOptions);<br>this.templateRendererOptions is an object or function defined on the view that is passed into the renderer.<br>Examples include: views with no template or multiple templates, or if you wish to use a different rendering engine than the templateRenderer or wish to pass options to it.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Overrides**: [<code>updateDOM</code>](#View+updateDOM)  
<a name="View+updateClassName"></a>

### listView.updateClassName(newClassName)
<p>Updates this view element's class attribute with the value provided.<br>If no value provided, removes the class attribute of this view element.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  

| Param | Type | Description |
| --- | --- | --- |
| newClassName | <code>string</code> | <p>the new value of the class attribute</p> |

<a name="View+templateRender"></a>

### listView.templateRender()
<p>Hotswap rendering system reroute method.<br>See Torso.templateRenderer#render for params</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+delegateEvents"></a>

### listView.delegateEvents()
<p>Overrides the base delegateEvents<br>Binds DOM events with the view using events hash while also adding feedback event bindings</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+undelegateEvents"></a>

### listView.undelegateEvents()
<p>Overrides undelegateEvents<br>Unbinds DOM events from the view.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+attachTo"></a>

### listView.attachTo([$el], [options]) ⇒ <code>Promise</code>
<p>If detached, will replace the element passed in with this view's element and activate the view.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>Promise</code> - <p>promise that when resolved, the attach process is complete. Normally this method is synchronous. Transition effects can<br>                  make it asynchronous.</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [$el] | [<code>jQuery</code>](#external_jQuery) |  | <p>the element to attach to. This element will be replaced with this view.<br>                      If options.replaceMethod is provided, then this parameter is ignored.</p> |
| [options] | <code>Object</code> |  | <p>optional options</p> |
| [options.replaceMethod] | <code>Fucntion</code> |  | <p>if given, this view will invoke replaceMethod function<br>                                            in order to attach the view's DOM to the parent instead of calling $el.replaceWith</p> |
| [options.discardInjectionSite] | <code>Booleon</code> | <code>false</code> | <p>if set to true, the injection site is not saved.</p> |

<a name="View+attachView"></a>

### listView.attachView($el, view, [options]) ⇒ <code>Promise</code>
<p>Registers the view as a tracked view (defaulting as a child view), then calls view.attachTo with the element argument<br>The element argument can be a String that references an element with the corresponding &quot;inject&quot; attribute.<br>When using attachView with options.useTransition:<br>  Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view<br>  previously had another view at this injections site, this previous view will be removed with that view's transitionOut.<br>  If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even<br>  though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.<br>  If the previous view is the same as the new view, it is injected normally without transitioning in.<br>  The previous view must has used an injection site with the standard &quot;inject=<name of injection site>&quot; attribute to be found.<br>  When the transitionIn and transitionOut methods are invoked on the new and previous views, the options parameter will be passed on to them. Other fields<br>  will be added to the options parameter to allow better handling of the transitions. These include:<br>  {<br>    newView: the new view<br>    previousView: the previous view (can be undefined)<br>    parentView: the parent view transitioning in or out the tracked view<br>  }</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>Promise</code> - <p>resolved when all transitions are complete. No payload is provided upon resolution. If no transitions, then returns a resolved promise.</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| $el | [<code>jQuery</code>](#external_jQuery) \| <code>string</code> |  | <p>the element to attach to OR the name of the injection site. The element with the attribute &quot;inject=<name of injection site>&quot; will be used.</p> |
| view | [<code>View</code>](#View) |  | <p>The instantiated view object to be attached</p> |
| [options] | <code>Object</code> |  | <p>optionals options object. If using transitions, this options object will be passed on to the transitionIn and transitionOut methods as well.</p> |
| [options.noActivate] | <code>boolean</code> | <code>false</code> | <p>if set to true, the view will not be activated upon attaching.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>if set to true, the view will be treated as a shared view and not disposed during parent view disposing.</p> |
| [options.useTransition] | <code>boolean</code> | <code>false</code> | <p>if set to true, this method will delegate attach logic to this.__transitionNewViewIntoSite</p> |
| [options.addBefore] | <code>boolean</code> | <code>false</code> | <p>if true, and options.useTransition is true, the new view's element will be added before the previous view's element. Defaults to after.</p> |
| [options.previousView] | [<code>View</code>](#View) |  | <p>if using options.useTransition, then you can explicitly define the view that should be transitioned out.<br>                                       If using transitions and no previousView is provided, it will look to see if a view already is at this injection site and uses that by default.</p> |

<a name="View+isAttachedToParent"></a>

### listView.isAttachedToParent() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>boolean</code> - <p>true if the view is attached to a parent</p>  
<a name="View+isAttached"></a>

### listView.isAttached() ⇒ <code>boolean</code>
<p>NOTE: depends on a global variable &quot;document&quot;</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>boolean</code> - <p>true if the view is attached to the DOM</p>  
<a name="View+detach"></a>

### listView.detach()
<p>If attached, will detach the view from the DOM.<br>This method will only separate this view from the DOM it was attached to, but it WILL invoke the _detach<br>callback on each tracked view recursively.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+detachTrackedViews"></a>

### listView.detachTrackedViews([options])
<p>Detach all tracked views or a subset of them based on the options parameter.<br>NOTE: this is not recursive - it will not separate the entire view tree.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, detach only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, detach only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+activate"></a>

### listView.activate()
<p>Resets listeners and events in order for the view to be reattached to the visible DOM</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+isActive"></a>

### listView.isActive() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>boolean</code> - <p>true if the view is active</p>  
<a name="View+deactivate"></a>

### listView.deactivate()
<p>Maintains view state and DOM but prevents view from becoming a zombie by removing listeners<br>and events that may affect user experience. Recursively invokes deactivate on child views</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+dispose"></a>

### listView.dispose()
<p>Removes all listeners, disposes children views, stops listening to events, removes DOM.<br>After dispose is called, the view can be safely garbage collected. Called while<br>recursively removing views from the hierarchy.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
<a name="View+isDisposed"></a>

### listView.isDisposed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>boolean</code> - <p>true if the view was disposed</p>  
<a name="View+hasTrackedViews"></a>

### listView.hasTrackedViews([options]) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <code>boolean</code> - <p>true if this view has tracked views (limited by the options parameter)</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, only check the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, only check the child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+getTrackedViews"></a>

### listView.getTrackedViews([options]) ⇒ [<code>List.&lt;View&gt;</code>](#View)
<p>Returns all tracked views, both child views and shared views.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: [<code>List.&lt;View&gt;</code>](#View) - <p>all tracked views (filtered by options parameter)</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, get only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, get only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+getTrackedView"></a>

### listView.getTrackedView(viewCID) ⇒
**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: <p>the view with the given cid.  Will look in both shared and child views.</p>  

| Param | Type | Description |
| --- | --- | --- |
| viewCID | <code>string</code> | <p>the cid of the view</p> |

<a name="View+registerTrackedView"></a>

### listView.registerTrackedView(view, [options]) ⇒ [<code>View</code>](#View)
<p>Binds the view as a tracked view - any recursive calls like activate, deactivate, or dispose will<br>be done to the tracked view as well.  Except dispose for shared views. This method defaults to register the<br>view as a child view unless specified by options.shared.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| view | [<code>View</code>](#View) |  | <p>the tracked view</p> |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, registers view as a shared view. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed. If false, registers view as a child view which are disposed when the parent is disposed.</p> |

<a name="View+unregisterTrackedView"></a>

### listView.unregisterTrackedView(view) ⇒ [<code>View</code>](#View)
<p>Unbinds the tracked view - no recursive calls will be made to this shared view</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Description |
| --- | --- | --- |
| view | [<code>View</code>](#View) | <p>the shared view</p> |

<a name="View+unregisterTrackedViews"></a>

### listView.unregisterTrackedViews([options]) ⇒ [<code>View</code>](#View)
<p>Unbinds all tracked view - no recursive calls will be made to this shared view<br>You can limit the types of views that will be unregistered by using the options parameter.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, unregister only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, unregister only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+transitionOut"></a>

### listView.transitionOut(done, options)
<p>Override to provide your own transition out logic. Default logic is to just detach from the page.<br>The method is passed a callback that should be invoked when the transition out has fully completed.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  

| Param | Type | Description |
| --- | --- | --- |
| done | <code>function</code> | <p>callback that MUST be invoked when the transition is complete.</p> |
| options |  | <p>optionals options object</p> |
| options.currentView | [<code>View</code>](#View) | <p>the view that is being transitioned in.</p> |
| options.previousView | [<code>View</code>](#View) | <p>the view that is being transitioned out. Typically this view.</p> |
| options.parentView | [<code>View</code>](#View) | <p>the view that is invoking the transition.</p> |

<a name="View+transitionIn"></a>

### listView.transitionIn(attach, done, options)
<p>Override to provide your own transition in logic. Default logic is to just attach to the page.<br>The method is passed a callback that should be invoked when the transition in has fully completed.</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  

| Param | Type | Description |
| --- | --- | --- |
| attach | <code>function</code> | <p>callback to be invoked when you want this view to be attached to the dom.<br>                                If you are trying to transition in a tracked view, consider using this.transitionInView()</p> |
| done | <code>function</code> | <p>callback that MUST be invoked when the transition is complete.</p> |
| options |  | <p>optionals options object</p> |
| options.currentView | [<code>View</code>](#View) | <p>the view that is being transitioned in.</p> |
| options.previousView | [<code>View</code>](#View) | <p>the view that is being transitioned out. Typically this view.</p> |
| options.parentView | [<code>View</code>](#View) | <p>the view that is invoking the transition.</p> |

<a name="View+invokeFeedback"></a>

### listView.invokeFeedback(to, [evt], [indexMap])
<p>Invokes a feedback entry's &quot;then&quot; method</p>

**Kind**: instance method of [<code>ListView</code>](#ListView)  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | <p>the &quot;to&quot; field corresponding to the feedback entry to be invoked.</p> |
| [evt] | <code>Event</code> | <p>the event to be passed to the &quot;then&quot; method</p> |
| [indexMap] | <code>Object</code> | <p>a map from index variable name to index value. Needed for &quot;to&quot; fields with array notation.</p> |

<a name="Model"></a>

## Model ⇐ [<code>Backbone-Model</code>](#external_Backbone-Model)
**Kind**: global class  
**Extends**: [<code>Backbone-Model</code>](#external_Backbone-Model)  
**Mixes**: [<code>pollingMixin</code>](#pollingMixin), [<code>modelMixin</code>](#modelMixin)  
**See**: <a href="../annotated/modules/Model.html">Model Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [Model](#Model) ⇐ [<code>Backbone-Model</code>](#external_Backbone-Model)
    * [new Model(attributes, [options])](#new_Model_new)
    * [.pollTimeoutId](#Model+pollTimeoutId)
    * [.isPolling()](#Model+isPolling)
    * [.startPolling(pollInterval)](#Model+startPolling)
    * [.stopPolling()](#Model+stopPolling)
    * [.polledFetch()](#Model+polledFetch)
    * [.dispose()](#Model+dispose)
    * [._dispose()](#Model+_dispose)

<a name="new_Model_new"></a>

### new Model(attributes, [options])
<p>Generic Model</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes | <code>Object</code> |  | <p>the initial attributes to use for this model.</p> |
| [options] | <code>Object</code> | <code>{}</code> | <p>the options for setting up this model.</p> |
| [options.register] | <code>boolean</code> | <code>false</code> | <p>whether to register this model in the app-level registry.<br>                                            By default this will NOT add it to the registry unless set to true because<br>                                            we have not mechanism that will make sure the models get removed from the registry<br>                                            at the appropriate times.</p> |

<a name="Model+pollTimeoutId"></a>

### model.pollTimeoutId
**Kind**: instance property of [<code>Model</code>](#Model)  
**Mixes**: [<code>pollTimeoutId</code>](#pollingMixin.pollTimeoutId)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pollTimeoutId | <code>number</code> | <p>The id from when setTimeout was called to start polling.</p> |

<a name="Model+isPolling"></a>

### model.isPolling()
<p>Returns true if the poll is active</p>

**Kind**: instance method of [<code>Model</code>](#Model)  
**Mixes**: [<code>isPolling</code>](#pollingMixin.isPolling)  
<a name="Model+startPolling"></a>

### model.startPolling(pollInterval)
<p>Starts polling Model/Collection by calling fetch every pollInterval.<br>Note: Each Model/Collection will only allow a singleton of polling to occur so<br>as not to have duplicate threads updating Model/Collection.</p>

**Kind**: instance method of [<code>Model</code>](#Model)  
**Mixes**: [<code>startPolling</code>](#pollingMixin.startPolling)  

| Param | Type | Description |
| --- | --- | --- |
| pollInterval | <code>Integer</code> | <p>interval between each poll in ms.</p> |

<a name="Model+stopPolling"></a>

### model.stopPolling()
<p>Stops polling Model and clears all Timeouts.</p>

**Kind**: instance method of [<code>Model</code>](#Model)  
**Mixes**: [<code>stopPolling</code>](#pollingMixin.stopPolling)  
<a name="Model+polledFetch"></a>

### model.polledFetch()
<p>By default, the polled fetching operation is routed directly<br>to backbone's fetch all.</p>

**Kind**: instance method of [<code>Model</code>](#Model)  
**Mixes**: [<code>polledFetch</code>](#pollingMixin.polledFetch)  
<a name="Model+dispose"></a>

### model.dispose()
<p>Default dispose for model-like objects (Models, Cells, and ServiceCells).<br>Removes listeners and calls out to _dispose() for child specific dispose logic.<br>Triggers 2 events - &quot;before-dispose&quot; and &quot;after-dispose&quot;.</p>

**Kind**: instance method of [<code>Model</code>](#Model)  
**Mixes**: [<code>dispose</code>](#modelMixin.dispose)  
<a name="Model+_dispose"></a>

### model.\_dispose()
<p>Dispose hook meant to be used by prototypes that extend this one that need to provide their own dispose logic.</p>

**Kind**: instance method of [<code>Model</code>](#Model)  
**Mixes**: [<code>\_dispose</code>](#modelMixin._dispose)  
<a name="NestedCell"></a>

## NestedCell ⇐ [<code>NestedModel</code>](#NestedModel)
**Kind**: global class  
**Extends**: [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>cellMixin</code>](#cellMixin)  
**See**: <a href="../annotated/modules/NestedCell.html">NestedCell Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [NestedCell](#NestedCell) ⇐ [<code>NestedModel</code>](#NestedModel)
    * [new NestedCell(attributes, [options])](#new_NestedCell_new)
    * [.isModelCompatible](#NestedCell+isModelCompatible)
    * [.pollTimeoutId](#NestedModel+pollTimeoutId)
    * [.save()](#NestedCell+save)
    * [.fetch()](#NestedCell+fetch)
    * [.sync()](#NestedCell+sync)
    * [.url()](#NestedCell+url)
    * [.isPolling()](#NestedModel+isPolling)
    * [.startPolling(pollInterval)](#NestedModel+startPolling)
    * [.stopPolling()](#NestedModel+stopPolling)
    * [.polledFetch()](#NestedModel+polledFetch)
    * [.dispose()](#NestedModel+dispose)
    * [._dispose()](#NestedModel+_dispose)

<a name="new_NestedCell_new"></a>

### new NestedCell(attributes, [options])
<p>Generic Nested Cell</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes | <code>Object</code> |  | <p>the initial attributes to use for this cell.</p> |
| [options] | <code>Object</code> | <code>{}</code> | <p>the options for setting up this cell.</p> |
| [options.register] | <code>boolean</code> | <code>false</code> | <p>whether to register this cell in the app-level registry.<br>                                            By default this will NOT add it to the registry unless set to true because<br>                                            we have not mechanism that will make sure the models get removed from the registry<br>                                            at the appropriate times.</p> |

<a name="NestedCell+isModelCompatible"></a>

### nestedCell.isModelCompatible
<p>Whether a cell can pass as a model or not.<br>If true, the cell will not fail is persisted functions are invoked<br>If false, the cell will throw exceptions if persisted function are invoked</p>

**Kind**: instance property of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>isModelCompatible</code>](#cellMixin.isModelCompatible)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| isModelCompatible | <code>boolean</code> | 

<a name="NestedModel+pollTimeoutId"></a>

### nestedCell.pollTimeoutId
**Kind**: instance property of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>pollTimeoutId</code>](#pollingMixin.pollTimeoutId)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pollTimeoutId | <code>number</code> | <p>The id from when setTimeout was called to start polling.</p> |

<a name="NestedCell+save"></a>

### nestedCell.save()
<p>Override and disable the save function</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>save</code>](#cellMixin.save)  
<a name="NestedCell+fetch"></a>

### nestedCell.fetch()
<p>Override and disable the fetch function</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>fetch</code>](#cellMixin.fetch)  
<a name="NestedCell+sync"></a>

### nestedCell.sync()
<p>Override and disable the sync function</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>sync</code>](#cellMixin.sync)  
<a name="NestedCell+url"></a>

### nestedCell.url()
<p>Override and disable the url</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>url</code>](#cellMixin.url)  
<a name="NestedModel+isPolling"></a>

### nestedCell.isPolling()
<p>Returns true if the poll is active</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>isPolling</code>](#pollingMixin.isPolling)  
<a name="NestedModel+startPolling"></a>

### nestedCell.startPolling(pollInterval)
<p>Starts polling Model/Collection by calling fetch every pollInterval.<br>Note: Each Model/Collection will only allow a singleton of polling to occur so<br>as not to have duplicate threads updating Model/Collection.</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>startPolling</code>](#pollingMixin.startPolling)  

| Param | Type | Description |
| --- | --- | --- |
| pollInterval | <code>Integer</code> | <p>interval between each poll in ms.</p> |

<a name="NestedModel+stopPolling"></a>

### nestedCell.stopPolling()
<p>Stops polling Model and clears all Timeouts.</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>stopPolling</code>](#pollingMixin.stopPolling)  
<a name="NestedModel+polledFetch"></a>

### nestedCell.polledFetch()
<p>By default, the polled fetching operation is routed directly<br>to backbone's fetch all.</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>polledFetch</code>](#pollingMixin.polledFetch)  
<a name="NestedModel+dispose"></a>

### nestedCell.dispose()
<p>Default dispose for model-like objects (Models, Cells, and ServiceCells).<br>Removes listeners and calls out to _dispose() for child specific dispose logic.<br>Triggers 2 events - &quot;before-dispose&quot; and &quot;after-dispose&quot;.</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>dispose</code>](#modelMixin.dispose)  
<a name="NestedModel+_dispose"></a>

### nestedCell.\_dispose()
<p>Dispose hook meant to be used by prototypes that extend this one that need to provide their own dispose logic.</p>

**Kind**: instance method of [<code>NestedCell</code>](#NestedCell)  
**Mixes**: [<code>\_dispose</code>](#modelMixin._dispose)  
<a name="NestedModel"></a>

## NestedModel ⇐ [<code>Backbone-NestedModel</code>](#external_Backbone-NestedModel)
**Kind**: global class  
**Extends**: [<code>Backbone-NestedModel</code>](#external_Backbone-NestedModel)  
**Mixes**: [<code>pollingMixin</code>](#pollingMixin), [<code>modelMixin</code>](#modelMixin)  
**See**: <a href="../annotated/modules/NestedModel.html">NestedModel Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [NestedModel](#NestedModel) ⇐ [<code>Backbone-NestedModel</code>](#external_Backbone-NestedModel)
    * [new NestedModel(attributes, [options])](#new_NestedModel_new)
    * [.pollTimeoutId](#NestedModel+pollTimeoutId)
    * [.isPolling()](#NestedModel+isPolling)
    * [.startPolling(pollInterval)](#NestedModel+startPolling)
    * [.stopPolling()](#NestedModel+stopPolling)
    * [.polledFetch()](#NestedModel+polledFetch)
    * [.dispose()](#NestedModel+dispose)
    * [._dispose()](#NestedModel+_dispose)

<a name="new_NestedModel_new"></a>

### new NestedModel(attributes, [options])
<p>Generic Nested Model</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes | <code>Object</code> |  | <p>the initial attributes to use for this model.</p> |
| [options] | <code>Object</code> | <code>{}</code> | <p>the options for setting up this model.</p> |
| [options.register] | <code>boolean</code> | <code>false</code> | <p>whether to register this model in the app-level registry.<br>                                            By default this will NOT add it to the registry unless set to true because<br>                                            we have not mechanism that will make sure the models get removed from the registry<br>                                            at the appropriate times.</p> |

<a name="NestedModel+pollTimeoutId"></a>

### nestedModel.pollTimeoutId
**Kind**: instance property of [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>pollTimeoutId</code>](#pollingMixin.pollTimeoutId)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pollTimeoutId | <code>number</code> | <p>The id from when setTimeout was called to start polling.</p> |

<a name="NestedModel+isPolling"></a>

### nestedModel.isPolling()
<p>Returns true if the poll is active</p>

**Kind**: instance method of [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>isPolling</code>](#pollingMixin.isPolling)  
<a name="NestedModel+startPolling"></a>

### nestedModel.startPolling(pollInterval)
<p>Starts polling Model/Collection by calling fetch every pollInterval.<br>Note: Each Model/Collection will only allow a singleton of polling to occur so<br>as not to have duplicate threads updating Model/Collection.</p>

**Kind**: instance method of [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>startPolling</code>](#pollingMixin.startPolling)  

| Param | Type | Description |
| --- | --- | --- |
| pollInterval | <code>Integer</code> | <p>interval between each poll in ms.</p> |

<a name="NestedModel+stopPolling"></a>

### nestedModel.stopPolling()
<p>Stops polling Model and clears all Timeouts.</p>

**Kind**: instance method of [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>stopPolling</code>](#pollingMixin.stopPolling)  
<a name="NestedModel+polledFetch"></a>

### nestedModel.polledFetch()
<p>By default, the polled fetching operation is routed directly<br>to backbone's fetch all.</p>

**Kind**: instance method of [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>polledFetch</code>](#pollingMixin.polledFetch)  
<a name="NestedModel+dispose"></a>

### nestedModel.dispose()
<p>Default dispose for model-like objects (Models, Cells, and ServiceCells).<br>Removes listeners and calls out to _dispose() for child specific dispose logic.<br>Triggers 2 events - &quot;before-dispose&quot; and &quot;after-dispose&quot;.</p>

**Kind**: instance method of [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>dispose</code>](#modelMixin.dispose)  
<a name="NestedModel+_dispose"></a>

### nestedModel.\_dispose()
<p>Dispose hook meant to be used by prototypes that extend this one that need to provide their own dispose logic.</p>

**Kind**: instance method of [<code>NestedModel</code>](#NestedModel)  
**Mixes**: [<code>\_dispose</code>](#modelMixin._dispose)  
<a name="Router"></a>

## Router ⇐ [<code>Backbone-Router</code>](#external_Backbone-Router)
**Kind**: global class  
**Extends**: [<code>Backbone-Router</code>](#external_Backbone-Router)  
**See**: <a href="../annotated/modules/Router.html">Router Annotated Source</a>  
**Author**: kent.willis@vecna.com  
<a name="new_Router_new"></a>

### new Router()
<p>Backbone's router.</p>

<a name="ServiceCell"></a>

## ServiceCell ⇐ [<code>Cell</code>](#Cell)
**Kind**: global class  
**Extends**: [<code>Cell</code>](#Cell)  
**See**: <a href="../annotated/modules/ServiceCell.html">ServiceCell Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [ServiceCell](#ServiceCell) ⇐ [<code>Cell</code>](#Cell)
    * [new ServiceCell(attributes, [options])](#new_ServiceCell_new)
    * [.isModelCompatible](#Cell+isModelCompatible)
    * [.save()](#Cell+save)
    * [.fetch()](#Cell+fetch)
    * [.sync()](#Cell+sync)
    * [.url()](#Cell+url)

<a name="new_ServiceCell_new"></a>

### new ServiceCell(attributes, [options])
<p>A service cell is a event listening and event emitting object that is independent of any model or view.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attributes | <code>Object</code> |  | <p>the initial attributes to use for this service.</p> |
| [options] | <code>Object</code> | <code>{}</code> | <p>the options for setting up this service.</p> |
| [options.register] | <code>boolean</code> | <code>true</code> | <p>whether to register this service in the app-level registry.<br>                                           By default this WILL add it to the registry unless set to false because<br>                                           most services are global so holding on to them beyond</p> |

<a name="Cell+isModelCompatible"></a>

### serviceCell.isModelCompatible
<p>Whether a cell can pass as a model or not.<br>If true, the cell will not fail is persisted functions are invoked<br>If false, the cell will throw exceptions if persisted function are invoked</p>

**Kind**: instance property of [<code>ServiceCell</code>](#ServiceCell)  
**Mixes**: [<code>isModelCompatible</code>](#cellMixin.isModelCompatible)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| isModelCompatible | <code>boolean</code> | 

<a name="Cell+save"></a>

### serviceCell.save()
<p>Override and disable the save function</p>

**Kind**: instance method of [<code>ServiceCell</code>](#ServiceCell)  
**Mixes**: [<code>save</code>](#cellMixin.save)  
<a name="Cell+fetch"></a>

### serviceCell.fetch()
<p>Override and disable the fetch function</p>

**Kind**: instance method of [<code>ServiceCell</code>](#ServiceCell)  
**Mixes**: [<code>fetch</code>](#cellMixin.fetch)  
<a name="Cell+sync"></a>

### serviceCell.sync()
<p>Override and disable the sync function</p>

**Kind**: instance method of [<code>ServiceCell</code>](#ServiceCell)  
**Mixes**: [<code>sync</code>](#cellMixin.sync)  
<a name="Cell+url"></a>

### serviceCell.url()
<p>Override and disable the url</p>

**Kind**: instance method of [<code>ServiceCell</code>](#ServiceCell)  
**Mixes**: [<code>url</code>](#cellMixin.url)  
<a name="ViewStateCell"></a>

## ViewStateCell ⇐ [<code>NestedCell</code>](#NestedCell)
**Kind**: global class  
**Extends**: [<code>NestedCell</code>](#NestedCell)  
**See**: <a href="../annotated/modules/View.html">View Annotated Source</a>  

* [ViewStateCell](#ViewStateCell) ⇐ [<code>NestedCell</code>](#NestedCell)
    * [new ViewStateCell(attrs, opts)](#new_ViewStateCell_new)
    * [.isModelCompatible](#NestedCell+isModelCompatible)
    * [.pollTimeoutId](#NestedModel+pollTimeoutId)
    * [.trigger()](#ViewStateCell+trigger)
    * [.save()](#NestedCell+save)
    * [.fetch()](#NestedCell+fetch)
    * [.sync()](#NestedCell+sync)
    * [.url()](#NestedCell+url)
    * [.isPolling()](#NestedModel+isPolling)
    * [.startPolling(pollInterval)](#NestedModel+startPolling)
    * [.stopPolling()](#NestedModel+stopPolling)
    * [.polledFetch()](#NestedModel+polledFetch)
    * [.dispose()](#NestedModel+dispose)
    * [._dispose()](#NestedModel+_dispose)

<a name="new_ViewStateCell_new"></a>

### new ViewStateCell(attrs, opts)
<p>ViewStateCell is a NestedCell that holds view state data and can trigger<br>change events. These change events will propogate up and trigger on the view<br>as well.</p>


| Param | Type | Description |
| --- | --- | --- |
| attrs | <code>Object</code> | <p>the initial values to set on the cell - inherited from [NestedCell](#NestedCell).</p> |
| opts | <code>Object</code> | <p>options for the cell.</p> |
| opts.view | [<code>Backbone-View</code>](#external_Backbone-View) | <p>the view that these options are tied to.</p> |

<a name="NestedCell+isModelCompatible"></a>

### viewStateCell.isModelCompatible
<p>Whether a cell can pass as a model or not.<br>If true, the cell will not fail is persisted functions are invoked<br>If false, the cell will throw exceptions if persisted function are invoked</p>

**Kind**: instance property of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>isModelCompatible</code>](#cellMixin.isModelCompatible)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| isModelCompatible | <code>boolean</code> | 

<a name="NestedModel+pollTimeoutId"></a>

### viewStateCell.pollTimeoutId
**Kind**: instance property of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>pollTimeoutId</code>](#pollingMixin.pollTimeoutId)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pollTimeoutId | <code>number</code> | <p>The id from when setTimeout was called to start polling.</p> |

<a name="ViewStateCell+trigger"></a>

### viewStateCell.trigger()
<p>Retrigger view state change events on the view as well.</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
<a name="NestedCell+save"></a>

### viewStateCell.save()
<p>Override and disable the save function</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>save</code>](#cellMixin.save)  
<a name="NestedCell+fetch"></a>

### viewStateCell.fetch()
<p>Override and disable the fetch function</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>fetch</code>](#cellMixin.fetch)  
<a name="NestedCell+sync"></a>

### viewStateCell.sync()
<p>Override and disable the sync function</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>sync</code>](#cellMixin.sync)  
<a name="NestedCell+url"></a>

### viewStateCell.url()
<p>Override and disable the url</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>url</code>](#cellMixin.url)  
<a name="NestedModel+isPolling"></a>

### viewStateCell.isPolling()
<p>Returns true if the poll is active</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>isPolling</code>](#pollingMixin.isPolling)  
<a name="NestedModel+startPolling"></a>

### viewStateCell.startPolling(pollInterval)
<p>Starts polling Model/Collection by calling fetch every pollInterval.<br>Note: Each Model/Collection will only allow a singleton of polling to occur so<br>as not to have duplicate threads updating Model/Collection.</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>startPolling</code>](#pollingMixin.startPolling)  

| Param | Type | Description |
| --- | --- | --- |
| pollInterval | <code>Integer</code> | <p>interval between each poll in ms.</p> |

<a name="NestedModel+stopPolling"></a>

### viewStateCell.stopPolling()
<p>Stops polling Model and clears all Timeouts.</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>stopPolling</code>](#pollingMixin.stopPolling)  
<a name="NestedModel+polledFetch"></a>

### viewStateCell.polledFetch()
<p>By default, the polled fetching operation is routed directly<br>to backbone's fetch all.</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>polledFetch</code>](#pollingMixin.polledFetch)  
<a name="NestedModel+dispose"></a>

### viewStateCell.dispose()
<p>Default dispose for model-like objects (Models, Cells, and ServiceCells).<br>Removes listeners and calls out to _dispose() for child specific dispose logic.<br>Triggers 2 events - &quot;before-dispose&quot; and &quot;after-dispose&quot;.</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>dispose</code>](#modelMixin.dispose)  
<a name="NestedModel+_dispose"></a>

### viewStateCell.\_dispose()
<p>Dispose hook meant to be used by prototypes that extend this one that need to provide their own dispose logic.</p>

**Kind**: instance method of [<code>ViewStateCell</code>](#ViewStateCell)  
**Mixes**: [<code>\_dispose</code>](#modelMixin._dispose)  
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
<p>Overrides constructor to create needed fields and invoke activate/render after initialization</p>
<p>Generic View that deals with:</p>
<ul>
<li>Creation of private collections</li>
<li>Lifecycle of a view</li>
</ul>

<a name="View+viewState"></a>

### view.viewState : [<code>ViewStateCell</code>](#ViewStateCell)
<p>Cell that can be used to save state for rendering the view.</p>

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+prerender"></a>

### view.prerender ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook during render that is invoked before any DOM rendering is performed.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.prerender.apply(this, arguments);<br>NOTE: if you require the view to be detached from the DOM, consider using _detach callback</p>

**Kind**: instance property of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, prerender is finished. Note: render logic will not wait until promises are resolved.</p>  
<a name="View+postrender"></a>

### view.postrender ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook during render that is invoked after all DOM rendering is done and tracked views attached.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.postrender.apply(this, arguments);<br>NOTE: if you require the view to be attached to the DOM, consider using _attach callback</p>

**Kind**: instance property of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, postrender is finished. Note: render logic will not wait until promises are resolved.</p>  
<a name="View+attachTrackedViews"></a>

### view.attachTrackedViews ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
<p>Hook to attach all your tracked views. This hook will be called after all DOM rendering is done so injection sites should be available.<br>This method can be overwritten as usual OR extended using <baseClass>.prototype.attachTrackedViews.apply(this, arguments);</p>

**Kind**: instance property of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - <p>you can optionally return one or more promises that when all are resolved, all tracked views are attached. Useful when using this.attachView with useTransition=true.</p>  
<a name="View+_attached"></a>

### view.\_attached
<p>Method to be invoked when the view is fully attached to the DOM (NOT just the parent). Use this method to manipulate the view<br>after the DOM has been attached to the document. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+_detached"></a>

### view.\_detached
<p>Method to be invoked when the view is detached from the DOM (NOT just the parent). Use this method to clean up state<br>after the view has been removed from the document. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+_activate"></a>

### view.\_activate
<p>Method to be invoked when activate is called. Use this method to turn on any<br>custom timers, listenTo's or on's that should be activatable. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+_deactivate"></a>

### view.\_deactivate
<p>Method to be invoked when deactivate is called. Use this method to turn off any<br>custom timers, listenTo's or on's that should be deactivatable. The default implementation is a no-op.</p>

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+_dispose"></a>

### view.\_dispose
<p>Method to be invoked when dispose is called. By default calling dispose will remove the<br>view's element, its on's, listenTo's, and any registered children.<br>Override this method to destruct any extra</p>

**Kind**: instance property of [<code>View</code>](#View)  
<a name="View+get"></a>

### view.get()
<p>Alias to this.viewState.get()</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+set"></a>

### view.set()
<p>Alias to this.viewState.set()</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+has"></a>

### view.has()
<p>Alias to this.viewState.has()</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+unset"></a>

### view.unset()
<p>Alias to this.viewState.unset()</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+toJSON"></a>

### view.toJSON()
<p>Alias to this.viewState.toJSON()</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+getBehavior"></a>

### view.getBehavior(alias) ⇒ <code>Torso.Behavior</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Torso.Behavior</code> - <p>the behavior instance if one exists with that alias</p>  

| Param | Type | Description |
| --- | --- | --- |
| alias | <code>string</code> | <p>the name/alias of the behavior</p> |

<a name="View+prepare"></a>

### view.prepare() ⇒ <code>Object</code>
<p>prepareFields can be used to augment the default render method contents.<br>See __getPrepareFieldsContext() for more details on how to configure them.</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Object</code> - <p>context for a render method. Defaults to:<br>   {view: this.viewState.toJSON(), model: this.model.toJSON()}</p>  
<a name="View+_prepare"></a>

### view.\_prepare(context) ⇒ <code>Object</code>
<p>Extension point to augment the template context with custom content.</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Object</code> - <p>[Optional] If you return an object, it will be merged with the context</p>  

| Param | Description |
| --- | --- |
| context | <p>the context you can modify</p> |

<a name="View+render"></a>

### view.render() ⇒ <code>Promise</code>
<p>Rebuilds the html for this view's element. Should be able to be called at any time.<br>Defaults to using this.templateRender. Assumes that this.template is a javascript<br>function that accepted a single JSON context.<br>The render method returns a promise that resolves when rendering is complete. Typically render<br>is synchronous and the rendering is complete upon completion of the method. However, when utilizing<br>transitions/animations, the render process can be asynchronous and the promise is useful to know when it has finished.</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> - <p>a promise that when resolved signifies that the rendering process is complete.</p>  
<a name="View+updateDOM"></a>

### view.updateDOM()
<p>Produces and sets this view's elements DOM. Used during the rendering process. Override if you have custom DOM update logic.<br>Defaults to using the stanrdard: this.templateRender(this.$el, this.template, this.prepare(), templateRendererOptions);<br>this.templateRendererOptions is an object or function defined on the view that is passed into the renderer.<br>Examples include: views with no template or multiple templates, or if you wish to use a different rendering engine than the templateRenderer or wish to pass options to it.</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+updateClassName"></a>

### view.updateClassName(newClassName)
<p>Updates this view element's class attribute with the value provided.<br>If no value provided, removes the class attribute of this view element.</p>

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Description |
| --- | --- | --- |
| newClassName | <code>string</code> | <p>the new value of the class attribute</p> |

<a name="View+templateRender"></a>

### view.templateRender()
<p>Hotswap rendering system reroute method.<br>See Torso.templateRenderer#render for params</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+delegateEvents"></a>

### view.delegateEvents()
<p>Overrides the base delegateEvents<br>Binds DOM events with the view using events hash while also adding feedback event bindings</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+undelegateEvents"></a>

### view.undelegateEvents()
<p>Overrides undelegateEvents<br>Unbinds DOM events from the view.</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+attachTo"></a>

### view.attachTo([$el], [options]) ⇒ <code>Promise</code>
<p>If detached, will replace the element passed in with this view's element and activate the view.</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> - <p>promise that when resolved, the attach process is complete. Normally this method is synchronous. Transition effects can<br>                  make it asynchronous.</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [$el] | [<code>jQuery</code>](#external_jQuery) |  | <p>the element to attach to. This element will be replaced with this view.<br>                      If options.replaceMethod is provided, then this parameter is ignored.</p> |
| [options] | <code>Object</code> |  | <p>optional options</p> |
| [options.replaceMethod] | <code>Fucntion</code> |  | <p>if given, this view will invoke replaceMethod function<br>                                            in order to attach the view's DOM to the parent instead of calling $el.replaceWith</p> |
| [options.discardInjectionSite] | <code>Booleon</code> | <code>false</code> | <p>if set to true, the injection site is not saved.</p> |

<a name="View+attachView"></a>

### view.attachView($el, view, [options]) ⇒ <code>Promise</code>
<p>Registers the view as a tracked view (defaulting as a child view), then calls view.attachTo with the element argument<br>The element argument can be a String that references an element with the corresponding &quot;inject&quot; attribute.<br>When using attachView with options.useTransition:<br>  Will inject a new view into an injection site by using the new view's transitionIn method. If the parent view<br>  previously had another view at this injections site, this previous view will be removed with that view's transitionOut.<br>  If this method is used within a render, the current views' injection sites will be cached so they can be transitioned out even<br>  though they are detached in the process of re-rendering. If no previous view is given and none can be found, the new view is transitioned in regardless.<br>  If the previous view is the same as the new view, it is injected normally without transitioning in.<br>  The previous view must has used an injection site with the standard &quot;inject=<name of injection site>&quot; attribute to be found.<br>  When the transitionIn and transitionOut methods are invoked on the new and previous views, the options parameter will be passed on to them. Other fields<br>  will be added to the options parameter to allow better handling of the transitions. These include:<br>  {<br>    newView: the new view<br>    previousView: the previous view (can be undefined)<br>    parentView: the parent view transitioning in or out the tracked view<br>  }</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>Promise</code> - <p>resolved when all transitions are complete. No payload is provided upon resolution. If no transitions, then returns a resolved promise.</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| $el | [<code>jQuery</code>](#external_jQuery) \| <code>string</code> |  | <p>the element to attach to OR the name of the injection site. The element with the attribute &quot;inject=<name of injection site>&quot; will be used.</p> |
| view | [<code>View</code>](#View) |  | <p>The instantiated view object to be attached</p> |
| [options] | <code>Object</code> |  | <p>optionals options object. If using transitions, this options object will be passed on to the transitionIn and transitionOut methods as well.</p> |
| [options.noActivate] | <code>boolean</code> | <code>false</code> | <p>if set to true, the view will not be activated upon attaching.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>if set to true, the view will be treated as a shared view and not disposed during parent view disposing.</p> |
| [options.useTransition] | <code>boolean</code> | <code>false</code> | <p>if set to true, this method will delegate attach logic to this.__transitionNewViewIntoSite</p> |
| [options.addBefore] | <code>boolean</code> | <code>false</code> | <p>if true, and options.useTransition is true, the new view's element will be added before the previous view's element. Defaults to after.</p> |
| [options.previousView] | [<code>View</code>](#View) |  | <p>if using options.useTransition, then you can explicitly define the view that should be transitioned out.<br>                                       If using transitions and no previousView is provided, it will look to see if a view already is at this injection site and uses that by default.</p> |

<a name="View+isAttachedToParent"></a>

### view.isAttachedToParent() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - <p>true if the view is attached to a parent</p>  
<a name="View+isAttached"></a>

### view.isAttached() ⇒ <code>boolean</code>
<p>NOTE: depends on a global variable &quot;document&quot;</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - <p>true if the view is attached to the DOM</p>  
<a name="View+detach"></a>

### view.detach()
<p>If attached, will detach the view from the DOM.<br>This method will only separate this view from the DOM it was attached to, but it WILL invoke the _detach<br>callback on each tracked view recursively.</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+detachTrackedViews"></a>

### view.detachTrackedViews([options])
<p>Detach all tracked views or a subset of them based on the options parameter.<br>NOTE: this is not recursive - it will not separate the entire view tree.</p>

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, detach only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, detach only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+activate"></a>

### view.activate()
<p>Resets listeners and events in order for the view to be reattached to the visible DOM</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+isActive"></a>

### view.isActive() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - <p>true if the view is active</p>  
<a name="View+deactivate"></a>

### view.deactivate()
<p>Maintains view state and DOM but prevents view from becoming a zombie by removing listeners<br>and events that may affect user experience. Recursively invokes deactivate on child views</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+dispose"></a>

### view.dispose()
<p>Removes all listeners, disposes children views, stops listening to events, removes DOM.<br>After dispose is called, the view can be safely garbage collected. Called while<br>recursively removing views from the hierarchy.</p>

**Kind**: instance method of [<code>View</code>](#View)  
<a name="View+isDisposed"></a>

### view.isDisposed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - <p>true if the view was disposed</p>  
<a name="View+hasTrackedViews"></a>

### view.hasTrackedViews([options]) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <code>boolean</code> - <p>true if this view has tracked views (limited by the options parameter)</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, only check the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, only check the child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+getTrackedViews"></a>

### view.getTrackedViews([options]) ⇒ [<code>List.&lt;View&gt;</code>](#View)
<p>Returns all tracked views, both child views and shared views.</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>List.&lt;View&gt;</code>](#View) - <p>all tracked views (filtered by options parameter)</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, get only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, get only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+getTrackedView"></a>

### view.getTrackedView(viewCID) ⇒
**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: <p>the view with the given cid.  Will look in both shared and child views.</p>  

| Param | Type | Description |
| --- | --- | --- |
| viewCID | <code>string</code> | <p>the cid of the view</p> |

<a name="View+registerTrackedView"></a>

### view.registerTrackedView(view, [options]) ⇒ [<code>View</code>](#View)
<p>Binds the view as a tracked view - any recursive calls like activate, deactivate, or dispose will<br>be done to the tracked view as well.  Except dispose for shared views. This method defaults to register the<br>view as a child view unless specified by options.shared.</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| view | [<code>View</code>](#View) |  | <p>the tracked view</p> |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, registers view as a shared view. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed. If false, registers view as a child view which are disposed when the parent is disposed.</p> |

<a name="View+unregisterTrackedView"></a>

### view.unregisterTrackedView(view) ⇒ [<code>View</code>](#View)
<p>Unbinds the tracked view - no recursive calls will be made to this shared view</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Description |
| --- | --- | --- |
| view | [<code>View</code>](#View) | <p>the shared view</p> |

<a name="View+unregisterTrackedViews"></a>

### view.unregisterTrackedViews([options]) ⇒ [<code>View</code>](#View)
<p>Unbinds all tracked view - no recursive calls will be made to this shared view<br>You can limit the types of views that will be unregistered by using the options parameter.</p>

**Kind**: instance method of [<code>View</code>](#View)  
**Returns**: [<code>View</code>](#View) - <p>the tracked view</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | <p>Optional options.</p> |
| [options.shared] | <code>boolean</code> | <code>false</code> | <p>If true, unregister only the shared views. These are views not owned by this parent. As compared to a child view<br>                                          which are disposed when the parent is disposed.</p> |
| [options.child] | <code>boolean</code> | <code>false</code> | <p>If true, unregister only child views. These are views that are owned by the parent and dispose of them if the parent is disposed.</p> |

<a name="View+transitionOut"></a>

### view.transitionOut(done, options)
<p>Override to provide your own transition out logic. Default logic is to just detach from the page.<br>The method is passed a callback that should be invoked when the transition out has fully completed.</p>

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Description |
| --- | --- | --- |
| done | <code>function</code> | <p>callback that MUST be invoked when the transition is complete.</p> |
| options |  | <p>optionals options object</p> |
| options.currentView | [<code>View</code>](#View) | <p>the view that is being transitioned in.</p> |
| options.previousView | [<code>View</code>](#View) | <p>the view that is being transitioned out. Typically this view.</p> |
| options.parentView | [<code>View</code>](#View) | <p>the view that is invoking the transition.</p> |

<a name="View+transitionIn"></a>

### view.transitionIn(attach, done, options)
<p>Override to provide your own transition in logic. Default logic is to just attach to the page.<br>The method is passed a callback that should be invoked when the transition in has fully completed.</p>

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Description |
| --- | --- | --- |
| attach | <code>function</code> | <p>callback to be invoked when you want this view to be attached to the dom.<br>                                If you are trying to transition in a tracked view, consider using this.transitionInView()</p> |
| done | <code>function</code> | <p>callback that MUST be invoked when the transition is complete.</p> |
| options |  | <p>optionals options object</p> |
| options.currentView | [<code>View</code>](#View) | <p>the view that is being transitioned in.</p> |
| options.previousView | [<code>View</code>](#View) | <p>the view that is being transitioned out. Typically this view.</p> |
| options.parentView | [<code>View</code>](#View) | <p>the view that is invoking the transition.</p> |

<a name="View+invokeFeedback"></a>

### view.invokeFeedback(to, [evt], [indexMap])
<p>Invokes a feedback entry's &quot;then&quot; method</p>

**Kind**: instance method of [<code>View</code>](#View)  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>string</code> | <p>the &quot;to&quot; field corresponding to the feedback entry to be invoked.</p> |
| [evt] | <code>Event</code> | <p>the event to be passed to the &quot;then&quot; method</p> |
| [indexMap] | <code>Object</code> | <p>a map from index variable name to index value. Needed for &quot;to&quot; fields with array notation.</p> |

<a name="history"></a>

## history ⇐ [<code>Backbone-History</code>](#external_Backbone-History)
**Kind**: global class  
**Extends**: [<code>Backbone-History</code>](#external_Backbone-History)  
**See**: <a href="../annotated/modules/history.html">history Annotated Source</a>  
**Author**: kent.willis@vecna.com  
<a name="new_history_new"></a>

### new history()
<p>Backbone's history object.</p>

<a name="registry"></a>

## registry ⇐ [<code>Backbone-Events</code>](#external_Backbone-Events)
**Kind**: global class  
**Extends**: [<code>Backbone-Events</code>](#external_Backbone-Events)  
**See**: <a href="../annotated/modules/registry.html">registry Annotated Source</a>  
**Author**: jyoung@vecna.com  

* [registry](#registry) ⇐ [<code>Backbone-Events</code>](#external_Backbone-Events)
    * [new registry()](#new_registry_new)
    * [.cells](#registry+cells) : <code>Object.&lt;string, Cell&gt;</code>
    * [.models](#registry+models) : <code>Object.&lt;string, Model&gt;</code>
    * [.services](#registry+services) : <code>Object.&lt;string, ServiceCell&gt;</code>
    * [.views](#registry+views) : <code>Object.&lt;string, View&gt;</code>
    * [.cidPrefix](#registry+cidPrefix) : <code>string</code>
    * [.modelInitialized(model)](#registry+modelInitialized)
    * [.cellInitialized(cell)](#registry+cellInitialized)
    * [.viewInitialized(view)](#registry+viewInitialized)
    * [.serviceInitialized(service)](#registry+serviceInitialized)
    * [.disposeAll()](#registry+disposeAll)
    * [.disposeAllModels()](#registry+disposeAllModels)
    * [.disposeAllCells()](#registry+disposeAllCells)
    * [.disposeAllServices()](#registry+disposeAllServices)
    * [.disposeAllViews()](#registry+disposeAllViews)

<a name="new_registry_new"></a>

### new registry()
<p>Registry of instantiated Torso objects</p>

<a name="registry+cells"></a>

### registry.cells : <code>Object.&lt;string, Cell&gt;</code>
<p>The registered cells keyed by their unique cid.</p>

**Kind**: instance property of [<code>registry</code>](#registry)  
<a name="registry+models"></a>

### registry.models : <code>Object.&lt;string, Model&gt;</code>
<p>The registered models keyed by their unique cid.</p>

**Kind**: instance property of [<code>registry</code>](#registry)  
<a name="registry+services"></a>

### registry.services : <code>Object.&lt;string, ServiceCell&gt;</code>
<p>The registered services keyed by their unique cid.</p>

**Kind**: instance property of [<code>registry</code>](#registry)  
<a name="registry+views"></a>

### registry.views : <code>Object.&lt;string, View&gt;</code>
<p>The registered views keyed by their unique cid.</p>

**Kind**: instance property of [<code>registry</code>](#registry)  
<a name="registry+cidPrefix"></a>

### registry.cidPrefix : <code>string</code>
<p>The prefix to use for this object's cid.</p>

**Kind**: instance property of [<code>registry</code>](#registry)  
<a name="registry+modelInitialized"></a>

### registry.modelInitialized(model)
<p>Add the model to the model cache when it is initialized.</p>

**Kind**: instance method of [<code>registry</code>](#registry)  

| Param | Type | Description |
| --- | --- | --- |
| model | <code>Torso.Model</code> | <p>the model to add to the models cache.</p> |

<a name="registry+cellInitialized"></a>

### registry.cellInitialized(cell)
<p>Add the cell to the cell cache when it is initialized.</p>

**Kind**: instance method of [<code>registry</code>](#registry)  

| Param | Type | Description |
| --- | --- | --- |
| cell | <code>Torso.Cell</code> | <p>the cell to add to the cells cache.</p> |

<a name="registry+viewInitialized"></a>

### registry.viewInitialized(view)
<p>Add the view to the view cache when it is initialized.</p>

**Kind**: instance method of [<code>registry</code>](#registry)  

| Param | Type | Description |
| --- | --- | --- |
| view | <code>Torso.View</code> | <p>the view to add to the views cache.</p> |

<a name="registry+serviceInitialized"></a>

### registry.serviceInitialized(service)
<p>Add the service to the model service when it is initialized.</p>

**Kind**: instance method of [<code>registry</code>](#registry)  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>Torso.ServiceCell</code> | <p>the service to add to the services cache.</p> |

<a name="registry+disposeAll"></a>

### registry.disposeAll()
<p>Dispose of all items in all of the caches (Models, Cells, Services and Views).</p>

**Kind**: instance method of [<code>registry</code>](#registry)  
<a name="registry+disposeAllModels"></a>

### registry.disposeAllModels()
<p>Dispose of all items in the Models cache.</p>

**Kind**: instance method of [<code>registry</code>](#registry)  
<a name="registry+disposeAllCells"></a>

### registry.disposeAllCells()
<p>Dispose of all items in the Cells cache.</p>

**Kind**: instance method of [<code>registry</code>](#registry)  
<a name="registry+disposeAllServices"></a>

### registry.disposeAllServices()
<p>Dispose of all items in the Services cache.</p>

**Kind**: instance method of [<code>registry</code>](#registry)  
<a name="registry+disposeAllViews"></a>

### registry.disposeAllViews()
<p>Dispose of all items in the Views cache.</p>

**Kind**: instance method of [<code>registry</code>](#registry)  
<a name="DataBehavior"></a>

## DataBehavior ⇐ [<code>Behavior</code>](#Behavior)
**Kind**: global class  
**Extends**: [<code>Behavior</code>](#Behavior)  
**See**

- <a href="../annotated/modules/behaviors/DataBehavior.html">DataBehavior Annotated Source</a>
- <a href="../modules/behaviors/DATA_BEHAVIOR.html">Detailed docs</a> for more in-depth documentation and details.

**Author**: jyoung@vecna.com  

* [DataBehavior](#DataBehavior) ⇐ [<code>Behavior</code>](#Behavior)
    * [new DataBehavior()](#new_DataBehavior_new)
    * _instance_
        * [.alias](#Behavior+alias) : <code>string</code>
        * [.cidPrefix](#Behavior+cidPrefix) : <code>string</code>
        * [.mixin](#Behavior+mixin) : <code>Object</code>
        * [.prepare()](#Behavior+prepare) ⇒ <code>Object</code>
        * [._dispose()](#Behavior+_dispose)
        * [.isDisposed()](#Behavior+isDisposed) ⇒ <code>boolean</code>
    * _static_
        * [.cache](#DataBehavior.cache)
        * [.renderOnFetch](#DataBehavior.renderOnFetch)
        * [.skipInitialLoad](#DataBehavior.skipInitialLoad)
        * [.returnSingleResult](#DataBehavior.returnSingleResult)
        * [.alwaysFetch](#DataBehavior.alwaysFetch)
        * [.ids](#DataBehavior.ids)
        * [.updateEvents](#DataBehavior.updateEvents)
        * [.data](#DataBehavior.data)
        * [.FETCHED_STATUSES](#DataBehavior.FETCHED_STATUSES)
        * [.constructor([behaviorState], behaviorOptions, [viewOptions])](#DataBehavior.constructor)
        * [.retrieve()](#DataBehavior.retrieve) ⇒ <code>$.Deferred.Promise</code>
        * [.pull()](#DataBehavior.pull) ⇒ <code>$.Deferred.Promise</code>
        * [.fetch()](#DataBehavior.fetch) ⇒ <code>$.Deferred.Promise</code>
        * [.prepare()](#DataBehavior.prepare)
        * [.isLoading()](#DataBehavior.isLoading) ⇒ <code>boolean</code>
        * [.isLoadingIds()](#DataBehavior.isLoadingIds) ⇒ <code>boolean</code>
        * [.isLoadingObjects()](#DataBehavior.isLoadingObjects) ⇒ <code>boolean</code>
        * [.listenToIdsPropertyChangeEvent()](#DataBehavior.listenToIdsPropertyChangeEvent)
        * [.stopListeningToIdsPropertyChangeEvent()](#DataBehavior.stopListeningToIdsPropertyChangeEvent)
        * [.retrieveOncePromise()](#DataBehavior.retrieveOncePromise) ⇒ [<code>jQuery-Deferred</code>](#external_jQuery-Deferred)
    * _inner_
        * [~Data](#DataBehavior..Data)
            * [new Data()](#new_DataBehavior..Data_new)

<a name="new_DataBehavior_new"></a>

### new DataBehavior()
<p>This behavior implements simplified interaction with data sources (i.e. TorsoCollection).<br>This behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.<br>This behavior also manages dependencies between data and other objects to allow intelligent re-fetching when data changes.</p>

<a name="Behavior+alias"></a>

### dataBehavior.alias : <code>string</code>
<p>Unique name of the behavior instance w/in a view.  More human readable than the cid.</p>

**Kind**: instance property of [<code>DataBehavior</code>](#DataBehavior)  
<a name="Behavior+cidPrefix"></a>

### dataBehavior.cidPrefix : <code>string</code>
<p>cidPrefix of Behaviors</p>

**Kind**: instance property of [<code>DataBehavior</code>](#DataBehavior)  
<a name="Behavior+mixin"></a>

### dataBehavior.mixin : <code>Object</code>
<p>Add functions to be added to the view's public API. They will be behavior-scoped.</p>

**Kind**: instance property of [<code>DataBehavior</code>](#DataBehavior)  
<a name="Behavior+prepare"></a>

### dataBehavior.prepare() ⇒ <code>Object</code>
<p>The behavior's prepare result will be combined with the view's prepare with the behavior's alias as the namespace.<br>effectively: { [behaviorName]: behavior.prepare() } will be combined with the view's prepare result.</p>

**Kind**: instance method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>Object</code> - <p>a prepare context suitable to being added to the view's prepare result.</p>  
<a name="Behavior+_dispose"></a>

### dataBehavior.\_dispose()
<p>Method to be invoked when dispose is called. By default calling dispose will remove the<br>behavior's on's and listenTo's.<br>Override this method to destruct any extra</p>

**Kind**: instance method of [<code>DataBehavior</code>](#DataBehavior)  
<a name="Behavior+isDisposed"></a>

### dataBehavior.isDisposed() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>boolean</code> - <p>true if the view was disposed</p>  
<a name="DataBehavior.cache"></a>

### DataBehavior.cache
<p>The torso collection that is acting as a cache used to create the private collections.<br>This property/option is required.  Instantiation will fail if it is not set.</p>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Properties**

| Name | Type |
| --- | --- |
| cache | [<code>Collection</code>](#Collection) | 

<a name="DataBehavior.renderOnFetch"></a>

### DataBehavior.renderOnFetch
<p>Adds a listener on the Behavior for the <code>fetched</code> event that triggers a render on the view.<br>true - A listener is added to the behavior that re-renders the view when a 'fetched' event is triggered.<br>false (default) - no listeners are added.</p>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| renderOnFetch | <code>boolean</code> | 

<a name="DataBehavior.skipInitialLoad"></a>

### DataBehavior.skipInitialLoad
<p>Skip triggering a load of this data behavior when the view completes initializing.<br>true - no load after the view is initialized.<br>false (default) - trigger a .retrieve() on this data behavior when the view completes initialization.</p>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| skipInitialLoad | <code>boolean</code> | 

<a name="DataBehavior.returnSingleResult"></a>

### DataBehavior.returnSingleResult
<p>Determines the result of <code>view.getBehavior('thisBehaviorAlias').toJSON()</code>.<br>true - a single model result is returned.<br>false (default) - an array of model results are returned.</p>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| returnSingleResult | <code>boolean</code> | 

<a name="DataBehavior.alwaysFetch"></a>

### DataBehavior.alwaysFetch
<p>Determines whether <code>pull()</code> or <code>fetch()</code> is called when using <code>retrieve()</code>.<br>true - Use fetch() by default on the private collection.<br>false (default) - Use pull() by default on the private collection.<br>True will query the server more often, but will provide more up-to-date data.<br>False will only query the server if the model hasn't already been retrieved.<br>This property will be ignored if <code>fetch()</code> or <code>pull()</code> is called directly.</p>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| alwaysFetch | <code>boolean</code> | 

<a name="DataBehavior.ids"></a>

### DataBehavior.ids
<p>Duck-typed property that identifies the ids to use. id or ids is required (either by behavior options or as properties).</p>
<ul>
<li>{(string|number)} - the id to use directly (equivalent to an array of a single id).</li>
<li>{(string[]|number[])} - the ids to use directly.</li>
<li>{Object} - more complex configuration that identifies a model-like object that fires a change event and the<pre class="prettyprint source"><code>       property on that object to use. The object can fire the change event for the given property
       and have a .get('propertyName') method, or it can define the property directly on the idContainer.
       Only one property can be identified as supplying the id for this data model.
       If the identified object does not fire a change event then the id(s) will never be refreshed for this behavior.
       The idContainer can also fire a 'fetched:ids' event on itself to signal to this data behavior that the ids
       have been fetched for the first time.  Then a 'change:&lt;propertyName>' event can be used to notify this
       data behavior that the property has been modified.</code></pre><ul>
<li>property {string} - the name of the property that defines the ids. The root object is assumed to be the view unless<pre class="prettyprint source"><code>                idContainer is defined. The idContainer is the object that fires a change event for the given property name.
                Uses the view or the idContainer as the root to get the identified property (i.e. 'viewState.', 'model.', etc).
                Will get the property before the first '.' from the view and if it is an object will try to use a
                .get('&lt;propertyName>') on it and set a 'change:&lt;propertyName>' listener on it.
                If it is a string/number or array of string/number, then it will use that as the ids.
                Triggering a 'id-container-updated' event on the behavior will cause it to stop listing to the
                old idContainer and start listening to the new one defined by this property.</code></pre></li>
<li>idContainer {Cell|Backbone.Model|Function} - object (or a function that returns an object) that fires change<pre class="prettyprint source"><code>                events and has a .get('propertyName') function. It isn't required to fire events -
                the change event is only required if it needs to re-fetch when the id property value changes.</code></pre>Examples:<ul>
<li>{ property: '_patientId' }</li>
<li>{ property: 'viewState.appointmentId' }</li>
<li>{ property: 'model.type' }</li>
<li>{ property: 'behaviors.demographics.data.appointments' }</li>
<li>{ property: 'id', idContainer: userService }</li>
<li>{ property: 'username', idContainer: function() { application.getCurrentUser() } }</li>
</ul>
</li>
</ul>
</li>
<li><p>{Function(cache)} - expected to return the ids (either array, jquery deferred that resolves to the ids or single primitive)</p>
<pre class="prettyprint source"><code>                to track with the private collection. Cache is passed in as the first argument so that the behavior
                can be defined and the cache can be overridden later.
                'this' is the behavior (from which you can get the view if needed).
                What was criteria should use this instead:

function(cache) {
  var thisBehaviorInstance = this;
  var view = this.view;
  var criteria = { ... some criteria ... };
  return cache.fetchIdsByCriteria(criteria);
}</code></pre></li>
</ul>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Properties**

| Name | Type |
| --- | --- |
| ids | <code>string</code> \| <code>number</code> \| <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code> \| <code>function</code> | 

<a name="DataBehavior.updateEvents"></a>

### DataBehavior.updateEvents
<p>cause this behavior to re-calculate its ids and refetch them from the server if the given events are triggered<br>(space separated if string, single item is equivalent to array of single item).</p>
<ul>
<li>'view:eventName' - arbitrary event triggered on the view (eventName can be a change:propertyName event).</li>
<li>'viewState:eventName' - arbitrary event triggered on the viewState (eventName can be a change:propertyName event).</li>
<li>'model:eventName' - arbitrary even triggered on the view's model (eventName can be a change:propertyName event).</li>
<li>'this:eventName' - arbitrary event triggered by this behavior (eventName can be a change:propertyName event).</li>
<li>'behaviorAlias:eventName' - arbitrary event triggered by another data behavior on this view (eventName can be a change:propertyName event).</li>
<li>'behaviorAlias.data:eventName' - arbitrary event triggered by the data of another DataBehavior on this view (eventName can be a change:propertyName event).</li>
<li>{ '<eventName>': &lt; object (or function returning an object) that the event is triggered on &gt; } - arbitrary ('<eventName>') triggered on the supplied object.</li>
</ul>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Properties**

| Name | Type |
| --- | --- |
| updateEvents | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>Object</code> \| <code>Array.&lt;Object&gt;</code> | 

<a name="DataBehavior.data"></a>

### DataBehavior.data
<p>Object that manages interaction with the data.  Contains the privateCollection, proxies all events from the privateCollection,<br>and has get('...') and .toJSON() methods that access the private collection data.</p>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Properties**

| Name | Type |
| --- | --- |
| data | <code>Torso.behaviors.DataBehavior.Data</code> | 

<a name="DataBehavior.FETCHED_STATUSES"></a>

### DataBehavior.FETCHED\_STATUSES
<p>The possible fetched statuses.  This is the status value of the fetched event payload.</p>

**Kind**: static property of [<code>DataBehavior</code>](#DataBehavior)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| { | <code>Object</code> | <p>SUCCESS: 'SUCCESS', FAILURE: 'FAILURE' } FETCHED_STATUSES</p> |

<a name="DataBehavior.constructor"></a>

### DataBehavior.constructor([behaviorState], behaviorOptions, [viewOptions])
**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [behaviorState] | <code>Object</code> |  | <p>the initial state of the behavior.</p> |
| behaviorOptions | <code>Object</code> |  |  |
| behaviorOptions.cache | [<code>Collection</code>](#Collection) |  | <p>see cache property.</p> |
| [behaviorOptions.renderOnFetch] | <code>boolean</code> | <code>false</code> | <p>see renderOnFetch property.</p> |
| [behaviorOptions.skipInitialLoad] | <code>boolean</code> | <code>false</code> | <p>see skipInitialLoad property.</p> |
| [behaviorOptions.returnSingleResult] | <code>boolean</code> | <code>false</code> | <p>see returnSingleResult property.</p> |
| [behaviorOptions.alwaysFetch] | <code>boolean</code> | <code>false</code> | <p>see alwaysFetch property.</p> |
| [behaviorOptions.id] | <code>string</code> \| <code>number</code> \| <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code> \| <code>function</code> | <code>&quot;behaviorOptions.ids&quot;</code> | <p>see id property.</p> |
| [behaviorOptions.ids] | <code>string</code> \| <code>number</code> \| <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> \| <code>Object</code> \| <code>function</code> | <code>&quot;behaviorOptions.id&quot;</code> | <p>see ids property.</p> |
| [behaviorOptions.updateEvents] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>Object</code> \| <code>Array.&lt;Object&gt;</code> |  | <p>see updateEvents property.</p> |
| [viewOptions] | <code>Object</code> |  | <p>options passed to View's initialize</p> |

<a name="DataBehavior.retrieve"></a>

### DataBehavior.retrieve() ⇒ <code>$.Deferred.Promise</code>
<p>Retrieves the ids for this data object and passes them off to the private collection to track and then does a<br>pull or a fetch based on the alwaysFetch property.  (pull is default if always fetch is true then it fetches instead).</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>$.Deferred.Promise</code> - <p>a jquery deferred promise that resolves to the retrieved models.</p>  
<a name="DataBehavior.pull"></a>

### DataBehavior.pull() ⇒ <code>$.Deferred.Promise</code>
<p>Retrieves the ids for this data object and passes them off to the private collection's trackAndPull() method.</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>$.Deferred.Promise</code> - <p>a jquery deferred promise that resolves to the retrieved models.</p>  
<a name="DataBehavior.fetch"></a>

### DataBehavior.fetch() ⇒ <code>$.Deferred.Promise</code>
<p>Retrieves the ids for this data object and passes them off to the private collection's trackAndFetch() method.</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>$.Deferred.Promise</code> - <p>a jquery deferred promise that resolves to the retrieved models.</p>  
<a name="DataBehavior.prepare"></a>

### DataBehavior.prepare()
<p>Adds the toJSON of the data represented by this behavior to the context.</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
<a name="DataBehavior.isLoading"></a>

### DataBehavior.isLoading() ⇒ <code>boolean</code>
<p>Determine if the behavior is loading objects or ids.</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>boolean</code> - <p>true - the behavior is currently loading objects or ids.<br>                  false - the behavior is not currently loading objects or ids.</p>  
<a name="DataBehavior.isLoadingIds"></a>

### DataBehavior.isLoadingIds() ⇒ <code>boolean</code>
<p>Determine if the behavior is loading ids.</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>boolean</code> - <p>true - the behavior is currently loading ids.<br>                  false - the behavior is not currently loading ids.</p>  
<a name="DataBehavior.isLoadingObjects"></a>

### DataBehavior.isLoadingObjects() ⇒ <code>boolean</code>
<p>Determine if the behavior is loading objects.</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: <code>boolean</code> - <p>true - the behavior is currently loading objects.<br>                  false - the behavior is not currently loading objects.</p>  
<a name="DataBehavior.listenToIdsPropertyChangeEvent"></a>

### DataBehavior.listenToIdsPropertyChangeEvent()
<p>Listens for the change event on the ids property and, if triggered, re-fetches the data based on the new ids.</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
<a name="DataBehavior.stopListeningToIdsPropertyChangeEvent"></a>

### DataBehavior.stopListeningToIdsPropertyChangeEvent()
<p>Removes the listener added by listenToIdsPropertyChangeEvent().</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
<a name="DataBehavior.retrieveOncePromise"></a>

### DataBehavior.retrieveOncePromise() ⇒ [<code>jQuery-Deferred</code>](#external_jQuery-Deferred)
<p>This is a good way to have something be called after at least one retrieve (pull or fetch) has completed.<br>This is especially useful if you don't care if the fetch has already happen you just want to do something once<br>the data is loaded.</p>
<p>This can also be done purely by listening for the 'fetched' event, but you might miss the event if it is fired<br>before you start listening.  This gives a structure for handling that case so that your methods are called<br>if the event is fired and if it is not fired.</p>
<p>This also gives the ability to distinguish between a successful and failed fetch easily using the promises<br>resolve/reject handlers.</p>
<p>Usage:</p>
<p>someDataBehavior.retrieveOncePromise()<br>  .then(view.doSomethingWithTheData, view.handleFiledFetch);</p>

**Kind**: static method of [<code>DataBehavior</code>](#DataBehavior)  
**Returns**: [<code>jQuery-Deferred</code>](#external_jQuery-Deferred) - <p>that resolves when the data is successfully fetched and rejects when the fetch fails.</p>  
<a name="DataBehavior..Data"></a>

### DataBehavior~Data
**Kind**: inner class of [<code>DataBehavior</code>](#DataBehavior)  
<a name="new_DataBehavior..Data_new"></a>

#### new Data()
<p>Data object used to create the .data property of the DataBehavior.</p>

<a name="PrivateCollection"></a>

## PrivateCollection ⇐ [<code>Collection</code>](#Collection)
**Kind**: global class  
**Extends**: [<code>Collection</code>](#Collection)  

* [PrivateCollection](#PrivateCollection) ⇐ [<code>Collection</code>](#Collection)
    * [new PrivateCollection(parent, guid)](#new_PrivateCollection_new)
    * [.pollTimeoutId](#Collection+pollTimeoutId)
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
    * [.isPolling()](#Collection+isPolling)
    * [.startPolling(pollInterval)](#Collection+startPolling)
    * [.stopPolling()](#Collection+stopPolling)
    * [.polledFetch()](#Collection+polledFetch)
    * [.constructor([options])](#Collection+constructor)
    * [.hasLoadedOnce()](#Collection+hasLoadedOnce) ⇒ <code>boolean</code>
    * [.isLoading()](#Collection+isLoading) ⇒ <code>boolean</code>
    * [.getLoadedOncePromise()](#Collection+getLoadedOncePromise) ⇒ <code>Promise</code>
    * [.getRequesterIds(the)](#Collection+getRequesterIds) ⇒ <code>Array</code>
    * [.getRequesterIdsAsDictionary(guid)](#Collection+getRequesterIdsAsDictionary) ⇒ <code>Object</code>
    * [.removeRequester(guid)](#Collection+removeRequester)
    * [.getRequesters()](#Collection+getRequesters) ⇒ <code>Array</code>
    * [.getAllRequestedIds()](#Collection+getAllRequestedIds) ⇒ <code>Array</code>
    * [.createPrivateCollection(guid)](#Collection+createPrivateCollection) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
    * [.registerIds(newIds, guid)](#Collection+registerIds)

<a name="new_PrivateCollection_new"></a>

### new PrivateCollection(parent, guid)
<p>Returns a new class of collection that inherits from the parent but not the cacheMixin<br>and adds a requesterMixin that connects this cache to it's parent</p>


| Param | Type | Description |
| --- | --- | --- |
| parent | [<code>Backbone-Collection</code>](#external_Backbone-Collection) | <p>the parent of the private collection</p> |
| guid | <code>string</code> | <p>the unique code of the owner of this private collection</p> |

<a name="Collection+pollTimeoutId"></a>

### privateCollection.pollTimeoutId
**Kind**: instance property of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>pollTimeoutId</code>](#pollingMixin.pollTimeoutId)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pollTimeoutId | <code>number</code> | <p>The id from when setTimeout was called to start polling.</p> |

<a name="PrivateCollection+getTrackedIds"></a>

### privateCollection.getTrackedIds() ⇒ <code>Array</code>
**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: <code>Array</code> - <p>array of ids that this collection is tracking</p>  
<a name="PrivateCollection+fetch"></a>

### privateCollection.fetch([options]) ⇒ <code>Promise</code>
<p>Will force the cache to fetch just the registered ids of this collection</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Overrides**: [<code>fetch</code>](#Collection+fetch)  
**Returns**: <code>Promise</code> - <p>promise that will resolve when the fetch is complete</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] |  |  | <p>argument options</p> |
| [options.idsToFetch] | <code>Array</code> | <code>collectionTrackedIds</code> | <p>A list of request Ids, will default to current tracked ids</p> |
| [options.setOptions] | <code>Object</code> |  | <p>if a set is made, then the setOptions will be passed into the set method</p> |

<a name="PrivateCollection+fetchByIds"></a>

### privateCollection.fetchByIds(ids, [options]) ⇒ <code>Promise</code>
<p>Will force the cache to fetch a subset of this collection's tracked ids</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Overrides**: [<code>fetchByIds</code>](#Collection+fetchByIds)  
**Returns**: <code>Promise</code> - <p>promise that will resolve when the fetch is complete</p>  

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>Array</code> | <p>array of model ids</p> |
| [options] | <code>Object</code> | <p>if given, will pass the options argument to this.fetch. Note, will not affect options.idsToFetch</p> |

<a name="PrivateCollection+trackIds"></a>

### privateCollection.trackIds(ids)
<p>Pass a list of ids to begin tracking. This will reset any previous list of ids being tracked.<br>Overrides the Id registration system to route via the parent collection</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  

| Param | Description |
| --- | --- |
| ids | <p>The list of ids that this collection wants to track</p> |

<a name="PrivateCollection+addModelAndTrack"></a>

### privateCollection.addModelAndTrack(model)
<p>Adds a new model to the requester collection and tracks the model.id</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  

| Param | Type | Description |
| --- | --- | --- |
| model | [<code>Backbone-Model</code>](#external_Backbone-Model) | <p>the model to be added</p> |

<a name="PrivateCollection+trackNewId"></a>

### privateCollection.trackNewId(id)
<p>Tracks a new id</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> \| <code>Number</code> | <p>the id attribute of the model</p> |

<a name="PrivateCollection+trackAndFetch"></a>

### privateCollection.trackAndFetch() ⇒
<p>Will begin tracking the new ids and then ask the cache to fetch them<br>This will reset any previous list of ids being tracked.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: <p>the promise of the fetch by ids</p>  
<a name="PrivateCollection+pull"></a>

### privateCollection.pull([options]) ⇒ <code>Promise</code>
<p>Will force the cache to fetch any of this collection's tracked models that are not in the cache<br>while not fetching models that are already in the cache. Useful when you want the effeciency of<br>pulling models from the cache and don't need all the models to be up-to-date.</p>
<p>If the ids being fetched are already being fetched by the cache, then they will not be re-fetched.</p>
<p>The resulting promise is resolved when ALL items in the process of being fetched have completed.<br>The promise will resolve to a unified data property that is a combination of the completion of all of the fetches.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: <code>Promise</code> - <p>promise that will resolve when the fetch is complete with all of the data that was fetched from the server.<br>                  Will only resolve once all ids have attempted to be fetched from the server.</p>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | <p>if given, will pass the options argument to this.fetch. Note, will not affect options.idsToFetch</p> |

<a name="PrivateCollection+trackAndPull"></a>

### privateCollection.trackAndPull() ⇒
<p>Will register the new ids and then pull in any models not stored in the cache. See this.pull() for<br>the difference between pull and fetch.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: <p>the promise of the fetch by ids</p>  
<a name="PrivateCollection+requesterDispose"></a>

### privateCollection.requesterDispose()
<p>Handles the disposing of this collection as it relates to a requester collection.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
<a name="PrivateCollection+remove"></a>

### privateCollection.remove(modelIdentifier)
<p>In addition to removing the model from the collection also remove it from the list of tracked ids.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  

| Param | Type | Description |
| --- | --- | --- |
| modelIdentifier | <code>\*</code> | <p>same duck-typing as Backbone.Collection.get():<br>                             by id, cid, model object with id or cid properties,<br>                             or an attributes object that is transformed through modelId</p> |

<a name="Collection+filterDefault"></a>

### privateCollection.filterDefault() ⇒ [<code>Collection</code>](#Collection)
<p>The default filter.  Always returns itself.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Returns**: [<code>Collection</code>](#Collection) - <p>a new instance of this collection</p>  
<a name="Collection+dispose"></a>

### privateCollection.dispose()
<p>Will abolish all listeners and events that are hooked<br>to this collection.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
<a name="Collection+isPolling"></a>

### privateCollection.isPolling()
<p>Returns true if the poll is active</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>isPolling</code>](#pollingMixin.isPolling)  
<a name="Collection+startPolling"></a>

### privateCollection.startPolling(pollInterval)
<p>Starts polling Model/Collection by calling fetch every pollInterval.<br>Note: Each Model/Collection will only allow a singleton of polling to occur so<br>as not to have duplicate threads updating Model/Collection.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>startPolling</code>](#pollingMixin.startPolling)  

| Param | Type | Description |
| --- | --- | --- |
| pollInterval | <code>Integer</code> | <p>interval between each poll in ms.</p> |

<a name="Collection+stopPolling"></a>

### privateCollection.stopPolling()
<p>Stops polling Model and clears all Timeouts.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>stopPolling</code>](#pollingMixin.stopPolling)  
<a name="Collection+polledFetch"></a>

### privateCollection.polledFetch()
<p>By default, the polled fetching operation is routed directly<br>to backbone's fetch all.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>polledFetch</code>](#pollingMixin.polledFetch)  
<a name="Collection+constructor"></a>

### privateCollection.constructor([options])
<p>The constructor constructor / initialize method for collections.<br>Allocate new memory for the local references if they<br>were null when this method was called.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>constructor</code>](#cacheMixin.constructor)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | <p>optional options object</p> |
| [options.fetchHttpAction] | <code>string</code> | <code>&quot;&#x27;POST&#x27;&quot;</code> | <p>http action used to get objects by ids</p> |
| [options.getByIdsUrl] | <code>string</code> | <code>&quot;&#x27;/ids&#x27;&quot;</code> | <p>path appended to collection.url to get objects by a list of ids</p> |
| [options.fetchUsingTrackedIds] | <code>boolean</code> | <code>true</code> | <p>if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids<br>                                                      but will rather call the default fetch method.</p> |

<a name="Collection+hasLoadedOnce"></a>

### privateCollection.hasLoadedOnce() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>hasLoadedOnce</code>](#loadingMixin.hasLoadedOnce)  
**Returns**: <code>boolean</code> - <p>true if this model/collection has ever loaded from a fetch call</p>  
<a name="Collection+isLoading"></a>

### privateCollection.isLoading() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>isLoading</code>](#loadingMixin.isLoading)  
**Returns**: <code>boolean</code> - <p>true if this model/collection is currently loading new values from the server</p>  
<a name="Collection+getLoadedOncePromise"></a>

### privateCollection.getLoadedOncePromise() ⇒ <code>Promise</code>
**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getLoadedOncePromise</code>](#loadingMixin.getLoadedOncePromise)  
**Returns**: <code>Promise</code> - <p>a promise that will resolve when the model/collection has loaded for the first time</p>  
<a name="Collection+getRequesterIds"></a>

### privateCollection.getRequesterIds(the) ⇒ <code>Array</code>
**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getRequesterIds</code>](#cacheMixin.getRequesterIds)  
**Returns**: <code>Array</code> - <p>an array of the ids the requester with the guid has requested</p>  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>string</code> | <p>global unique id of the requester</p> |

<a name="Collection+getRequesterIdsAsDictionary"></a>

### privateCollection.getRequesterIdsAsDictionary(guid) ⇒ <code>Object</code>
<p>This method is used for quick look up of a certain id within the list of requested ids</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getRequesterIdsAsDictionary</code>](#cacheMixin.getRequesterIdsAsDictionary)  
**Returns**: <code>Object</code> - <p>an dictionary of id -&gt; id of the requester ids for a given requester.</p>  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>the global unique id of the requester</p> |

<a name="Collection+removeRequester"></a>

### privateCollection.removeRequester(guid)
<p>Removes a requester from this cache. No longer receives updates</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>removeRequester</code>](#cacheMixin.removeRequester)  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>the global unique id of the requester</p> |

<a name="Collection+getRequesters"></a>

### privateCollection.getRequesters() ⇒ <code>Array</code>
<p>NOTE: this methods returns only the guids for requester collections that are currently tracking ids<br>TODO: should this return just the knownPrivateCollections</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getRequesters</code>](#cacheMixin.getRequesters)  
**Returns**: <code>Array</code> - <p>an array of the all requesters in the form of their GUID's</p>  
<a name="Collection+getAllRequestedIds"></a>

### privateCollection.getAllRequestedIds() ⇒ <code>Array</code>
<p>Return the list of Ids requested by this collection</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>getAllRequestedIds</code>](#cacheMixin.getAllRequestedIds)  
**Returns**: <code>Array</code> - <p>the corresponding requested Ids</p>  
<a name="Collection+createPrivateCollection"></a>

### privateCollection.createPrivateCollection(guid) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
<p>Used to return a collection of desired models given the requester object.<br>Binds a custom &quot;resized&quot; event to the private collections.<br>Overrides the fetch method to call the parent collection's fetchByIds method.<br>Overrides the registerIds method to redirect to its parent collection.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>createPrivateCollection</code>](#cacheMixin.createPrivateCollection)  
**Returns**: [<code>PrivateCollection</code>](#PrivateCollection) - <p>an new empty collection of the same type as &quot;this&quot;</p>  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>Identifier for the requesting view</p> |

<a name="Collection+registerIds"></a>

### privateCollection.registerIds(newIds, guid)
<p>Registers a list of Ids that a particular object cares about and pushes<br>any cached models its way.</p>
<p>This method intelligently updates the &quot;_requestedIds&quot; field to contain all unique<br>requests for Ids to be fetched.  Furthermore, the &quot;polledFetch&quot; method<br>is overriden such that it no longer routes through Backbone's fetch all,<br>but rather a custom &quot;fetchByIds&quot; method.</p>

**Kind**: instance method of [<code>PrivateCollection</code>](#PrivateCollection)  
**Mixes**: [<code>registerIds</code>](#cacheMixin.registerIds)  

| Param | Type | Description |
| --- | --- | --- |
| newIds | <code>Array</code> | <p>New ids to register under the requester</p> |
| guid | <code>string</code> | <p>The GUID of the object that wants the ids</p> |

<a name="validationMixin"></a>

## validationMixin
<p>Contains the methods that are mixed in on the model when binding</p>

**Kind**: global mixin  

* [validationMixin](#validationMixin)
    * [.preValidate(attr, [value])](#validationMixin.preValidate) ⇒ <code>undefined</code> \| <code>string</code> \| <code>Object</code>
    * [.isValid()](#validationMixin.isValid)
    * [.validate()](#validationMixin.validate)

<a name="validationMixin.preValidate"></a>

### validationMixin.preValidate(attr, [value]) ⇒ <code>undefined</code> \| <code>string</code> \| <code>Object</code>
<p>Check whether an attribute or a set of attributes are valid. It will default to use the model's current values but<br>you can pass in different values to use in the validation process instead.</p>

**Kind**: static method of [<code>validationMixin</code>](#validationMixin)  
**Returns**: <code>undefined</code> \| <code>string</code> \| <code>Object</code> - <p>undefined if no errors, a validation exception if a single attribute, or an object with attribute name as key<br>and the error as the value</p>  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>string</code> \| <code>Object</code> \| <code>Array.&lt;string&gt;</code> | <p>Either the name of the attribute, an array containing many attribute names, or<br>on object with attribute name to values</p> |
| [value] | <code>Any</code> | <p>a value to use for the attribute value instead of using the model's value.</p> |

<a name="validationMixin.isValid"></a>

### validationMixin.isValid()
<p>Check to see if an attribute, an array of attributes or the<br>entire model is valid. Passing true will force a validation<br>of the model.</p>

**Kind**: static method of [<code>validationMixin</code>](#validationMixin)  
<a name="validationMixin.validate"></a>

### validationMixin.validate()
<p>This is called by Backbone when it needs to perform validation.<br>You can call it manually without any parameters to validate the<br>entire model.</p>

**Kind**: static method of [<code>validationMixin</code>](#validationMixin)  
<a name="cacheMixin"></a>

## cacheMixin
<p>Custom additions to the Backbone Collection object.</p>
<ul>
<li>safe disposal methods for memory + event management</li>
<li>special functional overrides to support ID registration for different views</li>
</ul>

**Kind**: global mixin  
**See**: <a href="../annotated/modules/mixins/cacheMixin.html">cacheMixin Annotated Source</a>  
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
    * [.fetchByIds([fetchByIdsOptions])](#cacheMixin.fetchByIds) ⇒ <code>Promise</code>
    * [.constructor([options])](#cacheMixin.constructor)

<a name="cacheMixin.getRequesterIds"></a>

### cacheMixin.getRequesterIds(the) ⇒ <code>Array</code>
**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Array</code> - <p>an array of the ids the requester with the guid has requested</p>  

| Param | Type | Description |
| --- | --- | --- |
| the | <code>string</code> | <p>global unique id of the requester</p> |

<a name="cacheMixin.getRequesterIdsAsDictionary"></a>

### cacheMixin.getRequesterIdsAsDictionary(guid) ⇒ <code>Object</code>
<p>This method is used for quick look up of a certain id within the list of requested ids</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Object</code> - <p>an dictionary of id -&gt; id of the requester ids for a given requester.</p>  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>the global unique id of the requester</p> |

<a name="cacheMixin.removeRequester"></a>

### cacheMixin.removeRequester(guid)
<p>Removes a requester from this cache. No longer receives updates</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>the global unique id of the requester</p> |

<a name="cacheMixin.getRequesters"></a>

### cacheMixin.getRequesters() ⇒ <code>Array</code>
<p>NOTE: this methods returns only the guids for requester collections that are currently tracking ids<br>TODO: should this return just the knownPrivateCollections</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Array</code> - <p>an array of the all requesters in the form of their GUID's</p>  
<a name="cacheMixin.getAllRequestedIds"></a>

### cacheMixin.getAllRequestedIds() ⇒ <code>Array</code>
<p>Return the list of Ids requested by this collection</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Array</code> - <p>the corresponding requested Ids</p>  
<a name="cacheMixin.createPrivateCollection"></a>

### cacheMixin.createPrivateCollection(guid) ⇒ [<code>PrivateCollection</code>](#PrivateCollection)
<p>Used to return a collection of desired models given the requester object.<br>Binds a custom &quot;resized&quot; event to the private collections.<br>Overrides the fetch method to call the parent collection's fetchByIds method.<br>Overrides the registerIds method to redirect to its parent collection.</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: [<code>PrivateCollection</code>](#PrivateCollection) - <p>an new empty collection of the same type as &quot;this&quot;</p>  

| Param | Type | Description |
| --- | --- | --- |
| guid | <code>string</code> | <p>Identifier for the requesting view</p> |

<a name="cacheMixin.registerIds"></a>

### cacheMixin.registerIds(newIds, guid)
<p>Registers a list of Ids that a particular object cares about and pushes<br>any cached models its way.</p>
<p>This method intelligently updates the &quot;_requestedIds&quot; field to contain all unique<br>requests for Ids to be fetched.  Furthermore, the &quot;polledFetch&quot; method<br>is overriden such that it no longer routes through Backbone's fetch all,<br>but rather a custom &quot;fetchByIds&quot; method.</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  

| Param | Type | Description |
| --- | --- | --- |
| newIds | <code>Array</code> | <p>New ids to register under the requester</p> |
| guid | <code>string</code> | <p>The GUID of the object that wants the ids</p> |

<a name="cacheMixin.fetch"></a>

### cacheMixin.fetch(options)
<p>Overrides the base fetch call if this.fetchUsingTrackedIds is true<br>Calling fetch from the cache will fetch the tracked ids if fetchUsingTrackedIds is set to true, otherwise<br>it will pass through to the default fetch.</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="cacheMixin.fetchByIds"></a>

### cacheMixin.fetchByIds([fetchByIdsOptions]) ⇒ <code>Promise</code>
<p>A custom fetch operation to only fetch the requested Ids.</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  
**Returns**: <code>Promise</code> - <p>the promise of the fetch</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [fetchByIdsOptions] |  |  | <p>argument fetchByIdsOptions</p> |
| [fetchByIdsOptions.idsToFetch] | <code>Array</code> | <code>collection.collectionTrackedIds</code> | <p>A list of request Ids, will default to current tracked ids</p> |
| [fetchByIdsOptions.setOptions] | <code>Object</code> |  | <p>if a set is made, then the setOptions will be passed into the set method</p> |

<a name="cacheMixin.constructor"></a>

### cacheMixin.constructor([options])
<p>The constructor constructor / initialize method for collections.<br>Allocate new memory for the local references if they<br>were null when this method was called.</p>

**Kind**: static method of [<code>cacheMixin</code>](#cacheMixin)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | <p>optional options object</p> |
| [options.fetchHttpAction] | <code>string</code> | <code>&quot;&#x27;POST&#x27;&quot;</code> | <p>http action used to get objects by ids</p> |
| [options.getByIdsUrl] | <code>string</code> | <code>&quot;&#x27;/ids&#x27;&quot;</code> | <p>path appended to collection.url to get objects by a list of ids</p> |
| [options.fetchUsingTrackedIds] | <code>boolean</code> | <code>true</code> | <p>if set to false, cache.fetch() will not pass to fetchByIds with current tracked ids<br>                                                      but will rather call the default fetch method.</p> |

<a name="cellMixin"></a>

## cellMixin
<p>An non-persistable object that can listen to and emit events like a models.</p>

**Kind**: global mixin  
**See**: <a href="../annotated/modules/mixins/cellMixin.html">cellMixin Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [cellMixin](#cellMixin)
    * [.isModelCompatible](#cellMixin.isModelCompatible)
    * [.save()](#cellMixin.save)
    * [.fetch()](#cellMixin.fetch)
    * [.sync()](#cellMixin.sync)
    * [.url()](#cellMixin.url)

<a name="cellMixin.isModelCompatible"></a>

### cellMixin.isModelCompatible
<p>Whether a cell can pass as a model or not.<br>If true, the cell will not fail is persisted functions are invoked<br>If false, the cell will throw exceptions if persisted function are invoked</p>

**Kind**: static property of [<code>cellMixin</code>](#cellMixin)  
**Default**: <code>false</code>  
**Properties**

| Name | Type |
| --- | --- |
| isModelCompatible | <code>boolean</code> | 

<a name="cellMixin.save"></a>

### cellMixin.save()
<p>Override and disable the save function</p>

**Kind**: static method of [<code>cellMixin</code>](#cellMixin)  
<a name="cellMixin.fetch"></a>

### cellMixin.fetch()
<p>Override and disable the fetch function</p>

**Kind**: static method of [<code>cellMixin</code>](#cellMixin)  
<a name="cellMixin.sync"></a>

### cellMixin.sync()
<p>Override and disable the sync function</p>

**Kind**: static method of [<code>cellMixin</code>](#cellMixin)  
<a name="cellMixin.url"></a>

### cellMixin.url()
<p>Override and disable the url</p>

**Kind**: static method of [<code>cellMixin</code>](#cellMixin)  
<a name="loadingMixin"></a>

## loadingMixin
<p>Loading logic.</p>

**Kind**: global mixin  
**See**: <a href="../annotated/modules/mixins/loadingMixin.html">loadingMixin Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [loadingMixin](#loadingMixin)
    * [.constructor(args)](#loadingMixin.constructor)
    * [.hasLoadedOnce()](#loadingMixin.hasLoadedOnce) ⇒ <code>boolean</code>
    * [.isLoading()](#loadingMixin.isLoading) ⇒ <code>boolean</code>
    * [.getLoadedOncePromise()](#loadingMixin.getLoadedOncePromise) ⇒ <code>Promise</code>
    * [.fetch(options)](#loadingMixin.fetch) ⇒ <code>Promise</code>

<a name="loadingMixin.constructor"></a>

### loadingMixin.constructor(args)
<p>Adds the loading mixin</p>

**Kind**: static method of [<code>loadingMixin</code>](#loadingMixin)  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Object</code> | <p>the arguments to the base constructor method</p> |

<a name="loadingMixin.hasLoadedOnce"></a>

### loadingMixin.hasLoadedOnce() ⇒ <code>boolean</code>
**Kind**: static method of [<code>loadingMixin</code>](#loadingMixin)  
**Returns**: <code>boolean</code> - <p>true if this model/collection has ever loaded from a fetch call</p>  
<a name="loadingMixin.isLoading"></a>

### loadingMixin.isLoading() ⇒ <code>boolean</code>
**Kind**: static method of [<code>loadingMixin</code>](#loadingMixin)  
**Returns**: <code>boolean</code> - <p>true if this model/collection is currently loading new values from the server</p>  
<a name="loadingMixin.getLoadedOncePromise"></a>

### loadingMixin.getLoadedOncePromise() ⇒ <code>Promise</code>
**Kind**: static method of [<code>loadingMixin</code>](#loadingMixin)  
**Returns**: <code>Promise</code> - <p>a promise that will resolve when the model/collection has loaded for the first time</p>  
<a name="loadingMixin.fetch"></a>

### loadingMixin.fetch(options) ⇒ <code>Promise</code>
<p>Wraps the base fetch in a wrapper that manages loaded states</p>

**Kind**: static method of [<code>loadingMixin</code>](#loadingMixin)  
**Returns**: <code>Promise</code> - <p>The loadWrapper promise</p>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>the object to hold the options needed by the base fetch method</p> |

<a name="modelMixin"></a>

## modelMixin
<p>The base for a model</p>

**Kind**: global mixin  
**See**: <a href="../annotated/modules/mixins/modelMixin.html">modelMixin Annotated Source</a>  
**Author**: kent.willis@vecna.com  

* [modelMixin](#modelMixin)
    * [.dispose()](#modelMixin.dispose)
    * [._dispose()](#modelMixin._dispose)

<a name="modelMixin.dispose"></a>

### modelMixin.dispose()
<p>Default dispose for model-like objects (Models, Cells, and ServiceCells).<br>Removes listeners and calls out to _dispose() for child specific dispose logic.<br>Triggers 2 events - &quot;before-dispose&quot; and &quot;after-dispose&quot;.</p>

**Kind**: static method of [<code>modelMixin</code>](#modelMixin)  
<a name="modelMixin._dispose"></a>

### modelMixin.\_dispose()
<p>Dispose hook meant to be used by prototypes that extend this one that need to provide their own dispose logic.</p>

**Kind**: static method of [<code>modelMixin</code>](#modelMixin)  
<a name="pollingMixin"></a>

## pollingMixin
<p>Periodic Polling Object to be mixed into Backbone Collections and Models.</p>
<p>The polling functionality should only be used for collections and for models that are not<br>part of any collections. It should not be used for a model that is a part of a collection.</p>

**Kind**: global mixin  
**See**: <a href="../annotated/modules/mixins/pollingMixin.html">pollingMixin Annotated Source</a>  
**Author**: ariel.wexler@vecna.com  

* [pollingMixin](#pollingMixin)
    * [.pollTimeoutId](#pollingMixin.pollTimeoutId)
    * [.isPolling()](#pollingMixin.isPolling)
    * [.startPolling(pollInterval)](#pollingMixin.startPolling)
    * [.stopPolling()](#pollingMixin.stopPolling)
    * [.polledFetch()](#pollingMixin.polledFetch)

<a name="pollingMixin.pollTimeoutId"></a>

### pollingMixin.pollTimeoutId
**Kind**: static property of [<code>pollingMixin</code>](#pollingMixin)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pollTimeoutId | <code>number</code> | <p>The id from when setTimeout was called to start polling.</p> |

<a name="pollingMixin.isPolling"></a>

### pollingMixin.isPolling()
<p>Returns true if the poll is active</p>

**Kind**: static method of [<code>pollingMixin</code>](#pollingMixin)  
<a name="pollingMixin.startPolling"></a>

### pollingMixin.startPolling(pollInterval)
<p>Starts polling Model/Collection by calling fetch every pollInterval.<br>Note: Each Model/Collection will only allow a singleton of polling to occur so<br>as not to have duplicate threads updating Model/Collection.</p>

**Kind**: static method of [<code>pollingMixin</code>](#pollingMixin)  

| Param | Type | Description |
| --- | --- | --- |
| pollInterval | <code>Integer</code> | <p>interval between each poll in ms.</p> |

<a name="pollingMixin.stopPolling"></a>

### pollingMixin.stopPolling()
<p>Stops polling Model and clears all Timeouts.</p>

**Kind**: static method of [<code>pollingMixin</code>](#pollingMixin)  
<a name="pollingMixin.polledFetch"></a>

### pollingMixin.polledFetch()
<p>By default, the polled fetching operation is routed directly<br>to backbone's fetch all.</p>

**Kind**: static method of [<code>pollingMixin</code>](#pollingMixin)  
<a name="HandlebarsHelper"></a>

## HandlebarsHelper : <code>object</code>
**Kind**: global namespace  

* [HandlebarsHelper](#HandlebarsHelper) : <code>object</code>
    * [.labelFor(field, options)](#HandlebarsHelper.labelFor) ⇒ <code>string</code>
    * [.bindModel(field, options)](#HandlebarsHelper.bindModel) ⇒ <code>string</code>
    * [.feedback(field, options)](#HandlebarsHelper.feedback) ⇒ <code>string</code>
    * [.formAttr(field, options)](#HandlebarsHelper.formAttr) ⇒ <code>string</code>
    * [.dasherize(str)](#HandlebarsHelper.dasherize) ⇒ <code>string</code>
    * [.injectFieldIndices(field, indexMap, options)](#HandlebarsHelper.injectFieldIndices) ⇒ <code>string</code>

<a name="HandlebarsHelper.labelFor"></a>

### HandlebarsHelper.labelFor(field, options) ⇒ <code>string</code>
<p>Usage: {{labelFor 'fieldName' value=&quot;suffix&quot;}}</p>
<p>Generates: for=&quot;field-name-suffix&quot;</p>
<p>Usage: {{labelFor 'fieldName[x].sub' value=&quot;demo&quot; x=123}}</p>
<p>Generates: for=&quot;field-name-123_sub-demo&quot;</p>
<p>Usage: {{labelFor 'fieldName[bar].sub' value=&quot;demo&quot; bar=&quot;abc&quot;}}</p>
<p>Generates: for=&quot;field-name_abc_sub-demo&quot;</p>

**Kind**: static method of [<code>HandlebarsHelper</code>](#HandlebarsHelper)  
**Returns**: <code>string</code> - <p>Compliant HTML generating the &quot;for&quot; attribute</p>  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | <p>The field name to convert to a compliant &quot;for&quot; attribute</p> |
| options | <code>Object</code> | <p>The handlebars context.  Always passed in as the final argument.</p> |
| [option.hash.value] | <code>string</code> | <p>The value tacked on to the end of the field string (useful for radio and checkbox)</p> |

<a name="HandlebarsHelper.bindModel"></a>

### HandlebarsHelper.bindModel(field, options) ⇒ <code>string</code>
<p>Usage: {{bindModel 'fieldName' value='suffix'}}</p>
<p>Generates: id=&quot;field-name-suffix&quot; name=&quot;field-name&quot; data-model=&quot;fieldName&quot; data-feedback=&quot;fieldName&quot; value=&quot;demo&quot;</p>
<p>Usage: {{bindModel 'fieldName[x].sub' value='demo' x=123}}</p>
<p>Generates: data-model=&quot;fieldName[123].sub&quot; data-feedback=&quot;fieldName[123].sub&quot; name=&quot;field-name-123_sub&quot;<br>           id=&quot;field-name-123_sub-demo&quot; value=&quot;demo&quot;</p>
<p>Usage: {{bindModel 'fieldName[bar].sub' value='demo' bar='abc'}}</p>
<p>Generates: data-model=&quot;fieldName.abc.sub&quot; data-feedback=&quot;fieldName[abc].sub&quot; name=&quot;field-name_abc_sub&quot;<br>                  id=&quot;field-name_abc_sub-demo&quot; value=&quot;demo&quot;</p>

**Kind**: static method of [<code>HandlebarsHelper</code>](#HandlebarsHelper)  
**Returns**: <code>string</code> - <p>Compliant HTML generating the id, name, data-model, and data-feedback attributes</p>  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | <p>The field name to convert to compliant id, name, data-model, and data-feedback attributes</p> |
| options | <code>Object</code> | <p>The handlebars context.  Always passed in as the final argument.</p> |
| [options.hash.value] | <code>string</code> | <p>The value tacked on to the end of the field string (useful for radio and checkbox)</p> |

<a name="HandlebarsHelper.feedback"></a>

### HandlebarsHelper.feedback(field, options) ⇒ <code>string</code>
<p>Usage: {{feedback 'fieldName'}}</p>
<p>Generates: data-feedback=&quot;fieldName&quot;</p>
<p>Usage: {{feedback 'fieldName[x].sub' value='demo' x=123}}</p>
<p>Generates: data-feedback=&quot;fieldName[123].sub&quot;</p>
<p>Usage: {{feedback 'fieldName[bar].sub value='demo' bar='abc'}}</p>
<p>Generates: data-feedback=&quot;fieldName[abc].sub&quot;</p>

**Kind**: static method of [<code>HandlebarsHelper</code>](#HandlebarsHelper)  
**Returns**: <code>string</code> - <p>Compliant HTML generating the data-feedback attribute</p>  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | <p>The field name to convert to a compliant data-feedback attribute</p> |
| options | <code>Object</code> | <p>The handlebars context.  Always passed in as the final argument.</p> |

<a name="HandlebarsHelper.formAttr"></a>

### HandlebarsHelper.formAttr(field, options) ⇒ <code>string</code>
<p>Usage: {{formAttr 'fieldName[x].sub' 'id, for' value='demo' x=123}}</p>
<p>Generates: id=&quot;field-name-123_sub-demo&quot; for=&quot;field-name-123_sub-demo&quot; value=&quot;demo&quot;</p>
<p>Usage: {{feedback 'fieldName[bar].sub value='demo' bar='abc'}}</p>
<p>Generates: id=&quot;field-name_abc_sub-demo&quot; for=&quot;field-name_abc_sub-demo&quot; value=&quot;demo&quot;</p>

**Kind**: static method of [<code>HandlebarsHelper</code>](#HandlebarsHelper)  
**Returns**: <code>string</code> - <p>Compliant HTML generating the data-feedback attribute</p>  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | <p>The field name to convert to a compliant data-feedback attribute</p> |
| options | <code>Object</code> | <p>The handlebars context.  Always passed in as the final argument.</p> |
| [options.hash.value] | <code>string</code> | <p>The value tacked on to the end of the field string (useful for radio and checkbox)</p> |
| [options.noValueAttr] | <code>boolean</code> | <p>when options.noValueAttr is set to true,<br>                                              then it will not generate the &quot;value&quot; attribute in the DOM.</p> |

<a name="HandlebarsHelper.dasherize"></a>

### HandlebarsHelper.dasherize(str) ⇒ <code>string</code>
<p>Usage: {{feedback 'fieldName[x].sub'}}</p>
<p>Generates: field-name[x]_sub</p>

**Kind**: static method of [<code>HandlebarsHelper</code>](#HandlebarsHelper)  
**Returns**: <code>string</code> - <p>HTML complicant / dasherized string</p>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | <p>The input string to make HTML compliant (convert to dashes)</p> |

<a name="HandlebarsHelper.injectFieldIndices"></a>

### HandlebarsHelper.injectFieldIndices(field, indexMap, options) ⇒ <code>string</code>
<p>Usage: injectFieldIndices('test[x]-thisIsRegular-y', {x: 123, y: 456} and 'foo[x].abc', x='bar');</p>
<p>Generates: 'test[123]-thisIsRegular-y' and 'foo.bar.abc'</p>
<p>if options.forceArrayNotation is set then:</p>
<p>Generates: 'test[123]-thisIsRegular-y' and 'foo[bar].abc'</p>

**Kind**: static method of [<code>HandlebarsHelper</code>](#HandlebarsHelper)  
**Returns**: <code>string</code> - <p>the field string with array variables substituted</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| field | <code>string</code> |  | <p>The field name</p> |
| indexMap | <code>Object</code> |  | <p>A map of variables</p> |
| options | <code>Object</code> |  | <p>named parameters</p> |
| [options.forceArrayNotation] | <code>boolean</code> | <code>false</code> | <p>Force the usage of [] insetad of . for string values.</p> |

<a name="templateRenderer"></a>

## templateRenderer : <code>object</code>
<p>Static Template Engine.<br>All template renders should be piped through this method.</p>

**Kind**: global namespace  
**See**: <a href="../annotated/modules/templateRenderer.html">templateRenderer Annotated Source</a>  
**Author**: ariel.wexler@vecna.com  

* [templateRenderer](#templateRenderer) : <code>object</code>
    * [.hotswap(currentNode, newNode, ignoreElements)](#templateRenderer.hotswap)
    * [.render($el, template, context, [opts])](#templateRenderer.render)
    * [.hotswapKeepCaret(currentNode, newNode, ignoreElements)](#templateRenderer.hotswapKeepCaret)
    * [.copyTopElement(el)](#templateRenderer.copyTopElement) ⇒ <code>Element</code>
    * [.supportsSelection(el)](#templateRenderer.supportsSelection) ⇒ <code>boolean</code>
    * [.getCaretPosition(elem)](#templateRenderer.getCaretPosition) ⇒ <code>Integer</code>
    * [.setCaretPosition(elem, caretPos)](#templateRenderer.setCaretPosition) ⇒ <code>Integer</code>

<a name="templateRenderer.hotswap"></a>

### templateRenderer.hotswap(currentNode, newNode, ignoreElements)
<p>Changes DOM Nodes that are different, and leaves others untouched.</p>
<p>Algorithm:<br>Delegates to a particular swapMethod, depending on the Node type.<br>Recurses for nested Element Nodes only.<br>There is always room for optimizing this method.</p>

**Kind**: static method of [<code>templateRenderer</code>](#templateRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| currentNode | <code>Node</code> | <p>The DOM Node corresponding to the existing page content to update</p> |
| newNode | <code>Node</code> | <p>The detached DOM Node representing the desired DOM subtree</p> |
| ignoreElements | <code>Array</code> | <p>Array of jQuery selectors for DOM Elements to ignore during render. Can be an expensive check.</p> |

<a name="templateRenderer.render"></a>

### templateRenderer.render($el, template, context, [opts])
<p>Performs efficient re-rendering of a template.</p>

**Kind**: static method of [<code>templateRenderer</code>](#templateRenderer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| $el | [<code>jQuery</code>](#external_jQuery) |  | <p>The Element to render into</p> |
| template | [<code>Handlebars-Template</code>](#external_Handlebars-Template) |  | <p>The HBS template to apply</p> |
| context | <code>Object</code> |  | <p>The context object to pass to the template</p> |
| [opts] | <code>Object</code> |  | <p>Other options</p> |
| [opts.force] | <code>boolean</code> | <code>false</code> | <p>Will forcefully do a fresh render and not a diff-render</p> |
| [opts.newHTML] | <code>string</code> |  | <p>If you pass in newHTML, it will not use the template or context, but use this instead.</p> |
| [opts.ignoreElements] | <code>Array</code> |  | <p>jQuery selectors of DOM elements to ignore during render. Can be an expensive check</p> |

<a name="templateRenderer.hotswapKeepCaret"></a>

### templateRenderer.hotswapKeepCaret(currentNode, newNode, ignoreElements)
<p>Call this.hotswap but also keeps the caret position the same</p>

**Kind**: static method of [<code>templateRenderer</code>](#templateRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| currentNode | <code>Node</code> | <p>The DOM Node corresponding to the existing page content to update</p> |
| newNode | <code>Node</code> | <p>The detached DOM Node representing the desired DOM subtree</p> |
| ignoreElements | <code>Array</code> | <p>Array of jQuery selectors for DOM Elements to ignore during render. Can be an expensive check.</p> |

<a name="templateRenderer.copyTopElement"></a>

### templateRenderer.copyTopElement(el) ⇒ <code>Element</code>
<p>Produces a copy of the element tag with attributes but with no contents</p>

**Kind**: static method of [<code>templateRenderer</code>](#templateRenderer)  
**Returns**: <code>Element</code> - <p>a shallow copy of the element with no children but with attributes</p>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | <p>the DOM element to be copied</p> |

<a name="templateRenderer.supportsSelection"></a>

### templateRenderer.supportsSelection(el) ⇒ <code>boolean</code>
<p>Determines if the element supports selection. As per spec, https://html.spec.whatwg.org/multipage/forms.html#do-not-apply<br>selection is only allowed for text, search, tel, url, password. Other input types will throw an exception in chrome</p>

**Kind**: static method of [<code>templateRenderer</code>](#templateRenderer)  
**Returns**: <code>boolean</code> - <p>boolean indicating whether or not the selection is allowed for {Element} el</p>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>Element</code> | <p>the DOM element to check</p> |

<a name="templateRenderer.getCaretPosition"></a>

### templateRenderer.getCaretPosition(elem) ⇒ <code>Integer</code>
<p>Method that returns the current caret (cursor) position of a given element.<br>Source: http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field</p>

**Kind**: static method of [<code>templateRenderer</code>](#templateRenderer)  
**Returns**: <code>Integer</code> - <p>the cursor index of the given element.</p>  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>element</code> | <p>the DOM element to check caret position</p> |

<a name="templateRenderer.setCaretPosition"></a>

### templateRenderer.setCaretPosition(elem, caretPos) ⇒ <code>Integer</code>
<p>Method that returns sets the current caret (cursor) position of a given element and puts it in focus.<br>Source: http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox</p>

**Kind**: static method of [<code>templateRenderer</code>](#templateRenderer)  
**Returns**: <code>Integer</code> - <p>the cursor index of the given element.</p>  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>element</code> |  |
| caretPos | <code>Integer</code> | <p>The caret index to set</p> |

<a name="torso"></a>

## torso : <code>object</code>
<p>Module containing all dependencies that exports a single object with everything attached (same format as the global).</p>

**Kind**: global namespace  
**See**: <a href="../annotated/modules/torso.html">torso Annotated Source</a>  
**Author**: jyoung@vecna.com  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Behavior | [<code>Behavior</code>](#Behavior) | <p>The [Behavior](#Behavior) prototype.</p> |
| behaviors | <code>Object</code> | <p>Collection of behaviors that ship with Torso.</p> |
| behaviors.DataBehavior | [<code>DataBehavior</code>](#DataBehavior) | <p>The [DataBehavior](#DataBehavior) prototype.</p> |
| Cell | [<code>Cell</code>](#Cell) | <p>The [Cell](#Cell) prototype.</p> |
| Collection | [<code>Collection</code>](#Collection) | <p>The [Collection](#Collection) prototype.</p> |
| Events | [<code>Events</code>](#Events) | <p>The [Events](#Events) prototype.</p> |
| Mixins | <code>Object</code> | <p>Collection of mixins that are used by Torso.</p> |
| Mixins.loading | [<code>loadingMixin</code>](#loadingMixin) | <p>The [loadingMixin](#loadingMixin).</p> |
| Mixins.cache | [<code>cacheMixin</code>](#cacheMixin) | <p>The [cacheMixin](#cacheMixin).</p> |
| Mixins.polling | [<code>pollingMixin</code>](#pollingMixin) | <p>The [pollingMixin](#pollingMixin).</p> |
| Mixins.validation | [<code>mixin</code>](#Validation.mixin) | <p>The [validationMixin](#validationMixin).</p> |
| Mixins.cell | [<code>cellMixin</code>](#cellMixin) | <p>The [cellMixin](#cellMixin).</p> |
| Model | [<code>Model</code>](#Model) | <p>The [Model](#Model) prototype.</p> |
| NestedCell | [<code>NestedCell</code>](#NestedCell) | <p>The [NestedCell](#NestedCell) prototype.</p> |
| NestedModel | [<code>NestedModel</code>](#NestedModel) | <p>The [NestedModel](#NestedModel) prototype.</p> |
| FormModel | [<code>FormModel</code>](#FormModel) | <p>The [FormModel](#FormModel) prototype.</p> |
| ServiceCell | [<code>ServiceCell</code>](#ServiceCell) | <p>The [ServiceCell](#ServiceCell) prototype.</p> |
| Router | [<code>Router</code>](#Router) | <p>The [Router](#Router) prototype.</p> |
| history | [<code>history</code>](#history) | <p>Convient access to backbone history.</p> |
| registry | [<code>registry</code>](#registry) | <p>The torso object registry.</p> |
| Utils | <code>Object</code> | <p>Collection of utilities used by Torso.</p> |
| Utils.loading | [<code>templateRenderer</code>](#templateRenderer) | <p>Template renderer used by Torso.</p> |
| Utils.loading | [<code>handlebarsUtils</code>](#handlebarsUtils) | <p>Handlebars utilities used by Torso.</p> |
| validation | [<code>Validation</code>](#Validation) | <p>The [validation](validation) prototype.</p> |
| View | [<code>View</code>](#View) | <p>The [View](#View) prototype.</p> |
| ListView | [<code>ListView</code>](#ListView) | <p>The [ListView](#ListView) prototype.</p> |
| FormView | [<code>FormView</code>](#FormView) | <p>The [FormView](#FormView) prototype.</p> |

<a name="Validation"></a>

## Validation : <code>object</code>
<p>Validation object containing validation mixin.</p>

**Kind**: global namespace  
**See**: <a href="../annotated/modules/validation.html">validation Annotated Source</a>  
**Author**: ariel.wexler@vecna.com, kent.willis@mostlyepic.com  

* [Validation](#Validation) : <code>object</code>
    * [.version](#Validation.version) : <code>string</code>
    * [.mixin](#Validation.mixin) : [<code>validationMixin</code>](#validationMixin)
    * [.configure(options)](#Validation.configure)

<a name="Validation.version"></a>

### Validation.version : <code>string</code>
<p>Current version of the library</p>

**Kind**: static property of [<code>Validation</code>](#Validation)  
<a name="Validation.mixin"></a>

### Validation.mixin : [<code>validationMixin</code>](#validationMixin)
<p>Used to extend the Backbone.Model.prototype with validation</p>

**Kind**: static property of [<code>Validation</code>](#Validation)  
<a name="Validation.configure"></a>

### Validation.configure(options)
<p>Called to augment configure the default options</p>

**Kind**: static method of [<code>Validation</code>](#Validation)  

| Param |
| --- |
| options | 

<a name="handlebarsUtils"></a>

## handlebarsUtils(Handlebars)
<p>Extensions to handlebars helpers.</p>
<p>Adds additonal helpers to [Handlebars](#external_Handlebars)</p>

**Kind**: global function  
**See**

- [HandlebarsHelper](#HandlebarsHelper) for the added helpers.
- <a href="../annotated/modules/handlebarsUtils.html">handlebarsUtils Annotated Source</a>

**Author**: ariel.wexler@vecna.com, kent.willis@vecna.com  

| Param | Type | Description |
| --- | --- | --- |
| Handlebars | [<code>Handlebars</code>](#external_Handlebars) | <p>Add the helpers to this Handlebars object.</p> |

<a name="stickitUtils"></a>

## stickitUtils()
<p>Extensions to stickit handlers.</p>

**Kind**: global function  
**See**: <a href="../annotated/modules/stickitUtils.html">stickitUtils Annotated Source</a>  
**Author**: ariel.wexler@vecna.com, kent.willis@vecna.com  
<a name="external_Backbone-Collection"></a>

## Backbone-Collection ⇐ [<code>Backbone-Events</code>](#external_Backbone-Events)
<p>The backbone Collection reference</p>

**Kind**: global external  
**Extends**: [<code>Backbone-Events</code>](#external_Backbone-Events)  
**See**: [Backbone.Collection](http://backbonejs.org/#Collection)  
<a name="external_Backbone-Events"></a>

## Backbone-Events
<p>The backbone Events reference</p>

**Kind**: global external  
**See**: [Backbone.Events](http://backbonejs.org/#Events)  
<a name="external_Backbone-Model"></a>

## Backbone-Model ⇐ [<code>Backbone-Events</code>](#external_Backbone-Events)
<p>The backbone Model reference</p>

**Kind**: global external  
**Extends**: [<code>Backbone-Events</code>](#external_Backbone-Events)  
**See**: [Backbone.Model](http://backbonejs.org/#Model)  
<a name="external_Backbone-NestedModel"></a>

## Backbone-NestedModel ⇐ [<code>Backbone-Model</code>](#external_Backbone-Model)
<p>The Backbone-Nested reference</p>

**Kind**: global external  
**Extends**: [<code>Backbone-Model</code>](#external_Backbone-Model)  
**See**: [backbone-nested](https://github.com/afeld/backbone-nested)  
<a name="external_Backbone-Router"></a>

## Backbone-Router ⇐ [<code>Backbone-Events</code>](#external_Backbone-Events)
<p>The backbone Router reference</p>

**Kind**: global external  
**Extends**: [<code>Backbone-Events</code>](#external_Backbone-Events)  
**See**: [Backbone.Router](http://backbonejs.org/#Router)  
<a name="external_Backbone-View"></a>

## Backbone-View ⇐ [<code>Backbone-Events</code>](#external_Backbone-Events)
<p>The backbone View reference</p>

**Kind**: global external  
**Extends**: [<code>Backbone-Events</code>](#external_Backbone-Events)  
**See**: [Backbone.View](http://backbonejs.org/#View)  
<a name="external_Handlebars"></a>

## Handlebars
<p>The handlebars reference</p>

**Kind**: global external  
**See**: [Handlebars](https://handlebarsjs.com/)  
<a name="external_Handlebars-Template"></a>

## Handlebars-Template
<p>The handlebars Template reference</p>

**Kind**: global external  
**See**: [Handlebars](https://handlebarsjs.com/)  
<a name="external_Backbone-History"></a>

## Backbone-History ⇐ [<code>Backbone-Events</code>](#external_Backbone-Events)
<p>The backbone History reference</p>

**Kind**: global external  
**Extends**: [<code>Backbone-Events</code>](#external_Backbone-Events)  
**See**: [Backbone.History](http://backbonejs.org/#History)  
<a name="external_jQuery"></a>

## jQuery
<p>The jQuery reference</p>

**Kind**: global external  
**See**: [jQuery](https://api.jquery.com/category/selectors/)  
**Properties**

| Name | Type |
| --- | --- |
| Deferred | [<code>jQuery-Deferred</code>](#external_jQuery-Deferred) | 

<a name="external_jQuery-Deferred"></a>

## jQuery-Deferred
<p>The jQuery Deferred reference</p>

**Kind**: global external  
**See**: [jQuery.Deferred](https://api.jquery.com/category/deferred-object/)  
<a name="external_Backbone"></a>

## Backbone
<p>The backbone View reference</p>

**Kind**: global external  
**See**: [Backbone](http://backbonejs.org/)  
**Properties**

| Name | Type |
| --- | --- |
| Events | [<code>Backbone-Events</code>](#external_Backbone-Events) | 
| View | [<code>Backbone-View</code>](#external_Backbone-View) | 
| Model | [<code>Backbone-Model</code>](#external_Backbone-Model) | 
| Collection | [<code>Backbone-Collection</code>](#external_Backbone-Collection) | 

