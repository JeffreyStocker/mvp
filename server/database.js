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
    var user = new Carpool({
      username: res.body.name, 
      homeAddress: res.body.homeAddress,
      workAddress: res.body.workAddress, 
      range: res.body.range
    })
    user.save((err, response) => {
      if (err && err.code === 11000) {
        console.log('Duplicate File') //need to update instead
      } else 
      if (err) {
        console.log('error saving to database:', err)
      } else {
        next();
      }
    })



}