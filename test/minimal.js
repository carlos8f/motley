describe('minimal example', function () {
  it('works', function (done) {
    exec(path.resolve(__dirname, '../bin/motley'), {cwd: examples + '/minimal'}, function (err, stdout, stderr) {
      assert.ifError(err);
      assert.equal(stdout, 'hello world!\n');
      done();
    });
  });
});
