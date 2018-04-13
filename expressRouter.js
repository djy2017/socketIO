export default function (app) {
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });
  app.get('/user', (req, res) => {
    res.sendFile(`${__dirname}/user.html`);
  });
}