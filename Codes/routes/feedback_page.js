'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/feedback_page', function (req, res) {
    res.render('feedback_page.ejs');
});

module.exports = router;
