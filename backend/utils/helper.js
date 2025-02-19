const crypto = require('crypto');

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

// TO GENERATE RANDOM BYTES
exports.generateRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);

      const buffString = buff.toString('hex');
      console.log(buffString);
      resolve(buffString);
    });
  });
};

exports.handleNotFound = (req, res) => {
  this.sendError(res, 'Not Found', 404);
};
