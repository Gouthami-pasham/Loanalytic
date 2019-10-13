'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loanpayments', function (req, res) {
    res.render('loanpayments.ejs');
});

module.exports = router;