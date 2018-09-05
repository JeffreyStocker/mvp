angular.module('app').component('titleBar', {
  binding: {
    user: '<'
  },
  template: `
  <div class="titleBar">
    <H1 class="floatLeft">THE GREAT CARPOOL PROJECT</H1>
    <login class="login floatRight" user={{user}}></login>
  </div>`
});