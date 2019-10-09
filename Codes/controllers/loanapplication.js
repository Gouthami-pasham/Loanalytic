var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var loanApplication = require('../models/registration');
var mailer = require('../nodemailer');
router.get('/', function (req, res) {
    res.render('loanapplication.ejs', { title: 'Apply Loan' });
});

router.get('/getuser', function (req, res) {
    loanApplication.getUserdetails(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});

router.post('/createuser', function (req, res) {
    console.log(JSON.stringify(req.body));
    loanApplication.saveApplication(req.body,function(err,count){
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

router.post('/getUserById', function (req, res) {
    console.log(JSON.stringify(req.body));
    /*registration.getUserById(req.body,function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(count);
        }
    });*/
    res.json(req.body);
});


router.post('/sendEmail', function (req, res) {
    console.log(JSON.stringify(req.body));
   mailer.sendEmail(req.body,function(response){
       res.json(response);
    });
    //res.json(req.body);
  });



module.exports = router;

