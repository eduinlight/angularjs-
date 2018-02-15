angular.module('my-components').component('leftPanel', {
  templateUrl: 'src/components/left-panel/left-panel.component.html',
  controller: function() {
    return new class {

      $onInit = () => {
        // this.active = true
      }
    }
  }
});