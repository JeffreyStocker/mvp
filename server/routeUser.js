var express = require('express');
var router = express.Router();

// var UserDatabase = require ('./database/database');
var {Address, getWithin} = require('./database/databaseAddress');
var {User} = require ('./database/databaseUser');
const getAddress = require('./api/geocoding').getAddress;


router.route('/:username/address')
  .get(function (req, res) {
    if (req.user) {
      User.findOne({username: req.params.username})
        .populate('addresses.address')
        .then((user) =>{
          res.status(200).json(user.addresses);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
      res.status(401).end();
    }
  })
  .post(function (req, res) {
    var userData;
    if (!req.body && !req.body.address && !req.body.name) {
      return res.status(400).send('Should include a object with a address and a name');
    }
    Promise.all([User.findOne({username: req.params.username}), getAddress(req.body.address.address)])
      .then(([user, address]) => {
        userData = user;
        if (user.addresses.names[0] === null) {
          user.addresses.names.pop();
          user.addresses.address.pop();
        }
        user.addresses.address.push(address._id);
        user.addresses.names.push(req.body.address.name);
        return user.save();
      })
      .then(() => {
        res.status(200).send(userData.addresses);
      })
      .catch (err => {
        res.status(500).send(err);
      });
  });



module.exports = router;