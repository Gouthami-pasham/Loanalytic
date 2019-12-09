'use strict';
var express = require('express');
var router = express.Router();
var registration = require('../models/registration');
var registrationController = require('../controllers/registration');
var loanapplicationController = require('../controllers/loanapplication');
var adminviewapplicationController = require('../controllers/adminviewapplication');
var approvedpplicationController = require('../controllers/approvedapplication');
var rejectedapplicationController = require('../controllers/rejectedapplication');
var viewapplicationController = require('../controllers/viewapplication');
var passwordController = require('../controllers/password');

router.use('/register', registrationController);
router.use('/forgotpassword', passwordController);
router.use('/loanapplication', loanapplicationController);
router.use('/adminviewapplication', adminviewapplicationController);
router.use('/approvedapplication', approvedpplicationController);
router.use('/rejectedapplication', rejectedapplicationController);
router.use('/viewapplication', viewapplicationController);


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index.ejs', { title: 'Login' });
});

router.get('/adminhome', function (req, res) {
    res.render('adminhome.ejs', { title: 'Login' });
});
router.get('/editprofile', function (req, res) {
    res.render('editprofile.ejs', { title: 'Edit Profile' });
});

router.get('/verifyuser', function (req, res) {
    res.render('verifyuser.ejs', { title: 'Verify User' });
});


router.get('/userhome', function (req, res) {
    res.render('userhome.ejs', { title: 'Login' });
});

router.get('/profile', function (req, res) {
    res.render('profile.ejs', { title: 'Profile' });
});

// router.get('/loanapplication', function (req, res) {
//     res.render('loanapplication.ejs', { title: 'Apply Loan' });
// });


router.get('/loancalculator', function (req, res) {
    res.render('loancalculator.ejs', { title: 'LoanCalculator' });
});

router.get('/loancalculator_education', function (req, res) {
    res.render('loancalculator_education.ejs', { title: 'LoanCalculator_education' });
});

router.get('/feedback_page', function (req, res) {
    res.render('feedback_page.ejs', { title: 'feedback_page' });
});

router.get('/contact_us', function (req, res) {
    res.render('contact_us.ejs', { title: 'contact_us' });
});

router.get('/AboutUs', function (req, res) {
    res.render('AboutUs.ejs', { title: 'AboutUs' });
});

router.get('/Myprofile', function (req, res) {
    res.render('Myprofile.ejs', { title: 'Myprofile' });
});

router.get('/uploadfile', function (req, res) {
    res.render('uploadfile.ejs', { title: 'Register' });
});
router.get('/userPage', function (req, res) {
    res.render('userPage.ejs');
});
router.post('/getUserById', function (req, res) {
    console.log(JSON.stringify(req.body));
    registration.getUserById(req.body,function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(count);
        }
    });
   // res.json(req.body);
  });






module.exports = router;
