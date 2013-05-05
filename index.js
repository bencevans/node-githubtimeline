
/**
 * Dependencies
 */

var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    request = require('request'),
    debug = require('debug')('timeline'),
    _ = require('underscore');

/**
 * GitHub Timeline EventEmitter
 */
var GitHubTimeline = function(options) {
  EventEmitter.call( this );
  this.interval = (options.clientId && options.clientSecret) ? 10 : 60;
  this.url = 'https://api.github.com/events?client_id=' + options.clientId + '&client_secret=' + options.clientSecret;
  return this;
};
util.inherits(GitHubTimeline, EventEmitter);

/**
 * getEvents makes requests to GitHub api
 * @param  {function} cb callback(err, data)
 */
GitHubTimeline.prototype._getEvents = function (cb) {
  debug('getEvents(%s)');
  var self = this;
  // cache response, mainly for dev purpose
  request({
    url: self.url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8a3) Gecko/20040817'
    },
    json: true
  }, function(err, res, body) {
    cb(err, body);
  });
};

GitHubTimeline.prototype._handleResponse = function(events) {
  var self = this;
  events = _.sortBy(events, function(e) {
    return e.id;
  });
  _.each(events, function(e) {
    if(!self.lastId || self.lastId < e.id) {
      self.emit('event', e);
      self.lastId = e.id;
    }
  });
};

/**
 * Start polling GitHub API
 */
GitHubTimeline.prototype.poll = function() {
  var self = this;
  this._getEvents(function(err, data) {
    if(err) return self.emit('error', err);
    self._handleResponse(data);
    setTimeout(function() {
      self.poll();
    }, self.interval * 1000);
  });
};

module.exports = GitHubTimeline;