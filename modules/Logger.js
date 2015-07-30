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
    sessions: [],
    unclosed: {},
    _isClosed: true,
    _sessionStart: null,
    _sessionEnd: null,
    _sessionID: null,

  	track: function(eventInfo){
      if (this._isClosed){
        this.resetSession();
        if (eventInfo.state=="start"){
          this.openSession(eventInfo);
          this.startEvent(eventInfo);
        }
      } else {
        if (eventInfo.state == "start") {
          this.startEvent(eventInfo);
        }
        else if (eventInfo.state == "end"){
            this.endEvent(eventInfo);
            if (Object.keys(this.unclosed).length === 0){
              this.closeSession();
            }
        }
      }
  		console.log(eventInfo);
      var currentTime = Date.now();
  	},

    startEvent: function(eventInfo){
      var uuid = eventInfo.UUID;
      eventInfo.sessionID = this._sessionID; //check if event info has sessionID property and throw error
      eventInfo.startTime = eventInfo.time;
      delete eventInfo.time;
      this.unclosed[uuid] = eventInfo;

    },

    endEvent: function(eventInfo){
      var uuid = eventInfo.UUID;
      var totalEvent = this.unclosed[uuid];
      var duration = eventInfo.time - totalEvent.startTime; //CHANGE THIS
      totalEvent.duration = duration;
      totalEvent.endTime = eventInfo.time;
      this._sessionEnd = eventInfo.time;
      delete totalEvent.state;
      this.log[uuid] = totalEvent;
      delete this.unclosed[uuid];
    },

    openSession: function(eventInfo){
      this._isClosed = false;
      var sessionID = (new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
      this._sessionID = sessionID;
      this._sessionStart = eventInfo.time;
    },

    closeSession: function(){
      var sessionEvent = {sessionID: this._sessionID, type: "session"};
      var sessionDuration = this._sessionEnd - this._sessionStart;
      sessionEvent.sessionDuration = sessionDuration;
      this.sessions.push(sessionEvent);
      for (var key in this.log){
        this.log[key].sessionDuration = sessionDuration;
        this.sessions.push(this.log[key]);
        delete this.log[key];
      }
      this._isClosed = true;
      this.sendToNewRelic();
      this.resetSession();
    },

    resetSession: function(){
      this.log = {};
      this.unclosed = {};
      this._isClosed = true;
      this._sessionStart = null;
      this._sessionEnd = null;
      this._sessionID = null;
    }, 

    sendToNewRelic: function(){
      var sessionLength = this.sessions.length;
      for (var i = 0; i < sessionLength; i++){
        var evt = this.sessions[i];
        var actionName = evt.type;
        newrelic.addPageAction(actionName, evt);
        console.log('after supposed to send to nr');
      }
      this.sessions = []; //change this after demo
    },

    getLog: function(){
      return this.log;
    },

    isClosed: function(){
      return this._isClosed;
    },

    getSessions: function(){
      return this.sessions;
    },

    getUnclosed: function(){
      return this.unclosed;
    },

  });

  return new Logger();
}));
