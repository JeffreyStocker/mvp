app.service('$useGet', function () {

  this.getData = function () {
    return new Promise ((resolve, reject) => {
      // console.log('here')
      $.get('/users/data/all')
        .done ((data) => {
          // console.log ('data recieved', data)
          resolve (data);
        })
        .fail((error) => {
          console.log('get data error');
          reject(error);
        });
    });
  };

  this.getDataCallback = function (callback) {
    // console.log('here')
    $.get('/users/data/all')
      .done ((data) => {
        console.log ('data recieved', data);
        callback (null, data);
      })
      .fail((error) => {
        console.log('get data error');
        callback(error, null);
      });
  };
});