const pug = require("pug");
const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const promisify = require("es6-promisify");
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const fs = require("fs");
const helpers = require("./helpers");

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

const app = express();

// Set up the data base
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise;

// Import database models
const User = require("./models/User");

// Set views and view engine, we are using pug.
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Sessions
app.use(passport.initialize());
app.use(passport.session());
// import passport Strategy setup
require("./handlers/passport");

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// Locals
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.flashes = req.flash();
  res.locals.currentPath = req.path;
  next();
});

const routes = require("./routes/routes");
const apiRoutesV1 = require("./routes/api/v1");

// Set main route
app.use("/", routes);

//HTTP Non-Secure Server
const http = require("http");
http.createServer(app).listen(process.env.HTTP_PORT || 8080, "localhost");

// API Setup ==============================================================
const api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use("/api/v1", apiRoutesV1);
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
api.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});

api.listen(8181, () => {
  "API Running at http://localhost:8181";
});
