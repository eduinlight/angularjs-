const gulp = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const changed = require("gulp-changed");
const order = require("gulp-order");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const iife = require("gulp-iife");
const babel = require("gulp-babel");
const replace = require("gulp-replace");
const karma = require("karma");
const path = require("path");

const app = [
  "src/app.js",
  "src/config.js",
  "src/constants.js",
  "src/utils.js",
  "src/**/*.module.js",
  "src/**/*.route.js",
  "src/**/*.class.js",
  "src/**/*.filter.js",
  "src/**/*.service.js",
  "src/**/*.pipe.js",
  "src/**/*.directive.js",
  "src/**/*.template.js",
  "src/**/*.controller.js",
  "src/**/*.component.js",
  "src/**/*.page.js",
];

const app_output = "./dist/";

// const all_sources = sources.concat(app_sources).concat(["qmlweb/QmlWeb.js"]);

// This is required because other values confuse PhantomJS, and are sometimes
// set by default by the system.
process.env.QT_QPA_PLATFORM = "";
//APPLICATION
gulp.task("app", function() {
  gulp.src(app)
    .pipe(concat("app.js"))
    .pipe(babel().on("error", (err) => console.log(err)))
    .pipe(replace(/"use strict";/g, ""))
    .pipe(gulp.dest(app_output))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task("app.min", ["app"], function() {
  gulp.src([app_output + "app.js"])
    .pipe(rename("app.min.js"))
    .pipe(uglify({
      preserveComments: 'license',
      hoist_funs: false
    }))
    .pipe(gulp.dest(app_output));
});

gulp.task("build-dev", ["app"]);
gulp.task("build", ["app.min"]);

gulp.task("serve", function() {
  browserSync.exit()
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("watch", ["build-dev", "serve"], () => {
  gulp.watch(["index.html", "src/**/*.js", "src/**/*.html"], ["build-dev"])
    .on('error', (e) => { console.log(e) });
})