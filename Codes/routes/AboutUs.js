'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/AboutUs', function (req, res) {
    res.render('AboutUs.ejs');
});

module.exports = router;
