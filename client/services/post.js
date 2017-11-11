app.service('$post', function () {
  this.postData = function (dataToSend = {}) {  // need to declare as this
    $.post('/', JSON.stringify(dataToSend), function (data, status){
      if (status === 'success') {
        console.log('post successful')
        console.log('Return Data', data)
      } else {
        console.log ('status', status)
      }
    })
  }
})