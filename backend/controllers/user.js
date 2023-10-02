const jwt = require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');

const User = require('../models/User');
const EmailVerificationToken = require('../models/emailVerificationToken');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError, generateRandomBytes } = require('../utils/helper');
const PasswordResetToken = require('../models/PasswordResetToken');

var transport = generateMailTransporter();

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return sendError(res, 'User Already Exists');
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();

  // step for otp
  // generate 6 digits otp
  let OTP = generateOTP();
  // send otp to db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  // send otp to user
  // const transport = generateMailTransporter();

  transport.sendMail({
    from: 'verification@review.com',
    to: newUser.email,
    subject: 'Email Verification',
    html: `
      <p>Your verification OTP</p>
      <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) {
    return sendError(res, 'Invalid User!');
  }

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, 'User Not Found!', 404);
  }

  if (user.isVerified) {
    return sendError(res, 'User is Verified!');
  }

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) {
    return sendError(res, 'Token not found!');
  }

  const isMatched = token.compareToken(OTP);
  if (!isMatched) {
    return sendError(res, 'Please submit a valid token');
  }

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  // const transport = generateMailTransporter();

  transport.sendMail({
    from: 'verification@review.com',
    to: user.email,
    subject: 'Welcome Email',
    html: `
      <h1>Welcome to our App</h1>
    `,
  });

  res.json({ message: 'Your email is verified' });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, 'User Not Found!');
  }

  if (user.isVerified) {
    return sendError(res, 'this email is already verified');
  }

  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken) {
    return sendError(res, 'You can request another token after 1 hr');
  }

  let OTP = generateOTP();

  // send otp to db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  // send otp to user
  // const transport = generateMailTransporter();

  transport.sendMail({
    from: 'verification@review.com',
    to: user.email,
    subject: 'Email Verification',
    html: `
      <p>Your verification OTP</p>
      <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({
    message: 'New Otp has been generated and sent to registered email',
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return sendError(res, 'Email does not exist');
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken) {
    return sendError(res, 'You can generate new token only after 1 hour');
  }
  // TO GENERATE THE PASSWORD RESET LINK
  const token = await generateRandomBytes();
  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset=password?token=${token}&id=${user._id}`;

  // const transport = generateMailTransporter();

  transport.sendMail({
    from: 'security@review.com',
    to: user.email,
    subject: 'Reset Password Link',
    html: `
      <p>Click here to reset password</p>
      <a href='${resetPasswordUrl}'>Change Password</a>
    `,
  });

  res.json({ message: 'Link Shared to email' });
};

exports.sendTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = User.findById(userId);
  const matched = await user.comparePassword(newPassword);

  if (matched) {
    return sendError(res, 'The new password should be different');
  }

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  // const transport = generateMailTransporter();

  transport.sendMail({
    from: 'security@review.com',
    to: user.email,
    subject: 'Password Reset Successful',
    html: `
      <p>Password Reset Successful. You can use new password </p>
    `,
  });

  res.json({ message: 'Password Reset Success' });
};

exports.signInUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 'Email/Password mismatch');
  }

  const matched = await user.comparePassword(password);
  if (!matched) {
    return sendError(res, 'Email/ Password Mismatch');
  }

  const { _id, name } = user;
  const jwtToken = jwt.sign({ userId: _id }, process.env.JWTSECRET);

  res.json({ user: { id: _id, name, email, token: jwtToken } });
};
