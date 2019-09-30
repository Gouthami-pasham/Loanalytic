'use strict';
var express = require('express');
var router = express.Router();

/* GET Rejected Applications page. */
router.get('/rejectedapplications', function (req, res) {
    res.render('rejectedapplications.ejs', { title: 'Rejected Applications' });
});




module.exports = router;
