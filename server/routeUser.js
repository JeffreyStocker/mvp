var express = require('express');
var router = express.Router();

// var UserDatabase = require ('./database/database');
var {Address, getWithin} = require('./database/databaseAddress');
var {User} = require ('./database/databaseUser');



router.route('/:username/address')
  .get(function (req, res) {
    if (req.user) {
      User.findOne({username: req.params.username})
        .populate('address')
        .then((user) =>{

          res.status(200).send(user.address);
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
      res.status(401).end();
    }
  })
  .post(function (req, res) {
    if (!req.body && !req.body.address && !req.body.name) {
      return res.status(400).send('Should include a object with a address and a name');
    }
    Promise.all([User.findOneAndUpdate({username: req.params.username}), findAddress(req.body.address)])
      .then(([user, address]) => {
        user.addresses.push(address._id);
        user.addressesNames.push(req.body.name);
        return user.save();
      })
      .catch (err => {
        res.status(500).send(err);
      })
      .then(() => {
        res.status(200).send(user.addresses);
      });
  });



module.exports = router;