app.controller('mapCtrl', function ($scope, $http) {
  $http.get('/key')
    .then (data => {
      var key = data.data;
      var createHiddenAPI = document.createElement('script');
      createHiddenAPI.src = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initGoogle&libraries=places';
      document.getElementsByTagName('head')[0].appendChild(createHiddenAPI);
    })
    .catch (err => {
      console.log ('Error Retrieving Key', err);
    });
});