var express = require('express');
var app = express();
var request = require('request')
var middleware = require('./middleware/middleware.js')
// var io = require('socket.io')

///// local modules /////
var db = require('./database.js')


////  user set variables ///////
var userVar = require("./userVariables.js")
var port = userVar.port

/////// routing ///////

app.use(express.static('client'))

app.use('/',middleware.listener)
app.post('/', middleware.putTogetherBody)
app.post('/', (req, res) => {
  
  // res.status(201)
  console.log ('res.body', res.body)
  res.status(201).send(res.body)
  // res.json(req.body)
})

app.get((req, res) => {
  res.status(200)
  // res.end('yes')
})


app.listen(port, () => {
  console.log('App is listening on port: ', port)
})

///// playing with enviromental Variables
// console.log ('env', process.env.test)


  
