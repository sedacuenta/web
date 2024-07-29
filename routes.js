const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('./config/auth');
const sendMail = require('./config/mailer');  // Import the mailer

// Welcome Page
router.get('/', (req, res) => res.render('index'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        user: req.user
    })
);

// Login Page
router.get('/login', (req, res) => res.render('login'));

// About Page
router.get('/about', (req, res) => res.render('about'));

// Contact Page
router.get('/contact', (req, res) => res.render('contact', { user: req.user }));

// Products Page
router.get('/products', (req, res) => res.render('products'));

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

// Logout
router.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/');
    });
});

// Handle sending messages
router.post('/send-message', ensureAuthenticated, (req, res) => {
    const { subject, message } = req.body;
    const userEmail = req.user.email;

    const recipients = ['sedacuenta7777@gmail.com', 'chenyongjian.catay@gmail.com'];
    const emailText = `From: ${userEmail}\n\n${message}`;

    sendMail(recipients.join(','), subject, emailText, (error, info) => {
        if (error) {
            req.flash('error_msg', 'Failed to send message');
            return res.redirect('/contact');
        }
        req.flash('success_msg', 'Message sent successfully');
        res.redirect('/contact');
    });
});

module.exports = router;
