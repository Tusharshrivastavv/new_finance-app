const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const sendEmail = require('./utils/sendEmail'); 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const Transaction = require('./models/Transaction');
const EMI = require('./models/EMI');
const User = require('./models/User');

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const emiRoutes = require('./routes/emiRoutes');

const resetMonthlyBalances = async () => {
  try {
    const transactions = await Transaction.find();
    const currentDate = new Date();

    for (const transaction of transactions) {
      if (transaction.date.getDate() === 29) {
        transaction.total = 0;
        await transaction.save();
      }
    }

    console.log(`Monthly balances reset on ${currentDate.toISOString()}`);
  } catch (error) {
    console.error('Error resetting balances:', error);
  }
};

const deductMonthlyEMI = async () => {
  try {
    const emis = await EMI.find({ remainingAmount: { $gt: 0 } });

    for (const emi of emis) {
      emi.remainingAmount = Math.max(0, emi.remainingAmount - emi.monthlyPayment);
      await emi.save();
    }

    console.log('Monthly EMI deductions completed.');
  } catch (error) {
    console.error('Error in monthly EMI deduction:', error);
  }
};

const sendEmiReminders = async () => {
  try {
    const today = new Date();
    const reminderDays = [1, 2]; 

    for (const daysBefore of reminderDays) {
      const targetDate = new Date();
      targetDate.setDate(today.getDate() + daysBefore);

      const emis = await EMI.find({
        emiDate: {
          $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
          $lte: new Date(targetDate.setHours(23, 59, 59, 999)),
        },
      }).populate('userId');

      for (const emi of emis) {
        const emailText = `Hi ${emi.userId.name},\n\nThis is a reminder that your EMI "${emi.emiName}" of ₹${emi.monthlyPayment} is due on ${emi.emiDate.toDateString()}.\n\n- Intelligent Personal Finance Manager`;
        await sendEmail(emi.userId.email, "Upcoming EMI Reminder", emailText);
        console.log(`Email sent to ${emi.userId.email} for EMI "${emi.emiName}"`);
      }
    }
  } catch (err) {
    console.error("EMI reminder error:", err);
  }
};

cron.schedule('59 23 28-31 * *', async () => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  if (today.getDate() === lastDay) {
    await deductMonthlyEMI();
  }
});

cron.schedule('4 23 29 * *', resetMonthlyBalances);

cron.schedule('0 8 * * *', sendEmiReminders); 

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/emi', emiRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
