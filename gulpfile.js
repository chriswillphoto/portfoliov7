var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var runSequence = require("run-sequence");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var useref = require("gulp-useref");
var cssnano = require("gulp-cssnano");
var gulpIf = require("gulp-if");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var fileInclude = require("gulp-file-include");

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
});

gulp.task("sass", function() {
  return gulp
    .src("app/css/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("fileinclude", function() {
  gulp
    .src("app/components/index.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest("./app"));
});

gulp.task("default", ["browserSync", "sass"], function() {
  gulp.watch("app/css/*.scss", ["sass"]);
  gulp.watch("app/components/*.html", ["fileinclude"]);
  gulp.watch("app/index.html", browserSync.reload);
  gulp.watch("app/js/index.js", browserSync.reload);
});

gulp.task("clean", function() {
  return del.sync("dist");
});

gulp.task("useref", function() {
  return gulp
    .src("app/*.html")
    .pipe(useref())
    .pipe(gulpIf("*.js", babel({ presets: ["env"], plugins: "transform-object-rest-spread" })))
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulpIf("*.css", cssnano()))
    .pipe(gulp.dest("dist"));
});

gulp.task("build", function(callback) {
  runSequence(["clean", "sass"], ["fileinclude", "useref"], callback);
});
