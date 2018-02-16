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
  api_url: "http://localhost/angularjs_codeigniter/api",
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
angular.module('logged', ['users']).config(function ($stateProvider, $urlServiceProvider) {
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
angular.module('users', []).config(function ($stateProvider, $urlServiceProvider) {
  $urlServiceProvider.config.strictMode(false);
  $stateProvider.state('users.users', {
    url: '/users',
    component: 'usersListPage'
  });
  $stateProvider.state('users.usersAdd', {
    url: '/users/add',
    component: 'usersFormPage'
  });
  $stateProvider.state('users.usersEdit', {
    url: '/users/edit/:id',
    component: 'usersFormPage'
  });
  $stateProvider.state('users.usersDetails', {
    url: '/users/details/:id',
    component: 'usersDetailsPage'
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
angular.module('my-services').service('usersApiService', function (myHttpService) {
  return new (function (_CrudClass) {
    _inherits(_class4, _CrudClass);

    function _class4() {
      _classCallCheck(this, _class4);

      return _possibleConstructorReturn(this, (_class4.__proto__ || Object.getPrototypeOf(_class4)).call(this, myHttpService, "/users"));
    }

    return _class4;
  }(CrudClass))();
});
angular.module('my-services').service('authService', function (myHttpService, config, notyService, debugService) {
  return new (function () {
    function _class5() {
      _classCallCheck(this, _class5);
    }

    _createClass(_class5, [{
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

    return _class5;
  }())();
});
function StorageModel() {
  this.access_token = '';
  this.user_id = '';
  this.rol = '';
  this.user = '';
  this.first_name = '';
  this.last_name = '';
}
angular.module('my-services').service('loginStatusService', function ($rootScope) {
  return new (function () {
    function _class7() {
      _classCallCheck(this, _class7);

      this.storage_key = "danceapp_02869264ksjdi234nkw";

      this.storage = new StorageModel();
      this.scope = $rootScope.$new(true);
      this.load();
      this.emitChange();
    }

    _createClass(_class7, [{
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

    return _class7;
  }())();
});
angular.module('my-services').service('titleBarService', function () {
  function _class8($rootScope) {
    _classCallCheck(this, _class8);

    this.scope = $rootScope.$new(true);

    this.title = "titulo";
    this.description = "descripción";
    this.path = [];

    this.emitChange();
  }

  _createClass(_class8, [{
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

  return _class8;
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
      function _class10() {
        _classCallCheck(this, _class10);

        this.$onInit = function () {};
      }

      return _class10;
    }())();
  }
});
angular.module('my-components').component('myHeader', {
  templateUrl: 'src/components/header/header.component.html',
  controller: function controller(loginStatusService, $state, notyService) {
    return new (function () {
      function _class12() {
        var _this3 = this;

        _classCallCheck(this, _class12);

        this.$onInit = function () {
          _this3.name = loginStatusService.storage.first_name + " " + loginStatusService.storage.last_name;
        };

        this.logout = function () {
          loginStatusService.remove();

          notyService.info("Bye", "Have a nice day");

          $state.go('login');
        };
      }

      return _class12;
    }())();
  }
});
angular.module('my-components').component('leftPanel', {
  templateUrl: 'src/components/left-panel/left-panel.component.html',
  controller: function controller() {
    return new (function () {
      function _class14() {
        _classCallCheck(this, _class14);

        this.$onInit = function () {
          // this.active = true
        };
      }

      return _class14;
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
      function _class16() {
        _classCallCheck(this, _class16);

        this.$onInit = function () {};
      }

      return _class16;
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
      function _class18() {
        _classCallCheck(this, _class18);

        this.$onInit = function () {};
      }

      _createClass(_class18, [{
        key: 'change',
        value: function change() {
          this.error = '';
        }
      }]);

      return _class18;
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
      function _class20() {
        var _this4 = this;

        _classCallCheck(this, _class20);

        this.$onInit = function () {
          var $elem = $($element).find('#datepicker');
          $elem.datepicker({
            autoclose: true,
            format: 'mm/dd/yyyy'
          });

          $elem.change(function () {
            var d = new Date($elem.val());
            _this4.model = d.getTime() / 1000;
          });
        };
      }

      return _class20;
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
      function _class22() {
        _classCallCheck(this, _class22);

        this.$onInit = function () {};
      }

      _createClass(_class22, [{
        key: 'change',
        value: function change(target) {
          var _this5 = this;

          if (target.files.length > 0) {
            uploadService.upload(target.files[0]).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this5.model = res.data;
                  _this5.error = undefined;
                } else {
                  _this5.error = res.errors.file;
                }
              }
            });
          }
        }
      }]);

      return _class22;
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
      function _class23() {
        _classCallCheck(this, _class23);
      }

      return _class23;
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
      function _class24() {
        _classCallCheck(this, _class24);
      }

      return _class24;
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
      function _class26() {
        _classCallCheck(this, _class26);

        this.$onInit = function () {
          this.tabsCtrl.addPane(this);
          if (this.selected) {
            this.tabsCtrl.select(this);
          }
        };
      }

      return _class26;
    }())();
  }
});
angular.module('my-components').component('myTabs', {
  transclude: true,
  templateUrl: 'src/components/my-tabs/my-tabs.component.html',
  controller: function controller() {
    return new (function () {
      function _class27() {
        _classCallCheck(this, _class27);
      }

      _createClass(_class27, [{
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

      return _class27;
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
      function _class29() {
        var _this6 = this;

        _classCallCheck(this, _class29);

        this.$onInit = function () {
          if (_this6.model == undefined) {
            _this6.model = [];
          }
        };

        this.text = "";
      }

      _createClass(_class29, [{
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

      return _class29;
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
      function _class30() {
        _classCallCheck(this, _class30);
      }

      _createClass(_class30, [{
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
          var _this7 = this;

          if (event == undefined || event.key == "Enter") {
            if (event != undefined) {
              event.preventDefault();
            }

            var value = this.text.trim();
            if (value !== "") {
              if (this.canEdit && this.action === 'Edit') {
                if (this.model.findIndex(function (v, i) {
                  return _this7.editing_id != i && v == value;
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

      return _class30;
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
      function _class31() {
        _classCallCheck(this, _class31);
      }

      _createClass(_class31, [{
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
          var _this8 = this;

          if (this.model.findIndex(function (v) {
            return v == _this8.selected;
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

      return _class31;
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
      function _class33() {
        _classCallCheck(this, _class33);

        this.$onInit = function () {};
      }

      return _class33;
    }())();
  }
});
angular.module('my-components').component('titleBar', {
  templateUrl: 'src/components/title-bar/title-bar.component.html',
  controller: function controller(titleBarService) {
    return new (function () {
      function _class34() {
        _classCallCheck(this, _class34);

        this.title = "";
        this.description = "";
        this.path = [];

        this._event = null;
      }

      _createClass(_class34, [{
        key: '$onInit',
        value: function $onInit() {
          var _this9 = this;

          this._event = titleBarService.scope.$on('dataChange', function (event, data) {
            _this9.title = data.title;
            _this9.description = data.description;
            _this9.path = data.path;
          });
        }
      }, {
        key: '$onDestroy',
        value: function $onDestroy() {}
      }]);

      return _class34;
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
      function _class36() {
        _classCallCheck(this, _class36);

        this.$onInit = function () {
          // this.active = true
        };
      }

      return _class36;
    }())();
  }
});
angular.module('logged').component('changePasswordPage', {
  templateUrl: 'src/pages/logged/change-password/change-password.page.html',
  controller: function controller($window, notyService, config, authService, loginStatusService, $state) {
    return new (function () {
      function _class37() {
        _classCallCheck(this, _class37);
      }

      _createClass(_class37, [{
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
          var _this10 = this;

          authService.change_password(this.model).then(function (res) {
            if (res) {
              if (res.status == 400) {
                _this10.errors = res.errors;
              } else {
                //quitar errores
                _this10.errors = {};

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

      return _class37;
    }())();
  }
});
angular.module('logged').component('homePage', {
  templateUrl: 'src/pages/logged/home/home.page.html',
  controller: function controller($state, loginStatusService, titleBarService) {
    return new (function () {
      function _class38() {
        _classCallCheck(this, _class38);

        this.rios = "windows";
      }

      _createClass(_class38, [{
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

      return _class38;
    }())();
  }
});
angular.module('not_logged').component('loginPage', {
  templateUrl: 'src/pages/not_logged/login/login.page.html',
  controller: function controller(notyService, config, authService, loginStatusService, $state) {
    var _this11 = this;

    this.$onInit = function () {
      if (loginStatusService.isLogged()) {
        $state.go('users.home');
      }

      _this11.model = {
        user: "",
        pass: ""
      };
      _this11.errors = {};
    };

    this.login = function () {
      authService.login(_this11.model.user, _this11.model.pass).then(function (res) {
        if (res) {
          if (res.status == 400) {
            _this11.errors = res.errors;
          } else {
            //quitar errores
            _this11.errors = {};

            //guardar el estado de la app
            loginStatusService.setStorage({
              access_token: res.data.access_token,
              user_id: res.data.user_id,
              rol: res.data.rol,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
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
angular.module('logged').component('titlesDetailsPage', {
  templateUrl: 'src/pages/logged/titles/details/titles-details.page.html',
  controller: function controller($stateParams, $state, loginStatusService, titleBarService, titlesApiService) {
    return new (function () {
      function _class39() {
        _classCallCheck(this, _class39);

        this.title = {};
        this.action = "";
        this.loading = true;
      }

      _createClass(_class39, [{
        key: '$onInit',
        value: function $onInit() {
          var _this12 = this;

          titlesApiService.get($stateParams.id).then(function (res) {
            if (res) {
              _this12.title = res.data;
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
                  text: _this12.title.name
                }]
              });
              _this12.loading = false;
            }
          });
        }
      }]);

      return _class39;
    }())();
  }
});
angular.module('logged').component('titlesFormPage', {
  templateUrl: 'src/pages/logged/titles/form/titles-form.page.html',
  controller: function controller($state, $stateParams, loginStatusService, titleBarService, titlesApiService, notyService) {
    return new (function () {
      function _class40() {
        _classCallCheck(this, _class40);

        this.title = {};
        this.errors = {};
        this.action = "";
        this.loading = false;
        this.submitting = false;
        this.ok = false;
      }

      _createClass(_class40, [{
        key: '$onInit',
        value: function $onInit() {
          var _this13 = this;

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
                _this13.title = res.data;
                basePath.path.push({
                  state: 'users.titlesEdit',
                  text: "Edit " + toTitleBar(_this13.title.name)
                });
                titleBarService.setData(basePath);
                _this13.loading = false;
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
          var _this14 = this;

          this.submitting = true;

          if (this.action == "Edit") {
            titlesApiService.edit($stateParams.id, this.title).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this14.ok = true;
                  notyService.success('Message', 'The title was successfully edited');
                  $state.go('users.titles');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this14.errors = res.errors;
                _this14.submitting = false;
              }
            });
          } else {
            titlesApiService.add(this.title).then(function (res) {
              if (res) {
                if (res.status == 200) {
                  _this14.ok = true;
                  notyService.success('Message', 'The title was successfully added');
                  $state.go('users.titles');
                } else {
                  notyService.error('Message', 'Exist some errors in data');
                }
                _this14.errors = res.errors;
                _this14.submitting = false;
              }
            });
          }
        }
      }]);

      return _class40;
    }())();
  }
});
angular.module('logged').component('titlesListPage', {
  templateUrl: 'src/pages/logged/titles/list/titles-list.page.html',
  controller: function controller($state, loginStatusService, titleBarService, titlesApiService, notyService) {
    return new (function () {
      function _class41() {
        _classCallCheck(this, _class41);

        this.titles = [];
        this.loading = true;
      }

      _createClass(_class41, [{
        key: '$onInit',
        value: function $onInit() {
          var _this15 = this;

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
              _this15.titles = res.data;
              _this15.loading = false;
            }
          });
        }
      }, {
        key: 'delete',
        value: function _delete(index) {
          var _this16 = this;

          titlesApiService.remove(this.titles[index].id).then(function (data) {
            if (data) {
              _this16.titles.splice(index, 1);
              notyService.success('Message', 'The title was successfully removed');
            } else {
              notyService.erorr('Message', 'Other data depends from this title');
            }
          });
        }
      }]);

      return _class41;
    }())();
  }
});