angular.module('my-components').component('mySelect', {
  templateUrl: 'src/components/my-select/my-select.component.html',
  bindings: {
    error: '=',
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    data: '<',
    required: '<',
    // multiple: '<'
  },
  controller: function(
    $element,
    $attrs
  ) {
    return new class {

      constructor() {

      }
    }
  }
});