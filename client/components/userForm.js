angular.module('app').component ('userform', {
  binding: {form: "="},
  controller: function ($post, $scope) {
    $scope.submitDataToServer = function (data) {
      console.log ('data', data)
      $post.postData(data)
        .then(data => {
          window.parsePostDataToCreateMarkers(data)
        })
        .catch((err) => {
          console.log ('error with data: ', err)
        })
    }
    // $scope.form 
    // $scope.form.workAddress = '1818 26th Ave, San Francisco, CA 94122, USA'
    // form.homeAddress = ''
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