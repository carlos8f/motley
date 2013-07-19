describe('minimal example', function () {
  it('works', function (done) {
    exec('node app.js', {cwd: examples + '/minimal'}, function (err, stdout, stderr) {
      assert.ifError(err);
      assert.equal(stdout, 'hello world!\n');
      done();
    });
  });
});
