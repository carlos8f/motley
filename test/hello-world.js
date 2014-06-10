describe('hello world example', function () {
  var proc;
  before(function (done) {
    var binPath = path.resolve(__dirname, '../bin/motley');
    proc = spawn(binPath, [], {cwd: examples + '/hello-world'});
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
  it('GET /', function (done) {
    request('http://localhost:3000/', function (err, resp, body) {
      assert.ifError(err);
      assert.equal(resp.statusCode, 200);
      assert(resp.headers['content-type'].match(/text\/html/));
      assert.equal(body, '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '  <meta charset="utf-8">\n' +
        '  <title></title>\n' +
        '  <link rel="stylesheet" href="/css/style.css">\n' +
        '  <link rel="icon" type="image/png" href="/motley.png">\n' +
        '</head>\n' +
        '<body>\n' +
        '  Hello World!\n' +
        '\n' +
        '</body>\n' +
        '</html>\n');
      done();
    });
  });
  it('GET /css/style.css', function (done) {
    request('http://localhost:3000/css/style.css', function (err, resp, body) {
      assert.ifError(err);
      assert.equal(resp.statusCode, 200);
      assert(resp.headers['content-type'].match(/text\/css/));
      assert.equal(body, 'body {\n' +
        '  font-family: Helvetica, sans-serif;\n' +
        '  padding: 50px;\n' +
        '  font-size: 1.5em;\n' +
        '}\n');
      done();
    });
  });
  it('GET /motley.ico', function (done) {
    request({uri: 'http://localhost:3000/motley.ico', encoding: 'base64'}, function (err, resp, body) {
      assert.ifError(err);
      assert.equal(resp.statusCode, 200);
      assert(resp.headers['content-type'].match(/image\/x\-icon/));
      assert.equal(body, 'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC5QgAAAAAAALlCAwC5QiMAuUJLALlCawC5QmsAuUJLALlCIwC5QgMAAAAAALlCAAAAAAAAAAAAAAAAAAAAAAAAAAAAALlCGwC5QqsAuULCALlCxwC5QscAuULHALlCxwC5QsIAuUKrALlCGwAAAAAAAAAAAAAAAAC5QgAAAAAAAL1EQQC+RMwQrTzHFKo6xwC9PcQAvT7FALhCxgC5QsYAuULGALlCxgC5Qs0AuUJBAAAAAAC5QgAAAAAAALtDISSeNNC3PQXWyjAA2MoxANiGHl/jG2561gC6QMUAuELGALlCxgC5QsUAuULGALlCzgC5QiEAAAAAAP9oBWN1ILjPLADZzC8A2bgoHtxeB6zyRQDU+UoA0PkuRJbhAMM5wwC4QsYAuULGALlCxQC5QsYAuUKxALlCBoJfFSvGMwHXzDAA2MsvANlYBbPzSQDN90kAzvhIAM33SwDS+h1yctQAuUHFALhBxQC5QsYAuULGALlCxAC5QimwPwZkzC8A2tAxANh+EnnpRQDT+UkAzvhJAM74SADO90wAzPktSb/oAMyU0QDAX8oAuD7FALlCxgC5QscAuUJdwTUCiMwvANrILgTZSADO+EkAzfdJAM74SQDO+EkAzfgffOHoAPL04ADj9OEA5fniAMmD0AC4PsUAuULGALlCfa1DCIjMLwDasyYk3UkAzPdJAM74SQDO+EkAzvhAGNH1Advv4QDi8OEA4/HhAOPx4QDi7uAAvFHIALlCxgC5Qn5xaxtjyjAA2rElKd5JAMz3SQDO+EkAzvhJAM74Ph/S9ADj8eAA4/HhAOPx4QDi8OAA4vDgAMBfygC5QscAuUJeD6w7KrY+Bta/KhTbSgDM90kAzfdJAM74SQDO+EQN0PYGzu/iAOLw4ADj8eEA4/HhAODo3wC4P8UAuULFALlCKgDNTAcNrz2zoVEF0mcCpvJIANP5SgDQ+UwA1PpBFLnvCqiD0gDbz9sA4OTeANjG2gC9VcgAuEDGALlCswC5QgcAAAAAALhBKQC7Qs4Zm0TKK0uR3i9Gk+AVhGXQAL0+xQC5QsYAuEDFALg/xQC4QMUAuULGALlCzgC5QikAAAAAALlCAAAAAAAAuEJIALpBzgC/PcUAvz3EALtAxQC4QsYAuULGALlCxgC5QsYAuULGALlCzgC5QkgAAAAAALlCAAAAAAAAAAAAAAAAAAC5QiQAuUKwALlCxAC5QscAuULHALlCxwC5QscAuULEALlCsAC5QiQAAAAAAAAAAAAAAAAAAAAAAAAAAAC5QgAAAAAAALlCBQC5QicAuUJVALlCdAC5QnQAuUJVALlCJwC5QgUAAAAAALlCAAAAAAAAAAAA//8AAPAPAADgBwAAwAMAAIABAACAAQAAgAEAAAABAAAAAQAAgAEAAIABAACAAQAAwAMAAOAHAADwDwAA//8AAA==');
      done();
    });
  });
  it('GET /nothing', function (done) {
    request({uri: 'http://localhost:3000/nothing'}, function (err, resp, body) {
      assert.ifError(err);
      assert.equal(resp.statusCode, 404);
      assert.equal(body, '');
      done();
    });
  });
});
