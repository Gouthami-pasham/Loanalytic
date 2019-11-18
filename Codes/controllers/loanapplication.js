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
    //res.json(req.files);
    var fileArray = [];
    fileArray.push(req.files.addressProof);
    fileArray.push(req.files.ssnProof);
    fileArray.push(req.files.incomeProof);
    responseData = [];
    var application_id = req.body.application_id;
    var DocumentType = ["Address Proof","SSN Proof","Income Proof"]
   for(let i = 0 ; i < fileArray.length; i++){
        var fileData = fileArray[i];
        var docType = DocumentType[i];
       // console.log(JSON.stringify(fileData.name));
        var img_name = fileData.name;
       if (fileData.mimetype  == "image/jpeg" || fileData.mimetype  == "image/png" ||fileData.mimetype  == "image/PNG"|| fileData.mimetype  == "image/gif") {
            fileData.mv('public/images/upload_images/'+application_id+'_'+fileData.name)
            var data = {
                "application_id":application_id,
                "img_name":img_name,
                "documentType":docType,
                "filePath":'images/upload_images/'+application_id+'_'+fileData.name
            };
            loanApplication.uploadDocument(data,function(err,count){
                if(err)
                {
                    console.log(JSON.stringify(err))
                    res.json(err);
                }
                else{
                    console.log(JSON.stringify(responseData))
                }
            });
        } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.json({"message":message});
        }
    }
   // res.status(204).send();
   res.json({"message":"Success"})
   //res.json(req.files)
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