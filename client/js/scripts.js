

function map() {  //places a marker in the map
  var uluru = {lat: 37.7749 , lng: -122.4194 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: uluru
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
