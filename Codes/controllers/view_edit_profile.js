var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/registration');
var mailer = require('../nodemailer');

router.get('/', function (req, res) {
    res.render('view_edit_profile.ejs', { title: 'view_edit profile' });
});
