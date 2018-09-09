angular.module('app').component('listAddresses', {
  bindings: {
    user: '<'
  },
  controller: function ($http) {
    var ctrl = this;
    ctrl.$onInit = function () {
      if (ctrl.user) {
        $http.get('/' + ctrl.user.username + '/list')
          .then (({data}) => {

          })
          .catch (err => {
            console.log('error, listAddress', err);
          });
      }
    };
  },

  template:
  `
  listofAddress
  <div>
    <ul>
    </ul>
  </div>
  `,
});

/*
      <li ng-repeat="(key, value) in myobj">{{value}}</li>

*/