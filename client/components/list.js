angular.module('app').component('list', {
  bindings: {
    name: '<'
  },
  controller: 'mainController',
  template: '<div>list: im here {{$ctrl.name}} </div>',
  // template: "<div>i'm here {{name}} {{$ctrl.name}} </div>",
})