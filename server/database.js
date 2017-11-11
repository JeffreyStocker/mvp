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
  user: String,
  homeLocation: String, 
  workLocation: String, 
  range: String, 

})

// , (err, success) => {
//   console.log('test')
//   if (err) {
//   } else {
//   }