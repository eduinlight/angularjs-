angular.module('logged').component('personsFormPage', {
  templateUrl: 'src/pages/logged/persons/form/persons-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    personsApiService,
    citiesApiService,
    titlesApiService,
    dancestylesApiService,
    venuesApiService,
    notyService,
    $filter
  ) {
    return new class {
      constructor() {
        this.person = {}
        this.errors = {}
        this.action = ""
        this.loading = false
        this.submitting = false
        this.ok = false
      }

      $onInit() {

        venuesApiService.list().then((res) => {
          if (res && res.status == 200) {
            this.venues = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        });
        titlesApiService.list().then((res) => {
          if (res && res.status == 200) {
            this.titles = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        });
        dancestylesApiService.list().then((res) => {
          if (res && res.status == 200) {
            this.dance_styles = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        });

        let basePath = {
          title: "Persons",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.persons',
            text: "Persons",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Edit"
          this.loading = true
          personsApiService.get($stateParams.id).then((res) => {
            if (res) {
              if (res.status == 200) {
                citiesApiService.list().then((res) => {
                  if (res && res.status == 200) {
                    this.cities = res.data.map((v) => {
                      return { id: v.id, text: v.name + ", " + v.country }
                    })
                  }
                });
                res.data._titles = res.data._titles.map(v => v.id)
                res.data._dance_styles = res.data._dance_styles.map(v => v.id)
                res.data._venues = res.data._venues.map(v => v.id)
                res.data._city = res.data._city.id
                this.person = res.data
                this.person._websites = this.person._websites.map(v => v.url)
                basePath.path.push({
                  state: 'users.personsEdit',
                  text: "Edit " + toTitleBar(this.person.first_name),
                })
                titleBarService.setData(basePath)
                this.loading = false
              } else {
                $state.go('not_found')
              }
            }
          })
        } else {
          // this.person.date_born = new Date(1548201600 * 1000)
          this.action = "Add"
          basePath.path.push({
            state: 'users.personsAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }
      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          personsApiService.edit($stateParams.id, this.person).then((res) => {
            if (res) {
              if (res.status == 200) {
                notyService.success('Message', 'The person was successfully edited')
                this.ok = true
                $state.go('users.persons')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          personsApiService.add(this.person).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The person was successfully added')
                $state.go('users.persons')
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