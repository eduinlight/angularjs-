angular.module('my-services').service('citiesApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/cities")
      }
    }
  })