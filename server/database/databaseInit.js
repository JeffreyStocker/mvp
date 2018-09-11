var mongoose = require('mongoose');

if (process.env.dbURI) {
  var dbLocation = process.env.dbURI;
} else {
  throw new Error ('Database location must be included in .env file or passed in as a env variable');
}


mongoose.Promise = require ('bluebird');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(dbLocation, {useNewUrlParser: true, autoIndex: true})
  .then ((status) => {
    console.log ('db successful connected');
  })
  .catch(err=> {
    console.log('db connect error: ', err);
    // console.log ('db connect error')
  });