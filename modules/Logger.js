(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './ServiceCell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./ServiceCell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.Logger = factory(root._, root.Backbone, root.Torso.ServiceCell);
  }
}(this, function(_, Backbone, ServiceCell) {
  'use strict';

  var Logger = ServiceCell.extend({ 

    log : {}, 

  	track: function(eventInfo){
  		console.log(eventInfo);
      var currentTime = Date.now();
      this.log[Date.now()] = eventInfo;
  	},

    getLog: function(){
      return this.log;
    }

  });

  return new Logger();
}));
