var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var loanapplication = require('../models/loanapplication');
var mailer = require('../nodemailer');

router.get('/', function (req, res) {
    res.render('rejectedapplication.ejs', { title: 'Approved Application' });
});



router.get('/getRejectedApplication', function (req, res) {
    console.log(JSON.stringify(req.body));
    loanapplication.getRejectedRecords(function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(count);
        }
    });
   // res.json(req.body);
});





module.exports = router;