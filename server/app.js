const env = require('dotenv').config();
const port = process.env.PORT || 4040;

var express = require('express');
var app = express();
var request = require('request')
var middleware = require('./middleware/middleware.js')
// var io = require('socket.io')
var geocoding = require('./api/geocoding.js');

///// local modules /////
var db = require('./database.js')


////////// quick testing/////////
// var address = '944 Market St, San Francisco, CA 94102, USA'
// var location = '37.7836966,-122.4089664'
// var id = 'ChIJa2U7loWAhYARXXIPjJLMNcM'
// geocoding.getAddress(address, null, id)
//   .then ((data) => {
//     console.log('address data:', data)
//   })
//   .catch((err) => console.log('error') )


/////// routing ///////
app.use(express.static('client'));

app.use('/',middleware.listener);


// app.post('/', middleware.putTogetherBody, db.middleSaveToDatabase, db.middleFindOneInDatabase)
app.post('/', middleware.putTogetherBody, geocoding.middleRetrieveAddressFromGoogle, db.middleSaveToDatabase, db.middleFindOneInDatabase)
app.post('/', (req, res) => {
  console.log ('POST: sending: req.body');
  res.status(201).send(req.body);
  // res.json(req.body)
})

// app.get ('/users/data/all', (req, res, next) => {console.log('test'); next()})

app.get ('/users/data/all',db.middleReturnAll, (req, res, next) => {
  // console.log('req.body', req.body)
  res.status(200).send(req.body);
})

// app.get('/user/location')

app.get((req, res) => {
  res.status(200);
  // res.end('yes')
})


app.listen(port, () => {
  console.log('App is listening on port: ', port);
})

///// playing with enviromental Variables
// console.log ('env', process.env.test)



