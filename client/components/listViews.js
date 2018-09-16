angular.module('app').component('listViews', {
  bindings: {
    currentView: '=',
    user: '<'
  },
  controller: 'listViewCtrl',
  template:
  `<div class="listViews" ng-if="$ctrl.user">
    <span  ng-repeat="(key, value) in $ctrl.listOfViews">
      <a ng-click="$ctrl.updateView(value[1])"
        ng-class="{selected: $ctrl.currentView === value[1]}">{{value[0]}}</a>&nbsp
    </span>
  </div>`
}).controller('listViewCtrl', function () {
  var ctrl = this;
  ctrl.listOfViews = [['Add Address', 'addAddress'], ['List Addresses', 'listAddress'], ['Routes', 'routes'], ['UserForms', 'userform']];
  ctrl.updateView = function (newView) {
    ctrl.currentView = newView;
  };
});