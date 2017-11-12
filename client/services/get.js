app.service('$useGet', function () {
  this.getData = function () {  // need to declare as this
    $.get('/users/data/all')
      .done ((data) => {

      })
      .fail((error) => {

      })
  }
})