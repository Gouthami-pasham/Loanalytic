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

/*

Trigger mail on viewing application
On Veiwing Lonalytic application it should trigger mail to user registered mail id.



curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
    -F from='Excited User <mailgun@Loanlytic.com>' \
    -F to=YOU@lonalytic.com \
    -F to=crvamsee@gmail.com\
    -F subject='Hello, YOu have viewd your Loan Application' \
    -F text='Testing some Mailgun awesomeness!'


var mandrill = require('node-mandrill')('<your API Key>'); 

function sendEmail ( _name, _email, _subject, _message) {
    mandrill('/messages/send', {
        message: {
            to: [{email: _email , name: _name}],
            from_email: 'noreply@loanalytic.com',
            subject: _subject,
            text: _message
        }
    }, function(error, response){
        if (error) console.log( error );
        else console.log(response);
    });
}

// define your own email api which points to your server.

app.post( '/api/sendemail/', function(req, res){

    var _name = req.body.name;
    var _email = req.body.email;
    var _subject = req.body.subject;
    var _messsage = req.body.message;

    //implement your spam protection or checks. 

    sendEmail ( _name, _email, _subject, _message );

});

*/
