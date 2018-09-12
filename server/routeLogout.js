var express = require('express');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    console.log('logout');
    req.logout();
    res.status(200).send();
  });

module.exports = router;