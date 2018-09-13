angular.module('app').component('addAddress', {
  controller: 'addAddress',
  bindings: {
    user: '='
  },
  template:
    `<table name="addAddress">
      <tr>
        <td>Name:  </td>
        <td><input type="text" name="title" default="a" ng-model="$ctrl.address.name" /></td>
      </tr>
      <tr>
        <td>Address: </td>
        <td><input id="addAddress" type="text" default="1431 Nestwood Way, Milpitas, CA, USA" ng-model="$ctrl.address.address" /> </td>
      </tr>
    </table>
    <button ng-click="$ctrl.uploadAddress(address)">Add Address</button>`,
}).controller('addAddress', function ($scope, $http) {
  var ctrl = this;
  ctrl.address = {
    name: 'a',
    address: '1431 Nestwood Way, Milpitas, CA, USA'
  };
  ctrl.uploadAddress = function (address) {
    $http.post(`/user/${ctrl.user.username}/address`, {user: ctrl.user, address: ctrl.address} )
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

