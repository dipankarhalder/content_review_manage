const express = require('express');
const router = express.Router();

const { routes } = require('../../constant');
const { auth } = require('../../controllers');

/* authentication */
router.post(routes.paths.signup, auth.userSignup);
router.post(routes.paths.signin, auth.userSignin);
router.post(routes.paths.signout, auth.userSignout);

module.exports = {
  v1Routes: router,
};
