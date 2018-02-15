angular.module('my-components').component('myTextarea', {
  templateUrl: 'src/components/my-textarea/my-textarea.component.html',
  bindings: {
    error: '=',
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    placeholder: '@',
    required: '<',
    row: '<',
  },
  controller: function() {
    return new class {

      constructor() {

      }

      $onInit = () => {

      }

    }
  }
});