const pug = require('pug');
const path = require('path');
const routes = require('./routes/routes');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const fs = require("fs");
require('dotenv').config({path: 'variables.env'});

// parse application/x-www-form-urlencoded
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Secure traffic only
// app.all('*', function (req, res, next) {
// 	if(req.secure) {
// 		return next();
// 	};
// 	if(process.env.NODE_ENV === 'development') {
// 		res.redirect(`https://localhost:${process.env.HTTP_PORT}${req.url}`);
// 	} else {
// 		res.redirect(`https://${req.hostname}${req.url}`);
// 	}
// });
app.use('/', routes)
app.set(`port_https`, process.env.HTTPS_PORT);

// http.createServer(app).listen(process.env.HTTP_PORT || 80, () => {
// 	console.log(`Server Running on Port ${process.env.HTTP_PORT}`);
// });

const httpsOptions = {
	ca: fs.readFileSync('certs/ca_bundle.crt'),
	key: fs.readFileSync('certs/private.key'),
	cert: fs.readFileSync('certs/certificate.crt')
};

https.createServer(httpsOptions, app).listen(process.env.HTTPS_PORT || 443, () => {
	console.log(`HTTPS Running on port ${process.env.HTTPS_PORT }`);
});