var app = angular.module('app', [])
  .controller('mainController', function mainController($scope, $useGet) {
  // $scope.name = "Bob" //this works when just using {{name}}
  // this.name = "sdafsdafsdf"  //note this work when specify ng-controller="mainController as ctrl" {{ctrl.name}}
  // this.test2 = {name: '3424324324'}
  // this.name ="asdfsafsd"
  // this.test = function () {
  //   console.log ('here')
  //   console.log ('data', $getData)
  // }
    var ctrl = this;
    ctrl.user = null;

  })
  .component('app', {
    binding: {name: name},
    controller: 'mainController',
    template:
  `
  <title-bar user="$ctrl.user"></title-bar>
  <map></map>
  <h2> See Who is Around You! </h2>
  <div>
    <userform >userForm Loading</userform>
  <div> `
  });

//  <list name="$ctrl.name"> List Loading </list>
// <showselecteduser> </showselecteduser>