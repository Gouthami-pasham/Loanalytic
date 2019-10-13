'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/monitorpayments', function (req, res) {
    res.render('monitorpayments.ejs');
});

module.exports = router;