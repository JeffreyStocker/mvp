var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema ({
  address_components: [],
  formatted_address: String,
  geometry: Object,
  place_id: String,
  types: {
    type: Array
  },
  updated: { type: Date, default: Date.now },
  latLong: Array,

  // address: {type: String, unique: true},
  // approxLatLong: Array,
  // googleGeoLoc: Array,
});

addressSchema.pre('save', function (next) {
  this.updated = new Date();
  next();
});

var Address = mongoose.model('address', addressSchema);


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