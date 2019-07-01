'use strict';
var express = require('express');
var router = express.Router();
var registration = require('../models/registration');
var registrationController = require('../controllers/registration');

router.use('/register', registrationController);

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index.ejs', { title: 'Login' });
});

router.get('/adminhome', function (req, res) {
    res.render('adminhome.ejs', { title: 'Login' });
});


router.get('/loancalculator', function (req, res) {
    res.render('loancalculator.ejs', { title: 'LoanCalculator' });
});

router.get('/forgotpassword', function (req, res) {
    res.render('forgotpassword.ejs', { title: 'Forgotpassword' });
});


router.get('/uploadfile', function (req, res) {
    res.render('uploadfile.ejs', { title: 'Register' });


});




module.exports = router;
