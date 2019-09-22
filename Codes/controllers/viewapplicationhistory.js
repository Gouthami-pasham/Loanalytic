var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/viewapplicationhistory');
var mailer = require('../nodemailer');

router.get('/', function (req, res) {
    res.render('viewapplicationhistory.ejs', { title: 'View application history' });
});

router.get('/get', function (req, res) {
    viewapplicationhistory.getUserdetails(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});



module.exports = router;