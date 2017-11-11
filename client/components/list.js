angular.module('app').component('list', {
  bindings: {
    name: '<'
  },
  controller: function ($getData, $post) {
  console.log('test',$getData)
  $post.postData();
}
  ,
  template: '<div>list: im here {{$ctrl.name}} </div>',
  // template: "<div>i'm here {{name}} {{$ctrl.name}} </div>",
})