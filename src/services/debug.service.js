angular.module('my-services').service('debugService', function(config) {
  this.log = (p1 = "", p2 = "") => {
    if (config.debug)
      console.log(p1, p2)
  }
})