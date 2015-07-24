(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './ServiceCell', './View'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./ServiceCell'), require('./View'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Logger = factory(root._, root.Backbone, root.Torso.ServiceCell, root.Torso.View);
  }
}(this, function(_, Backbone, ServiceCell, View) {
  'use strict';

  var Logger = ServiceCell.extend({ 

  	initialize: function(){
      var testView = new View();
      this.listenTo(testView, 'someTrigger', this.clickListener);
  		this.listenTo(View, 'clickTime', this.clickListener);
  	},
  	clickListener: function(eventInfo){
  		console.log(eventInfo);
  	},
  });

  return Logger;
}));
