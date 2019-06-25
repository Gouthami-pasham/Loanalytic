module.exports = {
  _template: null, 
  _transport: null,
};

var Q = require('q'); 
var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');
var sendMailTransport = require('nodemailer-smtp-transport');