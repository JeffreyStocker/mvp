angular.module('app').component ('userform', {
  binding: {form: "="},
  controller: function ($post, $scope) {
    $scope.submitDataToServer = function (data) {
      console.log ('POST sent data', data)
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