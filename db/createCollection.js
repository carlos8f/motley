module.exports = function container (get) {
  return function createCollection (name, options) {
    var adapter = get('conf.db.adapter');
    switch (adapter) {
      case 'mem':
        return get('vendor.sosa_mem')()(name, options);
      case 'redis':
        var redis_client = get('db.redis_client');
        if (!redis_client) throw new Error('must call @motley:db.connect or provide @motley:db.redis_client');
        return get('vendor.sosa_redis')({
          client: redis_client,
          prefix: get('conf.db.redis').key_prefix
        })(name, options);
      case 'mongo':
        var mongo_client = get('db.mongo_client');
        if (!mongo_client) throw new Error('must call @motley:db.connect or provide @motley:db.mongo_client');
        return get('vendor.sosa_mongo')({
          db: mongo_client
        })(name, options);
      default:
        throw new Error('must provide @motley:db.createCollection if using custom db.adapter');
    }
  };
};