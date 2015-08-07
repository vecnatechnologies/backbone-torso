(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', './ServiceCell'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('backbone'), require('./ServiceCell'));
  } else {
    root.Torso = root.Torso || {};
    root.Torso.EventTracker = factory(root._, root.Backbone, root.Torso.ServiceCell);
  }
}(this, function(_, Backbone, ServiceCell) {
  'use strict';

  var EventTracker = ServiceCell.extend({ 

    log : {}, 
    sessions: [],
    unclosed: {},
    debug : false,
    _isClosed: true,
    _sessionStart: null,
    _sessionEnd: null,
    _sessionID: null,
    _ajaxSession: [],


    initialize: function(options){
      this.options = options;
      if (options){
        if ('debug' in options){
          this.debug = options.debug;
          this.allSessions = {};
        }  
      }
    },

    /**
    * saves information about event and wraps start and end signals in 'session' 
    * @param eventInfo {JSON object} contains tracking information (including state: 'start' or 'end', uuid, sessionID)
    * @return trackingInfo {JSON object} contains information about event to be passed back in 'end' signal
    * @method track
    */
  	track: function(eventInfo) {
      var trackingInfo = {};
      if (eventInfo.state) {
        if (this._isClosed) {
          if(!this.debug){
            this.resetSession();
          }
          if (eventInfo.state == "start") {
            this.openSession(eventInfo);
            _.extend(trackingInfo, this.startEvent(eventInfo));
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
      else{
        _.extend(trackingInfo, this.startEvent(eventInfo));
      }
      return trackingInfo;
  	},

    /**
    * generate and returns uuid
    * @return {String} unique identifier
    */
    getUUID : function(){
      return (new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
    },

    /**
    * tracks information about the 'start' of events
    * @param eventInfo {JSON object} contains tracking information including UUID and time
    * @method startEvent
    */
    startEvent: function(eventInfo) {
      var uuid = eventInfo.UUID;      
      eventInfo.UUID = this.getUUID;
      eventInfo.sessionID = this._sessionID; //check if event info has sessionID property and throw error
      eventInfo.startTime = Date.now();
      this.unclosed[uuid] = eventInfo;
      return {UUID: uuid};
    },

    /**
    * tracks information about the 'end' of events
    * @param eventInfo {JSON object} contains information about the tracked event, including UUID, time, state
    * @method endEvent
    */
    endEvent: function(eventInfo) {
      var uuid = eventInfo.UUID;
      var totalEvent = this.unclosed[uuid];
      var endTime = Date.now();
      var duration = endTime - totalEvent.startTime;
      totalEvent.duration = duration;
      totalEvent.endTime = endTime;
      this._sessionEnd = endTime;

      delete totalEvent.state;
      this.log[uuid] = totalEvent;
      delete this.unclosed[uuid];
    },

    /**
    * tracks information about the beginning of sessions
    * @param eventInfo {JSON object} contains information about the tracked event
    * @method openSession
    */
    openSession: function(eventInfo) {
      this._isClosed = false;
      var sessionID = (new Date()).getTime().toString(16)+Math.floor(1E7*Math.random()).toString(16);
      this._sessionID = sessionID;
      this._sessionStart = Date.now();
    },

    /**
    * tracks information about the end of a session. resets all relevant parameters
    * @method closeSession
    */
    closeSession: function() {
      var sessionEvent = {sessionID: this._sessionID, type: "session"};
      var sessionDuration = this._sessionEnd - this._sessionStart;
      sessionEvent.sessionDuration = sessionDuration;
      this.sessions.push(sessionEvent);
      for (var key in this.log) {
        this.log[key].sessionDuration = sessionDuration;
        this.sessions.push(this.log[key]);
        delete this.log[key];
      }
      this._isClosed = true;
      // this.resetSession();
    },

    /**
    * reset all relevant parameters to prepare for new session
    * @method resetSession
    */
    resetSession: function() {
      this.log = {};
      this.unclosed = {};
      this.sessions = [];
      this._isClosed = true;
      this._sessionStart = null;
      this._sessionEnd = null;
      this._sessionID = null;
    }, 

    /**
    * @return {JSON object} current log
    */
    getLog: function() {
      return this.log;
    },

    /**
    * @return {Boolean} true if session is closed
    */
    isClosed: function() {
      return this._isClosed;
    },

    /**
    * @return {array} list of sessions
    */
    getSessions: function() {
      return this.sessions;
    },

    /**
    * @return {Boolean} information on sessions that are not closed
    */
    getUnclosed: function() {
      return this.unclosed;
    },

  });

  return new EventTracker({debug:true});
}));
