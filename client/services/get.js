app.service('$useGet', function () {
  this.getData = function () {  // need to declare as this
    $.get('/user/data')
      .done ((data) => {

      })
      .fail((error) => {

      })
  }
})