import gulp from 'gulp';
import { buildDirectory, path } from './path.js'; // ファイルパス
import purgeCss from 'gulp-purgecss';
// モード切替
import module from 'module';
const require = module.createRequire(import.meta.url);
const mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: false
});

const cssPurge = (done) => {
  gulp.src(`${buildDirectory}/assets/css/tailwind.css`)
    .pipe(purgeCss({
      content: [
        './dist/**/*.html'
      ],
      defaultExtractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g), 
    }))
    .pipe(gulp.dest(
      path.tailwind.dest
    ));

  done();
}

export default cssPurge;