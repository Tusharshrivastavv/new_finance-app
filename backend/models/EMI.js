const mongoose = require('mongoose');

const emiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emiName: { type: String, required: true },
  amount: { type: Number, required: true },
  monthlyPayment: { type: Number, required: true },
  remainingAmount: { type: Number, required: true },
  emiDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Emi', emiSchema);
