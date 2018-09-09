angular.module('app').component('mainView', {
  bindings: {
    currentView: '<',
    user: '<'
  },
  template:
  `
  <div ng-switch="$ctrl.currentView">
    <add-address ng-switch-when="addAddress"></add-address>
    <userform ng-switch-when="userform"></userform>
    <list-addresses ng-switch-when="listAddress" user="$ctrl.user"></list-addresses>
  </div>
  `
});