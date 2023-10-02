const pdf = require('pdf-parse');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No File Uploaded' });
    }
    const extractedText = await extractTextFromUploadedFile(req.file.path);
    const { chunks, embeddings } = await processTextWithOpenAI(
      extractedText,
      embeddings,
      'YOUR_API_KEY'
    );

    const document = new Document({
      documentName: req.file.originalname,
      documentId: generateUniqueDocumentId(), // You'll need to implement this function
      chunks,
      embeddings,
    });

    await document.save();

    res
      .status(201)
      .json({ message: 'Document uploaded and processed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function extractTextFromUploadedFile(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    throw error;
  }
}

async function processTextWithOpenAI(text, apiKey) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/documents',
      {
        content: text,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const chunks = response.data.data.map((item) => item.text);
    const embeddings = response.data.data.map((item) => item.embedding);

    return { chunks, embeddings };
  } catch (error) {
    throw error;
  }
}

function generateUniqueDocumentId() {
  return uuidv4();
}
