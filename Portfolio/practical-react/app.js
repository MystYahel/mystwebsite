//Creating the server
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const servefavicon = require('serve-favicon');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const passport = require('passport');
const passportLocal = require('passport-local');
const flash = require('connect-flash');
const nconf = require('nconf');
const db = require('./db.js');

function connectDB()  {
  db.connect;
}

const app = express();

app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
     root = namespace.shift(),
     formParam = root;

     while(namespace.length) {
       formParam += '[' + namespace.shift() + ']';
     }
     return {
       param: formParam,
       msg: msg,
       value: value
     };
  }
}));


app.use(require('connect-flash'));
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages');
    next();
})

app.post('/send', function(req, res) {
    var body = req.body;
    var fullName = body.fullname
    var email = body.email;
    var message = body.message;

    var composedMessage = {
      text: 'Hey Yahel!\n\n' +
        `${fullName} has contacted you through your website. Here is their contact information and message: \n\n` +
        `Full Name: ${fullName} \n` +
        `Email Address: ${email} \n` +
        `Message: ${message} \n\n`,
      subject: 'Website Inquiry'
    };

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'mrprogramy@gmail.com',
        pass: 'rabi12145A' //this is a var stored in heroku, i dont recommend keeping a password string here
      }
    });

    transporter.sendMail({
      from: composedMessage.email,
      to: 'mrprogramy@gmail.com',
      subject: composedMessage.subject,
      text: composedMessage.text
    }, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        console.log(composedMessage);
        console.log('email sent');
        res.redirect('/Contact');
      }
    });

  });

//Opening the server
app.listen(3000);

//the backend
