var app = require('../');

if (!app.redis) {
  var haredis = require('haredis');
  app.conf.redis || (app.conf.redis = {});

  if (Array.isArray(app.conf.redis)) app.redis = haredis.createClient(app.conf.redis);
  else if (app.conf.redis.nodes) app.redis = haredis.createClient(app.conf.redis.nodes, app.conf.redis);
  else app.redis = haredis.createClient(app.conf.redis.port, app.conf.redis.host, app.conf.redis);
}
