angular.module('dance', [
  //CORE

  //TERCEROS
  'ui.router',
  //MIOS
  'my-components',
  'my-services',
  'my-pipes',
  'my-directives',
  'pages'
]).run(['$state',
  function($state) {
    if (location.hash == "") {
      $state.go('users.home');
    }

  }
]);

// $rootScope.$on('$stateChangeStart', function(event, toState) {
//   var greeting = toState.data.customData1 + " " + toState.data.customData2;
//   console.log(greeting);

//   // Would print "Hello World!" when 'parent' is activated
//   // Would print "Hello UI-Router!" when 'parent.child' is activated
// })