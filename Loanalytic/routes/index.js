'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index.ejs', { title: 'Login' });
 

});
router.get('/adminhome', function (req, res) {
    res.render('adminhome.ejs', { title: 'Login' });
 

});
router.get('/register', function (req, res) {
    res.render('register.ejs', { title: 'Register' });
 

});
router.get('/uploadfile', function (req, res) {
    res.render('uploadfile.ejs', { title: 'Document' });
});




module.exports = router;
