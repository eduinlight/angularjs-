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

      upload(url, data) {
        let fd = new FormData()
        angular.forEach(data, (value, key) => {
          fd.append(key, value)
        })
        debugService.log("Request to: " + url + " Method: post")
        debugService.log("Data: ", data)
        let upHeader = {}
        angular.copy(this.config.headers, upHeader)
        upHeader['Content-Type'] = undefined
        return $http.post(url, fd, {
          transformRequest: angular.identity,
          headers: upHeader,
        }).then((res) => {
          debugService.log("Response from: " + url + " Method: post")
          debugService.log("Response: ", res)
          return res.data
        }, (error) => {
          debugService.log("Errors from: " + _url + " Method: post ")
          debugService.log("Errors: ", error)
          notyService.error("Error", "There is not connection with the server")
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
            notyService.error("Error", "There is not connection with the server")
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
            notyService.error("Error", "There is not connection with the server")
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
            notyService.error("Error", "There is not connection with the server")
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
            notyService.error("Error", "There is not connection with the server")
          })
      }
    }
  })