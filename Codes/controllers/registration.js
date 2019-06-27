var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/registration');

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
    registration.createUser(req.body,function(err,count){
        if(err)
        {
            res.status(400).json(err);
        }
        else{
            res.json(count.affectedRows);
        }
    });
});

module.exports = router;