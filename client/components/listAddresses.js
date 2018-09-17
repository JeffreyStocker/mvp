angular.module('app').component('listAddresses', {
  bindings: {
    user: '=',
    map: '='
  },
  controller: function ($scope, $http) {
    var ctrl = this;
    // ctrl.$onInit = function () {
    //   if (ctrl.user) {
    //     $http.get('/user/' + ctrl.user.username + '/address')
    //       .then (({data}) => {

    //         ctrl.user.address = data.addresses;
    //       })
    //       .catch (err => {
    //         console.log('error, listAddress', err);
    //       });
    //   }
    // };

    var searchAddress = function (address) {
      return ctrl.user.addresses.find(val => address === val);
    };

    ctrl.show = function (evt, address) {
      console.log (address)
      console.log (ctrl.user)

      var {lat, lng} = address[1].geometry.location;
      map.createMarker(lat, lng, address[0]);
    };

    ctrl.edit = function (evt, address) {

    };

    ctrl.delete = function (evt, address) {

    };



    ctrl.drop = function (evt) {
      console.log ('evt', evt);
    };

    ctrl.click = function (evt) {
      evt.preventDefault();
      console.log ('evt click', evt);
    };



    ctrl.lists = {'A': [{label: 'Item A'}], 'B': [{label: 'Item B'}]};
    ctrl.models = {
      lists: {'A': [], 'B': []},
      selected: ''
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
      ctrl.models.lists.A.push({label: 'Item A' + i});
      ctrl.models.lists.B.push({label: 'Item B' + i});
    }
  },

  template:
    `
    <table class="list-of-address">
      <tr ng-repeat="address in $ctrl.user.addresses.address track by $index"
        dnd-draggable="address"
        dnd-moved="address.splice($index, 1)"
        dnd-effect-allowed="move"
        dnd-selected="models.selected = address"
        ng-class="{'selected': models.selected === address}"
      >
        <img val="{{$index}}"/>
        {{$index}}
        <td>{{$ctrl.user.addresses.names[$index]}}</td>
        <td><button ng-click="$ctrl.show($event, address)">Show</button></td>
        <td><button ng-click="$ctrl.delete($event)">Remove</button></td>
        <td><button ng-click="$ctrl.edit($event)">Edit</button></td>
      </tr>
    </table>

<br/>
<br/>
test
<ul dnd-list="list">
  <li ng-repeat="item in $ctrl.user.addresses.address track by $index"
    dnd-draggable="item"
    dnd-moved="item.splice($index, 1)"
    dnd-effect-allowed="move"
    dnd-selected="models.selected = item"
    ng-class="{'selected': models.selected === item}"
  >
    {{$ctrl.user.addresses.names[$index]}}
  </li>
</ul>
    `,
});

/*
      <li ng-repeat="(key, value) in myobj">{{value}}</li>
ng-ondrop="$ctrl.drop($event)" ng-allowDrop="$ctrl.drop($event)" draggable="true"




  <ul dnd-list="list">
    <!-- The dnd-draggable directive makes an element draggable and will
         transfer the object that was assigned to it. If an element was
         dragged away, you have to remove it from the original list
         yourself using the dnd-moved attribute -->
    <li ng-repeat="address in $ctrl.user.addresses"
        dnd-draggable="address"
        dnd-moved="list.splice($index, 1)"
        dnd-effect-allowed="move"
        dnd-selected="models.selected = address"
        ng-class="{'selected': models.selected === address}"
        >
        {{address[0]}}
    </li>
</ul>
*/