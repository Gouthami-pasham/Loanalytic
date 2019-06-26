var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo ?" <crvamsee@gmail.com>', // sender address
    to: 'vamseeece74@gmail.com, vamseeece74@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello Welcome to Lonalytic ?', // plaintext body
    html: '<b>Hello Welcome to Lonalytic ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});