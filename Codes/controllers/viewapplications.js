var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/viewapplications');
var mailer = require('../nodemailer');

router.get('/', function (req, res) {
    res.render('viewapplications.ejs', { title: 'View applications' });
});

router.get('/get', function (req, res) {
    viewapplications.getUserdetails(function(err,rows){
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