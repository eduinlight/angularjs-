class CrudClass {
  constructor(_http, url) {
    this._http = _http
    this.url = url

    if (this.url[this.url.length - 1] != '/')
      this.url += '/'
  }

  list(params = "") {
    return this._http.get(this.url + params).then((data) => { return data })
  }

  get(id, params = "") {
    return this._http.get(this.url + id + params).then((data) => { return data })
  }

  add(data, params = "") {
    return this._http.post(this.url + params, data, ).then((data) => { return data })
  }

  edit(id, data, params = "") {
    return this._http.put(this.url + id + params, data).then((data) => { return data })
  }

  remove(id, params = "") {
    return this._http.delete(this.url + id + params).then((data) => { return data })
  }
}