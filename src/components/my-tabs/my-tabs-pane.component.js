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
  controller: function(

  ) {
    return new class {
      constructor() {}
      $onInit = function() {
        this.tabsCtrl.addPane(this);
        if (this.selected) {
          this.tabsCtrl.select(this)
        }
      };
    }
  }
})