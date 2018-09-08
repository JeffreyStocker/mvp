angular.module('app').component('titleBar', {
  bindings: {
    user: '='
  },
  template: `
  <div class="titleBar">
    <H1 class="floatLeft">THE GREAT CARPOOL PROJECT</H1>
    <login class="login floatRight" user="$ctrl.user"></login>
  </div>`
});