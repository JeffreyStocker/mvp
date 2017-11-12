var app = angular.module("app", [])
.controller("mainController", function mainController($scope, $useGet)  {
  // $scope.name = "Bob" //this works when just using {{name}}
  // this.name = "sdafsdafsdf"  //note this work when specify ng-controller="mainController as ctrl" {{ctrl.name}}
  // this.test2 = {name: '3424324324'}
  // this.name ="asdfsafsd"
  // this.test = function () {
  //   console.log ('here')
  //   console.log ('data', $getData)
  // }
  $scope.testGet = function () {
    // console.log ('here')
    $useGet.getData()
      .then(data => {
        console.log ('promise data', data)
        window.parseGetDataToCreateFieldOfMarkers(data)
      })
      .catch(error => {
        console.log('catch error', error)
      })
//     $useGet.getData2(function (error, data) {
//       console.log ('callback data', data)
//     }) 
  }
})
.component('app', {
  binding: {name: name},
  controller: 'mainController',
  template: 
  `
  <button id="sendclick" ng-click="test()" >Add Markerrer</button>  
  <button id="testGet" ng-click="testGet()" >TestGet</button>  

   <map></map>
   <h2> See Who is Around You! </h2>
   <userform>userForm Loading</userform>
   `
})
.service('get', function () {
});

//  <list name="$ctrl.name"> List Loading </list>