var request = require('request-promise')
var api = require('../../api.js')

var latToMiles = function (lat) {
  return lat * ((69.407 + 68.703) / 2)
}

var longToMiles = function (long, lat) {
  return lat * ((69.407 + 68.703) / 2)
}

// // https://www.movable-type.co.uk/scripts/latlong.html
// var R = 6371e3; // metres
// var φ1 = lat1.toRadians();
// var φ2 = lat2.toRadians();
// var Δφ = (lat2-lat1).toRadians();
// var Δλ = (lon2-lon1).toRadians();

// var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//         Math.cos(φ1) * Math.cos(φ2) *
//         Math.sin(Δλ/2) * Math.sin(Δλ/2);
// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

// var d = R * c;


module.exports.getAddress = function (address, latlng, place_id) {
  //note: location is a string with lat lng seperated by ,
  var searchString;
  console.log(arguments)
  return new Promise((resolve, revoke) => {
    if (!address && !latlng && !place_id) { revoke('Error: getAddress: No Information given.') }
    if (!!address) {
      searchString = 'address=' + address
    } else if (!!latlng) {
      searchString = 'latlng=' + latlng
    } else {
      searchString = 'place_id=' + place_id
    }

    // var searchString = [address, latlng , place_id].filter(element => !!element).join('&')
    // console.log(searchString)
    const options = {
      method: 'GET',
      uri: `https://maps.googleapis.com/maps/api/geocode/json?${searchString}&key=${api.googleKey}`
    }
    request(options)
      .then(data => {
        // console.log('data', data)
        resolve (JSON.parse(data))
      })
      .catch((error) => {
        revoke(error)
      })

  })
}


module.exports.processAddressObject = function  (addressObject) {

}

module.exports.middleRetrieveAddressFromGoogle = function (req, res, next) {
  console.log('geocoding runing')
  var body = req.body;

  if (body.homeAddress) {
    module.exports.getAddress(body.homeAddress, null, null)
      .then(results => {
        req.body.homeAddress_geolocation = results
        console.log(results)
      })
      .catch(err => {
        console.log ('error')
      })
      .then (() => {
        if (body.workAddress) {
          module.exports.getAddress(body.workAddress, null, null)
            .then(results => {
              req.body.workAddress_geolocation = results
              console.log(results)
              next()
            })
            .catch(err => {
              console.log ('error')
            })
        } 
      })
      .then (() => {
        console.log('next runs')
        next()
      })
  }
}