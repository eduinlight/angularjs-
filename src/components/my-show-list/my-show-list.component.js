angular.module('my-components').component('myShowList', {
  templateUrl: 'src/components/my-show-list/my-show-list.component.html',
  bindings: {
    title: '@',
    data: '<',
    attr: '@',
  },
  controller: function(
    $element,
  ) {
    return new class {

      constructor() {}

    }
  }
})