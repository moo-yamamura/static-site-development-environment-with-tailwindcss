import gulp from 'gulp';
import { path } from './path.js'; // ファイルパス
import imageMin from 'gulp-imagemin'; // 画像圧縮
import mozjpeg from 'imagemin-mozjpeg'; // jpg圧縮
import pngquant from 'imagemin-pngquant'; // png圧縮
import changed from 'gulp-changed'; // 圧縮済みファイル除外

//
// task
//////////////////////////////////////////////////////////////////////
const staticDest = done => {
  gulp.src(path.file.static)
    .pipe(changed(path.file.dest))
    .pipe(
      imageMin([
        pngquant({
          quality: [0.6, 0.7],
          speed: 1,
        }),
        mozjpeg({ quality: 80 }),
        imageMin.svgo(),
        imageMin.optipng(),
        imageMin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(gulp.dest(path.file.dest));

  done();
};

export default staticDest;