var express = require('express');
var passport = require('passport');
var Account = require('./database/userNamePassword');
var UserDatabase = require ('./database/database');
var router = express.Router();

var stripUserOfPrivateInfo = function (user) {
  user.hash = undefined;
  user.salt = undefined;
  return user;
};

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
      passport.authenticate('local')(req, res, function () {
        res.status(200).send({user: stripUserOfPrivateInfo(req.user)});
      });
    }
  });
});

router.get('/login', function(req, res) {
  console.log('login', req.user);

  if (req.user) {
    return res.status(200).send(stripUserOfPrivateInfo(req.user));
  }
  res.status(401).end();

});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('post register', req.user);

  res.status(200).send(stripUserOfPrivateInfo(req.user));
});

router.get('/logout', function(req, res) {
  console.log('logout');
  req.logout();
  res.status(200).send();
});

router.get('/ping', function(req, res) {
  res.status(200).send('pong!');
});

module.exports = router;