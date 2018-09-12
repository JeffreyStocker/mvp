const env = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 4040;

var express = require('express');
var app = express();
var request = require('request');
var middleware = require('./middleware/middleware.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const mongodbSession = require ('connect-mongodb-session')(expressSession);
var userSessionStorage = new mongodbSession({
  uri: process.env.dbURI,
  collection: 'AccountSession'
});

var databaseInit = require ('./database/databaseInit');
var geocoding = require('./api/geocoding.js');
var userLogin = require ('./routeLogin');
const routeUser = require ('./routeUser');
const routeRegister = require ('./routeRegister');
const routeLogout = require ('./routeLogout');

const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserNamePassword = require ('./database/userNamePassword');

///// local modules /////
var db = require('./database/database.js');

if (!process.env.BrowserGoogleMapsAPIKey) {
  throw new Error ('A google Javascript api key must be supplied in .env file');
}


/////// routing ///////
app.use('/', middleware.listener);


app.post('/', middleware.putTogetherBody, geocoding.middleRetrieveAddressFromGoogle, db.middleSaveToDatabase, db.middleFindOneInDatabase);
app.post('/', (req, res) => {
  console.log ('POST: sending: req.body');
  res.status(201).send(req.body);
});


app.get ('/users/data/all', db.middleReturnAll, (req, res, next) => {
  res.status(200).send(req.body);
});


app.get((req, res) => {
  res.status(200);
});

app.get ('/key', (req, res) => {
  res.send(process.env.BrowserGoogleMapsAPIKey);
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 1000 * 60 * 60 * 24 * 7,
  },
  store: userSessionStorage
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(UserNamePassword.authenticate()));
passport.serializeUser(UserNamePassword.serializeUser());
passport.deserializeUser(UserNamePassword.deserializeUser());
app.use(express.static('client'));
app.use('/login', userLogin);
app.use('/register', routeRegister);
app.use('/logout', routeLogout);
app.use(function (req, res, next) {
  if (req.user) {
    req.user.hash = undefined;
    req.user.salt = undefined;
  }
});

app.get('/ping', function(req, res) {
  res.status(200).send('pong!');
});


app.use('/user', routeUser);


userSessionStorage.on('error', function (err) {
  console.log (err);
});



app.listen(port, () => {
  console.log('App is listening on port: ', port);
});

///// playing with enviromental Variables
// console.log ('env', process.env.test)



