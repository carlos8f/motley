![motley](https://raw.github.com/carlos8f/motley/master/assets/motley-full.png)

the impossibly awesome web development framework

[![build status](https://secure.travis-ci.org/carlos8f/motley.png)](http://travis-ci.org/carlos8f/motley)

[![NPM](https://nodei.co/npm/motley.png?downloads=true)](https://nodei.co/npm/motley/)

## Introduction

Cyberpunking the internets. That's what you should be doing right now, and
Motley is the <del>fool</del> tool for you, heh heh. It combines the best:

- [LevelDB schemaless models](https://www.npmjs.org/package/modeler-leveldb)
- [Handlebars views](https://www.npmjs.org/package/templ)
- [express-compatible](https://github.com/cpsubrian/node-expres)
  [middleware and controllers](https://www.npmjs.org/package/middler)
- [dynamicly](https://www.npmjs.org/package/saw) [fast file server](https://www.npmjs.org/package/buffet)
- [intelligent gzip compression and e-tag support](https://www.npmjs.org/package/dish)
- [LevelDB-backed session persistence and authentication](https://github.com/carlos8f/sess)
- and [auto-loadable application structure](https://gist.github.com/carlos8f/cd931ba95481a7570602)

...with impossibly awesome gist integration, allowing you to do
lightning-fast prototyping or complete application development, all with
just two shell commands.

## Installation

`$ npm install -g motley`

## Famous two-line bootstrap

```
$ motley-init hello-world
$ motley hello-world
server running at http://localhost:3000/
```

![screenshot](https://raw.githubusercontent.com/carlos8f/motley/master/assets/boot.png)

## One-line gist creation

```
$ motley-init --gist [--public] [--open] [dir]
```

This will:

- prompt you for your github credentials, which are then exchanged
  for an [access token](https://www.npmjs.org/package/gist-cli) and cached at
  `~/.gist-login`
- create a gist containing a new motley project
- check out the gist's git repo via ssh
- open your browser and point it to the gist

Then you have a brand new fully functioning web app, runnable with the `motley` binary,
tied to a new git repo, backed by [gist.github.com](https://gist.github.com/), and
all you had to do was type `motley-init`!

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
