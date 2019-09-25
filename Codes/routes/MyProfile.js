'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/Myprofile', function (req, res) {
    res.render('Myprofile.ejs');
});

module.exports = router;
