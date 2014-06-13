![motley](https://raw.github.com/carlos8f/motley/master/assets/motley-full.png)

[![build status](https://secure.travis-ci.org/carlos8f/motley.png)](http://travis-ci.org/carlos8f/motley)

[![NPM](https://nodei.co/npm/motley.png?downloads=true)](https://nodei.co/npm/motley/)

## Introduction

Cyberpunking the internets. That's what you should be doing right now, and the Motley node.js framework makes it easy! Lovingly crafted in an efficient Model-View-Controller sytle, Motley combines the best tools for making websites:

- [schemaless, portable data layer](https://www.npmjs.org/package/modeler)
- [Handlebars views](https://www.npmjs.org/package/templ)
- [express-compatible](https://github.com/cpsubrian/node-expres)
  [middleware and controllers](https://www.npmjs.org/package/middler)
- [file server with in-memory cache](https://www.npmjs.org/package/buffet)
- [intelligent gzip compression and e-tag support](https://www.npmjs.org/package/dish)
- [session persistence and authentication](https://github.com/carlos8f/sess)
- [auto-loadable "plugin" application structure](https://gist.github.com/carlos8f/cd931ba95481a7570602)

...with stupidly awesome gist integration, allowing you to kickstart a prototype or venture into complete application development, all with just a couple shell commands.

It's worth noting that if you're coming from [express.js](http://expressjs.com/), Motley emulates many express/connect features, such as middleware, views, and sessions. In most cases, you'll be able to use your favorite connect/express middleware and port your apps with ease.

## Installation

`$ npm install -g motley`

## Famous two-line bootstrap

```
$ motley-init my-project 
$ motley my-project
server running at http://localhost:3000/
```

![screenshot](https://raw.githubusercontent.com/carlos8f/motley/master/assets/boot.png)

## One-line gist creation

```
$ motley-init --gist [--public] [--open] [my-project]
```

This will:

- prompt you for your github credentials, which are then exchanged
  for an [access token](https://www.npmjs.org/package/gist-cli) and cached at `~/.gist-login`
- create a gist containing [a new motley project](https://gist.github.com/carlos8f/b7d6f5b60306e63da635), optionally public with `--public`
- check out the gist's git repo via ssh, giving you version control
- optionally open your browser and point it to the gist with `--open`

Then you have a brand new web app, runnable with the `motley` binary, tied to a private git repo, backed by [gist.github.com](https://gist.github.com/), and all you had to do was type `motley-init`!

Simply run `motley` in the project directory, the web server will start, and edit the source code to do what you want!

## Examples

[Example apps](https://github.com/carlos8f/motley/tree/master/example) using Motley:

- [the &ldquo;hello world&rdquo; app](https://github.com/carlos8f/motley/tree/master/example/hello-world)
- [simple blog with in-memory database](https://github.com/carlos8f/motley/tree/master/example/blog)
- [simple blog with LevelDB persistence, as a gist](https://gist.github.com/carlos8f/b7d6f5b60306e63da635)
- [a mini app](https://github.com/carlos8f/motley/tree/master/example/minimal)

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2014 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2014 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

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
