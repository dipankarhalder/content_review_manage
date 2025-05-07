const paths = {
  /* base route */
  base: '/api',
  v1Base: '/v1',

  /* auth */
  signup: '/auth/signup',
  signin: '/auth/signin',
  signout: '/auth/signout',

  /* profile */
  profiledetails: '/profile/me',
  updatepassword: '/profile/update-admin-password',

  /* taxes */
  newTax: '/tax/new',
  listTaxs: '/tax/list',
  taxItem: '/tax/:id',
};

module.exports = {
  paths,
};
