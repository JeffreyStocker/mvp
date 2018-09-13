angular.module('app').component('listViews', {
  bindings: {
    currentView: '=',
    user: '<'
  },
  controller: 'listViewCtrl',
  template: `
  <div class="listViews" ng-if="$ctrl.user">
    <a ng-click="$ctrl.updateView('addAddress')" ng-class="{selected: $ctrl.currentView === 'addAddress'}">Add Address</a>&nbsp
    <a ng-click="$ctrl.updateView('listAddress')" ng-class="{selected: $ctrl.currentView === 'listAddress'}">List Addresses</a>&nbsp
    <a ng-click="$ctrl.updateView('routes')" ng-class="{selected: $ctrl.currentView === 'routes'}">Routes</a>&nbsp
    <a ng-click="$ctrl.updateView('userform')" ng-class="{selected: $ctrl.currentView === 'userform'}">userform</a>&nbsp
  </div>
  `
}).controller('listViewCtrl', function () {
  var ctrl = this;
  ctrl.updateView = function (newView) {
    ctrl.currentView = newView;
  };
});