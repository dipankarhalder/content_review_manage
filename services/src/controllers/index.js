const { userSignup, userSignin, userSignout } = require('./auth.controller');

module.exports = {
  auth: {
    userSignup,
    userSignin,
    userSignout,
  },
};
