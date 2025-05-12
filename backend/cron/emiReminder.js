const cron = require("node-cron");
const Emi = require("../models/EMI");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

cron.schedule("0 8 * * *", async () => {  
  try {
    const today = new Date();
    const reminderDays = [1, 2];  

    for (const daysBefore of reminderDays) {
      const targetDate = new Date();
      targetDate.setDate(today.getDate() + daysBefore);

      const emis = await Emi.find({
        emiDate: {
          $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
          $lte: new Date(targetDate.setHours(23, 59, 59, 999)),
        },
      }).populate("userId");

      for (const emi of emis) {
        const emailText = `Hi ${emi.userId.name},\n\nThis is a reminder that your EMI "${emi.emiName}" of ₹${emi.monthlyPayment} is due on ${emi.emiDate.toDateString()}.\n\n- Intelligent Personal Finance Manager`;
        await sendEmail(emi.userId.email, "Upcoming EMI Reminder", emailText);
        console.log(`Email sent to ${emi.userId.email} for EMI "${emi.emiName}"`);
      }
    }
  } catch (err) {
    console.error("EMI reminder error:", err);
  }
});
