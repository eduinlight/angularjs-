angular.module('my-components').component('myInputDate', {
  templateUrl: 'src/components/my-input-date/my-input-date.component.html',
  bindings: {
    error: '=',
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    required: '<',
  },
  controller: function(
    $element,
    $scope
  ) {
    return new class {

      constructor() {

      }

      $onInit = () => {
        let $elem = $($element).find('#datepicker')
        $elem.datepicker({
          autoclose: true,
          format: 'mm/dd/yyyy',
        })

        $elem.change(() => {
          let d = new Date($elem.val())
          this.model = d.getTime() / 1000
        })
      }

    }
  }
});