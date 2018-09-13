var express = require('express');
var passport = require('passport');
var Account = require('./database/userNamePassword');
// var UserDatabase = require ('./database/database');
var router = express.Router();
var {User} = require ('./database/databaseUser');

var stripUserOfPrivateInfo = function (user) {
  user.hash = undefined;
  user.salt = undefined;
  return user;
};

var returnUser = function (req, res) {
  User.findOne({username: req.user.username})
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

router.route('/')
  .get(function(req, res, next) {
    if (req.user) {
      console.log('login', req.user.username);
      return next();
    }
    res.status(401).end();
  })
  .post(passport.authenticate('local'), function(req, res, next) {
    console.log('user Logged in:', req.user.username);
    return next();
  })
  .all(returnUser);




module.exports = router;