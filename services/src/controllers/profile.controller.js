const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');
const { msg } = require('../constant');
const { auth } = require('../validation');
const { comutils } = require('../utils');

/* user profile */
const getProfile = async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return comutils.notFoundItem(res, msg.user.userNotFound);
    }
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: user,
    });
  } catch (error) {
    return comutils.sendErrorResponse(res, error);
  }
};

const updateAdminPassword = async (req, res) => {
  try {
    const decoded = req.user;

    /* validate request body */
    const { error, value } = auth.passwordSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return comutils.validateFields(res, error.details.map((detail) => detail.message).join(', '));
    }

    /* find the user by id */
    const user = await User.findById(decoded.id);
    if (!user) {
      return comutils.validateFields(res, msg.user.userNotFound);
    }

    /* compare the password */
    const isMatch = await user.comparePassword(value.oldPassword);
    if (!isMatch) {
      return comutils.validateFields(res, msg.user.userWrongPassword);
    }

    /* save updated password */
    user.password = value.newPassword;
    await user.save();

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.user.updatedUserPassword,
    });
  } catch (error) {
    return comutils.sendErrorResponse(res, error);
  }
};

module.exports = {
  getProfile,
  updateAdminPassword,
};
