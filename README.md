![motley](https://raw.github.com/carlos8f/motley/master/assets/motley-full.png)

## Get Started in 3 shell commands:

```
git clone git@github.com:carlos8f/motley-init.git
cd motley-init && npm install
node server.js
```

(or just fork the [https://github.com/carlos8f/motley-init](motley-init) repo!)

## Example server.js

```js
var motley = require('./')

try {
  var app = motley({
    _ns: 'motley',
    _maps: [
      // require()'ed motley plugins go here.
    ],
    'hooks.listen[]': function container (get, set) {
      return function task (cb) {
        console.log('listening on http://localhost:' + get('site.server').address().port + '/')
        cb()
      }
    }
  })
}
catch (err) {
  console.error(err)
  process.exit(1)
}

app.listen(function (err) {
  if (err) return console.error(err)
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
