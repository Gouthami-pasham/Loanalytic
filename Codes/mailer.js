var Q = require('q'); 
var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');
var sendMailTransport = require('nodemailer-smtp-transport');
 


module.exports = {
  _template: null, 
  _transport: null,
 
  init: function (config) {
    var d = Q.defer();
 
    emailTemplates(config.emailTplsDir, function (err, template) {
      if (err) {
        return d.reject(err);
      }
 
      this._template = template;
      this._transport = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      return d.resolve();
    }.bind(this));
 
    return d.promise;
  },
 
  send: function (from, to, subject, text, html) {
    var d = Q.defer();
    var params = {
      from: from, 
      to: to,
      subject: subject,
      text: text
    };
 
    if (html) {
      params.html = html;
    }
 
    this._transport.sendMail(params, function (err, res) {
      if (err) {
        console.error(err);
        return d.reject(err);
      } else {
        return d.resolve(res);
      }
    });
 
    return d.promise;
  },
 
  sendMail: function (from, to, subject, tplName, locals) {
    var d = Q.defer();
    var self = this;
    this.init({ emailTplsDir: "email-templates" }).then(function () {
      this._template(tplName, locals, function (err, html, text) {
        if (err) {
          console.error(err);
          return d.reject(err);
        }
 
        self.send(from, to, subject, text, html)
          .then(function (res) {
            return d.resolve(res);
          });
      });
    }.bind(this));
 
    return d.promise;
  }
};

/*
#' Email a user a report is ready
#'
#' Requires an account at Mailgun: https://mailgun.com
#' Pre-verification can only send to a whitelist of emails you configure
#'
#' @param email Email to send to
#' @param mail_message Any extra info
#'
#' @return TRUE if successful email sent
#' @import httr
#' @export
sendEmail <- function(email = "XXXXX@you.com",
                      mail_message = "Hello"){

  url <- "https://api.mailgun.net/v3/sandbox5f2XXXXXXXa.mailgun.org/messages"
  ## username:password so api_key is all after the api:
  api_key <- "key-c5957XXXXXXXXXXXbb9cf8ce"
  the_body <-
    list(
      from="Mailgun Sandbox <postmaster@sandbox5XXXXXXXXa.mailgun.org>",
      to=email,
      subject="Mailgun from R",
      text=mail_message
    )

  req <- httr::POST(url,
                    httr::authenticate("api", api_key),
                    encode = "form",
                    body = the_body)

  httr::stop_for_status(req)
  
  TRUE

}


*/