module.exports = function container (get, set) {
  return function connect (cb) {
    var adapter = get('conf.db.adapter');
    switch (adapter) {
      case 'mem':
        return setImmediate(cb);
      case 'redis':
        var client = get('db.redis_client');
        if (!client) {
          var options = get('conf.db.redis');
          client = get('vendor.redis').createClient(options);
          set('@db.redis_client', client);
          client.once('ready', function () {
            cb(null, client);
          });
        }
        else setImmediate(cb);
        break;
      case 'mongo':
        var client = get('conf.db.mongo_client');
        if (!client) {
          var MongoClient = get('vendor.mongodb').MongoClient;
          var options = get('conf.db.mongo');
          var url = 'mongodb://' + options.host + ':' + options.port + '/' + options.db;
          MongoClient.connect(url, function (err, client) {
            if (err) return cb(err);
            set('@db.mongo_client', client);
            cb(null, client);
          });
        }
        else setImmediate(cb);
        break;
      default:
        return cb(new Error('must provide motley:db.connect() if using custom db.adapter'));
    }
  }
};