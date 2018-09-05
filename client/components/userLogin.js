angular.module('app').component('login', {
  binding: {
    user: "<"
  },
  templateUrl: 'templates/userLogin.html'
}).controller('loginController', ['$scope', '$useGet', function loginController($scope, $useGet) {
  this.login = function () {

  },
  this.logout = function () {

  }
}]);