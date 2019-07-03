'use strict';
var express = require('express');
var router = express.Router();
var registration = require('../models/registration');
var registrationController = require('../controllers/registration');
var passwordController = require('../controllers/password');

router.use('/register', registrationController);
router.use('/forgotpassword', passwordController);

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


router.get('/uploadfile', function (req, res) {
    res.render('uploadfile.ejs', { title: 'Register' });
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
