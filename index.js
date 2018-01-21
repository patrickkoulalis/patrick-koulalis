const pug = require('pug');
const path = require('path');
const routes = require('./routes/routes');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
require('dotenv').config({path: 'variables.env'});

// parse application/x-www-form-urlencoded
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//gzip - Switch out for Nginx reverse proxy later
// const compression = require('compression');
// app.use(compression());


// Secure traffic only
app.all('*', function (req, res, next) {
	if (req.secure) {
		return next();
	};
	if (process.env.NODE_ENV === 'development') {
		res.redirect(`https://${req.hostname}:${process.env.HTTPS_PORT}${req.url}`);
	}
	res.redirect(`https://${req.hostname}${req.url}`);
});
app.use('/', routes)


const https = require('https');
const http = require('http');

//HTTP Non-Secure Server
http.createServer(app).listen(process.env.HTTP_PORT || 80);

// HTTPS Secure Server
const httpsOptions = {
	ca: fs.readFileSync('certs/ca_bundle.crt'),
	key: fs.readFileSync('certs/private.key'),
	cert: fs.readFileSync('certs/certificate.crt')
};

https.createServer(httpsOptions, app).listen(process.env.HTTPS_PORT || 443);