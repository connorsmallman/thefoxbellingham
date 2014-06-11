
/**
 * Module dependencies.
 */
var util = require('util');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var expressValidator = require('express-validator');
var nodemailer = require('nodemailer');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/nodetest2", {native_parser:true});
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy', true);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.bodyParser());
app.use(expressValidator());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// get
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/findus', routes.findus);
app.get('/bellingham', routes.bellingham);
app.get('/contact', routes.contact);
app.get('/booking', routes.booking);
// post
app.post('/booking', express.bodyParser(), function (req, res){
	console.log('body: ' + JSON.stringify(req.body));

	var mailOpts, smtpTrans;
	//Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
	smtpTrans = nodemailer.createTransport('SMTP', 
	{
		host: "nativespace-phobos.ns-phobos.com", // hostname
	    secureConnection: true, // use SSL
	    port: 465, // port for secure SMTP
	    auth: {
	        user: "mail@thefoxbellingham.co.uk",
	        pass: "Qwerty1#"
	    }
	});
	//Mail options
	mailOpts = {
		from: req.body.email, //grab form data from the request body object
		to: 'icsmallman@gmail.com',
		subject: 'The Fox Bellingham (website booking form)',
		generateTextFromHTML: true,
		html: 'Name: '  + req.body.forename + '<br />' + 'Surname: ' + req.body.surname + '<br />' + 'Email: ' + req.body.email + '<br />' + 'Number of Guests: ' + req.body.guest + '<br />' + 'Telephone Number: ' + req.body.number  + '<br />' + 'Prefferred Dates: ' + req.body.dates + '<br />' + 'Special Requests: <br />' + req.body.requests
	};
	//error handling
	smtpTrans.sendMail(mailOpts, function (error, response) {
		//Email not sent
		if (error) {
			res.send({
				Error: 'Theres been an error, please try again later.'
			});
		}
		//Yay!! Email sent
		else {
			res.send({
				Success: 'You booking request has been sent, <b>Thank you!</b> We\'ll be in touch shortly.'
		    });
		}
	});
});
app.post('/contact', function (req, res) {
	console.log('body: ' + JSON.stringify(req.body));

	var mailOpts, smtpTrans;
	//Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
	smtpTrans = nodemailer.createTransport('SMTP', 
	{
		host: "nativespace-phobos.ns-phobos.com", // hostname
	    secureConnection: true, // use SSL
	    port: 465, // port for secure SMTP
	    auth: {
	        user: "mail@thefoxbellingham.co.uk",
	        pass: "Qwerty1#"
	    }
	});
	//Mail options
	mailOpts = {
		from: req.body.email, //grab form data from the request body object
		to: 'icsmallman@gmail.com',
		subject: 'The Fox Bellingham (website contact form)',
		generateTextFromHTML: true,
    	html:'<p>Name: ' + req.body.forename + '<br />' + 'Surname: ' + req.body.surname + '<br />' + 'Email: ' + req.body.email + '<br >' + 'Message: <br />' + req.body.message + '</p>'
	};
	//error handling
	smtpTrans.sendMail(mailOpts, function (error, response) {
		//Email not sent
		if (error) {
			res.send({
				Error: 'Theres been an error, please try again later.'
			});
			console.log(error)
		}
		//Yay!! Email sent
		else {
			res.send({
				Success: '<b>Thank you!</b> We\'ll be in touch shortly.'
		    });
		}
	});
});
//create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});