angular.module('logged').component('homePage', {
  templateUrl: 'src/pages/logged/home/home.page.html',
  controller: function($state, loginStatusService, titleBarService) {
    return new class {
      constructor() {

        this.rios = "windows"
      }

      $onInit() {
        titleBarService.setData({
          title: "Home",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }]
        })
      }
    }
  }
});