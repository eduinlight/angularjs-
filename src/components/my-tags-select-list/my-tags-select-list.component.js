angular.module('my-components').component('myTagsSelectList', {
  templateUrl: 'src/components/my-tags-select-list/my-tags-select-list.component.html',
  bindings: {
    model: '=',
    data: '<',
    onChange: '&',
  },
  controller: function(
    $element,
  ) {
    return new class {

      constructor() {}
      $onInit() {
        if (this.model == undefined) {
          this.model = []
        }
        this.selected = -1
      }

      getText(id) {
        if (this.data) {
          let index = this.data.findIndex(v => v.id == id)
          if (index != -1) {
            return this.data[this.data.findIndex(v => v.id == id)].text
          }
        }

        return ""
      }

      add() {
        if (this.model.findIndex(v => v == this.selected) == -1 && this.selected != -1) {
          this.model.push(this.selected)
          this.selected = -1
          this.onChange(this.model)
        }

      }

      remove(id) {
        this.model.splice(id, 1)
      }
    }
  }
})