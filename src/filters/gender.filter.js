angular.module('my-filters')
  .filter('gender', function() {
    return function(input) {
      let s = []
      s['M'] = 'Male'
      s['F'] = 'Famele'
      return s[input]
    }
  })