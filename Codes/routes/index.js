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

router.get('/userhome', function (req, res) {
    res.render('userhome.ejs', { title: 'Login' });
});


router.get('/loancalculator', function (req, res) {
    res.render('loancalculator.ejs', { title: 'LoanCalculator' });
});

router.get('/forgotpassword', function (req, res) {
<<<<<<< HEAD
    res.render('forgotpassword.ejs');
});
=======
    res.render('forgotpassword.ejs', { title: 'Forgotpassword' });
});

>>>>>>> bc07b91422ffc1e035dbd23e5fe6fa52b99222d7

router.get('/uploadfile', function (req, res) {
    res.render('uploadfile.ejs', { title: 'Register' });
});




module.exports = router;
