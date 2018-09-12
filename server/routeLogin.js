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

router.route('/')
  // .get(function(req, res) {
  //   if (req.user) {
  //     console.log('login', req.user.username);
  //     return res.status(200).send(stripUserOfPrivateInfo(req.user));
  //   }
  //   res.status(401).end();
  // })
  .post(passport.authenticate('local'), function(req, res) {
    User.findOne({username: req.user.username})
      .then(user => {
        console.log('post register', user.username);
        res.status(200).send(user);
      });
  });



module.exports = router;