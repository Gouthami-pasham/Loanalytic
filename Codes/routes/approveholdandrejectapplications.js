'use strict';
var express = require('express');
var router = express.Router();


router.get('/approveholdandrejectapplications', function (req, res) {
    res.render('approveholdandrejectapplications.ejs');
});

module.exports = router;
