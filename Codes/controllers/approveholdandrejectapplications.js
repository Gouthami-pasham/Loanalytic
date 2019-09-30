var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/approveholdandrejectapplications');

router.get('/', function (req, res) {
    res.render('approveholdandrejectapplications.ejs', { title: 'Approve Hold and Reject Applications' });
});