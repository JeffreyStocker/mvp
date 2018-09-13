angular.module('app').component('listAddresses', {
  bindings: {
    user: '='
  },
  controller: function ($http) {
    var ctrl = this;
    // ctrl.$onInit = function () {
    //   if (ctrl.user) {
    //     $http.get('/user/' + ctrl.user.username + '/address')
    //       .then (({data}) => {

    //         ctrl.user.address = data.addresses;
    //       })
    //       .catch (err => {
    //         console.log('error, listAddress', err);
    //       });
    //   }
    // };
  },

  template:
    `<table class="list-of-address">
      <tr ng-repeat="address in $ctrl.user.addresses">
        <td>{{address[0]}}</td>
        <td><button>Show</button></td>
        <td><button>Remove</button></td>
        <td><button>Edit</button></td>
      </tr>
    </table>`,
});

/*
      <li ng-repeat="(key, value) in myobj">{{value}}</li>

*/