![motley](https://raw.github.com/carlos8f/motley/master/assets/motley-full.png)

an alternative rapid web development framework

[![build status](https://secure.travis-ci.org/carlos8f/motley.png)](http://travis-ci.org/carlos8f/motley)

[![NPM](https://nodei.co/npm/motley.png?downloads=true)](https://nodei.co/npm/motley/)

## Idea

Motley is an "alternative" framework whose goal is to bundle independently usable
modules into a cohesive workflow for rapid website development. You won't see any
monolithic implementations going on here. Think of it as a starter kit for your
app, and a plugin-centric pattern of development.

## Featured modules

- [middler](https://github.com/carlos8f/node-middler) - http router and middleware runner
- [buffet](https://github.com/carlos8f/node-buffet) - static asset server
- [templ](https://github.com/carlos8f/templ) - renderer for handlebars-based templates
- [expres](https://github.com/cpsubrian/node-expres) - Express.js compatibility layer
- [sess](https://github.com/carlos8f/sess) - session handler
- [haredis](https://github.com/carlos8f/haredis) - high-availability redis client
- [modeler](https://github.com/carlos8f/modeler) - schemaless db-agnostic entity
  system ([redis store](https://github.com/carlos8f/modeler-redis) used by default)

Several useful utilities are also packaged including
[dish](https://github.com/carlos8f/node-dish),
[formidable](https://github.com/felixge/node-formidable),
[glob](https://github.com/isaacs/node-glob) and
[request](https://github.com/mikeal/request).

## Bootstrap

When you initially `require('motley')` from your app, you get three things:

1. `app`: Motley exports a global (singleton) app object, so there's no need to
  create it. It's also an `EventEmitter` if you like sort kind of thing.
2. `app.boot(cb)`: Reads `./conf.yml` or `./conf.json` (if exists) and puts the
   parsed result on `app.conf`. Also reads `./package.json` (if exists) and puts
   that on `app.pkg`. Calls `cb` after, with an `err` if anything went wrong.
3. `app.motley()`: Synchronously loads all of Motley's built-in plugins, middleware
   and your app's plugins and middleware on `app`, in that order.

### Example `server.js`:

```js
var app = require('motley');

app.boot(function (err) {
  if (err) throw err;
  // (if we have any core overrides, they go here)
  app.motley();
  // (this is where we call app.server.listen(), if this is a web app)
});
```

Note that unlike other frameworks, Motley will NOT call `listen()` on the server
for you. Your app MUST call `app.server.listen()` to serve requests! This allows
you to

- use port registries such as [amino](https://github.com/amino/amino) or
  [seaport](https://github.com/substack/seaport)
- handle the `listening` event however you want
- re-use your plugins/models in CLI/cron situations when activating the server
  would be undesirable
- use an app as a plugin inside another app - "appception"!

## Middleware

Middleware are a simple way of incrementally handling an HTTP request, by defining a
function that interacts with server `req` and `res` streams, and calling
`next()` to continue to the next handler, or `next(err)` if something went wrong.

To control ordering, you may export an optional `weight` property, with `-1000`
being equivalent to `middler().first()`, `0` being neutral, and `1000` being
equivalent to `middler().last()`.

**Auto loading**: Any paths in your project matching `./middleware/**.js` will be automatically
required when `app.motley()` is called, and the exports of those files are expected
to be functions that take `req, res, next` as arguments.

### Example

```js
var app = require('motley');

module.exports = function (req, res, next) {
  // do something with request or response...
  next();
};

// "heavy" weights run after other middleware
module.exports.weight = 1000;
```

## Controllers

Controllers are where routes are defined, logic is performed for requests, and
templates are rendered.

A Motley controller is simply a node module which exports an unattached instance of
[middler](https://github.com/carlos8f/node-middler). For convenience, a new
instance of middler can be acquired by calling `app.controller()`.

**Auto loading**: Any paths in your project matching `./controllers/**.js` will
be automatically required when `app.motley()` is called, and the exports of
those files are expected to be [middler](https://github.com/carlos8f/node-middler)
instances OR middleware handlers.

### Example

```js
var app = require('motley')
  , marked = require('marked')

require('../models/posts');

function requireAuth (req, res, next) {
  if (req.user) next();
  else res.renderStatus(403);
}

module.exports = app.controller()
  .get('/', function (req, res, next) {
    var posts = [];
    app.posts.tail({load: true}, function (err, chunk, next) {
      if (err) return next(err);
      posts = posts.concat(chunk);
      if (chunk.length && next) next();
      else res.render('index', {
        title: 'motley example',
        user: req.user,
        posts: posts
      });
    });
  })
  .get('/posts/:id', function (req, res, next) {
    app.posts.load(req.params.id, function (err, post) {
      if (err) return next(err);
      if (post) res.render('post', post);
      else res.renderStatus(404);
    });
  })
  .post('/posts', requireAuth, function (req, res, next) {
    req.body.content = marked(req.body.body);
    req.body.author_id = req.user.id;
    app.posts.create(req.body, function (err, post) {
      if (err) return next(err);
      res.redirect('/posts/' + post.id);
    });
  })
```

## Plugins

Plugins in Motley are a simple way of bolting on functionality to `app` by
modifying the global state when the plugin is required. Use it to expose APIs
for your controllers or middleware to use.

**Auto loading**: Any paths in your project matching `./plugins/**.js` will
be automatically required when `app.motley()` is called, and those files are
expected to start with `var app = require('motley')` and then modify `app` in
some way.

### Example

```js
var app = require('motley');

app.hello = function () {
  console.log('hello world!');
};
```

### External plugins

Plugins can easily be packaged as npm modules, or developed in different repos.
Creating an external plugin is as easy as:

1. create a `package.json` and add `motley` to
   [peerDependencies](http://blog.nodejs.org/2013/02/07/peer-dependencies/)
2. use `var app = require('motley')` and expose an API on `app`
3. `require('my-plugin')` from your app

## Overriding core

If you don't like some core plugin or middleware, you can usually override it by
loading a plugin with the same API between when you call `app.boot()` and
`app.motley()`:

```js
var app = require('motley')
  , https = require('https')
  , modeler = require('modeler')

app.boot(function (err) {
  if (err) throw err;
  app.collection = modeler; // memory store version of modeler
  app.server = https.createServer(app.conf.https);
  app.motley();
  // now we're using https instead of http, and memory store instead of redis!
});
```

For a minimal (or highly customized) setup, you also don't even have to call
`app.motley()`, just require the parts you want and run with it:

```js
var app = require('motley');

app.boot(function (err) {
  if (err) throw err;
  require('motley/plugins/load');
  app.load('./plugins');
  // etc
});
```

## Examples

See [./example](https://github.com/carlos8f/motley/tree/master/example) for
detailed usage.

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2013 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2013 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
