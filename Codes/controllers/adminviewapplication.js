var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var loanapplication = require('../models/loanapplication');
var mailer = require('../nodemailer');

router.get('/', function (req, res) {
    res.render('adminviewapplication.ejs', { title: 'Admin View Application' });
});



router.get('/getTotal', function (req, res) {
    console.log(JSON.stringify(req.body));
    loanapplication.getTotalRecords(function(err,count){
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

router.post('/getDocuments', function (req, res) {
    console.log(JSON.stringify(req.body));
    loanapplication.getTotalDocuments(req.body,function(err,count){
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

router.post('/updateStatus', function (req, res) {
    console.log(JSON.stringify(req.body));
    loanapplication.updateStatus(req.body,function(err,count){
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


router.post('/sendEmail', function (req, res) {
    console.log(JSON.stringify(req.body));
   mailer.sendEmail(req.body,function(response){
       res.json(response);
    });
    //res.json(req.body);
  });



module.exports = router;