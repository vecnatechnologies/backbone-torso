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

    /**
    * saves information about event and wraps start and end signals in 'session' 
    * @ param {JSON object} contains tracking information (including state: 'start' or 'end', uuid, sessionID)
    * @ method track
    */
  	track: function(eventInfo){
      if (eventInfo.state){
        if (this._isClosed){
          this.resetSession();
          if (eventInfo.state == "start") {
            this.openSession(eventInfo);
            this.startEvent(eventInfo);
          }
        } else {
          if (eventInfo.state == "start") {
            this.startEvent(eventInfo);
          }
          else if (eventInfo.state == "end") {
              this.endEvent(eventInfo);
              if (Object.keys(this.unclosed).length === 0) {
                this.closeSession();
              }
          }
        }
      }
  	},

    /**
    * tracks information about the 'start' of events
    * @param {JSON object} contains tracking information including UUID and time
    * @method startEvent
    */
    startEvent: function(eventInfo){
      var uuid = eventInfo.UUID;
      eventInfo.sessionID = this._sessionID; //check if event info has sessionID property and throw error
      eventInfo.startTime = eventInfo.time;
      delete eventInfo.time;
      this.unclosed[uuid] = eventInfo;
    },

    /**
    * tracks information about the 'end' of events
    * @param {JSON object} contains information about the tracked event, including UUID, time, state
    * @method endEvent
    */
    endEvent: function(eventInfo){
      var uuid = eventInfo.UUID;
      var totalEvent = this.unclosed[uuid];
      var duration = eventInfo.time - totalEvent.startTime; 
      totalEvent.duration = duration;
      totalEvent.endTime = eventInfo.time;
      this._sessionEnd = eventInfo.time;
      delete totalEvent.state;
      this.log[uuid] = totalEvent;
      delete this.unclosed[uuid];
    },

    /**
    * tracks information about the beginning of sessions
    * @param {JSON object} contains information about the tracked event
    * @method openSession
    */
    openSession: function(eventInfo){
      this._isClosed = false;
      var sessionID = (new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
      this._sessionID = sessionID;
      this._sessionStart = eventInfo.time;
    },

    /**
    * tracks information about the end of a session. resets all relevant parameters
    * @method closeSession
    */
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

    /**
    * reset all relevant parameters to prepare for new session
    * @method resetSession
    */
    resetSession: function(){
      this.log = {};
      this.unclosed = {};
      this.sessions = [];
      this._isClosed = true;
      this._sessionStart = null;
      this._sessionEnd = null;
      this._sessionID = null;
    }, 

    /**
    * send all information from the session to new relic
    * @method sendToNewRelic
    */
    sendToNewRelic: function(){
      var sessionLength = this.sessions.length;
      for (var i = 0; i < sessionLength; i++){
        var evt = this.sessions[i];
        var actionName = evt.type;
        newrelic.addPageAction(actionName, evt);
      }
    },

    /**
    * @return {JSON object} current log
    */
    getLog: function(){
      return this.log;
    },

    /**
    * @return {Boolean} true if session is closed
    */
    isClosed: function(){
      return this._isClosed;
    },

    /**
    * @return list of sessions
    */
    getSessions: function(){
      return this.sessions;
    },

    /**
    * @return information on sessions that are not closed
    */
    getUnclosed: function(){
      return this.unclosed;
    },

  });

  return new Logger();
}));
