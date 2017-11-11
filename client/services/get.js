app.service('$getData', function () {
  this.getData = function () {  // need to declare as this
    $.get('/user/data', function (data, status){
      if (status === 'success') {
        console.log('get successful')
      }
    })
  }
  console.log ('testgetdata')
})