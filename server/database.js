var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userVar = require("./userVariables.js")
try {
  var dbURI = require("../api.js")
  var databaseLocation = dbURI.dbURI
} catch (err) {
  var databaseLocation = userVar.databaseLocation
}

mongoose.Connection(databaseLocation, {useMongoClinet: true}, (err, success) => {
  if (err) {
    // console.log ('db connect error: ', err)
    console.log ('db connect error')
  } else {
    console.log ('db successful connected')
  }
});


/// work in progress basic ideas
var carpoolSchema = new Schema ({
  user: String,
  homeLocation: String, 
  workLocation: String, 
  range: String, 

})