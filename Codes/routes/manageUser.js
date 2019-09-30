'use strict';
var express = require('express');
var router = express.Router();

router.get('/userPage', function (req, res) {
    res.render('userPage.ejs');
});
module.exports = router;