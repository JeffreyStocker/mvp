var request = require('request-promise');
var Address = require('../database/databaseAddress').Address;
var thirtyDays = 1000 * 60 * 60 * 24 * 30;


const getReverseGeo = function (lat, lng) {
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

const reverseGeo = function (lat, lng) {
  return getReverseGeo(lat, lng);
};

const getAddress = function (address) {
  return new Promise ((resolve, revoke) => {
    Address.findOne({formatted_address: address})
      .then(doc => {
        if (!doc) {
          return getGeocoding(address)
            .then(results => {
              if (results) {
                return new Address (results).save();
              }
            });
        } else if (doc.updated.valueOf() < (Date.now() - thirtyDays)) {
          return getGeocoding(doc.formatted_address)
            .then(returnedFromGoogleDoc => {
              Object.assign (doc, returnedFromGoogleDoc, {updated: new Date()});
              return Address.where({place_id: doc.place_id}).updateOne(doc)
                .then (results => {
                  return doc;
                });
            });
        } else {
          return doc;
        }
      })
      .then (doc => {
        resolve (doc);
      })
      .catch (err => {
        revoke (err);
      });
  });
};

const postAddress = function (address) {
  return new Promise ((resolve, revoke) => {
    Address.find({formatted_address: address})
      .then(doc => {
        if (doc === null) {
          return new Address(req.body).save();
        }
        return doc;
      })
      .then((doc) => {
        return resolve (doc);
      })
      .then (doc => {
        return res.status(200).send(doc);
      })
      .catch (err => {

      });
  });
};

const getGeocoding = function (address, latlng, place_id) {
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
        parsedData.error_message ? revoke (parsedData) : resolve (parsedData.results[0]);
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
    getGeocoding(body.homeAddress, null, null)
      .then(results => {
        req.body.homeAddress_geolocation = results;
        console.log(results);
      })
      .then (() => {
        if (body.workAddress) {
          console.log('finding work address');
          getGeocoding(body.workAddress, null, null)
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
  reverseGeo,
  getGeocoding,
  getAddress,
  postAddress
};