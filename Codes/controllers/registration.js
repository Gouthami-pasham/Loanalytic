var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/registration');
var mailer = require('../nodemailer');

router.get('/', function (req, res) {
    res.render('register.ejs', { title: 'Register' });
});

router.get('/getuser', function (req, res) {
    registration.getUserdetails(function(err,rows){
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
    registration.createUser(req.body,function(err,count){
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

router.post('/updateUser', function (req, res) {
    console.log(JSON.stringify(req.body));
    registration.updateUser(req.body,function(err,count){
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

router.get('/activateUser/:email', function (req, res) {
   // console.log(JSON.stringify(req.body));
   var email = req.params.email;
    registration.activateUserById(email,function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
           // res.json(count);
           res.render('verifyuser.ejs', { title: 'Verify User'});
        }
    });
    //res.send("email is set to " + req.params.email);
});

router.post('/getUserById', function (req, res) {
    console.log(JSON.stringify(req.body));
    registration.getUserById(req.body,function(err,count){
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