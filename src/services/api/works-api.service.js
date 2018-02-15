angular.module('my-services').service('worksApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/works")
      }
    }
  })