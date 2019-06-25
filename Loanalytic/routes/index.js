'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index.ejs', { title: 'Login' });
});

router.get('/', function (req, res) {
    res.render('forgotpassword.ejs', { title: 'Forgot Password'});
});

router.get('/', function (req, res) {
    res.render('loancalculator.ejs', { title: 'loan calculator'});
});

router.get('/register', function (req, res) {
    res.render('register.ejs', { title: 'Register' });


});


module.exports = router;
