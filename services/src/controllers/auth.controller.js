const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');
const { env } = require('../config');
const { msg } = require('../constant');
const { auth } = require('../validation');
const { comutils } = require('../utils');

/* user signup */
const userSignup = async (req, res) => {
  try {
    const { error, value } = auth.userInfoSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return comutils.validateFields(res, error.details.map((detail) => detail.message).join(', '));
    }
    const existingEmail = await User.findOne({ email: value.email });
    if (existingEmail) {
      return comutils.validateFields(res, msg.user.emailAlreadyExist);
    }
    const user = new User({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: value.password,
      phone: value.phone,
      role: value.role,
    });
    await user.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.user.newUserCreated,
    });
  } catch (error) {
    return comutils.sendErrorResponse(res, error);
  }
};

/* user signin */
const userSignin = async (req, res) => {
  try {
    const { error, value } = auth.userLoginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return comutils.validateFields(res, error.details.map((detail) => detail.message).join(', '));
    }
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return comutils.validateFields(res, msg.user.existUserEmail);
    }
    const isMatch = await user.comparePassword(value.password);
    if (!isMatch) {
      return comutils.validateFields(res, msg.user.userWrongPassword);
    }
    const token = user.generateAuthToken();
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODEENV,
      maxAge: env.EXPTIME,
    });
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      token: token,
      message: msg.user.userLoginSuccessfully,
    });
  } catch (error) {
    return comutils.sendErrorResponse(res, error);
  }
};

/* user signin */
const userSignout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: env.NODEENV,
      sameSite: 'Strict',
    });
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.user.userLogoutSuccessfully,
    });
  } catch (error) {
    return comutils.sendErrorResponse(res, error);
  }
};

module.exports = {
  userSignup,
  userSignin,
  userSignout,
};
