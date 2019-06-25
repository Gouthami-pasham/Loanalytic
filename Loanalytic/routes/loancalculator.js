'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loancalculator', function (req, res) {
    res.render('loancalculator.ejs');
});

module.exports = router;
