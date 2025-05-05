const express = require('express');
const router = express.Router();

const { routes } = require('../../constant');
const { auth, profile } = require('../../controllers');
const { authToken } = require('../../middleware');

/* authentication */
router.post(routes.paths.signup, auth.userSignup);
router.post(routes.paths.signin, auth.userSignin);
router.post(routes.paths.signout, auth.userSignout);

router.get(routes.paths.profiledetails, authToken, profile.getProfile);
router.patch(routes.paths.updatepassword, authToken, profile.updateAdminPassword);

module.exports = {
  v1Routes: router,
};
