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
    ctrl.map = {
      mapMarkers: [],
      locations: {
        'San Francisco': {lat: 37.7749, lng: -122.4194 },
        'uluru': {lat: 37.73242, lng: -122.43425 }
      },
      mapControls: {
        userLocation: function (cb) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              cb({lat: position.coords.latitude, lng: position.coords.longitude});
            }, (err => {
                cb(ctrl.map.locations['San Francisco']);
              }));
          } else {
            cb(ctrl.map.locations['San Francisco']);
          }
        },
        createMarker: function (lat, lng, {title = '', label = ''} = {}) {
          var marker = new google.maps.Marker({
            position: {lat, lng},
            map: ctrl.map.map,
            animation: google.maps.Animation.DROP,
            title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              strokeColor: 'blue',
              scale: 4
            }
          }).addListener('click', () => {
            console.log ('click');
          });
          mapMarkers.push(ctrl.map.marker);
        },

        parsePostDataToCreateMarkers: function (data) {
          if (!data) { return; }
          var home = data.homeAddress_geolocation.results[0].geometry.location || null;
          if (home) {
            ctrl.map.mapControls.createMarkerHome(home.lat, home.lng, {title: 'Home'});
          }
          var work = data.workAddress_geolocation.results[0].geometry.location || null;
          if (work) {
            ctrl.map.mapControls.createMarkerHome(work.lat, work.lng, {title: 'Work'});
          }
        },

        parseGetDataToCreateFieldOfMarkers: function (data) {
          if (!data) { return; }
          console.log (data.data);
          if (Array.isArray(data.data)) {
            data.data.forEach (singleData => {
              try {
                console.log('element', singleData);
                var home = singleData.homeAddress_geolocation.results[0].geometry.location || null;
                if (home) {
                  ctrl.map.mapControls.createMarker(home.lat, home.lng, {title: `${singleData.username} \nHome Address: ${singleData.homeAddress_geolocation.results[0].formatted_address}`});
                }
                var work = singleData.workAddress_geolocation.results[0].geometry.location || null;
                if (work) {
                  ctrl.map.mapControls.createMarker(work.lat, work.lng, {title: `${singleData.username} \nHome Address: ${singleData.workAddress_geolocation.results[0].formatted_address}`});
                }
              } catch (err) {
              }
            });
          }
        },
        createRandomMarker: function (lat, long) {
          var lat = (37.74 + Math.random() / 10);
          var long = (-122.43 + Math.random() / 10);
          ctrl.map.markers.push(new google.maps.Marker({
            position: {lat: lat, lng: long },
            // position: {lat: 37.7449 , lng: -122.43435 },
            map: ctrl.map.map,
            animation: google.maps.Animation.DROP
          })
          );
        },

      }
    };

    window.initGoogle = function() { //places a marker in the map
      ctrl.map.mapControls.userLocation (location => {
        ctrl.map.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: location
        });
      });
    };

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
  <main-view map="$ctrl.map" current-view="$ctrl.currentView" user="$ctrl.user" ></main-view>
  `
  });

//  <list name="$ctrl.name"> List Loading </list>
// <showselecteduser> </showselecteduser>

/*
  <userform >userForm Loading</userform>



*/