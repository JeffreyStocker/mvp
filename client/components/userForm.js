angular.module('app').component ('userform', {
  bindings: {
    form: '='
  },
  controller: function ($post, $scope, $useGet) {
    var ctrl = this;
    $scope.submitDataToServer = function (data) {
      console.log ('POST sent data', data);
      $post.postData(data)
        .then(data => {
          window.parsePostDataToCreateMarkers(data);
        })
        .catch((err) => {
          console.log ('error with data: ', err);
        });
    };

    $scope.testGet = function ($scope) {
      console.log ('here');
      $useGet.getData()
        .then(data => {
          console.log ('promise data', data);
          window.parseGetDataToCreateFieldOfMarkers(data);
        })
        .catch(error => {
          console.log('catch error', error);
        });
    };

    ctrl.$postLink = function () {
      new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocompleteHome')),
        {types: ['geocode']});
      new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocompleteWork')),
        {types: ['geocode']});
    };
  },
  templateUrl: 'templates/form.html'
});

// When the user selects an address from the dropdown, populate the address
// fields in the form.
// autocomplete.addListener('place_changed', fillInAddress);