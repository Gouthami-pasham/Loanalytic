'use strict';
var debug = require('debug');
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
const expressValidator = require('express-validator')
const engines = require('consolidate')
const session = require('express-session')
const errorHandler = require('errorhandler')
const expressStatusMonitor = require('express-status-monitor')
var routes = require('./routes/index');
var users = require('./routes/users');
var forgotpassword = require('./routes/forgotpassword');
var loancalculator = require('./routes/loancalculator');
var loancalculator_education = require('./routes/loancalculator_education');
var fileUpload = require('express-fileupload')
var io = require('socket.io')(http);
var SimpleCrypto = require("simple-crypto-js").default;
var _secretKey = "some-unique-key";
 
var simpleCrypto = new SimpleCrypto(_secretKey);
 


io.on('connection', function(socket){
  console.log('a user connected');
});

var registrationController = require('./controllers/registration');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engines.ejs)

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
//app.use(expressLayouts)
app.use(errorHandler())
app.use('/', routes);
app.use('/users', users);
app.use('/forgotpassword',forgotpassword);
app.use('/loancalculator',loancalculator);
app.use('/loancalculator_education',loancalculator_education);

app.use('/userhome',function (req, res) {
    res.render('userhome.ejs', { title: 'Home' });
});


// on a connection event, act as follows (socket interacts with client)
io.on('connection', function (socket) {
    socket.on('chatMessage', function (from, msg) {  // on getting a chatMessage event
      io.emit('chatMessage', from, msg)  // emit it to all connected clients
    })
    socket.on('notifyUser', function (user) {  // on getting a notifyUser event
      io.emit('notifyUser', user)  // emit to all
    })
  })

// catch 404 and forward to error handler


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.ejs');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.ejs');
});

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + server.address().address + app.get('port'));
  });
