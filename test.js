
var Timeline = require('./');

var timeline = new Timeline({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET
});
timeline.on('event', function(e) {
  console.log(e);
});
timeline.on('error', function(e) {
  console.error(e);
});
timeline.poll();