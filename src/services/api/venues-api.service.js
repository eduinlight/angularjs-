angular.module('my-services').service('venuesApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/venues")
      }
    }
  })