'use strict';
var express = require('express');
var router = express.Router();


router.get('/approveholdandrejectapplications', function (req, res) {
    res.render('aapproveholdandrejectapplications.ejs');
});

module.exports = router;
