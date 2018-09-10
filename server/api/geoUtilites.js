// // https://www.movable-type.co.uk/scripts/latlong.html
var findDistanceOverSphere = function (lat1, lon1, lat2, lon2) {
  var R = 6371e3; // metres
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2 - lat1).toRadians();
  var Δλ = (lon2 - lon1).toRadians();

  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
  return d;
};


var latToMiles = function (lat) {
  return lat * ((69.407 + 68.703) / 2);
};

var longToMiles = function (long, lat) {
  return lat * ((69.407 + 68.703) / 2);
};


var exactDistanceInMiles = function (lat1, lon1, lat2, lon2) {
  var sin = Math.sin;
  var arccos = Math.acos;
  var cos = Math.cos;

  return 3958.75 * arccos[sin(lat1 / 57.2958) *
  sin(lat2 / 57.2958) +
  cos(lat1 / 57.2958) *
  cos(lat2 / 57.2958) *
  cos(lon2 / 57.2958 - lon1 / 57.2958)];
};

module.exports = {
  latToMiles,
  longToMiles,
  exactDistanceInMiles,
  findDistanceOverSphere
};