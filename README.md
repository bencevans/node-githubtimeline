# githubtimeline

> Polls GitHub's timeline API, emits events through node.js events.EventEmitter

## Install

    npm install githubtimeline

### Usage

```js
var Timeline = require('githubtimeline');

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
```

### Licence

MIT © [Ben Evans](http://bensbit.co.uk)
