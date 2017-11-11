module.exports.putTogetherBody = (req, res, next) => {
  var body = '';
  req.on('data', (data) => {body += data})
  req.on ('end', () => {
    res.body = body;
    next();
  })
}

module.exports.listener = function (req, res, next){
    console.log ('Request: Non Static Files: Type:', req.method)
    next();
  }