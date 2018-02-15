angular.module('my-components').component('leftPanelLink', {
  templateUrl: 'src/components/left-panel/left-panel-link/left-panel-link.component.html',
  bindings: {
    icon: '@',
    state: '@',
    text: '@'
  },
  controller: function() {
    return new class {

      $onInit = () => {
        // this.active = true
      }
    }
  }
});