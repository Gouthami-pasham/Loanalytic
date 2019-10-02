'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/contact_us', function (req, res) {
    res.render('contact_us.ejs');
});

module.exports = router;
