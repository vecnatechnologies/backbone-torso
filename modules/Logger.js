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
      var log = {};
      this.mypublic = "am i public";
      this.publicFunction = this.clickListenerPrivate;
  	},

  	clickListenerPrivate: function(eventInfo){
  		console.log(eventInfo);
  	},
  });

  return new Logger();
}));
