const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //check required filds
    if(!name || !email || !password || !password2 ) {
        errors.push({ msg: 'Please enter all fields' });
    }

    //check passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //check pass length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least six characters' })
    }

    if (errors.length > 0) {
        res.render('register', { 
          errors,
          name,
          email,
          password,
          password2
        });
    } else {
        //Validation passed
        User.findOne({ email: email}).then(user => {
            if(user) {
                //User exists
                errors.push({ msg: 'Email is already registred'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //Set to password to hash
                        newUser.password = hash;
                        //Save user
                        newUser.save().then(user => {
                            req.flash('success_msg', 'You are now registred and can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
    });
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');

  });

module.exports = router;