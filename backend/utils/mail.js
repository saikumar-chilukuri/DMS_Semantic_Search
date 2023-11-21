const nodemailer = require('nodemailer');

exports.generateOTP = (otp_length = 6) => {
  let OTP = '';
  for (let i = 1; i <= otp_length; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  return OTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'e14373de7a1e55',
      pass: 'd955e8e9a45bd5',
    },
  });
