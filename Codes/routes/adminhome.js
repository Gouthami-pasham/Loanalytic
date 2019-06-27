'use strict';
var express = require('express');
var router = express.Router();

router.get('/adminhome', function (req, res) {
    res.render('adminhome.ejs', { title: 'Login' });
});
module.exports = router;