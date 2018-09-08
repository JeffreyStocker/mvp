var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var addressSchema = new Schema ({
  address: {type: String, unique: true},
  longatude: Number,
  latatude: Number
})

var Address = mongoose.model('address', addressSchema);

const getAddress = function (address) {
  Address.findOne(address)
}