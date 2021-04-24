const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");
const browsersync = require("browser-sync").create();

// Sass Task
function scssTask() {
    return src("src/**/*.scss").pipe(sass()).pipe(dest("src/"));
}

// Browsersync Task
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: ".",
        },
    });
    cb();
}

function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    watch("*.html", browserSyncReload);
    watch(
        ["src/**/*.scss", "src/**/*.js"],
        series(scssTask, browserSyncReload)
    );
}

exports.default = series(scssTask, browserSyncServe, watchTask);
