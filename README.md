motley
======

an alternative rapid web development framework

[![build status](https://secure.travis-ci.org/carlos8f/motley.png)](http://travis-ci.org/carlos8f/motley)

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

## Plugin system

You can always get a reference to your app by `var app = require('motley')`, even
from inside the `node_modules` tree (by using Motley as a peer-depenency). This
allows you to interact with the app's runtime from any module! Creating a plugin
is as easy as:

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

app.boot(function (err) {
  if (err) throw err;
  app.server = https.createServer(app.conf.https);
  app.motley();
  // now we're using https instead of http!
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
