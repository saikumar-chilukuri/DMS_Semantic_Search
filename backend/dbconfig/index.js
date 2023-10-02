const mongoose = require('mongoose');
require('dotenv').config();

mongoURI = process.env.mongoURI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Database connection failed', err);
  });
