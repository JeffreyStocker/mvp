var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema ({
  address: {type: String, unique: true},
  latLong: Array,
  approxLatLong: Array,
  googleGeoLoc: Array,
  updated: { type: Date, default: Date.now }
});

var Address = mongoose.model('address', addressSchema);

const get = function (address) {
  return Address.findOne({address});
};

const post = function () {
  return Address;
};

const getWithin = function (lat, lng, range) {
  return Address.where('address').within().circle({center: [lat, lng], maxDistance: range, spherical: true}).then();
};

const getAddress = function (address) {
  return new Promise ((resolve, revoke) => {
    Address.findOne({address}).then((doc => {
      if (doc === null) {
        var address = new Address({address});
        return address.save();
      }
      return resolve(doc);
    }))
      .catch(revoke)
      .then(doc => {
        resolve (doc);
      });
  });
};




module.exports = {
  Address,
  getAddress,
  getWithin
};