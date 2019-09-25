'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loanapplication', function (req, res) {
    res.render('loanapplication.ejs', { title: 'Apply Loan' });
});


module.exports = router;