const Receipt = require('../models/Receipt');
const Tesseract = require('tesseract.js');
const sharp = require('sharp');

exports.uploadReceipt = async (req, res) => {
  const { image } = req.body; // base64 data URL, e.g. "data:image/png;base64,...."
  try {
    const preprocessedImage = await preprocessReceiptImage(image);
    const { data: { text } } = await Tesseract.recognize(preprocessedImage, 'eng');
    const parsedData = parseReceiptText(text);
    const receipt = new Receipt({ userId: req.userId, imageUrl: image, extractedData: parsedData });
    await receipt.save();
    res.json({ success: true, extractedData: parsedData, rawText: text });
  } catch (error) {
    console.error('Receipt processing error:', error);
    res.status(400).json({ success: false, message: 'Error processing receipt' });
  }
};

// --- IMAGE PREPROCESSING ---
// Cleans up the receipt photo before OCR so Tesseract has an easier time:
// - grayscale: removes color noise, OCR only cares about text shapes
// - normalize: stretches contrast so faint text becomes more readable
// - sharpen: crisps up slightly blurry edges
// - threshold: converts to pure black/white, which Tesseract reads best
async function preprocessReceiptImage(base64Image) {
  // Strip the "data:image/png;base64," prefix if present
  const base64Data = base64Image.includes(',')
    ? base64Image.split(',')[1]
    : base64Image;

  const inputBuffer = Buffer.from(base64Data, 'base64');

  const processedBuffer = await sharp(inputBuffer)
    .resize({ width: 1500, withoutEnlargement: false }) // upscale small photos, helps OCR
    .grayscale()
    .normalize()
    .sharpen()
    .threshold(150) // tweak 120-180 depending on your receipts' lighting
    .toBuffer();

  return processedBuffer;
}

function parseReceiptText(text) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return {
    amount: extractAmount(text, lines),
    date: extractDate(text),
    vendor: extractVendor(lines),
  };
}

function extractAmount(text, lines) {
  const numberPattern = /\d+[.,]\d{2}/g;

  const totalLine = lines.find(
    (line) => /\btotal\b/i.test(line) && !/sub\s*-?\s*total/i.test(line)
  );
  if (totalLine) {
    const match = totalLine.match(numberPattern);
    if (match) {
      return parseFloat(match[match.length - 1].replace(',', '.'));
    }
  }

  const allNumbers = text.match(numberPattern);
  if (allNumbers && allNumbers.length > 0) {
    const values = allNumbers.map((n) => parseFloat(n.replace(',', '.')));
    return Math.max(...values);
  }

  return null;
}

function extractDate(text) {
  const patterns = [
    /\b\d{2}\/\d{2}\/\d{4}\b/,
    /\b\d{2}-\d{2}-\d{4}\b/,
    /\b\d{4}-\d{2}-\d{2}\b/,
    /\b\d{2}\/\d{2}\/\d{2}\b/,
    /\b\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}\b/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return null;
}

function extractVendor(lines) {
  for (const line of lines.slice(0, 5)) {
    const isMostlyNumbers = /^[\d\s.,:/-]+$/.test(line);
    const isTooShort = line.length < 3;
    if (!isMostlyNumbers && !isTooShort) {
      return line;
    }
  }
  return lines[0] || null;
}