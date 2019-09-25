var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/user');

router.get('/', function (req, res) {
    res.render('user.ejs', { title: 'Register' });
});

router.get('/getuser', function (req, res) {
    registration.getuserdetails(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});
module.exports = router;