var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var routeSchema = new Schema({
  routes: [{type: Schema.Types.ObjectId, ref: 'Address'}],
  times: Object,
  roundTrip: Boolean
});

var Route = mongoose.model ('Route', routeSchema);


module.exports = {
  Route
};