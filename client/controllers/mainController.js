var app = angular.module("app", [])
.controller("mainController", function mainController()  {
  // $scope.name = "Bob" //this works when just using {{name}}
  this.name = "sdafsdafsdf"  //note this work when specify ng-controller="mainController as ctrl" {{ctrl.name}}
  this.test2 = {name: '3424324324'}
  this.name ="asdfsafsd"
})
.component('app', {
  binding: {name: name},
  controller: 'mainController',
  template: 
  '<div>component test</div> \
   <list name="$ctrl.name"> loading List </list> \
   <map></map>\
   <userform>userForm Not Loading</userform> \
   '
})
.service('get', function () {
});