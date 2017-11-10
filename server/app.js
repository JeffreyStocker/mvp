var express = require('express');
var app = express();
var request = require('request')
// var io = require('socket.io')

///// local modules /////
var db = require('./database.js')


////  user set variables ///////
var userVar = require("./userVariables.js")
var port = userVar.port

/////// routing ///////
app.use(express.static('client'))

app.post((req, res) => {env
  res.end()
})

app.get((req, res) => {
  res.end()
})


app.listen(port, () => {
  console.log('App is listening on port: ', port)
})

///// playing with enviromental Variables
// console.log ('env', process.env.test)