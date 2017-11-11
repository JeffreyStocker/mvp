app.service('$post', function () {
  this.postData = function () {  // need to declare as this
    $.post('/', 'test', function (data, status){
      if (status === 'success') {
        console.log('post successful')
        console.log('data', data)
      }
    })
  }
})