angular.module('app').component('test', {
  template: '<span>test: Name: {{$ctrl.test}} </span>',
  controller: function (getData) {

  },
  bindings: {
    test: '<'
  }
})
