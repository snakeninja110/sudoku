const gulp = require("gulp");

// 编译JavaScript
gulp.task("webpack", () => {
  const webpack = require("webpack-stream");
  const config = require("./webpack.config.js");
  gulp.src("./js/**/*.js")
      .pipe(webpack(config))
      .pipe(gulp.dest("../www/js"));
});

// 编译less -> css
gulp.task("less", () => {
  const less = require("gulp-less");
  gulp.src("./less/*.less")
      .pipe(less())
      .pipe(gulp.dest("../www/css/"));
});

gulp.task("default", ["webpack", "less"]);

gulp.task("watch", () => {
  gulp.watch("less/**/*.less", ["less"]);
  gulp.watch("js/**/*.js", ["webpack"]);
})
