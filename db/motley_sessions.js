module.exports = function container (get) {
  return get('db.createCollection')('motley_sessions')
}