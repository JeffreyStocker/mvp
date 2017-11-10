angular.module('app').component('test', {
  template: '<span>test: Name: {{$ctrl.test}} </span>',
  controller: 'mainController',
  bindings: {
    test: '<'
  }
})
