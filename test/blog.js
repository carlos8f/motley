describe('blog example', function () {
  var proc, browser = new (require('zombie'));
  before(function (done) {
    proc = spawn('node', ['server.js'], {cwd: examples + '/blog'});
    process.on('exit', function () {
      proc.kill();
    });
    proc.stdout.on('data', function (data) {
      assert.equal(data.toString(), 'server running at http://localhost:3000/\n');
      done();
    });
  });
  after(function () {
    if (proc) proc.kill();
  });
  it('log in', function (done) {
    browser.visit("http://localhost:3000/", function () {
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
  it('create post (validation)', function (done) {
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
});
