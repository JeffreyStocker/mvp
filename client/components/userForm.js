angular.module('app').component ('userform', {
  binding: {
    form: "="
  },
  controller: function ($post, $scope, $useGet) {
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

    $scope.testGet = function ($scope) {
      console.log ('here')
      $useGet.getData()
        .then(data => {
          console.log ('promise data', data)
          window.parseGetDataToCreateFieldOfMarkers(data)
        })
        .catch(error => {
          console.log('catch error', error)
        })
    }
  },
  templateUrl: 'templates/form.html' 
})