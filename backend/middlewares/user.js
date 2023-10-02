const { isValidObjectId } = require('mongoose');
const PasswordResetToken = require('../models/PasswordResetToken');
const { sendError } = require('../utils/helper');

exports.isValidPassResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token.trim() || isValidObjectId(userId)) {
    return sendError(res, 'Invalid request');
  }

  const resetToken = await PasswordResetToken.findOne({ owner: userId });

  if (!resetToken) {
    return sendError(res, 'Unauth Access!, InvalidToken');
  }

  const matchToken = await resetToken.compareToken(token);
  if (!matchToken) {
    return sendError(res, 'Unauth Access!, InvalidToken');
  }

  req.resetToken = resetToken;
  next();
};
