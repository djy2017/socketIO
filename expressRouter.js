// express路由，url访问时返回对应页面
module.exports = function (app) {
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });
  app.get('/user', (req, res) => {
    res.sendFile(`${__dirname}/user.html`);
  });
}