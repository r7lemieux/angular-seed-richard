import * as gulp from 'gulp';
import { join } from 'path';
var newer = require('gulp-newer');

import Config from '../../config';

export = () => {
  let src = [
    join(Config.APP_CLIENT_SRC, 'package.json')
  ];
  console.log('138 Config.APP_CLIENT_DEST ' + Config.APP_CLIENT_DEST);
  return gulp.src(src)
    .pipe(newer({
      dest: Config.APP_CLIENT_DEST,
      map: function(path: String) { return path.replace('.ts', '.js').replace('.sccs', '.css'); }
    }))
    .pipe(gulp.dest(Config.APP_CLIENT_DEST));
};
