angular.module('my-components').component('myTabs', {
  transclude: true,
  templateUrl: 'src/components/my-tabs/my-tabs.component.html',
  controller: function(

  ) {
    return new class {
      constructor() {}
      $onInit() {
        this.panes = []
      }

      select(pane) {
        angular.forEach(this.panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      }

      addPane(pane) {
        if (this.panes.length === 0) {
          this.select(pane);
        }
        this.panes.push(pane);
      }
    }
  }
})