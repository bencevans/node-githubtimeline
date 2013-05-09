
var assert = require('assert'),
    Timeline = require('./');

var timeline = new Timeline({
  clientId: process.env.GITHUB_ID || null,
  clientSecret: process.env.GITHUB_SECRET || null
});

describe('githubtimeline', function() {
  it('should receive events', function(done) {
    var received = 0;
    timeline.on('event', function(e) {
      assert.ok(e);
      if(received++ == 1)
        done();
    });
    timeline.on('error', function(err) {
      assert.ifError(err);
    });
    timeline.poll();
  });
});

