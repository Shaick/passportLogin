const express = require('express');
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');
const router = express.Router();

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard Page
 router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard',{
        name: req.user.name
    }));


module.exports = router;
