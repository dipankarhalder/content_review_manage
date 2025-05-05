const express = require('express');

const { routes } = require('../constant');
const { v1Routes } = require('./v1');

const router = express.Router();
router.use(routes.paths.v1Base, v1Routes);

module.exports = {
  RootApiRouter: router,
};
