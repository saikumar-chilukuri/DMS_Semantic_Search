const express = require('express');
// const multer,  = require('multer');
const { uploadDocument } = require('../controllers/document');

const router = express.Router();

router.get('/upload', uploadDocument);

module.exports = router;
