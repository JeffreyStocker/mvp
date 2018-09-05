const env = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 4040;

var express = require('express');
var app = express();
var request = require('request')
var middleware = require('./middleware/middleware.js')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var geocoding = require('./api/geocoding.js');

const passport = require ('passport'),
  LocalStrategy = require('passport-local').Strategy;
const UserNamePassword = require ('./database/userNamePassword');

///// local modules /////
var db = require('./database.js')

if (!process.env.BrowserGoogleMapsAPIKey) {
  throw new Error ('A google Javascript api key must be supplied in .env file');
}

////////// quick testing/////////
// var address = '944 Market St, San Francisco, CA 94102, USA'
// var location = '37.7836966,-122.4089664'
// var id = 'ChIJa2U7loWAhYARXXIPjJLMNcM'
// geocoding.getAddress(address, null, id)
//   .then ((data) => {
//     console.log('address data:', data)
//   })
//   .catch((err) => console.log('error') )


/////// routing ///////
app.use(express.static('client'));

app.use('/',middleware.listener);


// app.post('/', middleware.putTogetherBody, db.middleSaveToDatabase, db.middleFindOneInDatabase)
app.post('/', middleware.putTogetherBody, geocoding.middleRetrieveAddressFromGoogle, db.middleSaveToDatabase, db.middleFindOneInDatabase)
app.post('/', (req, res) => {
  console.log ('POST: sending: req.body');
  res.status(201).send(req.body);
  // res.json(req.body)
});

// app.get ('/users/data/all', (req, res, next) => {console.log('test'); next()})

app.get ('/users/data/all',db.middleReturnAll, (req, res, next) => {
  // console.log('req.body', req.body)
  res.status(200).send(req.body);
});

// app.get('/user/location')

app.get((req, res) => {
  res.status(200);
  // res.end('yes')
});

app.get ('/key', (req, res) => {
  res.send(process.env.BrowserGoogleMapsAPIKey);
});

// app.get ('/login',  passport.authenticate('local'),
// function(req, res) {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   res.redirect('/users/' + req.user.username);
// });

// app.get('./logout',(req, res) => {
//   req.logout();
//   res.end();
// })


// // app.get ('/logout', passport.authenticate('local', { successRedirect: '/')));
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', routes);

// passport config
passport.use(new LocalStrategy(UserNamePassword.authenticate()));
passport.serializeUser(UserNamePassword.serializeUser());
passport.deserializeUser(UserNamePassword.deserializeUser());










app.listen(port, () => {
  console.log('App is listening on port: ', port);
});

///// playing with enviromental Variables
// console.log ('env', process.env.test)



