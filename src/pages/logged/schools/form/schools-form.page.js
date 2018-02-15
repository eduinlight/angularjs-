angular.module('logged').component('schoolsFormPage', {
  templateUrl: 'src/pages/logged/schools/form/schools-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    schoolsApiService,
    citiesApiService,
    dancestylesApiService,
    personsApiService,
    notyService,
    $filter,
    $q
  ) {
    return new class {
      constructor() {
        this.school = {}
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
        promises[promises.push(personsApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.persons = res.data.map((v) => {
              return { id: v.id, text: v.first_name + " " + v.last_name }
            })
          }
        });
        promises[promises.push(dancestylesApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.dance_styles = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        });

        let basePath = {
          title: "Schools",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.schools',
            text: "Schools",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Edit"
          promises[promises.push(schoolsApiService.get($stateParams.id)) - 1].then((res) => {
            if (res) {
              if (res.status == 200) {
                res.data._dance_styles = res.data._dance_styles.map(v => v.id)
                res.data._persons = res.data._persons.map(v => v.id)
                res.data._city = res.data._city.id
                res.data._websites = res.data._websites.map(v => v.url)
                this.school = res.data
                basePath.path.push({
                  state: 'users.schoolsEdit',
                  text: "Edit " + toTitleBar(this.school.name),
                })
                titleBarService.setData(basePath)
              } else {
                $state.go('not_found')
              }
            }
          })
        } else {
          // this.school.date_born = new Date(1548201600 * 1000)
          this.action = "Add"
          basePath.path.push({
            state: 'users.schoolsAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }

        $q.all(promises).then(() => { this.loading = false })
      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          schoolsApiService.edit($stateParams.id, this.school).then((res) => {
            if (res) {
              if (res.status == 200) {
                notyService.success('Message', 'The school was successfully edited')
                this.ok = true
                $state.go('users.schools')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          schoolsApiService.add(this.school).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The school was successfully added')
                $state.go('users.schools')
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