angular.module('my-components').component('loadingData', {
  templateUrl: 'src/components/loading-data/loading-data.component.html',
  bindings: {
    active: "<"
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