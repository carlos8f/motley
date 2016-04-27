module.exports = function container (get) {
  return get('db.collection')('users');
};
