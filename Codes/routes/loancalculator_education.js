'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loancalculator_education', function (req, res) {
    res.render('loancalculator_education.ejs');
});

module.exports = router;
