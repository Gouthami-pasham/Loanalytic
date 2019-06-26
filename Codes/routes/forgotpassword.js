'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/forgotpassword', function (req, res) {
    res.render('forgotpassword.ejs');
});

module.exports = router;
