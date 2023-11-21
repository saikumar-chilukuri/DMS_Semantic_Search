const express = require('express');
const {
  createUser,
  verifyEmail,
  resendEmailVerificationToken,
  forgotPassword,
  sendTokenStatus,
  resetPassword,
  signInUser,
} = require('../controllers/user');
const {
  nameValidator,
  validate,
  validatePassword,
  signInValidator,
} = require('../middlewares/validator');
const { isValidPassResetToken } = require('../middlewares/user');

const router = express.Router();

/**
 * @route /
 * @description To check the server status
 */
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server Connected!' });
});

/**
 * @route /user-create
 * @description To create the user
 */
router.post('/create', nameValidator, validate, createUser);

/**
 * @route /signin
 * @description To create the user
 */
router.post('/sign-in', signInValidator, validate, signInUser);

/**
 * @route /verify-email
 * @description To verify the email using the nodemailer and mailtrap
 */
router.post('/verify-email', verifyEmail);

/**
 * @route /resend-email-verificationToken
 */
router.post('/resend-email-verification-token', resendEmailVerificationToken);

/**
 * @route /forget-password
 */
router.post('/forget-password', forgotPassword);

/**
 * @route /validate-password-resetToken
 */
router.post('/verify-pass-reset-token', isValidPassResetToken, sendTokenStatus);

/**
 * @route /reset-password
 */
router.post(
  '/reset-password',
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);

module.exports = router;
