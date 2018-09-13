var express = require('express');
var router = express.Router();
var geo = require ('../api/geocoding');

router.route('/')
  .get(function(req, res) {
    geo.getAddress(req.query.address)
      .then (doc => {
        return res.status(200).send(doc);
      })
      .catch(err => {
        return res.status(400).send(err);
      });
  })
  .post(function(req, res) {
    if (req.user) {
      geo.postAddress(req.body.address)
        .then(doc => {
          return res.send(doc);
        })
        .catch (err => {
          return res.status(400).send(err);
        });
    } else {
      res.status(401).end();
    }
  });



module.exports = router;