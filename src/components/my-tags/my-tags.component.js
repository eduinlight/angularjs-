angular.module('my-components').component('myTags', {
  templateUrl: 'src/components/my-tags/my-tags.component.html',
  bindings: {
    label: '@',
    model: '=',
  },
  controller: function() {
    return new class {

      constructor() {
        this.text = ""
      }

      $onInit = () => {
        if (this.model == undefined) {
          this.model = []
        }
      }

      blur() {
        if (this.text.trim() !== "") {
          this.model.push(this.text)
        }
        this.text = ""
      }

      del(index) {
        this.model.splice(index, 1)
      }

    }
  }
});