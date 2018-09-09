angular.module('app').component('listViews', {
  bindings: {
    currentView: '=',
    user: '<'
  },
  controller: 'listViewCtrl',
  template: `
  <div ng-if="$ctrl.user">
    <span ng-click="$ctrl.updateView('addAddress')">Add Address</span>&nbsp
    <span ng-click="$ctrl.updateView('listAddress')">List Addresses</span>&nbsp
    <span ng-click="$ctrl.updateView('routes')">Routes</span>&nbsp
    <span ng-click="$ctrl.updateView('userform')">userform</span>&nbsp
  </div>
  `
}).controller('listViewCtrl', function () {
  var ctrl = this;
  ctrl.updateView = function (newView) {
    ctrl.currentView = newView;
  };
});