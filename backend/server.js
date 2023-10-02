const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/error');
const cors = require('cors');
const { handleNotFound } = require('./utils/helper');

const userRouter = require('./routes/user');
const DocumentRouter = require('./routes/document');

require('./dbconfig');
require('express-async-errors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user', userRouter);
app.use('/api/document', DocumentRouter);

app.use('/*', handleNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Server Connected!' });
});
