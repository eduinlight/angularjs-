angular.module('my-services').service('countriesApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/countries")
      }
    }
  })