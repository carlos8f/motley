module.exports = function container (get) {
  return get('utils.handlebars').create();
};
