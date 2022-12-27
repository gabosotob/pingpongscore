const express = require('express');
const loaders = require('./loaders/index');
const { port } = require('./configs/index');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome!');
});

const startApp = async () => {
  await loaders.init({ expressApp: app });

  app.listen(port, () => {
    console.log('Server listening on port:', port);
  });
};

startApp();

module.exports = app;
