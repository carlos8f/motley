var app = require('./');

if (!app.redis) {
  var haredis = require('haredis');

  app.conf.redis || (app.conf.redis = {});
  if (Array.isArray(app.conf.redis)) {
    // amino style
    app.redis = haredis.createClient(app.conf.redis);
  }
  else if (app.conf.redis.nodes) {
    // haredis style
    app.redis = haredis.createClient(app.conf.redis.nodes, app.conf.redis);
  }
  else {
    // node_redis style
    app.redis = haredis.createClient(app.conf.redis.port, app.conf.redis.host);
  }
}
