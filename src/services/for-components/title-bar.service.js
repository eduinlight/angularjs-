angular.module('my-services').service('titleBarService',
  class {
    constructor($rootScope) {
      this.scope = $rootScope.$new(true)

      this.title = "titulo"
      this.description = "descripción"
      this.path = []

      this.emitChange()
    }

    emitChange() {
      this.scope.$emit('dataChange', {
        title: this.title,
        description: this.description,
        path: this.path
      })
    }

    setTitle(title) {
      this.title = title
      this.emitChange()
    }
    setDescription(description) {
      this.description = description
      this.emitChange()
    }
    setPath(path) {
      this.path = path
      this.emitChange()
    }
    setData(data) {
      this.title = data.title
      this.description = data.description
      this.path = data.path
      this.emitChange()
    }

    addPath(path) {
      this.path.push(path)
      this.emitChange()
    }
  })