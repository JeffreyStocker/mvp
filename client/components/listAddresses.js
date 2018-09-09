angular.module('app').component('listAddresses', {
  bindings: {
    user: '<'
  },
  controller: function ($http) {
  // console.log('test',$getData)
    var ctrl = this;
    ctrl.$onInit = function () {
      console.log('test onInit');
      if (ctrl.user) {
        console.log (ctrl.user);
        $http.get('/' + ctrl.user.username + '/list')
          .then (({data}) => {

          })
          .catch (err => {
            console.log('error, listAddress', err);
          });
      }
    };
    console.log (ctrl.user);

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