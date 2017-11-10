var express = require('express');
var app = express();
var request = require('request')
// var io = require('../node_modules/socket.io/lib/socket.js')
var io = require('socket.io')

////  user set variables ///////
var port = 8080;


/////// routing ///////
app.use(express.static('client'))

app.post((req, res) => {
  res.end()
})

app.get((req, res) => {
  res.end()
})


app.listen(port, () => {
  console.log('App is listening on port: ', port)
})

console.log ('env', process.env.test)