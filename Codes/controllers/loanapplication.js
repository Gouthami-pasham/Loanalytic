var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', function (req, res) {
    res.render('loanapplication.ejs', { title: 'Apply Loan' });
});


module.exports = router;