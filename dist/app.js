'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('dance', [
//CORE

//TERCEROS
'ui.router', 'ui.select2',
//MIOS
'my-components', 'my-services', 'my-pipes', 'my-directives', 'my-filters', 'pages']).run(['$state', function ($state) {
  if (location.hash == "") {
    $state.go('users.home');
  }
}]);

// $rootScope.$on('$stateChangeStart', function(event, toState) {
//   var greeting = toState.data.customData1 + " " + toState.data.customData2;
//   console.log(greeting);

//   // Would print "Hello World!" when 'parent' is activated
//   // Would print "Hello UI-Router!" when 'parent.child' is activated
// })
angular.module('dance').config(function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise('not_found');
});
angular.module('dance').constant('config', {
  api_url: location.origin + location.pathname + 'api',
  debug: true
});
var stateTree = function stateTree(state, node, $sp) {
  if (node == undefined || node.length == 0) return;
  node.forEach(function (node) {
    var new_state = state + (state === '' ? '' : '.') + node.name;
    $sp.state(new_state, node);
    stateTree(new_state, node.childrens, $sp);
  });
};

var toTitleBar = function toTitleBar(str) {
  if (str.length <= 10) return str;
  return str.substr(0, 7) + "...";
};
angular.module('my-components', []);
angular.module('my-directives', []);
angular.module('my-filters', []);
angular.module('pages', ['not_logged', 'logged']);
angular.module('my-pipes', []);
angular.module('my-services', []);
angular.module('logged', ['titles', 'dancestyles', 'countries', 'companies', 'persons', 'works', 'schools', 'venues']).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('changePassword', {
    url: '/change_password',
    component: 'changePasswordPage'
  });

  $stateProvider.state('users', {
    url: '/users',
    component: 'usersTemplate',
    onEnter: function onEnter($state, loginStatusService) {
      if (!loginStatusService.isLogged()) {
        $state.go('login');
      }
    }
  });
  $stateProvider.state('users.home', {
    url: '/home',
    component: 'homePage'
  });
});
angular.module('not_logged', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('login', {
    url: '/login',
    component: 'loginPage'
  });
  $stateProvider.state('not_found', {
    url: '/not_found',
    component: 'notFoundPage'
  });
});
angular.module('companies', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.companies', {
    url: '/companies',
    component: 'companiesListPage'
  });
  $stateProvider.state('users.companiesAdd', {
    url: '/companies/add',
    component: 'companiesFormPage'
  });
  $stateProvider.state('users.companiesEdit', {
    url: '/companies/edit/:id',
    component: 'companiesFormPage'
  });
  $stateProvider.state('users.companiesDetails', {
    url: '/companies/details/:id',
    component: 'companiesDetailsPage'
  });
});
angular.module('countries', ['cities']).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.countries', {
    url: '/countries',
    component: 'countriesListPage'
  });
  $stateProvider.state('users.countriesAdd', {
    url: '/countries/add',
    component: 'countriesFormPage'
  });
  $stateProvider.state('users.countriesEdit', {
    url: '/countries/edit/:id',
    component: 'countriesFormPage'
  });
  $stateProvider.state('users.countriesDetails', {
    url: '/countries/details/:id',
    component: 'countriesDetailsPage'
  });
});
angular.module('dancestyles', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.dancestyles', {
    url: '/dancestyles',
    component: 'dancestylesListPage'
  });
  $stateProvider.state('users.dancestylesAdd', {
    url: '/dancestyles/add',
    component: 'dancestylesFormPage'
  });
  $stateProvider.state('users.dancestylesEdit', {
    url: '/dancestyles/edit/:id',
    component: 'dancestylesFormPage'
  });
  $stateProvider.state('users.dancestylesDetails', {
    url: '/dancestyles/details/:id',
    component: 'dancestylesDetailsPage'
  });
});
angular.module('persons', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.persons', {
    url: '/persons',
    component: 'personsListPage'
  });
  $stateProvider.state('users.personsAdd', {
    url: '/persons/add',
    component: 'personsFormPage'
  });
  $stateProvider.state('users.personsEdit', {
    url: '/persons/edit/:id',
    component: 'personsFormPage'
  });
  $stateProvider.state('users.personsDetails', {
    url: '/persons/details/:id',
    component: 'personsDetailsPage'
  });
});
angular.module('schools', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.schools', {
    url: '/schools',
    component: 'schoolsListPage'
  });
  $stateProvider.state('users.schoolsAdd', {
    url: '/schools/add',
    component: 'schoolsFormPage'
  });
  $stateProvider.state('users.schoolsEdit', {
    url: '/schools/edit/:id',
    component: 'schoolsFormPage'
  });
  $stateProvider.state('users.schoolsDetails', {
    url: '/schools/details/:id',
    component: 'schoolsDetailsPage'
  });
});
angular.module('titles', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.titles', {
    url: '/titles',
    component: 'titlesListPage'
  });
  $stateProvider.state('users.titlesAdd', {
    url: '/titles/add',
    component: 'titlesFormPage'
  });
  $stateProvider.state('users.titlesEdit', {
    url: '/titles/edit/:id',
    component: 'titlesFormPage'
  });
  $stateProvider.state('users.titlesDetails', {
    url: '/titles/details/:id',
    component: 'titlesDetailsPage'
  });
});
angular.module('venues', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.venues', {
    url: '/venues',
    component: 'venuesListPage'
  });
  $stateProvider.state('users.venuesAdd', {
    url: '/venues/add',
    component: 'venuesFormPage'
  });
  $stateProvider.state('users.venuesEdit', {
    url: '/venues/edit/:id',
    component: 'venuesFormPage'
  });
  $stateProvider.state('users.venuesDetails', {
    url: '/venues/details/:id',
    component: 'venuesDetailsPage'
  });
});
angular.module('works', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.works', {
    url: '/works',
    component: 'worksListPage'
  });
  $stateProvider.state('users.worksAdd', {
    url: '/works/add',
    component: 'worksFormPage'
  });
  $stateProvider.state('users.worksEdit', {
    url: '/works/edit/:id',
    component: 'worksFormPage'
  });
  $stateProvider.state('users.worksDetails', {
    url: '/works/details/:id',
    component: 'worksDetailsPage'
  });
});
angular.module('cities', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.cities', {
    url: '/countries/:country_id/cities',
    component: 'citiesListPage',
    params: {
      country_id: ""
    }
  });
  $stateProvider.state('users.citiesAdd', {
    url: '/countries/:country_id/cities/add',
    component: 'citiesFormPage'
  });
  $stateProvider.state('users.citiesEdit', {
    url: '/countries/:country_id/cities/edit/:id',
    component: 'citiesFormPage'
  });
  $stateProvider.state('users.citiesDetails', {
    url: '/countries/:country_id/cities/details/:id',
    component: 'citiesDetailsPage'
  });
});

var CrudClass = function () {
  function CrudClass(_http, url) {
    _classCallCheck(this, CrudClass);

    this._http = _http;
    this.url = url;

    if (this.url[this.url.length - 1] != '/') this.url += '/';
  }

  _createClass(CrudClass, [{
    key: 'list',
    value: function list() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      return this._http.get(this.url + params).then(function (data) {
        return data;
      });
    }
  }, {
    key: 'get',
    value: function get(id) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      return this._http.get(this.url + id + params).then(function (data) {
        return data;
      });
    }
  }, {
    key: 'add',
    value: function add(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      return this._http.post(this.url + params, data).then(function (data) {
        return data;
      });
    }
  }, {
    key: 'edit',
    value: function edit(id, data) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      return this._http.put(this.url + id + params, data).then(function (data) {
        return data;
      });
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

      return this._http.delete(this.url + id + params).then(function (data) {
        return data;
      });
    }
  }]);

  return CrudClass;
}();

angular.module('my-filters').filter('city', function () {
  return function (input) {
    if (input) {
      return input.name + ", " + input._country.name;
    }
    return "";
  };
});
angular.module('my-filters').filter('gender', function () {
  return function (input) {
    var s = [];
    s['M'] = 'Male';
    s['F'] = 'Famele';
    return s[input];
  };
});
// angular.module('my-filters')
//   .filter('notinbyid', function() {
//     return function(A, B) {
//       // if (A && typeof(A) == 'object') {
//       // let C = []
//       // for (let i = 0, la = A.length; i < la; i++) {
//       //   let index = B.findIndex(v => A[i].id == v)
//       //   if (index != -1)
//       //     C.push(A[i])
//       // }
//       return [{ id: 1, text: '2323' }]

//       // }


