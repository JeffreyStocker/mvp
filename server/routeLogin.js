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
  .all(function (req, res) {
    if (req.user) {
      User.findOne({username: req.user.username})
        .then(user => {
          console.log('post register', user.username);
          res.status(200).send(user);
        });
    } else {
      res.status(401).end();
    }
  });



module.exports = router;