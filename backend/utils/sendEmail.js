const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",  
    auth: {
      user: "", 
      pass: "",    
    },
  });

  const mailOptions = {
    from: '"EMI Reminder" <your-email@gmail.com>',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
