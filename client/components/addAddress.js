angular.module('app').component('addAddress', {
  controller: 'addAddress',
  bindings: {
    user: '<'
  },
  template: `
  <form name="addAddress">
    <div>
      Name: <input type="text" name="title" ng-model="address.name" />
    </div>
    <div>
      Address: <input id="addAddress" type="text" ng-model="address.address" />
    </div>
    <div>
      <button ng-click="uploadAddress(address)">Add Address</button>
    </div>
  </form>
  `,
}).controller('addAddress', function ($scope, $http) {
  var ctrl = this;
  ctrl.uploadAddress = function (address) {
    $http.post(`/user/${ctrl.user.username}/address`, {user: ctrl.user, address} )
      .then (({data: results}) => {
        console.log(results);
      })
      .catch (err => {
        console.log('err addAddress: ', err);
      });
  };

  ctrl.$postLink = function () {
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('addAddress')),
      {types: ['geocode']});
  };
});

