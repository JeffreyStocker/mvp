var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, unique: true},
  addresses: {names: [String], address: [{type: Schema.Types.ObjectId, ref: 'address'}]},
  routes: [{type: Schema.Types.ObjectId, ref: 'Route'}]
});

var User = mongoose.model ('User', userSchema);


module.exports = {
  User
};