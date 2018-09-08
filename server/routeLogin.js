var express = require('express');
var passport = require('passport');
var Account = require('./database/userNamePassword');
var UserDatabase = require ('./database/database');
var router = express.Router();


router.get('/', function (req, res) {
  console.log('render runs');
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  console.log('register');
  Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
    if (err) {
      console.log('err:', err);
      res.status(401).send('User Already Exists');
    } else {
      console.log (res.body);

      passport.authenticate('local')(req, res, function () {
        res.status(200).send({test: 'test'});
      });
    }
  });
});

router.get('/login', function(req, res) {
  console.log('login');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('post register');

  res.status(200).send({user: 'test'});
});

router.get('/logout', function(req, res) {
  console.log('logout');
  req.logout();
  res.status(200).send({test: 'test'});
});

router.get('/ping', function(req, res) {
  res.status(200).send('pong!');
});

module.exports = router;