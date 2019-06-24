'use strict';
var express = require('express');
var router = express.Router();

/* GET registration page. */
router.get('/', function (req, res) {
    res.render('register.ejs', { title: 'Register' });
});



module.exports = router;
