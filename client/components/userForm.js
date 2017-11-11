angular.module('app').component ('userform', {
  binding: {},
  controller: function ($post, $scope) {
    $scope.submitDataToServer = function (data) {
      console.log ('data', data)
      $post.postData(data)
    }
  },
  templateUrl: 'templates/form.html' 
})



// `<div>
//     <form action="/" method="post" onsubmit="return false">>
//     <div>Name: <input id="username" placeholder="Name" type="text" autofocus> <div>
//     <div> Address: <input id="address" placeholder="Home Address" type="text"> </div>
//     <div> Work Address <input id="workAddress" placeholder="Work Address" type="text"> </div>
//     <div> Carpool Range <input id="range" placeholder="in mile" type="text" </div>
//     <input type="submit" value="Submit">
//     </form>
//   </div>
//   `