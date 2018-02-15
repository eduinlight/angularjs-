angular.module('my-services').service('dancestylesApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/dancestyles")
      }
    }
  })