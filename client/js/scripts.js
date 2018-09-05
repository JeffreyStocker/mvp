
var locations = {
  "San Francisco": {lat: 37.7749 , lng: -122.4194 },
  "uluru" : {lat: 37.73242 , lng: -122.43425 }
}
var markers = [];
var map;

var userLocation = function (cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      cb({lat: position.coords.latitude, lng: position.coords.longitude});
    }, (err => {
      cb(locations['San Francisco']);
    }))
  } else {
    cb(locations['San Francisco']);
  }
}

var initGoogle = function() {  //places a marker in the map
  userLocation (location => {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: location
    });
    autoComInit();
    workAutoComplete();
  })
  // map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 11,
  //   center: locations['San Francisco']
  // });
  // autoComInit();
  // workAutoComplete();
}

window.parsePostDataToCreateMarkers = function (data){
  if (!data) { return }
  var home = data.homeAddress_geolocation.results[0].geometry.location || null;
  if (home) {
    createMarkerHome(home.lat, home.lng, {title: "Home"})
  }
  var work = data.workAddress_geolocation.results[0].geometry.location || null;
  if (work) {
    createMarkerHome(work.lat, work.lng, {title: "Work"})
  }
}

window.parseGetDataToCreateFieldOfMarkers = function (data) {
  if (!data) { return }
  console.log (data.data)
  if (Array.isArray(data.data)) {
    data.data.forEach (singleData => {
      try {
        console.log('element', singleData)
        var home = singleData.homeAddress_geolocation.results[0].geometry.location || null;
        if (home) {
          createMarker(home.lat, home.lng, {title: `${singleData.username} \nHome Address: ${singleData.homeAddress_geolocation.results[0].formatted_address}`})
        }
        var work = singleData.workAddress_geolocation.results[0].geometry.location || null;
        if (work) {
          createMarker(work.lat, work.lng, {title: `${singleData.username} \nHome Address: ${singleData.workAddress_geolocation.results[0].formatted_address}`})
        }
      } catch (err) {
      }
    })
  }
}

var createMarkerHome = function (lat, long, options = {}) {
  var title = options.title || '';
  var label = options.label || '';
  markers.push(new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    animation: google.maps.Animation.DROP,
    title: title,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      strokeColor: "blue",
      scale: 4
    }
}))

  markers[markers.length - 1].addListener('click', () => {
    console.log ('click')
  })
}

var createMarker = function (lat, long, options = {}) {
  var title = options.title || '';
  var label = options.label || '';
  markers.push(new google.maps.Marker({
    position: {lat: lat, lng: long},
    map: map,
    animation: google.maps.Animation.DROP,
    title: title,
    label: label
  }))
  markers[markers.length - 1].addListener('click', () => {
    console.log ('click')
  })
}



var createRandomMarker = function (lat, long) {
  var lat = (37.74 + Math.random() / 10);
  var long = (-122.43 + Math.random()/10);
  markers.push(new google.maps.Marker({
    position: {lat: lat , lng: long },
    // position: {lat: 37.7449 , lng: -122.43435 },
    map:map,
    animation: google.maps.Animation.DROP
  })
  )
}





$('document').ready(function () {

  $('#click').on('click', function (){
    createRandomMarker();
  })

  $('#username').on('keypress', (event) => {
    if (event.which === 13) {

    }
  })
})




/////// playing with google autocomplete////////////////////////////
var autocomplete;
var autocomplete2;
var autoComInit = function () {
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocompleteHome')),
    {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  // autocomplete.addListener('place_changed', fillInAddress);
}

var workAutoComplete = function () {
  autocomplete2 = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocompleteWork')),
    {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  // autocomplete.addListener('place_changed', fillInAddress);
}

// var placeSearch, autocomplete;
// var componentForm = {
//   street_number: 'short_name',
//   route: 'long_name',
//   locality: 'long_name',
//   administrative_area_level_1: 'short_name',
//   country: 'long_name',
//   postal_code: 'short_name'
// };

// function initAutocomplete() {
//   // Create the autocomplete object, restricting the search to geographical
//   // location types.
//   autocomplete = new google.maps.places.Autocomplete(
//       /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
//       {types: ['geocode']});

//   // When the user selects an address from the dropdown, populate the address
//   // fields in the form.
//   autocomplete.addListener('place_changed', fillInAddress);
// }

// function fillInAddress() {
//   // Get the place details from the autocomplete object.
//   var place = autocomplete.getPlace();

//   for (var component in componentForm) {
//     document.getElementById(component).value = '';
//     document.getElementById(component).disabled = false;
//   }

//   // Get each component of the address from the place details
//   // and fill the corresponding field on the form.
//   for (var i = 0; i < place.address_components.length; i++) {
//     var addressType = place.address_components[i].types[0];
//     if (componentForm[addressType]) {
//       var val = place.address_components[i][componentForm[addressType]];
//       document.getElementById(addressType).value = val;
//     }
//   }
// }

// // Bias the autocomplete object to the user's geographical location,
// // as supplied by the browser's 'navigator.geolocation' object.
// function geolocate() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var geolocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//       var circle = new google.maps.Circle({
//         center: geolocation,
//         radius: position.coords.accuracy
//       });
//       autocomplete.setBounds(circle.getBounds());
//     });
//   }
// }
