angular.module('my-services').service('titlesApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/titles")
      }
    }
  })