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
    console.log(JSON.stringify(req.files));
   /* if (!req.fi) {
        return res.status(400).send('No files were uploaded.');
    }*/
   /* var fileData = req.body;
    console.log(JSON.stringify(fileData.fileName));
    var img_name = fileData.fileName;

    if (fileData.fileType == "image/jpeg" || fileData.fileType == "image/png" || fileData.fileType == "image/gif") {
        
        fileData.file.mv('public/images/upload_images/' + img_name, function(err) {
            res.json(req.body)
           /* if (err) {
                console.log(JSON.stringify(err))
                return res.status(500).send(err);
                ;
            } else {
                loanApplication.uploadDocument(img_name,function(err,count){
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
        });
    } else {
        message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        res.json({"message":message});
    }*/
    res.json(req.files);
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