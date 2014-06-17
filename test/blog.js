describe('blog example', function () {
  var proc, browser = new (require('zombie'));
  var binPath = path.resolve(__dirname, '../bin/motley');
  var port;
  before(function (done) {
    proc = spawn(binPath, ['--install', '--port=0'], {cwd: examples + '/blog'});
    process.on('exit', function () {
      proc.kill();
    });
    proc.stdout.on('data', function (data) {
      var portMatch = data.toString().match(/server running at http:\/\/localhost:(.*)\/\n/i);
      assert(portMatch);
      port = portMatch[1];
      assert.notEqual(port, '3000');
      done();
    });
  });
  after(function () {
    if (proc) proc.kill();
  });
  it('log in', function (done) {
    browser.visit('http://localhost:' + port + '/', function () {
      assert.equal(browser.text('title'), 'motley example');
      browser
        .fill('id', 'carlos8f')
        .pressButton('create user or log in', function () {
          assert.ok(browser.success);
          assert(browser.text().match(/logged in as carlos8f/));
          done();
        });
    });
  });
  // @todo: work out a way to do custom error templates?
  it.skip('create post (validation)', function (done) {
    browser
      .fill('title', 'Jabberwocky (abridged)')
      .pressButton('Post', function () {
        assert.equal(browser.text(), 'WTF ERR! body is required!');
        browser.back(function () {
          done();
        });
      });
  });
  it('create post', function (done) {
    browser
      .fill('title', 'Jabberwocky (abridged)')
      .fill('body', 'Twas brillig, and the slithy toves\n\n##And the mome raths outgrabe.')
      .pressButton('Post', function () {
        assert.ok(browser.success);
        assert.equal(browser.text('title'), 'Jabberwocky (abridged)');
        assert.equal(browser.text('h2'), 'Jabberwocky (abridged)And the mome raths outgrabe.');
        assert.equal(browser.text('small'), 'by carlos8f');
        assert.equal(browser.text('.body'), 'Twas brillig, and the slithy toves And the mome raths outgrabe.');
        assert.equal(browser.text('.message.success'), 'post successful');
        done();
      });
  });
  it('go back', function (done) {
    browser.clickLink('« back', function (err) {
      assert.ifError(err);
      assert.equal(browser.text('ul.posts li'), 'Jabberwocky (abridged) by carlos8f');
      done();
    });
  });
  it('log out', function (done) {
    assert(!browser.html().match(/create user or log in/));
    browser.clickLink('.account a', function (err) {
      assert.ifError(err);
      assert(browser.html().match(/create user or log in/));
      assert.equal(browser.text('ul.posts li'), 'Jabberwocky (abridged) by carlos8f');
      done();
    });
  });
});
