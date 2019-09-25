'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
 router.get('/forgotpassword', function (req, res) {
     res.render('forgotpassword.ejs', { title: 'Forgot Password' });
});


// router.get('/mailconfirmation', auth.isAuthenticated(), controller.sendMailAdressConfirmationMail);
// router.post('/mailconfirmation', controller.confirmMailAddress);
// router.get('/passwordreset', controller.sendPwdResetMail);
// router.post('/passwordreset', controller.confirmResetedPassword); 

module.exports = router;
