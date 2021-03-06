var bodyparser = require('body-parser');

module.exports.putTogetherBody = (req, res, next) => {
  var body = '';
  req.on('data', (data) => { body += data; });
  req.on ('end', () => {
    try {
      req.body = JSON.parse(body);
    } catch (err) {
      console.log ('body was not JSON');
      req.body = body;
    }
    next();
  });
};

module.exports.listener = function (req, res, next) {
  console.log ('Request: Non Static Files: Type:', req.method, req.path);
  next();
};