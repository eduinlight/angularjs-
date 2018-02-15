angular.module('logged').component('venuesFormPage', {
  templateUrl: 'src/pages/logged/venues/form/venues-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    venuesApiService,
    citiesApiService,
    titlesApiService,
    dancestylesApiService,
    notyService,
    $filter,
    $q
  ) {
    return new class {
      constructor() {
        this.venue = {}
        this.errors = {}
        this.action = ""
        this.loading = true
        this.submitting = false
        this.ok = false
      }

      $onInit() {

        let promises = []
        promises[promises.push(citiesApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.cities = res.data.map((v) => {
              return { id: v.id, text: v.name + ", " + v.country }
            })
          }
        });

        let basePath = {
          title: "Venues",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.venues',
            text: "Venues",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Edit"
          promises[promises.push(venuesApiService.get($stateParams.id)) - 1].then((res) => {
            if (res) {
              if (res.status == 200) {
                res.data._city = res.data._city.id
                this.venue = res.data
                this.venue._websites = this.venue._websites.map(v => v.url)
                basePath.path.push({
                  state: 'users.venuesEdit',
                  text: "Edit " + toTitleBar(this.venue.name),
                })
                titleBarService.setData(basePath)
              } else {
                $state.go('not_found')
              }
            }
          })
        } else {
          this.action = "Add"
          basePath.path.push({
            state: 'users.venuesAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }

        $q.all(promises).then(() => { this.loading = false })
      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          venuesApiService.edit($stateParams.id, this.venue).then((res) => {
            if (res) {
              if (res.status == 200) {
                notyService.success('Message', 'The venue was successfully edited')
                this.ok = true
                $state.go('users.venues')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          venuesApiService.add(this.venue).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The venue was successfully added')
                $state.go('users.venues')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        }
      }
    }
  }
});