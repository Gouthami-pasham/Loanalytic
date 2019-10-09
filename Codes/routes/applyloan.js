'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/applyloan', function (req, res) {
    res.send('applyloan.ejs');
});

module.exports = router;
