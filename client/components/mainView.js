angular.module('app').component('mainView', {
  bindings: {
    currentView: '<',
    user: '='
  },
  template:
  `
  <div ng-switch="$ctrl.currentView">
    <add-address ng-switch-when="addAddress" user="$ctrl.user"></add-address>
    <userform ng-switch-when="userform" user="$ctrl.user"></userform>
    <list-addresses ng-switch-when="listAddress" user="$ctrl.user" user="$ctrl.user"></list-addresses>
  </div>
  `
});