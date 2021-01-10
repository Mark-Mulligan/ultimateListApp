const express = require('express');
const router = express.Router();
//const session = require('express-session');
const passport = require('passport');
//const passportLocalMongoose = require('passport-local-mongoose');
//const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/user');

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/login/error', (req, res) => {
    res.render('loginError');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/lists',
        failureFlash: true,
        failureRedirect: '/login/error',
    })
);

router.post('/register', (req, res) => {
    User.register({
        username: req.body.username
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.render('register', {
                errorMessage: err
            });
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('lists/');
            })
        }
    })
})

module.exports = router;