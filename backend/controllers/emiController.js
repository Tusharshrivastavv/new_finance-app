const Emi = require('../models/EMI');

exports.addEmi = async (req, res) => {
  const { amount, emiDate, monthlyPayment, emiName } = req.body;
  try {
    const emi = new Emi({
      userId: req.userId,
      emiName,
      amount,
      monthlyPayment,
      remainingAmount: amount,
      emiDate
    });
    await emi.save();
    res.json({ success: true, emi });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding EMI' });
  }
};

exports.getEmis = async (req, res) => {
  try {
    const emis = await Emi.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, emis });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error fetching EMIs' });
  }
};

exports.deleteEmi = async (req, res) => {
  const { id } = req.params;
  try {
    await Emi.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error deleting EMI' });
  }
};

exports.updateMonthlyPayment = async (emiId) => {
  try {
    const emi = await Emi.findById(emiId);
    if (!emi) {
      throw new Error('EMI not found');
    }

    emi.remainingAmount = Math.max(0, emi.remainingAmount - emi.monthlyPayment);
    await emi.save();

    console.log(`Updated EMI: Remaining Amount - ₹${emi.remainingAmount}`);
  } catch (error) {
    console.error('Error updating EMI:', error);
  }
};
