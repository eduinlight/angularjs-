angular.module('my-components').component('myInput', {
  templateUrl: 'src/components/my-input/my-input.component.html',
  bindings: {
    error: '=',
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    placeholder: '@',
    required: '<',
    readonly: '<',
    type: '@',
  },
  controller: function() {
    return new class {

      constructor() {

      }

      $onInit = () => {

      }

      change() {
        this.error = ''
      }

    }
  }
});