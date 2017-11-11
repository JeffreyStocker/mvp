var app = angular.module("app", [])
.controller("mainController", function mainController()  {
  // $scope.name = "Bob" //this works when just using {{name}}
  this.name = "sdafsdafsdf"  //note this work when specify ng-controller="mainController as ctrl" {{ctrl.name}}
  this.test2 = {name: '3424324324'}
  this.name ="asdfsafsd"
  this.test = function () {
    console.log ('here')
    console.log ('data', $getData)
  }
})
.component('app', {
  binding: {name: name},
  template: 
  `
  <button id="sendclick" ng-click="test()" >Add Markerrer</button>  

   <map></map>
   <h2> See Who is Around You! </h2>
   <userform>userForm Loading</userform>
   `
})
.service('get', function () {
});

//  <list name="$ctrl.name"> List Loading </list>