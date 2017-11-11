
var locations = {
  "San Francisco": {lat: 37.7749 , lng: -122.4194 },
  "uluru" : {lat: 37.73242 , lng: -122.43425 }
}
var markers = [];
var map;


var initMap = function() {  //places a marker in the map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: locations["San Francisco"]
  });
}


var createRandomMarker = function () {
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
 

// var marker = new google.maps.Marker({
  //   position: uluru,
  //   title: 'bye',
  //   map: map
  // });

  // var lat = (43 + Math.random() / 100);
  // var long = (77 + Math.random()/100);

  // var marker2 = new google.maps.Marker({
  //     title: 'hi',
  //     position: {lat: 37 + lat , lng: -122 + long },
  //     map:map
  //   })

  // markers.push(new google.maps.Marker({
  //     position: position,
  //     map: map,
  //     animation: google.maps.Animation.DROP
  //   }));




// class Map {  //places a marker in the map
//   constructor (location) {
//     var uluru = {lat: 37.7749 , lng: -122.4194 };
//     this.map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 11,
//       center: uluru
//     });
//     this.marker = new google.maps.Marker({
//       position: uluru,
//       map: map
//     });
    
//     this.createRandomMarker = function () {
//       var lat = Math.random();
//       var long = Math.random();
//       new google.maps.Marker({
//         position: {lat: 37 + lat , lng: -122 + long },
//         map:map
//       })
//     }
//   }
// }

// var map = new Map()

$('document').ready(function () {
  
  $('#click').on('click', function (){
    createRandomMarker();
  })

  $('#username').on('keypress', (event) => {
    if (event.which === 13) {
      
    }
  })
})