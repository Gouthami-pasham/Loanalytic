var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'supp.loanalytic2019@gmail.com',
    pass: 'test12345$'
  }
});

var sendMail = {
  sendEmail : function(data,callback){
    var mailOptions = {
      from: 'supp.loanalytic2019@gmail.com',
      to: data.email,
      subject: data.subject,
      html: data.text,
      attachments: [{
        filename: 'image.png',
        path: __dirname+'/public/images/'+data.src,
        cid: 'unique@kreata.ee' //same cid value as in the html img src
    }]
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        callback(error);
      } else {
        console.log('Email sent: ' + info.response);
        callback(info);
      }
    });

  }
}

module.exports = sendMail;



