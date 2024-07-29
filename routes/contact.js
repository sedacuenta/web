const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.render('contact', {
    layout: 'main',
    user: req.user,
  });
});

router.post('/', ensureAuth, async (req, res) => {
  const { subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'sedacuenta7777@gmail.com, chenyongjian.catay@gmail.com',
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Email sent successfully');
  } catch (error) {
    res.send('Error sending email');
  }
});

module.exports = router;
