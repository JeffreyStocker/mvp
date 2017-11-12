app.service('$post', function () {
  this.postData = function (dataToSend = {}) {  // need to declare as this
    // console.log((dataToSend))
    return new Promise ((resolve, reject) => {
      // $.post('/', JSON.stringify(dataToSend), function (data, status){
      //   console.log('Status: ', status)
      //   if (status === 'successful') {
      //     console.log('post successful')
      //     console.log('Return Data', data)
      //     resolve (data)
      //   } else {
      //     console.log ('status', status)
      //     revoke (status)
      //   }
      // })

    $.post('/', JSON.stringify(dataToSend))
      .done((data) => {
        console.log('POST successful, Data: ', data)
        resolve (data)
      })
      .fail((error) => {
        console.log ('POST Error')
        reject (error)
      }) 
    })
  }
})