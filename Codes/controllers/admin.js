var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var registration = require('../models/admin');

router.get('/', function (req, res) {
    res.render('adminhome.ejs', { title: 'Register' });
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

// router.post('/createuser', function (req, res) {
//     registration.createUser(req.body,function(err,count){
//         if(err)
//         {
//             res.status(400).json(err);
//         }
//         else{
//             res.json(count.affectedRows);
//         }
//     });
// });

module.exports = router;