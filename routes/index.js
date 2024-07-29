const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Página principal
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Acerca de
router.get('/about', (req, res) => {
  res.render('about', { user: req.user });
});

// Contacto
router.get('/contact', (req, res) => {
  res.render('contact', { user: req.user });
});

// Productos
router.get('/products', (req, res) => {
  res.render('products', { user: req.user });
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Manejar formulario de contacto
router.post('/contact', ensureAuthenticated, (req, res) => {
  const { subject, message } = req.body;

  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tu_correo@gmail.com',
      pass: 'tu_contraseña'
    }
  });

  const mailOptions = {
    from: req.user.email,
    to: 'chenyongjian.catay@gmail.com, sedacuenta7777@gmail.com',
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Mensaje enviado: ' + info.response);
    res.redirect('/contact');
  });
});

module.exports = router;
