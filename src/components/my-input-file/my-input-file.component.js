angular.module('my-components').component('myInputFile', {
  templateUrl: 'src/components/my-input-file/my-input-file.component.html',
  bindings: {
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    required: '<',
    error: '<',
  },
  controller: function(
    uploadService
  ) {
    return new class {

      constructor() {}

      $onInit = () => {

      }

      change(target) {
        if (target.files.length > 0) {
          uploadService.upload(target.files[0]).then(res => {
            if (res) {
              if (res.status == 200) {
                this.model = res.data
                this.error = undefined
              } else {
                this.error = res.errors.file
              }
            }
          })
        }
      }

    }
  }
});