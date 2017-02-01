# Torso Data Behavior

[API Section](#description-of-all-options)

## Goals:
* This behavior implements simplified interaction with data sources (i.e. TorsoCollection).
* This behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.
* This behavior also manages dependencies between data and id containers to allow intelligent re-fetching when ids changes.
* Provide a clean and concise declaration of how to retrieve data and how to identify the data to retrieve (see [backbone-torso issue #282 on github](https://github.com/vecnatechnologies/backbone-torso/issues/282) for more details).

Binding views to data sources is a task that increases in complexity when the views require data that depends on each other.  This behavior is meant to address that complexity and provide a simple and clean API to define relationships between models in the context of a view.  This Data Behavior removes the need to manage private collection dependencies manually and instead focus on defining the relationship between the models.

### Example without the behavior:
Display the title of each article and the descriptions of each post on the article.
Let us assume for now that breaking these up into a list view and child views isn't appropriate and that we need all of the models in a single view.
```
var ArticleAndPostsView = Torso.View.extend({
  initialize: function(options) {
    this._articlePrivateCollection = require('app/article/articleCacheCollection').createPrivateCollection(this.cid);
    this._postPrivateCollection = require('app/post/postCacheCollection').createPrivateCollection(this.cid);
    
    this.listenTo(this._articlePrivateCollection, 'change:postIds fetched', this._trackNewPostIds);
    
    this.setArticleIds(options.articleIds || this._initialArticleIds);
  },
  
  setArticleIds: function(articleIds) {
    this._articlePrivateCollection.trackAndFetchIds(articleIds);
  },
  
  _trackNewPostIds: function() {
    var postIds = _.flatten(this._articlePrivateCollection.pluck('postIds'));
    this._postPrivateCollection.trackAndFetchIds(postIds);
  }
});
```

### Example with the behavior:
Same as above, but lets you focus on the relationship instead of the plumbing.
```
var ArticleAndPostsView = Torso.View.extend({
  behaviors: {
    articles: {
      behavior: Torso.behaviors.DataBehavior,
      cache: require('app/article/articleCacheCollection'),
      ids: { property: 'viewState:articleIds' }
    },
    posts: {
      behavior: Torso.behaviors.DataBehavior,
      cache: require('app/post/postCacheCollection'),
      ids: { property: 'behaviors.articles.data:postIds' }
    }
  },
  
  initialize: function(options) {
    this.setArticleIds(options.articleIds || this._initialArticleIds);
  },
  
  setArticleIds: function(articleIds) {
    this.set('articleIds', articleIds);
  }
});
```

And we can share behavior definitions removing even more boilerplate:
```
var ArticlesDataBehavior = Torso.behaviors.DataBehavior.extend({
  cache: require('app/article/articleCacheCollection'),
  ids: { property: 'viewState:articleIds' }
});

var PostsOfArticlesDataBehavior = Torso.behaviors.DataBehavior.extend({
  cache: require('app/post/postCacheCollection'),
  ids: { property: 'behaviors.articles.data:postIds' }
});

// Define the view (ideally each behavior and view have their own files and can be imported separately)
var ArticleAndPostsView = Torso.View.extend({
  behaviors: {
    articles: ArticlesDataBehavior,
    posts: PostsOfArticlesDataBehavior,
  },
  
  initialize: function(options) {
    this.setArticleIds(options.articleIds || this._initialArticleIds);
  },
  
  setArticleIds: function(articleIds) {
    this.set('articleIds', articleIds);
  }
});

```

## Table of Contents
1. [Background](#background)
2. [Simple Configuration](#simple-configuration)
3. [Object models from IDs](#object-models-from-ids)
4. [Configuration methods](#configuration-methods)
5. [Getting IDs](#getting-ids)
6. [Accessing data from View](#accessing-data-from-view)
7. [Accessing data from template](#accessing-data-from-template)
8. [Triggering a recalculation of ids and refresh of cached data](#triggering-a-recalculation-of-ids-and-refresh-of-cached-data)
9. [Update Events Configuration](#update-events-configuration)
10. [Events listened to](#events-listened-to)
11. [Events emitted](#events-emitted)
12. [Description of all Options](#description-of-all-options)

## Background
Retrieving data using Torso caches (Collections) and private collections involves a 2 step process:

1. Obtain the id(s) of the objects you want.
This could be from a list on another object, a criteria call to the server, url parameters, etc.

2. Use those id(s) to get the object model(s).
By having a unified API for accessing models via id(s) through the cache you can guarantee that the same model is used across all of your views when accessing the same object.

## Simple Configuration
Data Behaviors are meant to allow simple configuration of both sides of this process (how to get ids and how to get objects based on ids).

The simplist use case for the data behavior is when a collection of ids are fixed and known at view creation time and the expected result is a collection of data items.

```JavaScript
var PostsView = Torso.View.extend({
  behaviors: {
    posts: {
      behavior: Torso.behaviors.DataBehavior,
      cache: require('app/post/postCacheCollection'),
      ids: [ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]
    }
  }
});
```
This identifies the postCacheCollection.js as the cache to use for posts and that it should always retrieve the same two posts for this view identified by: "yesterday-by-the-river" and "tomorrow-by-the-sea".

## Object models from IDs
Once IDs have been identified, then the object models need to be fetched.  This is managed by the cache collection so that models of the same type can be retrieved in batches and refreshed in bulk.  There are 2 properties that configure this interaction `returnSingleResult` and `alwaysFetch`.

### `returnSingleResult`
Set to true if you expect to only be working with a single id.  False is the default and is useful when working with mulitple ids.

#### Basic example of returnSingleResult:
```JavaScript
var ArticleView = Torso.View.extend({
  behaviors: {
    article: {
      behavior: Torso.behaviors.DataBehavior,
      cache: require('app/article/articleCacheCollection'),
      returnSingleResult: true,
      id: 1234
    }
  }
});
```

### `alwaysFetch`
Set to true (fetch mode) if you want every refresh of the widget to retrieve data from the server (this will be the closest to "real-time" and will make sure your views are always showing the most up-to-date information).  True is also the most resource intensive since it fetches from the server on every update.  False (pull mode) is the default and will use the cached models if they exist for the given ids.  False will reduce the traffic to the backend server in exchange for better performance on the frontend.  A mix of the two can be configured by using false (pull) and a polling collection as a cache.  Then you can guarantee that the data is no older than your poll interval while still reducing server traffic (assuming your poll interval is longer than how often you data behavior refreshes).
 
#### Basic example of alwaysFetch
```JavaScript
var PostsView = Torso.View.extend({
  behaviors: {
    posts: {
      behavior: Torso.behaviors.DataBehavior,
      cache: require('app/post/postCacheCollection'),
      alwaysFetch: true,
      ids: [ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]
    }
  }
});
```
This will cause the Data Behavior to pull posts with the ids "yesterday-by-the-river" and "tomorrow-by-the-sea" from the server whenever a refresh of the data is requested.

## Configuration methods
There are main ways to set the options used by the DataBehavior.  The first is via behavior options defined on the view (see examples above).  The other is through direct extension and provides a way to factor out common configurations into their own DataBehavoirs.
```JavaScript
var YesterdayAndTomorrowPostDataBehavior = Torso.behaviors.DataBehavior.extend({
  cache: require('app/post/postCacheCollection'),
  ids: [ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]
});

var PostsView = Torso.View.extend({
  behaviors: {
    posts: YesterdayAndTomorrowPostDataBehavior
  }
});
```
The configuration methods can be mixed, for example to create a data behaivor for a given object (ids -> object side of the configuration) and let the view or extension add how to retrieve the ids.
```JavaScript
var PostDataBehavior = Torso.behaviors.DataBehavior.extend({
  cache: require('app/post/postCacheCollection')
});

var PostsView = Torso.View.extend({
  behaviors: {
    posts: {
      behavior: PostDataBehavior,
      ids: [ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]
    }
  }
});
```

## Getting IDs
This is the most complex side of the configuration due to the number of places that provide ids.

For these configurations we will extend one of the following two behaviors depending on whether we want a single result returned or a collection.
```JavaScript
var PostDataBehavior = Torso.behaviors.DataBehavior.extend({
  cache: require('app/post/postCacheCollection')
});

var ArticleDataBehavior = Torso.behaviors.DataBehavior.extend({
  cache: require('app/article/articleCacheCollection'),
  returnSingleResult: true
});
```
Which can be used like this:
```JavaScript
var ArticleWithPostsView = Torso.View.extend({
  behaviors: {
    article: {
      behavior: ArticleDataBehavior,
      id: 1234
    },
    posts: {
      behavior: PostDataBehavior,
      ids: [ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]
    }
  }
});
```
The main configuration option for identifying which ids to use is `ids`.  This option is aliased with `id` to provide a more readable configuration, but usage of `id` vs. `ids` has no functional impact.

#### Cell-like idContainer Support
The `ids` option can get the ids from other objects.  This api is based on idContainer objects that are "cell-like" (https://runkit.com/torso/cell).  Which means they have a getter to retrieve properties that takes a string identifying the (nested) property where the ids are and trigger `change:<property name>` events whenever the (nested) id property changes.  This common contract allows the data behavior to simplify the configuration to identifying:
1. The idContainer
2. The property of the idContainer that contains the ids

The following objects already implement this full contract and need no modifications to depend on them:
* Cells
* Models
* View.viewState
* Behaviors

#### Direct Property Support
An alternative to the cell-like contract described above is direct properties on the idContainer object.  If a property exists on the idContainer that matches the provided property name then it will be used instead of the getter described above.

#### Nested Property Support
Configuration for direct properties supports nested properties `idContainer:some.nested.property`:
```JavaScript
var idContainer = { some: { nested: { property: true }}}
```
For cell-like idContainers the support of nested properties is defined by whether `.get()` of the idContainer supports nested properties (the syntax for defining the property is the same between direct and cell-like properties).

#### Change Events
Change events are handled separately and are listened for on the idContainer regardless of whether the id property is a direct property or a cell-like property.  If change events are implemented then the ids will be automatically calculated and the objects will be fetched from the cache when the change event is triggered on the idContainer.

### Configuring ids using a string description.
To use a property that is defined *on the view* as a field just specify the name of the property in the ids configuration:
```JavaScript
var ArticleView = Torso.View.extend({
  behaviors: {
    article: {
      behavior: ArticleDataBehavior,
      id: { property: '_articleId' }
    }
  },
    
  _articleId: 'the-first-article'
});
```
In this case the id for the article will be "the-first-article".

Note: Due to the duck-typing involved in allowing a single String id we have to use the additional construct of an object containing a field named "property" for identifying a property using a simple string.  If this restriction was lifted, then the following would be ambiguous:
```JavaScript
var AnAmbiguousViewExample = Torso.View.extend({
  behaviors: {
    article: {
      behavior: ArticleDataBehavior,
      id: 'anId'
    }
  },
    
  anId: 10
});
```
The id to use could be either the value 'anId' or the number 10.

#### Other ID Containers
IdContainers can be defined using the string property syntax or using more complex configurations where the context is identified separately.

##### String Syntax
The string syntax is a simplified syntax meant to address a majority of the use cases of identifying both the idContainer and the id property.  The container and property is separated by a ":" and the property or container can be a nested property name using bean syntax.

Possible idContainers:
* Any (Nested) Property of the view including viewState and model.
* Any Behavior of the view (`behaviors.<behaviorName>`).

Examples:
* Model
    ```JavaScript
    var ArticleView = Torso.View.extend({
      behaviors: {
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'model:someArticleId' }
        }
      },
        
      initialize: function() {
        this.model = new Torso.NestedModel();
        this.model.set('someArticleId', 'the-first-article');
      }
    });
    ```
* ViewState
    ```JavaScript
    var ArticleView = Torso.View.extend({
    behaviors: {
      article: {
        behavior: ArticleDataBehavior,
        id: { property: 'viewState:articleId' }
      }
    },
        
      initialize: function() {
        // This is the same as this.viewState.set('articleId', 'the-first-article');
        this.set('articleId', 'the-first-article');
      }
    });
    ```
* Nested idContainer
    ```JavaScript
    var ArticleView = Torso.View.extend({
      behaviors: {
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'otherObject.idContainer:articleId' }
        }
      },
        
      initialize: function() {
        this.otherObject = {
          idContainer: new Torso.NestedCell()
        }
        this.otherObject.idContainer.set('articleId', 'the-first-article');
      }
    });
    ```
* Nested idContainer and nested direct property
    ```JavaScript
    var ArticleView = Torso.View.extend({
      behaviors: {
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'otherObject.idContainer:article.postIds' }
        }
      },
        
      initialize: function() {
        this.otherObject = {
          idContainer: {
            article: {
              postIds: [10, 2342, 5235421, 423]
            }
          }
        }
      }
    });
    ```
The previous example is kind of degenerate because the placement of the ':' doesn't matter for direct properties with no events.  The placement of the ":" does matter for cell-like idContainers to identify which object will be triggering the change events.

* Another behavior
    ```JavaScript
    var ArticleView = Torso.View.extend({
      behaviors: {
        application: {
          behavior: Torso.Behavior // contains a topArticleId property.
        },
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'behaviors.application:topArticleId' }
        }
      }
    });
    ```
* Nested Direct Property of another behavior
A reference to any nested property on another behavior `behaviors.<behaviorName>.something.anotherIdContainer`.  This includes the .data field of a DataBehavior.
    
    ```JavaScript
    var ArticleView = Torso.View.extend({
      behaviors: {
        application: ApplicationBehavior,
        // contains an id container:
        // AplicationBehavior = Torso.Behavior.extend({ 
        //   something: {
        //     anotherIdContainer: new TorsoNestedCell();
        //   }
        // });
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'behaviors.application.something.anotherIdContainer:topArticleId' }
        }
      }
    });
    ```
* Another DataBehavior
Same as above except the idContainer is .data.
    
    ```JavaScript
    var ArticleView = Torso.View.extend({
      behaviors: {
        applicationData: {
          behavior: ApplicationDataBehavior // retrieves data with a topArticleId property.
        },
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'behaviors.applicationData.data:topArticleId' }
        }
      }
    });
    ```
* Nested id properties 
Applies to all idContainer definitions.
    ```JavaScript
    var ArticleView = Torso.View.extend({
      behaviors: {
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'viewState:applicationData.someArticleReference' }
        }
      },
        
      initialize: function() {
        // This is the same as this.viewState.set({ ... });
        this.set({
          applicationData: {
            someArticleReference: 'the-first-article'
          }
        });
      }
    });
    ```
* Derived idContainers
More complex idContainers may require defining the context directly or via a function.  The idContainer property gets this done.  If a method is used as the idContainer then it is evaluated in the context of the behavior.
    ```JavaScript
    var currentUserModel = new Torso.NestedCell();
    var application = {
      getCurrentUser: function() {
        return currentUserModel;
      }
    }
    currentUserModel.set('someAwesomeArticle', 'the-first-article');
    
    var ArticleView = Torso.View.extend({
      behaviors: {
        article: {
          behavior: ArticleDataBehavior,
          id: { 
            property: 'someAwesomeArticle', 
            idContainer: function() { 
              return application.getCurrentUser();
            } 
          }
        }
      }
    });
    ```
  which is equivalent to:
    ```JavaScript
    var currentUserModel = new Torso.NestedCell();
    currentUserModel.set('someAwesomeArticle', 'the-first-article');
    
    var ArticleView = Torso.View.extend({
      behaviors: {
        article: {
          behavior: ArticleDataBehavior,
          id: { 
            property: 'someAwesomeArticle', 
            idContainer: currentUserModel
          }
        }
      }
    });
    ```
#### Get ids by Function
ids can also be a function that returns either a promise that resolves to the ids or the ids directly (either as an array or single value).  This is useful when your ids need to be fetched from the server or have arbitrary logic to retrieve them.

The cache being used by the behavior is even conveniently passed in as an argument to the function in case you have generic ids logic and want to swap out the cache for different data behaviors.

The context ("this") of the function is this Data Behavior.

A good place for the "how to get ids from the server" logic is a method on the cache collection.
```JavaScript
var ArticleSearchDataBehavior = ArticleDataBehavior.extend({
  updateEvents: 'model:change:searchString',
  ids: function(articleCollectionCache) {
    var searchString = this.view.model.get('searchString');
    if (!searchString) {
      return null;
    }

    return articleCollectionCache.fetchIdsBySearchString({ searchString: searchString });
  }
});

articleCollectionCache.fetchIdsBySearchString = function(criteria) {
  return $.ajax({
    url: 'article/criteria',
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(criteria)
  });
});
```

## Accessing data from View
The view can access the behavior's data via the .data property on the behavior.  It has .toJSON() and .get() methods for data access.

Data access examples will use the ArticleWithPostsView defined earlier.

* returnSingleResult === false (default)
    ```JavaScript
    var articleWithPostsView = new ArticleWithPostsView();
    var postsDataBehavior = articleWithPostsView.getBehavior('posts');
    
    postsDataBehavior.toJSON(); // returns an array of objects containing the post objects.  Equivalent to articleDataBehavior.data.privateCollection.toJSON();
    postsDataBehavior.get('text'); // returns an array containing each post's text. Equivalent to articleDataBehavior.data.privateCollection.pluck('text');
    postsDataBehavior.get('id'); // `[ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]` or undefined if the posts with those ids do not exist on the server (or a subset if only a single post exists on the server).
    postsDataBehavior.getModels(): // an array of all post models matching the ids `[ 'yesterday-by-the-river', 'tomorrow-by-the-sea' ]` or an empty array if the posts with those ids do not exist on the server (or a subset if only a single post exists on the server)..
    ```
* returnSingleResult === true
    ```JavaScript
    var articleWithPostsView = new ArticleWithPostsView();
    var articleDataBehavior = articleWithPostsView.getBehavior('article');
    
    articleDataBehavior.toJSON(); // returns a single object containing the article properties.  Equivalent to articleDataBehavior.data.privateCollection.at(0).toJSON();
    articleDataBehavior.get('title'); // returns the title of the retrieved article. Equivalent to articleDataBehavior.data.privateCollection.at(0).get('title');
    articleDataBehavior.get('id'); // 1234 or undefined if the article with that id does not exist on the server.
    articleDataBehavior.getModel(); // the model object.
    postsDataBehavior.getModels(): // an array of a single article model matching the id `1234` or an empty array if the article with that id does not exist on the server.
    ```
Note: the idAttribute can be defined on the underlying Model and everything should respect that (i.e. the "id" property in the examples above can be different if "idAttribute" is set on the Backbone.Model backing the data in the cache collection - see backbone docs for more info on idAttribute).

## Accessing data from template
The view will automatically add the data from the behavior to the result of the view's prepare method.

Result of prepare() of ArticleWithPostsView after data has been loaded.
```JavaScript
{
  ...,
  article: {
    data: {
      id: 1234,
      title: 'some article title',
      body: 'The content of the article...'
    }
  },
  posts: {
    data: [{
      id: 'yesterday-by-the-river',
      title: 'Yesterday by the River',
      text: 'Yesterday I took a walk by the river...'
    }, {
      id: 'tomorrow-by-the-sea',
      title: 'Tomorrow by the Sea',
      text: 'Tomorrow I am going to walk along the beach...'
    }]
  }
}
```

## Triggering a recalculation of ids and refresh of cached data
* `pull()` - Any ids that are already in the cache are added immediately.  Any that are not already in the cache are fetched as a single batch of ids.
    
    ```JavaScript
    var articleWithPostsView = new ArticleWithPostsView();
    articleWithPostsView.getBehavior('posts').pull();
    ```
    
* `fetch()` - Regardless of the cache state all ids identified by this behavior are fetched from the server.
    
    ```JavaScript
    var articleWithPostsView = new ArticleWithPostsView();
    articleWithPostsView.getBehavior('posts').fetch();
    ```
    
* `retrieve()` - Will either fetch or pull based on the current value of "alwaysFetch". Defaults to pull (if alwaysFetch is not explicitly set).
    
    ```JavaScript
    var articleWithPostsView = new ArticleWithPostsView();
    articleWithPostsView.getBehavior('posts').retrieve();
    ```
    
* `ids-container-updated` Event - this is a way to indicate that the id container changed which means the id listeners should be rebound and data should be refreshed.
    
    ```JavaScript
    var articleWithPostsView = new ArticleWithPostsView();
    articleWithPostsView.getBehavior('posts').trigger('ids-container-updated');
    ```
    
* `idsContainer.trigger('change:<idPropertyName>')`
This is the change event that is already emitted by Cell-like objects when their properties change.
    
    ```JavaScript
    var idContainer = new Torso.Events();
    idContainer.articleId = 1234;
    
    var idContainerView = Torso.View.extend({
      behaviors: {
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'idContainer:articleId' }
        }
      },
        
      initialize: function() {
        this.idContainer = idContainer;
      }
    });
    
    idContainer.articleId = 'i-am-a-new-id';
    idContainer.trigger('change:articleId');
    ```
    
* `idsContainer.trigger('fetched:ids')`
This is already emitted by DataBehaviors and is useful to identify when the ids load for the first time since there may not be a `change:<idPropertyName>` event that is triggered on first load.  Since this is generic it can be triggered without knowning the specific ids property that another data behavior is listening for.
Implement this event trigger if your idContainer is not a DataBehavior and you need to generically tell all listening DataBehaviors that the ids have changed.
    
    ```JavaScript
    var idContainer = new Torso.Events();
    idContainer.articleId = 1234;
    
    var idContainerView = Torso.View.extend({
      behaviors: {
        article: {
          behavior: ArticleDataBehavior,
          id: { property: 'idContainer:articleId' }
        }
      },
        
      initialize: function() {
        this.idContainer = idContainer;
      }
    });
    
    idContainer.articleId = 'i-am-a-new-id';
    idContainer.trigger('fetched:ids');
    ```
    
## Update Events Configuration
When direct dependence on id properties that fire their own change events are not enough you can also setup update events.  These are additional events that, when fired, will trigger a refresh of the ids and data in the data behavior.

Event emitters are defined the same way as idContainers and follow the same rules.  The only difference is that the event emitters use the event as the base object while idContainers use the view.

Specifially updateEvents will assume anything before the first ":" is defining the container and anything after is defining the event (which means event names can have additional ":" in them).
```JavaScript
var ArticleView = Torso.View.extend({
  behaviors: {
    article: {
      behavior: ArticleDataBehavior,
      updateEvents: ['view.model:change:articleId', 'magazineConfiguration:change:enabled'],
      ids: function() {
        if (this.view.magazineConfiguration.isEnabled()) {
          return this.view.model.get('articleId');
        }
      }
    }
  }
});
```

Special keywords for the event emitter string definition:
* "this" is a reference to this behavior.
  * "this:test" will listen to the "test" event triggered on this behavior.
* "view" is a reference to this behavior's view.
  * "view.model:change:articleId" will listen to the "change:articleId" event triggered on the model of this behavior's view.
* empty string - (i.e. there is no ":" in the definition) is the same as "view".
  * "loaded" will listen to the "loaded" event triggered on this behavior's view.
* "behaviors" will take the next value after the dot and before the next dot as the behavior alias.
  * "behaviors.articleDataBehavior.data:change:posts" will listen to the "change:posts" event triggered on the .data property of the articleDataBehavior.
  * "behaviors.postsDataBehavior:fetched" will listen to the "fetched" event triggered on postsDataBehavior.

For more complicated objects that can not be referenced from the behavior, an event name to container (or function that returns a container) hash can be supplied.
```JavaScript
var ArticleView = Torso.View.extend({
  behaviors: {
    article: {
      behavior: ArticleDataBehavior,
      updateEvents: [{
        'change:articleId': function() {
          return this.view.getArticleIdContainer();
        }
      }, {
        'change:enabled': magazineConfiguration
      }],
      ids: function() {
        if (magazineConfiguration.isEnabled()) {
          return this.view.getArticleIdContainer().get('articleId');
        }
      }
    }
  }
});
```
Note: When using an object to define the event name to event emitter mapping, you can define multiple event/emitter pairs (assuming the event names do not overlap).  When defining the same event name for different objects it needs to be defined as another object in the array.  Otherwise the events can be grouped in a single object.
```JavaScript
var ArticleView = Torso.View.extend({
  behaviors: {
    article: {
      behavior: ArticleDataBehavior,
      updateEvents: [
        {
          'change:enabled': magazineConfiguration,
          'fetched': someOtherEventEmitter,
          'some:random:event': yetAnotherEventEmitter
        },
        {
          'change:enabled': applicationConfiguration
        }
      ],
      ids: ...
    }
  }
});
```

## Events listened to
The Data Behavior listens to the following events on the idContainer.  It ignores the arguments to those events.

* "change:<property name>" - this event indicates that that specific property of the id container changed and therefore the previous ids may be out of date.  This event is already fired by all cell-like objects when you set a property.  Note that this requires a nested cell (or nested model) if the property is nested.  It doesn't listen for changes to parent objects.
  * Note: If the id container is not a nested cell or model then nested properties will not fire the correct change events.
* "fetched:ids" - this event indicates that the object has been fetched for the first time and may not have triggered a change:* event.  Therefore the listening data behavior should refresh its list of ids (and then its list of objects).

## Events emitted
* All events from the private collection are proxied to the .data property of the data behavior.  This includes any change events of models contained in the collection.  This does NOT include arbitrary events triggered on the individual models of the collection.
* "fetched" is triggered on both the behavior itself and the .data property of the behavior with a payload containing an object with status "success" or "failed" depending on whether calculating the ids and fetching the objects completed successfully.
* "fetched:ids" is triggered on both the behavior and the .data property of the behavior when the ids and data is successfully or unsuccessfully retrieved.

## Description of all Options
* `cache {Torso.Collection}` - the torso collection that is acting as a cache used to create the private collections.
* `[returnSingleResult=false] {Boolean}` true - a single model result is expected, false - a collection result is expected.
* `[alwaysFetch=false] {Boolean}` true - if it should use fetch() instead of pull() on the private collection.  false if it should use pull() instead.  True will query the server more often, but will provide more up-to-date data.  False will only query the server if the model hasn't already been retrieved.
* `id or ids {String | Number | String[] | Number[] | Object | Function}` - duck-typed property that identifies the ids to use.
  * If id(s) is a String or Number - the id to use directly (equivalent to an array of a single id).
  * If id(s) is a String[] or Number[] - the ids to use directly.
  * If id(s) is an Object - more complex configuration that identifies a model-like object that fires a change event and the property on that object to use.  The object needs to fire the change event for the given property and have a `.get('propertyName')` method.  Only one property can be identified as supplying the id for this data model.  If the identified object does not fire a change event then the id will never change.
    * property {String} - the name of the property that defines the ids.  The root object is assumed to be the view unless idContainer is defined.  The idContainer is the object that fires a change event for the given property name.  Uses the view or the idContainer as the root to get the identified property (i.e. "viewState.<propertyName>", "model.<propertyName>", etc).  Will get the property before the first "." from the view and if it is an object will try to use a .get('propertyName') on it and set a "change:<propertyName>" listener on it.  If it is a string/number or array of string/number, then it will use that as the ids
    * idContainer {Torso.Cell | Backbone.Model | Function} - object (or a function that returns an object) that fires change events and has a .get('propertyName') function.  It isn't required to fire events - the change event is only required if it needs to refetch when the id property value changes.
    * Examples:
      * { property: '_patientId' }
      * { property: 'viewState:appointmentId' }
      * { property: 'model:type' }
      * { property: 'behaviors.demographics.data:appointments' }
      * { property: 'id', idContainer: userService }
      * { property: 'username', idContainer: function() { application.getCurrentUser() } }
  * If id(s) is a `function(cache)` - expected to return the ids (either array, jquery deferred that resolves to the ids or single primitive) to track with the private collection.  Cache is passed in as the first argument so that the behavior can be defined and the cache can be overridden later.  "this" is the behavior (from which you can get the view if needed).  What was criteria should use this instead:
    ```JavaScript
    function(cache) {
      var thisBehaviorInstance = this;
      var view = this.view;
      var critera = { ... some criteria ... };
      return cache.fetchIdsByCriteria(criteria);
    }
    ```
* `updateEvents {String | Object | Array}` - cause this behavior to re-calculate its ids and refetch them from the server if the given events are triggered (space separated if string, single item is equivalent to array of single item).
  * [event name] below can be a change:<propertyName> event.
  * [property name] below is can be a nested property of the base object.  Does not use .get('[property name]'), rather uses the direct fields of the object.
  * "view:[event name]" - arbitrary event triggered on the view.
  * "view.[property name]:[event name]" - arbitrary event triggered on the view's property.
  * "viewState:[event name]" - arbitrary event triggered on the viewState.
  * "model:[event name]" - arbitrary even triggered on the view's model.
  * "model.[property name]:[event name]" - arbitrary even triggered on the view's model's property.
  * "this:[event name]" - arbitrary event triggered by this behavior.
  * "this.[property name]:[event name]" - arbitrary event triggered by this behavior's property.
  * "this.data:[event name]" - arbitrary event triggered by this behavior's data property (specific example of `this.[property name]:[event name]`).
  * "behaviors.behaviorAlias:[event name]" - arbitrary event triggered by another behavior on this view.
  * "behaviors.behaviorAlias.[property name]:[event name]" - arbitrary event triggered by another behavior's property on this view.
  * "behaviors.behaviorAlias.data:[event name]" - arbitrary event triggered by another behavior's data property on this view (specific example of `behaviorAlias.[property name]:[event name]`).
  * { '[event name]': < object (or function returning an object) that the event is triggered on > } - arbitrary "event" triggered on the supplied object.





