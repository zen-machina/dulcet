const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// compile scss into css
function style() {
    return (
        gulp
            // gulp.src = Where is the scss file ?
            .src("./src/**/*.scss")
            // pipe(sass()) = Pass that file through sass compiler
            .pipe(sass())
            // pipe(gulp.dest()) = Where do you want to save compiled CSS ?
            .pipe(gulp.dest("./src"))
            // stream changes to browser
            .pipe(browserSync.stream())
    );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });
    gulp.watch("./src/**/*.scss", style);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./src/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
