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
    ctrl.currentView = 'default';

  })
  .component('app', {
    binding: {name: name},
    controller: 'mainController',
    template:
  `
  <title-bar user="$ctrl.user"></title-bar>
  <h2> See Who is Around You! </h2>

  <map></map>
  <list-views current-view="$ctrl.currentView" user="$ctrl.user"> </list-views>
  <main-view current-view="$ctrl.currentView" user="$ctrl.user" ></main-view>
  `
  });

//  <list name="$ctrl.name"> List Loading </list>
// <showselecteduser> </showselecteduser>

/*
  <userform >userForm Loading</userform>



*/