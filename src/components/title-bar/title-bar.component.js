angular.module('my-components').component('titleBar', {
  templateUrl: 'src/components/title-bar/title-bar.component.html',
  controller: function(titleBarService) {
    return new class {

      constructor() {
        this.title = ""
        this.description = ""
        this.path = []

        this._event = null
      }

      $onInit() {
        this._event = titleBarService.scope.$on('dataChange', (event, data) => {
          this.title = data.title
          this.description = data.description
          this.path = data.path
        })

      }

      $onDestroy() {

      }

    }
  }
});