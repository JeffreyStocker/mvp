var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var mongodb = require('mongodb')
var userVar = require("./userVariables.js")
try {
  var dbURI = require("../api.js")
  var databaseLocation = dbURI.dbURI
} catch (err) {
  var databaseLocation = userVar.databaseLocation
}

// mongoose.connect(databaseLocation)
// console.log('database: ', databaseLocation)
mongoose.connect(databaseLocation, {useMongoClient: true, autoIndex: true})
  .then ((status) => {
    console.log ('db successful connected')
  })
  .catch(err=> {
    console.log('db connect error: ', err)
    // console.log ('db connect error')
  });

  
  /// work in progress basic ideas
  var carpoolSchema = new Schema ({
    username: {type: String, unique: true},
    homeAddress: String, 
    homeAddress_geolocation: Schema.Types.Mixed, 
    workAddress: String, 
    workAddress_geolocation: Schema.Types.Mixed,
    range: Number, 
  })
  
  var Carpool = mongoose.model('Carpool', carpoolSchema)


  ///// database middleware /////////////

  module.exports.middleSaveToDatabase = function (req, res, next) {
    userObject = {
      username: req.body.name, 
      homeAddress: req.body.homeAddress || "",
      workAddress: req.body.workAddress || "", 
      homeAddress_geolocation: req.body.homeAddress_geolocation || '',
      workAddress_geolocation: req.body.workAddress_geolocation || '',
      range: req.body.range || 5
    }

    var user = new Carpool(userObject).save((err, response) => {
      if (err && err.code === 11000) {
        console.log('Duplicate File') //need to update instead
        Carpool.update({username: req.body.name}, userObject, {}, function (err, raw) {
          if (err) {
            console.log('error updating database:', err)
          } else {
            console.log('saved to database', raw)
            next()
          }
        })
      } else 
      if (err) {
        console.log('error saving to database:', err)
      } else {
        next();
      }
    })
}

module.exports.middleFindOneInDatabase = function (req, res, next) {
  Carpool.findOne({username: req.body.name}, function (err, data){
    if (err){
    } else {
      console.log ('data from database:', data)
    }
  })
}

module.exports.middleReturnAll = function (req, res, next) {
  Carpool.find({}, function (err, data) {  
    if (err) {
      console.log ('database Error retrieving all info')
    } else {
      // console.log ('data', data)
      req.body = req.body || {};
      req.body.data = data
      next();
    }

  })


}