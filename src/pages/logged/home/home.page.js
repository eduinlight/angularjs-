angular.module('logged').component('homePage', {
  templateUrl: 'src/pages/logged/home/home.page.html',
  controller: function($state, loginStatusService, titleBarService) {
    return new class {
      constructor() {}

      $onInit() {
        titleBarService.setData({
          title: "Inicio",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }]
        })
      }
    }
  }
});