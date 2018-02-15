angular.module('my-services').service('myHttpService',
  function($http, loginStatusService, debugService, config, notyService) {
    return new class {

      constructor() {
        this.config = {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          }
        }

        this.checkAccessToken()
        loginStatusService.scope.$on('storageChange', storage => {
          this.checkAccessToken()
        })
      }

      checkAccessToken() {
        if (loginStatusService.isLogged()) {
          this.config.headers['Authorization'] = "Bearer " + loginStatusService.storage.access_token
        } else {
          delete this.config.headers['Authorization']
        }
      }

      get(url) {
        let _url = config.api_url + url
        debugService.log("Request to: " + _url + " Method: get")
        return $http.get(_url, this.config).then(
          (res) => {
            debugService.log("Response from: " + _url + " Method: get ")
            debugService.log("Response: ", res.data)
            return res.data
          }, (error) => {
            debugService.log("Errors from: " + _url + " Method: get ")
            debugService.log("Errors: ", error)
            notyService.error("Error", "No se pudo conectar al servidor")
          })
      }

      post(url, data) {
        let _url = config.api_url + url
        debugService.log("Request to: " + _url + " Method: post ")
        debugService.log("Data: ", data)
        return $http.post(_url, data, this.config).then(
          (res) => {
            debugService.log("Response from: " + _url + " Method: post ")
            debugService.log("Data: ", data)
            debugService.log("Response: ", res.data)
            return res.data
          }, (error) => {
            debugService.log("Response from: " + _url + " Method: post ")
            debugService.log("Data: ", data)
            notyService.error("Error", "No se pudo conectar al servidor")
          })
      }

      put(url, data) {
        let _url = config.api_url + url
        debugService.log("Request to: " + _url + " Method: put ")
        debugService.log("Data: ", data)
        return $http.put(_url, data, this.config).then(
          (res) => {
            debugService.log("Response from: " + _url + " Method: put ")
            debugService.log("Data: ", data)
            debugService.log("Response: ", res.data)
            return res.data
          }, (error) => {
            debugService.log("Response from: " + _url + " Method: put ")
            debugService.log("Data: ", data)
            notyService.error("Error", "No se pudo conectar al servidor")
          })
      }

      delete(url) {
        let _url = config.api_url + url
        debugService.log("Request to: " + _url + " Method: delete ")
        return $http.delete(_url, this.config).then(
          (res) => {
            debugService.log("Response from: " + _url + " Method: delete ")
            debugService.log("Response: ", res.data)
            return res.data
          }, (error) => {
            debugService.log("Errors from: " + _url + " Method: delete ")
            debugService.log("Errors: ", error)
            notyService.error("Error", "No se pudo conectar al servidor")
          })
      }
    }
  })