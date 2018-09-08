var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema ({
  address: {type: String, unique: true},
  longatude: Number,
  latatude: Number
});

var Address = mongoose.model('address', addressSchema);

const get = function (address) {
  return Address.findOne(address);
};

const post = function () {
  return Address;
};





module.exports = {
  getAddress
};