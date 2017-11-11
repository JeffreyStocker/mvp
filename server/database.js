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
console.log('database: ', databaseLocation)
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
    workAddress: String, 
    range: Number, 
  })
  
  var Carpool = mongoose.model('Carpool', carpoolSchema)


  ///// database middleware /////////////

  module.exports.middleSaveToDatabase = function (req, res, next) {
    userObject = {
      username: req.body.name, 
      homeAddress: req.body.homeAddress || "",
      workAddress: req.body.workAddress || "", 
      range: req.body.range || 5
    }

    var user = new Carpool(userObject).save((err, response) => {
      if (err && err.code === 11000) {
        console.log('Duplicate File') //need to update instead
        Carpool.update({username: req.body.name}, userObject, {}, function (err, raw) {
          if (err) {
            console.log('error updating database:', err)
          } else {
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