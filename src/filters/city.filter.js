angular.module('my-filters')
  .filter('city', function() {
    return function(input) {
      if (input) {
        return input.name + ", " + input._country.name

      }
      return ""
    }
  })