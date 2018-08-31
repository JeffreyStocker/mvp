
$.get('/key')
  .then (key => {
    var createHiddenAPI = document.createElement('script');
    createHiddenAPI.src = "https://maps.googleapis.com/maps/api/js?key="+key+"&callback=initGoogle&libraries=places";
    document.getElementsByTagName('head')[0].appendChild(createHiddenAPI);
  })
  .catch (err => {
    console.log ('Error Retrieving Key', err);
  })

angular.module("app").component('map', {
  binding: {},
  controller: 'mainController',
  template:
  `
  <div id="map" style="width:96%;height:400px;"></div>
  `
})