'use strict';
var express = require('express');
var router = express.Router();

/* GET application history. */
router.get('/viewapplicationhistory', function (req, res) {
    res.render('viewapplicationhistory.ejs', { title: 'View Application History' });
});
module.exports = router;