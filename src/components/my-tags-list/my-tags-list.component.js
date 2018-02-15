angular.module('my-components').component('myTagsList', {
  templateUrl: 'src/components/my-tags-list/my-tags-list.component.html',
  bindings: {
    title: '@',
    model: '=',
    canEdit: '<',
    canRemove: '<',
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
        this.action = "Add"
        this.text = ""
      }

      handleEnter(event) {
        if (event == undefined || event.key == "Enter") {
          if (event != undefined) {
            event.preventDefault();
          }

          let value = this.text.trim()
          if (value !== "") {
            if (this.canEdit && this.action === 'Edit') {
              if (this.model.findIndex((v, i) => this.editing_id != i && v == value) === -1) {
                this.model[this.editing_id] = value
                this.text = ''
                this.action = 'Add'
              }
            } else if (this.action === 'Add') {
              if (this.model.findIndex(v => v == value) === -1) {
                this.model.push(value)
                this.text = ''
              }
            }
            this.onChange(this.model)
          }
        }
      }

      edit(id) {
        this.action = 'Edit'
        this.text = this.model[id]
        this.editing_id = id
      }

      remove(id) {
        if (this.canRemove)
          this.model.splice(id, 1)
      }
    }
  }
})