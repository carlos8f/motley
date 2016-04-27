var sosa_mem = require('sosa_mem');
var sosa_redis = require('sosa_redis');
var sosa_mongo = require('sosa_mongo');

module.exports = function container (get) {
  var adapter = get('conf.db.adapter');
  switch (adapter) {
    case 'mem':
      return sosa_mem({
        prefix: get('conf.db.name')
      });
    case 'redis':
      var client = get('conf.db.redis_client');
      if (!client) {
        client = get('vendor.redis').createClient({
          host: get('conf.db.host'),
          port: get('conf.db.port'),
          password: get('conf.db.password'),
          db: get('conf.db.redis_db')
        });
      }
      return sosa_redis({
        client: client,
        prefix: get('conf.db.name')
      });
    case 'mongo':
      var client = get('conf.db.mongo_client');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test_' + Math.random().toString(16).substring(2);
MongoClient.connect(url, function (err, db) {
  assert.ifError(err);
  var collection = sosa_mongo({db: db});
      break;
  }
}