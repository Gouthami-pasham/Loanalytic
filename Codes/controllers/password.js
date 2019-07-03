var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/registration');
var mailer = require('../nodemailer');

router.get('/', function (req, res) {
    res.render('forgotpassword.ejs', { title: 'Register' });
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

  router.post('/updateUserById', function (req, res) {
    console.log(JSON.stringify(req.body));
    registration.updateUserById(req.body,function(err,count){
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