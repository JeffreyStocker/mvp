var bodyparser = require('body-parser')

module.exports.putTogetherBody = (req, res, next) => {
  var body = '';
  req.on('data', (data) => {body += data})
  req.on ('end', () => {
    try {
      res.body = JSON.parse(res.body)
    } catch (err) {
      res.body = body;
    }
    next();
  })
}

module.exports.listener = function (req, res, next){
    console.log ('Request: Non Static Files: Type:', req.method)
    next();
  }