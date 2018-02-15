angular.module('logged').component('companiesFormPage', {
  templateUrl: 'src/pages/logged/companies/form/companies-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    companiesApiService,
    citiesApiService,
    schoolsApiService,
    worksApiService,
    dancestylesApiService,
    personsApiService,
    notyService,
    $filter,
    $q
  ) {
    return new class {
      constructor() {
        this.company = {}
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
              return { id: v.id, text: v.name + ', ' + v.country }
            })
          }
        })
        promises[promises.push(dancestylesApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.dance_styles = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        })
        promises[promises.push(schoolsApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.schools = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        })
        promises[promises.push(personsApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.persons = res.data.map((v) => {
              return { id: v.id, text: v.first_name + v.last_name }
            })
          }
        })
        promises[promises.push(worksApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.works = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        })


        console.log("asd")
        let basePath = {
          title: "Companies",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.companies',
            text: "Companies",
          }]
        }
        if ($stateParams.id != undefined) {
          this.action = "Edit"
          promises[promises.push(companiesApiService.get($stateParams.id)) - 1].then((res) => {
            if (res) {
              if (res.status == 200) {
                res.data._dance_styles = res.data._dance_styles.map(v => v.id)
                res.data._persons = res.data._persons.map(v => v.id)
                res.data._works = res.data._works.map(v => v.id)
                res.data._schools = res.data._schools.map(v => v.id)
                res.data._city = res.data._city.id
                this.company = res.data
                this.company._websites = this.company._websites.map(v => v.url)
                basePath.path.push({
                  state: 'users.companiesEdit',
                  text: "Edit " + toTitleBar(this.company.name),
                })
                titleBarService.setData(basePath)
              } else {
                $state.go('not_found')
              }
            }
          })
        } else {
          // this.company.date_born = new Date(1548201600 * 1000)
          this.action = "Add"
          basePath.path.push({
            state: 'users.companiesAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }

        $q.all([promises]).then(() => {
          this.loading = false
        })

      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          companiesApiService.edit($stateParams.id, this.company).then((res) => {
            if (res) {
              if (res.status == 200) {
                notyService.success('Message', 'The person was edited successfully')
                this.ok = true
                $state.go('users.companies')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          companiesApiService.add(this.company).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The person was added successfully')
                $state.go('users.companies')
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