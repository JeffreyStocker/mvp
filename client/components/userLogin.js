angular.module('app').component('login', {
  binding: {
    user: '<'
  },
  controller: 'loginController',
  templateUrl: 'templates/userLogin.html'
}).controller('loginController', function loginController($scope, $http) {
  var ctrl = this;
  console.log('this works');
  ctrl.loginInfo = {password: '', username: ''};

  ctrl.login = function (user) {
    $http.post('login', user)
      .then((data) => {
        console.log('data:', data);
      })
      .catch (err => {
        console.log('err:', err);
      })
      .then(() => {
        ctrl.loginInfo.password = '';
      });
  };

  ctrl.logout = function () {
    $http.get('logout')
      .then(data => {

      })
      .catch (err => {
        console.log('err:', err);
      })
      .then(() => {
        ctrl.loginInfo.password = '';
      });
  };

  ctrl.create = function (loginInfo) {
    $http.post('register', loginInfo)
      .then(data => {

      })
      .catch (err => {
        console.log('err:', err);
      })
      .then(() => {
        ctrl.loginInfo.password = '';
      });
  };
});