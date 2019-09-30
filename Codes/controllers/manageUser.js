var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/admin');

router.get('/', function (req, res) {
    res.render('userPage.ejs');
});

router.get('/getadmin', function (req, res) {
    registration.getadmindetails(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        
        {
            res.json(rows);
        }
    });
});