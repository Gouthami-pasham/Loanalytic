var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var loanApplication = require('../models/loanapplication');
var mailer = require('../nodemailer');
router.get('/', function(req, res) {
    res.render('loanapplication.ejs', {
        title: 'Apply Loan'
    });
});

router.get('/getuser', function(req, res) {
    loanApplication.getUserdetails(function(err, rows) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/saveApplication', function(req, res) {
    console.log(JSON.stringify(req.body));
    loanApplication.saveApplication(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
    // res.json(req.body);
});

router.post('/uploadDocument', function(req, res) {
   //console.log(JSON.stringify(req.files));
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    res.json(req.files);
   // var fileData = req.files.ssnProof;
   // console.log(JSON.stringify(fileData.name));
   // var img_name = fileData.name;
    //var application_id = req.body.application_id;
    //if (fileData.mimetype  == "image/jpeg" || fileData.mimetype  == "image/png" ||fileData.mimetype  == "image/PNG"|| fileData.mimetype  == "image/gif") {

          /*  const file = req.files;
            for(let i = 0 ; i < file.length; i++){
    
                file[i].mv('public/images/upload_images/'+application_id+file[i].name, function (err){
                    if(err){
                        res.send(err);
                    }
    
                })
    
            }
           res.send('files uploaded');
    
    */
        /*fileData.mv('public/images/upload_images/' + img_name, function(err) {
            //res.json(req.body)
            if (err) {
                console.log(JSON.stringify(err))
                return res.status(500).send(err);
                ;
            } else {
                 var data = {
                    "application_id":application_id,
                    "img_name":img_name,
                    "filePath":'public/images/upload_images/' + img_name
                };
               /* var data = {
                    "status":200,
                    "message":"success",
                }*/
                //return res.json(data);
               
                /*loanApplication.uploadDocument("test",function(err,count){
                    if(err)
                    {
                        console.log(JSON.stringify(err))
                        res.json(err);
                    }
                    else{
                        console.log(JSON.stringify(count))
                        res.json(count);
                    }
                });
            }
        });*/
   /* } else {
        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        res.json({"message":message});
    }*/
  //  res.json(req.files);
});


router.post('/getUserById', function(req, res) {
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


router.post('/sendEmail', function(req, res) {
    console.log(JSON.stringify(req.body));
    mailer.sendEmail(req.body, function(response) {
        res.json(response);
    });
    //res.json(req.body);
});


module.exports = router;