angular.module('app').component('mainView', {
  bindings: {
    currentView: '<',
    user: '=',
    map: '='
  },
  template:
  `
  <div ng-switch="$ctrl.currentView">
    <add-address ng-switch-when="addAddress" user="$ctrl.user" map="$ctrl.map"></add-address>
    <userform ng-switch-when="userform" user="$ctrl.user" map="$ctrl.map"></userform>
    <list-addresses ng-switch-when="listAddress" user="$ctrl.user" user="$ctrl.user" map="$ctrl.map"></list-addresses>
  </div>
  `
});