//       // return A
//     };
//   })
angular.module('my-services').service('debugService', function (config) {
  this.log = function () {
    var p1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var p2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    if (config.debug) console.log(p1, p2);
  };
});
angular.module('my-services').service('myHttpService', function ($http, loginStatusService, debugService, config, notyService) {
  return new (function () {
    function _class() {
      var _this = this;

      _classCallCheck(this, _class);

      this.config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };

      this.checkAccessToken();
      loginStatusService.scope.$on('storageChange', function (storage) {
        _this.checkAccessToken();
      });
    }

    _createClass(_class, [{
      key: 'upload',
      value: function upload(url, data) {
        var fd = new FormData();
        angular.forEach(data, function (value, key) {
          fd.append(key, value);
        });
        debugService.log("Request to: " + url + " Method: post");
        debugService.log("Data: ", data);
        var upHeader = {};
        angular.copy(this.config.headers, upHeader);
        upHeader['Content-Type'] = undefined;
        return $http.post(url, fd, {
          transformRequest: angular.identity,
          headers: upHeader
        }).then(function (res) {
          debugService.log("Response from: " + url + " Method: post");
          debugService.log("Response: ", res);
          return res.data;
        }, function (error) {
          debugService.log("Errors from: " + _url + " Method: post ");
          debugService.log("Errors: ", error);
          notyService.error("Error", "There is not connection with the server");
        });
      }
    }, {
      key: 'checkAccessToken',
      value: function checkAccessToken() {
        if (loginStatusService.isLogged()) {
          this.config.headers['Authorization'] = "Bearer " + loginStatusService.storage.access_token;
        } else {
          delete this.config.headers['Authorization'];
        }
      }
    }, {
      key: 'get',
      value: function get(url) {
        var _url = config.api_url + url;
        debugService.log("Request to: " + _url + " Method: get");
        return $http.get(_url, this.config).then(function (res) {
          debugService.log("Response from: " + _url + " Method: get ");
          debugService.log("Response: ", res.data);
          return res.data;
        }, function (error) {
          debugService.log("Errors from: " + _url + " Method: get ");
          debugService.log("Errors: ", error);
          notyService.error("Error", "There is not connection with the server");
        });
      }
    }, {
      key: 'post',
      value: function post(url, data) {
        var _url = config.api_url + url;
        debugService.log("Request to: " + _url + " Method: post ");
        debugService.log("Data: ", data);
        return $http.post(_url, data, this.config).then(function (res) {
          debugService.log("Response from: " + _url + " Method: post ");
          debugService.log("Data: ", data);
          debugService.log("Response: ", res.data);
          return res.data;
        }, function (error) {
          debugService.log("Response from: " + _url + " Method: post ");
          debugService.log("Data: ", data);
          notyService.error("Error", "There is not connection with the server");
        });
      }
    }, {
      key: 'put',
      value: function put(url, data) {
        var _url = config.api_url + url;
        debugService.log("Request to: " + _url + " Method: put ");
        debugService.log("Data: ", data);
        return $http.put(_url, data, this.config).then(function (res) {
          debugService.log("Response from: " + _url + " Method: put ");
          debugService.log("Data: ", data);
          debugService.log("Response: ", res.data);
          return res.data;
        }, function (error) {
          debugService.log("Response from: " + _url + " Method: put ");
          debugService.log("Data: ", data);
          notyService.error("Error", "There is not connection with the server");
        });
      }
    }, {
      key: 'delete',
      value: function _delete(url) {
        var _url = config.api_url + url;
        debugService.log("Request to: " + _url + " Method: delete ");
        return $http.delete(_url, this.config).then(function (res) {
          debugService.log("Response from: " + _url + " Method: delete ");
          debugService.log("Response: ", res.data);
          return res.data;
        }, function (error) {
          debugService.log("Errors from: " + _url + " Method: delete ");
          debugService.log("Errors: ", error);
          notyService.error("Error", "There is not connection with the server");
        });
      }
    }]);

    return _class;
  }())();
});
angular.module('my-services').service('notyService', function () {
  function _class3() {
    _classCallCheck(this, _class3);

    this.warning = function (title, message) {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-warning gritter-light',
        time: 2000
      });
    };

    this.info = function (title, message) {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-info gritter-light',
        time: 2000
      });
    };

    this.success = function (title, message) {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-success gritter-light',
        time: 2000
      });
    };

    this.error = function (title, message) {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-error gritter-light',
        time: 2000
      });
    };
  }

  return _class3;
}());
angular.module('my-services').service('citiesApiService', function (myHttpService) {
  return new (function (_CrudClass) {
    _inherits(_class4, _CrudClass);

    function _class4() {
      _classCallCheck(this, _class4);

      return _possibleConstructorReturn(this, (_class4.__proto__ || Object.getPrototypeOf(_class4)).call(this, myHttpService, "/cities"));
    }

    return _class4;
  }(CrudClass))();
});
angular.module('my-services').service('companiesApiService', function (myHttpService) {
  return new (function (_CrudClass2) {
    _inherits(_class5, _CrudClass2);

    function _class5() {
      _classCallCheck(this, _class5);

      return _possibleConstructorReturn(this, (_class5.__proto__ || Object.getPrototypeOf(_class5)).call(this, myHttpService, "/companies"));
    }

    return _class5;
  }(CrudClass))();
});
angular.module('my-services').service('countriesApiService', function (myHttpService) {
  return new (function (_CrudClass3) {
    _inherits(_class6, _CrudClass3);

    function _class6() {
      _classCallCheck(this, _class6);

      return _possibleConstructorReturn(this, (_class6.__proto__ || Object.getPrototypeOf(_class6)).call(this, myHttpService, "/countries"));
    }

    return _class6;
  }(CrudClass))();
});
angular.module('my-services').service('dancestylesApiService', function (myHttpService) {
  return new (function (_CrudClass4) {
    _inherits(_class7, _CrudClass4);

    function _class7() {
      _classCallCheck(this, _class7);

      return _possibleConstructorReturn(this, (_class7.__proto__ || Object.getPrototypeOf(_class7)).call(this, myHttpService, "/dancestyles"));
    }

    return _class7;
  }(CrudClass))();
});
angular.module('my-services').service('personsApiService', function (myHttpService) {
  return new (function (_CrudClass5) {
    _inherits(_class8, _CrudClass5);

    function _class8() {
      _classCallCheck(this, _class8);

      return _possibleConstructorReturn(this, (_class8.__proto__ || Object.getPrototypeOf(_class8)).call(this, myHttpService, "/persons"));
    }

    return _class8;
  }(CrudClass))();
});
angular.module('my-services').service('schoolsApiService', function (myHttpService) {
  return new (function (_CrudClass6) {
    _inherits(_class9, _CrudClass6);

    function _class9() {
      _classCallCheck(this, _class9);

      return _possibleConstructorReturn(this, (_class9.__proto__ || Object.getPrototypeOf(_class9)).call(this, myHttpService, "/schools"));
    }

    return _class9;
  }(CrudClass))();
});
angular.module('my-services').service('titlesApiService', function (myHttpService) {
  return new (function (_CrudClass7) {
    _inherits(_class10, _CrudClass7);

    function _class10() {
      _classCallCheck(this, _class10);

      return _possibleConstructorReturn(this, (_class10.__proto__ || Object.getPrototypeOf(_class10)).call(this, myHttpService, "/titles"));
    }

    return _class10;
  }(CrudClass))();
});
angular.module('my-services').service('uploadService', function (myHttpService, config) {
  return new (function () {
    function _class11() {
      _classCallCheck(this, _class11);
    }

    _createClass(_class11, [{
      key: 'upload',
      value: function upload(file) {
        return myHttpService.upload(config.api_url + "/upload", { file: file }).then(function (data) {
          return data;
        });
      }
    }]);

    return _class11;
  }())();
});
angular.module('my-services').service('venuesApiService', function (myHttpService) {
  return new (function (_CrudClass8) {
    _inherits(_class12, _CrudClass8);

    function _class12() {
      _classCallCheck(this, _class12);

      return _possibleConstructorReturn(this, (_class12.__proto__ || Object.getPrototypeOf(_class12)).call(this, myHttpService, "/venues"));
    }

    return _class12;
  }(CrudClass))();
});
angular.module('my-services').service('worksApiService', function (myHttpService) {
  return new (function (_CrudClass9) {
    _inherits(_class13, _CrudClass9);

    function _class13() {
      _classCallCheck(this, _class13);

      return _possibleConstructorReturn(this, (_class13.__proto__ || Object.getPrototypeOf(_class13)).call(this, myHttpService, "/works"));
    }

    return _class13;
  }(CrudClass))();
});
angular.module('my-services').service('authService', function (myHttpService, config, notyService, debugService) {
  return new (function () {
    function _class14() {
      _classCallCheck(this, _class14);
    }

    _createClass(_class14, [{
      key: 'login',
      value: function login(user, pass) {
        return myHttpService.post('/auth/login', { user: user, pass: pass }).then(function (res) {
          return res;
        });
      }
    }, {
      key: 'change_password',
      value: function change_password(data) {
        return myHttpService.post('/changepassword', data).then(function (res) {
          return res;
        });
      }
    }]);

    return _class14;
  }())();
});
function StorageModel() {
  this.access_token = '';
  this.user_id = '';
  this.rol = '';
  this.user = '';
}
angular.module('my-services').service('loginStatusService', function ($rootScope) {
  return new (function () {
    function _class16() {
      _classCallCheck(this, _class16);

      this.storage_key = "danceapp_02869264ksjdi234nkw";

      this.storage = new StorageModel();
      this.scope = $rootScope.$new(true);
      this.load();
      this.emitChange();
    }

    _createClass(_class16, [{
      key: 'emitChange',
      value: function emitChange() {
        this.scope.$emit('storageChange', this.storage);
      }
    }, {
      key: 'isLogged',
      value: function isLogged() {
        return this.storage.access_token != '';
      }
    }, {
      key: 'isAdmin',
      value: function isAdmin() {
        return this.isLogged() && this.storage.rol === 'admin';
      }
    }, {
      key: 'setStorage',
      value: function setStorage(value) {
        this.storage = value;
        this.save();
        this.emitChange();
      }
    }, {
      key: 'remove',
      value: function remove() {
        localStorage.removeItem(this.storage_key);
        this.storage = new StorageModel();
        this.emitChange();
      }
    }, {
      key: 'save',
      value: function save() {
        localStorage.setItem(this.storage_key, JSON.stringify(this.storage));
      }
    }, {
      key: 'load',
      value: function load() {
        var tmp = JSON.parse(localStorage.getItem(this.storage_key));

        if (tmp == null) {
          this.remove();
          return false;
        }

        this.setStorage(tmp);
      }
    }]);

    return _class16;
  }())();
});
angular.module('my-services').service('titleBarService', function () {
  function _class17($rootScope) {
    _classCallCheck(this, _class17);

    this.scope = $rootScope.$new(true);

    this.title = "titulo";
    this.description = "descripción";
    this.path = [];

    this.emitChange();
  }

  _createClass(_class17, [{
    key: 'emitChange',
    value: function emitChange() {
      this.scope.$emit('dataChange', {
        title: this.title,
        description: this.description,
        path: this.path
      });
    }
  }, {
    key: 'setTitle',
    value: function setTitle(title) {
      this.title = title;
      this.emitChange();
    }
  }, {
    key: 'setDescription',
    value: function setDescription(description) {
      this.description = description;
      this.emitChange();
    }
  }, {
    key: 'setPath',
    value: function setPath(path) {
      this.path = path;
      this.emitChange();
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      this.title = data.title;
      this.description = data.description;
      this.path = data.path;
      this.emitChange();
    }
  }, {
    key: 'addPath',
    value: function addPath(path) {
      this.path.push(path);
      this.emitChange();
    }
  }]);

  return _class17;
}());
angular.module('pages').component('usersTemplate', {
  templateUrl: 'src/templates/users.template.html',
  controller: function controller() {
    _classCallCheck(this, controller);
  }
});
angular.module('my-components').component('myFooter', {
  templateUrl: 'src/components/footer/footer.component.html',
  controller: function controller() {
    return new (function () {
      function _class19() {
        _classCallCheck(this, _class19);

        this.$onInit = function () {};
      }

      return _class19;
    }())();
  }
});
angular.module('my-components').component('myHeader', {
  templateUrl: 'src/components/header/header.component.html',
  controller: function controller(loginStatusService, $state, notyService) {
    return new (function () {
      function _class21() {
        _classCallCheck(this, _class21);

        this.$onInit = function () {};

        this.logout = function () {
          loginStatusService.remove();

          notyService.info("Bye", "Have a nice day");

          $state.go('login');
        };
      }

      return _class21;
    }())();
  }
});
angular.module('my-components').component('leftPanel', {
  templateUrl: 'src/components/left-panel/left-panel.component.html',
  controller: function controller() {
    return new (function () {
      function _class23() {
        _classCallCheck(this, _class23);

        this.$onInit = function () {
          // this.active = true
        };
      }

      return _class23;
    }())();
  }
});
angular.module('my-components').component('loadingData', {
  templateUrl: 'src/components/loading-data/loading-data.component.html',
  bindings: {
    active: "<"
  },
  controller: function controller() {
    return new (function () {
      function _class25() {
        _classCallCheck(this, _class25);

        this.$onInit = function () {};
      }

      return _class25;
    }())();
  }
});
angular.module('my-components').component('myInput', {
  templateUrl: 'src/components/my-input/my-input.component.html',
  bindings: {
    error: '=',
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    placeholder: '@',
    required: '<',
    type: '@'
  },
  controller: function controller() {
    return new (function () {
      function _class27() {
        _classCallCheck(this, _class27);

        this.$onInit = function () {};
      }

      _createClass(_class27, [{
        key: 'change',
        value: function change() {
          this.error = '';
        }
      }]);

      return _class27;
    }())();
  }
});
angular.module('my-components').component('myInputDate', {
  templateUrl: 'src/components/my-input-date/my-input-date.component.html',
  bindings: {
    error: '=',
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    required: '<'
  },
  controller: function controller($element, $scope) {
    return new (function () {
      function _class29() {
        var _this11 = this;

        _classCallCheck(this, _class29);

        this.$onInit = function () {
          var $elem = $($element).find('#datepicker');
          $elem.datepicker({
            autoclose: true,
            format: 'mm/dd/yyyy'
          });

          $elem.change(function () {
            var d = new Date($elem.val());
            _this11.model = d.getTime() / 1000;
          });
        };
      }

      return _class29;
    }())();
  }
});
angular.module('my-components').component('myInputFile', {
  templateUrl: 'src/components/my-input-file/my-input-file.component.html',
  bindings: {
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    required: '<',
    error: '<'
  },
  controller: function controller(uploadService) {
    return new (function () {
      function _class31() {
        _classCallCheck(this, _class31);

        this.$onInit = function () {};
      }

      _createClass(_class31, [{
        key: 'change',
        value: function change(target) {
          var _this12 = this;

          if (target.files.length > 0) {
            uploadService.upload(target.files[0]).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this12.model = res.data;
                  _this12.error = undefined;
                } else {
                  _this12.error = res.errors.file;
                }
              }
            });
          }
        }
      }]);

      return _class31;
    }())();
  }
});
angular.module('my-components').component('mySelect', {
  templateUrl: 'src/components/my-select/my-select.component.html',
  bindings: {
    error: '=',
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    data: '<',
    required: '<'
    // multiple: '<'
  },
  controller: function controller($element, $attrs) {
    return new (function () {
      function _class32() {
        _classCallCheck(this, _class32);
      }

      return _class32;
    }())();
  }
});
angular.module('my-components').component('myShowList', {
  templateUrl: 'src/components/my-show-list/my-show-list.component.html',
  bindings: {
    title: '@',
    data: '<',
    attr: '@'
  },
  controller: function controller($element) {
    return new (function () {
      function _class33() {
        _classCallCheck(this, _class33);
      }

      return _class33;
    }())();
  }
});
angular.module('my-components').component('myTabsPane', {
  transclude: true,
  templateUrl: 'src/components/my-tabs/my-tabs-pane.component.html',
  require: {
    tabsCtrl: '^myTabs'
  },
  bindings: {
    title: '@',
    selected: '<'
  },
  controller: function controller() {
    return new (function () {
      function _class35() {
        _classCallCheck(this, _class35);

        this.$onInit = function () {
          this.tabsCtrl.addPane(this);
          if (this.selected) {
            this.tabsCtrl.select(this);
          }
        };
      }

      return _class35;
    }())();
  }
});
angular.module('my-components').component('myTabs', {
  transclude: true,
  templateUrl: 'src/components/my-tabs/my-tabs.component.html',
  controller: function controller() {
    return new (function () {
      function _class36() {
        _classCallCheck(this, _class36);
      }

      _createClass(_class36, [{
        key: '$onInit',
        value: function $onInit() {
          this.panes = [];
        }
      }, {
        key: 'select',
        value: function select(pane) {
          angular.forEach(this.panes, function (pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
      }, {
        key: 'addPane',
        value: function addPane(pane) {
          if (this.panes.length === 0) {
            this.select(pane);
          }
          this.panes.push(pane);
        }
      }]);

      return _class36;
    }())();
  }
});
angular.module('my-components').component('myTags', {
  templateUrl: 'src/components/my-tags/my-tags.component.html',
  bindings: {
    label: '@',
    model: '='
  },
  controller: function controller() {
    return new (function () {
      function _class38() {
        var _this13 = this;

        _classCallCheck(this, _class38);

        this.$onInit = function () {
          if (_this13.model == undefined) {
            _this13.model = [];
          }
        };

        this.text = "";
      }

      _createClass(_class38, [{
        key: 'blur',
        value: function blur() {
          if (this.text.trim() !== "") {
            this.model.push(this.text);
          }
          this.text = "";
        }
      }, {
        key: 'del',
        value: function del(index) {
          this.model.splice(index, 1);
        }
      }]);

      return _class38;
    }())();
  }
});
angular.module('my-components').component('myTagsList', {
  templateUrl: 'src/components/my-tags-list/my-tags-list.component.html',
  bindings: {
    title: '@',
    model: '=',
    canEdit: '<',
    canRemove: '<',
    onChange: '&'
  },
  controller: function controller($element) {
    return new (function () {
      function _class39() {
        _classCallCheck(this, _class39);
      }

      _createClass(_class39, [{
        key: '$onInit',
        value: function $onInit() {
          if (this.model == undefined) {
            this.model = [];
          }
          this.action = "Add";
          this.text = "";
        }
      }, {
        key: 'handleEnter',
        value: function handleEnter(event) {
          var _this14 = this;

          if (event == undefined || event.key == "Enter") {
            if (event != undefined) {
              event.preventDefault();
            }

            var value = this.text.trim();
            if (value !== "") {
              if (this.canEdit && this.action === 'Edit') {
                if (this.model.findIndex(function (v, i) {
                  return _this14.editing_id != i && v == value;
                }) === -1) {
                  this.model[this.editing_id] = value;
                  this.text = '';
                  this.action = 'Add';
                }
              } else if (this.action === 'Add') {
                if (this.model.findIndex(function (v) {
                  return v == value;
                }) === -1) {
                  this.model.push(value);
                  this.text = '';
                }
              }
              this.onChange(this.model);
            }
          }
        }
      }, {
        key: 'edit',
        value: function edit(id) {
          this.action = 'Edit';
          this.text = this.model[id];
          this.editing_id = id;
        }
      }, {
        key: 'remove',
        value: function remove(id) {
          if (this.canRemove) this.model.splice(id, 1);
        }
      }]);

      return _class39;
    }())();
  }
});
angular.module('my-components').component('myTagsSelectList', {
  templateUrl: 'src/components/my-tags-select-list/my-tags-select-list.component.html',
  bindings: {
    model: '=',
    data: '<',
    onChange: '&'
  },
  controller: function controller($element) {
    return new (function () {
      function _class40() {
        _classCallCheck(this, _class40);
      }

      _createClass(_class40, [{
        key: '$onInit',
        value: function $onInit() {
          if (this.model == undefined) {
            this.model = [];
          }
          this.selected = -1;
        }
      }, {
        key: 'getText',
        value: function getText(id) {
          if (this.data) {
            var index = this.data.findIndex(function (v) {
              return v.id == id;
            });
            if (index != -1) {
              return this.data[this.data.findIndex(function (v) {
                return v.id == id;
              })].text;
            }
          }

          return "";
        }
      }, {
        key: 'add',
        value: function add() {
          var _this15 = this;

          if (this.model.findIndex(function (v) {
            return v == _this15.selected;
          }) == -1 && this.selected != -1) {
            this.model.push(this.selected);
            this.selected = -1;
            this.onChange(this.model);
          }
        }
      }, {
        key: 'remove',
        value: function remove(id) {
          this.model.splice(id, 1);
        }
      }]);

      return _class40;
    }())();
  }
});
angular.module('my-components').component('myTextarea', {
  templateUrl: 'src/components/my-textarea/my-textarea.component.html',
  bindings: {
    error: '=',
    form: '<',
    label: '@',
    name: '@',
    model: '=',
    placeholder: '@',
    required: '<',
    row: '<'
  },
  controller: function controller() {
    return new (function () {
      function _class42() {
        _classCallCheck(this, _class42);

        this.$onInit = function () {};
      }

      return _class42;
    }())();
  }
});
angular.module('my-components').component('titleBar', {
  templateUrl: 'src/components/title-bar/title-bar.component.html',
  controller: function controller(titleBarService) {
    return new (function () {
      function _class43() {
        _classCallCheck(this, _class43);

        this.title = "";
        this.description = "";
        this.path = [];

        this._event = null;
      }

      _createClass(_class43, [{
        key: '$onInit',
        value: function $onInit() {
          var _this16 = this;

          this._event = titleBarService.scope.$on('dataChange', function (event, data) {
            _this16.title = data.title;
            _this16.description = data.description;
            _this16.path = data.path;
          });
        }
      }, {
        key: '$onDestroy',
        value: function $onDestroy() {}
      }]);

      return _class43;
    }())();
  }
});
angular.module('my-components').component('leftPanelLink', {
  templateUrl: 'src/components/left-panel/left-panel-link/left-panel-link.component.html',
  bindings: {
    icon: '@',
    state: '@',
    text: '@'
  },
  controller: function controller() {
    return new (function () {
      function _class45() {
        _classCallCheck(this, _class45);

        this.$onInit = function () {
          // this.active = true
        };
      }

      return _class45;
    }())();
  }
});
angular.module('logged').component('changePasswordPage', {
  templateUrl: 'src/pages/logged/change-password/change-password.page.html',
  controller: function controller($window, notyService, config, authService, loginStatusService, $state) {
    return new (function () {
      function _class46() {
        _classCallCheck(this, _class46);
      }

      _createClass(_class46, [{
        key: '$onInit',
        value: function $onInit() {
          if (!loginStatusService.isLogged()) {
            $state.go('users.home');
          }

          this.model = {
            user: loginStatusService.storage.user,
            pass: "",
            new_pass: ""
          };
          this.errors = {};
        }
      }, {
        key: 'change_password',
        value: function change_password() {
          var _this17 = this;

          authService.change_password(this.model).then(function (res) {
            if (res) {
              if (res.status == 400) {
                _this17.errors = res.errors;
              } else {
                //quitar errores
                _this17.errors = {};

                //notificación de bienvenida
                notyService.info("Message", "The password was changed successfully");

                //cambio de estado
                $window.history.back();
              }
            }
          });
        }
      }, {
        key: 'back',
        value: function back() {
          $window.history.back();
        }
      }]);

      return _class46;
    }())();
  }
});
angular.module('logged').component('homePage', {
  templateUrl: 'src/pages/logged/home/home.page.html',
  controller: function controller($state, loginStatusService, titleBarService) {
    return new (function () {
      function _class47() {
        _classCallCheck(this, _class47);

        this.rios = "windows";
      }

      _createClass(_class47, [{
        key: '$onInit',
        value: function $onInit() {
          titleBarService.setData({
            title: "Home",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }]
          });
        }
      }]);

      return _class47;
    }())();
  }
});
angular.module('not_logged').component('loginPage', {
  templateUrl: 'src/pages/not_logged/login/login.page.html',
  controller: function controller(notyService, config, authService, loginStatusService, $state) {
    var _this18 = this;

    this.$onInit = function () {
      if (loginStatusService.isLogged()) {
        $state.go('users.home');
      }

      _this18.model = {
        user: "",
        pass: ""
      };
      _this18.errors = {};
    };

    this.login = function () {
      authService.login(_this18.model.user, _this18.model.pass).then(function (res) {
        if (res) {
          if (res.status == 400) {
            _this18.errors = res.errors;
          } else {
            //quitar errores
            _this18.errors = {};

            //guardar el estado de la app
            loginStatusService.setStorage({
              access_token: res.data.access_token,
              user_id: res.data.user_id,
              rol: res.data.rol,
              user: res.data.user
            });

            //notificación de bienvenida
            notyService.info("Bienvenido", res.data.user);

            //cambio de estado
            $state.go('users.home');
          }
        }
      });
    };
  }
});
angular.module('not_logged').component('notFoundPage', {
  templateUrl: 'src/pages/not_logged/not_found/not_found.page.html',
  controller: function controller(notyService) {}
});
angular.module('logged').component('companiesDetailsPage', {
  templateUrl: 'src/pages/logged/companies/details/companies-details.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, companiesApiService, notyService, $filter) {
    return new (function () {
      function _class48() {
        _classCallCheck(this, _class48);

        this.company = {};
        this.loading = true;
      }

      _createClass(_class48, [{
        key: '$onInit',
        value: function $onInit() {
          var _this19 = this;

          var basePath = {
            title: "Companies",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.companies',
              text: "Companies"
            }]
          };

          companiesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              if (res.status == 200) {
                _this19.company = res.data;
                basePath.path.push({
                  state: 'users.companiesDetails',
                  text: "Details " + toTitleBar(_this19.company.name)
                });
                titleBarService.setData(basePath);
                _this19.loading = false;
              } else {
                $state.go('not_found');
              }
            }
          });
        }
      }]);

      return _class48;
    }())();
  }
});
angular.module('logged').component('companiesFormPage', {
  templateUrl: 'src/pages/logged/companies/form/companies-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, companiesApiService, citiesApiService, schoolsApiService, worksApiService, dancestylesApiService, personsApiService, notyService, $filter, $q) {
    return new (function () {
      function _class49() {
        _classCallCheck(this, _class49);

        this.company = {};
        this.errors = {};
        this.action = "";
        this.loading = true;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class49, [{
        key: '$onInit',
        value: function $onInit() {
          var _this20 = this;

          var promises = [];
          promises[promises.push(citiesApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this20.cities = res.data.map(function (v) {
                return { id: v.id, text: v.name + ', ' + v.country };
              });
            }
          });
          promises[promises.push(dancestylesApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this20.dance_styles = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });
          promises[promises.push(schoolsApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this20.schools = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });
          promises[promises.push(personsApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this20.persons = res.data.map(function (v) {
                return { id: v.id, text: v.first_name + v.last_name };
              });
            }
          });
          promises[promises.push(worksApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this20.works = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });

          console.log("asd");
          var basePath = {
            title: "Companies",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.companies',
              text: "Companies"
            }]
          };
          if ($stateParams.id != undefined) {
            this.action = "Edit";
            promises[promises.push(companiesApiService.get($stateParams.id)) - 1].then(function (res) {
              if (res) {
                if (res.status == 200) {
                  res.data._dance_styles = res.data._dance_styles.map(function (v) {
                    return v.id;
                  });
                  res.data._persons = res.data._persons.map(function (v) {
                    return v.id;
                  });
                  res.data._works = res.data._works.map(function (v) {
                    return v.id;
                  });
                  res.data._schools = res.data._schools.map(function (v) {
                    return v.id;
                  });
                  res.data._city = res.data._city.id;
                  _this20.company = res.data;
                  _this20.company._websites = _this20.company._websites.map(function (v) {
                    return v.url;
                  });
                  basePath.path.push({
                    state: 'users.companiesEdit',
                    text: "Edit " + toTitleBar(_this20.company.name)
                  });
                  titleBarService.setData(basePath);
                } else {
                  $state.go('not_found');
                }
              }
            });
          } else {
            // this.company.date_born = new Date(1548201600 * 1000)
            this.action = "Add";
            basePath.path.push({
              state: 'users.companiesAdd',
              text: "Add"
            });
            titleBarService.setData(basePath);
          }

          $q.all([promises]).then(function () {
            _this20.loading = false;
          });
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this21 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            companiesApiService.edit($stateParams.id, this.company).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  notyService.success('Message', 'The person was edited successfully');
                  _this21.ok = true;
                  $state.go('users.companies');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this21.errors = res.errors;
                _this21.submitting = false;
              }
            });
          } else {
            companiesApiService.add(this.company).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this21.ok = true;
                  notyService.success('Message', 'The person was added successfully');
                  $state.go('users.companies');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this21.errors = res.errors;
                _this21.submitting = false;
              }
            });
          }
        }
      }]);

      return _class49;
    }())();
  }
});
angular.module('logged').component('companiesListPage', {
  templateUrl: 'src/pages/logged/companies/list/companies-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, companiesApiService, notyService) {
    return new (function () {
      function _class50() {
        _classCallCheck(this, _class50);

        this.companies = [];
        this.loading = true;
      }

      _createClass(_class50, [{
        key: '$onInit',
        value: function $onInit() {
          var _this22 = this;

          titleBarService.setData({
            title: "Companies",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.companies',
              text: "Companies"
            }]
          });

          companiesApiService.list().then(function (res) {
            if (res) {
              _this22.companies = res.data;
              _this22.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this23 = this;

          companiesApiService.remove(this.companies[index].id).then(function (data) {
            if (data) {
              _this23.companies.splice(index, 1);
              notyService.success('Message', 'The company was removes successfully');
            } else {
              notyService.erorr('Message', 'Otros datos están relacionados a esta compañía');
            }
          });
        }
      }]);

      return _class50;
    }())();
  }
});
angular.module('logged').component('countriesDetailsPage', {
  templateUrl: 'src/pages/logged/countries/details/countries-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, countriesApiService) {
    return new (function () {
      function _class51() {
        _classCallCheck(this, _class51);

        this.country = {};
        this.action = "";
        this.loading = true;
      }

      _createClass(_class51, [{
        key: '$onInit',
        value: function $onInit() {
          var _this24 = this;

          countriesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              _this24.country = res.data;
              titleBarService.setData({
                title: "Countries",
                description: "a description",
                path: [{
                  state: 'users.home',
                  text: "Home",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.countries',
                  text: "Countries"
                }, {
                  state: 'users.countriesDetails',
                  text: _this24.country.name
                }]
              });
              _this24.loading = false;
            }
          });
        }
      }]);

      return _class51;
    }())();
  }
});
angular.module('logged').component('countriesListPage', {
  templateUrl: 'src/pages/logged/countries/list/countries-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, countriesApiService, notyService) {
    return new (function () {
      function _class52() {
        _classCallCheck(this, _class52);

        this.countries = [];
        this.loading = true;
      }

      _createClass(_class52, [{
        key: '$onInit',
        value: function $onInit() {
          var _this25 = this;

          titleBarService.setData({
            title: "Countries",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.countries',
              text: "Countries"
            }]
          });

          countriesApiService.list().then(function (res) {
            if (res) {
              _this25.countries = res.data;
              _this25.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this26 = this;

          countriesApiService.remove(this.countries[index].id).then(function (data) {
            if (data) {
              _this26.countries.splice(index, 1);
              notyService.success('Message', 'The country was successfully removed');
            } else {
              notyService.erorr('Message', 'Other data depends from this country');
            }
          });
        }
      }]);

      return _class52;
    }())();
  }
});
angular.module('logged').component('countriesFormPage', {
  templateUrl: 'src/pages/logged/countries/form/countries-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, countriesApiService, notyService) {
    return new (function () {
      function _class53() {
        _classCallCheck(this, _class53);

        this.country = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class53, [{
        key: '$onInit',
        value: function $onInit() {
          var _this27 = this;

          var basePath = {
            title: "Countries",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.countries',
              text: "Countries"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Edit";
            this.loading = true;
            countriesApiService.get($stateParams.id).then(function (res) {
              if (res) {
                _this27.country = res.data;
                basePath.path.push({
                  state: 'users.countriesEdit',
                  text: "Edit " + toTitleBar(_this27.country.name)
                });
                titleBarService.setData(basePath);
                _this27.loading = false;
              }
            });
          } else {
            this.action = "Add";
            basePath.path.push({
              state: 'users.countriesAdd',
              text: "Add"
            });
            titleBarService.setData(basePath);
          }
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this28 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            countriesApiService.edit($stateParams.id, this.country).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this28.ok = true;
                  notyService.success('Message', 'The country was successfully edited');
                  $state.go('users.countries');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this28.errors = res.errors;
                _this28.submitting = false;
              }
            });
          } else {
            countriesApiService.add(this.country).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this28.ok = true;
                  notyService.success('Message', 'The country was successfully added');
                  $state.go('users.countries');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this28.errors = res.errors;
                _this28.submitting = false;
              }
            });
          }
        }
      }]);

      return _class53;
    }())();
  }
});
angular.module('logged').component('dancestylesDetailsPage', {
  templateUrl: 'src/pages/logged/dancestyles/details/dancestyles-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, dancestylesApiService) {
    return new (function () {
      function _class54() {
        _classCallCheck(this, _class54);

        this.dancestyle = {};
        this.action = "";
        this.loading = true;
      }

      _createClass(_class54, [{
        key: '$onInit',
        value: function $onInit() {
          var _this29 = this;

          dancestylesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              _this29.dancestyle = res.data;
              titleBarService.setData({
                title: "Dance styles",
                description: "a description",
                path: [{
                  state: 'users.home',
                  text: "Home",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.dancestyles',
                  text: "Dance styles"
                }, {
                  state: 'users.dancestylesDetails',
                  text: _this29.dancestyle.name
                }]
              });
              _this29.loading = false;
            }
          });
        }
      }]);

      return _class54;
    }())();
  }
});
angular.module('logged').component('dancestylesFormPage', {
  templateUrl: 'src/pages/logged/dancestyles/form/dancestyles-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, dancestylesApiService, notyService) {
    return new (function () {
      function _class55() {
        _classCallCheck(this, _class55);

        this.dancestyle = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class55, [{
        key: '$onInit',
        value: function $onInit() {
          var _this30 = this;

          var basePath = {
            dancestyle: "Dance styles",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.dancestyles',
              text: "Dance styles"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Edit";
            this.loading = true;
            dancestylesApiService.get($stateParams.id).then(function (res) {
              if (res) {
                _this30.dancestyle = res.data;
                basePath.path.push({
                  state: 'users.dancestylesEdit',
                  text: "Edit " + toTitleBar(_this30.dancestyle.name)
                });
                titleBarService.setData(basePath);
                _this30.loading = false;
              }
            });
          } else {
            this.action = "Add";
            basePath.path.push({
              state: 'users.dancestylesAdd',
              text: "Add"
            });
            titleBarService.setData(basePath);
          }
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this31 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            dancestylesApiService.edit($stateParams.id, this.dancestyle).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this31.ok = true;
                  notyService.success('Message', 'The dance style was successfully edited');
                  $state.go('users.dancestyles');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this31.errors = res.errors;
                _this31.submitting = false;
              }
            });
          } else {
            dancestylesApiService.add(this.dancestyle).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this31.ok = true;
                  notyService.success('Message', 'The dance style was successfully added');
                  $state.go('users.dancestyles');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this31.errors = res.errors;
                _this31.submitting = false;
              }
            });
          }
        }
      }]);

      return _class55;
    }())();
  }
});
angular.module('logged').component('dancestylesListPage', {
  templateUrl: 'src/pages/logged/dancestyles/list/dancestyles-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, dancestylesApiService, notyService) {
    return new (function () {
      function _class56() {
        _classCallCheck(this, _class56);

        this.dancestyles = [];
        this.loading = true;
      }

      _createClass(_class56, [{
        key: '$onInit',
        value: function $onInit() {
          var _this32 = this;

          titleBarService.setData({
            title: "Dance styles",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.dancestyles',
              text: "Dance styles"
            }]
          });

          dancestylesApiService.list().then(function (res) {
            if (res) {
              _this32.dancestyles = res.data;
              _this32.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this33 = this;

          dancestylesApiService.remove(this.dancestyles[index].id).then(function (data) {
            if (data) {
              _this33.dancestyles.splice(index, 1);
              notyService.success('Message', 'The dance style was successfully removed');
            } else {
              notyService.erorr('Message', 'Other data depends from this dance style');
            }
          });
        }
      }]);

      return _class56;
    }())();
  }
});
angular.module('logged').component('personsDetailsPage', {
  templateUrl: 'src/pages/logged/persons/details/persons-details.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, personsApiService, notyService, $filter) {
    return new (function () {
      function _class57() {
        _classCallCheck(this, _class57);

        this.person = {};
        this.loading = true;
      }

      _createClass(_class57, [{
        key: '$onInit',
        value: function $onInit() {
          var _this34 = this;

          var basePath = {
            title: "Persons",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.persons',
              text: "Persons"
            }]
          };

          personsApiService.get($stateParams.id).then(function (res) {
            if (res) {
              if (res.status == 200) {
                _this34.person = res.data;
                basePath.path.push({
                  state: 'users.personsDetails',
                  text: "Details " + toTitleBar(_this34.person.first_name)
                });
                titleBarService.setData(basePath);
                _this34.loading = false;
              } else {
                $state.go('not_found');
              }
            }
          });
        }
      }]);

      return _class57;
    }())();
  }
});
angular.module('logged').component('personsFormPage', {
  templateUrl: 'src/pages/logged/persons/form/persons-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, personsApiService, citiesApiService, titlesApiService, dancestylesApiService, venuesApiService, notyService, $filter) {
    return new (function () {
      function _class58() {
        _classCallCheck(this, _class58);

        this.person = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class58, [{
        key: '$onInit',
        value: function $onInit() {
          var _this35 = this;

          venuesApiService.list().then(function (res) {
            if (res && res.status == 200) {
              _this35.venues = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });
          titlesApiService.list().then(function (res) {
            if (res && res.status == 200) {
              _this35.titles = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });
          dancestylesApiService.list().then(function (res) {
            if (res && res.status == 200) {
              _this35.dance_styles = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });

          var basePath = {
            title: "Persons",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.persons',
              text: "Persons"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Edit";
            this.loading = true;
            personsApiService.get($stateParams.id).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  citiesApiService.list().then(function (res) {
                    if (res && res.status == 200) {
                      _this35.cities = res.data.map(function (v) {
                        return { id: v.id, text: v.name + ", " + v.country };
                      });
                    }
                  });
                  res.data._titles = res.data._titles.map(function (v) {
                    return v.id;
                  });
                  res.data._dance_styles = res.data._dance_styles.map(function (v) {
                    return v.id;
                  });
                  res.data._venues = res.data._venues.map(function (v) {
                    return v.id;
                  });
                  res.data._city = res.data._city.id;
                  _this35.person = res.data;
                  _this35.person._websites = _this35.person._websites.map(function (v) {
                    return v.url;
                  });
                  basePath.path.push({
                    state: 'users.personsEdit',
                    text: "Edit " + toTitleBar(_this35.person.first_name)
                  });
                  titleBarService.setData(basePath);
                  _this35.loading = false;
                } else {
                  $state.go('not_found');
                }
              }
            });
          } else {
            // this.person.date_born = new Date(1548201600 * 1000)
            this.action = "Add";
            basePath.path.push({
              state: 'users.personsAdd',
              text: "Add"
            });
            titleBarService.setData(basePath);
          }
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this36 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            personsApiService.edit($stateParams.id, this.person).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  notyService.success('Message', 'The person was successfully edited');
                  _this36.ok = true;
                  $state.go('users.persons');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this36.errors = res.errors;
                _this36.submitting = false;
              }
            });
          } else {
            personsApiService.add(this.person).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this36.ok = true;
                  notyService.success('Message', 'The person was successfully added');
                  $state.go('users.persons');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this36.errors = res.errors;
                _this36.submitting = false;
              }
            });
          }
        }
      }]);

      return _class58;
    }())();
  }
});
angular.module('logged').component('personsListPage', {
  templateUrl: 'src/pages/logged/persons/list/persons-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, personsApiService, notyService) {
    return new (function () {
      function _class59() {
        _classCallCheck(this, _class59);

        this.persons = [];
        this.loading = true;
      }

      _createClass(_class59, [{
        key: '$onInit',
        value: function $onInit() {
          var _this37 = this;

          titleBarService.setData({
            title: "Persons",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.persons',
              text: "Persons"
            }]
          });

          personsApiService.list().then(function (res) {
            if (res) {
              _this37.persons = res.data;
              _this37.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this38 = this;

          personsApiService.remove(this.persons[index].id).then(function (data) {
            if (data) {
              _this38.persons.splice(index, 1);
              notyService.success('Message', 'La persona se eliminó correctamente');
            } else {
              notyService.erorr('Message', 'Otros datos están relacionado a esta persona');
            }
          });
        }
      }]);

      return _class59;
    }())();
  }
});
angular.module('logged').component('schoolsListPage', {
  templateUrl: 'src/pages/logged/schools/list/schools-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, schoolsApiService, notyService) {
    return new (function () {
      function _class60() {
        _classCallCheck(this, _class60);

        this.schools = [];
        this.loading = true;
      }

      _createClass(_class60, [{
        key: '$onInit',
        value: function $onInit() {
          var _this39 = this;

          titleBarService.setData({
            title: "Schools",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.schools',
              text: "Schools"
            }]
          });

          schoolsApiService.list().then(function (res) {
            if (res) {
              _this39.schools = res.data;
              _this39.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this40 = this;

          schoolsApiService.remove(this.schools[index].id).then(function (data) {
            if (data) {
              _this40.schools.splice(index, 1);
              notyService.success('Message', 'The school was successfully removed');
            } else {
              notyService.erorr('Message', 'Other data depends from this school');
            }
          });
        }
      }]);

      return _class60;
    }())();
  }
});
angular.module('logged').component('schoolsDetailsPage', {
  templateUrl: 'src/pages/logged/schools/details/schools-details.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, schoolsApiService, notyService, $filter) {
    return new (function () {
      function _class61() {
        _classCallCheck(this, _class61);

        this.school = {};
        this.loading = true;
      }

      _createClass(_class61, [{
        key: '$onInit',
        value: function $onInit() {
          var _this41 = this;

          var basePath = {
            title: "Schools",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.schools',
              text: "Schools"
            }]
          };

          schoolsApiService.get($stateParams.id).then(function (res) {
            if (res) {
              if (res.status == 200) {
                _this41.school = res.data;
                basePath.path.push({
                  state: 'users.schoolsDetails',
                  text: "Details " + toTitleBar(_this41.school.name)
                });
                titleBarService.setData(basePath);
                _this41.loading = false;
              } else {
                $state.go('not_found');
              }
            }
          });
        }
      }]);

      return _class61;
    }())();
  }
});
angular.module('logged').component('schoolsFormPage', {
  templateUrl: 'src/pages/logged/schools/form/schools-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, schoolsApiService, citiesApiService, dancestylesApiService, personsApiService, notyService, $filter, $q) {
    return new (function () {
      function _class62() {
        _classCallCheck(this, _class62);

        this.school = {};
        this.errors = {};
        this.action = "";
        this.loading = true;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class62, [{
        key: '$onInit',
        value: function $onInit() {
          var _this42 = this;

          var promises = [];
          promises[promises.push(citiesApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this42.cities = res.data.map(function (v) {
                return { id: v.id, text: v.name + ", " + v.country };
              });
            }
          });
          promises[promises.push(personsApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this42.persons = res.data.map(function (v) {
                return { id: v.id, text: v.first_name + " " + v.last_name };
              });
            }
          });
          promises[promises.push(dancestylesApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this42.dance_styles = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });

          var basePath = {
            title: "Schools",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.schools',
              text: "Schools"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Edit";
            promises[promises.push(schoolsApiService.get($stateParams.id)) - 1].then(function (res) {
              if (res) {
                if (res.status == 200) {
                  res.data._dance_styles = res.data._dance_styles.map(function (v) {
                    return v.id;
                  });
                  res.data._persons = res.data._persons.map(function (v) {
                    return v.id;
                  });
                  res.data._city = res.data._city.id;
                  res.data._websites = res.data._websites.map(function (v) {
                    return v.url;
                  });
                  _this42.school = res.data;
                  basePath.path.push({
                    state: 'users.schoolsEdit',
                    text: "Edit " + toTitleBar(_this42.school.name)
                  });
                  titleBarService.setData(basePath);
                } else {
                  $state.go('not_found');
                }
              }
            });
          } else {
            // this.school.date_born = new Date(1548201600 * 1000)
            this.action = "Add";
            basePath.path.push({
              state: 'users.schoolsAdd',
              text: "Add"
            });
            titleBarService.setData(basePath);
          }

          $q.all(promises).then(function () {
            _this42.loading = false;
          });
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this43 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            schoolsApiService.edit($stateParams.id, this.school).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  notyService.success('Message', 'The school was successfully edited');
                  _this43.ok = true;
                  $state.go('users.schools');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this43.errors = res.errors;
                _this43.submitting = false;
              }
            });
          } else {
            schoolsApiService.add(this.school).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this43.ok = true;
                  notyService.success('Message', 'The school was successfully added');
                  $state.go('users.schools');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this43.errors = res.errors;
                _this43.submitting = false;
              }
            });
          }
        }
      }]);

      return _class62;
    }())();
  }
});
angular.module('logged').component('titlesDetailsPage', {
  templateUrl: 'src/pages/logged/titles/details/titles-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, titlesApiService) {
    return new (function () {
      function _class63() {
        _classCallCheck(this, _class63);

        this.title = {};
        this.action = "";
        this.loading = true;
      }

      _createClass(_class63, [{
        key: '$onInit',
        value: function $onInit() {
          var _this44 = this;

          titlesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              _this44.title = res.data;
              titleBarService.setData({
                title: "Titles",
                description: "a description",
                path: [{
                  state: 'users.home',
                  text: "Home",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.titles',
                  text: "Titles"
                }, {
                  state: 'users.titlesDetails',
                  text: _this44.title.name
                }]
              });
              _this44.loading = false;
            }
          });
        }
      }]);

      return _class63;
    }())();
  }
});
angular.module('logged').component('titlesFormPage', {
  templateUrl: 'src/pages/logged/titles/form/titles-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, titlesApiService, notyService) {
    return new (function () {
      function _class64() {
        _classCallCheck(this, _class64);

        this.title = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class64, [{
        key: '$onInit',
        value: function $onInit() {
          var _this45 = this;

          var basePath = {
            title: "Titles",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.titles',
              text: "Titles"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Edit";
            this.loading = true;
            titlesApiService.get($stateParams.id).then(function (res) {
              if (res) {
                _this45.title = res.data;
                basePath.path.push({
                  state: 'users.titlesEdit',
                  text: "Edit " + toTitleBar(_this45.title.name)
                });
                titleBarService.setData(basePath);
                _this45.loading = false;
              }
            });
          } else {
            this.action = "Add";
            basePath.path.push({
              state: 'users.titlesAdd',
              text: "Add"
            });
            titleBarService.setData(basePath);
          }
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this46 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            titlesApiService.edit($stateParams.id, this.title).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this46.ok = true;
                  notyService.success('Message', 'The title was successfully edited');
                  $state.go('users.titles');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this46.errors = res.errors;
                _this46.submitting = false;
              }
            });
          } else {
            titlesApiService.add(this.title).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this46.ok = true;
                  notyService.success('Message', 'The title was successfully added');
                  $state.go('users.titles');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this46.errors = res.errors;
                _this46.submitting = false;
              }
            });
          }
        }
      }]);

      return _class64;
    }())();
  }
});
angular.module('logged').component('titlesListPage', {
  templateUrl: 'src/pages/logged/titles/list/titles-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, titlesApiService, notyService) {
    return new (function () {
      function _class65() {
        _classCallCheck(this, _class65);

        this.titles = [];
        this.loading = true;
      }

      _createClass(_class65, [{
        key: '$onInit',
        value: function $onInit() {
          var _this47 = this;

          titleBarService.setData({
            title: "Titles",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.titles',
              text: "Titles"
            }]
          });

          titlesApiService.list().then(function (res) {
            if (res) {
              _this47.titles = res.data;
              _this47.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this48 = this;

          titlesApiService.remove(this.titles[index].id).then(function (data) {
            if (data) {
              _this48.titles.splice(index, 1);
              notyService.success('Message', 'The title was successfully removed');
            } else {
              notyService.erorr('Message', 'Other data depends from this title');
            }
          });
        }
      }]);

      return _class65;
    }())();
  }
});
angular.module('logged').component('venuesDetailsPage', {
  templateUrl: 'src/pages/logged/venues/details/venues-details.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, venuesApiService, notyService, $filter) {
    return new (function () {
      function _class66() {
        _classCallCheck(this, _class66);

        this.venue = {};
        this.loading = true;
      }

      _createClass(_class66, [{
        key: '$onInit',
        value: function $onInit() {
          var _this49 = this;

          var basePath = {
            title: "Venues",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.venues',
              text: "Venues"
            }]
          };

          venuesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              if (res.status == 200) {
                _this49.venue = res.data;
                basePath.path.push({
                  state: 'users.venuesDetails',
                  text: "Details " + toTitleBar(_this49.venue.name)
                });
                titleBarService.setData(basePath);
                _this49.loading = false;
              } else {
                $state.go('not_found');
              }
            }
          });
        }
      }]);

      return _class66;
    }())();
  }
});
angular.module('logged').component('venuesFormPage', {
  templateUrl: 'src/pages/logged/venues/form/venues-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, venuesApiService, citiesApiService, titlesApiService, dancestylesApiService, notyService, $filter, $q) {
    return new (function () {
      function _class67() {
        _classCallCheck(this, _class67);

        this.venue = {};
        this.errors = {};
        this.action = "";
        this.loading = true;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class67, [{
        key: '$onInit',
        value: function $onInit() {
          var _this50 = this;

          var promises = [];
          promises[promises.push(citiesApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this50.cities = res.data.map(function (v) {
                return { id: v.id, text: v.name + ", " + v.country };
              });
            }
          });

          var basePath = {
            title: "Venues",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.venues',
              text: "Venues"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Edit";
            promises[promises.push(venuesApiService.get($stateParams.id)) - 1].then(function (res) {
              if (res) {
                if (res.status == 200) {
                  res.data._city = res.data._city.id;
                  _this50.venue = res.data;
                  _this50.venue._websites = _this50.venue._websites.map(function (v) {
                    return v.url;
                  });
                  basePath.path.push({
                    state: 'users.venuesEdit',
                    text: "Edit " + toTitleBar(_this50.venue.name)
                  });
                  titleBarService.setData(basePath);
                } else {
                  $state.go('not_found');
                }
              }
            });
          } else {
            this.action = "Add";
            basePath.path.push({
              state: 'users.venuesAdd',
              text: "Add"
            });
            titleBarService.setData(basePath);
          }

          $q.all(promises).then(function () {
            _this50.loading = false;
          });
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this51 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            venuesApiService.edit($stateParams.id, this.venue).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  notyService.success('Message', 'The venue was successfully edited');
                  _this51.ok = true;
                  $state.go('users.venues');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this51.errors = res.errors;
                _this51.submitting = false;
              }
            });
          } else {
            venuesApiService.add(this.venue).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this51.ok = true;
                  notyService.success('Message', 'The venue was successfully added');
                  $state.go('users.venues');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this51.errors = res.errors;
                _this51.submitting = false;
              }
            });
          }
        }
      }]);

      return _class67;
    }())();
  }
});
angular.module('logged').component('venuesListPage', {
  templateUrl: 'src/pages/logged/venues/list/venues-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, venuesApiService, notyService) {
    return new (function () {
      function _class68() {
        _classCallCheck(this, _class68);

        this.venues = [];
        this.loading = true;
      }

      _createClass(_class68, [{
        key: '$onInit',
        value: function $onInit() {
          var _this52 = this;

          titleBarService.setData({
            title: "Venues",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.venues',
              text: "Venues"
            }]
          });

          venuesApiService.list().then(function (res) {
            if (res) {
              _this52.venues = res.data;
              _this52.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this53 = this;

          venuesApiService.remove(this.venues[index].id).then(function (data) {
            if (data) {
              _this53.venues.splice(index, 1);
              notyService.success('Message', 'The venue was successfully removed');
            } else {
              notyService.erorr('Message', 'Other data depends from this venue');
            }
          });
        }
      }]);

      return _class68;
    }())();
  }
});
angular.module('logged').component('worksDetailsPage', {
  templateUrl: 'src/pages/logged/works/details/works-details.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, worksApiService, notyService, $filter) {
    return new (function () {
      function _class69() {
        _classCallCheck(this, _class69);

        this.work = {};
        this.loading = true;
      }

      _createClass(_class69, [{
        key: '$onInit',
        value: function $onInit() {
          var _this54 = this;

          var basePath = {
            title: "Works",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.works',
              text: "Works"
            }]
          };

          worksApiService.get($stateParams.id).then(function (res) {
            if (res) {
              if (res.status == 200) {
                _this54.work = res.data;
                basePath.path.push({
                  state: 'users.worksDetails',
                  text: "Details " + toTitleBar(_this54.work.name)
                });
                titleBarService.setData(basePath);
                _this54.loading = false;
              } else {
                $state.go('not_found');
              }
            }
          });
        }
      }]);

      return _class69;
    }())();
  }
});
angular.module('logged').component('worksFormPage', {
  templateUrl: 'src/pages/logged/works/form/works-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, worksApiService, dancestylesApiService, companiesApiService, venuesApiService, personsApiService, notyService, $filter) {
    return new (function () {
      function _class70() {
        _classCallCheck(this, _class70);

        this.work = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class70, [{
        key: '$onInit',
        value: function $onInit() {
          var _this55 = this;

          var promises = [];
          promises[promises.push(venuesApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this55.venues = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });
          promises[promises.push(companiesApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this55.companies = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });
          promises[promises.push(personsApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this55.persons = res.data.map(function (v) {
                return { id: v.id, text: v.first_name + v.last_name };
              });
            }
          });
          promises[promises.push(dancestylesApiService.list()) - 1].then(function (res) {
            if (res && res.status == 200) {
              _this55.dance_styles = res.data.map(function (v) {
                return { id: v.id, text: v.name };
              });
            }
          });

          var basePath = {
            title: "Works",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.works',
              text: "Works"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Edit";
            promises[promises.push(worksApiService.get($stateParams.id)) - 1].then(function (res) {
              if (res) {
                if (res.status == 200) {
                  res.data._dance_styles = res.data._dance_styles.map(function (v) {
                    return v.id;
                  });
                  res.data._persons = res.data._persons.map(function (v) {
                    return v.id;
                  });
                  res.data._premiere_company = res.data._premiere_company.id;
                  res.data._premiere_venue = res.data._premiere_venue.id;
                  _this55.work = res.data;
                  basePath.path.push({
                    state: 'users.worksEdit',
                    text: "Edit " + toTitleBar(_this55.work.name)
                  });
                  titleBarService.setData(basePath);
                } else {
                  $state.go('not_found');
                }
              }
            });
          } else {
            this.action = "Add";
            basePath.path.push({
              state: 'users.worksAdd',
              text: "Add"
            });
            titleBarService.setData(basePath);
          }

          $q.all(promises).then(function () {
            _this55.loading = false;
          });
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this56 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            worksApiService.edit($stateParams.id, this.work).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  notyService.success('Message', 'The work was successfully edited');
                  _this56.ok = true;
                  $state.go('users.works');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this56.errors = res.errors;
                _this56.submitting = false;
              }
            });
          } else {
            worksApiService.add(this.work).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this56.ok = true;
                  notyService.success('Message', 'The work was successfully added');
                  $state.go('users.works');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this56.errors = res.errors;
                _this56.submitting = false;
              }
            });
          }
        }
      }]);

      return _class70;
    }())();
  }
});
angular.module('logged').component('worksListPage', {
  templateUrl: 'src/pages/logged/works/list/works-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, worksApiService, notyService) {
    return new (function () {
      function _class71() {
        _classCallCheck(this, _class71);

        this.works = [];
        this.loading = true;
      }

      _createClass(_class71, [{
        key: '$onInit',
        value: function $onInit() {
          var _this57 = this;

          titleBarService.setData({
            title: "Works",
            description: "a description",
            path: [{
              state: 'users.home',
              text: "Home",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.works',
              text: "Works"
            }]
          });

          worksApiService.list().then(function (res) {
            if (res) {
              _this57.works = res.data;
              _this57.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this58 = this;

          worksApiService.remove(this.works[index].id).then(function (data) {
            if (data) {
              _this58.works.splice(index, 1);
              notyService.success('Message', 'The work was successfully removed');
            } else {
              notyService.erorr('Message', 'Other data depends from this work');
            }
          });
        }
      }]);

      return _class71;
    }())();
  }
});
angular.module('logged').component('citiesDetailsPage', {
  templateUrl: 'src/pages/logged/countries/cities/details/cities-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, citiesApiService, countriesApiService) {
    return new (function () {
      function _class72() {
        _classCallCheck(this, _class72);

        this.loading = true;
        this.city = {};
      }

      _createClass(_class72, [{
        key: '$onInit',
        value: function $onInit() {
          var _this59 = this;

          countriesApiService.get($stateParams.country_id).then(function (res) {
            if (res) {
              _this59.country = res.data;

              citiesApiService.get($stateParams.id).then(function (res) {
                if (res) {
                  _this59.city = res.data;
                  _this59.loading = false;

                  titleBarService.setData({
                    title: "Cities",
                    description: "a description",
                    path: [{
                      state: 'users.home',
                      text: "Home",
                      icon: true,
                      icon_class: 'fa-home'
                    }, {
                      state: 'users.countries',
                      text: "Countries"
                    }, {
                      state: '',
                      text: toTitleBar(_this59.country.name)
                    }, {
                      state: 'users.cities({country_id: ' + _this59.country.id + '})',
                      text: "Cities"
                    }, {
                      state: 'users.citiesDetails',
                      text: toTitleBar(_this59.city.name)
                    }]
                  });
                }
              });
            }
          });
        }
      }]);

      return _class72;
    }())();
  }
});
angular.module('logged').component('citiesFormPage', {
  templateUrl: 'src/pages/logged/countries/cities/form/cities-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, countriesApiService, citiesApiService, notyService) {
    return new (function () {
      function _class73() {
        _classCallCheck(this, _class73);

        this.city = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class73, [{
        key: '$onInit',
        value: function $onInit() {
          var _this60 = this;

          countriesApiService.get($stateParams.country_id).then(function (res) {
            if (res) {
              _this60.country = res.data;
              _this60.city._country = _this60.country.id;
              titleBarService.setData({
                title: "Cities",
                description: "a description",
                path: [{
                  state: 'users.home',
                  text: "Home",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.countries',
                  text: "Countries"
                }, {
                  state: '',
                  text: toTitleBar(_this60.country.name)
                }, {
                  state: 'users.cities' + "({country_id: " + _this60.country.id + "})",
                  text: "Cities"
                }]
              });

              if ($stateParams.id != undefined) {
                _this60.action = "Edit";
                _this60.loading = true;
                citiesApiService.get($stateParams.id, "?country_id=" + _this60.country.id).then(function (res) {
                  if (res) {
                    if (res.status == 200) {
                      _this60.city = res.data;
                      _this60.city._country = _this60.country.id;
                      _this60.loading = false;
                      titleBarService.addPath({
                        state: 'users.citiesEdit',
                        text: "Edit " + toTitleBar(_this60.city.name)
                      });
                    }
                  }
                });
              } else {
                _this60.action = "Add";
                titleBarService.addPath({
                  state: 'users.citiesAdd',
                  text: "Add "
                });
              }
            }
          });
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this61 = this;

          this.submitting = true;
          if (this.action == "Edit") {
            citiesApiService.edit($stateParams.id, this.city).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this61.ok = true;
                  notyService.success('Message', 'The city was successfully edited');
                  $state.go("users.cities", { country_id: _this61.country.id });
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this61.errors = res.errors;
                _this61.submitting = false;
              }
            });
          } else {
            citiesApiService.add(this.city).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this61.ok = true;
                  notyService.success('Message', 'The city was addes successfully');
                  $state.go("users.cities", { country_id: _this61.country.id });
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this61.errors = res.errors;
                _this61.submitting = false;
              }
            });
          }
        }
      }]);

      return _class73;
    }())();
  }
});
angular.module('logged').component('citiesListPage', {
  templateUrl: 'src/pages/logged/countries/cities/list/cities-list.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, citiesApiService, countriesApiService, notyService) {
    return new (function () {
      function _class74() {
        _classCallCheck(this, _class74);

        this.cities = [];
        this.loading = true;
        this.country = {};
      }

      _createClass(_class74, [{
        key: '$onInit',
        value: function $onInit() {
          var _this62 = this;

          console.log($state);
          countriesApiService.get($stateParams.country_id).then(function (res) {

            if (res) {
              _this62.country = res.data;
              titleBarService.setData({
                title: "Cities",
                description: "a description",
                path: [{
                  state: 'users.home',
                  text: "Home",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.countries',
                  text: "Countries"
                }, {
                  state: '',
                  text: toTitleBar(_this62.country.name)
                }, {
                  state: 'users.cities',
                  text: "Cities"
                }]
              });

              citiesApiService.list("?country_id=" + _this62.country.id).then(function (res) {
                if (res) {
                  _this62.cities = res.data;
                  _this62.loading = false;
                }
              });
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this63 = this;

          citiesApiService.remove(this.cities[index].id).then(function (data) {
            if (data) {
              _this63.cities.splice(index, 1);
              notyService.success('Message', 'The city was removed successfully');
            } else {
              notyService.erorr('Message', 'Other data depends from this city');
            }
          });
        }
      }]);

      return _class74;
    }())();
  }
});