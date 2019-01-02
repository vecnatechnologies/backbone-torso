# Torso API

## View
#### Building block of the UI

- All of [Backbone's View API](http://backbonejs.org/#View)
- viewState

Overridden methods from Backbone.View

- constructor / initialize
- delegateEvents
- undelegateEvents

DOM generation / rendering

- template*
- prepare*
- render
- templateRender
- prerender*
- postrender*

Transition Logic

- transitionIn*
- transitionOut*

View state methods
- get
- set

Feedback

- feedback*
- invokeFeedback

Life cycle methods

- detach
- attachTo
- deactivate
- activate
- dispose
- \_dispose*
- \_deactivate*
- \_attached*
- \_detached*

Life cycle state methods

- isAttached
- isAttachedToParent
- isActive
- isDisposed

Tracked/Child view methods

- attachView
- getTrackedView
- getTrackedViews
- attachTrackedViews*
- detachTrackedViews
- registerTrackedView
- unregisterTrackedView
- hasTrackedViews

\* methods you can override or extend to produce desired functionality

## List View
#### Auto-manages many views based on a collection of models/cells

- All of Torso.View API
- **collection**
- **itemView**
- template
- emptyTemplate
- itemContainer
- prepareEmpty
- **modelsToRender**
- getItemViewFromModel
- renderChildViews

Overridden methods from View

- initialize
- render
- prepare

Public methods invoked by list view on collection updates

- update
- reorder

Configuration set by initialize parameters only

- modelName
- modelId
- renderWait

## Form View
#### View that uses a Form Model to do 2-way binding

- All of Torso.View API
- fields
- \_bindings
- \_thenAddClassIfInvalid
- \_thenSetTextIfInvalid
- valid
- invalid
- \_success
- \_errors

Overridden methods from View

- prepare
- initialize
- delegateEvents
- \_deactivate

## Model
#### Server-backed, event-producing object

- All of [Backbone's Model API](http://backbonejs.org/#Model)

Added polling api

- isPolling
- startPolling
- stopPolling
- polledFetch

Loading api

- hasLoadedOnce
- isLoading
- getLoadedOncePromise
- fetch

The Loading API is NOT added by default. Add it by calling:
```
Torso.Model = Torso.Model.extend(Torso.Mixins.collectionLoading(Torso.Model));
```


## Form Model
#### Mediates between a model and an HTML form

- All of Torso.Model API
- initialize
- **push**
- **pull**
- **save**
- **validation**
- labels
- mapping

Add model bindings

- addModel
- addComputed

State inspecting methods

- isTrackingObjectModel
- isUpdating
- isModelStale
- checkIfModelsAreStale

Auto-updating methods

- startUpdating
- stopUpdating
- listenToModelField
- listenToComputedValuesDependency

## Cell
#### Event-producing object

A cell has the exact same API as a Model except the functions concerning server-connection are now no-op's.

- All of Torso.Model API

No-op functions

- save
- fetch
- sync
- url

If you set a Cell's isModelCompatible field to true, Torso will throw exceptions instead of performing a no-op.

## Router
#### Object that switches perspectives
###### Inherits [Backbone's Router API](http://backbonejs.org/#Router).
No added methods.

## (Cache) Collection
- All of [Backbone's Collection API](http://backbonejs.org/#Collection)

Added cache api

- **createPrivateCollection**
- registerIds
- fetch
- fetchByIds

Cache helper methods

- setRequesterIds
- getRequesterIdsAsDictionary
- removeRequester
- getRequesters
- getAllRequestedIds

Added polling api

- isPolling
- startPolling
- stopPolling
- polledFetch

## Requester (Private) Collection
- All of [Backbone's Collection API](http://backbonejs.org/#Collection)
- getTrackedIds
- **fetch**
- **trackIds**
- addModelAndTrack
- trackNewId
- fetchByIds
- trackAndFetch
- pull
- trackAndPull
- requesterDispose

Added polling api

- isPolling
- startPolling
- stopPolling
- polledFetch

Note: requester collections do not have the added cache api but still maintains added custom api from the cache extension.

## Nested Model and Nested Cell
The [backbone-nested](https://github.com/afeld/backbone-nested) properties are added, allowing the objects to listen to changes and emit events concerning properties that are contained within objects or arrays. Normally, Backbone models can only trigger events concerning properties at the first level. If you choose to use this "Nested" behavior, understand that there are some performance hits that come with it.

## Service Cell - a cell with a higher purpose
A service contains exactly the same API as a Cell. So why do we have it at all? The concept of a service was so important that we decided to copy it into another module, effectively renaming the cell as a service. A service is an event-emitting object that stands separate from the UI (as in the view layer or the DOM) but still stores state and acts as a player in the application. An example of a service would be an object whose responsibility would be to keep an eye on bandwidth issues and trigger an event if it got too bad. Or an object that writes to localstorage and manages the frontend "database".

## Events
##### Inherits [Backbone's Events API](http://backbonejs.org/#Events)

Used to created application-level event bus
