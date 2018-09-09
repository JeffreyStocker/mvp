var app = angular.module('app', [])
  .controller('mainController', function mainController($scope, $http) {
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
    $http.get('/key')
      .then (data => {
        var key = data.data;
        var createHiddenAPI = document.createElement('script');
        createHiddenAPI.src = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initGoogle&libraries=places';
        document.getElementsByTagName('head')[0].appendChild(createHiddenAPI);

      })
      .catch (err => {
        console.log ('Error Retrieving google Key', err);
      });
    $http.get('./login')
      .then (data => {
        if (data.data) {
          ctrl.user = data.data;
        }
      })
      .catch (err => {
        console.log ('error getting user information');
      });

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