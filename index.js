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
app.use('/', routes);


//HTTP Non-Secure Server
const http = require('http');
http.createServer(app).listen(process.env.HTTP_PORT || 8080, 'localhost');