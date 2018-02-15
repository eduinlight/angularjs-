angular.module('my-services').service('personsApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/persons")
      }
    }
  })