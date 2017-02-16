'use strict';

import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as through from 'through2';
import config from "../../config";
import {initDynamo} from "../../../src/server/db/dynamo";
// import {JasmineConsoleReporter} from 'jasmine-console-reporter';


const jasmine = require('gulp-jasmine');
const plugins = <any>gulpLoadPlugins();

process.env.NODE_ENV = 'test';

export = (done: any) => {
  return testServer(done);
};

const JasmineConsoleReporter = require('jasmine-console-reporter');
const consoleReporter = new JasmineConsoleReporter({
  colors: 1,           // (0|false)|(1|true)|2
  cleanStack: 1,       // (0|false)|(1|true)|2|3
  verbosity: 4,        // (0|false)|1|2|(3|true)|4
  listStyle: 'indent', // "flat"|"indent"
  activity: false
});

const testServer = (done: any) => {

  return initDynamo().then(() => {
   return gulp.src(['./src/common/initTests', config.APP_SERVER_SRC + '/**/*spec.js'])
  // console.log('=> specs:36 ' + config.APP_SERVER_SRC + '/**/*spec.js');
  //return gulp.src([config.APP_SERVER_SRC + '/**/*spec.js'])
      .pipe(through.obj(function (chunk, enc, cb) {
        console.log('found');
        console.log('found', chunk.path);
        cb(null, chunk)
      }))
      .pipe(plugins.jasmine({
        reporter: consoleReporter
      }))
      .once('end', function (err: any) {
        done();
        process.exit(err ? 1 : 0);
      })
      .on('error', function (error: any) {
        console.error(error);
        done(error);
        process.exit(1);
      });
   });
};
