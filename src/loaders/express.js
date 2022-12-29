const express = require('express');
const bodyParser = require('body-parser');
const { nodeEnvironment } = require('../configs/index');
const apiRouter = require('../api/index');

module.exports = app => {
  if (nodeEnvironment !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
  }

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api', apiRouter);
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  return app;
};
