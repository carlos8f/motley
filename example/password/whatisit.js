module.exports = function (app) {
  console.log('password is', app.conf.password);
  app.close();
};
