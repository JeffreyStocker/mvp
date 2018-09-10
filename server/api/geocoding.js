var request = require('request-promise');
// var api = require('../../api.js');

const reverseGeo = function (lat, lng) {
  const options = {
    method: 'GET',
    uri: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.googleGeoCodingKey}`
  };

  return new Promise ((resolve, revoke) => {
    request(options)
      .then(data => {
        var parsedData = JSON.parse(data);
        parsedData.error_message ? revoke (parsedData) : resolve (parsedData);
      })
      .catch((error) => {
        revoke(error);
      });
  });
};

const getAddress = function (address, latlng, place_id) {
  //note: location is a string with lat lng seperated by ,
  var searchString;
  console.log(arguments);
  return new Promise((resolve, revoke) => {
    if (!address && !latlng && !place_id) { revoke('Error: getAddress: No Information given.'); }
    if (!!address) {
      searchString = 'address=' + address;
    } else if (!!latlng) {
      searchString = 'latlng=' + latlng;
    } else {
      searchString = 'place_id=' + place_id;
    }

    // var searchString = [address, latlng , place_id].filter(element => !!element).join('&')
    // console.log(searchString)
    const options = {
      method: 'GET',
      uri: `https://maps.googleapis.com/maps/api/geocode/json?${searchString}&key=${process.env.googleGeoCodingKey}`
    };
    request(options)
      .then(data => {
        // console.log('data', data)
        var parsedData = JSON.parse(data);
        parsedData.error_message ? revoke (parsedData) : resolve (parsedData);
      })
      .catch((error) => {
        revoke(error);
      });

  });
};

const middleRetrieveAddressFromGoogle = function (req, res, next) {
  console.log('geocoding runing');
  var body = req.body;

  if (body.homeAddress) {
    getAddress(body.homeAddress, null, null)
      .then(results => {
        req.body.homeAddress_geolocation = results;
        console.log(results);
      })
      .then (() => {
        if (body.workAddress) {
          console.log('finding work address');
          getAddress(body.workAddress, null, null)
            .then(results => {
              if (results.error_message) {
                throw new Error (results.error_message);
              }
              req.body.workAddress_geolocation = results;
              console.log(results);
              next();
            })
            .catch(err => {
              console.log ('error');
            })
            .then (() => {
              // console.log('req.geolocation ', req.body.workAddress_geolocation)
              // console.log('next runs')
              next();
            });
        } else {
          next();
        }
      })
      .catch(err => {
        console.log ('error');
        res.status(404).send(err);
        return;
      });
  }
};


module.exports = {
  middleRetrieveAddressFromGoogle,
  reverseGeo
};