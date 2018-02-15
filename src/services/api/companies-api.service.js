angular.module('my-services').service('companiesApiService',
  function(myHttpService) {
    return new class extends CrudClass {
      constructor() {
        super(myHttpService, "/companies")
      }
    }
  })