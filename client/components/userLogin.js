angular.module('app').component('login', {
  bindings: {
    user: '='
  },
  controller: 'loginController',
  templateUrl: 'templates/userLogin.html'
}).controller('loginController', function loginController($scope, $http) {
  var ctrl = this;


  var resetErrors = function () {
    ctrl.error = {general: null, password: null, user: null };
  };
  resetErrors();

  var resetLoginInfo = function () {
    ctrl.loginInfo = {password: '', username: ''};
  };
  resetLoginInfo();

  ctrl.login = function (user) {
    resetErrors();
    $http.post('login', user)
      .then((data) => {
        console.log('login:', data);
        ctrl.user = data.data.user;
        resetLoginInfo();
      })
      .catch (err => {
        console.log('err:', err);
        if (err.status === 401) {
          ctrl.error.general = 'Invalid Username or Password';
        }
        ctrl.loginInfo.password = '';
      });
  };

  ctrl.logout = function () {
    resetErrors();
    $http.get('logout')
      .then(data => {
        console.log('logout:', data);
        ctrl.user = null;
        resetLoginInfo();
      })
      .catch (err => {
        console.log('err:', err);
        ctrl.loginInfo.password = '';
      });
  };

  ctrl.create = function (loginInfo) {
    resetErrors();
    $http.post('register', loginInfo)
      .then(data => {
        console.log('register:', data);
        ctrl.user = data.data.user;
        resetLoginInfo();
      })
      .catch (err => {
        console.log('err:', err);
        ctrl.loginInfo.password = '';
      });
  };
});