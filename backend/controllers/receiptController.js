const Receipt = require('../models/Receipt');
const Tesseract = require('tesseract.js');

exports.uploadReceipt = async (req, res) => {
  const { image } = req.body;
  try {
    const { data: { text } } = await Tesseract.recognize(image, 'eng');
    const parsedData = parseReceiptText(text); 
    const receipt = new Receipt({ userId: req.userId, imageUrl: image, extractedData: parsedData });
    await receipt.save();
    res.json({ success: true, extractedData: parsedData });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error processing receipt' });
  }
};

function parseReceiptText(text) {
  const amount = text.match(/\d+\.\d{2}/)?.[0];
  const date = text.match(/\d{2}\/\d{2}\/\d{4}/)?.[0];
  const vendor = text.match(/[A-Za-z]+/)?.[0];
  return { amount, date, vendor };
}