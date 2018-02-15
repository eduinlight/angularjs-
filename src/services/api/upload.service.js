angular.module('my-services').service('uploadService',
  function(
    myHttpService,
    config
  ) {
    return new class {
      constructor() {

      }

      upload(file) {
        return myHttpService.upload(config.api_url + "/upload", { file: file }).then(data => { return data })
      }
    }
  })