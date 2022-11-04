const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();

//Passport Config
require('./config/passport')(passport);

//dotenv
require("dotenv").config();

//DB Config
const db = require('./config/keys').mongoURI;

// Connect DB
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('MongoDB connected'))
.catch( err => console.log(err));

//Set public like statics pages
app.use(express.static('public'));

// EJS
app.use(expressLayouts);
app.set('views', './server/views', {async: true});
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: true }));

//Express Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
  }));

  //Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  //Connect flash
  app.use(flash());

  //Global Vars
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//Routes
app.use('/', require('./server/routes/index'));
app.use('/users', require('./server/routes/users'));

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`));
