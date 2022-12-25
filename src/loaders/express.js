const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('../api/index');

module.exports = app => {
  app.use(express.json());
  app.use(morgan('dev'));
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
