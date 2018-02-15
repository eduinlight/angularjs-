'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('dance', [
//CORE

//TERCEROS
'ui.router',
//MIOS
'my-components', 'my-services', 'my-pipes', 'my-directives', 'pages']).run(['$state', function ($state) {
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
  api_url: "http://localhost/dance/api",
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
angular.module('pages', ['not_logged', 'logged']);
angular.module('my-pipes', []);
angular.module('my-services', []);
angular.module('logged', ['titles', 'dancestyles', 'countries', 'companies', 'persons', 'works', 'schools', 'places']).config(function ($stateProvider, $urlServiceProvider) {
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
  // $stateProvider.state('users.companiesAdd', {
  //   url: '/companies/add',
  //   component: 'companiesFormPage'
  // })
  // $stateProvider.state('users.companiesEdit', {
  //   url: '/companies/edit/:id',
  //   component: 'companiesFormPage'
  // })
  // $stateProvider.state('users.companiesDetails', {
  //   url: '/companies/details/:id',
  //   component: 'companiesDetailsPage'
  // })
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
  // $stateProvider.state('users.personsAdd', {
  //   url: '/persons/add',
  //   component: 'personsFormPage'
  // })
  // $stateProvider.state('users.personsEdit', {
  //   url: '/persons/edit/:id',
  //   component: 'personsFormPage'
  // })
  // $stateProvider.state('users.personsDetails', {
  //   url: '/persons/details/:id',
  //   component: 'personsDetailsPage'
  // })
});
angular.module('places', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.places', {
    url: '/places',
    component: 'placesListPage'
  });
  // $stateProvider.state('users.placesAdd', {
  //   url: '/places/add',
  //   component: 'placesFormPage'
  // })
  // $stateProvider.state('users.placesEdit', {
  //   url: '/places/edit/:id',
  //   component: 'placesFormPage'
  // })
  // $stateProvider.state('users.placesDetails', {
  //   url: '/places/details/:id',
  //   component: 'placesDetailsPage'
  // })
});
angular.module('schools', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.schools', {
    url: '/schools',
    component: 'schoolsListPage'
  });
  // $stateProvider.state('users.schoolsAdd', {
  //   url: '/schools/add',
  //   component: 'schoolsFormPage'
  // })
  // $stateProvider.state('users.schoolsEdit', {
  //   url: '/schools/edit/:id',
  //   component: 'schoolsFormPage'
  // })
  // $stateProvider.state('users.schoolsDetails', {
  //   url: '/schools/details/:id',
  //   component: 'schoolsDetailsPage'
  // })
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
angular.module('works', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.works', {
    url: '/works',
    component: 'worksListPage'
  });
  // $stateProvider.state('users.worksAdd', {
  //   url: '/works/add',
  //   component: 'worksFormPage'
  // })
  // $stateProvider.state('users.worksEdit', {
  //   url: '/works/edit/:id',
  //   component: 'worksFormPage'
  // })
  // $stateProvider.state('users.worksDetails', {
  //   url: '/works/details/:id',
  //   component: 'worksDetailsPage'
  // })
});
angular.module('cities', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.cities', {
    url: '/countries/:country_id/cities',
    component: 'citiesListPage'
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
          notyService.error("Error", "No se pudo conectar al servidor");
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
          notyService.error("Error", "No se pudo conectar al servidor");
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
          notyService.error("Error", "No se pudo conectar al servidor");
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
          notyService.error("Error", "No se pudo conectar al servidor");
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
        time: 500
      });
    };

    this.info = function (title, message) {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-info gritter-light',
        time: 500
      });
    };

    this.success = function (title, message) {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-success gritter-light',
        time: 500
      });
    };

    this.error = function (title, message) {
      $.gritter.add({
        title: title,
        text: message,
        class_name: 'gritter-error gritter-light',
        time: 500
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
angular.module('my-services').service('countriesApiService', function (myHttpService) {
  return new (function (_CrudClass2) {
    _inherits(_class5, _CrudClass2);

    function _class5() {
      _classCallCheck(this, _class5);

      return _possibleConstructorReturn(this, (_class5.__proto__ || Object.getPrototypeOf(_class5)).call(this, myHttpService, "/countries"));
    }

    return _class5;
  }(CrudClass))();
});
angular.module('my-services').service('dancestylesApiService', function (myHttpService) {
  return new (function (_CrudClass3) {
    _inherits(_class6, _CrudClass3);

    function _class6() {
      _classCallCheck(this, _class6);

      return _possibleConstructorReturn(this, (_class6.__proto__ || Object.getPrototypeOf(_class6)).call(this, myHttpService, "/dancestyles"));
    }

    return _class6;
  }(CrudClass))();
});
angular.module('my-services').service('titlesApiService', function (myHttpService) {
  return new (function (_CrudClass4) {
    _inherits(_class7, _CrudClass4);

    function _class7() {
      _classCallCheck(this, _class7);

      return _possibleConstructorReturn(this, (_class7.__proto__ || Object.getPrototypeOf(_class7)).call(this, myHttpService, "/titles"));
    }

    return _class7;
  }(CrudClass))();
});
angular.module('my-services').service('authService', function (myHttpService, config, notyService, debugService) {
  return new (function () {
    function _class8() {
      _classCallCheck(this, _class8);
    }

    _createClass(_class8, [{
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

    return _class8;
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
    function _class10() {
      _classCallCheck(this, _class10);

      this.storage_key = "danceapp_02869264ksjdi234nkw";

      this.storage = new StorageModel();
      this.scope = $rootScope.$new(true);
      this.load();
      this.emitChange();
    }

    _createClass(_class10, [{
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

    return _class10;
  }())();
});
angular.module('my-services').service('titleBarService', function () {
  function _class11($rootScope) {
    _classCallCheck(this, _class11);

    this.scope = $rootScope.$new(true);

    this.title = "titulo";
    this.description = "descripción";
    this.path = [];

    this.emitChange();
  }

  _createClass(_class11, [{
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

  return _class11;
}());
angular.module('pages').component('usersTemplate', {
  templateUrl: '/src/templates/users.template.html',
  controller: function controller() {
    _classCallCheck(this, controller);
  }
});
angular.module('my-components').component('myFooter', {
  templateUrl: 'src/components/footer/footer.component.html',
  controller: function controller() {
    return new (function () {
      function _class13() {
        _classCallCheck(this, _class13);

        this.$onInit = function () {};
      }

      return _class13;
    }())();
  }
});
angular.module('my-components').component('myHeader', {
  templateUrl: 'src/components/header/header.component.html',
  controller: function controller(loginStatusService, $state, notyService) {
    return new (function () {
      function _class15() {
        _classCallCheck(this, _class15);

        this.$onInit = function () {};

        this.logout = function () {
          loginStatusService.remove();

          notyService.info("Saludos", "Hasta la próxima");

          $state.go('login');
        };
      }

      return _class15;
    }())();
  }
});
angular.module('my-components').component('leftPanel', {
  templateUrl: 'src/components/left-panel/left-panel.component.html',
  controller: function controller() {
    return new (function () {
      function _class17() {
        _classCallCheck(this, _class17);

        this.$onInit = function () {
          // this.active = true
        };
      }

      return _class17;
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
      function _class19() {
        _classCallCheck(this, _class19);

        this.$onInit = function () {};
      }

      return _class19;
    }())();
  }
});
angular.module('my-components').component('titleBar', {
  templateUrl: 'src/components/title-bar/title-bar.component.html',
  controller: function controller(titleBarService) {
    return new (function () {
      function _class20() {
        _classCallCheck(this, _class20);

        this.title = "";
        this.description = "";
        this.path = [];

        this._event = null;
      }

      _createClass(_class20, [{
        key: '$onInit',
        value: function $onInit() {
          var _this6 = this;

          this._event = titleBarService.scope.$on('dataChange', function (event, data) {
            _this6.title = data.title;
            _this6.description = data.description;
            _this6.path = data.path;
          });
        }
      }, {
        key: '$onDestroy',
        value: function $onDestroy() {}
      }]);

      return _class20;
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
      function _class22() {
        _classCallCheck(this, _class22);

        this.$onInit = function () {
          // this.active = true
        };
      }

      return _class22;
    }())();
  }
});
angular.module('logged').component('changePasswordPage', {
  templateUrl: 'src/pages/logged/change-password/change-password.page.html',
  controller: function controller($window, notyService, config, authService, loginStatusService, $state) {
    return new (function () {
      function _class23() {
        _classCallCheck(this, _class23);
      }

      _createClass(_class23, [{
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
          var _this7 = this;

          authService.change_password(this.model).then(function (res) {
            if (res) {
              if (res.status == 400) {
                _this7.errors = res.errors;
              } else {
                //quitar errores
                _this7.errors = {};

                //notificación de bienvenida
                notyService.info("Mensaje", "La contraseña se cambió con éxito");

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

      return _class23;
    }())();
  }
});
angular.module('logged').component('homePage', {
  templateUrl: 'src/pages/logged/home/home.page.html',
  controller: function controller($state, loginStatusService, titleBarService) {
    return new (function () {
      function _class24() {
        _classCallCheck(this, _class24);
      }

      _createClass(_class24, [{
        key: '$onInit',
        value: function $onInit() {
          titleBarService.setData({
            title: "Inicio",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }]
          });
        }
      }]);

      return _class24;
    }())();
  }
});
angular.module('not_logged').component('loginPage', {
  templateUrl: 'src/pages/not_logged/login/login.page.html',
  controller: function controller(notyService, config, authService, loginStatusService, $state) {
    var _this8 = this;

    this.$onInit = function () {
      if (loginStatusService.isLogged()) {
        $state.go('users.home');
      }

      _this8.model = {
        user: "",
        pass: ""
      };
      _this8.errors = {};
    };

    this.login = function () {
      authService.login(_this8.model.user, _this8.model.pass).then(function (res) {
        if (res) {
          if (res.status == 400) {
            _this8.errors = res.errors;
          } else {
            //quitar errores
            _this8.errors = {};

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
angular.module('logged').component('companiesListPage', {
  templateUrl: 'src/pages/logged/companies/list/companies-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService,
  // companiesApiService,
  notyService) {
    return new (function () {
      function _class25() {
        _classCallCheck(this, _class25);

        this.companies = [];
        this.loading = true;
      }

      _createClass(_class25, [{
        key: '$onInit',
        value: function $onInit() {
          titleBarService.setData({
            title: "Compañías",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.companies',
              text: "Compañías"
            }]
          });

          // companiesApiService.list().then((res) => {
          //   if (res) {
          //     this.companies = res.data
          //     this.loading = false
          //   }
          // })
        }

        // delete(index) {
        //   companiesApiService.remove(this.companies[index].id).then(data => {
        //     if (data) {
        //       this.companies.splice(index, 1)
        //       notyService.success('Mensaje', 'El país se eliminó correctamente')
        //     } else {
        //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
        //     }
        //   })
        // }

      }]);

      return _class25;
    }())();
  }
});
angular.module('logged').component('countriesDetailsPage', {
  templateUrl: 'src/pages/logged/countries/details/countries-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, countriesApiService) {
    return new (function () {
      function _class26() {
        _classCallCheck(this, _class26);

        this.country = {};
        this.action = "";
        this.loading = true;
      }

      _createClass(_class26, [{
        key: '$onInit',
        value: function $onInit() {
          var _this9 = this;

          countriesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              _this9.country = res.data;
              titleBarService.setData({
                title: "Países",
                description: "una descripción",
                path: [{
                  state: 'users.home',
                  text: "Inicio",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.countries',
                  text: "Países"
                }, {
                  state: 'users.countriesDetails',
                  text: _this9.country.name
                }]
              });
              _this9.loading = false;
            }
          });
        }
      }]);

      return _class26;
    }())();
  }
});
angular.module('logged').component('countriesFormPage', {
  templateUrl: 'src/pages/logged/countries/form/countries-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, countriesApiService, notyService) {
    return new (function () {
      function _class27() {
        _classCallCheck(this, _class27);

        this.country = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class27, [{
        key: '$onInit',
        value: function $onInit() {
          var _this10 = this;

          var basePath = {
            title: "Países",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.countries',
              text: "Países"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Editar";
            this.loading = true;
            countriesApiService.get($stateParams.id).then(function (res) {
              if (res) {
                _this10.country = res.data;
                basePath.path.push({
                  state: 'users.countriesEdit',
                  text: "Editar " + toTitleBar(_this10.country.name)
                });
                titleBarService.setData(basePath);
                _this10.loading = false;
              }
            });
          } else {
            this.action = "Adicionar";
            basePath.path.push({
              state: 'users.countriesAdd',
              text: "Adicionar"
            });
            titleBarService.setData(basePath);
          }
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this11 = this;

          this.submitting = true;

          if (this.action == "Editar") {
            countriesApiService.edit($stateParams.id, this.country).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this11.ok = true;
                  notyService.success('Mensaje', 'El país se editó correctamente');
                } else {
                  notyService.error('Mensaje', 'Existen errores en los datos');
                }
                _this11.errors = res.errors;
                _this11.submitting = false;
              }
            });
          } else {
            countriesApiService.add(this.country).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this11.ok = true;
                  notyService.success('Mensaje', 'El país se adicionó correctamente');
                } else {
                  notyService.error('Mensaje', 'Existen errores en los datos');
                }
                _this11.errors = res.errors;
                _this11.submitting = false;
              }
            });
          }
        }
      }]);

      return _class27;
    }())();
  }
});
angular.module('logged').component('countriesListPage', {
  templateUrl: 'src/pages/logged/countries/list/countries-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, countriesApiService, notyService) {
    return new (function () {
      function _class28() {
        _classCallCheck(this, _class28);

        this.countries = [];
        this.loading = true;
      }

      _createClass(_class28, [{
        key: '$onInit',
        value: function $onInit() {
          var _this12 = this;

          titleBarService.setData({
            title: "Países",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.countries',
              text: "Países"
            }]
          });

          countriesApiService.list().then(function (res) {
            if (res) {
              _this12.countries = res.data;
              _this12.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this13 = this;

          countriesApiService.remove(this.countries[index].id).then(function (data) {
            if (data) {
              _this13.countries.splice(index, 1);
              notyService.success('Mensaje', 'El país se eliminó correctamente');
            } else {
              notyService.erorr('Mensaje', 'Otros datos están relacionado a este país');
            }
          });
        }
      }]);

      return _class28;
    }())();
  }
});
angular.module('logged').component('dancestylesDetailsPage', {
  templateUrl: 'src/pages/logged/dancestyles/details/dancestyles-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, dancestylesApiService) {
    return new (function () {
      function _class29() {
        _classCallCheck(this, _class29);

        this.dancestyle = {};
        this.action = "";
        this.loading = true;
      }

      _createClass(_class29, [{
        key: '$onInit',
        value: function $onInit() {
          var _this14 = this;

          dancestylesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              _this14.dancestyle = res.data;
              titleBarService.setData({
                title: "Estilos dansarios",
                description: "una descripción",
                path: [{
                  state: 'users.home',
                  text: "Inicio",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.dancestyles',
                  text: "Estilos dansarios"
                }, {
                  state: 'users.dancestylesDetails',
                  text: _this14.dancestyle.name
                }]
              });
              _this14.loading = false;
            }
          });
        }
      }]);

      return _class29;
    }())();
  }
});
angular.module('logged').component('dancestylesFormPage', {
  templateUrl: 'src/pages/logged/dancestyles/form/dancestyles-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, dancestylesApiService, notyService) {
    return new (function () {
      function _class30() {
        _classCallCheck(this, _class30);

        this.dancestyle = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class30, [{
        key: '$onInit',
        value: function $onInit() {
          var _this15 = this;

          var basePath = {
            dancestyle: "Estilos dansarion",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.dancestyles',
              text: "Estilos dansarios"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Editar";
            this.loading = true;
            dancestylesApiService.get($stateParams.id).then(function (res) {
              if (res) {
                _this15.dancestyle = res.data;
                basePath.path.push({
                  state: 'users.dancestylesEdit',
                  text: "Editar " + toTitleBar(_this15.dancestyle.name)
                });
                titleBarService.setData(basePath);
                _this15.loading = false;
              }
            });
          } else {
            this.action = "Adicionar";
            basePath.path.push({
              state: 'users.dancestylesAdd',
              text: "Adicionar"
            });
            titleBarService.setData(basePath);
          }
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this16 = this;

          this.submitting = true;

          if (this.action == "Editar") {
            dancestylesApiService.edit($stateParams.id, this.dancestyle).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this16.ok = true;
                  notyService.success('Mensaje', 'El estilo dansario se editó correctamente');
                } else {
                  notyService.error('Mensaje', 'Existen errores en los datos');
                }
                _this16.errors = res.errors;
                _this16.submitting = false;
              }
            });
          } else {
            dancestylesApiService.add(this.dancestyle).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this16.ok = true;
                  notyService.success('Mensaje', 'El estilo dansario se adicionó correctamente');
                } else {
                  notyService.error('Mensaje', 'Existen errores en los datos');
                }
                _this16.errors = res.errors;
                _this16.submitting = false;
              }
            });
          }
        }
      }]);

      return _class30;
    }())();
  }
});
angular.module('logged').component('dancestylesListPage', {
  templateUrl: 'src/pages/logged/dancestyles/list/dancestyles-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, dancestylesApiService, notyService) {
    return new (function () {
      function _class31() {
        _classCallCheck(this, _class31);

        this.dancestyles = [];
        this.loading = true;
      }

      _createClass(_class31, [{
        key: '$onInit',
        value: function $onInit() {
          var _this17 = this;

          titleBarService.setData({
            title: "Estilos dansarios",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.dancestyles',
              text: "Estilos dansarios"
            }]
          });

          dancestylesApiService.list().then(function (res) {
            if (res) {
              _this17.dancestyles = res.data;
              _this17.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this18 = this;

          dancestylesApiService.remove(this.dancestyles[index].id).then(function (data) {
            if (data) {
              _this18.dancestyles.splice(index, 1);
              notyService.success('Mensaje', 'El estilo dansario se eliminó correctamente');
            } else {
              notyService.erorr('Mensaje', 'Otros datos están relacionado a este estilo dansario');
            }
          });
        }
      }]);

      return _class31;
    }())();
  }
});
angular.module('logged').component('personsListPage', {
  templateUrl: 'src/pages/logged/persons/list/persons-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService,
  // personsApiService,
  notyService) {
    return new (function () {
      function _class32() {
        _classCallCheck(this, _class32);

        this.persons = [];
        this.loading = true;
      }

      _createClass(_class32, [{
        key: '$onInit',
        value: function $onInit() {
          titleBarService.setData({
            title: "Personas",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.persons',
              text: "Personas"
            }]
          });

          // personsApiService.list().then((res) => {
          //   if (res) {
          //     this.persons = res.data
          //     this.loading = false
          //   }
          // })
        }

        // delete(index) {
        //   personsApiService.remove(this.persons[index].id).then(data => {
        //     if (data) {
        //       this.persons.splice(index, 1)
        //       notyService.success('Mensaje', 'El país se eliminó correctamente')
        //     } else {
        //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
        //     }
        //   })
        // }

      }]);

      return _class32;
    }())();
  }
});
angular.module('logged').component('placesListPage', {
  templateUrl: 'src/pages/logged/places/list/places-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService,
  // placesApiService,
  notyService) {
    return new (function () {
      function _class33() {
        _classCallCheck(this, _class33);

        this.places = [];
        this.loading = true;
      }

      _createClass(_class33, [{
        key: '$onInit',
        value: function $onInit() {
          titleBarService.setData({
            title: "Venues",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.places',
              text: "Venues"
            }]
          });

          // placesApiService.list().then((res) => {
          //   if (res) {
          //     this.places = res.data
          //     this.loading = false
          //   }
          // })
        }

        // delete(index) {
        //   placesApiService.remove(this.places[index].id).then(data => {
        //     if (data) {
        //       this.places.splice(index, 1)
        //       notyService.success('Mensaje', 'El país se eliminó correctamente')
        //     } else {
        //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
        //     }
        //   })
        // }

      }]);

      return _class33;
    }())();
  }
});
angular.module('logged').component('schoolsListPage', {
  templateUrl: 'src/pages/logged/schools/list/schools-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService,
  // schoolsApiService,
  notyService) {
    return new (function () {
      function _class34() {
        _classCallCheck(this, _class34);

        this.schools = [];
        this.loading = true;
      }

      _createClass(_class34, [{
        key: '$onInit',
        value: function $onInit() {
          titleBarService.setData({
            title: "Escuelas",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.schools',
              text: "Escuelas"
            }]
          });

          // schoolsApiService.list().then((res) => {
          //   if (res) {
          //     this.schools = res.data
          //     this.loading = false
          //   }
          // })
        }

        // delete(index) {
        //   schoolsApiService.remove(this.schools[index].id).then(data => {
        //     if (data) {
        //       this.schools.splice(index, 1)
        //       notyService.success('Mensaje', 'El país se eliminó correctamente')
        //     } else {
        //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
        //     }
        //   })
        // }

      }]);

      return _class34;
    }())();
  }
});
angular.module('logged').component('titlesDetailsPage', {
  templateUrl: 'src/pages/logged/titles/details/titles-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, titlesApiService) {
    return new (function () {
      function _class35() {
        _classCallCheck(this, _class35);

        this.title = {};
        this.action = "";
        this.loading = true;
      }

      _createClass(_class35, [{
        key: '$onInit',
        value: function $onInit() {
          var _this19 = this;

          titlesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              _this19.title = res.data;
              titleBarService.setData({
                title: "Títulos",
                description: "una descripción",
                path: [{
                  state: 'users.home',
                  text: "Inicio",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.titles',
                  text: "Títulos"
                }, {
                  state: 'users.titlesDetails',
                  text: _this19.title.name
                }]
              });
              _this19.loading = false;
            }
          });
        }
      }]);

      return _class35;
    }())();
  }
});
angular.module('logged').component('titlesFormPage', {
  templateUrl: 'src/pages/logged/titles/form/titles-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, titlesApiService, notyService) {
    return new (function () {
      function _class36() {
        _classCallCheck(this, _class36);

        this.title = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class36, [{
        key: '$onInit',
        value: function $onInit() {
          var _this20 = this;

          var basePath = {
            title: "Títulos",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.titles',
              text: "Títulos"
            }]
          };

          if ($stateParams.id != undefined) {
            this.action = "Editar";
            this.loading = true;
            titlesApiService.get($stateParams.id).then(function (res) {
              if (res) {
                _this20.title = res.data;
                basePath.path.push({
                  state: 'users.titlesEdit',
                  text: "Editar " + toTitleBar(_this20.title.name)
                });
                titleBarService.setData(basePath);
                _this20.loading = false;
              }
            });
          } else {
            this.action = "Adicionar";
            basePath.path.push({
              state: 'users.titlesAdd',
              text: "Adicionar"
            });
            titleBarService.setData(basePath);
          }
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this21 = this;

          this.submitting = true;

          if (this.action == "Editar") {
            titlesApiService.edit($stateParams.id, this.title).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this21.ok = true;
                  notyService.success('Mensaje', 'El título se editó correctamente');
                } else {
                  notyService.error('Mensaje', 'Existen errores en los datos');
                }
                _this21.errors = res.errors;
                _this21.submitting = false;
              }
            });
          } else {
            titlesApiService.add(this.title).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this21.ok = true;
                  notyService.success('Mensaje', 'El título se adicionó correctamente');
                } else {
                  notyService.error('Mensaje', 'Existen errores en los datos');
                }
                _this21.errors = res.errors;
                _this21.submitting = false;
              }
            });
          }
        }
      }]);

      return _class36;
    }())();
  }
});
angular.module('logged').component('titlesListPage', {
  templateUrl: 'src/pages/logged/titles/list/titles-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, titlesApiService, notyService) {
    return new (function () {
      function _class37() {
        _classCallCheck(this, _class37);

        this.titles = [];
        this.loading = true;
      }

      _createClass(_class37, [{
        key: '$onInit',
        value: function $onInit() {
          var _this22 = this;

          titleBarService.setData({
            title: "Títulos",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.titles',
              text: "Títulos"
            }]
          });

          titlesApiService.list().then(function (res) {
            if (res) {
              _this22.titles = res.data;
              _this22.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this23 = this;

          titlesApiService.remove(this.titles[index].id).then(function (data) {
            if (data) {
              _this23.titles.splice(index, 1);
              notyService.success('Mensaje', 'El título se eliminó correctamente');
            } else {
              notyService.erorr('Mensaje', 'Otros datos están relacionado a este título');
            }
          });
        }
      }]);

      return _class37;
    }())();
  }
});
angular.module('logged').component('worksListPage', {
  templateUrl: 'src/pages/logged/works/list/works-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService,
  // worksApiService,
  notyService) {
    return new (function () {
      function _class38() {
        _classCallCheck(this, _class38);

        this.works = [];
        this.loading = true;
      }

      _createClass(_class38, [{
        key: '$onInit',
        value: function $onInit() {
          titleBarService.setData({
            title: "Trabajos",
            description: "una descripción",
            path: [{
              state: 'users.home',
              text: "Inicio",
              icon: true,
              icon_class: 'fa-home'
            }, {
              state: 'users.works',
              text: "Trabajos"
            }]
          });

          // worksApiService.list().then((res) => {
          //   if (res) {
          //     this.works = res.data
          //     this.loading = false
          //   }
          // })
        }

        // delete(index) {
        //   worksApiService.remove(this.works[index].id).then(data => {
        //     if (data) {
        //       this.works.splice(index, 1)
        //       notyService.success('Mensaje', 'El país se eliminó correctamente')
        //     } else {
        //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
        //     }
        //   })
        // }

      }]);

      return _class38;
    }())();
  }
});
angular.module('logged').component('citiesDetailsPage', {
  templateUrl: 'src/pages/logged/countries/cities/details/cities-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, citiesApiService, countriesApiService) {
    return new (function () {
      function _class39() {
        _classCallCheck(this, _class39);

        this.loading = true;
        this.city = {};
      }

      _createClass(_class39, [{
        key: '$onInit',
        value: function $onInit() {
          var _this24 = this;

          countriesApiService.get($stateParams.country_id).then(function (res) {
            if (res) {
              _this24.country = res.data;

              citiesApiService.get($stateParams.id).then(function (res) {
                if (res) {
                  _this24.city = res.data;
                  _this24.loading = false;

                  titleBarService.setData({
                    title: "Ciudades",
                    description: "una descripción",
                    path: [{
                      state: 'users.home',
                      text: "Inicio",
                      icon: true,
                      icon_class: 'fa-home'
                    }, {
                      state: 'users.countries',
                      text: "Países"
                    }, {
                      state: '',
                      text: toTitleBar(_this24.country.name)
                    }, {
                      state: 'users.cities({country_id: ' + _this24.country.id + '})',
                      text: "Ciudades"
                    }, {
                      state: 'users.citiesDetails',
                      text: toTitleBar(_this24.city.name)
                    }]
                  });
                }
              });
            }
          });
        }
      }]);

      return _class39;
    }())();
  }
});
angular.module('logged').component('citiesFormPage', {
  templateUrl: 'src/pages/logged/countries/cities/form/cities-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, countriesApiService, citiesApiService, notyService) {
    return new (function () {
      function _class40() {
        _classCallCheck(this, _class40);

        this.city = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class40, [{
        key: '$onInit',
        value: function $onInit() {
          var _this25 = this;

          countriesApiService.get($stateParams.country_id).then(function (res) {
            if (res) {
              _this25.country = res.data;
              _this25.city._country = _this25.country.id;
              titleBarService.setData({
                title: "Ciudades",
                description: "una descripción",
                path: [{
                  state: 'users.home',
                  text: "Inicio",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.countries',
                  text: "Países"
                }, {
                  state: '',
                  text: toTitleBar(_this25.country.name)
                }, {
                  state: 'users.cities' + "({country_id: " + _this25.country.id + "})",
                  text: "Ciudades"
                }]
              });

              if ($stateParams.id != undefined) {
                _this25.action = "Editar";
                _this25.loading = true;
                citiesApiService.get($stateParams.id, "?country_id=" + _this25.country.id).then(function (res) {
                  if (res) {
                    _this25.city = res.data;
                    _this25.city._country = _this25.country.id;
                    _this25.loading = false;
                    titleBarService.addPath({
                      state: 'users.citiesEdit',
                      text: "Editar " + toTitleBar(_this25.city.name)
                    });
                  }
                });
              } else {
                _this25.action = "Adicionar";
                titleBarService.addPath({
                  state: 'users.citiesAdd',
                  text: "Adicionar "
                });
              }
            }
          });
        }
      }, {
        key: 'submit',
        value: function submit() {
          var _this26 = this;

          this.submitting = true;
          if (this.action == "Editar") {
            citiesApiService.edit($stateParams.id, this.city).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this26.ok = true;
                  notyService.success('Mensaje', 'La ciudad se editó correctamente');
                } else {
                  notyService.error('Mensaje', 'Existen errores en los datos');
                }
                _this26.errors = res.errors;
                _this26.submitting = false;
              }
            });
          } else {
            citiesApiService.add(this.city).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this26.ok = true;
                  notyService.success('Mensaje', 'La ciudad se adicionó correctamente');
                } else {
                  notyService.error('Mensaje', 'Existen errores en los datos');
                }
                _this26.errors = res.errors;
                _this26.submitting = false;
              }
            });
          }
        }
      }]);

      return _class40;
    }())();
  }
});
angular.module('logged').component('citiesListPage', {
  templateUrl: 'src/pages/logged/countries/cities/list/cities-list.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, citiesApiService, countriesApiService, notyService) {
    return new (function () {
      function _class41() {
        _classCallCheck(this, _class41);

        this.cities = [];
        this.loading = true;
        this.country = {};
      }

      _createClass(_class41, [{
        key: '$onInit',
        value: function $onInit() {
          var _this27 = this;

          countriesApiService.get($stateParams.country_id).then(function (res) {
            if (res) {
              _this27.country = res.data;
              titleBarService.setData({
                title: "Ciudades",
                description: "una descripción",
                path: [{
                  state: 'users.home',
                  text: "Inicio",
                  icon: true,
                  icon_class: 'fa-home'
                }, {
                  state: 'users.countries',
                  text: "Países"
                }, {
                  state: '',
                  text: toTitleBar(_this27.country.name)
                }, {
                  state: 'users.cities',
                  text: "Ciudades"
                }]
              });

              citiesApiService.list("?country_id=" + _this27.country.id).then(function (res) {
                if (res) {
                  _this27.cities = res.data;
                  _this27.loading = false;
                }
              });
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this28 = this;

          citiesApiService.remove(this.cities[index].id).then(function (data) {
            if (data) {
              _this28.cities.splice(index, 1);
              notyService.success('Mensaje', 'El ciudad se eliminó correctamente');
            } else {
              notyService.erorr('Mensaje', 'Otros datos están relacionado a esta ciudad');
            }
          });
        }
      }]);

      return _class41;
    }())();
  }
});