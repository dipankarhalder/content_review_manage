const { userSignup, userSignin, userSignout } = require('./auth.controller');
const { getProfile, updateAdminPassword } = require('./profile.controller');

module.exports = {
  auth: {
    userSignup,
    userSignin,
    userSignout,
  },
  profile: {
    getProfile,
    updateAdminPassword,
  },
};
