var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'supp.loanalytic2019@gmail.com',
    pass: 'test12345$'
  }
});

var mailOptions = {
  from: 'supp.loanalytic2019@gmail.com',
  to: 'crvamsee@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});