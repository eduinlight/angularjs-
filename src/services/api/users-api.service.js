angular.module('my-services').service('usersApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/users")
      }
    }
  })