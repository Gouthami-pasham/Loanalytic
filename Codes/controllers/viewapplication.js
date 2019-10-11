var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var loanapplication = require('../models/loanapplication');
var mailer = require('../nodemailer');

router.get('/', function (req, res) {
    res.render('viewapplication.ejs', { title: 'View Application' });
});

router.post('/getApplication', function (req, res) {
    console.log(JSON.stringify(req.body));
    loanapplication.getApplicationRecords(req.body,function(err,count){
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