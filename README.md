![motley](https://raw.github.com/carlos8f/motley/master/assets/motley-full.png)

## Get Started in 3 shell commands:

```
git clone git@github.com:carlos8f/motley-init.git
cd motley-init && npm install
node server.js
```

(or just fork the [motley-init](https://github.com/carlos8f/motley-init) repo!)

## Example server.js

```js
var motley = require('motley')

try {
  var app = motley({
    _ns: 'motley',
    _maps: [
      // require()'ed motley plugins go here.
    ],
    'hooks.listen[]': function container (get, set) {
      return function task (cb) {
        get('vendor.console').log('listening on http://localhost:' + get('site.server').address().port + '/')
        setImmediate(cb)
      }
    },
    'middleware[]': function container (get, set) {
      return function handler (req, res, next) {
        res.vars || (res.vars = {})
        res.vars.nonce = Math.random()
        next()
      }
    },
    'controllers[]': function container (get, set) {
      return get('controller')()
        .get('/', function (req, res, next) {
          res.json({
            'welcome': 'to ' + get('conf.site.title') + '!',
            'version': require('./package.json').version,
            'nonce': res.vars.nonce
          })
        })
    },
    'hooks.close[]': function container (get, set) {
      return function task (cb) {
        get('vendor.console').log('\n\nmotley says goodbye :)\n')
        setImmediate(cb)
      }
    }
  })
}
catch (err) {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
}

app.listen(function (err) {
  if (err) {
    console.error(err)
    console.error(err.stack)
    process.exit(1)
  }
  function onExit () {
    app.close(function (err) {
      if (err) {
        console.error(err)
        console.error(err.stack)
        process.exit(1)
      }
    })
  }
  process.once('SIGINT', onExit)
  process.once('SIGTERM', onExit)
})
```

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
