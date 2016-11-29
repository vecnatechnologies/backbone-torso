YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Behavior",
        "Cell",
        "Collection",
        "DataBehavior",
        "Events",
        "FormModel",
        "FormView",
        "ListView",
        "Model",
        "NestedModel",
        "Router",
        "ServiceCell",
        "Torso",
        "Torso.Mixins.cacheMixin",
        "Torso.Mixins.cellMixin",
        "Torso.Mixins.loadingMixin",
        "Torso.Mixins.pollingMixin",
        "Torso.Utils.handlebarsUtils",
        "Torso.Utils.stickitUtils",
        "Torso.Utils.templateRenderer",
        "Torso.validation",
        "View",
        "history"
    ],
    "modules": [
        "Torso",
        "Torso.behaviors"
    ],
    "allModules": [
        {
            "displayName": "Torso",
            "name": "Torso",
            "description": "Custom additions to the Backbone Collection object.\n- safe disposal methods for memory + event management\n- special functional overrides to support ID registration for different views"
        },
        {
            "displayName": "Torso.behaviors",
            "name": "Torso.behaviors",
            "description": "This behavior implements simplified interaction with data sources (i.e. TorsoCollection).\nThis behavior manages re-rendering when data changes and automatically adding the returned data to the view's context.\nThis behavior also manages dependencies between data and other objects to allow intelligent re-fetching when data changes.\n\nExample Configuration:\n  TorsoView.extend({\n    behaviors: {\n      demographics: {\n        behavior: TorsoDataBehavior,\n        cache: require('./demographicsCacheCollection'),\n        returnSingleResult: true,\n        id: { property: '_patientVecnaId' }\n      }\n    }\n  }"
        }
    ],
    "elements": []
} };
});