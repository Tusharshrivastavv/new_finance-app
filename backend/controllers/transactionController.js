const Transaction = require('../models/Transaction');

exports.addTransaction = async (req, res) => {
  const { type, amount, category, date, description } = req.body;
  try {
    const transaction = new Transaction({ userId: req.userId, type, amount, category, date, description });
    await transaction.save();
    res.json({ success: true, transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding transaction' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ createdAt: -1 }); // latest first
    res.json({ success: true, transactions });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error fetching transactions' });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId: req.userId });
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error deleting transaction' });
  }
};