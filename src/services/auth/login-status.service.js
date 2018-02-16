function StorageModel() {
  this.access_token = ''
  this.user_id = ''
  this.rol = ''
  this.user = ''
  this.first_name = ''
  this.last_name = ''
}
angular.module('my-services').service('loginStatusService',
  function($rootScope) {
    return new class {
      storage_key = "danceapp_02869264ksjdi234nkw"

      constructor() {
        this.storage = new StorageModel()
        this.scope = $rootScope.$new(true)
        this.load()
        this.emitChange()
      }

      emitChange() {
        this.scope.$emit('storageChange', this.storage)
      }

      isLogged() {
        return this.storage.access_token != ''
      }

      isAdmin() {
        return this.isLogged() && this.storage.rol === 'admin'
      }

      setStorage(value) {
        this.storage = value
        this.save()
        this.emitChange()
      }

      remove() {
        localStorage.removeItem(this.storage_key)
        this.storage = new StorageModel()
        this.emitChange()
      }

      save() {
        localStorage.setItem(this.storage_key, JSON.stringify(this.storage))
      }

      load() {
        let tmp = JSON.parse(localStorage.getItem(this.storage_key))

        if (tmp == null) {
          this.remove()
          return false
        }

        this.setStorage(tmp)
      }

    }
  })