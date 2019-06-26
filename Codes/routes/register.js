'use strict';
var express = require('express');
var router = express.Router();

/* GET registration page. */
router.get('/index', function (req, res) {
    res.render('index.ejs', { title: 'Register' });
});




module.exports = router;
