var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('./database/userNamePassword');
var User = require ('./database/databaseUser').User;

router.get('/', function(req, res) {
  res.render('register', { });
});

router.route('/')
  .post(function(req, res) {
    console.log('register');
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
      if (err) {
        console.log('err:', err);
        res.status(401).send('User Already Exists');
      } else {
        passport.authenticate('local')(req, res, function () {
          let user = new User({username: req.body.username}).save()
            .then(results => {
              console.log('results:', results);
              res.status(200).send({user: results});
            });
        });
      }
    });
  });

module.exports = router;