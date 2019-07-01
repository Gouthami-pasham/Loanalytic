'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/forgotpassword', function (req, res) {
    res.render('forgotpassword.ejs');
});

router.post('/forgotpassword', function (req, res) {
    const email = req.body.email
    User.findOne({ email: email })
    .exec()
    .then(function (user) {
    if (!user) {
    return throwFailed(res, 'No user found with that email address.')
    }
    })

    
});
// router.get('/mailconfirmation', auth.isAuthenticated(), controller.sendMailAdressConfirmationMail);
// router.post('/mailconfirmation', controller.confirmMailAddress);
// router.get('/passwordreset', controller.sendPwdResetMail);
// router.post('/passwordreset', controller.confirmResetedPassword); 

module.exports = router;
