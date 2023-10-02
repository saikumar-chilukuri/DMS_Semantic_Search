const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentId: {
    type: String,
    required: true,
    unique: true,
  },
  documentName: {
    type: String,
    required: true,
  },
  chunks: [
    {
      text: {
        type: String,
        required: true,
      },
      embeddings: {
        type: [Number],
        required: true,
      },
    },
  ],
  keywords: [
    {
      type: String,
      required: true,
    },
  ],
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
