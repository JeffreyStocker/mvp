var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, unique: true},
  addresses: [[String, {type: Schema.Types.ObjectId, ref: 'Address'}]],
  addressesNames: [String],
  routes: [{}]
});

var User = mongoose.model ('User', userSchema);


module.exports = {
  User
};